import React, { useState, useEffect } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
      localStorage.getItem('isAuthenticated') === 'true'
  );
  useEffect(() => {
    // Cette fonction sera exécutée chaque fois que la valeur de localStorage change
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
  }, [localStorage.getItem('isAuthenticated')]);
  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/connexion');
  }

  return (
      <header>
        <div className="navbar">
          <div className="navbar-logo">
            <img src="logo192.png" alt="Logo" />
            <h1>Logoipsum</h1>
          </div>
          <div className="navbar-right">
            <LanguageIcon />
            <select className="navbar-language">
              <option value="fr">Français</option>
              <option value="en">Anglais</option>
            </select>

            {/* Si l'utilisateur n'est pas connecté */}
            {!isAuthenticated && (
                <>
                  <Link to="/connexion">
                    <button className="navbar-button">
                      Se Connecter
                    </button>
                  </Link>
                  <Link to="/inscription">
                    <button className="navbar-button">
                      S'inscrire
                    </button>
                  </Link>
                </>
            )}

            {/* Si l'utilisateur est connecté */}
            <>
            {isAuthenticated && role === 'ROLE_USER' && (

                  <Link to="/reservation">
                    <button className="navbar-button">
                      Mes réservation
                    </button>
                  </Link>
                  )}
                  {isAuthenticated && role === 'ROLE_PROFESSIONAL' && (

                  <Link to="/admin">
                    <button className="navbar-button">
                      Admin
                    </button>
                  </Link>
                  )}
                  {isAuthenticated && (
                  <button className="navbar-button" onClick={handleLogout}>
                    Déconnexion
                  </button>
                  )}
                </>


          </div>
        </div>
      </header>
  );
};

export default Navbar;
