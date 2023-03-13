import React from 'react';
import style from './profile_popup.module.scss'
import {IProfilePopupProps} from "../../../types";
import {Button} from "../Button";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {signupThunk} from "../../../features/user/middleware";

export const ProfilePopup: React.FC<IProfilePopupProps> = (props) => {
    const classes: (string | undefined)[] = [style.profile_popup]
    const email = useAppSelector(state => state.user.email)
    const dispatch = useAppDispatch()
    return (
        <div
            onClick={e => e.stopPropagation()}
            className={classes.concat(props.className?.split(' ')).join(' ')}>
            <h3>Здравствуйте {email}!</h3>
            <Button className={style.logout_button}
                    borderColor={'transparent'}
                    size={'large'} onClick={() => dispatch(signupThunk())}>Выйти</Button>
        </div>
    );
};

