import React, {useState} from 'react';
import { Dialog } from '@headlessui/react'

type Props = {
    callback: Function,
}

const ModalDelete = ({callback}: Props) => {
    return (
        <Dialog
            open={true}
            onClose={() => {callback(false)}}
            className="fixed z-50 top-0 left-0 w-screen h-screen bg-gray-800 opacity-90 flex justify-center items-center"
        >
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Panel
                    className="bg-white rounded-lg shadow-lg p-4 mx-2 text-left"
                >
                    <Dialog.Title className="font-bold text-xl mb-2">
                        Daten für den Zeitraum wirklich löschen?
                    </Dialog.Title>
                    <Dialog.Description className="text-gray-700">
                        Hierdurch werden die Daten für den angegebenen Zeitraum endgültig gelöscht.
                    </Dialog.Description>
                    <div className="flex justify-end mt-4">
                        <button className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        onClick={()=> {callback(false)}}>
                            Abbrechen
                        </button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={() => {
                            callback(true);
                        }}>
                            Löschen
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default ModalDelete;