import { useState } from 'react'
import Feels from './Icons/Feels'
import Humidity from './Icons/Humidity'
import Pop from './Icons/Pop'
import Pressure from './Icons/Pressure'
import Visibility from './Icons/Visibility'
import Wind from './Icons/Wind'

type Props = {
  icon: 'wind' | 'feels' | 'humidity' | 'visibility' | 'pressure' | 'pop'
  title: string
  info: string | JSX.Element
  description?: string | JSX.Element
}

const icons = {
  wind: Wind,
  feels: Feels,
  humidity: Humidity,
  visibility: Visibility,
  pressure: Pressure,
  pop: Pop,
}

const Tile = ({ icon, title, info, description }: Props): JSX.Element => {
  const Icon = icons[icon]
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-[125px] h-[60px] text-slate-700 bg-white/25 backdrop-blur-ls rounded drop-shadow-lg p-2 mb-5 flex flex-col justify-between"
    onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="flex items-center text-sm font-bold">
        <Icon /> <h1 className="ml-1 text-center ">{title}</h1>
      </div>
      <h3 className="text-lg text-center">{info}</h3>

      {/* <div className="text-xs font-bold">{description}</div> */}
      {isHovered && (
        <div className="absolute top-10 transition-all w-[128px] bg-zinc-700 text-gray-200 p-2 mt-3 shadow-md rounded  z-110">
          <div className="text-xs font-medium">{description}</div>
        </div>
      )}
    </div>
  )
}
export default Tile
