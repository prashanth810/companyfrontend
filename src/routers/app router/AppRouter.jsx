import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Wellcomepage from '../../pages/well come page/Wellcomepage';
import CompanyList from '../../pages/cmpany list/CompanyList';
import Navbar from '../../pages/navbar/Navbar';
import SingleCompanydetails from '../../pages/cmpany list/single company details/SingleCompanydetails';

const AppRouter = () => {

    return (
        <section>
            <Navbar />
            <div className='mt-16'>
                <Routes>
                    <Route path='/' element={<Wellcomepage />} />
                    <Route path='/companieslist' element={<CompanyList />} />

                    <Route path="company/:id" element={<SingleCompanydetails />} />

                </Routes>
            </div>
        </section>
    );
};

export default AppRouter;
