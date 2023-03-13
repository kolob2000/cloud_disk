import React, {useState, useEffect} from 'react';
import style from './dashboard.module.scss'
import {Icon, UploaderForm} from "../../Library";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {createFolder, deleteFiles} from "../../../features/cloud/cloudThunks";
import {Button, TextField} from "../../Library";

export const Dashboard: React.FC = () => {
    const [value, setValue] = useState('')
    const [visible, setVisible] = useState<boolean>(false)
    const [uploadVisible, setUploadVisible] = useState<boolean>(false)
    const checkedFiles = useAppSelector(state => state.cloud.checkedItems)
    const parent = useAppSelector(state => state.cloud.parent)
    const dispatch = useAppDispatch()
    const handleDelete = () => {
        if (checkedFiles.length) {
            dispatch(deleteFiles(checkedFiles))
        }
    }
    const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
        if (e.key === 'Enter') {
            if (value.length > 0) {
                dispatch(createFolder({parent_id: parent, name: value}))
                setValue('')
                setVisible(false)
            } else {
                setVisible(false)
            }

        } else if (e.key === 'Escape') {
            setValue('')
            setVisible(false)
        }

    }
    const handleCreateFolderClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (value.length > 0) {
            dispatch(createFolder({parent_id: parent, name: value}))
            setValue('')
            setVisible(false)
        }
    }
    const handleBlurOnInput: React.FocusEventHandler<HTMLInputElement> = () => {
        setTimeout(() => {
            setValue('')
            setVisible(false)
        }, 300)
    }
    useEffect(() => {
        const deleteFunction = (e: KeyboardEvent) => {
            if (e.key === 'Delete') {
                handleDelete()
            }
        }
        document.addEventListener('keydown', deleteFunction)
        return () => document.removeEventListener('keydown', deleteFunction)
    })
    return <div className={style.dashboard}>
        <button onClick={handleDelete} className={style.trash__button}>
            <Icon icon={'trash'}/>
        </button>
        <button className={style.addFolder__button}
                onClick={() => {
                    setVisible(prev => !prev)
                }}
        >
            <Icon icon={'folder-plus'}/>

        </button>
        {visible ?
            <div className={style["file-name-form"]}>
                <TextField
                    className={style['file-name-input']}
                    value={value}
                    setValue={setValue}
                    onKeyDown={handleOnKeyDown}
                    onBlur={handleBlurOnInput}
                    placeholder={'Название'}
                    size={'large'}
                    isFocus={true}
                />
                <Button
                    onClick={handleCreateFolderClick}
                    size={'large'}
                    className={style['file-name-button']}>
                    &#10003;
                </Button>
            </div>
            : ''}
        <button onClick={() => setUploadVisible(true)} className={style.upload__button}>
            <Icon icon={'upload-file'}/>
        </button>
        <UploaderForm isVisible={uploadVisible} setVisible={setUploadVisible}/>
    </div>
}

