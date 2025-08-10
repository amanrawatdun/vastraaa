import React from 'react';
import { NavLink } from 'react-router-dom';

const linkClasses = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
   ${isActive 
     ? 'bg-blue-500 text-white shadow-md' 
     : 'text-gray-300 hover:bg-gray-800 hover:text-white'
   }`;

const AdminSidebar = ({ isSidebarOpen, onToggle }) => {
  return (
    <div 
      className={`
        w-64 h-screen bg-gray-900 text-white shadow-xl border-r border-gray-800
        fixed top-0 left-0 z-20
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
      `}
    >
      <button 
        onClick={onToggle}
        className="absolute top-4 right-4 text-white sm:hidden p-2 rounded-full hover:bg-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 className="text-2xl p-6 font-bold border-b border-gray-700 tracking-wide">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-2 p-4">
        <NavLink to="/admin/dashboard" className={linkClasses} onClick={onToggle}>
          📊 Dashboard
        </NavLink>
        <NavLink to="/admin/products" className={linkClasses} onClick={onToggle}>
          📦 Products
        </NavLink>
        <NavLink to="/admin/orders" className={linkClasses} onClick={onToggle}>
          🛒 Orders
        </NavLink>
        <NavLink to="/admin/users" className={linkClasses} onClick={onToggle}>
          👤 Users
        </NavLink>
        <NavLink to="/admin/profile" className={linkClasses} onClick={onToggle}>
          ⚙️ Profile
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
