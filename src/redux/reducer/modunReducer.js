import { createSlice } from '@reduxjs/toolkit';

const modunReducer = createSlice({
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

export const { openModal, closeModal } = modunReducer.actions;

export default modunReducer.reducer;
