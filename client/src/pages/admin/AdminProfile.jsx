import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import DeliveryTruckLoader from '../../components/DeliveryTruckLoader';

const AdminProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading: userLoading } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    if (userLoading) {
        return <DeliveryTruckLoader />;
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4">
                <p className="text-xl text-red-600 mb-6 font-semibold">
                    You are not logged in.
                </p>
                <NavLink
                    to={"/login"}
                    className="bg-blue-600 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                    Go to Login
                </NavLink>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
                    👤 User Profile
                </h1>

                <div className="space-y-6">
                    {/* Name */}
                    <div className="flex justify-between items-center p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                        <span className="text-gray-600 font-medium">Name:</span>
                        <span className="text-gray-900 font-semibold text-lg">{user.name}</span>
                    </div>

                    {/* Email */}
                    <div className="flex justify-between items-center p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                        <span className="text-gray-600 font-medium">Email:</span>
                        <span className="text-gray-900 font-semibold text-lg break-all">{user.email}</span>
                    </div>

                    {/* Admin Status */}
                    <div className="flex justify-between items-center p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                        <span className="text-gray-600 font-medium">Admin Status:</span>
                        <span
                            className={`font-bold text-lg ${
                                user.isAdmin ? 'text-green-600' : 'text-red-600'
                            }`}
                        >
                            {user.isAdmin ? '✅ Yes' : '❌ No'}
                        </span>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="mt-10 w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-[1.02]"
                >
                    🚪 Logout
                </button>
            </div>
        </div>
    );
};

export default AdminProfile;
