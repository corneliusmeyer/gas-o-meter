import React, {useState} from 'react';
import {GetServerSideProps, NextPage} from "next";
import {SavingTipList} from "../utils/savingTipList";
import Page from "../components/Page";
import {SavingTip, TipCategory} from "../models/SavingTip";
import SavingTipCard from "../components/savingtips/SavingTipCard";
import ModalDelete from "../components/history/modals/ModalDelete";
import SavingTipModal from "../components/savingtips/SavingTipModal";

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
                    {expandedCard != null && (
                        <SavingTipModal
                            tip={expandedCard}
                            callback={() => setExpandedCard(null)}
                        />
                    )}
                    <h2 className="text-lg">Spartipps für... {categorie.title}</h2>
                    <div className="flex flex-row mb-3">
                    {
                        categorie.tips.map((tip, tipIndex) => {
                            return <button
                                    onClick={() => setExpandedCard(tip)}>
                                    <SavingTipCard
                                        key={tipIndex}
                                        savingTip={tip}
                                        color={categorie.color}
                                        expanded={false}
                                    />
                                </button>
                            }
                        )
                    }
                    </div>
                </div>
               )
            })
        }
        </Page>
    );
};

export const getServerSideProps = () => {
    return {props: {savingTipList: SavingTipList}}
}

export default Savingtips;