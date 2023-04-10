import React from 'react';
import ConnectionInput from "../../settings/core/ConnectionInput";
import {MQTT_Connection} from "../../../models/Settings";

type Props = {
    connectionHandler: Function,
    passConnection: MQTT_Connection;
}

const ConnectionScreen = ({connectionHandler, passConnection}: Props) => () => {
    return (
        <div>
            <h1 className="text-2xl md:text-4xl italic">Aufbauen der Verbindung</h1>
            <p className="text-lg md:text-2xl mt-10">
                Gas-o-meter kann automatisch den aktuelles Gasstand von modernen Gaszählern beziehen,
                sofern diese das sogenannte MQTT-Protokoll unterstützen. Lesen Sie das Handbuch Ihres Gaszählers, um zu erfahren,
                ob Ihr Gaszähler das MQTT-Protokoll unterstützt. Falls der Gaszähler das Protokoll nicht unterstützt,
                können Sie alternativ unser <em>GasReading-Kit</em> erwerben, welches das MQTT-Protokoll für Ihren Gaszähler
                nachrüstet. Für die automatische Verbindung benötigen Sie die IP-Adresse des Gaszählers, den Port und ein
                Topic, diese Daten sind unten einzugeben.
            </p>
            <div className="mt-4 text-lg md:text-xl">
                <ConnectionInput connectionHandler={connectionHandler} passConnection={passConnection} />
            </div>
        </div>
    );
};

export default ConnectionScreen;