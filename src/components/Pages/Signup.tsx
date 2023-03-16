import React from 'react'
import style from "../Main/main.module.scss";
import {RegisterForm} from "../Library/RegiserForm";

export const Signup = () => {
    return (
        <div className={style.main + ' wrapper'}>
            <RegisterForm/>
        </div>
    )
}