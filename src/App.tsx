import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.scss';
import {Header, Main, Footer, FileList} from "./components";
import {Route, Routes, useLocation} from "react-router-dom";
import {About, Contacts, Prices, Services} from "./components/Pages";
import {resetCheckedFiles} from "./features/cloud";
import {useAppDispatch} from "./app/hooks";
import {authFetch} from "./features/user/userThunks";


function App() {
    const location = useLocation()
    const dispatch = useAppDispatch()
    useEffect(() => {

        dispatch(authFetch({}))
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
                <Route path={'services'} element={<Services/>}/>
                <Route path={'prices'} element={<Prices/>}/>
                <Route path={'contacts'} element={<Contacts/>}/>
            </Routes>
            <Footer/>

        </div>
    );
}

export default App;

