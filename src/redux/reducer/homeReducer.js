import { createSlice } from '@reduxjs/toolkit';

const homeReducer = createSlice({
    name: 'home',
    initialState: {
        courses: {
            currentCourses: null,
            error: false,
        },
        blogs: {
            currentBlogs: null,
            error: false,
        },
        videos: {
            currentVideos: null,
            error: false,
        },
    },
    reducers: {
        getAllCoursesSuccess: (state, action) => {
            state.courses.currentCourses = action.payload;
            state.courses.error = false;
        },
        getAllCoursesFailed: (state) => {
            state.courses.error = true;
        },

        getAllBlogsSuccess: (state, action) => {
            state.blogs.currentBlogs = action.payload;
            state.blogs.error = false;
        },
        getAllBlogsFailed: (state) => {
            state.blogs.error = true;
        },

        getAllVideosSuccess: (state, action) => {
            state.videos.currentVideos = action.payload;
            state.videos.error = false;
        },
        getAllVideosFailed: (state) => {
            state.videos.error = true;
        },
    },
});

export const {
    getAllCoursesSuccess,
    getAllCoursesFailed,
    getAllBlogsSuccess,
    getAllBlogsFailed,
    getAllVideosSuccess,
    getAllVideosFailed,
} = homeReducer.actions;

export default homeReducer.reducer;
