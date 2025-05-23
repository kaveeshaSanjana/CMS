// NavigationBar.jsx
import { useState } from 'react';
import { Home, Video, MessageCircle, Info, Heart, Users, LogOut, Menu, X } from 'lucide-react';

export default function NavigationBar({ activeSection, setActiveSection }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Toggle mobile navigation
  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  // Navigation items
  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', id: 'dashboard' },
    { icon: <Heart size={20} />, label: 'Causes', id: 'causes' },
    { icon: <Video size={20} />, label: 'Tutorials', id: 'tutorials' },
    { icon: <Users size={20} />, label: 'Students', id: 'students' },
    { icon: <MessageCircle size={20} />, label: 'Messages', id: 'messages' },
    { icon: <Info size={20} />, label: 'Resources', id: 'resources' },
  ];

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-30" style={{ backgroundColor: '#D4AF37' }}>
        <h1 className="text-white font-bold text-lg">Causes Platform</h1>
        <button 
          onClick={toggleMobileNav} 
          className="text-white"
        >
          {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div 
        className={`
          ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 fixed md:sticky top-0 h-screen transition-transform duration-300 ease-in-out 
          w-64 flex flex-col z-20
        `}
        style={{ backgroundColor: '#D4AF37' }}
      >
        {/* Logo/Brand */}
        <div className="flex items-center justify-center p-4 h-16">
          <h1 className="text-white font-bold text-xl">Causes Platform</h1>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`
                    flex items-center w-full p-3 rounded-md transition-colors duration-200
                    ${activeSection === item.id ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}
                  `}
                  onClick={() => {
                    setActiveSection(item.id);
                    if (isMobileNavOpen) setIsMobileNavOpen(false);
                  }}
                >
                  <span className="text-white mr-3">{item.icon}</span>
                  <span className="text-white">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white border-opacity-20">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center" style={{ color: '#D4AF37' }}>
              <span className="font-bold text-lg">JD</span>
            </div>
            <div className="ml-3">
              <p className="text-white font-medium">Jane Doe</p>
              <p className="text-white text-opacity-80 text-sm">Teacher</p>
            </div>
          </div>
          <button 
            className="mt-4 flex items-center w-full p-2 rounded-md hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
          >
            <LogOut size={18} className="text-white mr-2" />
            <span className="text-white">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile navigation */}
      {isMobileNavOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        ></div>
      )}
    </>
  );
}
