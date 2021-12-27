import Book from '../models/Book';
import { createSlice } from '@reduxjs/toolkit';

interface ShoppingCartState {
    shoppingCartItems: Book[]
}

const initialState: ShoppingCartState = {
    shoppingCartItems: []
};

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState: initialState,
    reducers: {
        addBookToShoppingCart: (state, action) => {
            state.shoppingCartItems = [...state.shoppingCartItems, action.payload];
        }
    }
});

export const { addBookToShoppingCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;