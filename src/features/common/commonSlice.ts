import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICommonState} from "../../types";

const initialState: ICommonState = {
    isVisible: false,
    isProfileVisible: false
}
export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setIsVisible(state, action: PayloadAction<boolean>) {
            state.isVisible = action.payload
        },
        setIsProfileVisible(state, action: PayloadAction<boolean>) {
            state.isProfileVisible = action.payload
        }
    }

})

export default commonSlice.reducer
export const {setIsVisible, setIsProfileVisible} = commonSlice.actions