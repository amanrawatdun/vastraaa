import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-gray-100 text-gray-600 py-12 px-6 rounded-t-3xl'>

         
            <div className='max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-5 gap-8 md:gap-12 lg:gap-16'>

                
                <div className='md:col-span-2'>
                    <h1 className='text-2xl font-bold text-gray-900'>Vastraa.com</h1>
                    <p className='mt-3 text-sm text-gray-500 leading-relaxed'>
                        We have clothes that suit your style and which you're proud to wear, from women to men.
                    </p>
                </div>

               
                <div>
                    <h2 className='text-lg font-semibold text-gray-800 mb-4'>COMPANY</h2>
                    <ul className='space-y-2 text-sm'>
                        <li><a href="#" className='hover:text-indigo-600 transition-colors duration-200'>About</a></li>
                        <li><a href="#" className='hover:text-indigo-600 transition-colors duration-200'>Features</a></li>
                        <li><a href="#" className='hover:text-indigo-600 transition-colors duration-200'>Works</a></li>
                        <li><a href="#" className='hover:text-indigo-600 transition-colors duration-200'>Career</a></li>
                    </ul>
                </div>

              
                <div>
                    <h2 className='text-lg font-semibold text-gray-800 mb-4'>HELP</h2>
                    <ul className='space-y-2 text-sm'>
                        <li><a href="#" className='hover:text-indigo-600 transition-colors duration-200'>Customer Support</a></li>
                        <li><a href="#" className='hover:text-indigo-600 transition-colors duration-200'>Delivery Details</a></li>
                        <li><a href="#" className='hover:text-indigo-600 transition-colors duration-200'>Terms & Conditions</a></li>
                        <li><a href="#" className='hover:text-indigo-600 transition-colors duration-200'>Privacy Policy</a></li>
                    </ul>
                </div>

               
                <div>
                    <h2 className='text-lg font-semibold text-gray-800 mb-4'>FAQ</h2>
                    <ul className='space-y-2 text-sm'>
                        <li><a href="#" className='hover:text-indigo-600 transition-colors duration-200'>Account</a></li>
                        <li><a href="#" className='hover:text-indigo-600 transition-colors duration-200'>Manage Deliveries</a></li>
                        <li><a href="#" className='hover:text-indigo-600 transition-colors duration-200'>Orders</a></li>
                        <li><a href="#" className='hover:text-indigo-600 transition-colors duration-200'>Payments</a></li>
                    </ul>
                </div>
            </div>

        
            <div className='h-[1px] bg-gray-300 my-10 max-w-7xl mx-auto'></div>

           
            <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-500'>
                <p>&copy; 2025 Vastraa. All Rights Reserved.</p>
                <p className='mt-4 md:mt-0'>VISA • PAYPAL</p>
            </div>

        </footer>
    );
};

export default Footer;
