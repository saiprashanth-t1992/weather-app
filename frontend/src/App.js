import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { LoadingSpinner } from './components/LoadingSpinner';
import { CurrentWeather } from './components/CurrentWeather';
import { WeatherDetails } from './components/WeatherDetails';
import { ForecastRow } from './components/ForecastRow';
import { fetchCurrentWeather, fetchForecast } from './utils/api';
import { getWeatherBackground } from './utils/weatherHelpers';
import './index.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('C');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [fetchedAt, setFetchedAt] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('weather_last_city') || 'Hyderabad';
    const recents = JSON.parse(localStorage.getItem('weather_recent_searches') || '[]');
    setRecentSearches(recents);
    handleSearch(saved);
  }, []);

  const handleSearch = async (cityName) => {
    setLoading(true);
    setError('');

    try {
      const [currentData, forecastData] = await Promise.all([
        fetchCurrentWeather(cityName),
        fetchForecast(cityName)
      ]);

      setWeather(currentData);
      setForecast(forecastData.forecast);
      setCity(cityName);
      setFetchedAt(new Date());

      localStorage.setItem('weather_last_city', cityName);

      let recents = [cityName, ...recentSearches];
      recents = [...new Set(recents)];
      recents = recents.slice(0, 5);
      setRecentSearches(recents);
      localStorage.setItem('weather_recent_searches', JSON.stringify(recents));
    } catch (err) {
      if (err.response?.status === 404) {
        setError('City not found. Try again!');
      } else {
        setError('Network error. Is the backend running?');
      }
    } finally {
      setLoading(false);
    }
  };

  const bgClass = weather
    ? getWeatherBackground(weather.condition, weather.is_day)
    : 'bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600';

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${bgClass} flex items-center justify-center p-4`}
    >
      <div className="max-w-2xl w-full mx-auto flex flex-col gap-6">
        <SearchBar onSearch={handleSearch} loading={loading} recentSearches={recentSearches} />

        {error && (
          <div className="bg-red-500/20 border border-red-400/50 text-white rounded-xl p-4">
            {error}
          </div>
        )}

        {loading && <LoadingSpinner />}

        {weather && !loading && (
          <>
            <CurrentWeather
              weather={weather}
              unit={unit}
              onToggleUnit={() => setUnit(u => u === 'C' ? 'F' : 'C')}
              fetchedAt={fetchedAt}
            />

            <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              <WeatherDetails
                humidity={weather.humidity}
                wind_speed={weather.wind_speed}
                wind_direction={weather.wind_direction}
                feels_like_kelvin={weather.feels_like_kelvin}
                visibility={weather.visibility}
                unit={unit}
              />
            </div>

            {forecast.length > 0 && (
              <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <ForecastRow forecast={forecast} unit={unit} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
