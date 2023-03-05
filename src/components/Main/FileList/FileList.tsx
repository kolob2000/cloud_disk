import React, { useEffect} from 'react';
import {FileItem} from "./FileItem";
import {useLocation, Location} from "react-router-dom";
import {IFile} from "../../../types";
import {fetchFiles} from "../../../features/cloud/cloudThunks";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import Back from "./Back";
import {setParent} from "../../../features/cloud";

export const FileList = () => {
    const parentId: number | null = useAppSelector(state => state.cloud.parent)
    const filesTree: Array<IFile> = useAppSelector(state => state.cloud.files)
    const location: Location = useLocation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (location.pathname === '/') {
            dispatch(setParent({id: null}))
        } else {
            const item = filesTree.find(i => (i.file_path ? '/' + i.file_path : '/') === location.pathname)
            if (item?.id !== undefined) {
                dispatch(setParent({id: item.id}))
            }
        }
    },)
    useEffect(() => {
        dispatch(fetchFiles(1))
    }, [dispatch])


    return (
        <div>
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

