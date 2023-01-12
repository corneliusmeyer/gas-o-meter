import React from 'react';
import TipsList from "./components/pages/savingtips/TipsList";

const Savingtips = ({tips}:any) => {

    const categories = new Set();

    function buildCategories(tips: any) {
        tips.map((tip:any) => {
            if(!categories.has(tip.category)) {
                categories.add(tip.category);
                return (
                    <div key={tip.category}>
                        <div>
                            <h3>{tip.category}</h3>
                        </div>
                        <h3></h3>
                    </div>
                )
            }
        })
    }

    return (
        <div className="flex flex-col p-3">
            <h1 className="text-2xl text-white mb-5">Spartipps</h1>
            {
                tips.map((tip:any) => {
                    if(!categories.has(tip.category)) {
                        categories.add(tip.category);
                        return (
                            <div key={tip.category}>
                                <h3>{tip.category}</h3>
                                <div className="flex flex-row">
                                {tips.filter((t:any) => t.category === tip.category).map((t:any) => (
                                    <p key={t.title}>{t.title}</p>
                                ))}
                                </div>
                            </div>
                        );
                    }
                })
            }
        </div>
    );
};

export const getStaticProps = async () => {
    return {
        props: {
            tips: TipsList.Tips
        }
    }
}

export default Savingtips;