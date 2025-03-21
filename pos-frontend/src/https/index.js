import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }

});

//api endpints


export const login = (data) => api.post("/api/user/login", data);
export const register = (data) => api.post("/api/user/register", data);
export const getUser = () => api.get("api/user");
export const logout = () => api.post("api/user/logout")
//tables
export const addTable = (data) => api.post("/api/table/", data);
export const getTables = () => api.get("/api/table");
// export const updateTable = ({ tableId, ...tableData }) => api.put(`/api/table/${tableId}`, tableData)
export const updateTable = ({ tableId, ...tableData }) => {
    console.log("API Call to:", `/api/table/${tableId}`);
    return api.put(`/api/table/${tableId}`, tableData);
};



//paymnet
export const createOrderPayment = (data) => api.post("api/payment/create-order", data);
export const verifyPaymentPayPal = (data) => api.post("api/payment/verify-payment", data);

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
  
// Rezervacije
export const addReservation = (data) => api.post("/api/reservations", data);
export const getReservations = () => api.get("/api/reservations");
export const updateReservation = ({ reservationId, ...reservationData }) =>
  api.put(`/api/reservations/${reservationId}`, reservationData);
export const deleteReservation = (reservationId) =>
  api.delete(`/api/reservations/${reservationId}`);

// Recenzije EndPoint
export const addReview = (data) => api.post("/api/reviews", data);
export const getReviews = () => api.get("/api/reviews");
export const deleteReview = (id) => api.delete(`/api/reviews/${id}`);

//payment test
export const getPayments = () => api.get("/api/payment");
//CASH PLACNAJE
export const createCashPayment = (data) => api.post("/api/payment/cash-payment", data);