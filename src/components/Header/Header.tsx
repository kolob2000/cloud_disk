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
                    <li><Link to={'/'}>Главная</Link></li>
                    <li><Link to={'/about'}>О нас</Link></li>
                    <li><Link to={'/services'}>Сервис</Link></li>
                    <li><Link to={'/prices'}>Цены</Link></li>
                    <li><Link to={'/contacts'}>Контакты</Link></li>
                </ul>
                <button className={style.login__button}>Войти</button>
            </div>
        </div>
    );
};

