import { memo } from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Eye } from 'lucide-react';

const statsData = [
  {
    label: 'Total Revenue',
    value: '$142,350',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'success'
  },
  {
    label: 'Active Users',
    value: '8,642',
    change: '+5.2%',
    trend: 'up',
    icon: Users,
    color: 'primary'
  },
  {
    label: 'Total Orders',
    value: '1,245',
    change: '-2.1%',
    trend: 'down',
    icon: ShoppingCart,
    color: 'warning'
  },
  {
    label: 'Page Views',
    value: '456,789',
    change: '+8.3%',
    trend: 'up',
    icon: Eye,
    color: 'info'
  }
];

const StatsWidget = memo(() => {
  return (
    <div className="stats-widget">
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div key={index} className={`stat-item stat-${stat.color}`}>
            <div className="stat-icon">
              <stat.icon size={20} />
            </div>
            
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              
              <div className={`stat-change ${stat.trend}`}>
                {stat.trend === 'up' ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

StatsWidget.displayName = 'StatsWidget';

export default StatsWidget;