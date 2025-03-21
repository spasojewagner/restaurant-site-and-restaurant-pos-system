import React, { useEffect, useState } from 'react';
import ButtonNav from '../components/ButtonNav';
import BackButton from '../components/shared/BackButton';
import {  } from '../https';
import { FaTrashAlt } from 'react-icons/fa';
import { deleteReservation, getReservations } from '../https';
import ReviewsPanel from '../components/reviews/ReviewsPanel';

const More = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
//
  const fetchReservations = () => {
    getReservations()
      .then((response) => {
        setReservations(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reservations:", err);
        setError("Error fetching reservations.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDelete = async (reservationId) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      try {
        await deleteReservation(reservationId);
        // Ukloni rezervaciju iz state-a
        setReservations((prev) => prev.filter((res) => res._id !== reservationId));
      } catch (err) {
        console.error("Error deleting reservation", err);
        alert("Failed to delete reservation.");
      }
    }
  };

  return (
    <>
      <div className="flex items-center bg-[#1f1f1f] p-3 pl-4 gap-2">
        <BackButton />
        <h1 className="text-white text-2xl font-bold tracking-wider">More</h1>
      </div>

      <section className="flex h-[1000px] bg-[#1f1f1f] gap-2">
        {/** Left side – Orders from site */}
        <div className="flex-1 bg-[#2c2c2c] p-4">
          <h1 className="font-bold text-2xl text-white mt-4">Reviews from site</h1>
          <ReviewsPanel/>
          {/* Ovde dodaj prikaz porudžbina ako je potrebno */}
        </div>

        {/** Right side – Reservations from site */}
        <div className="flex-1 bg-[#2c2c2c] p-4 overflow-y-auto">
          <h1 className="font-bold text-2xl text-white mt-4">Reservations from site</h1>
          {loading ? (
            <p className="text-white">Loading reservations...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : reservations.length === 0 ? (
            <p className="text-white">No reservations found.</p>
          ) : (
            reservations.map((reservation) => (
              <div
                key={reservation._id}
                className="bg-[#1f1f1f] p-4 m-2 rounded shadow-md relative"
              >
                {/** Trash icon positioned u gornjem desnom uglu */}
                <div
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => handleDelete(reservation._id)}
                >
                  <FaTrashAlt size={20} className="text-red-500 hover:text-red-700" />
                </div>
                <p className="text-white">
                  <span className="font-bold">Name:</span> {reservation.customerDetails?.name}
                </p>
                <p className="text-white">
                  <span className="font-bold">Phone:</span> {reservation.customerDetails?.phone}
                </p>
                <p className="text-white">
                  <span className="font-bold">Guests:</span> {reservation.customerDetails?.guests}
                </p>
                <p className="text-white">
                  <span className="font-bold">Request:</span> {reservation.customerDetails?.request || "None"}
                </p>
                <p className="text-white">
                  <span className="font-bold">Date:</span>{" "}
                  {new Date(reservation.reservationDate).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        <ButtonNav />
      </section>
    </>
  );
};

export default More;
