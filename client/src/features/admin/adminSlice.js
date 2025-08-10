import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUserAPI, getAllUserAPI, getDashBoardSummaryAPI } from "./adminapi";


export const getAllUser = createAsyncThunk(
    'auth/allUser',
    async (_, thunkAPI) => {
        try {
           
            const res = await getAllUserAPI();
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const getDashBoardSummary = createAsyncThunk(
    'admin/summary',
    async (_, thunkAPI) => {
        try {
            const res = await getDashBoardSummaryAPI();
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const deleteUser = createAsyncThunk(
    'user/delete',
    async(id,thunkAPI)=>{
        try {
           
            const res = await deleteUserAPI(id);
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        data: [],
        summary: {},
        loading: false,
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getDashBoardSummary.fulfilled, (state, action) => {
                state.summary = action.payload;
            })
            .addCase(deleteUser.fulfilled , (state,action)=>{
                state.data=action.payload;
            })
    }
})

export default adminSlice.reducer;