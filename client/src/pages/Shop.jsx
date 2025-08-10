import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import {  getProductByPages } from '../features/product/productSlice';
import DeliveryTruckLoader from '../components/DeliveryTruckLoader';

const Shop = () => {
    const dispatch = useDispatch();
   
    const { products, loading, error, currentPage, totalPages } = useSelector((state) => state.product);
    
   
    const [page, setPage] = useState(1);
    
   
    const limit = 8;

   
    useEffect(() => {
        dispatch(getProductByPages({ page: 1, limit: limit }));
    }, [dispatch]);

    
    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        setPage(nextPage);
        dispatch(getProductByPages({ page: nextPage, limit: limit }));
    };

 
    const hasMore = currentPage < totalPages;

    return (
        <main className='flex-grow container mx-auto px-4 py-12 md:py-16 bg-gray-50 text-gray-800'>
           
            <div className='text-center mb-12 md:mb-16'>
                <h1 className='font-extrabold text-4xl md:text-5xl text-gray-900 tracking-tight mb-4'>
                    Shop Our Collection
                </h1>
                <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                    Explore our curated selection of high-quality apparel and accessories. Find unique styles that match your personality.
                </p>
            </div>

            {loading && products.length === 0 ? (
                <div className="flex justify-center items-center py-20">
                    <p className='text-xl font-bold text-gray-100'>Loading .....</p>
                </div>
            ) : error ? (
                <div className="flex flex-col justify-center items-center py-20 bg-white rounded-xl shadow-lg border border-gray-200 mx-auto max-w-md">
                    <p className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</p>
                    <p className="text-md text-gray-500">Error: Failed to fetch products. Please try again later.</p>
                </div>
            ) : (
                <>
                   
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8'>
                        {products && products.length > 0 ? (
                            products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        ) : (
                            <div className='col-span-full text-center py-20 bg-white rounded-xl shadow-lg border border-gray-200'>
                                <p className='text-2xl font-semibold text-gray-500'>No products available at the moment.</p>
                            </div>
                        )}
                    </div>

                    {/* "Load More" Button */}
                    {hasMore && (
                        <div className="flex justify-center mt-12">
                            <button
                                onClick={handleLoadMore}
                                disabled={loading}
                                className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform
                                    ${loading 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg'
                                    }`}
                            >
                                {loading ? 'Loading...' : 'Load More Products'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </main>
    );
};

export default Shop;
