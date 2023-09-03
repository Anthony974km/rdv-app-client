import React, { useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';

const Navbar = () => {


  return (
    <header>
    <div className="navbar">
      <div className="navbar-logo">
        <img src="logo192.png" alt="Logo" />
        <h1>Logoipsum</h1>
      </div>
      <div className="navbar-right">
        <LanguageIcon/>
      <select className="navbar-language">
          <option value="fr">Français</option>
          <option value="en">Anglais</option>
        </select>
        <button className="navbar-button">
          Se Connecter
        </button>
        <button className="navbar-button">
          S'inscrire
        </button>
      </div>

    </div>
    </header>
  );
};

export default Navbar;
