import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch} from "../../app/store";
import {Headers} from "../../types";


export const fetchFiles = createAsyncThunk(
    'cloud/fetchFiles',
    async (userId: number) => {
        try {
            const result = await fetch('http://192.168.0.195:3002/api/cloud')
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
            if (arg.length > 1) {
                console.log('many')
            } else {
                const headers = new Headers('DELETE')
                await fetch(`http://192.168.0.195:3002/api/cloud/${arg[0]}`, headers as RequestInit)
                thunkAPI.dispatch(fetchFiles(1))
            }

        } catch (e) {
            console.log(e)
        }

    }
)

export const createFolder = createAsyncThunk<void,
    { parent_id: number | null, name: string }, { dispatch: AppDispatch }>(
    'cloud/createFolder',
    async (arg, thunkAPI) => {
        try {
            const headers = new Headers('POST')
            headers.body = JSON.stringify({parent: arg.parent_id, name: arg.name})
            await fetch(`http://192.168.0.195:3002/api/cloud/`, headers as RequestInit)
            thunkAPI.dispatch(fetchFiles(1))
        } catch (e) {
            console.log(e)
        }
    }
)