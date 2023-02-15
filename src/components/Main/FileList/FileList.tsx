import React, {useEffect, useState} from 'react';
import {FileItem} from "./FileItem";
import {ref, listAll, uploadString, deleteObject} from "firebase/storage";
import {storage} from '../../../firebase'
import {Link, useParams} from "react-router-dom";

export const FileList = () => {
    const [folders, setFolders] = useState<any[]>([])
    const [files, setFiles] = useState<any[]>([])
    const param = useParams()
///////////////////////
    const storageRef = ref(storage, 'some-child/.some')
    const message = 'This is my message.';
    uploadString(storageRef, message).then((snapshot) => {
        console.log('Uploaded a raw string!');
    });
    deleteObject(storageRef).then(() => {
        // File deleted successfully
    }).catch((error) => {
        // Uh-oh, an error occurred!
    });
///////////////////////////////
    useEffect(() => {
        let path = ''
        if (param.path && param['*']) {
            path = param.path + '/' + param['*']
        } else if (param.path && !param['*']) {
            path = param.path
        } else path = ''
        const listRef = ref(storage, path)
        listAll(listRef)
            .then((res) => {
                setFolders(prev => [...res.prefixes])
                setFiles(prev => [...res.items])
            }).catch((error) => {
            console.log(error?.message)
        });
    }, [param])
    return (
        <div>
            {folders.map((item, index) => <FileItem key={index} type={'folder'} fullPath={item.fullPath}
                                                    name={item.name}/>)}
            {files.map((item, index) => {
                return <FileItem key={index} type={'file'} fullPath={item.fullPath} name={item.name}/>
            })}

        </div>
    );
};

