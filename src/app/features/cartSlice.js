import { createSlice } from "@reduxjs/toolkit";
import { addItemToShoppingCart } from "../../utils";
import { createStandaloneToast } from '@chakra-ui/react'
const { toast } = createStandaloneToast()
const initialState = {
    cartProducts: [],
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartProducts = addItemToShoppingCart(action.payload, state.cartProducts)
        },
        removeFromCart: (state, action) => {
            state.cartProducts = state.cartProducts.filter(item => item.id !== action.payload)
            toast({
                title: 'Removed in Your Cart ',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        },
        clearCart: (state ) => {
            state.cartProducts = [],
                toast({
                    title: 'Yor isEmpty Now',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
        },

    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export const selectCart = ({ cart }) => cart
export default cartSlice.reducer