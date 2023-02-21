import {flux, InfluxDB, Point} from "@influxdata/influxdb-client";
import {Measurement, MeasurementInput, MeasurementType} from "../models/Measurement";
import {DateRange} from "../models/DateRange";

const influxDB = new InfluxDB({
    url: 'http://localhost:8086',
    token: 'vodO6dU4RO9gLn0QCsv3LXRN9NoSfKh4U00IZkIsVBzhfTXL5W1wtRRSogsZo20MQNeLFMCPeteXSFvyspphtA==',
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

const readMeasurementsInRange = async (range:DateRange, type: MeasurementType) : Promise<Array<Measurement>> => {
    const readApi = influxDB.getQueryApi('private');
    let query = flux`from(bucket: "gasometer") 
      |> range(start: ${range.startDate}, stop: ${range.endDate})
      |> filter(fn: (r) => r["_measurement"] == "measurement")`;
    if(type === "gasusage") {
        query += `|> difference(columns: ["gascount"])`;
    }
    else if(type === "temperature_and_usage") {

    }
    else {
        query += `|> filter(fn: (r) => r["_field"] == "${type}")`;
    }
    const rows = await readApi.collectRows(query);
    const lineData = rows.map((row : any) : Measurement => ({
        type: type,
        time: new Date(row._time).toISOString(),
        value: row._value,
    }));
    return lineData;
}

export const readGasPriceInRange = (range: DateRange) => readMeasurementsInRange(range, "gasprice");

export const readTemperatureInRange = (range: DateRange) => readMeasurementsInRange(range, "temperature");

export const readGasCountInRange = (range: DateRange) => readMeasurementsInRange(range, "gascount");

export const readGasUsageInRange = (range: DateRange) => readMeasurementsInRange(range, "gasusage");

export const readTemperatureAndGasUsageInRange = (range: DateRange) => readMeasurementsInRange(range, "temperature_and_usage");