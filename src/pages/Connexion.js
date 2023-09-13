import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/Config';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Inscription.css';

const Connexion = () => {
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState(null);
    const [email, setEmailLocal] = useState(null);


    async function fetchUserRole(token) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/howiam`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
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
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (!data.token) {
                throw new Error('Token non reçu');
            }
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', username);

            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');
            // Récupérez le rôle après la connexion réussie
            const roles = await fetchUserRole(data.token);
            if (roles && roles.length > 0) {
                setRole(roles[0]);
                localStorage.setItem('role', roles[0]); // Supposons que vous voulez seulement le premier rôle
            }

            setMessage('Connexion réussie!');
        } catch (error) {
            setMessage('Erreur lors de la connexion.');
        }
        setLoading(false);
    }
    useEffect(() => {
        if (isAuthenticated) {
            if (role === 'ROLE_USER') {
                navigate('/reservation');
            } else if (role === 'ROLE_PROFESSIONAL') {
                navigate('/admin');
            }
        }
    }, [isAuthenticated,role, navigate]);
    return (<div className="container-fluid inscription-container vh-100">
            {loading ? (
                <div className="d-flex justify-content-center align-items-center h-100">
                    <img src="/loading.gif" alt="Chargement..." className="img-fluid" style={{ width: '50px', height: '50px' }} />
                </div>
            ) : (
                <div className="d-flex justify-content-center align-items-center h-100 ">
                    <div className="inscription-form-container" >
                        {message && <div className="alert alert-info">{message}</div>}
                        <div className="bg-white rounded p-4 shadow-lg">
                        <form onSubmit={handleSubmit} className="inscription-form">
                            <h2 className="text-center" style={{ color: '#6c757d' }}>Bienvenu</h2>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Email"
                                    value={username}
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
                            <div className="button-container text-center">
                                <button type="submit" className="btn btn-outline-secondary btn-sm">Se connecter</button>
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
