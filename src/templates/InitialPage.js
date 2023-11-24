import React from "react";
import '../styles/InitialPage.css'
import Logo from '../img/brasao_ufpi.png'

const InitialPage = () => {
    return (
        <>
            <div className="w-screen h-screen bg-bgcolor flex justify-center items-center flex-col gap-6">
                <div>
                    <img src={Logo} alt="brasao"/>
                </div>
                <div>
                    <h1 className="text-5xl">Sistema PPGCC</h1>
                </div>
                <div className="w-screen h-7 flex justify-center">
                    <button className="bg-secondbgcolor hover:bg-hovercolor w-20 rounded-lg font-bold">Entrar</button>
                </div>
            </div>
        </>
    );
};

export default InitialPage;