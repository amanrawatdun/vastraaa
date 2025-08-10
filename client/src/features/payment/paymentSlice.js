import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createPaymentAPI, verifyPaymentAPI } from './paymentAPI'; // Assuming these functions exist and are correct

// Thunk to create a payment order with Razorpay
export const createPaymentOrder = createAsyncThunk(
    'payment/createOrder',
    async (data, { rejectWithValue }) => {
        try {
            const res = await createPaymentAPI(data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Thunk to verify the payment
export const verifyPayment = createAsyncThunk(
    'payment/verify',
    async (paymentResponse, { rejectWithValue }) => {
        try {
            // The verifyPaymentAPI should be called with the raw response object
            const res = await verifyPaymentAPI(paymentResponse);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        orders: [], // Holds the created Razorpay order details temporarily
        verified: false,
        loading: false,
        error: null,
    },
    reducers: {
        // A utility action to reset the state
        resetPaymentState: (state) => {
            state.orders = [];
            state.verified = false;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Order
            .addCase(createPaymentOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPaymentOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload; // Store Razorpay order details
            })
            .addCase(createPaymentOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Verify Payment
            .addCase(verifyPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyPayment.fulfilled, (state, action) => {
                state.loading = false;
                // The backend should return { success: true, order: {...} }
                state.verified = action.payload.success; 
                state.orders = action.payload.order; // Store the final, created order details
            })
            .addCase(verifyPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { resetPaymentState } = paymentSlice.actions;

export default paymentSlice.reducer;