import React from 'react'
import style from "../Main/main.module.scss";
import {useLocation} from "react-router-dom";

export const Verify = () => {

    const {search} = useLocation()
    const params = new URLSearchParams(search)
    const token = params.get('token')
    fetch('http://192.168.0.193:3002/api/users/verify', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "same-origin",
        body: JSON.stringify({token})
    }).then(r => console.log('Its ok'))
        .catch(e => console.log(e))
    return (
        <div className={style.main + ' wrapper'}>
            <h1>verify email</h1>
        </div>
    )
}