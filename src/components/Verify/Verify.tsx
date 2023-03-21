import React, {useEffect, useState} from 'react'
import style from './verify.module.scss'
import {useLocation, useNavigate} from "react-router-dom"
import {Loader} from "../Library"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {setIsProfileVisible} from "../../features/common";
import {SuccessVerify} from "./SuccessVerify";
import {authFetch} from "../../features/user/userThunks";

export const Verify = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isAuth = useAppSelector(state => state.user.is_auth)
    const [resultNode, setResultNode] = useState<React.FC>(() => <></>)
    const [loading, setLoading] = useState(true)
    const {search} = useLocation()
    const params = new URLSearchParams(search)
    const token = params.get('token')
    useEffect(() => {
        if (!token) navigate('/')
    }, [token])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/${process.env.REACT_APP_API_VER}/users/verify`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "same-origin",
            body: JSON.stringify({token})
        }).then(r => {
            return r.json()
        })
            .then(d => {
                switch (d) {
                    case 'invalid token':
                        setLoading(false)
                        setResultNode(() => <>
                            <h1 className={style.heading + ' ' + style.error
                            }>Пользователя не существует.<br/>
                                Или почта уже подтверждена.</h1></>)
                        break
                    case 'link expired':
                        setLoading(false)
                        setResultNode(() => <>
                            <h1 className={style.heading + " " + style.warning
                            }>Ссылка не действительна.<br/>
                                Мы отправили вам на почту новую ссылку.</h1>
                        </>)
                        break
                    case 'Success':
                        dispatch(authFetch())
                        if (isAuth) {
                            setLoading(false)
                            navigate('/')
                        } else {
                            setLoading(false)
                            dispatch(setIsProfileVisible(true))
                            setResultNode(SuccessVerify)
                        }
                        break
                    case 'Server error':
                        setLoading(false)
                        setResultNode(() => <>
                            <h1 className={style.heading + ' ' + style.error
                            }>Неизвестная ошибка.<br/>
                                Повторите попытку позже.</h1></>)
                        break
                }


            })
            .catch(e => console.log(e))
    }, [])
    return (
        <div className={'wrapper ' + style.verify}>
            {loading ? <Loader/> : <>{resultNode}</>}

        </div>
    )
}
