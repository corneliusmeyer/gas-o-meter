import React from 'react';
import {Settings} from "../../../models/Settings";

type Props = {
    settings: Settings;
    show: boolean;
}

const SaveButton = ({settings, show} : Props) => {

    const handleAction = async () => {
        try {
            const response = await fetch('/api/settings', {
                method: 'POST',
                body: JSON.stringify(settings),
                headers: {'Content-Type': 'application/json'},
            });
            if(response.ok) window.location.reload();
        }
        catch (err) {
            console.log('Die Einstellungen konnten nicht gespeichert werden');
        }
    }

    if(!show) return null;
    return (
        <button
            className="float-right bg-gray-400 py-1 px-3 hover:bg-gray-500 w-auto w-fit text-center"
            onClick={() => handleAction()}
        >
            Speichern
        </button>
    );
};

export default SaveButton;