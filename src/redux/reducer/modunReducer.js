import { createSlice } from '@reduxjs/toolkit';

const modunReducer = createSlice({
    name: 'modun',
    initialState: {
        modal: {
            status: false,
        },
        modalComment: {
            status: false,
        },
        sidebarCourse: {
            status: true,
        },
    },
    reducers: {
        openModal: (state) => {
            state.modal.status = true;
        },
        closeModal: (state) => {
            state.modal.status = false;
        },
        openModalComment: (state) => {
            state.modalComment.status = true;
        },
        closeModalComment: (state) => {
            state.modalComment.status = false;
        },
        openSidebarCourse: (state) => {
            state.sidebarCourse.status = true;
        },
        closeSidebarCourse: (state) => {
            state.sidebarCourse.status = false;
        },
    },
});

export const { openModal, closeModal, openModalComment, closeModalComment, openSidebarCourse, closeSidebarCourse } =
    modunReducer.actions;

export default modunReducer.reducer;
