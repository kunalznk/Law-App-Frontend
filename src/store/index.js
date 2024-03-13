import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./slices/appSlice";
import { queryArgsSlice } from "./slices/queryArgsSlice";
import UserAPI from "./slices/userSlice";
import LawyerAPI from "./slices/lawyerSlice";
import LawAPI from "./slices/lawSlice";

const reducer = combineReducers({
    [appSlice.name]: appSlice.reducer,
    [queryArgsSlice.name]: queryArgsSlice.reducer,
    [UserAPI.reducerPath]: UserAPI.reducer,
    [LawyerAPI.reducerPath]: LawyerAPI.reducer,
    [LawAPI.reducerPath]: LawAPI.reducer

})

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        UserAPI.middleware,
        LawyerAPI.middleware,
        LawAPI.middleware

    ),
})

export default store;