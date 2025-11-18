import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { handlegetallcompanies, handlegetsinglecompany, searchingnames } from '../../apis/Apis';

export const getallcompanydata = createAsyncThunk("companylist/fetchcompanydata", async (_, thunkAPI) => {
    try {
        const response = await handlegetallcompanies();
        return response.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const getsinglecompanydata = createAsyncThunk('companylist/singlecompanydata', async (id, thunkAPI) => {
    try {
        const response = await handlegetsinglecompany(id);
        return response.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})





const initialState = {
    companydata: {
        companyloading: false,
        companyerror: null,
        companydata: {},
    },
    singlecompany: {
        singlecompanyloading: false,
        singlecompanyerror: null,
        singlecompanydata: {},
    }
}
const CompanylistSlice = createSlice({
    name: "compnaieslist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getallcompanydata.pending, (state) => {
                state.companydata.companyloading = true;
                state.companydata.companyerror = null;
            })
            .addCase(getallcompanydata.fulfilled, (state, action) => {
                state.companydata.companyloading = false;
                state.companydata.companydata = action.payload;
            })
            .addCase(getallcompanydata.rejected, (state, action) => {
                state.companydata.companyloading = false;
                state.companydata.companyerror = action.payload;
            })

            .addCase(getsinglecompanydata.pending, (state) => {
                state.singlecompany.singlecompanyloading = true;
                state.singlecompany.singlecompanyerror = null;
            })
            .addCase(getsinglecompanydata.fulfilled, (state, action) => {
                state.singlecompany.singlecompanyloading = false;
                state.singlecompany.singlecompanydata = action.payload;
            })
            .addCase(getsinglecompanydata.rejected, (state, action) => {
                state.singlecompany.singlecompanyloading = false;
                state.singlecompany.singlecompanyerror = action.payload;
            })


    }
})

export default CompanylistSlice.reducer;