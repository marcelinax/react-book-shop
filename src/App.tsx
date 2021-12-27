import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import React from 'react';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
