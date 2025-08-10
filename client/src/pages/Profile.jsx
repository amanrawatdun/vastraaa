import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/order/orderSlice';
import { logout } from '../features/auth/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import DeliveryTruckLoader from '../components/DeliveryTruckLoader';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading: userLoading } = useSelector((state) => state.auth);
    const { orders, loading: ordersLoading, error: ordersError } = useSelector((state) => state.order);

    useEffect(() => {
        if (user && user.token) {
            dispatch(getOrders());
        }
    }, [user, dispatch]); 

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    if (userLoading) {
        return <p>Loading dashboard...</p>;
    }

    if (!user) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4'>
                <p className='text-xl text-red-600 mb-6 font-semibold'>You are not logged in.</p>
                <NavLink
                    to={"/login"}
                    className='bg-blue-600 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105'
                >
                    Go to Login
                </NavLink>
            </div>
        );
    }

    return (
        <div className='min-h-screen flex flex-col bg-gray-50 text-gray-800'>
           

            <main className='flex-grow container mx-auto px-4 py-12 md:py-16'>
                <div className='bg-white rounded-3xl shadow-xl p-6 md:p-10 max-w-5xl mx-auto border border-gray-100'>
                    <h1 className='text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-8 tracking-tight'>
                        User Profile
                    </h1>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                        {/* User Information Section */}
                        <section className='bg-gray-50 rounded-2xl shadow-inner p-6 md:p-8'>
                            <h2 className='text-2xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200'>
                                Account Details 👤
                            </h2>
                            <div className='space-y-5'>
                                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white rounded-xl border border-gray-200 shadow-sm'>
                                    <span className='text-gray-600 font-medium mb-1 sm:mb-0'>Name:</span>
                                    <span className='text-gray-900 font-semibold text-lg'>{user.name}</span>
                                </div>
                                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white rounded-xl border border-gray-200 shadow-sm'>
                                    <span className='text-gray-600 font-medium mb-1 sm:mb-0'>Email:</span>
                                    <span className='text-gray-900 font-semibold text-lg'>{user.email}</span>
                                </div>
                                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white rounded-xl border border-gray-200 shadow-sm'>
                                    <span className='text-gray-600 font-medium mb-1 sm:mb-0'>Admin Status:</span>
                                    <span className={`font-bold text-lg ${user.isAdmin ? 'text-green-600' : 'text-red-600'}`}>
                                        {user.isAdmin ? 'Yes' : 'No'}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className='mt-8 w-full bg-red-600 text-white py-3 rounded-full hover:bg-red-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl'
                            >
                                Logout
                            </button>
                        </section>

                        {/* My Orders Section */}
                        <section className='bg-gray-50 rounded-2xl shadow-inner p-6 md:p-8'>
                            <h2 className='text-2xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200 flex items-center'>
                                My Orders 🛍️
                            </h2>
                            {ordersLoading ? (
                                <p className='text-center text-gray-500 font-medium'>Loading your orders...</p>
                            ) : ordersError ? (
                                <p className='text-center text-red-600 font-semibold'>Error: {ordersError}</p>
                            ) : orders && orders.length > 0 ? (
                                <div className='space-y-6'>
                                    {orders.map(order => (
                                        <div
                                            key={order._id}
                                            className='bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center transition-transform transform hover:scale-[1.02] hover:shadow-lg'
                                        >
                                            <div className='flex items-center space-x-4 mb-4 md:mb-0'>
                                                {/* Status Icon */}
                                                <div className={`p-3 rounded-full ${order.isDelivered ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                    {order.isDelivered ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    )}
                                                </div>

                                                {/* Order Details */}
                                                <div>
                                                    <p className='font-bold text-lg text-gray-900'>
                                                        Order <span className='text-indigo-600'>#{order._id.substring(0, 8)}</span>
                                                    </p>
                                                    <p className='text-sm text-gray-500'>
                                                        Placed on: {new Date(order.createdAt).toLocaleDateString()}
                                                    </p>
                                                    <span
                                                        className={`mt-1 inline-block text-xs font-semibold px-2 py-1 rounded-full ${order.isDelivered ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}
                                                    >
                                                        {order.isDelivered ? 'Delivered' : 'In Transit'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='text-center p-10 bg-white rounded-xl border border-gray-200 shadow-sm'>
                                    <p className='text-gray-500 text-xl mb-6'>
                                        You haven't placed any orders yet.
                                    </p>
                                    <NavLink
                                        to={"/shop"}
                                        className='bg-indigo-600 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105'
                                    >
                                        Start Shopping
                                    </NavLink>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </main>

            
        </div>
    );
};

export default Profile;
