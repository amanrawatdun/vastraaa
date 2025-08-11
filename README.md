<!-- Banner -->
<p align="center">  
</p>

<h1 align="center">🛍️ Vastraaa – E-Commerce Clothing Platform</h1>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/amanrawatdun/vastraaa?color=blue&style=for-the-badge" />
  <img src="https://img.shields.io/github/repo-size/amanrawatdun/vastraaa?color=purple&style=for-the-badge" />
  <img src="https://img.shields.io/github/stars/amanrawatdun/vastraaa?style=for-the-badge&color=yellow" />
  
</p>

<p align="center">
  A modern, full-stack MERN e-commerce platform for clothing, featuring authentication, product management, secure payments, admin analytics, and multi-core performance optimization via Node.js Clustering.
</p>

---

## ✨ Features

- 🔐 **Authentication & Authorization** – Secure JWT-based login & signup.
- 👗 **Product Management** – Add, edit, delete clothing items with Cloudinary image uploads.
- 🛒 **Shopping Cart** – Persistent cart with quantity updates and item removal.
- 💳 **Secure Payments** – Razorpay integration for transactions.
- 📦 **Order Management** – Track orders with admin controls.
- 📊 **Admin Dashboard** – Sales analytics, user & product management.
- 📱 **Responsive UI** – Tailwind CSS for seamless mobile/desktop experience.
- ⚡ **Performance Boost** – Node.js Clustering for multi-CPU request handling.

---

## 🛠️ Tech Stack

| Category   | Technology |
|------------|------------|
| Frontend   | React.js, Redux Toolkit, Tailwind CSS |
| Backend    | Node.js, Express.js, Node.js Cluster |
| Database   | MongoDB + Mongoose |
| Others     | Cloudinary, Razorpay, JWT, dotenv |

---

## ⚡ Node.js Clustering (Performance Optimization)

Vastraaa’s backend uses **Node.js Cluster Module** to fully utilize multi-core CPUs.  
This improves throughput, reduces latency, and ensures high availability.

```javascript
import cluster from 'cluster';
import os from 'os';
import app from './app.js';

const PORT = process.env.PORT || 5000;

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`Master ${process.pid} running, forking ${numCPUs} workers...`);
  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died, creating new...`);
    cluster.fork();
  });
} else {
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} listening on port ${PORT}`);
  });
}

📂 Folder Structure

Vastraaa/
│
├── client/        # React frontend
├── server/        # Node.js backend
├── .env           # Environment variables
├── package.json
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/amanrawatdun/vastraaa.git
cd vastraaa

2️⃣ Install dependencies
Backend
cd server
npm install

Frontend
cd ../client
npm install

3️⃣ Create .env in server/
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

4️⃣ Run the app
Backend
cd server
npm start

Frontend
cd client
npm start

🚀 Live Demo
🔗 Frontend: https://vastraaa.vercel.app
🔗 Backend API: https://vastraaa-4ti1.onrender.com

🤝 Contributing
Pull requests are welcome!
For major changes, please open an issue first to discuss the proposal.

👨‍💻 Author
Aman Rawat
📧 Email: amanrwtsre@gamil.com
🔗 GitHub: @amanrawatdun
