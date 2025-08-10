<!-- Banner -->
<p align="center">
  <h>Vastraaa</h>
</p>

<h1 align="center">🛍️ Vastraa – E-Commerce Clothing Website</h1>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/your-username/vastraa?color=blue&style=for-the-badge" />
  <img src="https://img.shields.io/github/repo-size/your-username/vastraa?color=purple&style=for-the-badge" />
  <img src="https://img.shields.io/github/stars/your-username/vastraa?style=for-the-badge&color=yellow" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

<p align="center">
  A modern and responsive MERN stack e-commerce platform for clothing, offering authentication, product management, payments, and admin analytics.
</p>

---

## ✨ Features

- 🔐 **Authentication & Authorization** – Secure login/signup with JWT.
- 👗 **Product Management** – Add, edit, and delete clothing products with Cloudinary image uploads.
- 🛒 **Shopping Cart** – Add to cart, update quantities, remove items.
- 💳 **Payments** – Razorpay integration for secure transactions.
- 📦 **Order Management** – Order tracking and admin control.
- 📊 **Admin Dashboard** – Sales analytics, order management, and user control.
- 📱 **Responsive UI** – Built with Tailwind CSS for all devices.

---

## 🛠️ Tech Stack

| Category   | Technology |
|------------|------------|
| Frontend   | React.js, Redux Toolkit, Tailwind CSS |
| Backend    | Node.js, Express.js |
| Database   | MongoDB + Mongoose |
| Others     | Cloudinary, Razorpay, JWT Authentication |

---

## 📂 Folder Structure
Vastraa/
│
├── client/ # React frontend
├── server/ # Node.js backend
├── .env # Environment variables
├── package.json
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/amanrawatdun/vastraaa.git
cd vastraaa

2️⃣ Install dependencies
Backend

bash
Copy code
cd server
npm install
Frontend

bash
Copy code
cd ../client
npm install
3️⃣ Create .env file in server/ and add:
env
Copy code
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


🤝 Contributing
Pull requests are welcome.
For major changes, open an issue first to discuss your ideas.

👨‍💻 Author
Aman Rawat
📧 Email: your-email@example.com
🔗 GitHub: @amanrawatdun

