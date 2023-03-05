import style from './main.module.scss'
import {FileList} from "./FileList";
import {Dashboard} from "./Dashboard";


export const Main = () => {
    return (
        <div className={style.main + ' wrapper'}>
            <Dashboard/>
            <FileList/>
        </div>
    );
};

