export type MeasurementType = "gasprice" | "temperature" | "gascount" | "gasusage" | "temperature_and_usage";

export type Measurement = {
    type: MeasurementType
    time: string,
    value: number,
}

export type MeasurementInput = {
    gascount: number,
    gasprice: number,
    temperature?: number,
}