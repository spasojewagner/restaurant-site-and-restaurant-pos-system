import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MdClose } from "react-icons/md";
import { useMutation } from '@tanstack/react-query';
import { addTable } from '../../https';
import { enqueueSnackbar } from "notistack";

function Modal({ setTableModalOpen }) {


    const [tableData, setTableData] = useState({

        tableNo: "",
        seats: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTableData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        console.log(tableData);
        tableMutation.mutate(tableData);
    }

    const hadnelCloseModal = () => {
        return setTableModalOpen(false)
    }


    const tableMutation = useMutation({
        mutationFn: (reqData) => addTable(reqData),
        onSuccess: (res)=>{
            setTableModalOpen(false);
            const {data}= res;
             enqueueSnackbar(data.message, { variant: "success" });
        },
        onError: (error)=>{
            const {data}= error.response;
            enqueueSnackbar(data.message, { variant: "error" });
            console.log(error);
        }
    })    


    return (
        <div className='fixed inset-0  flex items-center justify-center z-50'>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-[#262626] p-6 rounded-lg shadow-lg w-96"
            >
                {/**modla header */}
                <div className="flex justify-between items-center mb-4" >
                    <h2 className="text-white text-xl font-semibold">Add Table</h2>
                    <button onClick={hadnelCloseModal} className='text-white hover:text-red-500'><MdClose size={25} /></button>
                </div>
                {/**Modal body */}
                <form  onSubmit={handleSumbit} action="" className='space-y-4 mt-10'>
                    <div>
                        <label className="block text-gray-50 mt-3 mb-2 text-sm font-medium">
                            Table Number
                        </label>
                        <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                            <input
                                type="number"
                                name="tableNo"
                                value={tableData.tableNo}
                                onChange={handleInputChange}
                                className="bg-transparent flex-1 text-white focus:outline-none"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-50 mt-3 mb-2 text-sm font-medium">
                            Number of seats
                        </label>
                        <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                            <input
                                type="number"
                                name="seats"
                                value={tableData.seats}
                                onChange={handleInputChange}
                                className="bg-transparent flex-1 text-white focus:outline-none"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                       
                        className="w-full mt-6 py-3 text-lg bg-yellow-600 text-black font-bold hover:bg-amber-400 cursor-pointer"
                    >
                        Add Table
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

export default Modal