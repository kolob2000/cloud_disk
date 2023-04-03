import React from 'react';
import main from '../Main/main.module.scss'
import style from './style/prices.module.scss'
import {Button, Slider} from "../Library";
import {Link} from "react-router-dom";

export const Prices = () => {
    return (
        <div className={main.main + ' wrapper ' + style.container}>
            <h1 className={style.heading_1}>Выберите подходящий тариф</h1>
            <p className={style.top_text}>
                CloudHit - это ваше идеальное решение для работы. Начните прямо сейчас бесплатно
            </p>
            <Slider className={style.cards}>
                <div className={style.card_item + ' ' + style.card_free}>
                    <h3 className={style.card_heading_3}>Базовый</h3>
                    <p className={style.description}>Загрузка файла до 1 ГБ</p>
                    <p className={style.price}><span>0</span> руб./мес.</p>
                    <p className={style.description}>Хранилище 2ГБ</p>
                    <Link className={style.link} to={'/signup'}>
                        <Button size={'x-large'} className={style.button}
                                borderColor={'transparent'}>Подключить</Button>
                    </Link>
                </div>
                <div className={style.card_item + ' ' + style.card_premium}>
                    <h3 className={style.card_heading_3}>Премиум</h3>
                    <p className={style.description}>Загрузка файла до 50 ГБ</p>
                    <p className={style.price}><span>475</span> руб./мес.</p>
                    <p className={style.description}>Безлимитное место для фото и видео с телефона</p>
                    <p className={style.description}>Хранилище 5ТБ</p>
                    <Link className={style.link} to={'/signup'}>
                        <Button size={'x-large'} className={style.button + ' ' + style.button_premium}
                                borderColor={'transparent'}>Подключить</Button>
                    </Link>
                </div>
                <div className={style.card_item + ' ' + style.card_basic}>
                    <h3 className={style.card_heading_3}>Оптимальный</h3>
                    <p className={style.description}>Загрузка файла до 50 ГБ</p>
                    <p className={style.price}><span>210</span> руб./мес.</p>
                    <p className={style.description}>Безлимитное место для фото и видео с телефона</p>
                    <p className={style.description}>Хранилище 500ГБ</p>
                    <Link className={style.link} to={'/signup'}>
                        <Button size={'x-large'} className={style.button}
                                borderColor={'transparent'}>Подключить</Button>
                    </Link>
                </div>
            </Slider>
        </div>
    );
}