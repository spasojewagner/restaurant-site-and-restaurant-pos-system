import React from 'react';

const PaymentCard = ({ payment }) => {
    return (
        <div className='w-[400px] bg-[#262626] p-4 mb-4 rounded-lg'>
            <div className='flex items-center gap-5'>
                {/* Prikazamo inicijal metode plaćanja kao avatar */}
                <button className='bg-blue-500 p-4 text-xl font-bold text-white'>
                    {payment.method.charAt(0)}
                </button>

                <div className='flex items-center justify-between w-[90%]'>
                    <div className='flex flex-col items-start gap-1'>
                        <h1 className='text-white text-lg font-semibold tracking-wide'>
                            Payment ID: {payment.paymentId}
                        </h1>
                        <p className='text-amber-50 text-sm'>Status: {payment.status}</p>

                        <p className='text-gray-200 text-sm'>Email: {payment.email}</p>

                    </div>

                    <div className='flex items-center'>
                        <p className='text-amber-50 text-sm'>
                            Method: {payment.method} 
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex justify-between items-center mt-4 text-gray-200'>
                <p>
                    Amount: {payment.currency} {payment.amount.toFixed(2)}
                </p>
                <p>{new Date(payment.createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default PaymentCard;
