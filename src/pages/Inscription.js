import React, { useState } from 'react';
import '../styles/components/Inscription.css';
import {API_BASE_URL} from "../config/Config";
import {useNavigate} from "react-router-dom";

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
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();
            if (response.ok) {
                navigate('/connexion');

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

    return (<div className="container-fluid vh-100">
            {loading ? (
                <div className="d-flex justify-content-center align-items-center h-100">
                    <img src="/loading.gif" alt="Chargement..." className="img-fluid" style={{ width: '50px', height: '50px' }} />
                </div>
            ) : (
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="bg-white rounded p-4 shadow-lg" style={{ maxWidth: '400px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                        {message && <div className="alert alert-info">{message}</div>}
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-center mb-4" style={{ color: '#6c757d' }}>Bienvenu</h2>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderColor: '#d1d1d1' }}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Mot de passe"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderColor: '#d1d1d1' }}
                                />
                            </div>
                            <div className="form-group d-flex justify-content-between align-items-center">
                                <span style={{ color: '#6c757d' }}>S'inscrire</span>
                                <button type="submit" className="btn btn-outline-secondary btn-sm">Envoyer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );

};

export default Inscription;
