import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrders, getReservations, getReviews } from '../../https';
import { enqueueSnackbar } from 'notistack';

const NotificationBell = ({ isNotificationOpen, closeNotification, title, onNotificationCountChange }) => {
  const [notifications, setNotifications] = useState([]);
  const [prevOrders, setPrevOrders] = useState([]);
  const [prevReservations, setPrevReservations] = useState([]);
  const [prevReviews, setPrevReviews] = useState([]);

  // Query za porudžbine – osvežavanje na svakih 10 sekundi
  const { data: ordersData } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await getOrders();
      return response;
    },
    refetchInterval: 10000,
  });

  // Query za rezervacije
  const { data: reservationsData } = useQuery({
    queryKey: ['reservations'],
    queryFn: async () => {
      const response = await getReservations();
      return response;
    },
    refetchInterval: 10000,
  });

  // Query za recenzije
  const { data: reviewsData } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const response = await getReviews();
      return response;
    },
    refetchInterval: 10000,
  });

  // Provera novih porudžbina
  useEffect(() => {
    if (ordersData?.data?.data) {
      const currentOrders = ordersData.data.data;
      if (prevOrders.length > 0 && currentOrders.length > prevOrders.length) {
        const newOrders = currentOrders.filter(
          order => !prevOrders.some(prev => prev._id === order._id)
        );
        newOrders.forEach(order => {
          const customerName = order.customerDetails?.name || "Unknown Customer";
          const orderType = order.table ? `Table ${order.table.tableNo}` : "Online Order";
          const message = `New order from ${customerName} (${orderType}) – Payment: ${order.paymentMethod}, Items: ${order.items.length}`;
          setNotifications(prev => [...prev, { id: order._id, message }]);
          enqueueSnackbar(message, { variant: 'info' });
        });
      }
      setPrevOrders(currentOrders);
    }
  }, [ordersData, prevOrders]);

  // Provera novih rezervacija
  useEffect(() => {
    if (reservationsData?.data?.data) {
      const currentReservations = reservationsData.data.data;
      if (prevReservations.length > 0 && currentReservations.length > prevReservations.length) {
        const newReservations = currentReservations.filter(
          res => !prevReservations.some(prev => prev._id === res._id)
        );
        newReservations.forEach(reservation => {
          const customerName = reservation.customerDetails?.name || "Unknown Customer";
          const guests = reservation.customerDetails?.guests || '';
          const reservationDate = new Date(reservation.reservationDate).toLocaleString();
          const message = `New reservation from ${customerName} – Guests: ${guests}, Date: ${reservationDate}`;
          setNotifications(prev => [...prev, { id: reservation._id, message }]);
          enqueueSnackbar(message, { variant: 'info' });
        });
      }
      setPrevReservations(currentReservations);
    }
  }, [reservationsData, prevReservations]);

  // Provera novih recenzija
  useEffect(() => {
    if (reviewsData?.data?.data) {
      const currentReviews = reviewsData.data.data;
      if (prevReviews.length > 0 && currentReviews.length > prevReviews.length) {
        const newReviews = currentReviews.filter(
          review => !prevReviews.some(prev => prev._id === review._id)
        );
        newReviews.forEach(review => {
          const reviewerName = review.reviewsrDetails?.name || "Anonymous";
          const reviewText = review.reviewsrDetails?.review || "";
          const message = `New review from ${reviewerName}: "${reviewText}"`;
          setNotifications(prev => [...prev, { id: review._id, message }]);
          enqueueSnackbar(message, { variant: 'info' });
        });
      }
      setPrevReviews(currentReviews);
    }
  }, [reviewsData, prevReviews]);

  // Obavesti roditelja o broju notifikacija
  useEffect(() => {
    if (onNotificationCountChange) {
      onNotificationCountChange(notifications.length);
    }
  }, [notifications, onNotificationCountChange]);

  return (
    <>
      {isNotificationOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#1a1a1a] rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-600">
            <h2 className="text-white text-lg font-semibold">{title}</h2>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              <ul>
                {notifications.map(notification => (
                  <li
                    key={notification.id}
                    className="text-white py-2 px-4 border-b border-gray-600"
                  >
                    {notification.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white p-4">No notifications</p>
            )}
          </div>
          <button
            onClick={closeNotification}
            className="w-full text-center py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-b-lg"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default NotificationBell;
