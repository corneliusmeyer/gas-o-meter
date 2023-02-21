import React, {useEffect, useState} from 'react';
import {LocationSettings} from "../../models/Settings";

type Props = {
    locationHandler: Function,
    passLocationSettings: LocationSettings,
}

const LocationInput = ({locationHandler, passLocationSettings}: Props) => {

    const [locationSettings, setLocationSettings] = useState<LocationSettings>(passLocationSettings);
    const activeHandler = (active: boolean) => setLocationSettings(prevState => ({...prevState, active}));

    useEffect(() => locationHandler(locationSettings), [locationSettings]);

    return (
        <div className="flex flex-col">
            <label className="text-xl">Temperaturservice aktivieren?</label>
            <input type="checkbox"
                   className="form-checkbox text-purple-600 rounded-full"
                   onChange={(e) => activeHandler(e.target.checked)}
                   checked={locationSettings.active}
            />
        </div>
    );
};

export default LocationInput;