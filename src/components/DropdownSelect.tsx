// CustomDropdown.tsx

import React, { useState } from 'react';
import { DropdownOptionType } from '../types';


interface DropdownProps {
  options: DropdownOptionType[];
  fetchCityData: (option: DropdownOptionType) => void;
}

const DropdownSelect: React.FC<DropdownProps> = ({ options, fetchCityData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOptionType | null>(null);
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  const handleOptionClick = (option: DropdownOptionType) => {
    setSelectedOption(option);
    setIsOpen(false);
    fetchCityData(option);
  };


  return (

      <div className="dropdown inline-block relative w-50"
      onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <button
          className="bg-transparent text-gray-800 font-semibold py-2 px-4 rounded text-center inline-flex items-center w-max"
          
        >
          <span className="mr-1">{selectedOption ? selectedOption.label : 'Select'}</span>
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </button>
        <ul className={`dropdown-menu absolute ${isOpen ? 'block' : 'hidden'} text-gray-700 pt-1 rounded`}>
          {options.map(option => (
            <li key={option.value}>
              <button
                className="bg-gray-200 hover:bg-gray-400 w-[150px] py-2 px-4 block whitespace-no-wrap text-left"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
  );
};

export default DropdownSelect;
