import React from 'react';
import style from "./fileItem.module.scss";
import {Link} from "react-router-dom";
import {Icon} from "../../Library";
import {useAppSelector} from "../../../app/hooks";

const Back: React.FC = () => {
    const prevParentPath = useAppSelector(state => state.cloud.prevParent)
    return (
        <div className={style.file__item + " " + style.back}>
            <Link to={`${prevParentPath}`} className={style.file}>
                <Icon icon={'arrow-turn-down-left'}/>
                <span className={style['back-dots']}>.&nbsp;.</span>
            </Link>
        </div>
    );
}

export default Back;