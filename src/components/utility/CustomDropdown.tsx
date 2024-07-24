import React, { useState } from 'react';
import { Github, Youtube, Linkedin, Facebook, Codepen,  ChevronUp, ChevronDown } from 'lucide-react';

type OptionType = {
  value: string;
  label: string;
  icon: JSX.Element;
};

type CustomSelectProps = {
  options: OptionType[];
  selectedOption: string;
  onChange: (value: string) => void;
};

const myoptions = [
  { value: 'github', label: 'GitHub', icon: <Github size={16} /> },
  { value: 'youtube', label: 'YouTube', icon: <Youtube size={16} /> },
  { value: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={16} /> },
  { value: 'facebook', label: 'Facebook', icon: <Facebook size={16} /> },
  { value: 'frontendmentor', label: 'Frontend Mentor', icon: <Codepen size={16} /> },
];

const CustomDropdown: React.FC<CustomSelectProps> = ({ options, selectedOption, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(selectedOption)
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption ? (
          <div>
            {myoptions.find(option => option.value == selectedOption)?.icon}
            <span style={{ marginLeft: 10 }}>
              {selectedOption}
            </span>
          </div>
        ) : (
          <span>Select an option</span>
        )}
        <span className="dropdown-arrow">{isOpen ?     <ChevronUp size={'16'} /> :     <ChevronDown size={'16'} />}</span>
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {options.map((option) => (
            <div
              key={option.value}
              className="dropdown-option"
              onClick={() => handleSelect(option.value)}
            >
              {option.icon}
              <span style={{ marginLeft: 10 }}>{option.label}</span>
            </div>
          ))}
          {options.length <1 && (`No Options Available`)}
        </div>
      )}
      
    </div>
  );
};

export default CustomDropdown;
