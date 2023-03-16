import React from 'react';
import style from './header.module.scss'
import {Link, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setIsVisible} from "../../features/common";
import {IMenuLink} from "../../types";

export const Menu = () => {
    const dispatch = useAppDispatch()
    const isVisible = useAppSelector(state => state.common.isVisible)
    const handleClick = () => {
        if (isVisible) dispatch(setIsVisible(false))
    }
    const menuLinks: Array<IMenuLink> = [
        {name: 'Главная', path: '/'},
        {name: 'О нас', path: '/about'},
        {name: 'Сервис', path: '/services'},
        {name: 'Цены', path: '/prices'},
        {name: 'Контакты', path: '/contacts'},
    ]
    return (
        <>
            <ul className={style.header__menu}>
                {menuLinks.map((item, index) => {
                    return <li key={index}><NavLink onClick={handleClick} to={item.path!}>{item.name}</NavLink></li>
                })}
            </ul>
        </>
    );
};

