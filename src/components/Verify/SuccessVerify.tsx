import React from "react";
import style from "./verify.module.scss";

export const SuccessVerify: React.FC = () => {

    return <>
        < h1
            className={
                style.heading + " " + style.success
            }> Успешно.Можете войти на сайт.
        </h1>
    </>
}