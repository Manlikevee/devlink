'use client'
import Layout from '@/components/Layout'
import React, { useState } from 'react';
import { Github, Youtube, Linkedin, Facebook, Codepen, ChevronRight } from 'lucide-react';
import Previewnav from '@/components/utility/Previewnav'


const options = [
  { value: 'github', label: 'GitHub', icon: <Github size={16} /> },
  { value: 'youtube', label: 'YouTube', icon: <Youtube size={16} /> },
  { value: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={16} /> },
  { value: 'facebook', label: 'Facebook', icon: <Facebook size={16} /> },
  { value: 'frontendmentor', label: 'Frontend Mentor', icon: <Codepen size={16} /> },
];


const page = () => {



  return (
    <Layout>
      <div className="purplepatch">
      <div className="previewbox">
      <Previewnav/>
      </div>


</div>


<div className="devicespace">
<div className="avatar"></div>
   <div className="uname"></div>
   <div className="uemail"></div>

   <div className="socialbox"></div>
   <div className="socialbox"></div>
   <div className="socialbox"></div>
   <div className="socialbox"></div>
   <div className="socialbox"></div>
</div>






    </Layout>

  )
}

export default page