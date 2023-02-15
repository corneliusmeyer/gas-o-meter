import React from 'react';

const ConnectionScreen = () => {
    return (
        <div>
            <h1 className="text-4xl italic">Aufbauen der Verbindung</h1>
            <p className="my-4 text-2xl">
                Gas-o-meter kann sich automatisch den Gasverbrauch von modernen Gaszählern beziehen. <br />
                Die Daten werden mittels MQTT-Protokoll übertragen. <br />
                Schauen Sie am besten in das Handbuch Ihres Gaszählers, um zu erfahren, ob ihr Gaszähler das
                MQTT-Protokoll unterstützt.
            </p>
            <p className="mt-4 text-2xl">
                Falls dem so ist, finden Sie dort auch die entsprechenden Zugangsdaten, die Sie unten in die Felder eintragen können.
            </p>
        </div>
    );
};

export default ConnectionScreen;