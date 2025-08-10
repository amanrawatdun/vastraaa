import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getSaleProducts } from '../features/product/productSlice';
import DeliveryTruckLoader from '../components/DeliveryTruckLoader';

const Sale = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getSaleProducts());
    }, [dispatch]);

    return (
        <main className='flex-grow container mx-auto px-4 py-12 md:py-16 bg-gray-50 text-gray-800'>
            {/* Hero Section */}
            <div className='text-center mb-12 md:mb-16'>
                <h1 className='font-extrabold text-4xl md:text-5xl text-red-600 tracking-tight mb-4'>
                    Flash Sale! ⚡️
                </h1>
                <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                    Don't miss out on incredible deals! Shop our limited-time sales and grab your favorites before they're gone.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <p>Loading dashboard...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col justify-center items-center py-20 bg-white rounded-xl shadow-lg border border-gray-200 mx-auto max-w-md">
                    <p className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</p>
                    <p className="text-md text-gray-500">Error: Failed to fetch products. Please try again later.</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8'>
                    {products && products.length > 0 ? (
                        products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <div className='col-span-full text-center py-20 bg-white rounded-xl shadow-lg border border-gray-200'>
                            <p className='text-2xl font-semibold text-gray-500'>No sale items available at the moment.</p>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
};

export default Sale;
