import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch} from "../../app/store";
import {Headers} from "../../types";
import Cookies from 'universal-cookie/es6'

const cookie = new Cookies()
export const fetchFiles = createAsyncThunk(
    'cloud/fetchFiles',
    async () => {
        try {
            const result = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/${process.env.REACT_APP_API_VER}/cloud`, {
                headers: {
                    'Authorization': cookie.get('token'),
                }

            })
            return {files: await result.json()}
        } catch (e) {
            console.log(e)
        }
    }
)
export const deleteFiles = createAsyncThunk<void, number[], { dispatch: AppDispatch }>
(
    'cloud/deleteFiles',
    async (arg, thunkAPI) => {
        try {
            const headers = new Headers('DELETE')
            headers.body = JSON.stringify(arg)
            headers.headers['Authorization'] = cookie.get('token')
            await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/${process.env.REACT_APP_API_VER}/cloud`, headers as RequestInit)
            thunkAPI.dispatch(fetchFiles())
        } catch (e) {
            console.log(e)
        }

    }
)

export const createFolder = createAsyncThunk<void,
    { parent_id: number | null, name: string }, { rejectValue: string, dispatch: AppDispatch }>(
    'cloud/createFolder',
    async (arg, thunkAPI) => {

        const headers = new Headers('POST')
        headers.body = JSON.stringify({parent: arg.parent_id, name: arg.name})
        headers.headers['Authorization'] = cookie.get('token')
        const response = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/${process.env.REACT_APP_API_VER}/cloud/`, headers as RequestInit)
        if (!response.ok) {
            return thunkAPI.rejectWithValue('Server error.')
        }
        thunkAPI.dispatch(fetchFiles())

    }
)

export const fileUploader = createAsyncThunk<void, FormData, { rejectValue: string, dispatch: AppDispatch }>(
    'cloud/fileUploader',
    async (files, thunkAPI) => {

        const headers = new Headers('POST', false)
        headers.headers['Authorization'] = cookie.get('token')
        headers.body = files

        const response = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/${process.env.REACT_APP_API_VER}/cloud/upload`, {
            method: 'POST',
            body: files,
            headers: {
                'Authorization': cookie.get('token'),
            }
        })
        const res = response.json()
        if (!response.status) {
            return thunkAPI.rejectWithValue('Server error.')
        }
        thunkAPI.dispatch(fetchFiles())
    }
)