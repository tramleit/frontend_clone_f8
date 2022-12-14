import { createSlice } from '@reduxjs/toolkit';

const modunSlice = createSlice({
    name: 'modun',
    initialState: {
        modal: {
            status: false,
        },
    },
    reducers: {
        openModal: (state) => {
            state.modal.status = true;
        },
        closeModal: (state) => {
            state.modal.status = false;
        },
    },
});

export const { openModal, closeModal } = modunSlice.actions;

export default modunSlice.reducer;
