import { Mail } from 'lucide-react';
import React, { ChangeEvent } from 'react';
import { LucideProps } from 'lucide-react';
interface InputComponentProps {
  inputState: string;
  setInputState: (value: string) => void;
  label: string;
  inputType: string;
  name: string;
  id: string;
  placeholder: string;
  icon?: React.ComponentType<LucideProps>; // Making the icon prop optional
}

const Inputbox: React.FC<InputComponentProps> = ({ 
  inputState, 
  setInputState, 
  label, 
  inputType, 
  name, 
  id, 
  placeholder,
  icon: Icon // Renaming for clarity
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  return (
    <div className="miniforminput">
      <label htmlFor={id} className='mylabel'>
        {label}  {/* Conditionally render the icon */}
      </label>
      <div className="miniforminputdata">
      {Icon && <Icon size={18}  color='#737373' strokeWidth={2}  />}
    
        <input 
          type={inputType} 
          name={name} 
          id={id}      
          value={inputState} 
          placeholder={placeholder}
          onChange={handleChange}  
        />
      </div>
    </div>
  );
}

export default Inputbox;
