import React from 'react';
import Degree from './Degree';
import getIcon from '../helpers/getIcon';
interface CardProps {
  dt: number; 
  id: number;
  temp_max: number;
  temp_min: number;
  isCelsius: boolean;
  
}

const Card: React.FC<CardProps> = ({ dt, id, temp_max, temp_min, isCelsius}) => {
    function convertUnixToHHMM(dt: number,): String {
        const date = new Date(dt * 1000); 
      
        let hours = date.getHours();
        const minutes = ('0' + date.getMinutes()).slice(-2); 
        const amOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        
        const timeString = `${hours}:${minutes} ${amOrPm}`;
        return timeString;
      }
    
      function getFormattedDay(dt: number): string {
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const date = new Date(dt * 1000);
        const dayIndex = date.getDay();
        const dayName = daysOfWeek[dayIndex];
        return dayName;
    }

  return (
    <section className="w-[140px] h-[130px] text-slate-800 bg-white/20 backdrop-blur-ls drop-shadow-lg p-2 rounded-xl cursor-default -z-10">
      <div className='pl-1 text-base text-slate-900'>{convertUnixToHHMM(dt)}</div>
      <div className='flex align-middle items-center justify-evenly gap-1'>
        <div className='w-[70px] h-[70px]'><img src={getIcon(id)} className='w-full h-full object-cover' alt="Weather Icon" /></div>
        <div className='flex items-center align-middle flex-col text-m font-bold gap-3'>
          <p><Degree temp={Math.ceil(temp_max)} deg={isCelsius} /></p>
          <p><Degree temp={Math.ceil(temp_min)} deg={isCelsius} /></p>
        </div>
      </div>
      <p className='text-center'>{getFormattedDay(dt)}</p>
    </section>
  );
};

export default Card;
