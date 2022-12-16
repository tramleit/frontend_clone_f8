import { createSlice } from '@reduxjs/toolkit';

const searchReducer = createSlice({
    name: 'search',
    initialState: {
        search: {
            courses: [],
        },
    },
    reducers: {
        searchSuccess: (state, action) => {
            state.search.courses = action.payload;
        },
        searchFailed: (state) => {
            state.search.courses = [];
        },
    },
});

export const { searchSuccess, searchFailed } = searchReducer.actions;

export default searchReducer.reducer;
