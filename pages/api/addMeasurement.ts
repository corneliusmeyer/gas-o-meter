import {NextApiRequest, NextApiResponse} from "next";
import {readSettings, writeSettings} from "../../utils/storagehelper";
import {MeasurementInput} from "../../models/Measurement";
import {writeMeasurementToInflux} from "../../utils/influxdb";
import {Settings} from "../../models/Settings";

function applyTemperature(settings: Settings) : number | undefined {
    if(settings.location && settings.location.active) {
        return undefined;
    }
    return undefined;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) : any {
    const settings = readSettings();
    const val = Number(req.query.value);
    if(settings && Number.isFinite(val) && settings.lastMeasurement < val) {
        const price = settings.gasprice;
        let measurement:MeasurementInput = {
            gasprice: price,
            gascount: val,
        };
        measurement.temperature = applyTemperature(settings);
        if(writeMeasurementToInflux(measurement)) {
            settings.lastMeasurement = val;
            writeSettings(settings);
            return res.status(200).end();
        }
    }
    return res.status(400).end();
}