import {readFileSync, writeFileSync} from 'fs';
import {Settings} from "../models/Settings";
import {isValidSettings} from "./validator";

const filename = 'Storage.json';

export const readSettings = () : Settings | null => {
    const data = readFileSync(filename, 'utf8');
    if(data) {
        const settings = JSON.parse(data);
        if(isValidSettings(settings))
            return settings;
    }
    return null;
}

export const writeSettings = (settings : Settings) => {
    if(isValidSettings(settings)) {
        const json = JSON.stringify(settings, null, '  ');
        writeFileSync(filename, json);
    }
}