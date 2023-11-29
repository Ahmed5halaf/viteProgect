import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import cartSlice from './features/cartSlice'
import loginSlice from './features/loginSlice'
import globalSlice from './features/globalSlice'
import { apiSlice } from './services/apislice';


const persistConfig = {
    key: 'cart',
    storage,
}
const persistedCart = persistReducer(persistConfig, cartSlice)

export const store = configureStore({
    reducer: {
        cart: persistedCart,
        login: loginSlice,
        global: globalSlice,
        [apiSlice.reducerPath]:apiSlice.reducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}).concat([apiSlice.middleware]),

})



// export const persistor = persistStore(store)
