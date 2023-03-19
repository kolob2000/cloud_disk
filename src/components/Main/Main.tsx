import style from './main.module.scss'
import {FileList} from "./FileList";
import {Dashboard} from "./Dashboard";
import {useAppSelector} from "../../app/hooks";
import {Button} from "../Library";
import {ConfirmRequired} from "./ConfirmRequired";


export const Main = () => {
    const isAuth = useAppSelector(state => state.user.is_auth)
    const isActive = useAppSelector(state => state.user.isActive)
    return (
        <div className={style.main + ' wrapper' + (isAuth ? '' : ' ' + style.logout_main)}>
            {isAuth ?
                <>
                    {isActive ?
                        <>
                            <Dashboard/>
                            <FileList/>
                        </>
                        : <ConfirmRequired/>}
                </> :
                <div className={style.promo_height}>

                    <div className={style.promo}>
                        <h1>Work at the speed
                            of thought</h1>
                        <p>Tools, tutorials, design and innovation experts,
                            all in one place! The most intuitive way to
                            imagine your next user experience.</p>
                        <Button borderColor={'transparent'} size={'x-large'} className={style.promo_button}>Get
                            started</Button>
                    </div>
                </div>


            }
        </div>
    );
};

