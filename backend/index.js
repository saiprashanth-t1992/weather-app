require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const formatWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

const formatUnixTime = (unixTs) => {
  return new Date(unixTs * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

const isDay = (sunrise, sunset, now) => {
  return now >= sunrise && now < sunset;
};

app.get('/api/weather/current', async (req, res, next) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'city parameter required' });
    }

    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: OPENWEATHER_API_KEY
      }
    });

    const data = response.data;

    const result = {
      city: data.name,
      country: data.sys.country,
      temp_kelvin: data.main.temp,
      feels_like_kelvin: data.main.feels_like,
      humidity: data.main.humidity,
      wind_speed: Math.round(data.wind.speed * 3.6),
      wind_direction: formatWindDirection(data.wind.deg || 0),
      visibility: Math.round((data.visibility || 0) / 1000),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      sunrise: formatUnixTime(data.sys.sunrise),
      sunset: formatUnixTime(data.sys.sunset),
      is_day: isDay(data.sys.sunrise, data.sys.sunset, data.dt)
    };

    res.json(result);
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'City not found' });
    }
    next(error);
  }
});

app.get('/api/weather/forecast', async (req, res, next) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'city parameter required' });
    }

    const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        q: city,
        appid: OPENWEATHER_API_KEY
      }
    });

    const data = response.data;

    const groups = {};
    for (const slot of data.list) {
      const dateStr = slot.dt_txt.split(' ')[0];
      if (!groups[dateStr]) groups[dateStr] = [];
      groups[dateStr].push(slot);
    }

    const today = new Date().toISOString().split('T')[0];
    const dateKeys = Object.keys(groups).filter(d => d !== today).sort();

    const forecast = dateKeys.slice(0, 5).map(dateStr => {
      const slots = groups[dateStr];

      const high_kelvin = Math.max(...slots.map(s => s.main.temp_max));
      const low_kelvin = Math.min(...slots.map(s => s.main.temp_min));

      let repSlot = slots[Math.floor(slots.length / 2)];
      for (const slot of slots) {
        if (slot.dt_txt.includes('12:00:00')) {
          repSlot = slot;
          break;
        }
      }

      const dateObj = new Date(dateStr + 'T12:00:00Z');
      const dateFormatted = dateObj.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      const dayFormatted = dateObj.toLocaleDateString('en-US', {
        weekday: 'long'
      });

      return {
        date: dateFormatted,
        day: dayFormatted,
        high_kelvin,
        low_kelvin,
        condition: repSlot.weather[0].main,
        icon: repSlot.weather[0].icon,
        humidity: repSlot.main.humidity,
        wind_speed: Math.round(repSlot.wind.speed * 3.6)
      };
    });

    res.json({ forecast });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'City not found' });
    }
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🌤️  Weather App Backend running on port ${PORT}`);
});
