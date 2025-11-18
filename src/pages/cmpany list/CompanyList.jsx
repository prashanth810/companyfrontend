import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallcompanydata } from "../../redux/slices/CompanylistSlice";
import { Search, ArrowLeft, ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import Loaderpage from "../../componenets/loader/Loaderpage";

const CompanyList = () => {
    const dispatch = useDispatch();

    const { companyloading, companyerror, companydata } = useSelector(
        (state) => state.company.companydata
    );

    // 🔍 Search & Filter States (User input)
    const [searchInput, setSearchInput] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState("");


    // 🎯 Debounced values (actual filtering happens on these)
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [debouncedIndustry, setDebouncedIndustry] = useState("");

    // 🔢 Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const allIndustries = [...new Set(companydata?.data?.map((item) => item.industry))];

    useEffect(() => {
        dispatch(getallcompanydata());
    }, []);

    // 🕒 DEBOUNCE for Search (600ms)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchInput);
        }, 600);

        return () => clearTimeout(timer);
    }, [searchInput]);

    // 🕒 DEBOUNCE for Industry (600ms)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedIndustry(selectedIndustry);
        }, 600);

        return () => clearTimeout(timer);
    }, [selectedIndustry]);


    // 🔍 FILTER COMPANIES
    const filteredData = companydata?.data?.filter((item) => {
        const value = debouncedSearch.toLowerCase();

        const matchSearch =
            item.companyName.toLowerCase().includes(value) ||
            item.city.toLowerCase().includes(value) ||
            item.state.toLowerCase().includes(value) ||
            item.country.toLowerCase().includes(value);

        const matchIndustry = debouncedIndustry ? item.industry === debouncedIndustry : true;

        return matchSearch && matchIndustry;
    }) || [];


    // 🔢 PAGINATION LOGIC
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    // 🔄 Page Change
    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, debouncedIndustry]);


    return (
        <section className="max-w-7xl mx-auto px-4 py-10">

            {/* Heading + Search + Dropdown */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">All Companies</h2>

                <div className="flex items-center gap-3">

                    {/* Search Box */}
                    <div className="w-full max-w-lg flex items-center gap-3 px-3 py-2 rounded-md border border-[#464444]">
                        <Search size={18} color="gray" />
                        <input
                            type="text"
                            placeholder="Search company name or location"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="flex-1 outline-none text-sm text-white placeholder:text-gray-400 bg-transparent"
                        />
                    </div>

                    {/* Industry Dropdown */}
                    <select
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                        className="bg-transparent border border-[#464444] text-white text-sm px-3 py-2 rounded outline-none"
                    >
                        <option value="" className="text-black">All Industries</option>
                        {allIndustries?.map((ind, index) => (
                            <option key={index} value={ind} className="text-black">{ind}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Error */}
            {companyerror && <p className="text-center text-red-500">{companyerror}</p>}

            {/* Loader */}
            {companyloading && (
                <div className="w-full h-screen flex items-center justify-center">
                    <Loaderpage />
                </div>
            )}

            {/* Company Cards */}
            {!companyloading && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 gap-x-3">
                        {paginatedData.map((item) => (
                            <div
                                key={item._id}
                                className="bg-transparent text-white rounded-sm flex flex-col gap-y-2 
                                transition-all duration-500 overflow-hidden 
                                hover:shadow-[0_0_8px_0_#474747]"
                            >
                                <NavLink to={`/company/${item._id}`}>
                                    <img
                                        src={item.coverImage}
                                        alt={item.companyName}
                                        className="w-full h-40 object-cover"
                                    />
                                </NavLink>

                                <div className="p-3">
                                    <h3 className="text-lg font-semibold">{item.companyName}</h3>

                                    <p className="text-sm mt-1">
                                        {item.city}, {item.state}, {item.country}
                                    </p>

                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-yellow-500 text-lg">★</span>
                                        <span className="text-sm">{item.rating}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* PAGINATION */}
                    {filteredData.length > itemsPerPage && (
                        <div className="flex items-center justify-end gap-5 mt-10">

                            <button
                                onClick={goToPrevPage}
                                disabled={currentPage === 1}
                                className={`px-3 py-2 border border-gray-500 rounded 
                                    ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-700"}`}
                            >
                                <ArrowLeft size={18} color="white" />
                            </button>

                            <span className="text-white">
                                {currentPage} of {totalPages}
                            </span>

                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-2 border border-gray-500 rounded 
                                    ${currentPage === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-700"}`}
                            >
                                <ArrowRight size={18} color="white" />
                            </button>
                        </div>
                    )}
                </>
            )}

        </section>
    );
};

export default CompanyList;
