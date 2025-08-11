import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { WidgetGrid } from './WidgetGrid';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className={`dashboard-main ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <TopNav onSidebarToggle={toggleSidebar} sidebarOpen={sidebarOpen} />
        
        <main className="dashboard-content">
          <div className="dashboard-header">
            <h1>Dashboard</h1>
            <p>Monitor your key metrics and performance indicators</p>
          </div>
          
          <WidgetGrid />
        </main>
      </div>
    </div>
  );
};