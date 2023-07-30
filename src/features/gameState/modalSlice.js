import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: true,
        text: {
            title: "Test title",
            body: "test body"
        }
    },
    reducers: {
        toggleIsOpen: (state) => {
              state.isOpen = !state.isOpen;
        },
       
    },
})

export const { toggleIsOpen } = modalSlice.actions

export default modalSlice.reducer;