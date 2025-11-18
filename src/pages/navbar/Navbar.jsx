// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="w-full fixed top-0 left-0 py-4 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <h2 className="text-2xl font-semibold tracking-wide">
                    startup <span className="font-bold">RANKING</span>
                </h2>

                {/* Menu */}
                <nav className="hidden md:flex space-x-6 text-sm font-medium">
                    <Link to={'/'} className="hover:text-gray-200">Home</Link>
                    <Link to={'/companieslist'} className="hover:text-gray-200">Companies</Link>
                    <a href="#" className="hover:text-gray-200">Startups</a>
                    <a href="#" className="hover:text-gray-200">Trending</a>
                    <a href="#" className="hover:text-gray-200">Best Companies</a>
                </nav>
            </div>
        </nav>
    );
};

export default Navbar;
