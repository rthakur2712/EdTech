import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[],
    total: localStorage.getItem('total')?JSON.parse(localStorage.getItem('total')):0,
   totalItems : localStorage.getItem('totalItems')?JSON.parse(localStorage.getItem('totalItems')):0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
       addToCart:(state,action)=>{
        const course = action.payload;
        const index = state.cart.findIndex((item)=>item._id === course._id);
        if(index >= 0){
            toast.error("Course already in cart");
        }
        else{
            state.cart.push(course);
            state.total += course.price;
            state.totalItems += 1;
            localStorage.setItem('cart',JSON.stringify(state.cart));
            localStorage.setItem('total',JSON.stringify(state.total));
            localStorage.setItem('totalItems',JSON.stringify(state.totalItems));
        }
        
       },
       removeFromCart:(state,action)=>{
        const course = action.payload;
        const index = state.cart.findIndex((item)=>item._id === course._id);
        if(index >= 0){
            state.cart.splice(index,1);
            state.total -= course.price;
            state.totalItems -= 1;
            toast.success("Course removed from cart");
            localStorage.setItem('cart',JSON.stringify(state.cart));
            localStorage.setItem('total',JSON.stringify(state.total));
            localStorage.setItem('totalItems',JSON.stringify(state.totalItems));
        }
       },
       resetCart:(state)=>{
        state.cart = [];
        state.total = 0;
        state.totalItems = 0;
        localStorage.removeItem('cart');
        localStorage.removeItem('total');
        localStorage.removeItem('totalItems');
        // toast.success("Cart reset successful");
       }
     
    },
});

export const { setTotalItems,resetCart,addToCart,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;