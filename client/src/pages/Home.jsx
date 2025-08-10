import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import DressStyle from '../components/DressStyle';
import Reviews from '../components/Reviews';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../features/product/productSlice';

const Home = () => {
    const { products } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    const newArrival = products.slice(0, 4);
    const topSelling = products.slice(4, 8);

    

    return (
        <div className="bg-gray-50 text-gray-800 font-sans">
            <HeroSection />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* New Arrivals Section */}
                <section className="py-12">
                    <h2 className="font-bold text-3xl md:text-4xl text-center text-gray-900 mb-8">
                        NEW ARRIVALS
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {newArrival.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </section>

                {/* Top Selling Section */}
                <section className="py-12">
                    <h2 className="font-bold text-3xl md:text-4xl text-center text-gray-900 mb-8">
                        TOP SELLING
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {topSelling.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </section>
            </main>

            <DressStyle />
            <Reviews />
        </div>
    );
};

export default Home;
