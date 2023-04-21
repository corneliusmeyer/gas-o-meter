import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import Page from '../components/Page';
import {showSuccessToast} from "../utils/helper";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

type Tab = {
    name: string;
    content: JSX.Element;
};

const tabs: Tab[] = [
    {
        name: 'Erkannte Verbrauchsgruppen',
        content:
            <div>
                <div>
                    <h2 className="text-lg">10.04.2023</h2>
                    <div className="mx-8 flex flex-row justify-between border p-3">
                        <div>
                            08:14:23 bis 08:23:52
                        </div>
                        <div>
                            Duschen
                        </div>
                        <button
                            className="max-w-fit bg-blue-200 hover:bg-gray-100 py-1 px-1 border rounded"
                        >Verbrauchsgruppe hinzufügen</button>
                    </div>
                    <div className="mx-8 flex flex-row justify-between border p-3">
                        <div>
                            08:58:23 bis 08:59:02
                        </div>
                        <div>
                            Waschen
                        </div>
                        <button
                            className="max-w-fit bg-blue-200 hover:bg-gray-100 py-1 px-1 border rounded"
                        >Verbrauchsgruppe hinzufügen</button>
                    </div>
                    <div className="mx-8 flex flex-row justify-between border p-3">
                        <div>
                            16:48:36 bis 16:49:11
                        </div>
                        <div>
                            Waschen
                        </div>
                        <button
                            className="max-w-fit bg-blue-200 hover:bg-gray-100 py-1 px-1 border rounded"
                        >Verbrauchsgruppe hinzufügen</button>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg">09.04.2023</h2>
                    <div className="mx-8 flex flex-row justify-between border p-3">
                        <div>
                            08:14:23 bis 08:23:52
                        </div>
                        <div>
                            Duschen
                        </div>
                        <button
                            className="max-w-fit bg-blue-200 hover:bg-gray-100 py-1 px-1 border rounded"
                        >Verbrauchsgruppe hinzufügen</button>
                    </div>
                    <div className="mx-8 flex flex-row justify-between border p-3">
                        <div>
                            08:58:23 bis 08:59:02
                        </div>
                        <div>
                            Waschen
                        </div>
                        <button
                            className="max-w-fit bg-blue-200 hover:bg-gray-100 py-1 px-1 border rounded"
                        >Verbrauchsgruppe hinzufügen</button>
                    </div>
                    <div className="mx-8 flex flex-row justify-between border p-3">
                        <div>
                            16:48:36 bis 16:49:11
                        </div>
                        <div>
                            Waschen
                        </div>
                        <button
                            className="max-w-fit bg-blue-200 hover:bg-gray-100 py-1 px-1 border rounded"
                        >Verbrauchsgruppe hinzufügen</button>
                    </div>
                </div>
            </div>

    },
    {
        name: 'Berichte',
        content: <p>Inhalt der Tab 'Berichte'</p>,
    },
    {
        name: 'Systemereignisse',
        content: <p>Inhalt der Tab 'Systemereignisse'</p>,
    },
];

const Notifications = (): JSX.Element => {
    const [currentTab, setCurrentTab] = useState<number>(0);

    return (
        <Page title="Ereignisse">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="border-b border-gray-200">
                    <Tab.Group
                        as="div"
                        className="px-6 py-4 space-y-1 sm:space-y-0 sm:space-x-8"
                    >
                        <Tab.List className="flex flex-wrap">
                            {tabs.map((tab, index) => (
                                <Tab
                                    key={index}
                                    className={({ selected }) =>
                                        classNames(
                                            'px-3 py-2 text-sm font-medium rounded-md',
                                            selected
                                                ? 'text-indigo-700 bg-indigo-100'
                                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                        )
                                    }
                                    onClick={() => setCurrentTab(index)}
                                >
                                    {tab.name}
                                </Tab>
                            ))}
                        </Tab.List>
                    </Tab.Group>
                </div>
                <div className="px-6 py-4">
                    <Tab.Group>
                        <Tab.Panels>
                            {tabs.map((tab, index) => (
                                <Tab.Panel key={index}>
                                    {tab.content}
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </Page>
    );
};

export default Notifications;
