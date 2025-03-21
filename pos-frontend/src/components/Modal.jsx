import React from 'react';
import { FaTimes } from 'react-icons/fa'; 

export default function Modal({ title, onClose, isOpen, children }) {
    if (!isOpen) return null;
    
    return (
        <div className='fixed inset-0  bg-black/50 flex items-center justify-center z-50'>
            <div className='bg-[#1a1a1a] rounded-2xl shadow-lg max-w-lg mx-8 py-4 px-10'>
                <div className='flex justify-between items-center px-6 py-4 border-b border-gray-600 gap-3'>
                    <h2 className='text-xl text-white font-semibold'>{title}</h2>
                    <button onClick={onClose} className='text-gray-500 text-2xl hover:text-gray-300'>
                    ❌
                    </button>
                </div>
                <div className='p-6'>
                    {children}
                </div>
            </div>
        </div>
    );
}
