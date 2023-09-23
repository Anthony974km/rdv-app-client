import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/Config";
import { useNavigate } from "react-router-dom";
import "../styles/components/Connexion.css";

import ellipse1 from "../images/Ellipse1.png";
import ellipse2 from "../images/Ellipse2.png";

const Connexion = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(null);
  const [email, setEmailLocal] = useState(null);

  async function fetchUserRole(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/howiam`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await response.json();
      return data.roles; // Suppose que le rôle est retourné sous le nom 'roles'
    } catch (error) {
      console.error("Erreur lors de la récupération du rôle:", error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!data.token) {
        throw new Error("Token non reçu");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", username);

      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      // Récupérez le rôle après la connexion réussie
      const roles = await fetchUserRole(data.token);
      if (roles && roles.length > 0) {
        setRole(roles[0]);
        localStorage.setItem("role", roles[0]); // Supposons que vous voulez seulement le premier rôle
      }

      setMessage("Connexion réussie!");
    } catch (error) {
      setMessage("Erreur lors de la connexion.");
    }
    setLoading(false);
  };
  useEffect(() => {
    if (isAuthenticated) {
      if (role === "ROLE_USER") {
        navigate("/reservation");
      } else if (role === "ROLE_PROFESSIONAL") {
        navigate("/admin");
      }
    }
  }, [isAuthenticated, role, navigate]);
  return (
    <div className="container-fluid inscription-container vh-100">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <img
            src="/loading.gif"
            alt="Chargement..."
            className="img-fluid"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100 ">
          <div className="inscription-form-container">
            {message && <div className="alert alert-info">{message}</div>}
            <div className="bg-white rounded shadow-lg connexion-card ">
              <form onSubmit={handleSubmit} className="inscription-form">
                <img src={ellipse1} alt="ellipse" className="ellipse1" />
                <img src={ellipse2} alt="ellipse" className="ellipse2" />
                <h2 className="text-center" style={{ color: "#6c757d" }}>
                  Bienvenue
                </h2>
                <div className="connexion-form">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control-connexion"
                      placeholder="Email"
                      value={username}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control-connexion password"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="button-container text-center">
                    <h3>Se connecter</h3>
                    <button
                      type="submit"
                      className="btn btn-outline-secondary btn-sm"
                    >
                      <svg
                        width="24"
                        height="13"
                        viewBox="0 0 24 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.8535 6.18688L16.3535 0.118532C16.1582 -0.0395106 15.8418 -0.0395106 15.6465 0.118532C15.4512 0.276574 15.4512 0.532583 15.6465 0.690587L22.293 6.06835H0.500015C0.22364 6.06835 0 6.24931 0 6.47292C0 6.69654 0.22364 6.87749 0.500015 6.87749H22.293L15.6465 12.2552C15.4512 12.4133 15.4512 12.6693 15.6465 12.8273C15.7441 12.9063 15.8721 12.9458 16 12.9458C16.1279 12.9458 16.2559 12.9063 16.3536 12.8273L23.8535 6.75893C24.0488 6.60093 24.0488 6.34492 23.8535 6.18688Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connexion;
