import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
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

export const { searchSuccess, searchFailed } = searchSlice.actions;

export default searchSlice.reducer;
