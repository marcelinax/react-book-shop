import { configureStore } from '@reduxjs/toolkit';
import shoppingCartSlice from './shoppingCartSlice';

const store = configureStore({
    reducer: {
        shoppingCart: shoppingCartSlice
    },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
