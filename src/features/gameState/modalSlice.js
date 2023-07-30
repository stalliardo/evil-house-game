import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        text: {
            title: "Test title",
            body: "test body"
        }
    },
    reducers: {
        toggleIsOpen: (state) => {
              state.isOpen = !state.isOpen;
        },
        setTextAndDisplay: (state, action) => {
            state.isOpen = true;
            state.text = action.payload
        }
       
    },
})

export const { toggleIsOpen, setTextAndDisplay } = modalSlice.actions

export default modalSlice.reducer;