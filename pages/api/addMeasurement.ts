import {NextApiRequest, NextApiResponse} from "next";
import {readSettings, writeSettings} from "../../services/StorageManager";
import {MeasurementInput} from "../../models/Measurement";
import {writeMeasurementToInflux} from "../../services/influxdb";
import {Settings} from "../../models/Settings";
import {getTemperatureForLocation_api} from "../../services/temperatureApi";

function applyTemperature(settings: Settings) : number | undefined {
    if(settings.location && settings.location.active) {
        const long = settings.location.long;
        const lat = settings.location.lat;
        if(long && lat) {
            getTemperatureForLocation_api(lat, long).then((temp:number) => {
                if(Number.isFinite(temp)) {
                    return temp;
                }
            });
        }
    }
    return undefined;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) : any {
    const settings = readSettings();
    const val = Number(req.query.value);
    if(Number.isFinite(val) && settings.lastMeasurement < val) {
        const price = settings.gasprice;
        let measurement:MeasurementInput = {
            gasprice: price,
            gasvalue: val,
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