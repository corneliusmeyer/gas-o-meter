import React, {useEffect, useState} from 'react';
import {LocationSettings} from "../../../models/Settings";
import {getCityNameForPosition, getUserLocation} from "../../../utils/apis";
import {Switch} from "@headlessui/react";
import {showWarningToast} from "../../../utils/helper";

type Props = {
    locationHandler: Function,
    passLocationSettings: LocationSettings,
}

const LocationInput = ({locationHandler, passLocationSettings}: Props) => {
    if (typeof window !== "undefined" && "navigator" in window && !("geolocation" in navigator)) {
        return <p>Leider unterstützt Ihr Browser diese Funktion nicht.</p>
    }

    const [renderCount, setRenderCount] = useState(0);

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
                    if(city) setCity("Gefundener Ort: " + city);
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
    }

    useEffect(() => {
        if(renderCount < 1)
            setRenderCount(renderCount+1);
        else {
            console.log({locationSettings});
            locationHandler(locationSettings);
        }
    }, [locationSettings]);

    if(isLoading) return <p>Prüfe Standort...</p>
    else if(blocked) {
        return <p className="text-red-500">Die Erlaubnis wurde nicht erteilt. Setze die Berechtigung manuell oder lade die Seite erneut.</p>
    }
    else return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center">
                <Switch.Group>
                    <Switch
                        checked={locationSettings.active}
                        onChange={(e) => activeHandler(e)}
                        className={`${
                            locationSettings.active ? 'bg-blue-500' : 'bg-gray-200'
                        } relative inline-flex items-center h-6 rounded-full w-11 mr-4`}
                    >
                        <span
                            className={`${
                                locationSettings.active ? 'translate-x-6' : 'translate-x-1'
                            } inline-block w-4 h-4 transform bg-white rounded-full`}
                        />
                    </Switch>
                    <Switch.Label className="mr-4 text-lg">Temperaturservice aktivieren</Switch.Label>
                </Switch.Group>
            </div>
            {
                (locationSettings.active && locationSettings.location) ?
                    <p className="p-3 px-16">{city}</p>
                    : null
            }
        </div>
    );
};

export default LocationInput;