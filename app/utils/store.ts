import { configureStore } from "@reduxjs/toolkit";
import listReducer from '@/features/listSlice';
import { apiSlice } from "@/features/getListAPI";

export const store = configureStore({
    reducer: {
        lists: listReducer,
        [ apiSlice.reducerPath ]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware)
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;