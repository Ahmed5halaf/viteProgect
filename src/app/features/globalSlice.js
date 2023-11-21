import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpenCartDrawer: false,
    onOpenCartDrawer: false,
    isCloseCartDrawer: false,
}
const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        
        onOpenCartDrawerAction: (state) => {
            state.onOpenCartDrawer = true
            state.isOpenCartDrawer = true
        },
        isCloseCartDrawerAction: (state) => {
            state.isCloseCartDrawer = false
            state.isOpenCartDrawer = false
        },
    }
})

export const { isOpenCartDrawer, onOpenCartDrawerAction, isCloseCartDrawerAction } = globalSlice.actions
export const selectGlobal = ({ global }) => global
export default globalSlice.reducer