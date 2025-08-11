import { memo, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateRevenueData = () => [
  { month: 'Jan', revenue: 12000, impressions: 45000 },
  { month: 'Feb', revenue: 15000, impressions: 52000 },
  { month: 'Mar', revenue: 18000, impressions: 61000 },
  { month: 'Apr', revenue: 22000, impressions: 68000 },
  { month: 'May', revenue: 25000, impressions: 75000 },
  { month: 'Jun', revenue: 28000, impressions: 82000 },
];

const generateCampaignData = () => [
  { campaign: 'Social Media', impressions: 125000, clicks: 3200 },
  { campaign: 'Search Ads', impressions: 98000, clicks: 2850 },
  { campaign: 'Display', impressions: 87000, clicks: 1920 },
  { campaign: 'Email', impressions: 65000, clicks: 1450 },
  { campaign: 'Video', impressions: 45000, clicks: 980 },
];

const ChartWidget = memo(({ widget }) => {
  const data = useMemo(() => {
    if (widget.title.toLowerCase().includes('revenue')) {
      return generateRevenueData();
    } else if (widget.title.toLowerCase().includes('impression')) {
      return generateCampaignData();
    }
    return generateRevenueData();
  }, [widget.title]);

  const isRevenue = widget.title.toLowerCase().includes('revenue');
  const dataKey = isRevenue ? 'revenue' : 'impressions';
  const color = isRevenue ? '#3b82f6' : '#10b981';

  const formatValue = (value) => {
    if (isRevenue) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="chart-widget">
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis 
            dataKey={isRevenue ? 'month' : 'campaign'} 
            stroke="var(--text-secondary)"
            fontSize={12}
          />
          <YAxis 
            stroke="var(--text-secondary)"
            fontSize={12}
            tickFormatter={formatValue}
          />
          <Tooltip 
            contentStyle={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              boxShadow: 'var(--shadow)'
            }}
            labelStyle={{ color: 'var(--text)' }}
            formatter={(value) => [formatValue(value), isRevenue ? 'Revenue' : 'Impressions']}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fill={`${color}20`}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

ChartWidget.displayName = 'ChartWidget';

export default ChartWidget;