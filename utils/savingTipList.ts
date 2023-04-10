import {TipCategory} from "../models/SavingTip";

const heizen: TipCategory = {
    title: "Heizen",
    color: "bg-gray-200",
    tips: [
        {
            "title": "Heizkörper entlüften",
            "content": "Werden die Heizkörper nicht im vollen Umfang warm oder sind gluckernde Geräusche zu hören, ist meist Luft im Spiel. Die Heizanlage muss dabei mehr Energie aufbringen, um die Räumlichkeiten zu erwärmen. Abhilfe bringt die Entlüftung mit einem Entlüfterschlüssel. Damit lässt sich einfach und unkompliziert die Luft aus den warmen Heizkörpern ablassen.",
            "source": "https://www.verbraucherzentrale.de/wissen/energie/heizen-und-warmwasser/gas-sparen-diese-kleinen-aenderungen-senken-ihren-gasverbrauch-71992"
        },
        {
            "title": "Heizungsanlage optimal steuern",
            "content": "Moderne Systeme verfügen über Wochenprogramme, mit denen das persönliche Heizprofil für Werktag und Wochenende eingestellt werden kann. Gar nicht zu heizen anstelle einer Absenkung, ist nicht ratsam: Die Innenoberflächen der Außenwände kühlen zu stark ab und das Schimmelrisiko steigt rapide.",
            "source": "https://www.verbraucherzentrale.de/wissen/energie/heizen-und-warmwasser/gas-sparen-diese-kleinen-aenderungen-senken-ihren-gasverbrauch-71992"
        },
        {
            "title": "Heizkörper freihalten",
            "content": "Heizkörper nicht mit Vorhängen verdecken und mit Möbeln zustellen! Die Heizenergie kann sonst nicht voll ausgenutzt werden, da die Wohnräume dadurch nicht gleichmäßig aufgeheizt werden können. Eine einfache Regel lautet, dass jeder Heizkörper gut zu sehen sein sollte, damit die Raumluft ihn ungehindert umströmen kann. Ebenso wichtig ist es, die Heizkörper sauber zu halten, da Staubablagerungen die Heizleistung mindern.",
            "source": "https://www.verbraucherzentrale.de/wissen/energie/heizen-und-warmwasser/gas-sparen-diese-kleinen-aenderungen-senken-ihren-gasverbrauch-71992"
        },
        {
            "title": "Sparen mit dem Thermostat an der Heizung",
            "content": "Bei einem Standard-Thermostat entspricht Stufe 2 etwa 16° Celsius, Stufe 3 etwa 20° Celsius und Stufe 4 etwa 24° Celsius. Pro Grad weniger sparen Sie ca. 6 Prozent Heizkosten. Viele Personen drehen ihr Thermostat auf Stufe 5 – damit die Räume vermeintlich schneller warm werden. Das ist nicht notwendig: es verschwendet viel Energie und der Raum fühlt sich mit molligen 28 Grad schnell zu heiß an!",
            "source": "https://www.verbraucherzentrale.de/wissen/energie/heizen-und-warmwasser/gas-sparen-diese-kleinen-aenderungen-senken-ihren-gasverbrauch-71992"
        },
    ]
}

const wohnen:TipCategory = {
    title: "Wohnen",
    color: "bg-gray-200",
    tips: [
        {
            "title": "Fenster und Türen dichthalten",
            "content": "Undichte Außentüren und Fenster vergrößern Wärmeverluste in Haus und Wohnung und sorgen für unangenehme Zugluft. Um die Dichtigkeit von Fenstern zu prüfen, kann ein Blatt Papier zwischen Rahmen und geschlossenem Fenster geklemmt werden. Lässt sich das Papier nicht herausziehen, ist das Fenster dicht genug. Bei Haus- und Wohnungstüren kann meist nachträglich ein Dichtprofil leicht angebracht werden, um Heizverluste zu minimieren.",
            "source": "https://www.verbraucherzentrale.de/wissen/energie/heizen-und-warmwasser/gas-sparen-diese-kleinen-aenderungen-senken-ihren-gasverbrauch-71992"

        },
        {
            "title": "Stromsparen",
            "content": "Vergangenes Jahr wurden in Deutschland laut Fraunhofer-Institut für Solare Energiesysteme (ISE) 10,4 Prozent des Stroms mit Erdgas erzeugt. So lässt sich also auch Gas sparen, wenn Sie weniger Strom verbrauchen.",
            "source": "https://www.verbraucherzentrale.de/wissen/energie/heizen-und-warmwasser/gas-sparen-diese-kleinen-aenderungen-senken-ihren-gasverbrauch-71992"

        }
    ]
}

export const SavingTipList: TipCategory[] = [heizen, wohnen];