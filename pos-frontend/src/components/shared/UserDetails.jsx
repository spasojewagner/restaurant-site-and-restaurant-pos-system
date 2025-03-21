import React, { useEffect } from 'react'
import img1 from '../../assets/images/userdetails.jpg'
import { getUser } from '../../https'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { formatDateAndTime } from '../../utils'
const UserDetails = () => {

    useEffect(()=>{
        document.title= "POS | User"
      })


      const { data: resData, isError, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const response = await getUser();
            return response.data;  
        },
    });
    if(isError){
          enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
    const user = resData?.data || {}; 

  return (
    <div className='flex bg-[#1e1e1e] h-[calc(100vh-5rem)]'>
        {/**Left side */}
    <div className='flex flex-[2] flex-col m-4 p-5 gap-6' >
        <div className=' flex flex-col gap-2'>
            <h1 className='text-2xl font-bold text-white'> Your Name</h1>
            <p className='text-[#bab9b9] font-semibold pl-3'>{user.name}</p>
        </div>
        <div className=' flex flex-col gap-2'>
            <h1 className='text-2xl font-bold text-white'>Your Email:</h1>
            <p className='text-[#bab9b9] font-semibold pl-3'>{user.email}</p>
        </div>
        <div className=' flex flex-col gap-2'>
            <h1 className='text-2xl font-bold text-white'> Your Phone:</h1>
            <p className='text-[#bab9b9] font-semibold pl-3'>{user.phone}</p>
        </div>
        <div className=' flex flex-col gap-2'>
            <h1 className='text-2xl font-bold text-white'>Your Role</h1>
            <p className='text-[#bab9b9] font-semibold pl-3'>{user.role}</p>
        </div>
        <div className=' flex flex-col gap-2'>
            <h1 className='text-2xl font-bold text-white'>Created</h1>
            <p className='text-[#bab9b9] font-semibold pl-3'>{formatDateAndTime(user.createdAt)}</p>
           
        </div>
    </div>
    {/**Right Side */}
    <div className='flex flex-[3]'>
    <img src={img1} alt="" />
    </div>
    </div>
  )
}

export default UserDetails