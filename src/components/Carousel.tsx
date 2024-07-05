import React, { useState } from 'react';
import Card from './Card';

interface CarouselProps {
  data: {
    list: {
      dt: number;
      weather: {
        id: number;
      }[];
      main: {
        temp_max: number;
        temp_min: number;
      };
    }[];
    isCelsius: boolean;
  };
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const [scrollLeft, setScrollLeft] = useState(0);

  // Function to handle scrolling
  const handleScroll = (scrollOffset: number) => {
    const container = document.getElementById('carousel-container');
    if (container) {
      container.scrollLeft += scrollOffset;
      setScrollLeft(container.scrollLeft);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div
        id="carousel-container"
        className="flex flex-nowrap overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: 'smooth', scroll: scrollLeft }}
      >
        {data.list.map((item, index) => (
          <Card
            key={index}
            dt={item.dt}
            id={item.weather[0].id}
            temp_max={item.main.temp_max}
            temp_min={item.main.temp_min}
            isCelsius={data.isCelsius}
          />
        ))}
      </div>
      {/* Navigation buttons */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/50 p-2 rounded-full text-gray-700"
        onClick={() => handleScroll(-150)}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/50 p-2 rounded-full text-gray-700"
        onClick={() => handleScroll(150)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
