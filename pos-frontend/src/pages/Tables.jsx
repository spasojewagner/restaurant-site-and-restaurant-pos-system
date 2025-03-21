import React, { useEffect, useState } from 'react'
import ButtonNav from '../components/ButtonNav'
import BackButton from '../components/shared/BackButton'
import TableCard from '../components/tables/TableCard'
import { tables } from '../constants/index.js';
import { keepPreviousData, useQuery} from "@tanstack/react-query"
import {  getTables } from '../https/index.js';
import { enqueueSnackbar } from "notistack";

export default function Tables() {

      useEffect(()=>{
        document.title= "POS | Tables"
      })

    const [status, setStatus]=useState("all");

    const  {data: resData, isError} = useQuery({
        queryKey: ["tables"],
        queryFn: async ()=>{
            return await getTables();
        },
        placeholderData: keepPreviousData
    })

    if(isError){
          enqueueSnackbar("Something went wrong!", { variant: "error" });
    }

console.log(resData)


    return (
        <section className='bg-[#1f1f1f] overflow-hidden h-[calc(100vh-5rem)] '>
            <div className='flex items-center justify-between px-8 py-4 mt-2' >
            <div className='flex items-center gap-3'>
                <BackButton />
                <h1 className='text-white text-2xl  font-bold tracking-wider'>Tables</h1>
            </div>
            <div className=' flex items-center justify-around gap-4'>
        <button onClick={()=> setStatus("all")} className={`text-gray-300 text-lg ${status==="all" && "bg-[#362e2ef5] rounded-lg px-4 py-2" } rounded-lg px-4 py-2 font-semibold`}>All</button>
        <button onClick={()=> setStatus("progress")} className={`text-gray-300 text-lg ${status==="progress" && "bg-[#362e2ef5] rounded-lg px-4 py-2" } rounded-lg px-4 py-2 font-semibold`} >Booked</button>

        </div>
            </div>
            <div   className=' flex flex-wrap items-center justify-center gap-5 px-3 py-4 overflow-y-scroll scrollbar-hide h-[calc(100vh-13rem)] '> {/*flex flex-warp  gap-5 p-10 */}
            {
                resData?.data.data.map((table)=>{
                    return (
                        <TableCard  id={table._id} name={table.tableNo} status={table.status} initials={table?.currentOrder?.customerDetails?.name }
                        seats={table.seats} />
                    )
                })
            }
            </div>
            
            <ButtonNav />
        </section>
    )
}
