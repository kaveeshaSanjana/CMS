// src/components/layout/NotificationsPanel.jsx
import { X, CheckCircle, AlertCircle, Bell } from 'lucide-react';
import { COLORS, NOTIFICATION_TYPES } from '../../utils/constants';

export default function NotificationsPanel({ notifications, onClose }) {
  const getNotificationIcon = (type) => {
    const iconConfig = NOTIFICATION_TYPES[type];
    
    if (type === 'success') return <CheckCircle size={16} color={iconConfig.color} />;
    if (type === 'error') return <AlertCircle size={16} color={iconConfig.color} />;
    if (type === 'warning') return <AlertCircle size={16} color={iconConfig.color} />;
    return <Bell size={16} color={iconConfig.color} />;
  };

  return (
    <div className="fixed right-4 top-16 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
      <div className="p-3 border-b border-gray-200" style={{ backgroundColor: COLORS.LIGHT_GOLD }}>
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-800">Notifications</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={18} />
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <ul className="divide-y divide-gray-100">
          {notifications.map((notification) => (
            <li key={notification.id} className="p-3 hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <div className={`mt-1 rounded-full p-1 ${NOTIFICATION_TYPES[notification.type].bg}`}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div>
                  <p className="text-sm text-gray-700">{notification.message}</p>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-3 border-t border-gray-200 text-center">
        <button 
          style={{ color: COLORS.MAIN_GOLD }}
          className="text-sm font-medium hover:underline"
        >
          Mark All as Read
        </button>
      </div>
    </div>
  );
}