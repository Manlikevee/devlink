import React from 'react'
import { Link , CircleUser } from 'lucide-react';
import { usePathname,  } from 'next/navigation';
import { useRouter } from 'next/navigation';
const Topnav = () => {
  const router = useRouter()
  const pathname = usePathname();

  
  const handlecorp = () => {
    router.push('/profile');
  };

  const handlehome = () => {
    router.push('/');
  };

  const handlepreview = () => {
    router.push('/preview');
  };
  return (

    <header>
    <div className='topnav'>
        <img src="/Group251.png" alt=""  className='desktop'/>
        <img src="/Group2511.png" alt="" className='mobile'/>
        <div className="navlinks">
        <div className={`navlink aic  ${pathname === '/' ? 'navlinkactive' : ''}`}   onClick={handlehome}>
          <Link size={'18'}/> <span>Links</span> 
          </div>
          <div className={`navlink aic  ${pathname === '/profile' ? 'navlinkactive' : ''}`} onClick={handlecorp}>
          <CircleUser  size={'18'}/> <span>Profile Details</span> 
          </div>
        </div>

        <div className="navlink navbtn" onClick={handlepreview}>
          Preview
        </div>
    </div>
    </header>

  )
}

export default Topnav