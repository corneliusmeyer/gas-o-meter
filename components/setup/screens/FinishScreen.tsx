import React from 'react';

const FinishScreen = () => {
    return (
        <div>
            <h1 className="text-2xl md:text-4xl italic">Fertig!</h1>
            <p className="text-lg md:text-2xl mt-10">
                Das Setup ist nun abgeschlossen.
                Falls Sie ihre Eingaben ändern möchten, können Sie nun nochmal zurück oder auch später die Einstellungen aufrufen.
            </p>
            <p className="mt-4 text-lg md:text-2xl">
                Drücken Sie auf <em>Speichern</em> um das Setup zu verlassen.
            </p>
        </div>
    );
};

export default FinishScreen;