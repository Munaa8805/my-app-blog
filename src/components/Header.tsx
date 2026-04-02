import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Countries', path: '/countries' },
    { name: 'Wishlist', path: '/wishlist' },
    { name: 'Orders', path: '/orders' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold tracking-tight">My App</Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex space-x-6 text-sm font-medium text-gray-600 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.path} className="hover:text-black transition-colors">{link.name}</Link>
            </li>
          ))}
          {isAuthenticated ? (
            <li className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                {user?.name}
              </span>
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-black transition-colors flex items-center space-x-1"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </li>
          ) : (
            <li className="ml-4">
              <Link to="/login" className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 text-gray-600 hover:text-black transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-2xl z-50 md:hidden p-6 flex flex-col"
            >
              <div className="flex justify-end mb-8">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-600 hover:text-black transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <nav>
                <ul className="space-y-4">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.path} 
                        className="text-lg font-medium text-gray-900 hover:text-black block py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                  {!isAuthenticated && (
                    <li>
                      <Link 
                        to="/login" 
                        className="text-lg font-medium text-gray-900 hover:text-black block py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign In
                      </Link>
                    </li>
                  )}
                </ul>

                {isAuthenticated && (
                  <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Logged in as</span>
                      <span className="text-sm font-medium text-gray-900">{user?.name}</span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 text-red-600 font-medium py-2"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
