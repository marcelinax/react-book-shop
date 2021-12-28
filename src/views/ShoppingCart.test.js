import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ShoppingCart } from './ShoppingCart';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

const mockStore = configureStore([]);

describe('ShoppingCart', () => {
    let store;
    let history;

    beforeEach(() => {
        store = mockStore({
            shoppingCart: {
                shoppingCartItems: [
                    {
                        amount: 2,
                        book: {
                            'id': 457,
                            'title': 'Matematyka 1. Podręcznik. Zakres podstawowy',
                            'author': 'M. Karpiński, M. Dobrowolska, M. Braun, J. Lech',
                            'cover_url': 'http://localhost:3001/static/cover/book/457.jpg',
                            'pages': 280,
                            'price': 3200,
                            'currency': 'PLN'
                        }
                    },
                    {
                        amount: 1,
                        book: {
                            'id': 455,
                            'title': 'Matematyka 1. Podręcznik. Zakres podstawowy',
                            'author': 'M. Karpiński, M. Dobrowolska, M. Braun, J. Lech',
                            'cover_url': 'http://localhost:3001/static/cover/book/457.jpg',
                            'pages': 280,
                            'price': 3100,
                            'currency': 'PLN'
                        }
                    }
                ]
            }
        });
        history = createMemoryHistory();
    });

    it('should mount shopping cart component', async () => {
        await act( async () => {return render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <ShoppingCart />
                </Router>
            </Provider>
        );});

        expect(screen.getByText(/koszyk/i)).toBeInTheDocument();
    });

    it('should add one book amount by clicking plus button', async () => {
        await act( async () => {return render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <ShoppingCart />
                </Router>
            </Provider>
        );
        });
        
        const button = screen.getByTestId('add-one-book-amount-button457');

        await act(async () => {
            await userEvent.click(button);
        });
        
        expect(store.getActions()[0].type).toEqual('shoppingCart/increaseBookAmountInShoppingCart');
        expect(store.getActions()[0].payload).toEqual({
            'id': 457,
            'title': 'Matematyka 1. Podręcznik. Zakres podstawowy',
            'author': 'M. Karpiński, M. Dobrowolska, M. Braun, J. Lech',
            'cover_url': 'http://localhost:3001/static/cover/book/457.jpg',
            'pages': 280,
            'price': 3200,
            'currency': 'PLN'
        });
        
    });

    it('should subtract one book amount by clicking minus button', async () => {
        await act( async () => {return render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <ShoppingCart />
                </Router>
            </Provider>
        );
        });
        
        const button = screen.getByTestId('subtract-one-book-amount-button457');

        await act(async () => {
            await userEvent.click(button);
        });
        
        expect(store.getActions()[0].type).toEqual('shoppingCart/decreaseBookAmountInShoppingCart');
        expect(store.getActions()[0].payload).toEqual({
            'id': 457,
            'title': 'Matematyka 1. Podręcznik. Zakres podstawowy',
            'author': 'M. Karpiński, M. Dobrowolska, M. Braun, J. Lech',
            'cover_url': 'http://localhost:3001/static/cover/book/457.jpg',
            'pages': 280,
            'price': 3200,
            'currency': 'PLN'
        });
        
    });

    it('should remove book from shopping cart by clicking remopve button', async () => {
        await act( async () => {return render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <ShoppingCart />
                </Router>
            </Provider>
        );
        });
        
        const button = screen.getByTestId('remove-book-button457');

        await act(async () => {
            await userEvent.click(button);
        });
        
        expect(store.getActions()[0].type).toEqual('shoppingCart/deleteBookFromShoppingCart');
        expect(store.getActions()[0].payload).toEqual({
            'id': 457,
            'title': 'Matematyka 1. Podręcznik. Zakres podstawowy',
            'author': 'M. Karpiński, M. Dobrowolska, M. Braun, J. Lech',
            'cover_url': 'http://localhost:3001/static/cover/book/457.jpg',
            'pages': 280,
            'price': 3200,
            'currency': 'PLN'
        });
        
    });

    it('should calculate total sum of books prices', async () => {
        await act( async () => {return render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <ShoppingCart />
                </Router>
            </Provider>
        );
        });
        
        const sum = screen.getByText(/suma\:/i);
        
        expect(sum.innerHTML).toContain('9500');
    });

    it('should calculate total amount of books', async () => {
        await act( async () => {return render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <ShoppingCart />
                </Router>
            </Provider>
        );
        });
        
        const sum = screen.getByText(/art./i);
        
        expect(sum.innerHTML).toContain('3');
    });

    it('should not let user to checkout when shopping cart is empty', async () => {

        store = mockStore({
            shoppingCart: {
                shoppingCartItems: []
            }
        });

        await act( async () => {return render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <ShoppingCart />
                </Router>
            </Provider>
        );
        });

        const button = screen.getByText(/dalej/i);
        
        expect(button).toBeDisabled();
    });

});