export type MQTT_Connection = {
    active: boolean,
    ipAdress: string,
    port: number,
    topic: string,
    username?: string,
    password?: string,
}

export type LocationSettings = {
    active: boolean,
    long: number,
    lat: number,
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