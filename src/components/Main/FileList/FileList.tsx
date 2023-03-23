import React, {useCallback, useEffect, useState} from 'react';
import {FileItem} from "./FileItem";
import {useLocation, Location} from "react-router-dom";
import {IFile} from "../../../types";
import {fetchFiles} from "../../../features/cloud/cloudThunks";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import Back from "./Back";
import {setParent} from "../../../features/cloud";
import style from './fileItem.module.scss'
import {Loader} from "../../Library";

export const FileList = () => {
    const uuid = useAppSelector(state => state.user.uuid)
    const parentId: number | null = useAppSelector(state => state.cloud.parent)
    const filesTree: Array<IFile> = useAppSelector(state => state.cloud.files)
    const location: Location = useLocation()
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => state.cloud.loading)
    const [reopen, setReopen] = useState(false)


    useEffect(() => {
        const eventSource = new EventSource(`${process.env.REACT_APP_PROTOCOL}://` +
            `${process.env.REACT_APP_DOMAIN}/${process.env.REACT_APP_API_VER}/realtime/files`,
            {withCredentials: true})

        eventSource.onmessage = event => {
            if (JSON.parse(event.data) === uuid) {
                dispatch(fetchFiles())
            }
        }
        eventSource.onerror = event => {
            eventSource.close()
            setReopen(state => !state)
        }
        return () => eventSource.close()

    }, [uuid, reopen])
    useEffect(() => {
        if (location.pathname === '/') {
            dispatch(setParent({id: null}))
        } else {
            const item = filesTree.find(i => (i.file_path ? '/' + i.file_path : '/') === location.pathname)
            if (item?.id !== undefined) {
                dispatch(setParent({id: item.id}))
            }
        }
    })
    useEffect(() => {
        dispatch(fetchFiles())
    }, [dispatch])


    return (
        <div className={style.file_list}>
            {isLoading && <div className={style.loader}><Loader/></div>}
            {parentId ?
                <Back/>
                : ''}
            {filesTree?.filter(item => item.parent_id === parentId)
                .map((item, index) => <FileItem
                    key={item.uuid}
                    {...item}
                />)}
        </div>
    );
};

