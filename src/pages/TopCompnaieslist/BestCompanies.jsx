import React from "react";
import { NavLink } from "react-router-dom";

const BestCompanies = ({ data }) => {
    const best = data.filter(item => item.rating > 3.5 && item.rating <= 4.2);

    return (
        <>
            <h2 className="text-lg font-semibold text-white mt-10">
                Best Companies (3.6 – 4.2)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
                {best.map((item) => (
                    <div
                        key={item._id}
                        className="bg-transparent text-white rounded-sm 
                        transition-all duration-500 hover:shadow-[0_0_8px_0_#474747]"
                    >
                        <NavLink to={`/company/${item._id}`}>
                            <img
                                src={item.coverImage}
                                className="w-full h-40 object-cover"
                                alt={item.companyName}
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
                ))}
            </div>
        </>
    );
};

export default BestCompanies;
