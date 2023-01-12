export const getTemperatureForLocation_api = async (lat: number, long: number) => {
    try {
        const url = "https://api.open-meteo.com/v1/forecast?" +
            "latitude=" + lat +
            "&longitude=" + long +
            "&current_weather=true";
        const res = await fetch(url);
        const data = await res.json();
        return data.current_weather.temperature;
    }
    catch (error) {
        console.log(error);
    }
}