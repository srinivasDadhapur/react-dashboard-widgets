import { memo, useState, useMemo } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const ordersData = [
  { id: '1001', customer: 'John Doe', product: 'Laptop Pro', amount: '$1,299', status: 'completed', date: '2024-01-15' },
  { id: '1002', customer: 'Jane Smith', product: 'Wireless Headphones', amount: '$299', status: 'pending', date: '2024-01-14' },
  { id: '1003', customer: 'Bob Johnson', product: 'Smart Watch', amount: '$399', status: 'shipped', date: '2024-01-14' },
  { id: '1004', customer: 'Alice Brown', product: 'Tablet Air', amount: '$599', status: 'completed', date: '2024-01-13' },
  { id: '1005', customer: 'Charlie Wilson', product: 'Gaming Mouse', amount: '$79', status: 'pending', date: '2024-01-13' },
  { id: '1006', customer: 'Diana Lee', product: 'Keyboard Mechanical', amount: '$159', status: 'shipped', date: '2024-01-12' },
];

const statusColors = {
  completed: 'success',
  pending: 'warning',
  shipped: 'info',
  cancelled: 'danger'
};

const TableWidget = memo(() => {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const sortedData = useMemo(() => {
    if (!sortField) return ordersData;

    return [...ordersData].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === 'amount') {
        aVal = parseFloat(aVal.replace('$', '').replace(',', ''));
        bVal = parseFloat(bVal.replace('$', '').replace(',', ''));
      }

      if (sortField === 'date') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <div className="sort-placeholder" />;
    return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <div className="table-widget">
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} className="sortable">
                Order ID <SortIcon field="id" />
              </th>
              <th onClick={() => handleSort('customer')} className="sortable">
                Customer <SortIcon field="customer" />
              </th>
              <th onClick={() => handleSort('product')} className="sortable">
                Product <SortIcon field="product" />
              </th>
              <th onClick={() => handleSort('amount')} className="sortable">
                Amount <SortIcon field="amount" />
              </th>
              <th onClick={() => handleSort('status')} className="sortable">
                Status <SortIcon field="status" />
              </th>
              <th onClick={() => handleSort('date')} className="sortable">
                Date <SortIcon field="date" />
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((order) => (
              <tr key={order.id}>
                <td className="order-id">#{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td className="amount">{order.amount}</td>
                <td>
                  <span className={`status-badge status-${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

TableWidget.displayName = 'TableWidget';

export default TableWidget;