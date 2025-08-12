import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

const defaultWidgets = [
  { id: '1', type: 'chart', title: 'Revenue by Region', position: 0 },
  { id: '2', type: 'stats', title: 'Key Metrics', position: 1 },
  { id: '3', type: 'table', title: 'Recent Orders', position: 2 },
  { id: '4', type: 'chart', title: 'Impressions by Campaign', position: 3 }
];

export const DashboardProvider = ({ children }) => {
  const [widgets, setWidgets] = useState(defaultWidgets);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('dashboardState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setWidgets(parsed.widgets || defaultWidgets);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error parsing dashboard state:', error);
        }
      }
    }
  }, []);

  const saveDashboardState = useCallback((newWidgets) => {
    const state = { widgets: newWidgets };
    localStorage.setItem('dashboardState', JSON.stringify(state));
  }, []);

  const updateWidgets = useCallback((newWidgets) => {
    setWidgets(newWidgets);
    saveDashboardState(newWidgets);
  }, [saveDashboardState]);

  const addWidget = useCallback((widgetType) => {
    const newWidget = {
      id: Date.now().toString(),
      type: widgetType,
      title: `New ${widgetType.charAt(0).toUpperCase() + widgetType.slice(1)}`,
      position: widgets.length
    };
    const newWidgets = [...widgets, newWidget];
    updateWidgets(newWidgets);
  }, [widgets, updateWidgets]);

  const removeWidget = useCallback((widgetId) => {
    const newWidgets = widgets.filter(w => w.id !== widgetId);
    updateWidgets(newWidgets);
  }, [widgets, updateWidgets]);

  const reorderWidgets = useCallback((oldIndex, newIndex) => {
    const newWidgets = [...widgets];
    const [removed] = newWidgets.splice(oldIndex, 1);
    newWidgets.splice(newIndex, 0, removed);
    
    newWidgets.forEach((widget, index) => {
      widget.position = index;
    });
    
    updateWidgets(newWidgets);
  }, [widgets, updateWidgets]);

  const filteredWidgets = widgets.filter(widget =>
    widget.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const value = {
    widgets: filteredWidgets,
    allWidgets: widgets,
    searchQuery,
    setSearchQuery,
    loading,
    setLoading,
    addWidget,
    removeWidget,
    reorderWidgets,
    updateWidgets
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};