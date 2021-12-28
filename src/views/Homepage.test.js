import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Homepage } from './Homepage';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

const mockStore = configureStore([]);

describe('Homepage', () => {
    let store;
    let history;

    beforeEach(() => {
        store = mockStore({
            shoppingCart: {
                shoppingCartItems: []
            }
        });
        history = createMemoryHistory();
        
        axios.get = jest.fn().mockResolvedValue({
            data: {
                data: [
                    {
                        'id': 457,
                        'title': 'Matematyka 1. Podręcznik. Zakres podstawowy',
                        'author': 'M. Karpiński, M. Dobrowolska, M. Braun, J. Lech',
                        'cover_url': 'http://localhost:3001/static/cover/book/457.jpg',
                        'pages': 280,
                        'price': 3200,
                        'currency': 'PLN'
                    }
                ]
            }
        });
    });

    it('should mount homepage component', async () => {
        await act( async () => {return render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <Homepage />
                </Router>
            </Provider>
        );});

        expect(screen.getByText(/lista książek/i)).toBeInTheDocument();
    });

    it('should render books from api response call', async () => {
        await act( async () => {return render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <Homepage />
                </Router>
            </Provider>
        );});

        expect(screen.getByText(/matematyka 1. podręcznik. zakres podstawowy/i)).toBeInTheDocument();
    });

    it('should call api with title search query when user changes title input and sends search form', async () => {
        await act(async () => {
            return render(
                <Provider store={store}>
                    <Router location={history.location} navigator={history}>
                        <Homepage />
                    </Router>
                </Provider>
            );
        });
        const query = 'testing';

        const input = screen.getAllByPlaceholderText(/tytuł/i)[0];
        const button = screen.getByText(/szukaj/i);
        
        await act(async () => {
            await fireEvent.change(input, {target: {value: query}});
            await userEvent.click(button);
        });

        expect(axios.get.mock.calls[1][1].params['search[title]']).toEqual(query);
    });

    it('should call api with author search query when user changes author input and sends search form', async () => {
        await act(async () => {
            return render(
                <Provider store={store}>
                    <Router location={history.location} navigator={history}>
                        <Homepage />
                    </Router>
                </Provider>
            );
        });
        const query = 'testing';

        const input = screen.getAllByPlaceholderText(/autor/i)[0];
        const button = screen.getByText(/szukaj/i);
        
        await act(async () => {
            await fireEvent.change(input, {target: {value: query}});
            await userEvent.click(button);
        });

        expect(axios.get.mock.calls[1][1].params['search[author]']).toEqual(query);
    });

    it('should add book to shopping cart by clicking on add to cart button', async () => {
        await act(async () => {
            return render(
                <Provider store={store}>
                    <Router location={history.location} navigator={history}>
                        <Homepage />
                    </Router>
                </Provider>
            );
        });

        const button = screen.getByText(/dodaj do koszyka/i);
        
        await act(async () => {
            await userEvent.click(button);
        });

        expect(store.getActions()[0].type).toEqual('shoppingCart/addBookToShoppingCart');
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
});