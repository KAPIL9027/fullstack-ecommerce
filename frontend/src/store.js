import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import cartSliceReducer from './slices/cartSlice.js';

import { apiSlice } from './slices/apiSlice';
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});


export default store;
