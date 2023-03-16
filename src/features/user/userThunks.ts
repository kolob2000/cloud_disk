import {createAsyncThunk} from "@reduxjs/toolkit";
import {ILoginForm, IUserState} from "../../types";
import {AppDispatch} from "../../app/store";
import Cookies from "universal-cookie/es6";
import {fetchFiles} from "../cloud/cloudThunks";
import {logout} from "./userSlice";
import {setIsProfileVisible} from "../common";

const cookies = new Cookies()

export const loginFetch = createAsyncThunk<IUserState, ILoginForm, {
    rejectValue: string,
    dispatch: AppDispatch
}>(
    'user/loginFetch',
    async (form, thunkAPI) => {
        const response = await fetch('http://192.168.0.193:3002/api/users/signin',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "same-origin",
                body: JSON.stringify(form)

            }
        )
        if (!response.ok) {
            return thunkAPI.rejectWithValue('Server error.')
        }
        const result = await response.json()
        cookies.set('token', result.token)
        thunkAPI.dispatch(setIsProfileVisible(false))
        thunkAPI.dispatch(fetchFiles())
        return (({is_active, disk_quota, token, ...rest}) => ({
            isActive: is_active,
            diskQuota: disk_quota, ...rest
        }))(result)
    })

export const authFetch = createAsyncThunk<IUserState, {}, { dispatch: AppDispatch, rejectValue: string }>(
    'user/authFetch',
    async (_, thunkAPI) => {
        const response = await fetch('http://192.168.0.193:3002/api/users/auth', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': cookies.get('token')
            }
        })
        if (!response.ok) {
            thunkAPI.dispatch(logout())
            return thunkAPI.rejectWithValue('Server error.')
        }
        const result = await response.json()
        return (({is_active, disk_quota, token, ...rest}) => ({
            isActive: is_active,
            diskQuota: disk_quota, ...rest
        }))(result)
    }
)