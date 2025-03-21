import axios from "axios"
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8000", //NE PREPOZNAJE IZ ENV FAJLA VIDI GDE JE GRESKA
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});

// Rezervacije

// Dodaj rezervaciju (POST)
export const addReservation = (data) => api.post("/api/reservations", data);

// Uzmi sve rezervacije (GET)
export const getReservations = () => api.get("/api/reservations");

// Ažuriraj rezervaciju (PUT)
export const updateReservation = ({ reservationId, ...reservationData }) => {
  console.log("API Call to:", `/api/reservations/${reservationId}`);
  return api.put(`/api/reservations/${reservationId}`, reservationData);
};

// Obriši rezervaciju (DELETE)
export const deleteReservation = (reservationId) => {
  console.log("Deleting reservation with ID:", reservationId);
  return api.delete(`/api/reservations/${reservationId}`);
};

//Order EndPoint
export const addOrder = (data) => api.post("/api/order/", data);
export const getOrders = (data) => api.get("/api/order", data);
export const updateOrderStatus = ({ orderId, orderStatus }) => {
    console.log("API Call to:", `/api/order/${orderId}`);
    return api.put(`/api/order/${orderId}`, { orderStatus });
};
export const deleteOrder = (orderId) => {
    console.log("Deleting order with ID:", orderId);
    return api.delete(`/api/order/${orderId}`);
  };
  
  // Recenzije EndPoint
export const addReview = (data) => api.post("/api/reviews", data);
export const getReviews = () => api.get("/api/reviews");
export const deleteReview = (id) => api.delete(`/api/reviews/${id}`);
