import React from 'react';
import {Link} from "react-router-dom";
import {IFile} from "../../../types";
import style from './fileItem.module.scss'
import {Icon} from "../../Library";
import {useAppDispatch} from "../../../app/hooks";
import {checkFiles} from "../../../features/cloud";
import Cookies from "universal-cookie/es6";


export const FileItem: React.FC<IFile> = (props) => {
    const cookies = new Cookies()
    const dispatch = useAppDispatch()
    const handleChange: (id: number) => void = (id: number) => {
        dispatch(checkFiles({id}))
    }
    const handleDownload = async (id: number, fileName: string) => {
        try {
            const response = await fetch(`http://192.168.0.193:3002/api/cloud/${id}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': cookies.get('token')
                    }
                }
            )
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = fileName
            link.click()
            link.remove()
        } catch (e) {
            console.log(e)
        }
    }
    return props.file_entity.toLowerCase() === 'folder' ?
        <div className={style.file_item}>
            <div className={style.checkbox}>
                <input id={`${props.uuid}`} type="checkbox"
                       onChange={() => handleChange(props.id)}
                />
                <label htmlFor={`${props.uuid}`}></label>
            </div>
            <Link to={`/${props.file_path}`} className={style.file}>
                <div className={style.icon}>
                    <Icon icon={'folder'}/>
                </div>
                <span className={style.file_name}>{props.file_name}</span>

            </Link>
        </div>
        : <div className={style.file_item}>
            <div className={style.checkbox}>
                <input id={`${props.uuid}`} type="checkbox"
                       onChange={() => handleChange(props.id)}
                />
                <label htmlFor={`${props.uuid}`}></label>
            </div>
            <button
                onClick={() => handleDownload(props.id, props.file_name)}
                className={style.file}
            >
                <div className={style.icon}>
                    <Icon icon={'file-lines'}/>
                </div>
                <span className={style.file_name}>{props.file_name}</span>

            </button>
        </div>

};


