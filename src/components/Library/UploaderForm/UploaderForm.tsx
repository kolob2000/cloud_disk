import React from 'react';
import style from './upload_form2.module.scss'
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fileUploader} from "../../../features/cloud/cloudThunks";
import {IUploadFormProps} from "../../../types";

export const  UploaderForm: React.FC<IUploadFormProps> = (props) => {
    const parent = useAppSelector(state => state.cloud.parent)
    const dispatch = useAppDispatch()
    const uploadFiles = (files: FileList | null) => {
        const data = new FormData();
        if (files) {
            for (const i in Array.from(files)) {
                data.append(`file_${i}`, files[i], files[i].name)
            }
            data.append('parent', JSON.stringify(parent))
            dispatch(fileUploader(data))
        }
        props.setVisible(false)

    }
    const handleDrop: React.DragEventHandler<HTMLDivElement> = e => {
        e.stopPropagation()
        e.preventDefault()
        uploadFiles(e.dataTransfer.files)

    }
    const handleInput: React.ChangeEventHandler<HTMLInputElement> = e => {
        uploadFiles(e.target.files)
    }
    return (
        <>
            {props.isVisible && <div className={style.upload_form}
                                     onClick={e => props.setVisible(false)}
                                     onDragEnter={e => {
                                         e.stopPropagation()
                                         e.preventDefault()
                                     }}
                                     onDragOver={e => {
                                         e.stopPropagation()
                                         e.preventDefault()
                                     }}
                                     onDrop={handleDrop}>
                <label className={style.file_input_label}
                       onClick={e => e.stopPropagation()}
                       htmlFor="file_input">Загрузить файлы</label>
                <input
                    onClick={e => e.stopPropagation()}
                    multiple={true}
                    onChange={handleInput} id={"file_input"}
                    className={style.file_input} type="file"/>
            </div>}
        </>
    )
}

