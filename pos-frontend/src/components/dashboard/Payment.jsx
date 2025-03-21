import React, { useEffect, useState } from 'react';

import PaymentCard from './PaymentCard';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getPayments } from '../../https';
import { enqueueSnackbar } from 'notistack';

const Payments = () => {
  const [status, setStatus] = useState("all");

  useEffect(() => {
    document.title = "POS | Payments";
  }, []);

  const { data: resData, isError, refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const response = await getPayments();
      console.log("Fetched payments:", response);
      return response;
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000); // 60 sekundi = 1 minuta

    return () => clearInterval(interval);
  }, [refetch]);

  if (isError) {
    enqueueSnackbar("Something went wrong", { variant: "error" });
    console.error("Error fetching payments:", isError);
  }

  // Filtriramo plaćanja po statusu ako je potrebno
  const filteredPayments = resData?.data?.data?.filter(payment => {
    if (status === "all") return true;
    return payment.status.toLowerCase() === status.toLowerCase();
  });

  // Sortiramo plaćanja po datumu (najnovija prva)
  const sortedPayments = filteredPayments?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <section className='bg-[#353232] h-[calc(100vh-5rem)] overflow-hidden'>
      
    

      <div className='flex flex-wrap items-center justify-center gap-6 px-10 py-4 overflow-y-scroll scrollbar-hide h-[calc(100vh-8rem)]'>
        {sortedPayments?.length > 0 ? (
          sortedPayments.map((payment) => (
            <PaymentCard key={payment._id} payment={payment} />
          ))
        ) : (
          <p className='col-span-3 text-gray-400'>No payments available</p>
        )}
      </div>
      <div className='mt-20'>
     
      </div>
    </section>
  );
};

export default Payments;
