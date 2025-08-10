import React from 'react';
import { NavLink } from 'react-router-dom';
import casual from '../assets/casual_image.webp';
import party from '../assets/formal_image.jpg';
import formal from '../assets/formal2_image.jpg';
import gym from '../assets/gym_image.webp';

const styles = [
    { src: casual, label: 'Casual' },
    { src: formal, label: 'Formal' },
    { src: party, label: 'Party' },
    { src: gym, label: 'Gym' },
];

const DressStyle = () => {
    return (
        <section className="bg-gray-200 mx-4 lg:mx-8 my-10 rounded-3xl py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
                BROWSE BY DRESS STYLE
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
                {styles.map((style, index) => (
                    
                    <NavLink
                        key={index}
                        to="/shop"
                        className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                      
                        <img
                            src={style.src}
                            alt={style.label}
                            className="w-full h-full aspect-[4/5] object-cover transition-transform duration-300 group-hover:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end justify-center pb-5">
                            <span className="text-white text-xl font-semibold tracking-wide transition duration-300 group-hover:scale-105">
                                {style.label}
                            </span>
                        </div>
                    </NavLink>
                ))}
            </div>
        </section>
    );
};

export default DressStyle;
