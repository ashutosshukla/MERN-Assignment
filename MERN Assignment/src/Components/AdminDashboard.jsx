import React from 'react';
import Navbar from './Navbar';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-bold">Welcome Admin Panel</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;