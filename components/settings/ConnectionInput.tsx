import React, {useEffect, useState} from 'react';
import {MQTT_Connection, Settings} from "../../models/Settings";
import {callback} from "chart.js/helpers";

type Props = {
    connectionHandler: Function,
    passConnection: MQTT_Connection,
}

const ConnectionInput = ({connectionHandler, passConnection} : Props) => {

    const [connection, setConnection] = useState<MQTT_Connection>(passConnection);

    const saveHandler = (fn: (c: MQTT_Connection) => MQTT_Connection) => {
        setConnection(fn);
        connectionHandler(connection);
    }

    const ipAdressHandler = (ipAdress: string) => saveHandler(prevState => ({...prevState, ipAdress}));
    const portHandler = (port: number) => saveHandler(prevState => ({...prevState, port}));
    const topicHandler = (topic: string) => saveHandler(prevState => ({...prevState, topic}));
    const activeHandler = (active: boolean) => saveHandler(prevState => ({...prevState, active}));

    return (
        <div className="flex flex-col">
            <div className="flex flex-row">
                <input type="checkbox"
                       className="form-checkbox text-purple-600 rounded-full mx-4"
                       onChange={(e) => activeHandler(e.target.checked)}
                       checked={connection.active}
                />
                <label className="text-lg">MQTT-Protokoll verwenden</label>
            </div>
            {connection.active ?
                (
                    <>
                    <label>IP-Adresse (Pflichtfeld)</label>
                    <input type="text"
                           className="border border-gray-200 rounded"
                           placeholder="192.168.41"
                           defaultValue={(connection.ipAdress.length > 0) ? connection.ipAdress : ""}
                           onChange={(e) => ipAdressHandler(e.target.value)}
                           required
                    />
                    <label>Port (Pflichtfeld)</label>
                    <input type="text"
                           className="border border-gray-200 rounded"
                           placeholder="8080"
                           defaultValue={(connection.port > 0) ? connection.port : ""}
                           onChange={(e) => portHandler(Number(e.target.value))}
                           required
                    />
                    <label>Topic (Pflichtfeld)</label>
                    <input type="text"
                           className="border border-gray-200 rounded"
                           placeholder="Gasmessungen"
                           onChange={(e) => topicHandler(e.target.value)}
                           defaultValue={(connection.topic.length > 0) ? connection.topic : ""}
                           required
                    />
                    </>
                ) : null
            }
        </div>
    );
};

export default ConnectionInput;