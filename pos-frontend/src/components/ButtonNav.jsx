import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { BsBorderStyle } from "react-icons/bs";
import { MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi";
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { setCustomer } from '../redux/slices/customerSlice';


const ButtonNav = () => {
    
    const location=useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [guestCount, setGuestCount] = useState(0);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [name, setName]=useState();
    const [phone , setPhone]= useState();
    const dispatch= useDispatch();

    const decrement = () => {
        if (guestCount <= 0) return;
        setGuestCount((prev) => prev - 1);
    }
    const increment = () => {
           if (guestCount >= 10) return; //max 10 osoba za stolom
        setGuestCount((prev) => prev + 1);
    }
    const handleCrateOrder = ()=>{
        //slanje pdoataka preko dispacha u store od reduxa
        dispatch(setCustomer({name, phone,guests: guestCount}))
            navigate("/tables");
    }

    const isActive =(path)=> location.pathname===path;
    const navigate = useNavigate();

    return (
        <div className='fixed   bottom-0 left-0 right-0 bg-[#262626] p-2 flex justify-around '>
            <button onClick={() => navigate("/home")} className={`flex items-center justify-center font-bold ${isActive("/home") ? "text-white  bg-[#343434]" : "text-gray-200"}  w-[200px] rounded-[20px] `}><FaHome className='inline mr-4' size={20} />Home</button>
            <button onClick={() => navigate("/orders")} className={`flex items-center justify-center font-bold ${isActive("/orders") ? "text-white  bg-[#343434]" : "text-gray-200"}  w-[200px] rounded-[20px] `}><BsBorderStyle className='inline mr-4' size={20} />Orders</button>
            <button onClick={() => navigate("/tables")} className={`flex items-center justify-center font-bold ${isActive("/tables") ? "text-white  bg-[#343434]" : "text-gray-200"}  w-[200px] rounded-[20px] `} > <MdTableBar className='inline mr-4' size={20} />Table</button>
            <button onClick={() => navigate("/more")} className={`flex items-center justify-center font-bold ${isActive("/more") ? "text-white  bg-[#343434]" : "text-gray-200"}  w-[200px] rounded-[20px] `}><CiCircleMore className='inline mr-4' size={20} />More</button>

            {/* Dugme za otvaranje modala */}
            <button onClick={openModal} disabled={isActive("/tables") || isActive("/menu")} className='bg-amber-600 text-white rounded-full p-3 items-center'>
                <BiSolidDish size={20} />
            </button>

            {/* Modal se prikazuje van button-a */}
            <Modal isOpen={isModalOpen} onClose={closeModal}  title="Create Order">
                <div>
                    <label className='block text-gray-50 mb-2 text-sm px-1 font-medium'>Customer Name</label>
                    <div className='flex items-center rounded-lg p-3 px-4 bg-[#282828]'>
                        <input value={name}  onChange={(e)=>setName(e.target.value)} type="text" name='' placeholder='Enter customer name' id='' className='bg-transparent flex-1 px-5 text-white focus:outline-none' />
                    </div>
                </div>

                <div>
                    <label className='block text-gray-50 mb-2 mt-2 text-sm px-1 font-medium'>Customer Phone</label>
                    <div className='flex items-center rounded-lg p-3 px-4 bg-[#282828]'>
                        <input value={phone}  onChange={(e)=>setPhone(e.target.value)}  type="number" name='' placeholder='Enter customer phone' id='' className='bg-transparent flex-1 px-5 text-white focus:outline-none' />
                    </div>
                </div>


                <div>
                    <label className='block mb-2 mt-3 text-sm font-medium text-gray-50'>Guests</label>
                    <div className='flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-2xl'>
                        <button onClick={decrement} className='text-yellow-500 text-2xl'>&minus;</button>
                        <span className='text-white '>{guestCount}</span>
                        <button onClick={increment} className='text-yellow-500 text-2xl'>&#43;</button>
                    </div>
                </div>

                <button onClick={handleCrateOrder} className='w-full bg-amber-500 text-gray-50 rounded-lg py-3 mt-8 hover:bg-amber-700 cursor-pointer' >  Create Order</button>


            </Modal>
        </div>
    )
}

export default ButtonNav