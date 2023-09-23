import React, { useState, useEffect } from "react";
import apiInstance from "../config/Api";
import { API_BASE_URL } from "../config/Config";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { format } from "date-fns-tz";

import "../styles/pages/Reservation.css";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [professionelId, setProfessionelId] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const formatHour = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer); // Ceci annule le timeout si le composant est démonté avant que le délai ne soit écoulé
    }
  }, [message]);
  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const response = await apiInstance.get("/api/reservations/me");
        setReservations(response.data.reservations);
      } catch (error) {
        if (error.message === "UnauthorizedError") {
          navigate("/connexion");
        }
        console.error(
          "Erreur lors de la récupération des réservations:",
          error
        );
      }
      setLoading(false);
    };
    const handleDeleteReservation = async (reservationId) => {
      setLoading(true);
      try {
        const response = await apiInstance.delete(
          `/api/reservation/${reservationId}`
        );
        if (response.status === 200) {
          setMessage("Réservation supprimée avec succès");
          const updatedReservations = reservations.filter(
            (reservation) => reservation.id !== reservationId
          );
          setReservations(updatedReservations);
        } else {
          setMessage("Erreur lors de la suppression de la réservation");
        }
      } catch (error) {
        setMessage("Erreur lors de la suppression de la réservation");
        console.error(
          "Erreur lors de la suppression de la réservation:",
          error
        );
      }
      setLoading(false);
    };

    const fetchProfessionals = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_BASE_URL}/api/professionals`, {
          method: "GET",
        });

        const data = await response.json();

        setProfessionals(data);

        if (data.length > 0) {
          setProfessionelId(data[0].id);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des professionnels:",
          error
        );
      }
      setLoading(false);
    };

    fetchReservations();
    fetchProfessionals();
  }, []);
  const handleDeleteReservation = async (reservationId) => {
    setLoading(true);
    try {
      const response = await apiInstance.delete(
        `/api/reservation/${reservationId}`
      );
      if (response.status === 200) {
        setMessage("Réservation supprimée avec succès");
        const updatedReservations = reservations.filter(
          (reservation) => reservation.id !== reservationId
        );
        setReservations(updatedReservations);
      } else {
        setMessage("Erreur lors de la suppression de la réservation");
      }
    } catch (error) {
      setMessage("Erreur lors de la suppression de la réservation");
      console.error("Erreur lors de la suppression de la réservation:", error);
    }
    setLoading(false);
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedDate = format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSX", {
        timeZone: "Europe/Paris",
      });
      setLoading(true);
      const response = await apiInstance.post("/api/reservation/create", {
        debut: formattedDate,
        valide: 0,
        professionel_id: professionelId,
      });

      if (response.status === 200) {
        setMessage("Réservation créée avec succès");
        const updatedReservations = await apiInstance.get(
          "/api/reservations/me"
        );
        setReservations(updatedReservations.data.reservations);
      } else {
        setMessage("Erreur lors de la création de la réservation");
      }
    } catch (error) {
      if (error.message === "UnauthorizedError") {
        navigate("/connexion");
      }
      setMessage("Erreur lors de la création de la réservation");
    }
    setLoading(false);
  };

  return (
    <div className="reservations-container">
      <div className="container-fluid mt-5">
        {loading ? (
          <div
            className="loader d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <img
              src="/loading.gif"
              alt="Chargement..."
              style={{ width: "50px", height: "50px" }}
            />
          </div>
        ) : (
          <>
            {message && <div className="alert alert-secondary">{message}</div>}
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <h2 className="text-secondary">Créer une réservation</h2>
                <form onSubmit={handleReservationSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-secondary">
                      Professionnel:
                    </label>
                    <select
                      className="form-select"
                      value={professionelId || ""}
                      onChange={(e) => setProfessionelId(e.target.value)}
                    >
                      {professionals.map((pro) => (
                        <option key={pro.id} value={pro.id}>
                          {pro.email}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-secondary">
                      Date et heure:
                    </label>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(params) => <TextField {...params} />}
                        value={startDate}
                        onChange={setStartDate}
                        ampm={false}
                      />
                    </LocalizationProvider>
                  </div>

                  <div className="btn-reserve">
                    <button
                      type="submit"
                      className="btn btn-outline-secondary btn-lg"
                    >
                      Réserver
                    </button>
                  </div>
                </form>
              </div>

              <div className="col-lg-6 col-md-12">
                <h2 className="text-secondary">Vos réservations</h2>
                {Array.isArray(reservations) ? (
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Heure</th>
                        <th>Valide</th>
                        <th>Professionnel</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                          <td>{formatDate(reservation.debut)}</td>
                          <td>{formatHour(reservation.debut)}</td>
                          <td>
                            {reservation.valide ? (
                              <div className="vert"></div>
                            ) : (
                              <div className="rouge"></div>
                            )}
                          </td>
                          <td>{reservation.professionel_id}</td>
                          <td>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => {
                                const confirmation = window.confirm(
                                  "Êtes-vous sûr de vouloir supprimer cette réservation ?"
                                );
                                if (confirmation) {
                                  handleDeleteReservation(reservation.id);
                                }
                              }}
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  // <div>
                  // <div className="row header-tab-resa">
                  //     <div className="col-3">Date</div>
                  //     <div className="col-1">Heure</div>
                  //     <div className="col-1">Valide</div>
                  //     <div className="col-3">Professionnel</div>
                  //     <div className="col-4">Action</div>
                  // </div>
                  // {reservations.map(reservation => (
                  // <div className="row content-tab-resa my-2">

                  //     <div className="col-3">{formatDate(reservation.debut)}</div>
                  //     <div className="col-1">{formatHour(reservation.debut)}</div>
                  //     <div className="col-1">{reservation.valide ? 'Oui' : 'Non'}</div>
                  //     <div className="col-3">{reservation.professionel_id}</div>
                  //     <div className="col-4">
                  //         <button className="btn btn-outline-secondary" onClick={() => handleDeleteReservation(reservation.id)}>
                  //             Supprimer
                  //         </button>
                  //     </div>

                  // </div>
                  //     ))}

                  // </div>
                  <div className="alert alert-warning">
                    Pas de réservations trouvées.
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reservation;
