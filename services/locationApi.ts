export function getUserLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve(position);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

const findLocationNameForPosition = async (lat: number, long:number) => {
    try {
        const url = 'https://api.bigdatacloud.net/data/reverse-geocode-client?'
            + 'latitude=' + lat
            + '&longitude=' + long
            + '&localityLanguage=de';
        const res = await fetch(url);
        const data = await res.json();
        const ort = data['city'];
        const plz = data['postcode'];
        if (ort && plz) {
            return {ort, plz};
        }
    } catch (err) {
        console.log(err);
    }
}

