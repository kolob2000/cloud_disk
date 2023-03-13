import {AppDispatch} from "../../app/store";
import {logout} from "./userSlice";
import {setIsProfileVisible} from "../common";

export const signupThunk = () => (dispatch: AppDispatch) => {
    dispatch(logout())
    dispatch(setIsProfileVisible(false))
}