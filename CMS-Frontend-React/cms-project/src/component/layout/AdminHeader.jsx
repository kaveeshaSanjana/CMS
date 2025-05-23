// src/components/layout/Header.jsx
import { useState } from 'react';
import { Bell, User, Heart, Menu, X } from 'lucide-react';
import NavItem from './NavItem';
import NotificationsPanel from './NotificationPanel';
import { COLORS } from '../../utils/constants';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  notifications,
  isMobileMenuOpen, 
  toggleMobileMenu 
}) {
  const [notificationOpen, setNotificationOpen] = useState(false);

  const toggleNotifications = () => {
    setNotificationOpen(!notificationOpen);
  };

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Heart size={28} color={COLORS.MAIN_GOLD} strokeWidth={2} />
              <h1 className="ml-2 text-xl font-semibold text-gray-800">
                Golden <span style={{ color: COLORS.MAIN_GOLD }}>Heart</span> Admin
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={toggleNotifications}
                className="relative p-2 rounded-full hover:bg-gray-100"
                aria-label="Notifications"
              >
                <Bell size={20} color={COLORS.MAIN_GOLD} />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>
              <div className="flex items-center px-3 py-2 rounded-full bg-gray-100">
                <User size={18} color={COLORS.MAIN_GOLD} />
                <span className="ml-2 text-sm font-medium">Admin User</span>
              </div>
            </div>
            
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="p-2 rounded-md hover:bg-gray-100" 
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden shadow-lg" style={{ backgroundColor: COLORS.MAIN_GOLD }}>
          <nav className="px-4 py-3">
            <ul className="space-y-2">
              <NavItem 
                icon={<Home size={18} />} 
                label="Dashboard" 
                active={activeTab === 'dashboard'} 
                onClick={() => setActiveTab('dashboard')} 
              />
              <NavItem 
                icon={<Heart size={18} />} 
                label="Causes" 
                active={activeTab === 'causes'} 
                onClick={() => setActiveTab('causes')} 
              />
              <NavItem 
                icon={<PieChart size={18} />} 
                label="Analytics" 
                active={activeTab === 'analytics'} 
                onClick={() => setActiveTab('analytics')} 
              />
              <NavItem 
                icon={<MessageCircle size={18} />} 
                label="Messages" 
                active={activeTab === 'messages'} 
                onClick={() => setActiveTab('messages')} 
              />
              <NavItem 
                icon={<Settings size={18} />} 
                label="Settings" 
                active={activeTab === 'settings'} 
                onClick={() => setActiveTab('settings')} 
              />
            </ul>
          </nav>
        </div>
      )}

      {/* Notifications Panel */}
      {notificationOpen && (
        <NotificationsPanel 
          notifications={notifications} 
          onClose={toggleNotifications} 
        />
      )}
    </>
  );
}