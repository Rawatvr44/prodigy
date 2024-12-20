import React, { useEffect, useState } from "react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forcast";
import getFormattedWeatherData from "./services/weatherservice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [query, setQuery] = useState({ q: 'Ahmedabad' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await getFormattedWeatherData({ ...query, units });
        setWeather(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    getWeather();
  }, [query, units]);

  // Define background images based on weather conditions
  const backgroundImages = {
    'Clear': 'url(C:\Users\rawat\OneDrive\Desktop\weather1\weather\src\rainy.webp)',
    'Rain': 'url(C:\Users\rawat\OneDrive\Desktop\weather1\weather\src\rainy.webp)',
    'Haze': 'url(C:\Users\rawat\OneDrive\Desktop\weather1\weather\src\wether.jpg)',
    // Add more conditions as needed
    'Default': 'url(C:\Users\rawat\OneDrive\Desktop\weather1\weather\src\wether.jpg)' // Default background if condition not found
  };

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Function to format background based on weather condition
  const formatBackground = () => {
    if (!weather || !weather.weather || weather.weather.length === 0) return backgroundImages['Default']; // Default background if weather data is not yet loaded
    const weatherCondition = weather.weather[0].main; // Assuming the first weather entry is the primary condition
    return backgroundImages[weatherCondition] || backgroundImages['Default']; // Return corresponding background based on weather condition
  };

  return (
    <div style={{
      backgroundImage: formatBackground(),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'sans-serif',
      color: '#333'
    }}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          <Forecast title="3 Hour Step Forecast" data={weather.hourly} />
          <Forecast title="Daily Forecast" data={weather.daily} />
        </>
      )}
    </div>
  );
};

export default App;
