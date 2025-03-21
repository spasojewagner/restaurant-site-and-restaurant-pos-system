import React, { useState } from 'react'
import { BiSolidDish } from 'react-icons/bi';
import { MdCategory, MdTableBar } from 'react-icons/md'
import Metrics from '../components/dashboard/Metrics';
import RecentOrders from '../components/dashboard/RecentOrders';
import Payment from '../components/dashboard/Payment';
import Modal from '../components/dashboard/Modal';



const buttons = [
    { label: " Add Table", icon: <MdTableBar />, action: "table" },
  //  { label: " Add Category", icon: <MdCategory />, action: "category" },
   // { label: " Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Payment"];

const Dashboard = () => {

    const [isTableModalOpen, setTableModalOpen]=useState(false);

    const [active, setActive]=useState("Metrics");

    const handleOpenModal= (action)=>{
        if(action==="table") setTableModalOpen(true);
    }

    return (
        <div className='bg-[#1f1f1f] h-[calc(100vh-1rem)]'>
            <div className='container mx-auto flex items-center justify-between py-14 px-6  md:px-4'> {/*md:px-4 – Kada ekran dostigne medium (md) breakpoint (768px), padding po horizontali se smanjuje na 4 jedinice (~16px). */}
                <div className='flex items-center gap-3'>
                    {
                        tabs.map((tab) => {
                            return (
                                <button className={` px-8 py-3 rounded-lg text-white font-semibold text-md flex items-center gap-2 cursor-pointer ${active === tab ? "bg-[#2a2a2a]" : "bg-[#1a1a1a]"}`}
                                onClick={()=>setActive(tab)}

                                >
                                    {tab}

                                </button>
                            )
                        })
                    }
                </div>
                <div className='flex items-center gap-3'>
                    {
                        buttons.map(({ label, icon, action }) => {
                            return (
                                <button onClick={()=>handleOpenModal(action)} className='bg-[#1a1a1a] hover:bg-[#262626] px-8 py-3 rounded-lg text-white font-semibold text-md flex items-center gap-2'>
                                    {label} {icon} 
                                </button>
                            )
                        })
                    }
                </div>
            </div>
          {active==="Metrics" &&  <Metrics />}
          {active==="Orders" && <RecentOrders />}
          {active ==="Payment" && <Payment/> }
          {isTableModalOpen && <Modal setTableModalOpen={setTableModalOpen} />}
       
        </div>
    )
}

export default Dashboard