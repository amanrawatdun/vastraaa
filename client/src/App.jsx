import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Shop from './pages/Shop';
import Item from './pages/Item';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Order from './pages/Order';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductList from './pages/admin/ProductList';
import AddProduct from './pages/admin/addProduct';
import EditProduct from './pages/admin/EditProduct';
import OrderList from './pages/admin/OrderList';
import UserList from './pages/admin/UserList';
import Sale from './pages/Sale';
import NewArival from './pages/NewArival';
import Brand from './pages/Brand';


import Layout from './components/Layout'; 
import AdminProfile from './pages/admin/AdminProfile';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='Register' element={<Register />} />
     
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='shop' element={<Shop />} />
          <Route path='sale' element={<Sale />} />
          <Route path='brand' element={<Brand />} />
          <Route path='new-arrivals' element={<NewArival />} />
          <Route path='item/:id' element={<Item />} />
          <Route path='payment' element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path='order' element={<ProtectedRoute><Order /></ProtectedRoute>} />
          <Route path='profile' element={<Profile />} />
        </Route>

        
        <Route path='/' element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route path='admin/dashboard' element={<AdminDashboard />} />
          <Route path='admin/products' element={<ProductList />} />
          <Route path='admin/orders' element={<OrderList />} />
          <Route path='admin/users' element={<UserList />} />
          <Route path='admin/profile' element={<AdminProfile />} />
          <Route path='admin/product/create' element={<AddProduct />} />
          <Route path='admin/product/edit/:id' element={<EditProduct />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
