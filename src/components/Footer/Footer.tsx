import React from 'react';
import style from './footer.module.scss'

export const Footer = () => {
    return (
        <div className={style.footer}>
            <div className={style.footer__wrapper + ' wrapper'}>
                <span>© Copyright Ⓒ Sheild. All Rights Reserved.</span>
                <span>Privacy Policy | Tearms Condition</span>
            </div>

        </div>
    );
};

