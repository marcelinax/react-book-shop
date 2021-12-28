import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import Book from '../models/Book';
import ShoppingCartBook from '../models/ShoppingCartBook';

interface ShoppingCartState {
    shoppingCartItems: ShoppingCartBook[]
}

const saveShoppingCartInSessionStorage = (state: ShoppingCartBook[]): void => {
    sessionStorage.setItem('bookStoreShoppingCart', JSON.stringify(state));
};

const loadShoppingCartFromSessionStorage = (): ShoppingCartBook[] => {
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
            const bookIndex = state.shoppingCartItems.map(item => { return item.book.id; }).indexOf(action.payload.id);
            if (bookIndex > -1) {
                state.shoppingCartItems[bookIndex].amount++;
                state.shoppingCartItems = [...state.shoppingCartItems];
            } else {
                state.shoppingCartItems = [...state.shoppingCartItems, { book: action.payload, amount: 1 }];
            }
            saveShoppingCartInSessionStorage(state.shoppingCartItems);
        },
        increaseBookAmountInShoppingCart(state, action: PayloadAction<Book>) {
            const bookIndex = state.shoppingCartItems.map(item => { return item.book.id; }).indexOf(action.payload.id);
            state.shoppingCartItems[bookIndex].amount++;
            state.shoppingCartItems = [...state.shoppingCartItems];
            saveShoppingCartInSessionStorage(state.shoppingCartItems);
        },
        decreaseBookAmountInShoppingCart(state, action: PayloadAction<Book>) {
            const bookIndex = state.shoppingCartItems.map(item => { return item.book.id; }).indexOf(action.payload.id);
            state.shoppingCartItems[bookIndex].amount--;
            if (state.shoppingCartItems[bookIndex].amount === 0) {
                state.shoppingCartItems.splice(bookIndex, 1);
            }
            state.shoppingCartItems = [...state.shoppingCartItems];
            saveShoppingCartInSessionStorage(state.shoppingCartItems);
        },
        deleteBookFromShoppingCart: (state, action: PayloadAction<Book>) => {
            const { id } = action.payload;
            const bookIndex = state.shoppingCartItems.map(item => { return item.book.id; }).indexOf(id);
            state.shoppingCartItems.splice(bookIndex, 1);
            state.shoppingCartItems = [...state.shoppingCartItems];
            saveShoppingCartInSessionStorage(state.shoppingCartItems);
        },
        clearShoppingCart: (state) => {
            state.shoppingCartItems = [];
            saveShoppingCartInSessionStorage(state.shoppingCartItems);
        }
    }
});

export const { addBookToShoppingCart, deleteBookFromShoppingCart, increaseBookAmountInShoppingCart, decreaseBookAmountInShoppingCart, clearShoppingCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;