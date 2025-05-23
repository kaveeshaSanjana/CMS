// src/components/dashboard/StatCard.jsx
import { ChevronUp, ChevronDown } from 'lucide-react';
import { COLORS } from '../../utils/constants';

export default function StatCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1 text-gray-800">{value}</p>
        </div>
        <div className="rounded-full p-2" style={{ backgroundColor: COLORS.LIGHT_GOLD }}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={trend === 'up' ? 'text-green-600' : 'text-red-600'}>
            {trend === 'up' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
          <span className={`text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'} ml-1`}>
            {trend === 'up' ? 'Increase' : 'Decrease'} from last month
          </span>
        </div>
      )}
    </div>
  );
}   