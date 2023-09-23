import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/components/_Navbar.css";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  useEffect(() => {
    // Cette fonction sera exécutée chaque fois que la valeur de localStorage change
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, [localStorage.getItem("isAuthenticated")]);
  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/connexion");
  };

  return (
    <header>
      <div className="navbar">
        <Link to="/home">
          <div className="navbar-logo">
            <img src="logo192.png" alt="Logo" />
            <h1>Logoipsum</h1>
          </div>
        </Link>
        <div className="navbar-right">
          {isAuthenticated && (
            <div className="welcome-message">Bienvenue {email} !</div>
          )}
          {/* Si l'utilisateur n'est pas connecté */}
          {!isAuthenticated && (
            <>
              <Link to="/connexion">
                <button className="navbar-button">Se Connecter</button>
              </Link>
              <Link to="/inscription">
                <button className="navbar-button">S'inscrire</button>
              </Link>
            </>
          )}

          {/* Si l'utilisateur est connecté */}
          <>
            {isAuthenticated && role === "ROLE_USER" && (
              <Link to="/reservation">
                <button className="navbar-button">Mes réservations</button>
              </Link>
            )}
            {isAuthenticated && role === "ROLE_PROFESSIONAL" && (
              <Link to="/admin">
                <button className="navbar-button">Réservations</button>
              </Link>
            )}
            {isAuthenticated && (
              <button
                className="navbar-button"
                onClick={() => {
                  const confirmation = window.confirm(
                    "Êtes-vous sûr de vouloir vous déconnecter ?"
                  );
                  if (confirmation) {
                    handleLogout();
                  }
                }}
              >
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
