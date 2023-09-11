import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import apiInstance from '../config/Api';

const Admin = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');  // Pour stocker et afficher les erreurs
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchReservations() {
      try {
        setLoading(true);
        const response = await apiInstance.get('/api/professional/reservations');
        if (response.data && response.data.length === 0) {
          setError('Aucune réservation trouvée.');
        } else {
          setReservations(response.data);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des réservations:", err);
        setError('Erreur lors de la récupération des réservations.');
      }
      setLoading(false);
    }

    fetchReservations();
  }, []);
  async function toggleValid(reservation) {
    try {
      setLoading(true);
      const updatedReservation = {
        ...reservation,
        valide: !reservation.valide
      };

      const response = await apiInstance.put(`/api/reservation/${reservation.id}`, updatedReservation);

      // Mettre à jour la liste des réservations après modification
      setReservations(prevReservations =>
          prevReservations.map(res => res.id === reservation.id ? updatedReservation : res)
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réservation:", error);
      setError('Erreur lors de la mise à jour de la réservation.');
    }
    setLoading(false);
  }
  return (
      <div>
        <h1 className='title'>Administrateur</h1>

        {error ? (
            <div className="error-message">{error}</div>
        ) : (
            <table className='admin-table'>
              <thead>
              <tr>
                <th>ID</th>
                <th>Date de début</th>
                <th>Est validé</th>
                <th>Client</th>
              </tr>
              </thead>
              <tbody>
              {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.id}</td>
                    <td>{reservation.debut}</td>
                    <td>  <button className="btn btn-outline-secondary btn-sm" onClick={() => toggleValid(reservation)}>
                      {reservation.valide ? 'Oui' : 'Non'}
                    </button></td>
                    <td>{reservation.client}</td>
                  </tr>
              ))}
              </tbody>
            </table>
        )}
      </div>
  );
};

export default Admin;
