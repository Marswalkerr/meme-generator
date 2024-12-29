import React from "react";
import siteLogo from "../images/logo.png";

export default function Header(){
    return (
        <header className="header">
            <img className="header--image" src={siteLogo} alt="logo"/>
            <p className="header--title">MemeGenerator</p>
        </header>
    )
}