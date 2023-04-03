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
                        <h1>Работай со скоростью мысли</h1>
                        <p>Надежность, конфиденциальность и безопасность. <span>CloudHit.ru</span> отличное место для
                            обмена и хранения
                            ваших файлов и медиа контента.</p>
                        <Button borderColor={'transparent'}
                                size={'x-large'}
                                className={style.promo_button}>
                            Попробовать
                        </Button>
                    </div>
                </div>


            }
        </div>
    );
};

