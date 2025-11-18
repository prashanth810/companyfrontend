import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const TrendingCompanies = () => {

    // Get data directly from Redux slice
    const { companyloading, companyerror, companydata } = useSelector(
        (state) => state.company.companydata
    );

    // Actual array
    const allCompanies = companydata?.data || [];

    // Filter trending companies (rating > 4.2)
    const trending = allCompanies.filter(item => item.rating > 4.2);

    return (
        <>
            <h2 className="text-lg md:text-xl font-semibold text-white mt-10 px-1">
                Trending Companies
            </h2>

            {/* Loading */}
            {companyloading && (
                <p className="text-gray-400 text-sm px-1 mt-3">Loading...</p>
            )}

            {/* Error */}
            {companyerror && (
                <p className="text-red-500 text-sm px-1 mt-3">{companyerror}</p>
            )}

            {/* No Data */}
            {!companyloading && trending.length === 0 && (
                <p className="text-gray-400 text-sm px-1 mt-4">
                    No trending companies found.
                </p>
            )}

            {/* Cards Grid */}
            {!companyloading && trending.length > 0 && (
                <div className="
                    grid 
                    grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-2
                    lg:grid-cols-3 
                    xl:grid-cols-4 
                    gap-4 
                    mt-4
                ">
                    {trending.map((item) => (
                        <div
                            key={item._id}
                            className="
                                bg-[#0f172a] 
                                text-white 
                                rounded-md 
                                overflow-hidden
                                shadow-md
                                transition-all 
                                duration-300 
                                hover:shadow-[0_0_10px_#4b5563]
                            "
                        >
                            <NavLink to={`/company/${item._id}`}>
                                <img
                                    src={item.coverImage}
                                    className="w-full h-40 object-cover"
                                    alt={item.companyName}
                                />
                            </NavLink>

                            <div className="p-3">
                                <h3 className="text-base md:text-lg font-semibold">
                                    {item.companyName}
                                </h3>

                                <p className="text-sm text-gray-300 mt-1">
                                    {item.city}, {item.state}
                                </p>

                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-yellow-500 text-lg">★</span>
                                    <span className="text-sm">{item.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default TrendingCompanies;
