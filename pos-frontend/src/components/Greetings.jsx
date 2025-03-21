import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

const Greetings = () => {
    const userData =useSelector((state)=> state.user);

    const [dateTime, setDateTime]= useState(new Date());

    useEffect(()=>{
        const timer=setInterval(()=>setDateTime(new Date()), 1000) //svakih 1s ili ti 1000ms azuriraj vreme
        console.log("Vreme je ažurirano:", new Date()); // Provera u konzoli
        return()=>clearInterval(timer); //kada se komponenta skloni sa ekrana ocisti intervbal
    },[]);

    const formatDate = (date) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
       return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2,'0')}, ${date.getFullYear()}`
       
    };
    
    const formatTime= (date)=>{
            return `${String(date.getHours()).padStart(2, "0")}: ${String(date.getMinutes()).padStart(2, "0")}: ${String(date.getSeconds()).padStart(2, "0")} `;
    }
    
  return (
    <div className='flex justify-between items-center px-8 mt-5'>
        <div> 
        <h1 className='text-white text-2xl font-semibold tracking-wide'>Good morning , {userData.name || "Test User"}</h1> {/** tracking-wide → Širi razmak između slova (letter-spacing). */}
        <p className='text-[#ababab] text-sm'>Give your best services for customers😀</p>     {/**text-sm oko 14px velicina */}
        </div>
        <div>
            <h1 className='text-white text-3xl font-bold tracking-wide w-[130]px'>{formatTime(dateTime)}</h1>
            <p className='text-[#adadad] text-sm'>{formatDate(dateTime)}</p>
        </div>
    </div>
  )
}

export default Greetings