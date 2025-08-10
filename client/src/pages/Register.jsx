import React, { useState } from 'react';
import {useDispatch , useSelector } from 'react-redux'
import { registerUser } from '../features/auth/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // Default to false for registration



    // const {error , loading } =
    
    const {error , loading} = useSelector((state)=>state.auth);

    const dispatch =  useDispatch();
    const naviagte=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = {name , email , password , isAdmin}
            const response = await dispatch(registerUser(formData));
            
            if(registerUser.fulfilled.match(response)){
                naviagte('/login');
            }

        }catch(error){
            console.log('Registeration failed:',error);
        }
    };
 
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
            <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200'>
                <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>Register</h2>
                
               
                

                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label htmlFor='name' className='block text-gray-700 text-sm font-medium mb-2'>
                            Name
                        </label>
                        <input
                            type='text'
                            id='name'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    {/* Note: isAdmin checkbox is typically not exposed in public registration for security */}
                    <div className='flex items-center'>
                        <input
                            type='checkbox'
                            id='isAdmin'
                            className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                        <label htmlFor='isAdmin' className='ml-2 block text-sm text-gray-900'>
                            Register as Admin (for demo purposes)
                        </label>
                    </div>
                    
                    <button
                        type='submit'
                        className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                     {error && <div className='bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm text-center'>{error}</div>}

                </form>
                <p className='mt-6 text-center text-sm text-gray-600'>
                    Already have an account?{' '}
                    <NavLink to={'/login'} className='font-medium text-blue-600 hover:text-blue-500'>
                        Login here
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Register;
