import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createOrderAPI, deleteOrderAPI, getAllOrdersAPI, getOrdersAPI, markOrderAsPaidAPI, updateOrderStatusAPI } from "./orderApi"

const initialState = {
    orders: [],
    loading: false,
    error: null,
}

export const createorder = createAsyncThunk(
    'createOrder',
    async (formData, thunkAPI) => {
        try {
           
            const res = await createOrderAPI(formData);
            return res;
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)



export const getOrders = createAsyncThunk(
    'getOrders',
    async (_, thunkAPI) => {
        try {
            const res = await getOrdersAPI();
            return res;
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const getAllOrders = createAsyncThunk(
    'getAllOrder',
    async (_, thunkAPI) => {
        try {
            const res = await getAllOrdersAPI();
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)

export const updateOrderStatus = createAsyncThunk(
    'orders/updateOrderStatus',
    async (orderId, thunkAPI) => {
        try {
           
            const res = await updateOrderStatusAPI(orderId);
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const markOrderAsPaid = createAsyncThunk(
    'orders/markAsPaid',
    async (orderId, thunkAPI) => {
        try {
           
            const res = await markOrderAsPaidAPI(orderId);
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const deleteOrder = createAsyncThunk(
    'order/deleteOrder',
    async (orderId, thunkAPI) => {
        try {
           
            const res = await deleteOrderAPI(orderId);
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)



const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createorder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createorder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
                state.error = null;
            })
            .addCase(createorder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.error = null;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(markOrderAsPaid.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
    }
})

export default orderSlice.reducer