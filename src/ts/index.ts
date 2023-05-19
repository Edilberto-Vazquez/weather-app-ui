export { WeatherApp } from "./pages/WeatherApp";

fetch(
    "http://localhost:8001/api/v1/weather/stations/InaoeWeatherStations/RadialChart/?dates=2017-02-01,2017-02-28"
)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
