import { ForecastCard } from './ForecastCard';

export const ForecastRow = ({ forecast, unit }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {forecast.map((day) => (
        <ForecastCard
          key={day.date}
          day={day.day}
          condition={day.condition}
          icon={day.icon}
          high_kelvin={day.high_kelvin}
          low_kelvin={day.low_kelvin}
          unit={unit}
        />
      ))}
    </div>
  );
};
