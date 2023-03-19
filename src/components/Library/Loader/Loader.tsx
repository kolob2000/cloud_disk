import React from 'react'
import style from './loader.module.scss'

export const Loader = () => {
    return (

            <div className={style.container}>
                <div className={style.first}></div>
                <div className={style.second}></div>
                <div className={style.third}></div>
                <div className={style.forth}></div>
            </div>

    )
}

