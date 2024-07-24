'use client'
import Layout from '@/components/Layout'
import Inputbox from '@/components/utility/Inputbox'
import Pageheading from '@/components/utility/Pageheading'
import React, { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock } from 'lucide-react';

const page = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
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
          inputState={email} 
          setInputState={setEmail} 
          label="Email" 
          inputType="email" 
          name="email" 
          id="email" 
          placeholder='e.g. alex@email.com'
          icon = {Lock}
          />

          <button className='mybtn'>Login</button>

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