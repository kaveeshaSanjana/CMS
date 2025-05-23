// src/components/dashboard/NotificationsList.jsx
import { CheckCircle, AlertCircle, Bell } from 'lucide-react';
import { COLORS, NOTIFICATION_TYPES } from '../../utils/constants';

export default function NotificationsList({ notifications }) {
  const getNotificationIcon = (type) => {
    const iconConfig = NOTIFICATION_TYPES[type];
    
    if (type === 'success') return <CheckCircle size={16} color={iconConfig.color} />;
    if (type === 'error') return <AlertCircle size={16} color={iconConfig.color} />;
    if (type === 'warning') return <AlertCircle size={16} color={iconConfig.color} />;
    return <Bell size={16} color={iconConfig.color} />;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200" style={{ backgroundColor: COLORS.LIGHT_GOLD }}>
        <h3 className="text-lg font-medium text-gray-800">Notifications</h3>
      </div>
      <div className="p-4">
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div className={`mt-1 rounded-full p-1 ${NOTIFICATION_TYPES[notification.type].bg}`}>
                {getNotificationIcon(notification.type)}
              </div>
              <div>
                <p className="text-sm text-gray-700">{notification.message}</p>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t border-gray-200 bg-white">
        <button 
          style={{ color: COLORS.MAIN_GOLD }}
          className="text-sm font-medium hover:underline"
        >
          View All Notifications
        </button>
      </div>
    </div>
  );
}