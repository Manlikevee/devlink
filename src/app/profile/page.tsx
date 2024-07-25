'use client'
import { Toaster, toast } from 'sonner'
import Pageheading from '@/components/utility/Pageheading'

import { Github, Youtube, Linkedin, Facebook, Codepen, ChevronRight, ImageUp } from 'lucide-react';
import Inputbox from '@/components/utility/Inputbox'
import Herolayout from '@/components/Herolayout'
import { VeeContext } from "@/components/Chatcontext";
import React, { useContext, useEffect, useState } from 'react';
const options = [
  { value: 'github', label: 'GitHub', icon: <Github size={16} /> },
  { value: 'youtube', label: 'YouTube', icon: <Youtube size={16} /> },
  { value: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={16} /> },
  { value: 'facebook', label: 'Facebook', icon: <Facebook size={16} /> },
  { value: 'frontendmentor', label: 'Frontend Mentor', icon: <Codepen size={16} /> },
];


const page = () => {
  const [socialInputs, setSocialInputs] = useState<{ platform: string; link: string }[]>([]);
  const { axiosInstance, userdata } = useContext(VeeContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [avatar, setAvatar] =  useState<File | null>(null);
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const response = await axiosInstance.post('/social/update/', formData ,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      } );
      console.log('Response:', response.data);
      toast.success(`Profile Updated successfully`);
    } catch (err) {
      setError('Failed to save social links.');
      console.error('Error:', err);
      toast.success(`Failed to save Profile.`);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
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


  useEffect(() => {
    if(userdata){
      setSocialInputs(userdata?.links)
      setEmail(userdata?.email)
      setLastName(userdata?.last_name)
      setFirstName(userdata?.first_name)
      setImage(userdata?.avatar)
    }
   
  }, [userdata]);



  return (

<Herolayout>
<div className="heroflexone">

<div className="preview">
  <div className="previewblock">
    <div className="avatar"></div>
  <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
  {firstName ? (<div className='pname'> {firstName + ' ' + lastName} </div>) : ( <div className="uname"></div>) }
  {email ? (<div className='pname'> {email} </div>) : (<div className="uemail"></div>)}

  </div>

   
  {socialInputs?.map((input, index) => (
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
{ socialInputs?.length <1 && (<>
  <div className="socialbox"></div>
   <div className="socialbox"></div>
   <div className="socialbox"></div>
   <div className="socialbox"></div>
   <div className="socialbox"></div>
</>) }
 
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
          inputState={firstName} 
          setInputState={setFirstName} 
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
          inputState={lastName} 
          setInputState={setLastName} 
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
 <button className='mybtn' onClick={handleSubmit}>Save</button>
</div>
</div>

</Herolayout>








  )
}

export default page