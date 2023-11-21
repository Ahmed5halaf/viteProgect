import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './features/loginSlice'
import cartSlice from './features/cartSlice'
import globalSlice from './features/globalSlice'
export const store = configureStore({
    reducer:{
        cart:cartSlice,
        login:loginSlice,
        global:globalSlice

    }
  })