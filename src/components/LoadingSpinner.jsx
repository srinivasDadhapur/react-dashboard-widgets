export const LoadingSpinner = ({ size = 24 }) => {
  return (
    <div className="loading-spinner" style={{ width: size, height: size }}>
      <div className="spinner"></div>
    </div>
  );
};