import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import { optionType, forecastType, DropdownOptionType } from '../types/index';
import { defaultCity } from '../constants';

const BASE_URL = 'http://api.openweathermap.org';

const useForecast = () => {
  const [city, setCity] = useState<optionType | null>(defaultCity);
  const [forecast, setForecast] = useState<forecastType | null>(null);
  const [loading, setLoading] = useState(false); 

  const fetchCityData = (option: DropdownOptionType) => {
    setLoading(true);
    fetch(
      `${BASE_URL}/geo/1.0/direct?q=${option.value}&limit=5&lang=en&appid=${import.meta.env.VITE_API_KEY}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch city data');
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 0) {
          setCity(data[0]);
          toast.success('City data fetched successfully');
        } else {
          throw new Error('No city data found');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch city data');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getForecast = (data: optionType) => {
    setLoading(true); 
    fetch(
      `${BASE_URL}/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&units=metric&lang=en&appid=${import.meta.env.VITE_API_KEY}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch forecast data');
        }
        return res.json();
      })
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        };
        setForecast(forecastData);
        toast.success('Forecast data fetched successfully');
      })
      .catch((e) => {
        console.error('Error fetching forecast:', e);
        toast.error('Failed to fetch forecast data');
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after fetch completes
      });
  };

  useEffect(() => {
    if (city) {
      getForecast(city);
    }
  }, [city]);

  return {
    forecast,
    fetchCityData,
    loading, // Expose loading state to components
  };
};

export default useForecast;
