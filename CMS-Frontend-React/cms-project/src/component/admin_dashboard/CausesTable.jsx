// src/components/dashboard/CausesTable.jsx
import { COLORS, STATUS_COLORS } from '../../utils/constants';

export default function CausesTable({ causes }) {
  const getStatusClass = (status) => {
    const statusKey = status.toLowerCase();
    return `${STATUS_COLORS[statusKey]?.bg || 'bg-gray-100'} ${STATUS_COLORS[statusKey]?.text || 'text-gray-800'}`;
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200" style={{ backgroundColor: COLORS.LIGHT_GOLD }}>
        <h3 className="text-lg font-medium text-gray-800">Recent Causes</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead style={{ backgroundColor: COLORS.LIGHT_GOLD }}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Cause Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Donations</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {causes.map((cause) => (
              <tr key={cause.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cause.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(cause.status)}`}>
                    {cause.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cause.donations}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cause.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button 
                    style={{ backgroundColor: COLORS.MAIN_GOLD, color: COLORS.WHITE }}
                    className="px-3 py-1 rounded-md hover:bg-opacity-90 transition-colors"
                    onClick={() => alert(`View details for ${cause.name}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-200 bg-white">
        <button 
          style={{ color: COLORS.MAIN_GOLD }}
          className="text-sm font-medium hover:underline"
        >
          View All Causes
        </button>
      </div>
    </div>
  );
}   