import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Startup = () => {

    // get data directly from Redux slice
    const { companyloading, companyerror, companydata } = useSelector(
        (state) => state.company.companydata
    );

    // actual array
    const allCompanies = companydata?.data || [];

    // filter startups
    const startups = allCompanies.filter(item => item.rating <= 3.5);

    return (
        <>
            <h2 className="text-lg font-semibold text-white mt-10">
                Startups
            </h2>

            {/* Loader */}
            {companyloading && (
                <p className="text-gray-400 text-sm">Loading...</p>
            )}

            {/* Error */}
            {companyerror && (
                <p className="text-red-500 text-sm">{companyerror}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">

                {/* No data */}
                {!companyloading && startups.length === 0 && (
                    <p className="text-gray-400 text-sm col-span-full max-w-7xl mx-auto py-5">
                        No startup companies found.
                    </p>
                )}

                {/* Cards */}
                {!companyloading && startups.length > 0 &&
                    startups.map((item) => (
                        <div
                            key={item._id}
                            className="bg-transparent text-white rounded-sm 
                            transition-all duration-500 hover:shadow-[0_0_8px_0_#474747]"
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
                                <p className="text-sm mt-1">{item.city}, {item.state}</p>

                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-yellow-500 text-lg">★</span>
                                    <span>{item.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default Startup;
