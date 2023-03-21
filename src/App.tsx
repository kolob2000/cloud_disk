import React, {useEffect} from 'react';
import './App.scss';
import {Header, Main, Footer, Signup, Verify} from "./components";
import {Route, Routes, useLocation} from "react-router-dom";
import {About, Contacts, Prices, Services} from "./components";
import {resetCheckedFiles} from "./features/cloud";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {authFetch} from "./features/user/userThunks";


function App() {
    const location = useLocation()
    // const str = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/${process.env.REACT_APP_API_VER}`
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.user.is_auth)
    useEffect(() => {

        dispatch(authFetch())
    }, [])
    useEffect(() => {
        dispatch(resetCheckedFiles())
    }, [location.pathname])

    return (
        <div className={'app'}>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Main/>}/>
                <Route path={':path/*'} element={<Main/>}/>
                <Route path={'about'} element={<About/>}/>
                <Route path={'about/:params'} element={<About/>}/>
                <Route path={'services'} element={<Services/>}/>
                <Route path={'prices'} element={<Prices/>}/>
                <Route path={'contacts'} element={<Contacts/>}/>
                {!isAuth && <Route path={'signup'} element={<Signup/>}/>}
                {!isAuth && <Route path={'auth/verify'} element={<Verify/>}/>}
            </Routes>
            <Footer/>

        </div>
    );
}

export default App;

