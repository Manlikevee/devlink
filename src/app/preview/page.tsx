'use client';

import React, { useContext, useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import Layout from '@/components/Layout';
import { VeeContext } from '@/components/Chatcontext';
import { Github, Youtube, Linkedin, Facebook, Codepen, ChevronRight } from 'lucide-react';
import Previewnav from '@/components/utility/Previewnav';

const options = [
  { value: 'github', label: 'GitHub', icon: <Github size={16} /> },
  { value: 'youtube', label: 'YouTube', icon: <Youtube size={16} /> },
  { value: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={16} /> },
  { value: 'facebook', label: 'Facebook', icon: <Facebook size={16} /> },
  { value: 'frontendmentor', label: 'Frontend Mentor', icon: <Codepen size={16} /> },
];

export interface ErrorResponse {
  detail: string;
}

const SocialLinkFetcher: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { test, axiosInstance, userdata } = useContext(VeeContext);
  const [socialInputs, setSocialInputs] = useState<{ platform: string; link: string }[]>([]);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [isAuth, setIsAuth] = useState(false);
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');

  useEffect(() => {
    const myAccessToken = Cookies.get("access_token");
    if (myAccessToken) {
      setIsAuth(true);
    }
    if (!searchParams.has("reference")) {
      if (userdata) {
        setIsLoading(true);
        setSocialInputs(userdata?.links);
        setEmail(userdata?.email);
        setLastName(userdata?.last_name);
        setFirstName(userdata?.first_name);
        setAvatar(userdata?.avatar);
        setIsLoading(false);
      }
    }
  }, [userdata, searchParams]);

  useEffect(() => {
    if (reference) {
      setIsLoading(true);
      const fetchSocialLinkData = async (reference: string) => {
        try {
          const response = await axios.get('https://veezitorbackend.vercel.app/sociallinks/', {
            params: { reference }
          });
          toast.success('Fetched successfully');
          setData(response.data);
          setSocialInputs(response.data?.links);
          setEmail(response.data?.email);
          setLastName(response.data?.last_name);
          setFirstName(response.data?.first_name);
          setAvatar(response.data?.avatar);
          setError('');
          setIsLoading(false);
        } catch (error: any) {
          if (axios.isAxiosError(error)) {
            const responseData = error.response?.data as ErrorResponse;
            setError(responseData?.detail || 'An error occurred');
            toast.error(responseData?.detail || 'An error occurred');
            setIsLoading(false);
          } else {
            setError('An unexpected error occurred');
            setIsLoading(false);
          }
          setData(null);
          setIsLoading(false);
        }
      };

      fetchSocialLinkData(reference as string);
    }
  }, [reference]);

  return (
    <div>
      <div className="purplepatch">
        <div className="previewbox">
          {isAuth && <Previewnav />}
        </div>
      </div>
      <div className="devicespace">
        <div className="avatar">
          {avatar && <img src={avatar || ''} alt="" />}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          {firstName ? <div className='pname'>{firstName + ' ' + lastName}</div> : <div className="uname"></div>}
          {email ? <div className='pname'>{email}</div> : <div className="uemail"></div>}
        </div>
        {error && <div className='pname'>User Not found</div>}
        {isLoading && !email && (
          <>
            Loading...
            <span className='loading-spinner'></span>
          </>
        )}
        {socialInputs?.map((input, index) => (
          (input.platform && input.link.trim()) ? (
            <div className={`socialbox ${input.platform}`} key={index}>
              <span className='aic'>
                {options.find(option => option.value === input.platform)?.icon}
                <span style={{ marginLeft: 3 }}>{input.platform}</span>
              </span>
              <span style={{ marginTop: 3 }}><ChevronRight size={'14'} /></span>
            </div>
          ) : null
        ))}
        {socialInputs?.length < 1 && (
          <>
            <div className="socialbox"></div>
            <div className="socialbox"></div>
            <div className="socialbox"></div>
            <div className="socialbox"></div>
            <div className="socialbox"></div>
          </>
        )}
      </div>
    </div>
  );
};

const Page: React.FC = () => (
  <Layout>
    <Suspense fallback={<div>Loading...</div>}>
      <SocialLinkFetcher />
    </Suspense>
  </Layout>
);

export default Page;
