import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../services/authService';

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-purple-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">ReWear</Link>
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/new-item" className="hover:underline">List Item</Link>
          {user ? (
            <>
              <span className="text-sm">Hello, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-purple-700 px-3 py-1 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/signup" className="hover:underline">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
