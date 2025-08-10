import React, { useState } from 'react';
import CartItems from '../components/CartItems';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, updateItemQuantity, clearCart } from '../features/cart/cartSlice';
import { NavLink, useNavigate } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const cartProducts = useSelector((state) => state.cart.cartItems);

    // State for coupon input and applied coupon details
    const [couponCodeInput, setCouponCodeInput] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null); // Stores { code: 'FREESHIP', value: 10 } or similar
    const [couponError, setCouponError] = useState('');
    const [couponSuccessMessage, setCouponSuccessMessage] = useState('');

    // Function to handle removing an item from the cart via Redux action
    const handleRemoveItem = (idToRemove, sizeToRemove, colorToRemove) => {
        dispatch(removeItemFromCart({ id: idToRemove, selectedSize: sizeToRemove, selectedColor: colorToRemove }));
        // Reset coupon if cart changes significantly, or re-evaluate it
        setAppliedCoupon(null);
        setCouponError('');
        setCouponSuccessMessage('');
    };

    // Function to handle updating the quantity of an item in the cart via Redux action
    const handleUpdateQuantity = (idToUpdate, newQuantity, sizeToUpdate, colorToUpdate) => {
        dispatch(updateItemQuantity({ id: idToUpdate, newQuantity: newQuantity, selectedSize: sizeToUpdate, selectedColor: colorToUpdate }));
        // Reset coupon if cart changes significantly, or re-evaluate it
        setAppliedCoupon(null);
        setCouponError('');
        setCouponSuccessMessage('');
    };

    // Calculate order summary values based on the current cartProducts from Redux
    const subtotal = cartProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
    const baseDiscountPercentage = 0.20; // 20% base discount
    const baseDiscount = subtotal * baseDiscountPercentage;
    const deliveryFee = 15;

    // --- Coupon Logic ---
    let couponDiscountAmount = 0;
    let finalDeliveryFee = deliveryFee;
    if (appliedCoupon) {
        if (appliedCoupon.type === 'percentage') {
            couponDiscountAmount = subtotal * (appliedCoupon.value / 100);
        } else if (appliedCoupon.type === 'fixed') {
            couponDiscountAmount = appliedCoupon.value;
        } else if (appliedCoupon.type === 'freeship') {
            finalDeliveryFee = 0;
        }
    }

    // Total calculation including base discount and coupon discount
    const total = subtotal - baseDiscount - couponDiscountAmount + finalDeliveryFee;

    const handleApplyCoupon = () => {
        setCouponError('');
        setCouponSuccessMessage('');
        // Simulate API call for coupon validation
        setTimeout(() => {
            const code = couponCodeInput.trim().toUpperCase();
            if (code === 'SAVE10') {
                setAppliedCoupon({ code: 'SAVE10', type: 'fixed', value: 10 });
                setCouponSuccessMessage('Coupon "SAVE10" applied! You saved $10.');
            } else if (code === 'DISCOUNT15') {
                setAppliedCoupon({ code: 'DISCOUNT15', type: 'percentage', value: 15 });
                setCouponSuccessMessage('Coupon "DISCOUNT15" applied! You got 15% off.');
            } else if (code === 'FREESHIP') {
                setAppliedCoupon({ code: 'FREESHIP', type: 'freeship', value: deliveryFee }); // Value is the delivery fee it negates
                setCouponSuccessMessage('Coupon "FREESHIP" applied! Enjoy free delivery.');
            } else {
                setCouponError('Invalid coupon code. Please try again.');
                setAppliedCoupon(null);
            }
        }, 500); // Simulate network delay
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/order');
    };

    return (
        <main className='flex-grow container mx-auto px-4 py-8 md:py-12 bg-white font-inter'>
            <h1 className='font-extrabold text-center text-4xl md:text-5xl mb-10 text-gray-900 tracking-tight'>Your Shopping Cart</h1>

            <div className='flex flex-col lg:flex-row gap-8'>
                {/* Cart Items Section */}
                <section className='lg:w-2/3 space-y-4'>
                    <div className='bg-white rounded-xl shadow-lg p-6 md:p-8'>
                        <h2 className='text-2xl font-semibold mb-6 text-gray-800 border-b pb-3'>Items in Your Cart</h2>
                        {cartProducts.length > 0 ? (
                            <>
                                {cartProducts.map(product => (
                                    <CartItems
                                        key={`${product.id}-${product.selectedSize}-${product.selectedColor}`}
                                        product={product}
                                        onRemove={(id) => handleRemoveItem(id, product.selectedSize, product.selectedColor)}
                                        onUpdateQuantity={(id, newQty) => handleUpdateQuantity(id, newQty, product.selectedSize, product.selectedColor)}
                                    />
                                ))}
                                <div className='flex justify-end mt-6'>
                                    <button
                                        onClick={() => dispatch(clearCart())}
                                        className='px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 font-medium shadow-md'
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className='text-center py-16'>
                                <p className='text-gray-500 text-xl mb-4'>Your cart is empty!</p>
                                <NavLink to={"/shop"} className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                                    Start Shopping
                                </NavLink>
                            </div>
                        )}
                    </div>
                </section>

                {/* Order Summary Section */}
                {cartProducts.length > 0 && (
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

                                {/* Coupon Discount Row */}
                                {appliedCoupon && appliedCoupon.type !== 'freeship' && (
                                    <div className='flex justify-between text-green-700 font-medium'>
                                        <span className='text-base'>Coupon ({appliedCoupon.code})</span>
                                        <span className='text-base'>-${couponDiscountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                {appliedCoupon && appliedCoupon.type === 'freeship' && (
                                    <div className='flex justify-between text-green-700 font-medium'>
                                        <span className='text-base'>Delivery Discount ({appliedCoupon.code})</span>
                                        <span className='text-base'>-${deliveryFee.toFixed(2)}</span> {/* Show delivery fee as negated */}
                                    </div>
                                )}

                                <div className='flex justify-between'>
                                    <span className='text-base'>Delivery Fee</span>
                                    <span className='text-base font-medium'>
                                        {appliedCoupon && appliedCoupon.type === 'freeship' ? (
                                            <span className='line-through text-gray-400'>${deliveryFee.toFixed(2)}</span>
                                        ) : (
                                            `$${deliveryFee.toFixed(2)}`
                                        )}
                                    </span>
                                </div>
                                <div className='h-[1px] bg-gray-300 my-4'></div>
                                <div className='flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200'>
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className='flex flex-col sm:flex-row gap-3 mt-6'>
                                <input
                                    type="text"
                                    placeholder='Enter coupon code'
                                    className='flex-grow px-4 py-2 bg-white rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm placeholder-gray-400'
                                    value={couponCodeInput}
                                    onChange={(e) => setCouponCodeInput(e.target.value)}
                                />
                                <button
                                    onClick={handleApplyCoupon}
                                    className='bg-gray-800 text-white py-2 px-6 rounded-full hover:bg-gray-900 transition-colors duration-200 text-sm font-medium shadow-sm'
                                >
                                    Apply
                                </button>
                            </div>

                            {/* Coupon Messages */}
                            {couponError && (
                                <p className='text-red-600 text-sm mt-3 text-center'>{couponError}</p>
                            )}
                            {couponSuccessMessage && (
                                <p className='text-green-600 text-sm mt-3 text-center'>{couponSuccessMessage}</p>
                            )}

                            <button
                                className='w-full bg-indigo-600 text-white py-3 rounded-full mt-8 hover:bg-indigo-700 transition-colors duration-200 text-lg font-semibold shadow-lg transform hover:scale-105'
                                onClick={handleSubmit}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </aside>
                )}
            </div>
        </main>
    );
};

export default Cart;
