import { kelvinToUnit, getWeatherEmoji } from '../utils/weatherHelpers';

export const ForecastCard = ({ day, condition, icon, high_kelvin, low_kelvin, unit }) => {
  const high = kelvinToUnit(high_kelvin, unit);
  const low = kelvinToUnit(low_kelvin, unit);
  const emoji = getWeatherEmoji(condition, icon);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 flex flex-col items-center gap-1 min-w-[80px] hover:bg-white/20 hover:shadow-lg transition-all duration-300 cursor-pointer">
      <p className="text-white text-sm font-semibold">{day.substring(0, 3)}</p>
      <p className="text-3xl hover:scale-110 transition-transform duration-200">{emoji}</p>
      <p className="text-white text-xs font-semibold">{high}°</p>
      <p className="text-white/60 text-xs">{low}°</p>
    </div>
  );
};
