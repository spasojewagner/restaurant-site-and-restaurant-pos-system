import React from 'react'
import ButtonNav from '../components/ButtonNav'
import BackButton from '../components/shared/BackButton'
import { MdRestaurantMenu } from 'react-icons/md'
import MenuContanier from '../components/menu/MenuContanier'
import CustomerInfo from '../components/menu/CustomerInfo'
import CartInfo from '../components/menu/CartInfo'
import Bill from '../components/menu/Bill'
import { useSelector } from 'react-redux'

export default function Menu() {

  const customerData= useSelector(state=>state.customer);

  return (
    <section className='bg-[#353232] h-[1000px] overflow-hidden flex'>
      {/*Left deo */}
      <div className='flex-[3]'>
        <div className='flex items-center justify-between px-10 py-4'>
          <div className='flex items-center gap-4'>
            <BackButton />
            <h1 className='text-white text-2xl font-bold tracking-wide'>Menu</h1>

          </div>
          <div className='flex items-center  justify-around gap-4'>
            <div className='flex items-center gap-3 cursor-pointer bg-neutral-800   rounded-full p-2.5'>
              <MdRestaurantMenu className='text-white text-4xl' />

              <div className='flex flex-col items-start'>
                <h1 className='text-md text-white font-semibold'>{customerData.customerName || "Customer Name"}</h1>
                <p className='text-xs text-gray-300 font-medium'>Table: {customerData.table?.tableNo || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        <MenuContanier />

      </div>
      {/*Right deo */}
      <div className='flex-[1] bg-[#1a1a1a] mt-4 mr-3 h-[780px] rounded-lg pt-2'>
        {/*Customer info */}
      <CustomerInfo/>
        <hr className='border-gray-400 border-t-2 ' />
        {/*Cart items */}
        <CartInfo/>
        <hr className='border-gray-400 border-t-2 ' />
        {/*Bills */}
        <Bill/>
      </div>

      <ButtonNav />

    </section>

  )
}
