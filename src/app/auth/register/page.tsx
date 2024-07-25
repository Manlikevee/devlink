'use client'
import Layout from '@/components/Layout'
import Inputbox from '@/components/utility/Inputbox'
import Pageheading from '@/components/utility/Pageheading'
import React, { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { Toaster, toast } from 'sonner'
const page = () => {
  const router = useRouter()
  const url = 'https://veezitorbackend.vercel.app/jobapprregister/';
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [emailError, setEmailError] = useState('');


  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    } else {
      setEmailError(null);
    }

    return isValid;
  };


  function submitform() {
    setIsloading(true)
    const data = {
      username: email,
      email: email,
      password: currentPassword
  };
      if (validateForm()){
        axios.post(url, data, {
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          // Successful registration

          toast.success(`Registration successful`);
          setTimeout(function() {

            router.replace('/auth/login')
          }, 2000);
  

          setIsloading(false)
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          const responseData = error.response.data;
          if (error.response.status === 400) {

            if(responseData.message){
              toast.error(responseData.message || 'Network response was not ok')
            } else {
              // Handle specific error codes with custom messages
              Object.values(responseData).forEach(errorArray => {
                if (Array.isArray(errorArray) && errorArray.length > 0) {
                    errorArray.forEach(errorMessage => {

                        toast.error(errorMessage)
                    });
                }
            });
            }

          } else {
              toast.error(responseData.message || 'Network response was not ok')
          }
      } else if (error.request) {
          // The request was made but no response was received
          toast.error('No response received from server')
      } else {
          // Something happened in setting up the request that triggered an Error
          toast.error(error.message || 'An error occurred')
      }

      // Hide loading spinner and enable submit button
      setIsloading(false)
  });
      }
      else{
          toast.error(`Kindly Fill All Fields`);
          setIsloading(false)
      }
      // setIsloading(false)
  }



  return (
    <Layout>

<div className='authpage'>
<img src="/Group252.png" alt=""  className='mylogo'/>
<div className="authbox">
  <Pageheading title='Create account' subtitle='Let’s get you started sharing your links!'/>

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
          error={emailError}
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

<div className="small">Password must contains at least 8 characters</div>
{isLoading ?        
   <button id="loadingBtn" className='loadbtn' >

   <span className='loading-spinner'></span> 
    </button>
        :
        <button id="submitBtn mybtn" onClick={submitform} className='mybtn'>
        Login
      </button> 
         }
          {/* <button className='mybtn'>Register</button> */}

</div>

<div className="foottext">
Already have an account?  <Link href={'/auth/login'}>Login</Link> 
          </div>
</div>
  
  </div>
    </Layout>

  )
}

export default page