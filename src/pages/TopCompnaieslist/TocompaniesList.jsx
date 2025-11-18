import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallcompanydata } from "../../redux/slices/CompanylistSlice";
import Loaderpage from "../../componenets/loader/Loaderpage";

import Startup from "./Startup";
import BestCompanies from "./BestCompanies";
import TrendingCompanies from "./TrendingCompanies";

const TocompaniesList = () => {
    const dispatch = useDispatch();

    const { companyloading, companyerror, companydata } = useSelector(
        (state) => state.company.companydata
    );

    const [filterLoading] = useState(false);

    useEffect(() => {
        dispatch(getallcompanydata());
    }, [dispatch]);

    // Actual data array
    const allCompanies = companydata?.data || [];

    return (
        <section className="x:px-4 lg:px-3 md:px-2 px-1">

            {/* Loader */}
            {(companyloading || filterLoading) && (
                <div className="w-full h-screen flex items-center justify-center">
                    <Loaderpage />
                </div>
            )}

            {/* ERROR */}
            {companyerror && (
                <p className="text-red-500 text-center">{companyerror}</p>
            )}

            {/* Show all sections only when loaded */}
            {!companyloading && !filterLoading && (
                <>
                    {/* ⭐ Startups */}
                    <Startup data={allCompanies} />

                    {/* ⭐⭐ Best Companies */}
                    <BestCompanies data={allCompanies} />

                    {/* ⭐⭐⭐ Trending Companies */}
                    <TrendingCompanies data={allCompanies} />
                </>
            )}
        </section>
    );
};

export default TocompaniesList;
