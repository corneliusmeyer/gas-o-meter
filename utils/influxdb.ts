import {flux, InfluxDB, Point} from "@influxdata/influxdb-client";
import {Measurement, MeasurementInput, MeasurementType} from "../models/Measurement";
import {DateRange} from "../models/DateRange";

const influxDB = new InfluxDB({
    url: 'http://localhost:8086',
    token: 'Bxeo5LlnxN7hnX1y-qXbqWYvNZop6vOmcPGSiY08-2G2H_977WoNWQhhupe8XR-2mkvMV-32sBrOFMUSbnzXQQ==',
});

export const writeMeasurementToInflux = (measurement: MeasurementInput):boolean => {
    try {
        const writeApi = influxDB.getWriteApi('private', 'gasometer');
        let point = new Point('measurement')
            .floatField('gascount', measurement.gascount)
            .floatField('gasprice', measurement.gasprice);
        if(measurement.temperature)
            point.floatField('temperature', measurement.temperature);
        writeApi.writePoint(point);
        writeApi.close();
        return true;
    }
    catch (error) {
        console.log(error);
    }
    return false;
}

export const readMeasurementsInRange = async (range:DateRange, type: MeasurementType) : Promise<Array<Measurement> | null> => {
    try {
        const readApi = influxDB.getQueryApi('private');
        let query = flux`from(bucket: "gasometer") 
          |> range(start: ${range.startDate}, stop: ${range.endDate})
          |> filter(fn: (r) => r["_measurement"] == "measurement")`;
        if (type === "gasusage") {
            query += `|> difference(columns: ["gascount"])
                      |> filter(fn: (r) => r["_field"] == "gascount")
                      |> difference()`;
        }
        else query += `|> filter(fn: (r) => r["_field"] == "${type}")`;
        const rows = await readApi.collectRows(query);
        const lineData = rows.map((row: any): Measurement => ({
            type: type,
            time: new Date(row._time).toISOString(),
            value: row._value,
        }));
        return lineData;
    }
    catch (e) {
        console.log(e);
        return null
    }
}