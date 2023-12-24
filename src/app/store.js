import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import loginSlice from './features/loginSlice'
import globalSlice from './features/globalSlice'
import { apiSlice } from './services/apislice';

import cartSlice from './features/cartSlice';
import networkSlice from './features/networkSlice';


const persistCartConfig = {
    key: "cart",
    storage,
  };
  const persistedCart = persistReducer(persistCartConfig, cartSlice);
  
  export const store = configureStore({
    reducer: {
      network: networkSlice,
      cart: persistedCart,
      login: loginSlice,
      global: globalSlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat([apiSlice.middleware]),
      
  });
  export const persister = persistStore(store);
