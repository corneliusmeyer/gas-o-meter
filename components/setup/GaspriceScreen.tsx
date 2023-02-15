import React from 'react';

const GaspriceScreen = () => {
    return (
        <div>
            <h1 className="text-4xl italic">Eingabe des Gaspreises</h1>
            <p className="my-4 text-2xl">
                Damit Gas-o-meter Preisanalysen aufstellen kann, ist es notwendig, dass Sie ihren aktuellen Gaspreis eingeben. <br />
                Der Gaspreis ist netto im Format <em>cent / m^3</em> einzugeben. <br />
                Falls Sie Schwierigkeiten mit dem Format haben, nutzen Sie bitte einen Umrechner oder fragen Sie ihren Lieferanten.
            </p>
        </div>
    );
};

export default GaspriceScreen;