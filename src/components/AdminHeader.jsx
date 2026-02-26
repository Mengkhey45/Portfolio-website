import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminHeader = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-40">
      <div className="px-4 md:px-8 py-4 max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/admin/dashboard" className="text-2xl font-bold text-white">
          Admin Panel
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/admin/dashboard"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/project/new"
            className="text-slate-300 hover:text-white transition-colors"
          >
            New Project
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
