import React from 'react';
import modelimg from '../assets/modelimg.png';
import { NavLink } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="bg-gray-100 rounded-3xl mx-4 lg:mx-8 mt-6">
            <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
                {/* Left Content */}
                <div className="flex flex-col justify-center items-center md:items-start md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                        FIND CLOTHES THAT MATCHES YOUR STYLE
                    </h1>
                    <p className="mt-4 mb-8 text-lg text-gray-600">
                        Browse our collection of high-quality apparel from top brands.
                    </p>
                    <div>
                        <NavLink 
                            to={'/shop'} 
                            className='py-3 px-12 rounded-full bg-black text-white font-semibold text-lg hover:bg-gray-800 transition-colors duration-200'
                        >
                            Shop Now
                        </NavLink>
                    </div>
                    
                    {/* Stats Section */}
                    <div className='flex flex-col sm:flex-row justify-center sm:justify-start items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-8'>
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-900">
                                200+
                            </h1>
                            <span className="text-gray-500">International Brands</span>
                        </div>
                        <div className='border-l-2 border-gray-300 h-10 hidden sm:block'></div>
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-900">
                                2,000+
                            </h1>
                            <span className="text-gray-500">High-Quality Products</span>
                        </div>
                        <div className='border-l-2 border-gray-300 h-10 hidden sm:block'></div>
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-900">
                                30,000+
                            </h1>
                            <span className="text-gray-500">Happy Customers</span>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="flex justify-center md:w-1/2">
                    <img
                        src={modelimg}
                        alt="A couple wearing trendy clothes"
                        className="w-full max-w-sm md:max-w-md lg:max-w-lg object-cover"
                    />
                </div>
            </div>

            {/* Brands Section */}
            <div className='flex flex-wrap items-center justify-around px-4 md:px-8 py-4 bg-black text-white rounded-b-3xl'>
                <span className='text-sm sm:text-xl lg:text-3xl font-bold font-serif my-2'>VERSACE</span>
                <span className='text-sm sm:text-xl lg:text-3xl font-bold font-serif my-2'>ZARA</span>
                <span className='text-sm sm:text-xl lg:text-3xl font-bold font-serif my-2'>GUCCI</span>
                <span className='text-sm sm:text-xl lg:text-3xl font-bold font-serif my-2'>PRADA</span>
                <span className='text-sm sm:text-xl lg:text-3xl font-bold font-serif my-2'>CALVIN KLEIN</span>
            </div>
        </section>
    );
};

export default HeroSection;
