import React from 'react';
import Settingsfield from "./Settingsfield";
import {Location} from "../../../../models/Settings";

type Props = {
    location: Location;
    changeHandler: Function;
}

const LocationInput = (props: Props) => {
    let {location, changeHandler} = props;

    function readLocationApi() {
        navigator.geolocation.getCurrentPosition(function(position) {
            location.lat = position.coords.latitude;
            location.long = position.coords.longitude;
            changeHandler(location);
        });
    }

    return (
        <Settingsfield label="Standortbasierte Temperaturinformationen">
            <p>Gib hier deine Position ein, für automatische standortbasierte Temperaturinformationen</p>
            <div className="my-3 mx-3">
                <button className="bg-gray-500 py-1 px-3 hover:bg-gray-600"
                    onClick={() => readLocationApi()}>Standort abrufen</button>
            </div>
            <div className="my-2 mx-3">
                <label>Breitengrad</label>
                <input type="text"
                       className="text-black mx-3"
                       placeholder="31.61"
                       defaultValue={location.lat ? location.lat : ""}
                       onChange={(e) => {
                           e.preventDefault();
                           location.lat = Number(e.target.value);
                           changeHandler(location);
                       }}
                />
            </div>
            <div className="my-2 mx-3">
                <label>Längengrad</label>
                <input type="text"
                       className="text-black mx-3"
                       placeholder="70.12"
                       defaultValue={location.long}
                       onChange={(e) => {
                           e.preventDefault();
                           location.long = Number(e.target.value);
                           changeHandler(location);
                       }}
                />
            </div>
            <p>Ausgewählter Ort: <span className="mx-2 italic">unbekannt</span></p>
        </Settingsfield>
    );
};

export default LocationInput;