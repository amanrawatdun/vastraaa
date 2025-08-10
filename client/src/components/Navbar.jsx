import React, { useEffect, useState } from 'react';
import { FaCircleUser, FaCartShopping, FaBars, FaXmark } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { getProduct, getProductBySearch } from '../features/product/productSlice';

const Navbar = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Check if the current path is the home page
    const isHomePage = true;
    // const isHomePage = location.pathname === '/shop';


    const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== "") {
            dispatch(getProductBySearch(searchTerm));
            setSearchTerm('')
        } else {
            dispatch(getProduct());
        }
    };

   

    const linkClasses = ({ isActive }) =>
        `font-semibold hover:text-indigo-600 transition-colors duration-200 ${
            isActive ? 'text-indigo-600 underline underline-offset-4' : 'text-gray-700'
        }`;

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white shadow-lg font-inter">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo/Brand link */}
                <NavLink to={"/"} className="font-extrabold text-3xl tracking-tight text-gray-900 hover:text-indigo-600 transition-colors duration-200" aria-label="VAstraaa - Homepage">
                    Vastraaa
                </NavLink>

                {/* Main navigation links (hidden on mobile) */}
                <ul className="hidden md:flex items-center space-x-8">
                    <li><NavLink to={"/shop"} className={linkClasses} aria-label="Shop our collection">Shop</NavLink></li>
                    <li><NavLink to={"/sale"} className={linkClasses} aria-label="View items on sale">On Sale</NavLink></li>
                    <li><NavLink to={"/new-arrivals"} className={linkClasses} aria-label="Explore new arrivals">New Arrivals</NavLink></li>
                    <li><NavLink to={'/brand'} className={linkClasses} aria-label="Shop by brands">Brand</NavLink></li>
                </ul>

                {/* Search form and icons */}
                <div className="flex items-center space-x-4">
                    
                    {isHomePage && (
                        <form className="relative items-center hidden md:flex  " onSubmit={handleSearchSubmit}>
                            <input
                                type="search"
                                placeholder="men or women or kid"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-45 pl-4 pr-10 py-2 border border-gray-300 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-colors duration-200"
                            />
                            <button type="submit" className="absolute right-2 text-gray-500 hover:text-indigo-600">
                                <FiSearch className="h-5 w-5" />
                            </button>
                        </form>
                    )}

                    {/* Cart icon with badge */}
                    <NavLink to={"/cart"} className=" relative  text-gray-700 hover:text-indigo-600 transition-colors duration-200" aria-label="View shopping cart">
                        <div className='relative'>
                            <FaCartShopping className="h-6 w-6 transform hover:scale-110" />
                            {totalCartQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalCartQuantity}
                                </span>
                            )}
                        </div>
                    </NavLink>

                    
                    
                        <NavLink to={"/profile"} className="text-gray-700 hover:text-indigo-600 transition-colors duration-200 hidden md:block" aria-label="User profile">
                            <FaCircleUser className="h-6 w-6 transform hover:scale-110" />
                        </NavLink>
                   
                    
                    {/* Mobile menu button */}
                    <button onClick={handleMenuToggle} className="md:hidden text-gray-700 hover:text-indigo-600">
                        {isMenuOpen ? <FaXmark className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu overlay */}
            <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
                <div className="flex flex-col h-full p-6">
                    <div className="flex justify-between items-center mb-8">
                        <NavLink to={"/"} className="font-extrabold text-3xl tracking-tight text-gray-900" onClick={handleLinkClick}>VAstraaa</NavLink>
                        <button onClick={handleMenuToggle} className="text-gray-700 hover:text-indigo-600">
                            <FaXmark className="h-6 w-6" />
                        </button>
                    </div>
                    <ul className="flex flex-col space-y-4 text-xl">
                        <li><NavLink to={"/shop"} className="block py-2" onClick={handleLinkClick}>Shop</NavLink></li>
                        <li><NavLink to={"/sale"} className="block py-2" onClick={handleLinkClick}>On Sale</NavLink></li>
                        <li><NavLink to={"/new-arrivals"} className="block py-2" onClick={handleLinkClick}>New Arrivals</NavLink></li>
                        <li><NavLink to={'/brand'} className="block py-2" onClick={handleLinkClick}>Brand</NavLink></li>
                        <li><NavLink to={'/profile'} className="block py-2" onClick={handleLinkClick}>Profile</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
