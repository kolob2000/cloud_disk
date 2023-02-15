import React, {useEffect, useState} from 'react';
import style from './main.module.scss'
import {FileList} from "./FileList";
import {Dashboard} from "./Dashboard";
import {useParams} from "react-router-dom";


export const Main = () => {
    return (
        <div className={style.main + ' wrapper'}>
            <Dashboard/>
            <FileList/>
        </div>
    );
};

