import {createSlice} from "@reduxjs/toolkit";
import {createFolder, deleteFiles, fetchFiles, fileUploader} from "./cloudThunks";
import {ICloudState} from "../../types";
import {PayloadAction} from "@reduxjs/toolkit";

const initialState: ICloudState = {
    files: [],
    parent: null,
    prevParent: null,
    checkedItems: [],
    loading: true,
    error: null
}
export const cloudSlice = createSlice({
    name: 'cloud',
    initialState,
    reducers: {
        setParent(state, action: PayloadAction<{ id: number | null }>) {
            const currentParent = state.files?.find(item => item.id === action.payload.id)
            if (currentParent !== undefined) {
                const prevParent = state.files.find(item => item.id === currentParent.parent_id)
                if (prevParent) {
                    state.prevParent = '/' + prevParent.file_path
                } else {
                    state.prevParent = '/'
                }
            }

            state.parent = action.payload.id
        },
        checkFiles(state, action: PayloadAction<{ id: number }>) {
            const id = action.payload.id
            if (state.checkedItems.includes(id)) {
                state.checkedItems = state.checkedItems.filter(item => item !== id)
            } else state.checkedItems.push(id)
        },
        resetCheckedFiles(state) {
            state.checkedItems = []
        },
        removeFile(state, action: PayloadAction<{ id: number }>) {

        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchFiles.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchFiles.fulfilled, (state, action) => {
            state.loading = false
            state.files = action.payload?.files
        })
        builder.addCase(fetchFiles.rejected, (state) => {
        })
        builder.addCase(deleteFiles.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteFiles.fulfilled, (state, action) => {
            state.loading = false
            state.checkedItems = []
        })
        builder.addCase(createFolder.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createFolder.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(fileUploader.fulfilled, (state) => {
            state.loading = false
        })
    },
})

export const {setParent, checkFiles, resetCheckedFiles} = cloudSlice.actions
export default cloudSlice.reducer