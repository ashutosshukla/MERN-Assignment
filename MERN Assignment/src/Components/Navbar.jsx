import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const userName = localStorage.getItem('userName');

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link to="/admin" className="inline-flex items-center px-1 pt-1 text-gray-900">
              Home
            </Link>
            <Link to="/admin/employees" className="inline-flex items-center px-1 pt-1 text-gray-900">
              Employee List
            </Link>
          </div>
          <div className="flex items-center">
            <span className="text-gray-900">Welcome, {userName}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;