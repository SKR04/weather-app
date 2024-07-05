
import Tile from './Tile'
import { useState } from 'react'
import {
  getHumidityValue,
  getWindDirection,
  getVisibilityValue,
} from './../helpers'

import Card from './Card'
import useForecast from '../hooks/useForecast'
import { forecastType } from '../types'
import { options } from '../constants'
import DropdownSelect from './DropdownSelect'
import CurrentWeather from './CurrentWeather'


type Props = {
  data: forecastType
}

const Forecast = ({ data }: Props) => {
  const {fetchCityData, forecast} = useForecast();
  const today = forecast ? forecast.list[0] : data.list[0]
  const [isCelsius, setIsCelsius] = useState(true);
  
  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };



  return (
    <>
      <button
        className="fixed top-4 right-4 bg-[#303655] hover:border-solid hover:border-cyan-600 text-white font-medium py-2 px-3 rounded w-10 h-10"
        onClick={toggleTemperatureUnit}>&deg;
        {isCelsius ? 'C' : 'F'}
      </button>

    < div className="w-full flex flex-col justify-center align-middle sm:max-w-[600px] sm:px-6 md:max-w-[720px] py-4 md:py-4 md:px-10 lg:px-20 lg:h-full mt-[10vh] bg-gray-400 rounded-md 
    bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 cursor-default min-[320px]:p-10">
    <div className='flex flex-row w-full'>  
    <h1 className='text-lg font-semibold p-2 w-full'>Current Weather</h1>


    <DropdownSelect options={options} fetchCityData={fetchCityData}/>
    </div>
      <div className="mx-auto w-full">
        <CurrentWeather forecast={forecast ? forecast : data} isCelsius={isCelsius}/>


        <section className="flex flex-wrap justify-between text-base text-zinc-700 mt-5 min-[320px]:min-[320px]:justify-evenly">
          
          <Tile
            icon="wind"
            title="Wind"
            info={`${Math.round(today.wind.speed)} km/h ${getWindDirection(
              Math.round(today.wind.deg)
            )}`}
            description={`gusts ${today.wind.gust.toFixed(1)} km/h`}
          />
          <Tile
            icon="humidity"
            title="Humidity"
            info={`${today.main.humidity} %`}
            description={getHumidityValue(today.main.humidity)}
          />
          
          <Tile
            icon="pressure"
            title="Pressure"
            info={`${today.main.pressure} hPa`}
            description={` ${
              Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
            } than the standard`}
          />
          <Tile
            icon="visibility"
            title="Visibility"
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
          />
        </section>



        <h1 className='text-lg font-semibold'>Forecast</h1>
        <div className='relative overflow-hidden'>
          <div className='flex flex-nowrap gap-2 overflow-x-auto scroll-smooth pb-3 pt-2'>
            {forecast?.list.map((item, i) => (
              <Card
                key={i}
                dt={item.dt}
                id={item.weather[0].id}
                temp_max={item.main.temp_max}
                temp_min={item.main.temp_min}
                isCelsius={isCelsius}
              />
            ))}
          </div>

        </div>
        
      </div>
    </div>
    </>
  )
}

export default Forecast
