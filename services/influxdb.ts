import {flux, InfluxDB, Point} from '@influxdata/influxdb-client'
import {Measurement, MeasurementInput, MeasurementType} from "../models/Measurement";

const influxDB = new InfluxDB({
    url: 'http://localhost:8086',
    token: 'vodO6dU4RO9gLn0QCsv3LXRN9NoSfKh4U00IZkIsVBzhfTXL5W1wtRRSogsZo20MQNeLFMCPeteXSFvyspphtA==',
});

export const writeMeasurementToInflux = (measurement: MeasurementInput) => {
    try {
        const writeApi = influxDB.getWriteApi('private', 'gasometer');
        let point = new Point('gas_measurement')
            .floatField('gas_value', measurement.gasvalue)
            .floatField('gas_price', measurement.gasprice);
        if(measurement.temperature)
            point.floatField('temperature', measurement.temperature);
        writeApi.writePoint(point);
        writeApi.close();
        return true;
    }
    catch (error) {
        console.log(error);
    }
}

const readMeasurements = async (type: MeasurementType) : Promise<Array<Measurement>> => {
    const readApi = influxDB.getQueryApi('private');
    const query = flux`from(bucket: "gasometer") 
      |> range(start: -3d)
      |> filter(fn: (r) => r["_measurement"] == "gas_messung")
      |> filter(fn: (r) => r["_field"] == "gas_value")`;
    const rows = await readApi.collectRows(query);
    const lineData = rows.map((row : any) : Measurement => ({
        type,
        time: new Date(row._time),
        value: row._value,
    }));
    return lineData;
}

export const readGasValue = () => readMeasurements("Gasvalue");

export const readTemperature = () => readMeasurements("Temperature");

export const readGasPrice = () => readMeasurements("Gasprice");