import { createSlice } from "@reduxjs/toolkit";


export const appSlice = createSlice({
    name: "appSlice",
    initialState: {
        token: undefined,
        isLoading: false,
        error: undefined
    },
    reducers: {
        setIsLoading(state, action) {
            const newState = { ...state };
            newState.isLoading = action.payload;
            return newState;
        },
        setToken(state, action) {
            const newState = { ...state };
            newState.token = action.payload;
            return newState;
        },
        setError(state, action) {
            const newState = { ...state };
            newState.error = action.payload;
            return newState;
        },
        resetState(state, action) {
            const newState = { ...state };
            const { stateName, stateValue } = action.payload;
            newState[stateName] = stateValue;
            return newState;
        }
    },
});

export const { actions: appSliceActions, reducer: appSliceReducers } =
    appSlice;
