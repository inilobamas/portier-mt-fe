import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/Users';
import Companies from './pages/Companies';
import PrivateRoute from './components/PrivateRoute';
import Landing from './pages/Landing';
import Employees from './pages/Employees';
import Buildings from './pages/building/Buildings';
import Floors from './pages/Floors';
import Rooms from './pages/Rooms';
import Locks from './pages/Locks';
import BuildingDetails from './pages/building/BuildingDetails';
// Import other CRUD pages like Companies, Employees when you add them

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route
          path="/companies"
          element={
            <PrivateRoute>
              <Companies />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <Employees />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/buildings"
          element={
            <PrivateRoute>
              <Buildings />
            </PrivateRoute>
          }
        />
        <Route
          path="/floors"
          element={
            <PrivateRoute>
              <Floors />
            </PrivateRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <PrivateRoute>
              <Rooms />
            </PrivateRoute>
          }
        />
        <Route
          path="/locks"
          element={
            <PrivateRoute>
              <Locks />
            </PrivateRoute>
          }
        />
        <Route path="/buildings/:buildingId/details" element={<BuildingDetails />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
