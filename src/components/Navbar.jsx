import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Search, Heart, User, Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

        return (
            <nav className="sticky top-0 w-full z-30 bg-white py-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex-shrink-0 flex items-center"
                                onClick={() => navigate('/')}
                            >
                                <div className="h-12 w-12 rounded-md flex items-center justify-center text-xs text-gray-500">
                                    <img src='/assets/logo.png' className='w-full h-full' alt="Logo" />
                                </div>
                                <span className="text-3xl font-medium text-gray-900">PROFO</span>
                            </motion.div>
                        </div>

                        {/* Desktop menu */}
                        {/* <div className="hidden md:flex items-center space-x-1">
                            <div className="relative group">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                                >
                                    Properties <ChevronDown className="ml-1 h-4 w-4" />
                                </motion.button>
                                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50">All Properties</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50">Houses</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50">Apartments</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50">Villas</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50">Commercial</a>
                                </div>
                            </div>

                            <div className="relative group">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                                >
                                    Locations <ChevronDown className="ml-1 h-4 w-4" />
                                </motion.button>
                                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50">New York</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50">Los Angeles</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50">Miami</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50">Chicago</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50">View All</a>
                                </div>
                            </div>

                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#"
                                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                            >
                                Agents
                            </motion.a>

                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#"
                                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                            >
                                About
                            </motion.a>

                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#"
                                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                            >
                                Contact
                            </motion.a>
                        </div> */}

                        <div className="hidden md:flex items-center space-x-4">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                href="tel:+1234567890"
                                className="flex items-center text-sm font-medium text-gray-700"
                            >
                                <Phone className="h-4 w-4 mr-1" />
                                (123) 456-7890
                            </motion.a>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-full text-gray-500 hover:text-emerald-600 hover:bg-gray-100"
                            >
                                <Search className="h-5 w-5" />
                            </motion.button>

                            {/* <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-full text-gray-500 hover:text-emerald-600 hover:bg-gray-100"
                                onClick={() => navigate('/wishlist')}
                            >
                                <Heart className="h-5 w-5" />
                            </motion.button> */}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#059669] hover:bg-[#047857]"
                                onClick={() => navigate('/signup')}
                            >
                                <User className="h-4 w-4 mr-2" />
                                Sign In
                            </motion.button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none"
                            >
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <motion.div
                    initial={false}
                    animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden overflow-hidden bg-white shadow-lg"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">Home</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">Properties</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">Locations</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">Agents</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">About</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">Contact</a>
                        <div className="flex items-center space-x-4 px-3 py-2">
                            <button className="p-2 rounded-full text-gray-500 hover:text-emerald-600 hover:bg-gray-100">
                                <Search className="h-5 w-5" />
                            </button>
                            <button className="p-2 rounded-full text-gray-500 hover:text-emerald-600 hover:bg-gray-100">
                                <Heart className="h-5 w-5" />
                            </button>
                        </div>
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#059669] hover:bg-[#047857]">
                            <User className="h-4 w-4 mr-2" />
                            Sign In
                        </button>
                    </div>
                </motion.div>
            </nav>
        );
};

export default Navbar;