import {flux, InfluxDB, Point} from "@influxdata/influxdb-client";
import {Measurement, MeasurementInput, MeasurementType} from "../models/Measurement";
import {DateRange} from "../models/DateRange";

const influxDB = new InfluxDB({
    url: 'http://localhost:8086',
    token: 'g0a1s2o3m4t5e6r7',
});

export const writeMeasurementToInflux = (measurement: MeasurementInput):boolean => {
    try {
        const writeApi = influxDB.getWriteApi('private', 'gasometer');
        let point = new Point('measurement')
            .floatField('gascount', measurement.gascount)
            .floatField('gasprice', measurement.gasprice);
        if(measurement.temperature){
            point.floatField('temperature', measurement.temperature);
        }
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

export const deleteValuesInRange = async (range: DateRange): Promise<boolean> => {
    const url = 'http://localhost:8086/api/v2/delete?org=private&bucket=gasometer';
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Token g0a1s2o3m4t5e6r7',
            'Content-Type': 'application/json',
            'Accept': 'application/csv',
        },
        body: JSON.stringify({
            start: range.startDate.toISOString(),
            stop: range.endDate.toISOString(),
        }),
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export const findMaximumGascount = async (): Promise<number> => {
    try {
        const readApi = influxDB.getQueryApi('private');
        let query = flux`from(bucket: "gasometer")
          |> range(start: -10y)
          |> filter(fn: (r) => r["_measurement"] == "measurement")
          |> filter(fn: (r) => r["_field"] == "gascount")
          |> max(column: "_value")
          |> keep(columns: ["_value"])`;
        const result:any = await readApi.collectRows(query);
        if(result && result.length > 0) {
            const max = result?.rows[0]?._value;
            if(max) return max;
            else return 0;
        }
        return 0;

    } catch (e) {
        return 0;
    }
};
