'use client'
import Layout from '@/components/Layout'
import Inputbox from '@/components/utility/Inputbox'
import Pageheading from '@/components/utility/Pageheading'
import React, { useState } from 'react'
import { Toaster, toast } from 'sonner'
import axios from 'axios';

import Link from 'next/link'
import { Mail, Lock } from 'lucide-react';
import Cookies from 'js-cookie';
const page = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [isLoading, setIsloading] = useState(false);


  const submitLogin = async () => {
    setIsloading(true)
    const payload = {
      username: email,
      password: currentPassword
    };
    const url = 'https://veezitorbackend.vercel.app/token/';

    console.log(payload);

    if(email && currentPassword){
      axios.post(url, payload, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        // Successful login
        toast.success(`Login successfully`);
        Cookies.set('access_token', response.data.access, { expires: 14 });
        Cookies.set('refresh_token', response.data.refresh, { expires: 14 });
        // Save access and refresh tokens to localStorage
        setTimeout(function() {
            window.location.href = `/`;
        }, 2000);

        const token = response.data.access;
        const arrayToken = token.split('.');
        const tokenPayload = JSON.parse(atob(arrayToken[1]));
        console.log(tokenPayload);
        setIsloading(false)
    })
    .catch(error => {
        // Failed login

        toast.error(error.response ? error.response.data.message || 'Invalid Username or Password' : 'Failed to connect to server');
        // Hide loading spinner and enable submit button
        setIsloading(false)
    });

    } else{
      toast.error('Kindly Fill All Fields')
      setIsloading(false)
    }

    // Add logic to handle the login, e.g., API call to authenticate the user
  };






  return (
    <Layout>

<div className='authpage'>
<img src="/Group252.png" alt=""  className='mylogo'/>
<div className="authbox">
  <Pageheading title='Login' subtitle='Add your details below to get back into the app'/>

<div className="logincontainer">
<Inputbox
          inputState={email} 
          setInputState={setEmail} 
          label="Email" 
          inputType="email" 
          name="email" 
          id="email" 
          icon = {Mail}
          placeholder='e.g. alex@email.com'
          />
     
<Inputbox
          inputState={currentPassword} 
          setInputState={setCurrentPassword} 
          label="Password" 
          inputType="email" 
          name="email" 
          id="email" 
          placeholder='*********'
          icon = {Lock}
          />
        {isLoading ?        
   <button id="loadingBtn" className='loadbtn' >

   <span className='loading-spinner'></span> 
    </button>
        :
        <button id="submitBtn" onClick={submitLogin} className='mybtn'>
        Login
      </button> 
         }


</div>

<div className="foottext">
          Don’t have an account? <Link href={'/auth/register'}>Create account</Link> 
          </div>
</div>
  
  </div>
    </Layout>

  )
}

export default page