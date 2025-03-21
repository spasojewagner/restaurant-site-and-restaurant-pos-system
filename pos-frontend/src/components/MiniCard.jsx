import React from 'react';

export const MiniCard = ({ title, icon, number, footerNum }) => {
  const displayValue =
    title === "Total Earnings" ? `$${number.toFixed(2)}` : number;

  return (
    <div className='bg-[#2c2b2b] py-5 px-5 rounded-lg w-[50%]'>
      <div className='flex items-start justify-between'>
        <h1 className='text-white text-lg font-semibold tracking-wide'>{title}</h1>
        <button
          className={`${
            title === "Total Earnings" ? 'bg-[#02ca3a]' : "bg-amber-400"
          } p-3 rounded-lg text-2xl text-white`}
        >
          {icon}
        </button>
      </div>
      <div>
        <h1 className='text-[#f5f5f5] text-4xl font-bold mt-5'>{displayValue}</h1>
        <h1>
          <span className='text-green-600 text-lg mt-2'>{footerNum}%</span> than yesterday
        </h1>
      </div>
    </div>
  );
};
