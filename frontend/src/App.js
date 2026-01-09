
import { MdDashboard } from 'react-icons/md';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Customer from './pages/customer';
import MainGrid from './components/MainGrid';
import Catlog from './pages/catlog';
import CatlogDetails from './components/catlogDetails';
import Product from './pages/product';
import OnlineStore from './pages/onlineStore';
import ProductGrid from './components/ProductCart/productGrid';
import ProductDetails from './components/ProductCart/productDetails';
function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Dashboard layout wrapper */}
        <Route path="/dashboard" element={<Dashboard role="admin" />}>
          {/* Default Dashboard content */}
          <Route index element={<MainGrid />} />
          {/* Customer Page */}
          <Route path="customers" element={<Customer />} />
          <Route path="catlog" element={<Catlog />} />
          <Route path="catlog/:id" element={<CatlogDetails />} />
        </Route>
        {/* customer layout wrapper */}
        <Route path="/onlinestore" element={<OnlineStore />} >
          <Route index element={<ProductGrid />} />
          <Route path="product/:id" element={<ProductDetails />} />
        </Route>
        <Route path="/customer" element={<Dashboard role="customer" />}>
          <Route index element={<MainGrid />} />
          {/* <Route path="product" element={<Product />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
