import AuthReducer from "./AuthSlice";
import CartReducer from "./CartSlice";

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        authReduce: AuthReducer,
        cartReduce: CartReducer,
    },
})
