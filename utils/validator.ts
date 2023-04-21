import {LocationSettings, MQTT_Connection, Settings} from "../models/Settings";

export function isValidSettings(settings: any) : settings is Settings {
    return (
        typeof settings === "object" &&
        typeof settings.isFirstVisit === "boolean" &&
        typeof settings.gasprice === "number" &&
        typeof settings.lastMeasurement === "number" &&
        typeof settings.location === "object" &&
        typeof settings.connection === "object" &&
        typeof settings.notifySettings === "object"
    );
}

export function isValidConnection(connection:MQTT_Connection) {
    return !(connection.active && (connection.topic.length < 2 || connection.ipAdress.length < 5 || connection.port < 0));
}

export function isValidLocation(location: LocationSettings) {
    return !location.active ? true : location.location.lat > -1000 && location.location.long > -1000;
}

export function isValidGaspric(price: number) {
    return price > 0;
}

export function isValidMeasurement(measurement:number, current:number) {
    return measurement > current;
}