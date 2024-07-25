import React from 'react'
import Link from 'next/link'
interface PreviewnavProps {
  copy: () => Promise<void>;
}


const Previewnav: React.FC<PreviewnavProps> = ({ copy }) => {
  return (
    <header>
    <div className='topnav'>
    <Link href={'/'} className="navlink navbtn">
    Back to Editor
        </Link>

        <div className="navlink navbtn previews" onClick={copy}>
        Share Link
        </div>
    </div>
    </header>
  )
}

export default Previewnav