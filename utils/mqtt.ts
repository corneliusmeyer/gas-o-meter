import {MQTT_Connection} from "../models/Settings";
import mqtt from 'mqtt';

export async function testMQTTConnection(settings: MQTT_Connection): Promise<boolean> {
    const ip = settings.ipAdress;
    const port = settings.port;
    const topic = settings.topic;

    try {
        const client = mqtt.connect(`mqtt://${ip}:${port}`, {connectTimeout: 1000});
        await Promise.race([
            new Promise<void>((resolve, reject) => {
                client.on("connect", () => {
                    resolve();
                    client.subscribe(topic, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            client.unsubscribe(topic);
                            resolve();
                        }
                    });
                });
                client.on("error", (err) => {
                    reject(err);
                });
            }),
            new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    reject();
                }, 1000);
            }),
        ]);
        client.end();
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
