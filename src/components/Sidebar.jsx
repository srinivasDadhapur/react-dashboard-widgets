import { memo } from 'react';
import { BarChart3, Grid3X3, Settings, Home, TrendingUp, Users } from 'lucide-react';
import { useDashboard } from '../contexts/DashboardContext';

export const Sidebar = memo(({ isOpen }) => {
  const { addWidget } = useDashboard();

  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Users, label: 'Users' },
    { icon: TrendingUp, label: 'Reports' },
    { icon: Settings, label: 'Settings' }
  ];

  const widgetTypes = [
    { type: 'chart', label: 'Chart Widget', icon: BarChart3 },
    { type: 'stats', label: 'Stats Widget', icon: TrendingUp },
    { type: 'table', label: 'Table Widget', icon: Grid3X3 }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Grid3X3 size={24} />
          {isOpen && <span>Dashboard</span>}
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item, index) => (
            <li key={index} className={`nav-item ${item.active ? 'nav-item-active' : ''}`}>
              <a href="#" className="nav-link">
                <item.icon size={20} />
                {isOpen && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {isOpen && (
        <div className="sidebar-widgets">
          <h3 className="widgets-title">Add Widgets</h3>
          <div className="widget-buttons">
            {widgetTypes.map((widget) => (
              <button
                key={widget.type}
                onClick={() => addWidget(widget.type)}
                className="widget-add-btn"
                title={`Add ${widget.label}`}
              >
                <widget.icon size={16} />
                <span>{widget.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';