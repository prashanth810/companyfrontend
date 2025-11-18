import { configureStore } from "@reduxjs/toolkit";
import CompanySlice from '../slices/CompanylistSlice'

const Mystore = configureStore({
    reducer: {
        company: CompanySlice
    }
})

export default Mystore;