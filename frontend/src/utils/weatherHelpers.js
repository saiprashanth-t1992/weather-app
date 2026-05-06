export const kelvinToCelsius = (k) => Math.round(k - 273.15);
export const celsiusToFahrenheit = (c) => Math.round((c * 9 / 5) + 32);
export const kelvinToUnit = (k, unit) => {
  const celsius = kelvinToCelsius(k);
  return unit === 'F' ? celsiusToFahrenheit(celsius) : celsius;
};
export const getWeatherBackground = (condition, isDay) => {
  if (!isDay) return 'bg-gradient-to-br from-indigo-900 via-blue-900 to-gray-900';
  switch (condition) {
    case 'Clear': return 'bg-gradient-to-br from-orange-400 via-yellow-300 to-blue-400';
    case 'Clouds': return 'bg-gradient-to-br from-gray-400 via-gray-300 to-blue-300';
    case 'Rain':
    case 'Drizzle': return 'bg-gradient-to-br from-blue-900 via-blue-700 to-gray-600';
    case 'Thunderstorm': return 'bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900';
    case 'Snow': return 'bg-gradient-to-br from-blue-100 via-white to-blue-200';
    default: return 'bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400';
  }
};
export const getWeatherEmoji = (condition, icon) => {
  const isNight = icon && icon.endsWith('n');
  if (condition === 'Clear') return isNight ? '🌙' : '☀️';
  if (condition === 'Clouds') return '☁️';
  if (condition === 'Rain') return '🌧️';
  if (condition === 'Drizzle') return '🌦️';
  if (condition === 'Thunderstorm') return '⛈️';
  if (condition === 'Snow') return '❄️';
  if (condition === 'Mist' || condition === 'Fog' || condition === 'Haze') return '🌫️';
  return '🌤️';
};
