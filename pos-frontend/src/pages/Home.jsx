import React, { useEffect } from 'react';
import ButtonNav from '../components/ButtonNav';
import Greetings from '../components/Greetings';
import { MiniCard } from '../components/MiniCard';
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import RecentOrders from '../components/RecentOrders';
import { PopularDishes } from '../components/PopularDishes';
import { useQuery } from '@tanstack/react-query';
import { getPayments, getOrders } from '../https';

const Home = () => {
  // 1) Učitavamo sve payment zapise
  const { data: paymentsData } = useQuery({
    queryKey: ['payments'],
    queryFn: getPayments,
  });

  // 2) Učitavamo sve porudžbine
  const { data: ordersData } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  // Funkcija za provjeru da li je datum današnji
  const isToday = (date) => {
    const now = new Date();
    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  };

  // Funkcija za provjeru da li je datum jučerašnji
  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    );
  };

  // 3) Izračunavamo današnju zaradu
  const totalEarningsToday = React.useMemo(() => {
    if (!paymentsData?.data) return 0;
    let sum = 0;
    paymentsData.data.data.forEach((payment) => {
      const createdAt = new Date(payment.createdAt);
      if (isToday(createdAt)) {
        sum += payment.amount;
      }
    });
    return sum;
  }, [paymentsData]);

  // 4) Izračunavamo jučerašnju zaradu
  const totalEarningsYesterday = React.useMemo(() => {
    if (!paymentsData?.data) return 0;
    let sum = 0;
    paymentsData.data.data.forEach((payment) => {
      const createdAt = new Date(payment.createdAt);
      if (isYesterday(createdAt)) {
        sum += payment.amount;
      }
    });
    return sum;
  }, [paymentsData]);

  // Izračunavamo postotak promjene u zaradi (ako jučerašnja zarada nije 0)
  const earningsDiffPercent = totalEarningsYesterday
    ? ((totalEarningsToday - totalEarningsYesterday) / totalEarningsYesterday * 100).toFixed(1)
    : "0";

  // 5) Izračunavamo broj narudžbina u statusu "In Progress" danas
  const inProgressCount = React.useMemo(() => {
    if (!ordersData?.data) return 0;
    return ordersData.data.data.filter(
      (order) => order.orderStatus.toLowerCase() === "in progress" && isToday(new Date(order.createdAt))
    ).length;
  }, [ordersData]);

  // 6) Izračunavamo broj narudžbina u statusu "In Progress" jučer
  const inProgressCountYesterday = React.useMemo(() => {
    if (!ordersData?.data) return 0;
    return ordersData.data.data.filter(
      (order) => order.orderStatus.toLowerCase() === "in progress" && isYesterday(new Date(order.createdAt))
    ).length;
  }, [ordersData]);

  // Izračunavamo postotak promjene u broju \"In Progress\" narudžbina
  const inProgressDiffPercent = inProgressCountYesterday
    ? ((inProgressCount - inProgressCountYesterday) / inProgressCountYesterday * 100).toFixed(1)
    : "0";

  useEffect(() => {
    document.title = "POS | Home";
  }, []);

  return (
    <section className='bg-[#1f1f1f] overflow-hidden h-[900px] flex gap-3'>
      {/* Left */}  
      <div className='flex-[3] bg-[#1a1a1a]'>
        <Greetings />
        {/* MiniCard sekcija */}  
        <div className='flex items-center w-full gap-3 px-8 mt-8'>
          {/* Ukupna današnja zarada */}  
          <MiniCard
            title="Total Earnings"
            icon={<BsCashCoin />}
            number={totalEarningsToday}
            footerNum={Number(earningsDiffPercent)}
          />
          {/* Broj porudžbina u statusu In Progress */}  
          <MiniCard
            title="In Progress"
            icon={<GrInProgress />}
            number={inProgressCount}
            footerNum={Number(inProgressDiffPercent)}
          />
        </div>
        <RecentOrders />
      </div>
      {/* Right */}  
      <div className='flex-[2] bg-[#242424]'>
        <PopularDishes />
      </div>
      <ButtonNav />
    </section>
  );
};

export default Home;
