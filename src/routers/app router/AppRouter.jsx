import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Wellcomepage from '../../pages/well come page/Wellcomepage';
import CompanyList from '../../pages/cmpany list/CompanyList';
import Navbar from '../../pages/navbar/Navbar';
import SingleCompanydetails from '../../pages/cmpany list/single company details/SingleCompanydetails';
import Startup from '../../pages/TopCompnaieslist/Startup';
import TrendingCompanies from '../../pages/TopCompnaieslist/TrendingCompanies';
import BestCompanies from '../../pages/TopCompnaieslist/BestCompanies';

const AppRouter = () => {

    return (
        <section>
            <Navbar />
            <div className='mt-16'>
                <Routes>
                    <Route path='/' element={<Wellcomepage />} />
                    <Route path='/companieslist' element={<CompanyList />} />
                    <Route path="company/:id" element={<SingleCompanydetails />} />

                    {/* start ups  */}
                    <Route path="/startups" element={<Startup />} />
                    <Route path="/trending" element={<TrendingCompanies />} />
                    <Route path="/best" element={<BestCompanies />} />

                </Routes>
            </div>
        </section>
    );
};

export default AppRouter;
