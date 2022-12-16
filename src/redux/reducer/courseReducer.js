import { createSlice } from '@reduxjs/toolkit';

const courseReducer = createSlice({
    name: 'course',
    initialState: {
        courseFree: null,
    },
    reducers: {
        getAllCourse: (state, action) => {
            state.courseFree = action.payload;
        },
    },
});

export const { getAllCourse } = courseReducer.actions;

export default courseReducer.reducer;
