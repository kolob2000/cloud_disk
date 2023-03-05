import React from 'react';
import {Link} from "react-router-dom";
import {IFile} from "../../../types";
import style from './fileItem.module.scss'
import {Icon} from "../../Icon";
import {useAppDispatch} from "../../../app/hooks";
import {checkFiles} from "../../../features/cloud";


export const FileItem: React.FC<IFile> = (props) => {
    const dispatch = useAppDispatch()
    const handleChange: (id: number) => void = (id: number) => {
        dispatch(checkFiles({id}))
    }
    return props.file_entity.toLowerCase() === 'folder' ?
        <div className={style.file__item}>
            <input type="checkbox" id={`${props.uuid}`}
                   onChange={() => handleChange(props.id)}
            />
            <label htmlFor={`${props.uuid}`}></label>
            <Link to={`/${props.file_path}`} className={style.file}>
                <Icon icon={'folder'}/>
                <span>{props.file_name}</span>
            </Link>
        </div>
        : <div className={style.file__item}>
            <input type="checkbox" id={`${props.uuid}`}/>
            <label htmlFor={`${props.uuid}`}></label>
            <a href={'#'}
               rel="noreferrer"
               className={style.file}
               target={"_blank"}>
                <Icon icon={'file-lines'}/>
                <span>{props.file_name}</span>
            </a>
        </div>

};

