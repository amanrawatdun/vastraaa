import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, getProductByBrand } from '../features/product/productSlice';
import DeliveryTruckLoader from '../components/DeliveryTruckLoader';

const Brand = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product);

    const [selectedBrand, setSelectedBrand] = useState('');
    const [uniqueBrands, setUniqueBrands] = useState([]);

    useEffect(() => {
        dispatch(getProduct()).then(res => {
            if (res.payload) {
                const brands = [...new Set(res.payload.map(p => p.brand))];
                setUniqueBrands(brands);
            }
        });
    }, [dispatch]);

    useEffect(() => {
        if (selectedBrand) {
            dispatch(getProductByBrand(selectedBrand));
        } else {
            dispatch(getProduct()); // Fetch all products if no brand is selected
        }
    }, [selectedBrand, dispatch]);

    return (
        <main className="flex-grow container mx-auto px-4 py-12 md:py-16 bg-gray-50 text-gray-800">
            {/* Header and Filter Section */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
                <h1 className="font-extrabold text-4xl md:text-5xl text-gray-900 tracking-tight mb-4 md:mb-0">
                    Shop by Brand
                </h1>
                <div className="relative">
                    <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="block w-full md:w-64 appearance-none bg-white border border-gray-300 rounded-full py-3 px-6 pr-10 text-lg text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    >
                        <option value="">All Brands</option>
                        {uniqueBrands.map((brand, index) => (
                            <option key={index} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                        <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z"/>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Product Grid Section */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <p>Loading dashboard...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col justify-center items-center py-20 bg-white rounded-xl shadow-lg border border-gray-200 mx-auto max-w-md">
                    <p className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</p>
                    <p className="text-md text-gray-500">Error: Failed to fetch products.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-white rounded-xl shadow-lg border border-gray-200">
                            <p className="text-2xl font-semibold text-gray-500">No products found for this brand.</p>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
};

export default Brand;
