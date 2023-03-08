import React, {useState} from 'react';
import {GetServerSideProps, NextPage} from "next";
import {SavingTipList} from "../utils/savingTipList";
import Page from "../components/Page";
import {SavingTip, TipCategory} from "../models/SavingTip";
import SavingTipCard from "../components/savingtips/SavingTipCard";

type SavingtipsPageProps = {
    savingTipList: TipCategory[],
}

const Savingtips:NextPage<SavingtipsPageProps> = (props) => {

    const {savingTipList} = props;
    const [expandedCard, setExpandedCard] = useState<null | SavingTip>(null);

    return (
        <Page title="Spartipps">
        {
            savingTipList.map((categorie, categorieIndex) => {
               return (
                <div key={categorieIndex}>
                    <h2>Spartipps für... {categorie.title}</h2>
                    <div className="flex flex-row">
                    {
                        categorie.tips.map((tip, tipIndex) => {
                            return <SavingTipCard
                                    key={tipIndex}
                                    savingTip={tip}
                                    color={categorie.color}
                                    expanded={false}
                                    callback={() => setExpandedCard(tip)}
                                />
                            }
                        )
                    }
                    </div>
                </div>
               )
            })
        }
        {
            (expandedCard != null) ? (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                            <div className="p-4">
                                <SavingTipCard
                                    savingTip={expandedCard}
                                    expanded={true}
                                />
                                <button onClick={() => setExpandedCard(null)}>Schließen</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null
        }
        </Page>
    );
};

export const getServerSideProps = () => {
    return {props: {savingTipList: SavingTipList}}
}

export default Savingtips;