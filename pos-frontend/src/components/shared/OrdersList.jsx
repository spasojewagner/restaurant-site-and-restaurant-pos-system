import React from 'react'
import { FaCheck } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { getAvatarName } from "../../utils/index"
export const OrdersList = ({ key, order }) => {
  return (
    <div className='flex items-center gap-4 mb-3'>
      <button className='bg-amber-500 p-4 text-xl font-bold text-white'>{getAvatarName(order.customerDetails.name)}</button>
      <div className='flex items-center justify-between w-[90%]'>
        <div className='flex flex-col items-center gap-1'>
          <h1 className='text-white text-lg font-semibold tracking-wide'>{order.customerDetails.name}</h1>
          <p className='text-amber-50 text-sm '>{order.items.length} items</p>
        </div>
        <div>
          <h1 className='text-yellow-400 font-semibold border border-[#f6b100] rounded-lg p-2' >Table No: {order.table?.tableNo}</h1>
        </div>
        <div className='flex flex-col items-end gap-2 '>
          {order.orderStatus === "Ready" ? (
            <>
              <p className='text-green-700 bg-[#4f4c4f] px-6 py-2 rounded-2xl '>
                <FaCircle className='inline mr-2' /> {order.orderStatus}
              </p>
            
            </>
          ) : (
            <>
              <p className='text-yellow-500 bg-[#261626] px-2 py-2 rounded-2xl'>
                <FaCheck className='inline mr-2' /> {order.orderStatus}
              </p>
            
            </>
          )}
        </div>
      </div>
    </div>
  )
}
