import React from 'react';
import GaspriceInput from "../../settings/core/GaspriceInput";

type Props = {
    gaspriceHandler: Function;
    currentPrice: number;
}

const GaspriceScreen = ({gaspriceHandler, currentPrice} : Props) => () => {
    return (
        <div>
            <h1 className="text-2xl md:text-4xl italic">Eingabe des Gaspreises</h1>
            <p className="text-lg md:text-2xl mt-10">
                Damit Gas-o-meter Preisanalysen aufstellen kann, ist es notwendig, dass Sie ihren aktuellen Gaspreis(Arbeitspreis) eingeben.
                Dieser Arbeitspreis ist netto im Format <em>€ / Kubikmeter</em> einzugeben.
                Falls Sie Schwierigkeiten mit dem Format haben, nutzen Sie bitte einen Umrechner oder fragen Sie ihren Anbieter.
            </p>
            <div className="mt-4 text-lg md:text-xl">
                <GaspriceInput priceHandler={gaspriceHandler} currentValue={currentPrice} />
            </div>
        </div>
    );
};

export default GaspriceScreen;