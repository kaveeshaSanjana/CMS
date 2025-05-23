// src/components/common/ErrorState.jsx
import { AlertCircle } from 'lucide-react';
import { COLORS } from '../../utils/constants';

export default function ErrorState({ message }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.LIGHT_GOLD }}>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <AlertCircle size={28} color="#ef4444" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button 
          className="px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          style={{ backgroundColor: COLORS.MAIN_GOLD, color: COLORS.WHITE }}
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}