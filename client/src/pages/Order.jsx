import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
// Import icons from the react-icons library
import { FaCreditCard, FaMapPin, FaClipboardList } from 'react-icons/fa6';


const Order = () => {
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth); // Assuming user info is in auth slice

    // State for shipping information form fields
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [country, setCountry] = useState('');
    const [formError, setFormError] = useState('');

   
    useEffect(() => {
     
        setAddress('123 Main St');
        setCity('Anytown');
        setState('CA');
        setPincode('90210');
        setCountry('USA');
    }, []);


    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const baseDiscountPercentage = 0.20;
    const baseDiscount = subtotal * baseDiscountPercentage;
    const deliveryFee = 15;
    const total = subtotal - baseDiscount + deliveryFee;

   
    const backendOrderItems = cartItems.map(item => ({
        name: item.name,
        qty: item.quantity,
        image: item.image,
        price: item.price,
        product: item.id 
    }));

    const handleProceedToPayment = (e) => {
        e.preventDefault();
        setFormError('');

     
        if (!address || !city || !state || !pincode || !country) {
            setFormError('Please fill in all shipping information fields.');
            return;
        }
        if (cartItems.length === 0) {
            setFormError('Your cart is empty. Please add items before proceeding.');
            return;
        }
        if (!user || !user._id) {
            setFormError('You must be logged in to proceed to payment.');
           
            return;
        }

        const shippingInfo = { address, city, state, pincode, country };

      
        navigate('/payment', {
            state: {
                orderData: {
                    orderItems: backendOrderItems,
                    shippingInfo: shippingInfo,
                    totalPrice: total
                }
            }
        });
    };

    return (
        <div className='min-h-screen flex flex-col bg-gray-100 font-inter'>
           

            <main className='flex-grow container mx-auto px-4 py-8 md:py-12'>
                <h1 className='font-extrabold text-center text-4xl md:text-5xl mb-10 text-gray-900 tracking-tight'>
                    <FaCreditCard className='inline-block mr-3 w-10 h-10 text-indigo-600' />
                    Checkout
                </h1>

                {cartItems.length === 0 && (
                    <div className='bg-white rounded-xl shadow-lg p-8 text-center'>
                        <p className='text-gray-500 text-xl mb-4'>Your cart is empty. Please add items to proceed.</p>
                        <NavLink to={"/shop"} className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                            Start Shopping
                        </NavLink>
                    </div>
                )}

                {cartItems.length > 0 && (
                    <form onSubmit={handleProceedToPayment} className='flex flex-col lg:flex-row gap-8'>
                        {/* Shipping Information & Cart Summary Section */}
                        <section className='lg:w-2/3 space-y-8'>
                            <div className='bg-white rounded-xl shadow-lg p-6 md:p-8'>
                                <h2 className='text-2xl font-semibold mb-6 text-gray-800 border-b pb-3'>
                                    <FaMapPin className='inline-block mr-2 text-indigo-600' /> Shipping Information
                                </h2>
                                {formError && (
                                    <div className='bg-red-100 text-red-700 p-4 rounded-lg mb-4 text-sm text-center'>{formError}</div>
                                )}
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <label htmlFor='address' className='block text-gray-700 text-sm font-medium mb-2'>Address</label>
                                        <input
                                            type='text'
                                            id='address'
                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='city' className='block text-gray-700 text-sm font-medium mb-2'>City</label>
                                        <input
                                            type='text'
                                            id='city'
                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='state' className='block text-gray-700 text-sm font-medium mb-2'>State</label>
                                        <input
                                            type='text'
                                            id='state'
                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='pincode' className='block text-gray-700 text-sm font-medium mb-2'>Pincode</label>
                                        <input
                                            type='text'
                                            id='pincode'
                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                            value={pincode}
                                            onChange={(e) => setPincode(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='md:col-span-2'>
                                        <label htmlFor='country' className='block text-gray-700 text-sm font-medium mb-2'>Country</label>
                                        <input
                                            type='text'
                                            id='country'
                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className='bg-white rounded-xl shadow-lg p-6 md:p-8'>
                                <h3 className='text-2xl font-semibold mb-6 text-gray-800 border-b pb-3'>
                                    <FaClipboardList className='inline-block mr-2 text-indigo-600' /> Items in Your Cart
                                </h3>
                                <div className='space-y-4'>
                                    {cartItems.map(item => (
                                        <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className='flex items-start gap-4 p-4 bg-gray-50 rounded-xl shadow-sm'>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className='w-20 h-20 object-cover rounded-md border border-gray-200'
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/cccccc/333333?text=Item'; }}
                                            />
                                            <div className='flex-grow'>
                                                <p className='font-medium text-lg text-gray-800'>{item.name}</p>
                                                <p className='text-sm text-gray-500'>Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                                                <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>
                                            </div>
                                            <p className='font-bold text-gray-900'>${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Order Summary & Proceed Button */}
                        <aside className='lg:w-1/3'>
                            <div className='sticky top-8 p-6 border border-gray-200 rounded-xl shadow-xl bg-white'>
                                <h2 className='text-2xl font-semibold mb-4 text-gray-800 border-b pb-3'>Order Summary</h2>

                                <div className='space-y-4 text-gray-700'>
                                    <div className='flex justify-between'>
                                        <span className='text-base'>Subtotal</span>
                                        <span className='text-base font-medium'>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-base'>Base Discount (-{(baseDiscountPercentage * 100).toFixed(0)}%)</span>
                                        <span className='text-base font-medium text-red-500'>-${baseDiscount.toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-base'>Delivery Fee</span>
                                        <span className='text-base font-medium'>${deliveryFee.toFixed(2)}</span>
                                    </div>
                                    <div className='h-[1px] bg-gray-300 my-4'></div>
                                    <div className='flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200'>
                                        <span>Total Payable</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    type='submit'
                                    disabled={cartItems.length === 0}
                                    className={`w-full py-3 rounded-full mt-8 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200
                                        ${cartItems.length === 0
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                        }`}
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </aside>
                    </form>
                )}
            </main>

        </div>
    );
};

export default Order;
