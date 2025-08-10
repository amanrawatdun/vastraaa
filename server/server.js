const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin:'https://vastraaa-4ti1.onrender.com',
    Credential:true
}));

app.use(express.json());
app.use(express.urlencoded(false))
app.use('/uploads',express.static('uploads'));



app.use('/api/users' , userRouter)
app.use('/api/products' , productRouter)
app.use('/api/orders' , orderRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/admin' , adminRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT , ()=>console.log(`Server running on port ${PORT}`));
