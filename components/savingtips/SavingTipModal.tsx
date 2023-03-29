import React from 'react';
import {Dialog} from "@headlessui/react";
import {SavingTip} from "../../models/SavingTip";
import SavingTipCard from "./SavingTipCard";

type Props = {
    tip: SavingTip;
    callback: Function;
}

const SavingTipModal = ({tip, callback}: Props) => {
    return (
        <Dialog
            open={true}
            onClose={() => {callback()}}
            className="fixed z-50 top-0 left-0 w-screen h-screen bg-gray-800 opacity-90 flex justify-center items-center"
        >
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Panel
                    className="bg-white rounded-lg shadow-lg p-4 mx-2 text-left"
                >
                    <Dialog.Title className="font-bold text-xl mb-2">
                        {tip.title}
                    </Dialog.Title>
                    <SavingTipCard savingTip={tip} expanded={true} />
                    <div className="flex flex-row justify-between pt-2">
                        <a href={tip.source} className="inline-flex items-center text-blue-600 hover:underline">
                            Quelle
                            <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                                <path
                                    d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                            </svg>
                        </a>
                        <button className="bg-gray-200 hover:bg-gray-300 p-1 px-2 rounded-full"
                                onClick={() => callback()}>Schließen</button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default SavingTipModal;