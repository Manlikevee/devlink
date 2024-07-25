import  { useEffect, useState } from 'react';
import React, { ReactNode } from 'react';
import Layout from './Layout';
import Topnav from './Topnav';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
interface LayoutProps {
    children: ReactNode;
  }


const Herolayout: React.FC<LayoutProps>  = ({ children }) => {
     const [isauth, setisauth] = useState(false);
    const [windowHeight, setWindowHeight] = useState<number>();
    const router = useRouter()
  

    const handlecorp = () => {
      router.replace('/auth/login');
    };

    useEffect(() => {
      const myaccessToken = Cookies.get("access_token");
      if (!myaccessToken){
        handlecorp()
      }

      // Function to update the height
      const handleResize = () => {
        setWindowHeight(window.innerHeight);
      };
  
      // Set the initial height when the component mounts
      handleResize();
  
      // Add event listener to handle window resize
      window.addEventListener('resize', handleResize);
  
      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    const divStyle = {
      height: `${windowHeight}px`,
       // Add any other styling you need
    };
  return (
    <Layout>
<div className="container" style={divStyle}>


<Topnav/>

<div className="heroflex" style={divStyle}>
{children}
    </div>
    </div>
    </Layout>
  )
}

export default Herolayout