import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallcompanydata } from "../../redux/slices/CompanylistSlice";
import { Search, ArrowLeft, ArrowRight } from "lucide-react";
import Loaderpage from "../../componenets/loader/Loaderpage";
import Startup from "./Startup";
import BestCompanies from "./BestCompanies";
import TrendingCompanies from "./TrendingCompanies";


const TocompaniesList = () => {
    const dispatch = useDispatch();

    const { companyloading, companyerror, companydata } = useSelector(
        (state) => state.company.companydata
    );

    const [searchInput, setSearchInput] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState("");

    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [debouncedIndustry, setDebouncedIndustry] = useState("");

    const [filterLoading, setFilterLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const allIndustries = [...new Set(companydata?.data?.map((item) => item.industry))];

    useEffect(() => {
        dispatch(getallcompanydata());
    }, []);

    // Debounce search
    useEffect(() => {
        setFilterLoading(true);
        const timer = setTimeout(() => {
            setDebouncedSearch(searchInput);
            setFilterLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [searchInput]);

    // Debounce dropdown
    useEffect(() => {
        setFilterLoading(true);
        const timer = setTimeout(() => {
            setDebouncedIndustry(selectedIndustry);
            setFilterLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [selectedIndustry]);

    // Filter companies
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

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, debouncedIndustry]);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-10">

            {/* Search + Industry Filter */}
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
                        {allIndustries.map((ind, index) => (
                            <option key={index} value={ind} className="text-black">{ind}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Global Loader */}
            {(companyloading || filterLoading) && (
                <div className="w-full h-screen flex items-center justify-center">
                    <Loaderpage />
                </div>
            )}

            {/* Sections */}
            {!companyloading && !filterLoading && (
                <>
                    <Startup data={filteredData} />

                    <BestCompanies data={filteredData} />

                    <TrendingCompanies data={filteredData} />

                    {/* Pagination */}
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

                            <span className="text-white">{currentPage} of {totalPages}</span>

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

export default TocompaniesList;
