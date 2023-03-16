import React from 'react';
import style from './footer.module.scss'

export const Footer = () => {
    return (
        <div className={style.footer}>
            <div className={style.footer__wrapper + ' wrapper'}>
                <span>Ⓒ CloudHit, 2023.| Создано Kollabiz.</span>
                <span>Лицензия. | Соглашение.</span>
            </div>

        </div>
    );
};

