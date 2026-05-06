import { useState, useEffect } from 'react';
import { kelvinToUnit, getWeatherEmoji } from '../utils/weatherHelpers';

export const CurrentWeather = ({ weather, unit, onToggleUnit, fetchedAt }) => {
  const temp = kelvinToUnit(weather.temp_kelvin, unit);
  const emoji = getWeatherEmoji(weather.condition, weather.icon);
  const [displayTemp, setDisplayTemp] = useState(temp);
  const [timeAgo, setTimeAgo] = useState('just now');

  useEffect(() => {
    const startTemp = kelvinToUnit(weather.temp_kelvin, unit) - 10;
    let current = startTemp;
    const target = temp;
    const step = (target - startTemp) / 20;
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      current += step;
      if (frame >= 20) {
        setDisplayTemp(target);
        clearInterval(interval);
      } else {
        setDisplayTemp(Math.round(current));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [temp, unit, weather.temp_kelvin]);

  useEffect(() => {
    if (!fetchedAt) return;

    const updateTime = () => {
      const now = new Date();
      const diffMs = now - new Date(fetchedAt);
      const diffMins = Math.floor(diffMs / 60000);

      if (diffMins === 0) {
        setTimeAgo('just now');
      } else if (diffMins < 60) {
        setTimeAgo(`${diffMins} min${diffMins > 1 ? 's' : ''} ago`);
      } else {
        const diffHours = Math.floor(diffMins / 60);
        setTimeAgo(`${diffHours} hour${diffHours > 1 ? 's' : ''} ago`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [fetchedAt]);

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-xl w-full animate-fadeIn">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-white text-3xl font-bold">{weather.city}, {weather.country}</h1>
          <p className="text-white/60 text-sm mt-1 capitalize">{weather.description}</p>
          <p className="text-white/40 text-xs mt-2">Updated {timeAgo}</p>
        </div>
        <button
          onClick={onToggleUnit}
          className="bg-white/20 hover:bg-white/30 text-white rounded-full px-4 py-2 transition min-h-[44px] active:scale-95"
        >
          °C / °F
        </button>
      </div>

      <div className="flex items-center gap-6 my-8">
        <p className="text-7xl animate-scaleIn">{emoji}</p>
        <p className="text-white text-8xl font-thin tabular-nums">{displayTemp}°</p>
      </div>

      <div className="flex items-center justify-between text-white/60 text-sm">
        <p>🌅 {weather.sunrise}</p>
        <p>🌇 {weather.sunset}</p>
      </div>
    </div>
  );
};
