export type MeasurementType = "Gasvalue" | "Temperature" | "Gasprice";

export type Measurement = {
    type: MeasurementType,
    time: Date,
    value: Number,
}

export type MeasurementInput = {
    gasvalue: number,
    gasprice: number,
    temperature?: number,
}