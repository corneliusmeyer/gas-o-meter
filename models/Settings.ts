export type MQTT_Connection = {
    active: boolean,
    ipAdress: string,
    port: number,
    topic: string,
    username?: string,
    password?: string,
}

export type Location = {
    long: number,
    lat: number,
}

export type LocationSettings = {
    active: boolean,
    location: Location,
}

export type NotifySettings = {
    active: boolean,
    highUsage: boolean,
    detection: boolean,
    costsanalysis: boolean,
    reviews: boolean,
    errors: boolean,
}

export type Settings = {
    isFirstVisit: boolean,
    connection: MQTT_Connection,
    location: LocationSettings,
    notifySettings: NotifySettings,
    gasprice: number,
    lastMeasurement: number,
    yearlyUsage: number,
    basiccharge: number,
}