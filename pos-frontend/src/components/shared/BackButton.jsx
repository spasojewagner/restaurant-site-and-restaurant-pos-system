import React from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
    const navigate=useNavigate();
  return (
    <button  onClick={()=>navigate(-1)} className='bg-blue-800 text-amber-50 p-3 text-xl decoration-from-bold cursor-pointer rounded-3xl'>
        <IoArrowBack /></button>
  )
}
