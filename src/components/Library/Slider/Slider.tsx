import React, {useEffect, useRef, useState} from 'react'
import {IPropsSlider} from "../../../types"
import style from './slider.module.scss'
import {Icon} from "../Icon";


export const Slider: React.FC<IPropsSlider> = (props) => {
    const ref: React.MutableRefObject<HTMLDivElement | null> = useRef(null)
    const [slides, setSlides] = useState<Array<string | JSX.Element | JSX.Element[] | (() => JSX.Element)>>()
    useEffect(() => {
        setSlides(React.Children.map(props?.children, i => i) as Array<JSX.Element>)
    }, [props.children])
    console.log(slides)
    const handlePrev = () => {
        setSlides((state: any) => {
            const first = state.shift()
            return [...state, first]
        })
    }
    const handleNext = () => {
        setSlides((state: any) => ([state.pop(), ...state]))
    }
    const classes: (string | undefined)[] = ['']

    return (
        <div className={style.main}>
            <button onClick={handlePrev}><Icon className={style.icon + ' ' + style.icon_prev} icon={'chevron-left'}/>
            </button>
            <button onClick={handleNext}><Icon className={style.icon + ' ' + style.icon_next} icon={'chevron-right'}/>
            </button>
            <div ref={ref} className={classes.concat(props.className?.split(' ')).join(' ')}>
                {slides?.map(i => i) as Array<JSX.Element>}
            </div>
        </div>
    )
}

