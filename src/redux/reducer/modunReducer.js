import { createSlice } from '@reduxjs/toolkit';

const modunReducer = createSlice({
    name: 'modun',
    initialState: {
        modal: {
            status: false,
        },
        modalComment: {
            status: false,
            type: '',
            uid: '',
        },
        modalMobile: {
            status: false,
        },
        sidebarCourse: {
            status: true,
        },
        loading: {
            status: false,
        },
        notification: {
            content: '',
        },
    },

    reducers: {
        openModal: (state) => {
            state.modal.status = true;
        },
        closeModal: (state) => {
            state.modal.status = false;
        },

        openModalComment: (state, action) => {
            state.modalComment.status = true;
            state.modalComment.type = action.payload.type;
            state.modalComment.uid = action.payload.uid;
        },
        closeModalComment: (state) => {
            state.modalComment.status = false;
            state.modalComment.type = '';
            state.modalComment.uid = '';
        },

        openModalMobile: (state) => {
            state.modalMobile.status = true;
        },
        closeModalMobile: (state) => {
            state.modalMobile.status = false;
        },

        openSidebarCourse: (state) => {
            state.sidebarCourse.status = true;
        },
        closeSidebarCourse: (state) => {
            state.sidebarCourse.status = false;
        },

        loadingStart: (state) => {
            state.loading.status = true;
        },
        loadingSuccess: (state) => {
            state.loading.status = false;
        },

        showNotification: (state, action) => {
            state.notification.content = action.payload;
        },
        hideNotification: (state) => {
            state.notification.content = '';
        },
    },
});

export const {
    openModal,
    closeModal,
    openModalComment,
    closeModalComment,
    openSidebarCourse,
    closeSidebarCourse,
    loadingStart,
    loadingSuccess,
    showNotification,
    hideNotification,
    openModalMobile,
    closeModalMobile,
} = modunReducer.actions;

export default modunReducer.reducer;
