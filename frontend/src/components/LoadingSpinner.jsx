import React from 'react';

const LoadingSpinner = ({ size = 'large', text = 'Memuat...' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-10 w-10',
    large: 'h-20 w-20'
  };

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative">
        <div className={`animate-spin rounded-full border-4 border-purple-500/30 ${sizeClasses[size]}`}></div>
        <div className={`animate-spin rounded-full border-t-4 border-purple-500 absolute top-0 left-0 ${sizeClasses[size]}`}></div>
      </div>
      {text && (
        <p className="mt-6 text-white/80 text-lg font-medium">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
