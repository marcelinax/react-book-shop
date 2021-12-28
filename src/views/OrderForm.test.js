import { fireEvent, render, screen } from '@testing-library/react';

import { OrderForm } from './OrderForm';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

const mockStore = configureStore([]);

describe('OrderForm', () => {
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

        axios.post = jest.fn().mockResolvedValue({
            data: {
                data: {
                    'id': 7033,
                    'first_name': 'Marcelina',
                    'last_name': 'Sitko',
                    'city': 'Kraków',
                    'zip_code': '33-222',
                    'order': [
                        {
                            'id': 457,
                            'quantity': 2
                        },
                        {
                            'id': 455,
                            'quantity': 1
                        }
                    ]
                }
            }
        });
    });

    it('should mount order form component', async () => {
        await act(async () => {
            return render(
                <Provider store={store}>
                    <Router location={history.location} navigator={history}>
                        <OrderForm />
                    </Router>
                </Provider>
            );
        });

        expect(screen.getByText(/twoje zamówienie ibooks/i)).toBeInTheDocument();
    });

    it('should validate name input', async () => {
        await act( async () => {return render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <OrderForm />
                </Router>
            </Provider>
        );
        });
        
        const input = screen.getByLabelText(/imię/i);
        const sendButton = screen.getByText(/zamawiam i płacę/i);
        const inputValue = 'testing';

        await act(async () => {
            await userEvent.click(sendButton);
        });
        
        expect(screen.queryByText(/imię musi mieć co najmniej 4 litery/i)).toBeInTheDocument();

        await act(async () => {
            await fireEvent.change(input, {target: {value: inputValue}});
            await userEvent.click(sendButton);
        });

        expect(screen.queryByText(/imię musi mieć co najmniej 4 litery/i)).toBeNull();
    });

    it('should validate surname input', async () => {
        await act( async () => {return render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <OrderForm />
                </Router>
            </Provider>
        );
        });
        
        const input = screen.getByLabelText(/nazwisko/i);
        const sendButton = screen.getByText(/zamawiam i płacę/i);
        const inputValue = 'testing';

        await act(async () => {
            await userEvent.click(sendButton);
        });
        
        expect(screen.queryByText(/nazwisko musi mieć co najmniej 5 liter/i)).toBeInTheDocument();

        await act(async () => {
            await fireEvent.change(input, {target: {value: inputValue}});
            await userEvent.click(sendButton);
        });

        expect(screen.queryByText(/nazwisko musi mieć co najmniej 5 liter/i)).toBeNull();
    });

    it('should validate city input', async () => {
        await act( async () => {return render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <OrderForm />
                </Router>
            </Provider>
        );
        });
        
        const input = screen.getByLabelText(/miejscowość/i);
        const sendButton = screen.getByText(/zamawiam i płacę/i);
        const inputValue = 'testing';

        await act(async () => {
            await userEvent.click(sendButton);
        });
        
        expect(screen.queryByText(/podaj miasto/i)).toBeInTheDocument();

        await act(async () => {
            await fireEvent.change(input, {target: {value: inputValue}});
            await userEvent.click(sendButton);
        });

        expect(screen.queryByText(/podaj miasto/i)).toBeNull();
    });

    it('should validate zip code input', async () => {
        await act( async () => {return render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <OrderForm />
                </Router>
            </Provider>
        );
        });
        
        const input = screen.getByLabelText(/kod pocztowy/i);
        const sendButton = screen.getByText(/zamawiam i płacę/i);
        const badInputValue = '33-2221';
        const goodInputValue = '33-221';

        await act(async () => {
            await userEvent.click(sendButton);
        });
        
        expect(screen.queryByText(/niepoprawny format kodu pocztowego/i)).toBeInTheDocument();

        await act(async () => {
            await fireEvent.change(input, {target: {value: badInputValue}});
            await userEvent.click(sendButton);
        });

        expect(screen.queryByText(/niepoprawny format kodu pocztowego/i)).toBeInTheDocument();

        await act(async () => {
            await fireEvent.change(input, {target: {value: goodInputValue}});
            await userEvent.click(sendButton);
        });

        expect(screen.queryByText(/niepoprawny format kodu pocztowego/i)).toBeNull();
    });

    it('should calculate total sum of books prices', async () => {
        await act( async () => {return render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <OrderForm />
                </Router>
            </Provider>
        );
        });
        
        const sum = screen.getByText(/do zapłaty/i);
        
        expect(sum.innerHTML).toContain('9500');
    });

    it('should calculate total amount of books', async () => {
        await act( async () => {return render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <OrderForm />
                </Router>
            </Provider>
        );
        });
        
        const sum = screen.getByText(/art./i);
        
        expect(sum.innerHTML).toContain('3');
    });

    it('should create order by api call', async () => {
        await act( async () => {return render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <OrderForm />
                </Router>
            </Provider>
        );
        });
        
        const nameInput = screen.getByLabelText(/imię/i);
        const surnameInput = screen.getByLabelText(/nazwisko/i);
        const cityInput = screen.getByLabelText(/miejscowość/i);
        const zipCodeInput = screen.getByLabelText(/kod pocztowy/i);
        const sendButton = screen.getByText(/zamawiam i płacę/i);

        await act(async () => {
            await fireEvent.change(nameInput, { target: { value: 'Marcelina' } });
            await fireEvent.change(surnameInput, { target: { value: 'Sitko' } });
            await fireEvent.change(cityInput, { target: { value: 'Kraków' } });
            await fireEvent.change(zipCodeInput, { target: { value: '33-222' } });
            
            await userEvent.click(sendButton);
        });

        expect(axios.post).toBeCalled();

        expect(store.getActions()[0].type).toEqual('shoppingCart/clearShoppingCart');
    });

});