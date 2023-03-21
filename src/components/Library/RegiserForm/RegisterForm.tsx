import React, {useEffect, useState} from 'react'
import style from './register.module.scss'
import {TextField} from "../TextField";
import {Icon} from "../Icon";
import {Button} from "../Button";
import {useAppDispatch} from "../../../app/hooks";
import {loginFetch} from "../../../features/user/userThunks";
import {useNavigate} from "react-router-dom";

export const RegisterForm = () => {
    const regMail = /(\w+\.?|-?\w+?)+@\w+\.?-?\w+?(\.\w{2,3})+/
    const regPass = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$/
    const [error, setError] = useState<string | false>(false)
    const [form, setForm] = useState({email: '', password: '', passwordRepeat: ''})
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleClick = async () => {
        try {
            if (form.password === form.passwordRepeat) {
                if (!regMail.test(form.email)) {
                    setError('Некорректная почта.')
                } else if (!regPass.test(form.password)) {
                    setError('Некорректный пароль.')
                } else {
                    const response = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/${process.env.REACT_APP_API_VER}/users/signup`, {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: "same-origin",
                        body: JSON.stringify({
                            email: form.email,
                            password: form.password
                        })
                    })
                    if (!response.ok) {
                        setError((await response.json()).message)
                    } else {
                        dispatch(loginFetch({...form}))
                        navigate('/', {replace: true})
                    }

                }
            } else {
                setError('Пароли не совпадают.')
            }

        } catch (e) {

        }

    }
    useEffect(() => {
        setError(false)

    }, [form])
    return (
        <div className={style.registration}>
            <div className={style.form}>
                <div className={style.logo}><Icon fill={'var(--header_logo)'} icon={'regular-key'}/></div>
                <div className={style.label}>
                    {
                        error && <div>
                            <span></span> {error}
                        </div>
                    }
                </div>
                <TextField typeField={'email'} size={'large'}
                           placeholder={'Электронная почта'}
                           value={form.email} setValue={value => {
                    setForm(state => ({...state, email: value}))
                }}/>
                <TextField typeField={'password'} size={'large'} placeholder={'Пароль'}
                           value={form.password} setValue={value => {
                    setForm(state => ({...state, password: value}))
                }}/>
                <TextField typeField={'password'} size={'large'} placeholder={'Повторите пароль'}
                           value={form.passwordRepeat} setValue={value => {
                    setForm(state => ({...state, passwordRepeat: value}))
                }}/>
                <Button
                    onClick={handleClick}
                    borderColor={'transparent'}
                    className={style.registration_button}
                    size={'large'}>Зарегистрироваться</Button>

            </div>

        </div>
    )
}

