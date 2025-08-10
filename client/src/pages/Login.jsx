import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { error, loading } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = { email, password };
            const response = await dispatch(loginUser(formData));
            const isAdmin = response.payload.isAdmin;

            if (isAdmin) {
                navigate('/admin/dashboard');
            } else if(isAdmin===false) {
                navigate('/');
            }
        } catch (error) {
            console.log("Error in Login", error)
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
            <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200'>
                <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>Login</h2>




                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label htmlFor='email' className='block text-gray-700 text-sm font-medium mb-2'>
                            Email Address
                        </label>
                        <input
                            type='email'
                            id='email'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className='block text-gray-700 text-sm font-medium mb-2'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={loading}
                    >
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                    {error && <div className='bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm text-center'>{error}</div>}
                </form>
                <p className='mt-6 text-center text-sm text-gray-600'>
                    Don't have an account?{' '}
                    <NavLink to={'/register'} className='font-medium text-blue-600 hover:text-blue-500'>
                        Register here
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
