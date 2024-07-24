import React from 'react';

interface PageheadingProps {
  title: string;
  subtitle: string;
}

const Pageheading: React.FC<PageheadingProps> = ({ title, subtitle }) => {
  return (
    <div className='headingtext'>
      <div className="pagetitle">{title}</div>
      <div className="pagesubtitle">{subtitle}</div>
    </div>
  );
}

export default Pageheading;
