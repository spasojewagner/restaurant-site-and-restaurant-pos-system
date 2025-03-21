import React, { useState } from 'react';
import { GrRadialSelected } from "react-icons/gr";
import { menus } from '../../constants/index.js';
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { additems } from '../../redux/slices/cartSlice.js';

export default function ItemsContainer() {
    const [selected, setSelected] = useState(menus[0]);
    const [itemCounts, setItemCounts] = useState({}); // Objekat za praćenje količine po stavci
    const dispatch = useDispatch();

    const decrement = (id) => {
        setItemCounts((prev) => {
            const currentCount = prev[id] || 0;
            if (currentCount <= 0) return prev;
            return { ...prev, [id]: currentCount - 1 };
        });
    };

    const increment = (id) => {
        setItemCounts((prev) => {
            const currentCount = prev[id] || 0;
            if (currentCount >= 10) return prev; // Max 10
            return { ...prev, [id]: currentCount + 1 };
        });
    };

    const handleAddToCart = (item) => {
        const count = itemCounts[item.id] || 0;
        if (count === 0) return;
        const { name, price } = item;
        const newItem = {
            id: new Date().getTime(), // Jedinstveni ID
            name,
            pricePerAmounth: price,
            amounth: count,
            price: price * count,
        };
        dispatch(additems(newItem));
        setItemCounts((prev) => ({ ...prev, [item.id]: 0 })); // Resetujte količinu nakon dodavanja u korpu
    };

    return (
        <>
            <div className='grid grid-cols-4 gap-4 px-10 py-4 w-[100%] h-[calc(100vh-30rem)]'>
                {menus.map((items) => {
                    return (
                        <div key={items.id} className='flex flex-col items-center justify-between p-4 rounded-2xl cursor-pointer'
                            style={{ backgroundColor: items.bgColor }}
                            onClick={() => {
                                setSelected(items);
                            }}>
                            <div className='flex items-center justify-between gap-4'>
                                <h1 className='text-white text-lg font-semibold'>{items.icon} {items.name}</h1>
                                {selected.id === items.id && <GrRadialSelected className='text-white' size={20} />}
                            </div>
                            <p className='text-gray-100 text-sm font-semibold'>{items.items.length} Items</p>
                        </div>
                    );
                })}
            </div>
            <hr className='border-gray-400 border-t-2 mt-4' />

            <div className='grid grid-cols-4 gap-4 px-10 py-4 w-[100%]'>
                {selected?.items?.map((item) => {
                    const count = itemCounts[item.id] || 0; // Količina za trenutnu stavku
                    return (
                        <div key={item.id} className='flex flex-col items-start justify-between p-4 rounded-lg h-[150px] cursor-pointer hover:bg-[#2a2a2a] bg-[#1a1a1a]'>
                            <div className='flex items-center justify-between w-full'>
                                <h1 className='text-[#f5f5f5] text-lg font-semibold'>{item.name}</h1>
                                <button onClick={() => handleAddToCart(item)}
                                    className='bg-[#02ca3a] text-white p-2 rounded-lg cursor-pointer'>
                                    <FaCartPlus size={20} />
                                </button>
                            </div>
                            <div className='flex items-center justify-between w-full'>
                                <p className='text-[#ababab] text-xl font-bold'>$ {item.price}</p>
                                <div className='relative flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-2xl gap-5'>
                                    <button onClick={() => decrement(item.id)} className='text-yellow-500 text-2xl cursor-pointer'>&minus;</button>
                                    <span className='text-white'>{count}</span>
                                    <button onClick={() => increment(item.id)} className='text-yellow-500 text-2xl cursor-pointer'>&#43;</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}