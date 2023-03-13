import React, {useState} from 'react';
import {Icon} from "../Icon";
import style from './mobile-nav.module.scss'
import {IMobileNavProps} from "../../../types";


export const MobileNav: React.FC<IMobileNavProps> = (props) => {
    const {isVisible, setVisible, children} = props
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)

    const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
        if (isVisible) {
            if (e.touches[0]?.clientX) {
                if (touchStart === null) setTouchStart(e.touches[0].clientX)
                setTouchEnd(e.touches[0].clientX)
            }
        }
    }
    const handleTouchEndCapture: React.TouchEventHandler<HTMLDivElement> = (e) => {
        if (isVisible) {
            if ((touchStart! - 30) > touchEnd!) {
                setTouchStart(null)
                setTouchEnd(null)
                setVisible(false)
            } else {
                setTouchStart(null)
                setTouchEnd(null)
            }
        }
    }

    return (
        <>
            <button onClick={() => setVisible(true)}><Icon icon={'bars'}/></button>
            <div className={isVisible ? style.background : style.background + ' ' + style.backgroundClosed}
                 onClick={e => setVisible(false)}
                 onTouchMove={e => handleTouchMove(e)}
                 onTouchEndCapture={e => handleTouchEndCapture(e)}
            >
            </div>
            <div className={isVisible ? style.menu : style.menu + ' ' + style.menuClosed}
                 onClick={e => e.stopPropagation()}
                 onTouchMove={e => handleTouchMove(e)}
                 onTouchEndCapture={e => handleTouchEndCapture(e)}


            >{children ?? <h1>put here your navigation</h1>}</div>


        </>
    );
};

