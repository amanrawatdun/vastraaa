import React from 'react';
import { NavLink } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const placeholderImage = 'https://placehold.co/400x400/e2e8f0/666?text=Image+Not+Found';

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:border-indigo-400 border border-gray-100">
            <NavLink to={`/item/${product._id}`}>
                <div className="w-full h-56 md:h-64 overflow-hidden">
                    <img
                        src={product.image?.url || placeholderImage}
                        alt={product.name || 'Product Image'}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                </div>
                <div className="p-5 text-center flex flex-col items-center">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                        {product.name || 'Product Name'}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 font-medium">
                        {product.brand || 'Brand'}
                    </p>
                    <div className="mt-3 text-xl font-bold text-black">
                        ₹{product.costPrice || '0'}
                    </div>
                </div>
            </NavLink>
        </div>
    );
};

export default ProductCard;
