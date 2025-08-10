import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashBoardSummary } from '../../features/admin/adminSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { summary, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getDashBoardSummary());
  }, [dispatch]);

  // A check to prevent the code from crashing if 'summary' is null
  const stats = summary
    ? [
        { label: "Total Users", value: summary.totalUsers || 0 },
        { label: "Total Products", value: summary.totalProducts || 0 },
        { label: "Total Orders", value: summary.totalOrders || 0 },
        { label: "Pending Orders", value: summary.pendingOrders || 0 },
        { label: "Total Revenue", value: `₹${summary.totalRevenue || 0}` },
      ]
    : [];

return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>

      {loading && <p>Loading dashboard...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-6 bg-white border rounded-xl shadow-lg hover:shadow-xl transition duration-200"
          >
            <h2 className="text-gray-500 text-sm uppercase tracking-wide mb-1">{stat.label}</h2>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
