import React from 'react';

const FinishScreen = () => {
    return (
        <div>
            <h1 className="text-4xl italic">Fertig!</h1>
            <p className="my-4 text-2xl">
                Das Setup ist nun abgeschlossen. <br />
                Falls Sie ihre Eingaben ändern möchten, können Sie nun nochmal zurück oder auch später die Einstellungen aufrufen. <br />
            </p>
            <p className="my-4 text-2xl">
                Drücken Sie auf <em>Speichern</em> um das Setup zu verlassen.
            </p>
        </div>
    );
};

export default FinishScreen;