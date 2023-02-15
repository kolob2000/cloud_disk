import React, {useEffect, useState} from 'react';
import {Link, redirect} from "react-router-dom";
import {IFile} from "../../../types/data";
import {storage} from "../../../firebase";
import {ref, getDownloadURL,} from "firebase/storage";
import style from './fileItem.module.scss'
import {log} from "util";


export const FileItem: React.FC<IFile> = (props) => {
    const [url, setUrl] = useState<string>('')
    const starsRef = ref(storage, `${props.fullPath}`);
    useEffect(() => {
        props.type === 'file' && getDownloadURL(starsRef)
            .then(url => {
                setUrl(url)
            })
            .catch(error => console.log(error?.message))
    })
    return props.type === 'folder' ? <div className={style.file__item}>
            <input type="checkbox" id={`${props.fullPath}`}/>
            <label htmlFor={`${props.fullPath}`}></label>
            <Link to={`/${props.fullPath}`} className={style.file}>
                <svg width="24" height="18" viewBox="0 0 24 18" fill="" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M21.75 3H12.75L10.1892 0.439219C9.90797 0.157969 9.52641 0 9.12844 0H2.25C1.00734 0 0 1.00734 0 2.25V15.75C0 16.9927 1.00734 18 2.25 18H21.75C22.9927 18 24 16.9927 24 15.75V5.25C24 4.00734 22.9927 3 21.75 3ZM21.75 15.75H2.25V2.25H8.81812L11.3789 4.81078C11.6602 5.09203 12.0417 5.25 12.4397 5.25H21.75V15.75Z"
                        fill=""/>
                </svg>
                <span>{props.name}</span>
            </Link>
        </div>
        : <div className={style.file__item}>
            <input type="checkbox" id={`${url}`}/>
            <label htmlFor={`${url}`}></label>
            <a href={`${url}`}
               className={style.file}
               target={"_blank"}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18 11.625V12.9375C18 13.2469 17.6625 13.5 17.25 13.5H6.75C6.3375 13.5 6 13.2469 6 12.9375V11.625C6 11.3156 6.3375 11.0625 6.75 11.0625H17.25C17.6625 11.0625 18 11.3156 18 11.625ZM17.25 15H6.75C6.3375 15 6 15.2531 6 15.5625V16.875C6 17.1844 6.3375 17.4375 6.75 17.4375H17.25C17.6625 17.4375 18 17.1844 18 16.875V15.5625C18 15.2531 17.6625 15 17.25 15ZM24 6.18281V21.75C24 22.9922 22.6562 24 21 24H3C1.34375 24 0 22.9922 0 21.75V2.25C0 1.00781 1.34375 0 3 0H15.7563C16.55 0 17.3125 0.239063 17.875 0.660938L23.1187 4.59375C23.6812 5.01094 24 5.5875 24 6.18281ZM16 2.43281V6H20.7563L16 2.43281ZM21 21.75V8.25H14.5C13.6687 8.25 13 7.74844 13 7.125V2.25H3V21.75H21Z"
                        fill=""/>
                </svg>
                <span>{props.name}</span>
            </a>
        </div>

};

