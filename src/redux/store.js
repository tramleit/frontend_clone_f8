import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import authReducer from './reducer/authReducer';
import modunReducer from './reducer/modunReducer';
import lessonReducer from './reducer/lessonReducer';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth'],
};
const rootReducer = combineReducers({
    auth: authReducer,
    modun: modunReducer,
    lesson: lessonReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
