
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import AdminDashboard from './Components/AdminDashboard';
import EmployeeList from './components/EmployeeList';
import ProtectedRoute from './Components/protectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        {/* <Route path="/admin/employees" element={<EmployeeList />} /> */}
        <Route
          path="/admin"
          element={
              <AdminDashboard />
          }
        />
        <Route
          path="/admin/employees"
          element={
              <EmployeeList />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;