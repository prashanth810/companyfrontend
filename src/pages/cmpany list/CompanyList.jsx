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

    // Search & industry
    const [searchInput, setSearchInput] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState("");

    // Debounced states
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [debouncedIndustry, setDebouncedIndustry] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const allIndustries = [...new Set(companydata?.data?.map((item) => item.industry))];

    useEffect(() => {
        dispatch(getallcompanydata());
    }, [dispatch]);

    // Debounce Search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchInput);
        }, 600);
        return () => clearTimeout(timer);
    }, [searchInput]);

    // Debounce Industry
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedIndustry(selectedIndustry);
        }, 600);
        return () => clearTimeout(timer);
    }, [selectedIndustry]);

    // Filter Companies
    const filteredData =
        companydata?.data?.filter((item) => {
            const value = debouncedSearch.toLowerCase();

            const matchSearch =
                item.companyName.toLowerCase().includes(value) ||
                item.city.toLowerCase().includes(value) ||
                item.state.toLowerCase().includes(value) ||
                item.country.toLowerCase().includes(value);

            const matchIndustry = debouncedIndustry ? item.industry === debouncedIndustry : true;

            return matchSearch && matchIndustry;
        }) || [];

    // Pagination Logic
    const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, debouncedIndustry]);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((p) => p + 1);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage((p) => p - 1);
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Search Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-xl font-semibold text-white">All Companies</h2>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                    {/* Search Input */}
                    <div className="flex items-center gap-3 px-3 py-2 rounded-md border border-[#464444] w-full sm:w-[420px] bg-transparent">
                        <Search size={18} color="gray" />
                        <input
                            type="text"
                            placeholder="Search company name or location"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="flex-1 outline-none text-sm text-white placeholder:text-gray-400 bg-transparent"
                            aria-label="Search companies"
                        />
                    </div>

                    {/* Industry Dropdown */}
                    <select
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                        className="bg-transparent border border-[#464444] text-white text-sm px-3 py-2 rounded outline-none min-w-[160px]"
                        aria-label="Filter by industry"
                    >
                        <option value="">All Industries</option>
                        {allIndustries?.map((ind, index) => (
                            <option key={index} value={ind} className="text-black">
                                {ind}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Error */}
            {companyerror && <p className="text-center text-red-500 mb-6">{companyerror}</p>}

            {/* Loader */}
            {companyloading && (
                <div className="w-full h-[60vh] flex items-center justify-center">
                    <Loaderpage />
                </div>
            )}

            {/* No Data */}
            {!companyloading && filteredData.length === 0 && (
                <p className="text-center text-sm text-gray-400 mt-10">No companies found.</p>
            )}

            {/* Company Cards */}
            {!companyloading && filteredData.length > 0 && (
                <>
                    <div
                        className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-3
              xl:grid-cols-4
              gap-4
            "
                    >
                        {paginatedData.map((item) => (
                            <article
                                key={item._id}
                                className="bg-transparent text-white rounded-md overflow-hidden shadow-sm transition-transform transform hover:-translate-y-1 hover:shadow-lg"
                            >
                                <NavLink to={`/company/${item._id}`} className="block">
                                    <img
                                        src={item.coverImage}
                                        alt={item.companyName}
                                        className="w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[200px] object-cover"
                                        loading="lazy"
                                    />
                                </NavLink>

                                <div className="p-3">
                                    <h3 className="text-base sm:text-lg font-semibold leading-tight">
                                        {item.companyName}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-gray-300 mt-1">
                                        {item.city}, {item.state}
                                        {item.country ? `, ${item.country}` : ""}
                                    </p>

                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-yellow-400 text-lg">★</span>
                                            <span className="text-sm">{item.rating}</span>
                                        </div>

                                        <NavLink
                                            to={`/company/${item._id}`}
                                            className="text-xs sm:text-sm px-2 py-1 rounded bg-white/5 hover:bg-white/10"
                                        >
                                            View
                                        </NavLink>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Pagination */}
                    {filteredData.length > itemsPerPage && (
                        <div className="flex items-center justify-between sm:justify-end gap-4 mt-8">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={goToPrevPage}
                                    disabled={currentPage === 1}
                                    className={`p-2 border rounded ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-800"}`}
                                    aria-label="Previous page"
                                >
                                    <ArrowLeft size={18} color="white" />
                                </button>

                                <span className="text-sm text-gray-300">
                                    {currentPage} / {totalPages}
                                </span>

                                <button
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`p-2 border rounded ${currentPage === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-800"}`}
                                    aria-label="Next page"
                                >
                                    <ArrowRight size={18} color="white" />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default CompanyList;
