export const getTemperatureForLocation_api = async (breitengrad: string, laengengrad: string) => {
    try {
        const url = "https://api.open-meteo.com/v1/forecast?" +
            "latitude=" + breitengrad +
            "&longitude=" + laengengrad +
            "&current_weather=true";
        const res = await fetch(url);
        const data = await res.json();
        return data.current_weather.temperature;
    }
    catch (error) {
        console.log(error);
    }
}