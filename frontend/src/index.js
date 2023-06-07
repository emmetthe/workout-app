import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store, Persistor } from './app/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate Loading={null} persistor={Persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
