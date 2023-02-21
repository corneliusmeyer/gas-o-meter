import {Settings} from "../models/Settings";

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