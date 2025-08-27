const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cluster = require('cluster');
const os = require('os');

dotenv.config();
connectDB();

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);
    console.log(`Starting ${numCPUs} workers...`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Starting a new one...`);
        cluster.fork();
    });

} else {
    const app = express();

    app.use(cors({
        origin: 'https://vastraaa-4ti1.onrender.com',
        credentials: true
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/uploads', express.static('uploads'));

   
    app.get('/health', (req, res) => {
        res.set('Cache-Control', 'no-store');
        res.status(200).send('OK');
    });

  
    app.head('/health', (req, res) => res.sendStatus(200));

    app.use('/api/users', userRouter);
    app.use('/api/products', productRouter);
    app.use('/api/orders', orderRouter);
    app.use('/api/payments', paymentRouter);
    app.use('/api/admin', adminRoutes);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Worker ${process.pid} running on port ${PORT}`));
}
