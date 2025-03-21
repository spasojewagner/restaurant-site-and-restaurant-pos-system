import {  createSlice } from "@reduxjs/toolkit";
import reducer from "./customerSlice";

const initialState=[];//definisanje pocetnog stanja korpe prazan niz " cart is empty"

const cartSlice= createSlice({
    name:'cart',
    initialState,
    reducers: {
        additems: (state, action)=>{
            state.push(action.payload); //dodavanje itema u korpu

        },
        removeItem:(state, action)=>{
            return state.filter(item =>item.id != action.payload);
        },
        removeAllItems:(state)=>{
return[];
        }
    }
})


export const getTotalPrice= (state) => state.cart.reduce((total,item)=> total + item.price,0);
export const { additems, removeItem, removeAllItems } = cartSlice.actions;
export default cartSlice.reducer;
