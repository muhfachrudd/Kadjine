import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 glass-card rounded-2xl shadow-xl max-w-md mx-auto">
      <div className="relative mb-6">
        <ExclamationTriangleIcon className="h-16 w-16 text-red-400" />
        <div className="absolute inset-0 bg-red-400/20 rounded-full blur-xl"></div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">Terjadi Kesalahan</h3>
      <p className="text-white/70 text-center mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
