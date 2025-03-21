import React from 'react'
import { FaCheck, FaLongArrowAltRight } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { updateTable } from '../../redux/slices/customerSlice';
import { getAvatarName } from "../../utils/index.js";

export default function TableCard({id, name, status, initials, seats}) {

    const dispatch=useDispatch();

    const navigate = useNavigate();
    //da prebaci na meni ako sto nije rezervisan
    const handleClick=(name)=>{
        if(status==="Booked") return;

        const table= {tableId: id, tableNo: name}
        dispatch(updateTable({table}))
        navigate('/menu');
    }

    return (
        <div  onClick={()=>handleClick(name)} key={id} className='w-[300px] hover:bg-[#363636] bg-[#262626] p-4 mb-4 rounded-lg cursor-pointer '>
            <div className='flex items-center justify-between px-1'>
                <h1 className='text-white text-xl font-semibold'>Table<FaLongArrowAltRight className='text-gray-200 ml-2 inline mb-1'/> {name}</h1>
                {/* <div className='flex flex-col items-end gap-2 '> */}
                    <p className={` ${status=== "Booked" ? "text-green-700 bg-[#2e4a40]" : "text-amber-600 bg-yellow-100" } rounded-4xl py-2 px-2 `}>
                        <FaCheck className='inline  mr-2' />{status}</p>
                </div>
                <div className='flex items-center justify-center  my-5'>
                    <h1 className={` bg-blue-600 w-[65px] h-[65px] text-white font-semibold text-2xl rounded-full p-5`} 
                  //  style={{backgroundColor: initials? "bg-blue-600" : "bg-[#1f1f1f]"}}
                  >
                        {getAvatarName(initials )}</h1>
                </div>
                <p className='text-gray-100 text-xs'>Seats: <span className='text-white'>{seats}</span></p>
            </div>


        // </div>
    )
}
