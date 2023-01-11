import {readFileSync, writeFileSync} from 'fs';
import {Settings} from "../models/Settings";

const filename = 'storage.json';

export const readSettings = () : Settings => {
    const data = readFileSync(filename, 'utf8');
    console.log(data);
    return JSON.parse(data);
}

export const writeSettings = (settings : Settings) => {
    const json = JSON.stringify(settings);
    writeFileSync(filename, json);
}