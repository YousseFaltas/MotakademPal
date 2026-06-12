import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./api/baseApi";
import authReducer from "./slices/authSlice";
import draftsReducer from "./slices/draftsSlice";
import filtersReducer from "./slices/filtersSlice";
import localeReducer from "./slices/localeSlice";
import uiReducer from "./slices/uiSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  drafts: draftsReducer,
  filters: filtersReducer,
  locale: localeReducer,
  ui: uiReducer,
  [baseApi.reducerPath]: baseApi.reducer
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
  });

export const store = makeStore();
setupListeners(store.dispatch);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
