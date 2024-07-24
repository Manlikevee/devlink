'use client'
import Layout from '@/components/Layout'
import Topnav from '@/components/Topnav'
import Emptystatesocials from '@/components/utility/Emptystatesocials'
import Pageheading from '@/components/utility/Pageheading'
import Socialinputbox from '@/components/utility/Socialinputbox'
import React, { useState } from 'react';
import { Github, Youtube, Linkedin, Facebook, Codepen, ChevronRight, ImageUp } from 'lucide-react';
import Inputbox from '@/components/utility/Inputbox'
import Herolayout from '@/components/Herolayout'


const options = [
  { value: 'github', label: 'GitHub', icon: <Github size={16} /> },
  { value: 'youtube', label: 'YouTube', icon: <Youtube size={16} /> },
  { value: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={16} /> },
  { value: 'facebook', label: 'Facebook', icon: <Facebook size={16} /> },
  { value: 'frontendmentor', label: 'Frontend Mentor', icon: <Codepen size={16} /> },
];


const page = () => {
    const [email, setEmail] = useState('');
  const [socialInputs, setSocialInputs] = useState<{ platform: string; link: string }[]>([]);

  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  return (

<Herolayout>
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

<Pageheading title='Profile Details' subtitle='Add your details to create a personal touch to your profile.'/>


<div className="socialblock">


<div className="socialblockbox">
    <div className="profilephotoflex aic">
<div className="ppbox">Profile picture</div>
<div className="ppbox centered">
    <div>
        
    </div>

    <div className="fileupload centered" onClick={handleClick} style={{ position: 'relative', cursor: 'pointer' }}>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      {image ? (
        <>
          <img src={image} alt="Uploaded" style={{ width: '100%', height: '100%' }} />
          <div className="overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 1,
            transition: 'opacity 0.3s'
          }}>
               <ImageUp />
          + Change Image
          </div>
        </>
      ) : (
        <div className="placeholder">
          <ImageUp />
          + Upload Image
        </div>
      )}
    </div>

</div>
<div className="ppbox"> <small>Image must be below 1024x1024px. Use PNG or JPG format.</small> </div>
    </div>
</div>

<div className="socialblockbox">
<div className="inputflex">
    <div className="inputlabel">First name*</div>
    <Inputbox
          inputState={email} 
          setInputState={setEmail} 
          label="" 
          inputType="email" 
          name="email" 
          id="email" 
        //   icon = {Mail}
          placeholder='e.g. alex@email.com'
          />

</div>
<div className="inputflex">
    <div className="inputlabel">Last name*</div>
    <Inputbox
          inputState={email} 
          setInputState={setEmail} 
          label="" 
          inputType="email" 
          name="email" 
          id="email" 
        //   icon = {Mail}
          placeholder='e.g. alex@email.com'
          />

</div>
<div className="inputflex">
    <div className="inputlabel">Email*</div>
    <Inputbox
          inputState={email} 
          setInputState={setEmail} 
          label="" 
          inputType="email" 
          name="email" 
          id="email" 
        //   icon = {Mail}
          placeholder='e.g. alex@email.com'
          />

</div>
</div>


</div>



<div className="pagefooter">
 <button className='mybtn'>Save</button>
</div>
</div>

</Herolayout>








  )
}

export default page