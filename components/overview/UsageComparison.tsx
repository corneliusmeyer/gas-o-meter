import React, {ReactElement} from 'react';

type Props = {
    currentDiff: number,
    dailyDiff: number,
    weeklyDiff: number,
}

const UsageComparison = ({currentDiff, dailyDiff, weeklyDiff} : Props) => {

    const happyText = (text: string):ReactElement => {
        return <div className="flex items-center mb-3">
            <span className="inline-block align-middle">&#128522;</span>
            <span className="text-lg ml-5">{text}</span>
        </div>
    }
    const sadText = (text: string):ReactElement => {
        return <div className="flex items-center mb-3">
            <span className="inline-block align-middle">&#128543;</span>
            <span className="text-lg ml-5">{text}</span>
        </div>
    }

    return (
        <div className="flex flex-col ml-5 mr-10">
        {
            currentDiff >= 0
                ?
                happyText("Aktuell wird "+currentDiff+"% weniger Gas verbraucht, als zu vergleichbaren Zeiten mit ähnlicher Temperatur.")
                :
                sadText("Aktuell wird "+Math.abs(currentDiff)+"% mehr Gas verbraucht, als zu vergleichbaren Zeiten mit ähnlicher Temperatur.")
        }
        {
            dailyDiff >= 0
                ?
                happyText("Gestern wurde im Vergleich zu Vorgestern "+dailyDiff+"% Gas eingespart.")
                :
                sadText("Gestern wurde im Vergleich zu Vorgestern "+Math.abs(dailyDiff)+"% mehr Gas verbraucht.")
        }
        {
            weeklyDiff >= 0
                ?
                happyText("Letzte Woche wurde im Vergleich zu Vorletzter Woche "+weeklyDiff+"% Gas eingespart.")
                :
                sadText("Letzte Woche wurde im Vergleich zu Vorletzter Woche "+Math.abs(weeklyDiff)+"% mehr Gas verbraucht.")
        }
        </div>
    );
};

export default UsageComparison;