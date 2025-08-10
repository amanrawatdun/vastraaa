import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/product/productSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';
import paymentReducer from '../features/payment/paymentSlice';
import adminReducer from '../features/admin/adminSlice'

const store=configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer,
        cart:cartReducer,
        order:orderReducer,
        payment:paymentReducer,
        admin:adminReducer,
    }
});

export default store;