import React, { useState } from "react";
import "../styles/components/Inscription.css";
import { API_BASE_URL } from "../config/Config";
import { useNavigate } from "react-router-dom";

import ellipse3 from "../images/Ellipse3.png";

const Inscription = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/registerAPI`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/connexion");

        setMessage("Inscription réussie !");
      } else {
        setMessage(data.error || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      setMessage("Erreur de connexion. Veuillez réessayer.");
      console.error("There was an error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container-fluid vh-100">
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
        <div className="d-flex justify-content-center align-items-center h-100">
          <div
            className="bg-white rounded shadow-lg inscription-card"
            style={{
              maxWidth: "400px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit} className="inscription-form">
              <img src={ellipse3} alt="ellipse" className="ellipse3" />
              <h2 className="text-center mb-4" style={{ color: "#6c757d" }}>
                Bienvenue
              </h2>
              <div className="connexion-form">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control-inscription "
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control-inscription password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="button-container text-center">
                  <h3>S'inscrire</h3>

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
      )}
    </div>
  );
};

export default Inscription;
