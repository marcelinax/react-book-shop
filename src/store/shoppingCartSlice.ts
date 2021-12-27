import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import Book from '../models/Book';

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
        addBookToShoppingCart: (state, action: PayloadAction<Book>) => {
            state.shoppingCartItems = [...state.shoppingCartItems, action.payload];
            saveShoppingCartInSessionStorage(state.shoppingCartItems);
        },
        deleteBookFromShoppingCart: (state, action: PayloadAction<Book>) => {
            const { id } = action.payload;
            const deleteStartIndex = state.shoppingCartItems.map(item => { return item.id; }).indexOf(id);
            state.shoppingCartItems.splice(deleteStartIndex, 1);
            state.shoppingCartItems = [...state.shoppingCartItems];
            saveShoppingCartInSessionStorage(state.shoppingCartItems);
        }
        
    }
});

export const { addBookToShoppingCart,deleteBookFromShoppingCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;