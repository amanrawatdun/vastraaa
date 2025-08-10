import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  loginAPI, registerAPI } from "./authApi";

// Helper function to load user from localStorage
const loadUserFromLocalStorage = () => {
    try {
        const serializedUser = localStorage.getItem('user');
        if (serializedUser === null) {
            return null; // No user found in localStorage
        }
        return JSON.parse(serializedUser);
    } catch (error) {
        console.error("Failed to load user from localStorage", error);
        return null; // Return null on error
    }
};

const initialState = {
    user: loadUserFromLocalStorage(), // Initialize user state from localStorage
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    'auth/register',
    async (formdata, thunkAPI) => {
        try {
            const res = await registerAPI(formdata);
          
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            const res = await loginAPI(data);
           
            localStorage.setItem('user', JSON.stringify(res));// Save user to localStorage on successful login
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('user'); // Remove user from localStorage on logout
            state.user = null;
        },
        // This reducer is now less critical as initial state handles loading from localStorage
        // but can be kept if you have other scenarios where you manually set user.
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true; // Set loading to true for register
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                // User is not set here, as registration doesn't automatically log them in
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload; // Set user from login response
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null; // Clear user on login failure
            })
            
    },
});

export const { logout, setUser } = authSlice.actions; // Export actions from authSlice.actions
export default authSlice.reducer;
