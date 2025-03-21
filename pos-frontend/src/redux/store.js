import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './slices/customerSlice';
import cartReducer from './slices/cartSlice'; 
import userSlice from './slices/urserSlice';
const store = configureStore({
    reducer: {
        customer: customerReducer,
        cart: cartReducer, 
        user: userSlice
    },
    devTools: import.meta.env.NODE_ENV !== "production",
});

export default store;
