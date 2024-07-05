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
        <div className="md:w-[120px] md:h-[100px] min-[320px]:w-[90px] min-[320px]:h-[80px]">
          <img
            src={getIcon(today.weather[0].id)}
            className="w-full h-full object-cover"
            alt="Weather Icon"
          />
        </div>
        <div className="md:w-[150px] w-[100px]">
          <h1 className="text-5xl md:text-6xl font-medium text-gray-700">
            <Degree temp={Math.round(today ? today.main.temp : 0)} deg={isCelsius} />
          </h1>
        </div>
        <div className="md:w-[160px] ml-3 ">
          <h2 className="md:text-lg text-base">
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
      <p className="md:text-base font-semibold pl-3 pb-5 text-sm">
        {`${getPop(today ? today.pop : 0)} of precipitation, clouds at ${
          today ? today.clouds.all : 0
        }%`}
      </p>
    </section>
  );
};

export default CurrentWeather;
