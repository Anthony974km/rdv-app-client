import React from 'react';
import Navbar from '../components/Navbar';

const Admin = () => {
  return (
    <div>
     
      <h1 className='title'>Administrateur</h1>

      <table className='admin-table'>
        <thead>
          <tr>
            <th>Colonne 1</th>
            <th>Colonne 2</th>
            <th>Colonne 3</th>
            <th>Colonne 4</th>
            <th>Colonne 5</th>
          </tr>
        </thead>
        <tbody>
          {/* Vous pouvez ajouter ici les lignes de données */}
          <tr>
            <td>Donnée 1</td>
            <td>Donnée 2</td>
            <td>Donnée 3</td>
            <td>Donnée 4</td>
            <td>Donnée 5</td>
          </tr>
          {/* Ajoutez d'autres lignes au besoin */}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
