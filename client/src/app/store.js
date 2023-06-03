import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER 
} from "redux-persist"
import storage from 'redux-persist/lib/storage';

import { apiSlice } from './services/apiSlice';
import authReducer from "../features/auth/authSlice"

const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);



const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: persistedAuthReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }
    ).concat(apiSlice.middleware),
});

const persistor = persistStore(store)

export { persistor }

export default store;

setupListeners(store.dispatch)