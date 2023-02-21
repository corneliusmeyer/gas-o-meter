import React, {useEffect, useState} from 'react';
import {NotifySettings} from "../../models/Settings";

type Props = {
    notifySettingsHandler: Function,
    passNotifySettings: NotifySettings,
}

const NotificationInput = ({notifySettingsHandler, passNotifySettings}: Props) => {
    const [notifySettings, setNotifySettings] = useState<NotifySettings>(passNotifySettings);

    const activeHandler = (active: boolean) => setNotifySettings(prevState => ({...prevState, active}));

    useEffect(() => notifySettingsHandler(notifySettings), [notifySettings]);



    return (
        <div className="flex flex-col">
            <label className="text-xl">Benachrichtigungen aktivieren</label>
            <input type="checkbox"
                   className="form-checkbox text-purple-600 rounded-full"
                   onChange={(e) => activeHandler(e.target.checked)}
                   checked={notifySettings.active}
            />
        </div>
    );
};

export default NotificationInput;