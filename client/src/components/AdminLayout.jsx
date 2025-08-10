import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans antialiased text-gray-900">
      <AdminSidebar isSidebarOpen={isSidebarOpen} onToggle={toggleSidebar} />
      
      {/* The main content area now has a left margin on small screens and up (`sm:ml-64`)
        to create space for the fixed sidebar, preventing content from being
        hidden underneath it. The `flex-1` class ensures the main content
        fills the remaining horizontal space.
      */}
      <main className="flex-1 p-4 sm:ml-64 sm:p-8 overflow-y-auto">
        {/* Toggle button is now hidden on medium and larger screens */}
        <button 
          onClick={toggleSidebar}
          className="p-2 mb-4 bg-gray-800 text-white rounded-lg sm:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
