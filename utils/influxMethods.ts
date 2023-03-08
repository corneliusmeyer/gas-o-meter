import {DateRange} from "../models/DateRange";
import {readMeasurementsInRange} from "./influxdb";

export const readGasPriceInRange = (range: DateRange) => readMeasurementsInRange(range, "gasprice");

export const readTemperatureInRange = (range: DateRange) => readMeasurementsInRange(range, "temperature");

export const readGasCountInRange = (range: DateRange) => readMeasurementsInRange(range, "gascount");

export const readGasUsageInRange = (range: DateRange) => readMeasurementsInRange(range, "gasusage");

export const getAverageGasUsageForTimeAndTemperature = (time: Date, temp: number) => {

}