import React from "react";

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

export interface ICommonState {
    isVisible: boolean,
    isProfileVisible: boolean
}

export interface IUserState {
    id: number
    uuid: string
    email: string
    firstName?: string
    lastName?: string
    diskQuota: number
    isActive: boolean
    is_auth: boolean
}

export interface IIconProps {
    icon?: string
    width?: number
    height?: number
    fill?: string
    hover?: string
    className?: string
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
    headers: {
        'Content-Type'?: string
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
    headers: {
        'Content-Type'?: string,
        'Authorization': string
    }

    body: any

    constructor(method: string, contentType: string | boolean = true) {
        this.method = method
        if (typeof contentType === 'string') {
            this.headers = {
                "Content-Type": contentType,
                'Authorization': ''

            }
        } else if (contentType) {
            this.headers = {
                "Content-Type": 'application/json',
                'Authorization': ''

            }
        } else {
            this.headers = {
                'Authorization': ''
            }
        }

    }


}

export interface ITextProps {

    value: string,
    id?: undefined | string,
    setValue: React.Dispatch<React.SetStateAction<any>>
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    placeholder?: string
    size?: 'x-large' | 'large' | 'small' | 'default'
    borderSize?: 'none' | number
    borderStyle?: 'solid' | 'dash'
    borderColor?: string
    color?: string
    className?: string
    isVisible?: boolean
    isFocus?: boolean
    typeField?: string


}

export interface IButtonProps {
    // children: string | JSX.Element | JSX.Element[] | (() => JSX.Element) | React.ReactNode
    children?: React.ReactNode
    title?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    className?: string
    size?: 'x-large' | 'large' | 'small' | 'default'
    borderSize?: 'none' | number
    borderStyle?: 'solid' | 'dash'
    borderColor?: string


}

export interface IMobileNavProps {
    children?: React.ReactNode
    isVisible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>> | ((isVisible: boolean) => void)
}

export interface IMenuLink {
    name: string
    path?: string
}

export interface ILoginForm {
    email: string
    password: string
}

export interface ILoginFormProps {
    className?: string
    formRef?: React.MutableRefObject<null>

}

export interface IUploadFormProps {
    isVisible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IProfilePopupProps {
    className?: string

}

export interface IPropsSlider {
    children?: React.ReactNode
    className?: string
}







