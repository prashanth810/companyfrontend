// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="w-full fixed top-0 left-0 py-4 bg-slate-900 text-white z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <h2 className="text-2xl font-semibold tracking-wide">
                    startup <span className="font-bold">RANKING</span>
                </h2>

                {/* Menu */}
                <div className="hidden md:flex space-x-6 text-sm font-medium">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-blue-400 font-semibold" : "hover:text-gray-300"
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/companieslist"
                        className={({ isActive }) =>
                            isActive ? "text-blue-400 font-semibold" : "hover:text-gray-300"
                        }
                    >
                        Companies
                    </NavLink>

                    <NavLink
                        to="/startups"
                        className={({ isActive }) =>
                            isActive ? "text-blue-400 font-semibold" : "hover:text-gray-300"
                        }
                    >
                        Startups
                    </NavLink>

                    <NavLink
                        to="/best"
                        className={({ isActive }) =>
                            isActive ? "text-blue-400 font-semibold" : "hover:text-gray-300"
                        }
                    >
                        Best Companies
                    </NavLink>

                    <NavLink
                        to="/trending"
                        className={({ isActive }) =>
                            isActive ? "text-blue-400 font-semibold" : "hover:text-gray-300"
                        }
                    >
                        Trending
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
