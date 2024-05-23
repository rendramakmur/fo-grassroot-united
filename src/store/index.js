import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./atuhSlice"
import storage from "redux-persist/lib/storage"
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

const persistAuthConfig = {
  key: 'auth',
  storage
}

const persistedAuth = persistReducer(persistAuthConfig, authSlice)

export const store = configureStore({
  reducer: {
    auth: persistedAuth
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production"
})

export const persistor = persistStore(store)