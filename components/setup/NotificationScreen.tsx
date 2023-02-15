import React from 'react';

const NotificationScreen = () => {
    return (
        <div>
            <h1 className="text-4xl italic">Push-Benachrichtigungen</h1>
            <p className="my-4 text-2xl">
                Gas-o-meter lernt nach einer Weile Ihren Gasverbrauch kennen und kann Ihnen Auffälligkeiten automatisch mitteilen. <br />
                Sie müssen hierfür Push-Benachrichtigungen erlauben und können unten die Sensibilität festlegen.
            </p>
        </div>
    );
};

export default NotificationScreen;