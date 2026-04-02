import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Countries from './pages/Countries';
import CountryDetail from './pages/CountryDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';
import Wishlist from './pages/Wishlist';

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="posts/:id" element={<PostDetail />} />
              <Route path="products" element={<Products />}>
                <Route path=":id" element={<ProductDetail />} />
              </Route>
              <Route path="countries" element={<Countries />}>
                <Route path=":id" element={<CountryDetail />} />
              </Route>
              <Route 
                path="orders" 
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="wishlist" 
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                } 
              />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </Router>
      </WishlistProvider>
    </AuthProvider>
  );
}
