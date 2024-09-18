import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="min-h-screen bg-blue-800 flex flex-col items-center justify-center">
            <header className="text-center">
                <h1 className="text-5xl font-bold text-white mb-4">Welcome to Portier</h1>
                <p className="text-xl text-white mb-8">
                    Simplifying key and lock system management for your buildings
                </p>
                <Link
                    to="/login"
                    className="bg-white text-black hover:bg-white font-bold py-3 px-6 rounded-full"
                >
                    Get Started
                </Link>
            </header>

            <section className="mt-16 text-center">
                <h2 className="text-white text-3xl font-semibold mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="p-6 bg-white shadow-md rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">Secure Management</h3>
                        <p className="text-gray-600">Keep all your access keys and locks secure with our advanced management system.</p>
                    </div>
                    <div className="p-6 bg-white shadow-md rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">Real-Time Updates</h3>
                        <p className="text-gray-600">Monitor and control access in real-time for complete peace of mind.</p>
                    </div>
                    <div className="p-6 bg-white shadow-md rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">Easy Integration</h3>
                        <p className="text-gray-600">Seamlessly integrate with existing systems for hassle-free setup and use.</p>
                    </div>
                </div>
            </section>

            <footer className="mt-16 text-center">
                <p className="text-white">© 2024 Portier. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;
