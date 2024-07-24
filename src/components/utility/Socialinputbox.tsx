import React, { useState } from 'react'
import Inputbox from './Inputbox'
import { Mail, Lock, Github, Link   } from 'lucide-react';
import { Minus } from 'lucide-react';
import CustomDropdown from './CustomDropdown';




type SocialInputBoxProps = {
    index: number;
    platform: string;
    link: string;
    onPlatformChange: (index: number, platform: string) => void;
    onLinkChange: (index: number, link: string) => void;
    onRemove: (index: number) => void;
    options: { value: string; label: string; icon: JSX.Element }[];
  };


  const Socialinputbox: React.FC<SocialInputBoxProps> = ({
    index,
    platform,
    link,
    onPlatformChange,
    onLinkChange,
    onRemove,
    options,
  }) => {
    const [github, setGithub] = useState('');
  return (
    <div className='socialblockbox'>
        <div className="socialblockheader">

<div className="socialheaderstart">
<div className="sociallabelicon">
<img src="/Frame248.png" alt="" />
</div>
Link #{index + 1}
</div>

<div className="socialheaderend" onClick={() => onRemove(index)}>
          Remove
        </div>
        </div>
        <div className="sociallinks">
            <div className='miniforminput'>
            <label  className='mylabel'>
        Platform
      </label>
      <CustomDropdown
            selectedOption={platform}
            onChange={(selectedPlatform) => onPlatformChange(index, selectedPlatform)}
            options={options}
          />


            </div>
            <Inputbox
          inputState={link}
          setInputState={(newLink) => onLinkChange(index, newLink)}
          label="Link"
          inputType="url"
          name="link"
          id={`link-${index}`}
          placeholder='e.g. https://www.github.com/johnappleseed'
          icon={Github}
        />


 
        </div>
    </div>
  )
}

export default Socialinputbox