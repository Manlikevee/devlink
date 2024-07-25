'use client'
import Layout from '@/components/Layout'
import { VeeContext } from "@/components/Chatcontext";
import React, { useContext, useEffect, useState } from 'react';
import { Github, Youtube, Linkedin, Facebook, Codepen, ChevronRight } from 'lucide-react';
import Previewnav from '@/components/utility/Previewnav'
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner';
const options = [
  { value: 'github', label: 'GitHub', icon: <Github size={16} /> },
  { value: 'youtube', label: 'YouTube', icon: <Youtube size={16} /> },
  { value: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={16} /> },
  { value: 'facebook', label: 'Facebook', icon: <Facebook size={16} /> },
  { value: 'frontendmentor', label: 'Frontend Mentor', icon: <Codepen size={16} /> },
];

// export interface SocialLink {
//   first_name: string;
//   last_name: string;
//   email: string;
//   avatar: string | null;
//   requestuser: number;
//   links: Record<string, string>;
//   created_at: string;
//   reference: string;
// }

export interface ErrorResponse {
  detail: string;
}

const page = () => {
  const [isLoading, setIsloading] = useState(false);
  const { test, axiosInstance,userdata } = useContext(VeeContext);
  const [socialInputs, setSocialInputs] = useState<{ platform: string; link: string }[]>([]);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar, setAvatar] =  useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState<string>('');
  const searchParams = useSearchParams()
  const reference = searchParams.get('reference')
  useEffect(() => {
    if(!searchParams.has("reference")){
      if(userdata){
        setIsloading(true)
        setSocialInputs(userdata?.links)
        setEmail(userdata?.email)
        setLastName(userdata?.last_name)
        setFirstName(userdata?.first_name)
        setAvatar(userdata?.avatar)
        setIsloading(false)
      }
    }

   
  }, [userdata]);


  useEffect(() => {
    setIsloading(true)
    const fetchSocialLinkData = async (reference: string) => {
      try {
        const response = await axios.get('https://veezitorbackend.vercel.app/sociallinks/', {
          params: { reference }
        });
        toast.success(`Fetched successfully`);
        setData(response.data);
        setSocialInputs(response.data?.links)
        setEmail(response.data?.email)
        setLastName(response.data?.last_name)
        setFirstName(response.data?.first_name)
        setAvatar(response.data?.avatar)
        setError('');
        setIsloading(false)
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          const responseData = error.response?.data as ErrorResponse;
          setError(responseData?.detail || 'An error occurred');
          toast.error(responseData?.detail || 'An error occurred');
          setIsloading(false)
        } else {
          setIsloading(false)
          setError('An unexpected error occurred');
        }
        setData(null);
        setIsloading(false)
      }
    };

    if (reference) {
      fetchSocialLinkData(reference as string);
    }
  }, [reference]);




  return (
    <Layout>
      <div className="purplepatch">
      <div className="previewbox">
      <Previewnav/>
      </div>


</div>


<div className="devicespace">
<div className="avatar">
  {data && avatar && (<img src= {avatar|| ''} alt="" />)}
  
</div>

<div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
{data && firstName ? (<div className='pname'> {firstName + ' ' + lastName} </div>) : ( <div className="uname"></div>) }
{data && email ? (<div className='pname'> {email} </div>) : (<div className="uemail"></div>)}

</div>
{
  error && (<div className='pname'> User Not found </div>)
}

{
  isLoading  && ( <> Loadinggg....
  <span className='loading-spinner'></span> 
  </>    )
}
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






    </Layout>

  )
}

export default page