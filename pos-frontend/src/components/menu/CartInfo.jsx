import React, { useEffect, useRef } from 'react'
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../redux/slices/cartSlice';

export default function CartInfo() {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const scrollRef = useRef();
  // Ako `cartData` nije niz, postavi ga na prazan niz NIJE RADILO PA PREDLOG  DA SE DODA OVO
  const safeCartData = Array.isArray(cartData) ? cartData : [];

//automatsko skrolovanje na dno cart-a kada se doda novi item ako prelazi 380px height
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  })

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  }

  return (
    <div className='px-4 py-2'>
      <h1 className='text-lg text-gray-300 font-semibold tracking-wide'>Order Details</h1>
      <div className='mt-4 overflow-y-scroll scrollbar-hide h-[380px]' ref={scrollRef}>

        {safeCartData.length === 0 ? (
          <p className='text-gray-300 text-sm flex justify-center items-center h-[300px]'>Your Cart is empty. Add something</p>
        ) : (
          safeCartData.map((item) => (
            <div key={item.id} className='bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2'>
              <div className='flex items-center justify-between'>
                <h1 className='text-gray-400 font-semibold tracking-wide text-md'>{item.name}</h1>
                <p className='text-gray-300 font-semibold'>x{item.amounth}</p>
              </div>
              <div className='flex items-center justify-between mt-3'>
                <div className='flex items-center gap-3'>
                  <RiDeleteBin2Fill
                    onClick={() => handleRemove(item.id)}
                    className='text-gray-200 cursor-pointer' size={20} />
                  <FaNotesMedical className='text-gray-200 cursor-pointer' size={20} />
                </div>
                <p className='inline mr-2 text-green-500 font-bold'>$ {item.price}</p>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}
