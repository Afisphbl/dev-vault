import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FolderGit2, LogOut, PlusCircle } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <FolderGit2 className="brand-icon" />
          <span>DevVault</span>
        </Link>

        {currentUser ? (
          <div className="navbar-links">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/add-project" className="btn btn-primary">
              <PlusCircle size={18} />
              Add Project
            </Link>
            <button onClick={handleLogout} className="btn-icon-only ml-2" title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <div className="navbar-links">
            <Link to="/login" className="btn btn-secondary">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
