import React, {useState} from 'react'
import style from './login_form.module.scss'
import {TextField} from '../TextField';
import {Button} from "../Button";
import {Link} from "react-router-dom";
import {Icon} from "../Icon";
import {ILoginForm, ILoginFormProps} from "../../../types";
import {useAppDispatch} from "../../../app/hooks";
import {loginFetch} from "../../../features/user/userThunks";


export const LoginForm: React.FC<ILoginFormProps> = (props) => {
    const dispatch = useAppDispatch()
    const classes: (string | undefined)[] = [style.login_form]
    const [form, setForm] = useState<ILoginForm>({email: '', password: ''})

    const handleLogin = () => {
        dispatch(loginFetch(form))
    }

    return (
        <div
            onClick={e => e.stopPropagation()}
            ref={props.formRef}
            className={classes.concat(props.className?.split(' ')).join(' ')}>
            <Icon width={44} fill={'var(--logo_login_fill)'} icon={'brand-logo'}/>
            <TextField
                isFocus={true}
                className={style.input_field}
                size={'large'} value={form.email}
                placeholder={'Электронная почта'}
                setValue={(email: string) => setForm(prev => ({...prev, email}))}/>
            <TextField
                className={style.input_field}
                typeField={'password'}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handleLogin()
                    }
                }}
                size={'large'} value={form.password}
                placeholder={'Пароль'}
                setValue={(password: string) => setForm(prev => ({...prev, password}))}/>
            <Button
                onClick={handleLogin}
                borderColor={'transparent'}
                className={style.login_button}
                size={'large'}>Войти
            </Button>
            <div className={style.links} style={{display: 'flex', justifyContent: 'space-between'}}>
                <Link to={'/forget'}>Забыли пароль?</Link>
                <Link to={'/signup'}>Регистрация</Link>
            </div>
        </div>
    )
}

