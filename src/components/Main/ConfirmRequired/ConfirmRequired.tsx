import React from 'react';
import style from './confirm_required.module.scss'
import {Button} from "../../Library";
import Cookies from "universal-cookie/es6";

export const ConfirmRequired = () => {
    const handleClick = async () => {
        try {
            const cookies = new Cookies()
            const result = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/${process.env.REACT_APP_API_VER}/users/repeat`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization': cookies.get('token')
                },
            })
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <div className={style.main}>
            <h1 className={style.heading}>Подтвердите эл.почту!</h1>
            <p className={style.text}>На вашу почту отправлено письмо для подтверждения.
                В случае если письмо не пришло или ссылка устарела
                Для повторной отправки нажмите на кнопку ниже.
            </p>


            <Button onClick={handleClick} className={style.button} size={'x-large'}>Отправить письмо еще раз!</Button>
        </div>
    )
}

