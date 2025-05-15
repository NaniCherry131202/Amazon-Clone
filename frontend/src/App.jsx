import { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';

export default function App() {
  const { isAuthenticated, userRole, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-[#232F3E] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-[#FF9900] tracking-wide hover:text-[#ffa41c] transition">
            Amazon Clone
          </Link>

          {/* Navigation Links */}
          <div className="space-x-6 text-sm font-medium">
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="hover:text-[#FF9900] transition">Cart</Link>
                {userRole === 'admin' && (
                  <Link to="/admin" className="hover:text-[#FF9900] transition">Admin</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="hover:text-[#FF9900] transition focus:outline-none"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="hover:text-[#FF9900] transition">Register</Link>
                <Link to="/login" className="hover:text-[#FF9900] transition">Login</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}
