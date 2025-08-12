import { memo } from 'react';

export const LoadingSpinner = memo(({ size = 24 }) => {
  return (
    <div className="loading-spinner" style={{ width: size, height: size }}>
      <div className="spinner"></div>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';