import React from 'react'
import { popularDishes } from '../constants'

export const PopularDishes = () => {
    return (
        <div className='mt-6 px-3 ' >
            <div className='bg-[#1a1a1a] w-full rounded-lg h-[1000px]'>
                <div className='flex justify-between items-center px-6 py-4'>
                    <h1 className='text-white text-lg font-semibold tracking-wide'>Popular Dishes</h1>
                    {/* <a href="" className='text-blue-600 text-sm font-semibold'>View ALL</a> */}
                </div>
                <div className='overflow-y-scroll h-[680px] scrollbar-hide'>
                    {
                        popularDishes.map((dish) =>{
                                return(
                                    <div key={dish.id} className='flex items-center gap-4 bg-[#1f1f1f] rounded-[15px ] px-6 py-4 mx-6 mt-4'>
                                      <h1 className='text-white font-bold text-xl mr-3'> {dish.id <10 ? `0${dish.id} `:dish.id}</h1>
                                        <img src={dish.image} alt={dish.name} className='w-[50px] h-[50px] rounded-full' />
                                        <div>
                                            <h1 className='text-white font-semibold tracking-wide'>{dish.name}</h1>
                                            <p className='text-white text-sm'><span className='text-gray-400'>Orders: </span> {dish.numberOfOrders}</p>
                                        </div>
                                    </div>
                                );
                        })
                    }
                </div>
            </div>
        </div>
    )
}
