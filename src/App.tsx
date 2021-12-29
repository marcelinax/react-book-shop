import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { Homepage } from './views/Homepage';
import { NotFound } from './views/NotFound';
import { OrderForm } from './views/OrderForm';
import { Provider } from 'react-redux';
import React from 'react';
import { ShoppingCart } from './views/ShoppingCart';
import store from './store/store';

function App() {
    return (
        <Provider store={store}>
            <ToastContainer position='top-center'/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <Homepage/>}/>
                    <Route path="*" element={ <NotFound/>}/>
                    <Route path="/shopping-cart" element={ <ShoppingCart/>}/>
                    <Route path="/order" element={ <OrderForm/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
