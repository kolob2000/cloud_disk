import {configureStore} from "@reduxjs/toolkit"
import cloudReducer from '../features/cloud/cloudSlice'
import userReducer from '../features/user/userSlice'
import commonReducer from '../features/common/commonSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        cloud: cloudReducer,
        common: commonReducer
    }
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store