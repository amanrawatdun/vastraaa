<!-- Project Banner -->
<p align="center">
  <img src="screenshots/banner.png" alt="Vastraa Banner" width="100%" />
</p>

<h1 align="center">🛍️ Vastraa – E-Commerce Clothing Website</h1>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/your-username/vastraa?color=blue&style=for-the-badge" />
  <img src="https://img.shields.io/github/repo-size/your-username/vastraa?color=purple&style=for-the-badge" />
  <img src="https://img.shields.io/github/stars/your-username/vastraa?style=for-the-badge&color=yellow" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

> **Vastraa** is a modern **MERN stack** e-commerce platform for selling clothing items online, offering a seamless shopping experience with authentication, product management, payments, and responsive UI.

---

## ✨ Features

- 🔐 **Authentication & Authorization** – Secure login, signup, and JWT-based authentication.
- 👗 **Product Management** – Add, edit, delete clothing products with images.
- 🛒 **Shopping Cart** – Add to cart, update, and remove products.
- 💳 **Payments** – Integrated Razorpay payment gateway.
- 📦 **Order Management** – Track orders with admin control.
- 📊 **Admin Dashboard** – View sales analytics & manage store.
- 📱 **Responsive Design** – Works on desktop, tablet, and mobile.
- ☁ **Image Upload** – Powered by Cloudinary.

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | Other |
|----------|---------|----------|-------|
| React.js | Node.js | MongoDB  | Cloudinary |
| Redux Toolkit | Express.js | Mongoose | Razorpay |
| Tailwind CSS | JWT Auth |        |        |

---

## 📂 Folder Structure
Vastraa/
│
├── client/ # React frontend
├── server/ # Node.js backend
├── .env # Environment variables
├── package.json
└── README.md

yaml
Copy
Edit

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/vastraa.git
cd vastraa
2️⃣ Install dependencies
Backend

bash
Copy
Edit
cd server
npm install
Frontend

bash
Copy
Edit
cd ../client
npm install
3️⃣ Configure environment variables
Create .env in server/:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
4️⃣ Start development
Backend

bash
Copy
Edit
cd server
npm start
Frontend

bash
Copy
Edit
cd client
npm start
