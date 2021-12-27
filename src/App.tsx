import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Homepage } from './views/Homepage';
import { Provider } from 'react-redux';
import React from 'react';
import { ShoppingCart } from './views/ShoppingCart';
import store from './store/store';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <Homepage/>}/>
                    <Route path="/shopping-cart" element={ <ShoppingCart/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
