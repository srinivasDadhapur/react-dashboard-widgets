import { useMemo, Suspense, lazy } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useDashboard } from '../contexts/DashboardContext';
import { WidgetContainer } from './WidgetContainer';
import { LoadingSpinner } from './LoadingSpinner';

const ChartWidget = lazy(() => import('./widgets/ChartWidget'));
const StatsWidget = lazy(() => import('./widgets/StatsWidget'));  
const TableWidget = lazy(() => import('./widgets/TableWidget'));

const WidgetComponents = {
  chart: ChartWidget,
  stats: StatsWidget,
  table: TableWidget
};

export const WidgetGrid = () => {
  const { widgets, reorderWidgets } = useDashboard();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sortedWidgets = useMemo(() => {
    return [...widgets].sort((a, b) => a.position - b.position);
  }, [widgets]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = sortedWidgets.findIndex(w => w.id === active.id);
      const newIndex = sortedWidgets.findIndex(w => w.id === over.id);
      reorderWidgets(oldIndex, newIndex);
    }
  };

  const renderWidget = (widget) => {
    const WidgetComponent = WidgetComponents[widget.type];
    
    if (!WidgetComponent) {
      return <div>Unknown widget type: {widget.type}</div>;
    }

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <WidgetComponent widget={widget} />
      </Suspense>
    );
  };

  if (widgets.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-content">
          <h3>No widgets found</h3>
          <p>Add widgets from the sidebar to get started with your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sortedWidgets.map(w => w.id)} strategy={rectSortingStrategy}>
        <div className="widget-grid">
          {sortedWidgets.map((widget) => (
            <WidgetContainer key={widget.id} widget={widget}>
              {renderWidget(widget)}
            </WidgetContainer>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};