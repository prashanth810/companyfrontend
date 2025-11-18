// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* NAVBAR */}
            <nav className="w-full fixed top-0 left-0 py-4 bg-slate-900 text-white z-50 shadow-md">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                    {/* Logo */}
                    <h2 className="text-2xl font-semibold tracking-wide">
                        startup <span className="font-bold">RANKING</span>
                    </h2>

                    {/* Desktop Menu */}
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

                    {/* Mobile Menu Toggle Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setOpen(true)}
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </nav>

            {/* MOBILE SIDEBAR (Right Side) */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-slate-800 text-white shadow-lg transform 
                ${open ? "translate-x-0" : "translate-x-full"} 
                transition-transform duration-300 z-50`}
            >
                {/* Close Button */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
                    <h3 className="text-lg font-semibold">Menu</h3>
                    <button onClick={() => setOpen(false)}>
                        <X size={26} />
                    </button>
                </div>

                {/* Sidebar Links */}
                <div className="flex flex-col gap-5 px-6 mt-6 text-sm">

                    <NavLink
                        to="/"
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                            isActive ? "text-blue-400 font-semibold" : "hover:text-gray-300"
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/companieslist"
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                            isActive ? "text-blue-400 font-semibold" : "hover:text-gray-300"
                        }
                    >
                        Companies
                    </NavLink>

                    <NavLink
                        to="/startups"
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                            isActive ? "text-blue-400 font-semibold" : "hover:text-gray-300"
                        }
                    >
                        Startups
                    </NavLink>

                    <NavLink
                        to="/best"
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                            isActive ? "text-blue-400 font-semibold" : "hover:text-gray-300"
                        }
                    >
                        Best Companies
                    </NavLink>

                    <NavLink
                        to="/trending"
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                            isActive ? "text-blue-400 font-semibold" : "hover:text-gray-300"
                        }
                    >
                        Trending
                    </NavLink>
                </div>
            </div>

            {/* BACKDROP (Dark Overlay when menu open) */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                ></div>
            )}
        </>
    );
};

export default Navbar;
