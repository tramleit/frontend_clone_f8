import { createSlice } from '@reduxjs/toolkit';

const pageBlogReducer = createSlice({
    name: 'currentPage',
    initialState: {
        currentPageBlogs: null,
    },
    reducers: {
        getPageBlogSuccess: (state, action) => {
            state.currentPageBlogs = action.payload;
        },
    },
});

export const { getPageBlogSuccess } = pageBlogReducer.actions;

export default pageBlogReducer.reducer;
