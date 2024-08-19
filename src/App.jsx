import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
import React, { useState, useEffect } from "react";
import DropDowns from "./Dropdowns/DropDowns";

const App = () => {
    const url = "https://myweatherapp.azurewebsites.net/weather/";
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);

    const getWeatherData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        setCities(data);
    };

    useEffect(() => {
        getWeatherData();
    }, []);

    const handleSelectCity = (city) => {
        // Zaokrouhlení rychlosti větru na 2 desetinná místa -> toFixed()
        //city.weather_description = "Freezing drizzle"; //tento řádek je pro účely testování
        city.wind_speed_m_per_s = parseFloat(
            city.wind_speed_m_per_s.toFixed(2)
        );
        setSelectedCity(city);
    };

    // Funkce pro nastavení třídy pozadí na základě weather_description
    const getBackgroundClass = () => {
        if (selectedCity) {
            const { weather_description } = selectedCity;
            if (
                ["Sunny", "Clear", "Partly cloudy", "Partly Cloudy"].includes(
                    weather_description
                )
            ) {
                return "weather-clear";
            } else if (
                [
                    "Cloudy",
                    "Overcast",
                    "Patchy rain possible",
                    "Patchy light drizzle",
                ].includes(weather_description)
            ) {
                return "weather-mist";
            } else if (
                ["Mist", "Fog", "Freezing fog"].includes(weather_description)
            ) {
                return "weather-mist";
            } else if (
                [
                    "Ice pellets",
                    "Thundery outbreaks possible",
                    "Light showers of ice pellets",
                    "Moderate or heavy showers of ice pellets",
                    "Patchy light rain with thunder",
                    "Moderate or heavy rain with thunder",
                    "Thundery outbreaks in nearby",
                ].includes(weather_description)
            ) {
                return "weather-thunderstorm";
            } else if (
                [
                    "Patchy snow possible",
                    "Blowing snow",
                    "Blizzard",
                    "Light sleet",
                    "Moderate or heavy sleet",
                    "Patchy light snow",
                    "Light snow",
                    "Patchy moderate snow",
                    "Moderate snow",
                    "Patchy heavy snow",
                    "Heavy snow",
                    "Patchy light snow with thunder",
                    "Moderate or heavy snow with thunder",
                    "Moderate or heavy snow showers",
                    "Light snow showers",
                ].includes(weather_description)
            ) {
                return "weather-snow";
            } else if (
                [
                    "Light drizzle",
                    "Patchy light rain",
                    "Light rain",
                    "Moderate rain at times",
                    "Moderate rain",
                    "Heavy rain at times",
                    "Heavy rain",
                    "Light rain shower",
                    "Moderate or heavy rain shower",
                    "Torrential rain shower",
                    "Patchy rain nearby",
                ].includes(weather_description)
            ) {
                return "weather-rainy";
            } else if (
                [
                    "Freezing drizzle",
                    "Heavy freezing drizzle",
                    "Light freezing rain",
                    "Moderate or heavy freezing rain",
                    "Light sleet showers",
                    "Moderate or heavy sleet showers",
                    "Patchy sleet possible",
                    "Patchy freezing drizzle possible",
                ].includes(weather_description)
            ) {
                return "weather-freez";
            }
        }
        return "weather-default";
    };

    return (
        <div>
            <div className={`app-container ${getBackgroundClass()}`}>
                <div className="content-container container mt-4 text-center">
                    <h1 className="text-center p-3">
                        Počasí pro vybraná světová města
                    </h1>
                    <DropDowns
                        cities={cities}
                        onSelectCity={handleSelectCity}
                    />

                    {selectedCity && (
                        <div className="mt-4">
                            <h2>{selectedCity.location}</h2>
                            <p>
                                <strong>Čas:</strong> {selectedCity.timestamp}
                            </p>
                            <p>
                                <strong>Teplota:</strong>{" "}
                                {selectedCity.temp_celsius} °C
                            </p>
                            <p>
                                <strong>Relativní vlhkost:</strong>{" "}
                                {selectedCity.relative_humidity} %
                            </p>
                            <p>
                                <strong>Rychlost větru:</strong>{" "}
                                {selectedCity.wind_speed_m_per_s} m/s
                            </p>
                            <p>
                                <strong>Směr větru:</strong>{" "}
                                {selectedCity.wind_direction}
                            </p>
                            <p>
                                <strong>Popis počasí:</strong>{" "}
                                {selectedCity.weather_description}
                            </p>
                        </div>
                    )}
                    <div className="pt-3">
                        <a
                            rel="noopener noreferrer"
                            href="https://myweatherapp.azurewebsites.net/weather/"
                            target="_blank">
                            ODKAZ
                        </a>{" "}
                        na mou backend aplikaci v Java Spring Boot, z níž jsou
                        čerpána data pro tuto frontend aplikaci.
                    </div>

                    <p className="pt-3">&copy; 2024 Libor Šaja</p>
                </div>
            </div>
        </div>
    );
};

export default App;
