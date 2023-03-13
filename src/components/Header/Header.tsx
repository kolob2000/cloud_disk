import React, {useRef} from 'react';
import style from './header.module.scss'
import {Link} from "react-router-dom";
import {Menu} from "./Menu";
import {Icon, MobileNav, ProfilePopup} from "../Library";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setIsProfileVisible, setIsVisible} from "../../features/common";
import {LoginForm} from "../Library/LoginForm";

export const Header = () => {
    const isVisible = useAppSelector(state => state.common.isVisible)
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.user.is_auth)
    const setVisible = (flag: boolean) => {
        dispatch(setIsVisible(flag))
    }
    const isProfileVisible = useAppSelector(state => state.common.isProfileVisible)
    const loginFormRef = useRef(null)


    return (
        <div

            className={style.header + ' wrapper'}>
            <div className={style.mobile__nav}>
                <MobileNav isVisible={isVisible} setVisible={setVisible}>
                    <Menu/>
                </MobileNav>
            </div>
            <div className={style.header__logo}>
                <Link to={'/'}><Icon fill={'var(--header_logo)'} hover={'var(--header_logo_cover)'}
                                     icon={'brand-logo'}/></Link>

            </div>
            <div className={style.desktop__nav}>
                <Menu/>
            </div>
            <div className={style.header__right}>
                <button onClick={() => dispatch(setIsProfileVisible(!isProfileVisible))}>
                    <Icon fill={'var(--header_logo)'} hover={'var(--header_logo_cover)'}
                          icon={!isAuth ? 'logout' : 'user-circle'}/>
                </button>
            </div>
            {isProfileVisible &&
                <>
                    <div className={style.login_form}>
                        {isAuth ? <ProfilePopup/>
                            : <LoginForm formRef={loginFormRef}/>}
                    </div>
                    <div onClick={() => dispatch(setIsProfileVisible(false))} className={style.login_background}>

                    </div>
                </>

            }

        </div>
    );
};

