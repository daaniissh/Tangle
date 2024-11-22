import React from 'react';

interface P {
  className?: string;
}

const Cirql_logo_w: React.FC<P> = ({ className }) => {
  return (
    <svg
    className={`${className} w-8 `}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="50"
      cy="50"
      r="46.5"
      className="stroke-black dark:stroke-white"
      strokeWidth="7"
    />
    <circle
      cx="46"
      cy="54"
      r="17.5"
      className="stroke-black dark:stroke-white"
      strokeWidth="7"
    />
    <circle
      cx="65.4516"
      cy="26.4516"
      r="6.45161"
      className="fill-black dark:fill-white"
    />
  </svg>
  
    
  );
};

export default Cirql_logo_w;
