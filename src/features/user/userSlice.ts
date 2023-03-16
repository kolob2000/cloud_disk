import {createSlice} from "@reduxjs/toolkit";
import {IUserState} from "../../types";
import {authFetch, loginFetch} from "./userThunks";
import Cookies from "universal-cookie/es6";

const cookies = new Cookies()
const initialState: IUserState = {
    id: -1,
    uuid: '',
    email: '',
    firstName: '',
    lastName: '',
    diskQuota: 0,
    isActive: false,
    is_auth: false


}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            cookies.set('token', undefined)
            return initialState
        }
    },
    extraReducers: builder => {
        builder.addCase(loginFetch.fulfilled, (state, action) => {
            return {...action.payload, is_auth: true}
        })
        builder.addCase(authFetch.fulfilled, (state, action) => {
            return {...action.payload, is_auth: true}
        })
        builder.addCase(authFetch.rejected, (state, action) => {
            console.log('Unauthorized')
        })

    }

})
export const {logout} = userSlice.actions
export default userSlice.reducer
