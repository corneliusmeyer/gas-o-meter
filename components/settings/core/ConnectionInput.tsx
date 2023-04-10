import React, {useEffect, useState} from 'react';
import {MQTT_Connection, Settings} from "../../../models/Settings";
import {callback} from "chart.js/helpers";
import {Switch} from "@headlessui/react";
import {showSuccessToast} from "../../../utils/helper";

type Props = {
    connectionHandler: Function,
    passConnection: MQTT_Connection,
}

const ConnectionInput = ({connectionHandler, passConnection} : Props) => {

    const [connection, setConnection] = useState<MQTT_Connection>(passConnection);
    const [renderCount, setRenderCount] = useState(0);

    useEffect(() => {
        if(renderCount < 1)
            setRenderCount(renderCount+1);
        else connectionHandler(connection);
    }, [connection]);

    const ipAdressHandler = (ipAdress: string) => setConnection(prevState => ({...prevState, ipAdress}));
    const portHandler = (port: number) => setConnection(prevState => ({...prevState, port}));
    const topicHandler = (topic: string) => setConnection(prevState => ({...prevState, topic}));
    const activeHandler = (active: boolean) => setConnection(prevState => ({...prevState, active}));

    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center">
                <Switch.Group>
                    <Switch
                        checked={connection.active}
                        onChange={(e) => activeHandler(e)}
                        className={`${
                            connection.active ? 'bg-blue-500' : 'bg-gray-200'
                        } relative inline-flex items-center h-6 rounded-full w-11 mr-4`}
                    >
                        <span
                            className={`${
                                connection.active ? 'translate-x-6' : 'translate-x-1'
                            } inline-block w-4 h-4 transform bg-white rounded-full`}
                        />
                    </Switch>
                    <Switch.Label className="mr-4 text-lg">Gasstand automatisch vom Gaszähler beziehen</Switch.Label>
                </Switch.Group>
            </div>
            {connection.active ?
                (
                    <div className=" flex flex-col p-2 px-16">
                        <label className="mt-4">IP-Adresse</label>
                        <input type="text"
                               className="border border-gray-200 rounded text-black px-3 max-w-min"
                               placeholder="192.168.41"
                               defaultValue={(connection.ipAdress.length > 0) ? connection.ipAdress : ""}
                               onChange={(e) => ipAdressHandler(e.target.value)}
                               required
                        />
                        <label>Port</label>
                        <input type="number"
                               className="border border-gray-200 rounded text-black px-3 max-w-min"
                               placeholder="8080"
                               defaultValue={(connection.port > 0) ? connection.port : ""}
                               onChange={(e) => portHandler(Number(e.target.value))}
                               required
                        />
                        <label>Topic</label>
                        <input type="text"
                               className="border border-gray-200 rounded text-black px-3 max-w-min"
                               placeholder="Gasmessungen"
                               onChange={(e) => topicHandler(e.target.value)}
                               defaultValue={(connection.topic.length > 0) ? connection.topic : ""}
                               required
                        />
                        <button
                            className="mt-4 max-w-fit hover:bg-gray-100 py-2 px-2 border rounded"
                            onClick={() => showSuccessToast('Die Verbindung war erfolgreich')}
                        >Verbindung testen</button>
                    </div>
                ) : null
            }
        </div>
    );
};

export default ConnectionInput;