import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartProducts: []
}
const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action) => {
            state.cartProducts = [ ...state.cartProducts,action.payload]
        }
    }
})

export const {addToCart} = cartSlice.actions
export const selectCart = ({cart}) => cart
export default cartSlice.reducer