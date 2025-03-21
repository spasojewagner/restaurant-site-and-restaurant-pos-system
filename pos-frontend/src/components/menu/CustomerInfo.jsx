import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAvatarName } from "../../utils/index.js";


const CustomerInfo = () => {
    const customerData = useSelector((state) => state.customer);


    const [dateTime, setDateTime] = useState(new Date());

   

    const formatDate = (date) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`

    };

    const formatTime = (date) => {
        return `${String(date.getHours()).padStart(2, "0")}: ${String(date.getMinutes()).padStart(2, "0")}: ${String(date.getSeconds()).padStart(2, "0")} `;
    }

    return (
        <div className="flex items-center justify-between px-4 py-3">
            <div className="flex flex-col items-start">
                <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
                    {customerData.customerName || "Customer Name"}
                </h1>
                <p className="text-xs text-[#ababab] font-medium mt-1">
                    {customerData.orderId  || "null"} /Dine in
                </p>
                <p className="text-xs text-[#ababab] font-medium mt-2">
                  {formatDate(dateTime)} , {formatTime(dateTime)}
                </p>
            </div>
            <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg">
                {getAvatarName(customerData.customerName) ||"CN" }
            </button>
        </div>
    );
};

export default CustomerInfo;
