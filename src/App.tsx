import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {Header, Main, Footer, FileList} from "./components";
import {Route, Routes} from "react-router-dom";


function App() {
    return (
        <div className={'app'}>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Main/>}/>
                <Route path={':path/*'} element={<Main/>}/>
            </Routes>
            <Footer/>

        </div>
    );
}

export default App;
