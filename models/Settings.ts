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
}

export type Settings = {
    isFirstVisit: boolean,
    connection: MQTT_Connection,
    location: LocationSettings,
    notifySettings: NotifySettings,
    gasprice: number,
    lastMeasurement: number,
}