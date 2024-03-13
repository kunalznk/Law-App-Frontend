import { createSlice } from "@reduxjs/toolkit";


export const queryArgsSlice = createSlice({
    name: "queryArgsSlice",
    initialState: {
        lawyersSearchQuery: "",
        lawSearchQuery: "",
        lawyersFilters: undefined,
        lawFilters: undefined

    },
    reducers: {
        setLawyersSearchQuery(state, action) {
            const newState = { ...state };
            newState.lawyersSearchQuery = action.payload;
            return newState;
        },
        setLawsSearchQuery(state, action) {
            const newState = { ...state };
            newState.lawSearchQuery = action.payload;
            return newState;
        },
        setLawyersFilters(state, action) {
            const newState = { ...state };
            console.log(action, newState, newState.lawyersFilters);
            newState.lawyersFilters = {...action.payload};
            console.log(newState);
            return newState;
        },
        setLawFiltersFilters(state, action) {
            const newState = { ...state };
            newState.lawFilters = action.payload;
            return newState;
        }
    },
});

export const { actions: queryArgsSliceActions, reducer: queryArgsSliceReducers } =
    queryArgsSlice;
