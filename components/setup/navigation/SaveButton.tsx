import React from 'react';
import {Settings} from "../../../models/Settings";
import {saveSettings} from "../../../utils/apis";

type Props = {
    settings: Settings;
    show: boolean;
}

const SaveButton = ({settings, show} : Props) => {

    const handleAction = async () => {
        try {
            const response = await saveSettings(settings);
            if(response.ok) window.location.reload();
        }
        catch (err) {
            console.log('Die Einstellungen konnten nicht gespeichert werden');
        }
    }

    if(!show) return null;
    return (
        <button
            className="float-right bg-blue-400 py-1 px-3 hover:bg-blue-500 w-auto w-fit text-center"
            onClick={() => handleAction()}
        >
            Speichern
        </button>
    );
};

export default SaveButton;