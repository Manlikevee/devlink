import React from 'react'
import Link from 'next/link'
const Previewnav = () => {
  return (
    <header>
    <div className='topnav'>
    <Link href={'/'} className="navlink navbtn">
    Back to Editor
        </Link>

        <div className="navlink navbtn previews">
        Share Link
        </div>
    </div>
    </header>
  )
}

export default Previewnav