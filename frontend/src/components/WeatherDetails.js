import { kelvinToUnit } from '../utils/weatherHelpers';

export const WeatherDetails = ({ humidity, wind_speed, wind_direction, feels_like_kelvin, visibility, unit }) => {
  const feelsLike = kelvinToUnit(feels_like_kelvin, unit);

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center">
        <p className="text-3xl">💧</p>
        <p className="text-white/60 text-sm mt-2">Humidity</p>
        <p className="text-white text-2xl font-semibold">{humidity}%</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center">
        <p className="text-3xl">💨</p>
        <p className="text-white/60 text-sm mt-2">Wind</p>
        <p className="text-white text-2xl font-semibold">{wind_speed} km/h</p>
        <p className="text-white/60 text-xs">{wind_direction}</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center">
        <p className="text-3xl">🌡️</p>
        <p className="text-white/60 text-sm mt-2">Feels Like</p>
        <p className="text-white text-2xl font-semibold">{feelsLike}°</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center">
        <p className="text-3xl">👁️</p>
        <p className="text-white/60 text-sm mt-2">Visibility</p>
        <p className="text-white text-2xl font-semibold">{visibility} km</p>
      </div>
    </div>
  );
};
