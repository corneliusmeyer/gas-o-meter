import {Location, Settings} from "../models/Settings";


export function askNotificationPermission(): Promise<NotificationPermission> {
    return new Promise((resolve, reject) => {
        if (!('Notification' in window)) {
            reject(new Error('Der Browser unterstüzt diese Funktion nicht.'));
        } else if (Notification.permission === 'granted') {
            resolve(Notification.permission);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                resolve(permission);
            });
        } else {
            reject(new Error('Die Anfrage wurde abgelehnt'));
        }
    });
}

function getUserLocationFromApi(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve(position);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

export async function getUserLocation(): Promise<Location | undefined> {
    try {
        const pos = await getUserLocationFromApi();
        if (pos.coords) {
            const location: Location = {
                long: pos.coords.longitude,
                lat: pos.coords.latitude,
            };
            return location;
        }
    }
    catch (err) {
        return undefined;
    }
}

export const getCityNameForPosition = async (loc: Location) => {
    try {
        const url = 'https://api.bigdatacloud.net/data/reverse-geocode-client?'
            + 'latitude=' + loc.lat
            + '&longitude=' + loc.long
            + '&localityLanguage=de';
        const res = await fetch(url);
        const data = await res.json();
        const ort = data['city'];
        const plz = data['postcode'];
        if (ort && plz) {
            return `${ort} ${plz}`;
        }
    } catch (err) {
        console.log(err);
    }
}

export const getTemperatureForLocation = async (lat: number, long: number) => {
    const url = "https://api.open-meteo.com/v1/forecast?" +
        "latitude=" + lat +
        "&longitude=" + long +
        "&current_weather=true";
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.current_weather.temperature;
    }
    catch (err) {
        console.log(err);
    }
}

export const saveSettings = async (settings: Settings) => {
    return await fetch('/api/settings', {
        method: 'POST',
        body: JSON.stringify(settings),
        headers: {'Content-Type': 'application/json'},
    });
}