import React from 'react';
import { Provider } from 'react-redux';

import ItemList from './layouts/ItemList';
import store from './store';

import './App.css';

export default function App() {
  return (
    <Provider store={store}>
      <main className="app-container">
        <div className='header'>
          <h1>SHOPPING LIST</h1>
        </div>

        <ItemList />
      </main>
    </Provider>
  );
}
