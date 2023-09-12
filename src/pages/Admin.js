import React, { useState, useEffect } from 'react';
import apiInstance from '../config/Api';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Admin = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'debut', direction: 'ascending' });

  const sortReservations = (key) => {
    let direction = 'ascending';

    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedReservations = [...reservations].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setReservations(sortedReservations);
    setSortConfig({ key, direction });
  };

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
                <th onClick={() => sortReservations('debut')} style={{ cursor: 'pointer' }}>
                  Date de début
                  {sortConfig.key === 'debut' && (
                      sortConfig.direction === 'ascending' ?
                          <ArrowUpwardIcon fontSize="small" /> :
                          <ArrowDownwardIcon fontSize="small" />
                  )}
                </th>
                <th>Est validé</th>
                <th onClick={() => sortReservations('client')} style={{ cursor: 'pointer' }}>
                  Client
                  {sortConfig.key === 'client' && (
                      sortConfig.direction === 'ascending' ?
                          <ArrowUpwardIcon fontSize="small" /> :
                          <ArrowDownwardIcon fontSize="small" />
                  )}
                </th>
              </tr>
              </thead>
              <tbody>
              {reservations.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>Aucune réservation trouvée.</td>
                  </tr>
              ) : (
                  reservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td>{reservation.id}</td>
                        <td>{reservation.debut}</td>
                        <td>
                          <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => toggleValid(reservation)}
                          >
                            {reservation.valide ? 'Oui' : 'Non'}
                          </button>
                        </td>
                        <td>{reservation.client}</td>
                      </tr>
                  ))
              )}
              </tbody>
            </table>
        )}
      </div>
  );
};

export default Admin;
