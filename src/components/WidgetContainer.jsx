import { memo, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X, MoreVertical } from 'lucide-react';
import { useDashboard } from '../contexts/DashboardContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { LoadingSpinner } from './LoadingSpinner';

export const WidgetContainer = memo(({ widget, children }) => {
  const { removeWidget } = useDashboard();
  const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleRemove = () => {
    removeWidget(widget.id);
  };

  // Track visibility for lazy loading
  if (isVisible && !hasBeenVisible) {
    setHasBeenVisible(true);
  }

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        containerRef.current = node;
      }}
      style={style}
      className={`widget-container ${isDragging ? 'dragging' : ''}`}
    >
      <div className="widget-header">
        <div className="widget-title">
          <h3>{widget.title}</h3>
        </div>
        
        <div className="widget-actions">
          <button 
            className="widget-action drag-handle"
            {...attributes} 
            {...listeners}
            aria-label="Drag widget"
          >
            <GripVertical size={16} />
          </button>
          
          <button 
            className="widget-action"
            aria-label="Widget options"
          >
            <MoreVertical size={16} />
          </button>
          
          <button 
            className="widget-action remove-btn"
            onClick={handleRemove}
            aria-label="Remove widget"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      <div className="widget-content">
        {hasBeenVisible || isVisible ? children : <LoadingSpinner />}
      </div>
    </div>
  );
});

WidgetContainer.displayName = 'WidgetContainer';