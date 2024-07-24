'use client'
import Layout from '@/components/Layout'
import Topnav from '@/components/Topnav'
import Emptystatesocials from '@/components/utility/Emptystatesocials'
import Pageheading from '@/components/utility/Pageheading'
import Socialinputbox from '@/components/utility/Socialinputbox'
import React, { useState } from 'react';
import { Github, Youtube, Linkedin, Facebook, Codepen, ChevronRight } from 'lucide-react';


const options = [
  { value: 'github', label: 'GitHub', icon: <Github size={16} /> },
  { value: 'youtube', label: 'YouTube', icon: <Youtube size={16} /> },
  { value: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={16} /> },
  { value: 'facebook', label: 'Facebook', icon: <Facebook size={16} /> },
  { value: 'frontendmentor', label: 'Frontend Mentor', icon: <Codepen size={16} /> },
];


const page = () => {

  const [socialInputs, setSocialInputs] = useState<{ platform: string; link: string }[]>([]);

  const addInputBox = () => {
    setSocialInputs([...socialInputs, { platform: '', link: '' }]);
  };

  const removeInputBox = (index: number) => {
    setSocialInputs(socialInputs.filter((_, i) => i !== index));
  };

  const handlePlatformChange = (index: number, platform: string) => {
    const newInputs = [...socialInputs];
    newInputs[index].platform = platform;
    setSocialInputs(newInputs);
  };

  const handleLinkChange = (index: number, link: string) => {
    const newInputs = [...socialInputs];
    newInputs[index].link = link;
    newInputs[index].link = link;
    setSocialInputs(newInputs);
  };

  const availableOptions = options.filter(
    (option) => !socialInputs.some((input) => input.platform === option.value)
  );
  const selectedoptions = options.filter(
    (option) => socialInputs.some((input) => input.platform === option.value)
  );
  console.log('availableoptions', selectedoptions)
  console.table(socialInputs)
  return (
    <Layout>
<div className="container">


<Topnav/>

<div className="heroflex">
<div className="heroflexone">

<div className="preview">
  <div className="previewblock">
    <div className="avatar"></div>
   <div className="uname"></div>
   <div className="uemail"></div>
   {socialInputs.map((input, index) => (
  (input.platform && input.link.trim() ) ? (
    <div className={`socialbox ${input.platform}`} key={index}>
   <span className='aic'>     
        {options.find(option => option.value == input.platform)?.icon}
            <span style={{ marginLeft: 3 }}>
               {input.platform} 
               </span>    
               </span>

               <span style={{ marginTop: 3 }}><ChevronRight size={'14'} /></span>
    </div>
  ) : null
))}
   {/* <div className="socialbox"></div>
   <div className="socialbox"></div>
   <div className="socialbox"></div>
   <div className="socialbox"></div>
   <div className="socialbox"></div> */}
  </div>
</div>

</div>

<div className="heroflextwo">

<Pageheading title='Customize your links' subtitle='Add/edit/remove links below and then share all your profiles with the world!'/>

<div className="addbtn" onClick={addInputBox}>+ Add new link</div>
<div className="socialblock">

{socialInputs.length <1 && (<Emptystatesocials/>)}
{socialInputs.map((input, index) => (
        <Socialinputbox
          key={index}
          index={index}
          platform={input.platform}
          link={input.link}
          onPlatformChange={handlePlatformChange}
          onLinkChange={handleLinkChange}
          onRemove={removeInputBox}
          options={availableOptions}
        />
      ))}



</div>



<div className="pagefooter">
 <button className='mybtn'>Save</button>
</div>
</div>
</div>

</div>


    </Layout>

  )
}

export default page