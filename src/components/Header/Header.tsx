import React from 'react';
import style from './header.module.scss'
import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <div className={style.header + ' wrapper'}>
            <div className={style.header__left}>
                <Link to={'/'}><img src="/img/logo.svg" alt=""/></Link>

            </div>
            <div className={style.header__right}>
                <ul className={style.header__menu}>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About us</a></li>
                    <li><a href="#">Service</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
                <button className={style.login__button}>Login</button>
            </div>
        </div>
    );
};

