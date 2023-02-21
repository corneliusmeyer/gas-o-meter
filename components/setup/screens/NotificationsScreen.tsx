import React from 'react';
import {NotifySettings} from "../../../models/Settings";
import NotificationInput from '../../settings/NotificationInput';

type Props = {
    notifySettingsHandler: Function,
    passNotifySettings: NotifySettings,
}

const NotificationsScreen = ({notifySettingsHandler, passNotifySettings}: Props) => () => {
    return (
        <div>
            <h1 className="text-2xl md:text-4xl italic">Push-Benachrichtigungen</h1>
            <p className="text-lg md:text-2xl mt-10">
                Gas-o-meter erlernt nach gewisser Zeit Ihren Gasverbrauch kennen und kann Ihnen Auffälligkeiten automatisch
                mitteilen. Auch kann über erkannte Gasverbräuche mitgeteilt werden, sodass diese anschließend eingetragen werden können.
                Hierzu müssen Push-Benachrichtigungen aktiviert sein. Falls Sie diesen Service nutzen wollen, drücken Sie auf
                Push-Benachrichtigungsanfrage anfordern und akzeptieren Sie diese.
            </p>
            <div className="mt-4 text-lg md:text-xl">
                <NotificationInput notifySettingsHandler={notifySettingsHandler} passNotifySettings={passNotifySettings} />
            </div>
        </div>

    );
};

export default NotificationsScreen;