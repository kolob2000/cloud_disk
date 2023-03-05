import React from 'react';
import {IBottonProps} from "../../../types";
import style from './button.module.scss'

export const Button: React.FC<IBottonProps> = (props) => {
    const {
        children, onClick, className,
        borderSize, borderStyle,
        borderColor,
        size
    } = props
    const height = size === 'large' ? 40 : size === 'small' ? 24 : 32
    const radius = size === 'large' ? 8 : size === 'small' ? 4 : 6
    const padding = size === 'large' ? '7px 11px' : size === 'small' ? '0px 7px' : '4px 11px'
    const inlineStyles: React.CSSProperties = {
        border: `${borderSize ? borderSize : 1}px
                        ${borderStyle ? borderStyle : 'solid'}
                        ${borderColor ? borderColor : '#d9d9d9'}`,
        padding: padding,
        borderRadius: ` ${radius}px`,
        height: `${height}px`
    }
    const classes: (string | undefined)[] = [style.button]

    return (
        <>
            <button
                className={classes.concat(className?.split(' ')).join(' ')}
                style={inlineStyles}
                onMouseDown={onClick}>
                {children ?? 'Button'}
            </button>
        </>
    );
};

