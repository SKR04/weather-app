import React from 'react';
import { forecastType } from '../types';
import { getFeelsLike, getPop } from '../helpers';
import getIcon from '../helpers/getIcon';
import Degree from './Degree';

type Props = {
  forecast: forecastType;
  isCelsius: boolean;
};

const CurrentWeather: React.FC<Props> = ({ forecast, isCelsius }) => {
    const today = forecast.list[0];
  return (
    <section className="flex justify-center align-middle flex-col rounded-2xl bg-white/20">
      <div className="text-l font-bold pl-3 py-2">
        {forecast ? forecast.name : ''}{' '}
        <span className="font-normal">{forecast ? forecast.country : ''}</span>
      </div>
      <div className="flex gap-3 items-center justify-start">
        <div className="w-[120px] h-[100px]">
          <img
            src={getIcon(today.weather[0].id)}
            className="w-full h-full object-cover"
            alt="Weather Icon"
          />
        </div>
        <div className="w-[150px]">
          <h1 className="text-6xl font-medium text-gray-700">
            <Degree temp={Math.round(today ? today.main.temp : 0)} deg={isCelsius} />
          </h1>
        </div>
        <div className="w-[160px] ml-3">
          <h2 className="text-lg">
            {today
              ? today.weather[0].description.charAt(0).toUpperCase() +
                today.weather[0].description.slice(1)
              : ''}
            <br />
            {getFeelsLike(
              Math.round(today ? today.main.feels_like - today.main.temp : 0)
            )}
          </h2>
        </div>
      </div>
      <p className="text-base font-semibold pl-3 pb-5">
        {`${getPop(today ? today.pop : 0)} of precipitation, clouds at ${
          today ? today.clouds.all : 0
        }%`}
      </p>
    </section>
  );
};

export default CurrentWeather;
