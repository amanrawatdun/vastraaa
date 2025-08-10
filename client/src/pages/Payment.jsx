import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { createorder } from '../features/order/orderSlice';
import { createPaymentOrder, verifyPayment } from '../features/payment/paymentSlice';

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { orderData } = location.state || {};
    const { user } = useSelector((state) => state.auth);
    const { orderItems = [], shippingInfo = {}, totalPrice = 0 } = orderData || {};

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [orderLoading, setOrderLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderError, setOrderError] = useState('');
    const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

    useEffect(() => {
        if (!orderData || !orderItems.length || !shippingInfo.address || totalPrice === 0) {
            alert('Order details are incomplete. Please go back to the shipping page.');
            navigate('/order');
        }
    }, [orderData, orderItems.length, shippingInfo.address, totalPrice, navigate]);

    const handlePlaceOrder = async () => {
        if (!orderItems.length) {
            setOrderError('Your cart is empty. Please add items before placing an order.');
            return;
        }
        if (!user || !user.token) {
            setOrderError('You must be logged in to place an order.');
            navigate('/login');
            return;
        }

        setOrderLoading(true);
        setOrderError('');
        setOrderSuccess(false);

        try {
            const finalOrderData = {
                orderItems,
                shippingInfo,
                paymentMethod,
                totalPrice,
            };

            if (paymentMethod === 'COD') {
                const resultAction = await dispatch(createorder(finalOrderData));

                if (createorder.fulfilled.match(resultAction)) {
                    setPlacedOrderDetails(resultAction.payload);
                    setOrderSuccess(true);
                    dispatch(clearCart());
                } else {
                    setOrderError(resultAction.payload || 'Failed to place COD order.');
                }
            } else if (paymentMethod === 'Razorpay') {
                const paymentOrderRes = await dispatch(createPaymentOrder({
                    totalPrice,
                    orderData: finalOrderData,
                }));

                if (createPaymentOrder.fulfilled.match(paymentOrderRes)) {
                    const { amount, id } = paymentOrderRes.payload;
                    const options = {
                        key: import.meta.env.VITE_APP_RAZORPAY_KEY_ID,
                        amount,
                        currency: 'INR',
                        name: 'Your Brand Name',
                        description: 'Payment for Order',
                        order_id: id,
                        handler: async function (response) {
                           
                            const verificationPayload = {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            };

                            try {
                                const verifyRes = await dispatch(verifyPayment(verificationPayload));

                                if (verifyPayment.fulfilled.match(verifyRes)) {
                                    setPlacedOrderDetails(verifyRes.payload.order);
                                    setOrderSuccess(true);
                                    dispatch(clearCart());
                                } else {
                                    setOrderError(verifyRes.payload || 'Failed to verify payment or place order.');
                                }
                            } catch (error) {
                                console.error('Error verifying payment:', error);
                                setOrderError(error.message || 'An error occurred during payment verification.');
                            }
                        },
                        prefill: {
                            name: user.name,
                            email: user.email,
                            contact: shippingInfo.phone,
                        },
                        notes: {
                            address: shippingInfo.address,
                        },
                        theme: {
                            color: "#3399cc"
                        }
                    };
                    const rzp = new window.Razorpay(options);
                    rzp.open();
                } else {
                    setOrderError(paymentOrderRes.payload || 'Failed to create online payment order.');
                }
            }
        } catch (error) {
            console.error('Error placing order:', error);
            setOrderError(error.message || 'An unexpected error occurred during order placement.');
        } finally {
            setOrderLoading(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className='min-h-screen flex flex-col'>
                
                <main className='flex-grow container mx-auto px-4 py-8 flex items-center justify-center'>
                    <div className='bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full border border-gray-200'>
                        <h2 className='text-green-600 text-3xl font-bold mb-4'>Order Placed Successfully! 🎉</h2>
                        <p className='text-gray-700 mb-4'>Your order has been confirmed and is being processed.</p>
                        {placedOrderDetails && (
                            <p className='text-gray-600 text-sm mb-6'>
                                Order ID: <span className='font-mono font-semibold text-gray-800'>{placedOrderDetails._id}</span>
                            </p>
                        )}
                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                            <NavLink to={"/profile"} className='inline-block bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium'>
                                View My Orders
                            </NavLink>
                            <NavLink to={"/shop"} className='inline-block bg-gray-200 text-gray-700 py-2 px-6 rounded-full hover:bg-gray-300 transition-colors duration-200 font-medium'>
                                Continue Shopping
                            </NavLink>
                        </div>
                    </div>
                </main>
          
            </div>
        );
    }

  
    return (
        <div className='min-h-screen flex flex-col bg-gray-50 font-inter'>
           
            <main className='flex-grow container mx-auto px-4 py-8'>
                <h1 className='font-extrabold text-center text-4xl md:text-5xl mb-10 text-gray-900 tracking-tight'>Confirm & Pay</h1>
                <div className='flex flex-col lg:flex-row gap-8 bg-white rounded-xl shadow-lg p-6 md:p-8'>
                    <section className='lg:w-2/3 space-y-4'>
                        <h2 className='text-2xl font-semibold mb-6 text-gray-800 border-b pb-3'>Order Summary</h2>
                        <div className='bg-gray-50 p-4 rounded-lg shadow-sm mb-6 border border-gray-100'>
                            <h3 className='text-xl font-medium text-gray-700 mb-2'>Shipping Address</h3>
                            <p className='text-gray-600'>{shippingInfo.address}</p>
                            <p className='text-gray-600'>{shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}</p>
                            <p className='text-gray-600'>{shippingInfo.country}</p>
                            <button
                                onClick={() => navigate('/order')}
                                className='mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium underline'>
                                Edit Address
                            </button>
                        </div>
                        <div className='mb-6'>
                            <h3 className='text-xl font-medium text-gray-700 mb-3'>Items ({orderItems.length})</h3>
                            {orderItems.length > 0 ? (
                                <div className='space-y-4'>
                                    {orderItems.map(item => (
                                        <div key={`${item.product}-${item.qty}-${item.price}`} className='flex items-center gap-4 p-3 bg-gray-100 rounded-lg shadow-sm border border-gray-200'>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className='w-16 h-16 object-cover rounded-md border border-gray-200'
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/64x64/cccccc/333333?text=Item'; }}
                                            />
                                            <div className='flex-grow'>
                                                <p className='font-medium text-gray-800'>{item.name}</p>
                                                <p className='text-sm text-gray-500'>Qty: {item.qty}</p>
                                            </div>
                                            <p className='font-semibold text-gray-900'>${(item.price * item.qty).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className='text-center text-gray-500 text-lg py-8'>No items in this order.</p>
                            )}
                        </div>
                    </section>
                    <aside className='lg:w-1/3'>
                        <div className='p-6 border border-gray-200 rounded-xl shadow-md bg-gray-50 sticky top-28'>
                            <h2 className='text-2xl font-semibold mb-4 text-gray-800 border-b pb-3'>Payment & Total</h2>
                            <div className='space-y-4 text-gray-700 mb-6'>
                                <div className='flex justify-between text-xl font-bold text-gray-900'>
                                    <span>Total Payable</span>
                                    <span>${totalPrice?.toFixed(2)}</span>
                                </div>
                            </div>
                            <h3 className='text-lg font-medium text-gray-700 mb-3'>Select Payment Method</h3>
                            <div className='space-y-3 mb-6'>
                                <label className='flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200'>
                                    <input
                                        type='radio'
                                        name='paymentMethod'
                                        value='COD'
                                        checked={paymentMethod === 'COD'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className='form-radio h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500'
                                    />
                                    <span className='ml-3 text-lg font-medium text-gray-700'>Cash on Delivery (COD)</span>
                                </label>
                                <label className='flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200'>
                                    <input
                                        type='radio'
                                        name='paymentMethod'
                                        value='Razorpay'
                                        checked={paymentMethod === 'Razorpay'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className='form-radio h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500'
                                    />
                                    <span className='ml-3 text-lg font-medium text-gray-700'>Online Payment (Razorpay)</span>
                                </label>
                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                disabled={orderLoading || !orderItems.length}
                                className={`w-full py-3 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 ${orderLoading || !orderItems.length ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                                {orderLoading ? 'Processing...' : 'Place Order'}
                            </button>
                            {orderError && (
                                <p className='text-red-600 text-sm mt-4 text-center'>{orderError}</p>
                            )}
                        </div>
                    </aside>
                </div>
            </main>
            
        </div>
    );
};

export default Payment;
