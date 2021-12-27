import Book from '../models/Book';
import { createSlice } from '@reduxjs/toolkit';

interface ShoppingCartState {
    shoppingCartItems: Book[]
}

const saveShoppingCartInSessionStorage = (state: Book[]): void => {
    sessionStorage.setItem('bookStoreShoppingCart', JSON.stringify(state));
};

const loadShoppingCartFromSessionStorage = (): Book[] => {
    return JSON.parse(sessionStorage.getItem('bookStoreShoppingCart') || '[]');
};

const initialState: ShoppingCartState = {
    shoppingCartItems: loadShoppingCartFromSessionStorage()
};

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState: initialState,
    reducers: {
        addBookToShoppingCart: (state, action) => {
            state.shoppingCartItems = [...state.shoppingCartItems, action.payload];
            saveShoppingCartInSessionStorage(state.shoppingCartItems);
        }
    }
});

export const { addBookToShoppingCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;