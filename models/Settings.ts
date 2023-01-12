export type Location = {
    active: boolean,
    long?: number,
    lat?: number,
}

export type Settings = {
    location: Location,
    gasprice: number,
    lastMeasurement: number,
}
