import React from 'react';
import ConnectionInput from "../../settings/ConnectionInput";
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
                Gas-o-meter kann automatisch den Gasverbrauch von modernen Gaszählern beziehen,
                sofern diese das MQTT-Protokoll unterstützen. Lesen Sie das Handbuch Ihres Gaszählers, um zu Erfahren,
                ob Ihr Gaszähler das MQTT-Protokoll unterstützt. Falls der Gaszähler das Protokoll nicht unterstützt,
                können Sie alternativ unser <em>GasReading-Kit</em> erwerben, welches das MQTT-Protokoll für Ihren Gaszähler
                nachrüstet. Erfahrene Anwender können auch den Endpunkt <em>/addMeasurement</em> verwenden.
                Entsprechende Informationen finden Sie in unserem Handbuch.
            </p>
            <div className="mt-4 text-lg md:text-xl">
                <ConnectionInput connectionHandler={connectionHandler} passConnection={passConnection} />
            </div>
        </div>
    );
};

export default ConnectionScreen;