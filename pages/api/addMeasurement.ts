import {NextApiRequest, NextApiResponse} from "next";
import {readSettings, writeSettings} from "../../utils/storagehelper";
import {MeasurementInput} from "../../models/Measurement";
import {writeMeasurementToInflux} from "../../utils/influxdb";
import {Settings} from "../../models/Settings";
import {getTemperatureForLocation} from "../../utils/apis";
import {isValidMeasurement} from "../../utils/validator";

async function applyTemperature(settings: Settings) : Promise<number | undefined> {
    if(settings.location && settings.location.active) {
        const lat = settings.location.location.lat;
        const long = settings.location.location.long;
        if(lat && long) {
            const temp = await getTemperatureForLocation(lat, long);
            if(temp && Number.isFinite(temp)) {
                return temp;
            }
        }
    }
    return undefined;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse)  {
    const settings = await readSettings();
    const val = Number(req.query.value);
    if(settings && isValidMeasurement(val, settings.lastMeasurement)) {
        const price = settings.gasprice;
        let measurement:MeasurementInput = {
            gasprice: price,
            gascount: val,
        };
        measurement.temperature = await applyTemperature(settings);
        if(writeMeasurementToInflux(measurement)) {
            settings.lastMeasurement = val;
            writeSettings(settings);
            return res.status(200).end();
        }
    }
    return res.status(400).end();
}