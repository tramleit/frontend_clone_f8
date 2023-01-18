import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '~/redux/store';
import GlobalStyles from '~/components/GlobalStyles/';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </PersistGate>
    </Provider>
);
