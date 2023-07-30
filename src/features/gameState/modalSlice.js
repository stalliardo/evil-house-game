import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        text: {
            title: "Test title",
            body: "test body"
        },
        options: {
            confirmButtonText: "",
            cancelButtonText: ""
        },
        confirmCallback: "",
        cancelCallback: "",
    },
    reducers: {
        toggleIsOpen: (state) => {
              state.isOpen = !state.isOpen;
        },
        setTextAndDisplay: (state, action) => {
            state.isOpen = true;
            state.text = action.payload
        },
        loadModal: (state, action) => {
            state.isOpen = true;
            state.text = action.payload.text;
            state.options.confirmButtonText = action.payload.confirmButtonText;
            state.options.cancelButtonText = action.payload.cancelButtonText;
            state.callbackAction = action.payload.callbackAction;
        },
        closeModal: (state) => {
            console.log("close modal called");
            state.isOpen = false;
        }
    },
})

export const { toggleIsOpen, setTextAndDisplay, loadModal, closeModal } = modalSlice.actions

export default modalSlice.reducer;