import React, { useState, useEffect } from 'react';

const CartItems = ({ product, onRemove, onUpdateQuantity }) => {
    const [quantity, setQuantity] = useState(product.quantity || 1);

    useEffect(() => {
        if (product.quantity !== quantity) {
            setQuantity(product.quantity);
        }
    }, [product.quantity]);

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            if (onUpdateQuantity) {
                onUpdateQuantity(product.id, newQuantity);
            }
        }
    };

    const handleIncreaseQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        if (onUpdateQuantity) {
            onUpdateQuantity(product.id, newQuantity);
        }
    };

    const handleRemove = () => {
        if (onRemove) {
            onRemove(product.id);
        }
    };

    return (
        <div className='flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-md p-4 gap-4 border border-gray-200'>
            <div className='flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden'>
                <img
                    src={product.image}
                    alt={product.name}
                    className='w-full h-full object-cover'
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/128x128/cccccc/333333?text=No+Image'; }}
                />
            </div>

            <div className='flex-grow text-center sm:text-left'>
                <h2 className='text-lg sm:text-xl font-semibold text-gray-800 mb-1'>{product.name}</h2>
                <p className='text-sm text-gray-500'>Size: {product.size}</p>
                <p className='text-sm text-gray-500'>Color: {product.color}</p>

                <button
                    onClick={handleRemove}
                    className='mt-2 text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-200'
                >
                    Remove
                </button>
            </div>

            <div className='flex flex-col sm:flex-row items-center sm:items-end sm:justify-end gap-4 mt-4 sm:mt-0'>
                <h3 className='text-xl font-bold text-gray-900'>${(product.price * quantity).toFixed(2)}</h3>
                <div className='flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1'>
                    <button
                        onClick={handleDecreaseQuantity}
                        className='text-gray-600 hover:text-gray-900 text-lg font-semibold w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-200'
                    >
                        -
                    </button>
                    <span className='text-md font-medium text-gray-800'>{quantity}</span>
                    <button
                        onClick={handleIncreaseQuantity}
                        className='text-gray-600 hover:text-gray-900 text-lg font-semibold w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-200'
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
