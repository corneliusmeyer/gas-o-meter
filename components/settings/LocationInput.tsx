import React, {useEffect, useState} from 'react';
import {LocationSettings} from "../../models/Settings";
import {getCityNameForPosition, getUserLocation} from "../../utils/apis";

type Props = {
    locationHandler: Function,
    passLocationSettings: LocationSettings,
}

const LocationInput = ({locationHandler, passLocationSettings}: Props) => {
    if (typeof window !== "undefined" && "navigator" in window && !("geolocation" in navigator)) {
        return <p>Leider unterstützt Ihr Browser diese Funktion nicht.</p>;
    }

    const [locationSettings, setLocationSettings] = useState<LocationSettings>(passLocationSettings);
    const [isLoading, setLoading] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const [city, setCity] = useState("");

    const activeHandler = async (active: boolean) => {
        if (active) {
            setLoading(true);
            const pos = await getUserLocation();
            if(pos) {
                setLocationSettings(prevState => ({...prevState, active:true}));
                setLocationSettings(prevState => ({...prevState, location:pos}));
                getCityNameForPosition(pos).then(city => {
                    if(city) {
                        setCity("Gefundener Ort: " + city);
                        console.log(city);
                    }
                    else setCity("Gefundene Position - Breitengrad: " + pos.lat + " Längengrad: " + pos.long);
                    setLoading(false);
                })
            }
            else {
                setBlocked(true);
                setLoading(false);
            }
        }
        else {
            setLocationSettings(prevState => ({...prevState, active:false}));
        }
        locationHandler(locationSettings);
    }

    if(isLoading) return <p>Prüfe Standort...</p>
    else if(blocked) {
        return <p>Die Erlaubnis wurde nicht erteilt. Setze die Berechtigung manuell oder lade die Seite erneut.</p>
    }
    else return (
        <div className="flex flex-col">
            <div className="flex flex-row">
                <input type="checkbox"
                       className="form-checkbox text-purple-600 rounded-full mx-4"
                       onChange={(e) => activeHandler(e.target.checked)}
                       checked={locationSettings.active}
                />
                <label className="text-lg">Temperaturservice aktivieren</label>
            </div>
            {
                (locationSettings.active && locationSettings.location) ?
                    <p>{city}</p>
                    : null
            }
        </div>
    );
};

export default LocationInput;