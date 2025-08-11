import { useState } from 'react';
import { Menu, Search, Bell, User, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useDashboard } from '../contexts/DashboardContext';

export const TopNav = ({ onSidebarToggle }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { searchQuery, setSearchQuery } = useDashboard();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="topnav">
      <div className="topnav-left">
        <button 
          onClick={onSidebarToggle} 
          className="sidebar-toggle"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        
        <div className="search-container">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search widgets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="topnav-right">
        <button 
          onClick={toggleTheme} 
          className="nav-btn"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <button className="nav-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="notification-badge">3</span>
        </button>

        <div className="user-menu">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="user-btn"
            aria-label="User menu"
          >
            <User size={18} />
            <span className="user-name">{user?.name || user?.username}</span>
          </button>

          {showUserMenu && (
            <div className="user-dropdown">
              <div className="user-info">
                <div className="user-avatar">
                  <User size={20} />
                </div>
                <div>
                  <div className="user-display-name">{user?.name || user?.username}</div>
                  <div className="user-email">{user?.email}</div>
                </div>
              </div>
              <hr className="dropdown-divider" />
              <button onClick={handleLogout} className="logout-btn">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};