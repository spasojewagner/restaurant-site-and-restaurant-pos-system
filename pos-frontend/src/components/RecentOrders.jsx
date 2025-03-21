import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { OrdersList } from './shared/OrdersList';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { getOrders } from ".././https/index";
import { useNavigate } from 'react-router-dom';

export default function RecentOrders() {

    const navigate= useNavigate();



    const { data: resData, isError } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const response = await getOrders();
            console.log("Fetched orders:", response);
            return response;
        },
        placeholderData: keepPreviousData,
    });

    if (isError) {
        enqueueSnackbar("Something went wrong", { variant: "error" });
        console.error("Error fetching orders:", isError);
    }

    return (
        <div className='px-8 mt-6 h-[600px]'>
            <div className='bg-[#2c2b2b] w-full h-[480px] rounded-lg overflow-hidden'>
                <div className='flex justify-between items-center px-6 py-4'>
                    <h1 className='text-white text-lg font-semibold tracking-wide'>Recent Orders</h1>
                    <a href="" className='text-blue-600 text-sm font-semibold' onClick={()=>navigate("/orders")} >View ALL</a>
                </div>
                <div className='flex items-center gap-4 bg-neutral-800 rounded-[15px] mx-6 mb-4 py-4'>
                    <FaSearch className='text-white ml-4' />
                    <input type="text" placeholder='Search recent orders' className='bg-[#333] outline-none text-white py-2 px-3 w-full rounded-2xl' />
                </div>
                {/**Orders List */}
                <div className='mt-4 px-6 overflow-y-auto h-[320px] scrollbar-hide'>
                    {resData?.data?.data?.length > 0 ? (
                        resData.data.data.map((order) => (
                            <OrdersList key={order._id} order={order} />
                        ))
                    ) : (
                        <p className='col-span-3 text-gray-400'>No order available</p>
                    )}
                </div>
            </div>
        </div>
    );
}