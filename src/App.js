import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from 'react';

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Reservation from "./pages/Reservation";
function App() {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/*" element={<Home />} />  
        <Route path="/admin" element={<Admin />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/reservation"  element={<Reservation />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;