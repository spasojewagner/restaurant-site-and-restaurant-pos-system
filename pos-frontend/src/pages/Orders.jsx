import React, { useEffect, useState } from 'react';
import ButtonNav from '../components/ButtonNav';
import OrderCard from '../components/orders/OrderCard';
import BackButton from '../components/shared/BackButton';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getOrders } from '../https';
import { enqueueSnackbar } from 'notistack';

const Orders = () => {
  const [status, setStatus] = useState("all");

  useEffect(() => {
    document.title = "POS | Orders";
  }, []);

  const { data: resData, isError, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await getOrders();
      console.log("Fetched orders:", response);
      return response;
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000); // 60000 ms = 1 minuta

    return () => clearInterval(interval); // Čišćenje intervala kada se komponenta unmount-uje
  }, [refetch]);

  if (isError) {
    enqueueSnackbar("Something went wrong", { variant: "error" });
    console.error("Error fetching orders:", isError);
  }

  const filteredOrders = resData?.data?.data?.filter(order => {
    if (status === "all") return true;
    return order.orderStatus.toLowerCase() === status.toLowerCase();
  });


  const sortedOrders = filteredOrders?.sort((a, b) => {
    const statusOrder = { "in progress": 1, "ready": 2, "completed": 3 };
    const statusA = a.orderStatus.toLowerCase();
    const statusB = b.orderStatus.toLowerCase();
    return (statusOrder[statusA] || 0) - (statusOrder[statusB] || 0);
  });

  return (
    <section className='bg-[#353232] h-[calc(100vh-5rem)] overflow-hidden'>
      <div className='bg-[#1f1f1f] overflow-hidden '>
        <div className='flex items-center justify-between px-8 py-4 mt-2' >
          <div className='flex items-center gap-3'>
            <BackButton />
            <h1 className='text-white text-2xl  font-bold tracking-wider'>Orders</h1>
          </div>

          <div className=' flex items-center justify-around gap-4'>
            <button onClick={() => setStatus("all")} className={`text-gray-300 text-lg ${status === "all" && "bg-[#362e2ef5] rounded-lg px-4 py-2"} rounded-lg px-4 py-2 font-semibold`}>All</button>
            <button onClick={() => setStatus("in progress")} className={`text-gray-300 text-lg ${status === "in progress" && "bg-[#362e2ef5] rounded-lg px-4 py-2"} rounded-lg px-4 py-2 font-semibold`} >
              In Progress
            </button>

            <button onClick={() => setStatus("ready")} className={`text-gray-300 text-lg ${status === "ready" && "bg-[#362e2ef5] rounded-lg px-4 py-2"} rounded-lg px-4 py-2 font-semibold`} >Ready</button>
            <button onClick={() => setStatus("completed")} className={`text-gray-300 text-lg ${status === "completed" && "bg-[#362e2ef5] rounded-lg px-4 py-2"} rounded-lg px-4 py-2 font-semibold`}> Completed</button>
          </div>
        </div>
      </div>

      <div className=' flex flex-wrap items-center justify-center gap-6 px-10 py-4 overflow-y-scroll scrollbar-hide h-[calc(100vh-13rem)] '>
        {sortedOrders?.length > 0 ? (
          sortedOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))
        ) : (
          <p className='col-span-3 text-gray-400'>No order available</p>
        )}
      </div>
      <div className='mt-20'>
        <ButtonNav />
      </div>
    </section>
  );
}

export default Orders;