import style from './main.module.scss'
import {FileList} from "./FileList";
import {Dashboard} from "./Dashboard";
import {useAppSelector} from "../../app/hooks";
import {Button} from "../Library";


export const Main = () => {
    const isAuth = useAppSelector(state => state.user.is_auth)
    return (
        <div className={style.main + ' wrapper' + (isAuth ? '' : ' ' + style.logout_main)}>
            {isAuth ?
                <>
                    <Dashboard/>
                    <FileList/>
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

