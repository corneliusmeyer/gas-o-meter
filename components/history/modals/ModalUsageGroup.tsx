import React from 'react';
import {Dialog} from "@headlessui/react";
import { Combobox } from '@headlessui/react'
import { useState } from 'react'

type Props = {
    callback: Function;
}

const groups = [
    'Waschen',
    'Kochen',
    'Heizung',
    'Duschen Anna',
    'Duschen Bernd',
]


const ModalUsageGroup = ({callback}:Props) => {
    const [selectedGroup, setSelectedGroup] = useState<null | string>();
    const [query, setQuery] = useState('')

    const filteredGroups =
        query === ''
            ? groups
            : groups.filter((group) => {
                return group.toLowerCase().includes(query.toLowerCase());
            });

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
                        Vebrauchsgruppe für den ausgewählten Zeitraum festlegen
                    </Dialog.Title>
                    <Dialog.Description className="text-gray-700">
                        Wähle hier eine Verbrauchsgruppe oder gib eine neue Verbrauchsgruppe an.
                        (Beispiel: Duschen, Kochen, Waschen etc..)
                    </Dialog.Description>
                    <Combobox value={selectedGroup} onChange={setSelectedGroup}>
                        <Combobox.Input
                            onChange={(event) => setQuery(event.target.value)}
                            className="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm"
                            placeholder="Verbrauchsgruppe auswählen oder eingeben"
                        />
                        {filteredGroups.length > 0 && (
                            <Combobox.Options
                                className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-w-xl"
                            >
                                {filteredGroups.map((group) => (
                                    <Combobox.Option
                                        key={group}
                                        value={group}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                    >
                                        {group}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        )}
                    </Combobox>

                    <div className="flex justify-end mt-4">
                        <button className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                                onClick={()=> callback()}>
                            Abbrechen
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-400"
                                onClick={() => callback(selectedGroup ? selectedGroup : query)}>
                            Hinzufügen
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default ModalUsageGroup;