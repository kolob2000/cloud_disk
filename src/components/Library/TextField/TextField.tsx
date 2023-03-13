import React, {useEffect, useRef} from 'react';
import {ITextProps} from "../../../types";
import style from './TextField.module.scss'

export const TextField: React.FC<ITextProps> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const {
        value, setValue, borderSize,
        borderStyle, borderColor, color,
        size, placeholder, isFocus,
        onKeyDown, onBlur, className,
        typeField
    } = props
    const height = size === 'large' ? 40 : size === 'small' ? 24 : 32
    const radius = size === 'large' ? 8 : size === 'small' ? 4 : 6
    const padding = size === 'large' ? '7px 11px' : size === 'small' ? '0px 7px' : '4px 11px'
    const inlineStyles: React.CSSProperties = {
        display: 'block',
        color: color ?? 'var(--main_color)',
        border: `${borderSize ? borderSize : 1}px
                        ${borderStyle ? borderStyle : 'solid'}
                        ${borderColor ? borderColor : '#d9d9d9'}`,
        padding: padding,
        borderRadius: ` ${radius}px`,
        height: `${height}px`
    }
    const classes: (string | undefined)[] = [style.textInput]
    useEffect(() => {
        isFocus && inputRef.current?.focus()
    }, [])
    return (
        <>
            <input
                ref={inputRef}
                type={typeField ?? "text"}
                value={value}
                placeholder={placeholder ?? 'Text'}
                onBlur={onBlur}
                onChange={e => setValue(e.target.value)}
                style={inlineStyles}
                className={classes.concat(className?.split(' ')).join(' ')}
                onKeyDown={onKeyDown}
            />
        </>
    );
};

React.memo(TextField);
