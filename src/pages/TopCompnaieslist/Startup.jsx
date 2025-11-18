import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Startup = () => {
    const { companyloading, companyerror, companydata } = useSelector(
        (state) => state.company.companydata
    );

    const allCompanies = companydata?.data || [];
    const startups = allCompanies.filter(item => item.rating <= 3.5);

    return (
        <section className="w-full mt-10">

            {/* Section Title */}
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 px-1">
                Startups
            </h2>

            {/* Loader */}
            {companyloading && (
                <p className="text-gray-400 text-sm px-1">Loading...</p>
            )}

            {/* Error */}
            {companyerror && (
                <p className="text-red-500 text-sm px-1">{companyerror}</p>
            )}

            {/* Main Grid */}
            <div
                className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4 
                xl:grid-cols-5
                gap-4 
                mt-4
                "
            >

                {/* No Data Message */}
                {!companyloading && startups.length === 0 && (
                    <p className="text-gray-400 text-sm col-span-full text-center py-4">
                        No startup companies found.
                    </p>
                )}

                {/* Cards */}
                {!companyloading && startups.length > 0 &&
                    startups.map((item) => (
                        <div
                            key={item._id}
                            className="
                                bg-transparent 
                                text-white 
                                rounded-md 
                                overflow-hidden 
                                shadow-sm
                                transition-all 
                                duration-300 
                                hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]
                            "
                        >
                            <NavLink to={`/company/${item._id}`}>
                                <img
                                    src={item.coverImage}
                                    alt={item.companyName}
                                    className="
                                        w-full 
                                        h-40 
                                        sm:h-44 
                                        md:h-48 
                                        lg:h-52 
                                        object-cover
                                    "
                                />
                            </NavLink>

                            <div className="p-3 space-y-1">
                                <h3 className="text-base sm:text-lg font-semibold">
                                    {item.companyName}
                                </h3>

                                <p className="text-xs sm:text-sm text-gray-300">
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
        </section>
    );
};

export default Startup;
