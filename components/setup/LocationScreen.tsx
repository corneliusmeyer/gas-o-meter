import React from 'react';

const LocationScreen = () => {
    return (
        <div>
            <h1 className="text-4xl italic">Standorteingabe für Temperaturinformationen</h1>
            <p className="my-4 text-2xl">
                Gas-o-meter kann für genauere Auswertungen die aktuellen Temperaturinformationen in die Analyse mit einbeziehen. <br />
                Falls Sie diesen Service nutzen möchten, tragen Sie bitte Ihren Standort unten in die Felder ein. <br />
                <em>Tipp: Sie können Ihren Standort automatisch über den Knopf Standort abrufen auswerten.</em>
            </p>
        </div>
    );
};

export default LocationScreen;