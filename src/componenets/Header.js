import React from "react";
import siteLogo from "../images/logo.png";

export default function Header() {
  return (
    <header className="header">
      <img className="header--image" src={siteLogo} alt="logo" />
      <p className="header--title">Meme<span>Forge</span></p>
      <span className="header-badge">Studio</span>
    </header>
  );
}