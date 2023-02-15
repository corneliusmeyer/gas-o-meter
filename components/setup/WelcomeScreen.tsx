import React from 'react';

const WelcomeScreen = () => {
    return (
        <div>
            <h1 className="text-5xl italic">Willkommen!</h1>
            <p className="text-3xl ml-10 mt-10 leading-10">
                Vielen Dank, dass Sie <strong><em>Gas-o-meter</em></strong> benutzen. <br />
                Bevor Sie loslegen können, müssen zunächst noch ein paar Einstellungen festgelegt werden. <br />
                Alle Einstellungen können später wieder geändert werden. <br />
                Drücken Sie unten auf <em>Weiter</em> um zu beginnen.
            </p>
        </div>
    );
};

export default WelcomeScreen;