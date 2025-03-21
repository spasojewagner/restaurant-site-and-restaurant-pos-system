import React from 'react';
import { FaCheck, FaLongArrowAltRight } from 'react-icons/fa';
import { FaCircle } from 'react-icons/fa';
import { formatDateAndTime, getAvatarName } from '../../utils';

export default function OrderCard({ key, order }) {
  console.log(order);
  const hasTable = order.table && order.table.tableNo;  // Proveri da li postoji "table"

  return (
    <div key={key} className='w-[400px] bg-[#262626] p-4 mb-4 rounded-lg'>
      <div className='flex items-center gap-5'>
        <button className='bg-amber-500 p-4 text-xl font-bold text-white'>
          {getAvatarName(order.customerDetails?.name || "Guest")}
        </button>

        <div className='flex items-center justify-between w-[90%]'>
          <div className='flex flex-col items-center gap-1'>
            <h1 className='text-white text-lg font-semibold tracking-wide'>
              {order.customerDetails?.name || "Unknown Customer"}
            </h1>
            <p className='text-amber-50 text-sm'>#{Math.floor(new Date(order.orderDate).getTime())}</p>
            <p className='text-amber-50 text-sm' >
              {hasTable ? (
                <>
                  Table <FaLongArrowAltRight className='text-gray-200 ml-2 inline mb-1 mr-2' />
                  {order.table.tableNo}
                </>
              ) : "Online order"}
            </p>
          </div>

          <div className='flex flex-col items-end gap-2'>
            {order.orderStatus === "Ready" ? (
              <>
                <p className='text-green-700 bg-[#4f4c4f] px-2 py-2 rounded-2xl'>
                  <FaCircle className='inline mr-2' /> {order.orderStatus}
                </p>
                <p className='mt-2'>
                  <FaCircle className='inline mr-2 text-green-600' />Order ready!
                </p>
              </>
            ) : (
              <>
                <p className='text-yellow-500 bg-[#261626] px-2 py-2 rounded-2xl'>
                  <FaCheck className='inline mr-2' /> {order.orderStatus}
                </p>
                <p className='mt-2'>
                  <FaCircle className='inline mr-2 text-yellow-400' /> In Progress
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className='flex justify-between items-center mt-4 text-gray-200'>
        <p>{formatDateAndTime(order.createdAt)}</p>
        <p>{order.items.length} items</p>
      </div>

      <hr className='text-gray-100 border-t-1 border-gray-600' />

      <div className='flex items-center justify-between mt-4'>
        <h1 className='text-white text-xl font-bold'>Total</h1>
        <p className='text-white text-lg font-semibold'>$ {order.bills.totalWithTax.toFixed(2)}</p>
      </div>
    </div>
  );
}
