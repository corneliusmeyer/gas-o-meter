import React from 'react';

const WelcomeScreen = () => {
    return (
        <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl italic">Willkommen!</h1>
            <p className=" text-lg md:text-xl lg:text-3xl lg:ml-10 mt-10">
                Vielen Dank, dass Sie <strong><em>Gas-o-meter</em></strong> benutzen.
                Bevor Sie loslegen können, müssen zunächst noch ein paar Einstellungen festgelegt werden.
                Alle Einstellungen können später wieder geändert werden.
                Drücken Sie unten auf <em>Weiter</em> um zu beginnen.
            </p>
        </div>
    );
};

export default WelcomeScreen;