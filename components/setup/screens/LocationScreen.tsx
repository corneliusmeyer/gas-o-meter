import {LocationSettings} from "../../../models/Settings";
import LocationInput from "../../settings/LocationInput";

type Props = {
    locationSettingsHandler: Function,
    passLocationSettings: LocationSettings,
}

const LocationScreen = ({locationSettingsHandler, passLocationSettings}: Props) => () => {

    return (
        <div>
            <h1 className="text-2xl md:text-4xl italic">Standortabfrage für Temperaturinformationen</h1>
            <p className="text-lg md:text-2xl mt-10">
                Gas-o-meter kann für genauere Auswertungen die aktuellen Temperaturinformationen in die Analyse mit einbeziehen.
                Hierzu wird der aktuelle Standort abgefragt und die Temperatur für diesen ermittelt.
                Falls Sie diesen Service nutzen möchten, müssen Sie die Standortabfrage erlauben.
            </p>
            <div className="mt-4 text-lg md:text-xl">
                <LocationInput locationHandler={locationSettingsHandler} passLocationSettings={passLocationSettings} />
            </div>
        </div>
    );
};

export default LocationScreen;