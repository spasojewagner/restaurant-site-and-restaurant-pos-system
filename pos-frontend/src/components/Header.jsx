import React, { useState } from 'react';
import { FaSearch, FaUserCircle, FaBell } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { MdDashboard } from 'react-icons/md';
import logo from './../assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../https';
import { removeUser } from '../redux/slices/urserSlice';
import { useNavigate } from 'react-router-dom';
import NotificationBell from './shared/NotificationBel';

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const openNotification = () => setIsNotificationOpen(!isNotificationOpen);
  const closeNotification = () => setIsNotificationOpen(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      dispatch(removeUser());
      navigate("/auth");
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const handleLogOut = () => {
    logoutMutation.mutate();
  };

  const userData = useSelector((state) => state.user);

  // Callback koji prima broj notifikacija iz NotificationBell
  const handleNotificationCountChange = (count) => {
    setNotificationsCount(count);
  };

  return (
    <header className='flex justify-between items-center py-1 px-8 bg-[#1a1a1a] relative'>
      <div
        className='flex items-center gap-4 bg-neutral-900 p-2 rounded-b-lg px-5 py-2 w-[500px] cursor-pointer'
        onClick={() => navigate('/home')}
      >
        <img src={logo} alt="logo" className='h-18 w-40' />
      </div>
      
      {/* Search */}
      <div className='flex items-center gap-2'>
        <FaSearch className='text-white' />
        <input
          type="text"
          placeholder='search'
          className='bg-[#333] outline-none text-white py-3 px-12 rounded-2xl'
        />
      </div>
      
      {/* Ikone i korisnički detalji */}
      <div className='flex items-center gap-4 relative'>
        {userData.role === "Admin" && (
          <div
            onClick={() => navigate("/dashboard")}
            className='bg-neutral-800 rounded-full p-4 cursor-pointer'
          >
            <MdDashboard className='text-yellow-50 text-2xl' />
          </div>
        )}
        
        <div className='relative'>
          <button
            onClick={openNotification}
            className='bg-neutral-800 rounded-full p-4 cursor-pointer'
          >
            <FaBell className='text-yellow-50 text-2xl' />
            <span className='absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4
              bg-red-500 text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full'>
              {notificationsCount}
            </span>
          </button>
          <NotificationBell
            isNotificationOpen={isNotificationOpen}
            closeNotification={closeNotification}
            title="Notifications"
            onNotificationCountChange={handleNotificationCountChange}
          />
        </div>

        <div onClick={()=>navigate("/userdetails")} className='flex items-center gap-3 cursor-pointer bg-neutral-800 rounded-full p-2.5'>
          <FaUserCircle className='text-white text-4xl' />
        </div>
        <div className='flex flex-col items-start'>
          <h1 className='text-md text-white font-semibold'>{userData.name || 'Test user'}</h1>
          <p className='text-xs text-gray-300'>{userData.role || 'Role'}</p>
        </div>
        <IoLogOut onClick={handleLogOut} size={40} className='text-white ml-2 cursor-pointer' />
      </div>
    </header>
  );
};

export default Header;
