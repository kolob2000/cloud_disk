import React from "react";
import {type} from "os";

export interface IFile {
    id: number,
    uuid: string,
    file_name: string,
    file_entity: string,
    file_type?: string | null,
    is_public?: boolean,
    file_path: string,
    size: number | null,
    parent_id: number | null,
    user_id?: number,

}

export interface ICloudState {
    files: Array<IFile>,
    parent: number | null,
    prevParent: string | null,
    checkedItems: Array<number>,
    loading: boolean,
    error: string | null
}

export interface IUser {
    id: number,
    uuid: string,
    email: string,
    token: string,
    disk_quota: number
}

export interface IIconProps {
    icon: string
}

export type idxArray = Array<number>

export interface IItemIdx {
    idx: idxArray
}

export interface IHeaders {
    method: string // *GET, POST, PUT, DELETE, etc.
    mode?: string // no-cors, *cors, same-origin
    cache?: string // *default, no-cache, reload, force-cache, only-if-cachedcredentials = 'same-origin' // include, *same-origin, omit
    credentials?: string // include, *same-origin, omit
    headers?: {
        'Content-Type': string
        // 'Content-Type': 'application/x-www-form-urlencoded',
    }
    redirect?: string // manual, *follow, error
    referrerPolicy?: string // no-referrer, *no-referrer-when-downgrade,
    // origin, origin-when-cross-origin, same-origin,
    // strict-origin, strict-origin-when-cross-origin, unsafe-url
    body?: string
}

export class Headers implements IHeaders {
    method: string
    mode = 'cors'
    cache = 'no-cache'
    credentials = 'same-origin'
    headers = {
        'Content-Type': 'application/json'
    }
    redirect = 'follow'
    referrerPolicy = 'no-referrer'
    body = ''

    constructor(method: string) {
        this.method = method

    }
}

export interface ITextProps {

    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    placeholder?: string
    size?: 'large' | 'small' | 'default'
    borderSize?: 'none' | number
    borderStyle?: 'solid' | 'dash'
    borderColor?: string
    color?: string
    className?: string
    isVisible?: boolean


}

export interface IBottonProps {
    // children: string | JSX.Element | JSX.Element[] | (() => JSX.Element) | React.ReactNode
    children?: React.ReactNode
    title?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    className?: string
    size?: 'large' | 'small' | 'default'
    borderSize?: 'none' | number
    borderStyle?: 'solid' | 'dash'
    borderColor?: string


}
