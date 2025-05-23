// src/components/common/LoadingState.jsx
import { COLORS } from '../../utils/constants';

export default function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.LIGHT_GOLD }}>
      <div className="text-center">
        <div 
          className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-current border-r-transparent" 
          style={{ color: COLORS.MAIN_GOLD }}
        ></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading dashboard data...</p>
      </div>
    </div>
  );
}