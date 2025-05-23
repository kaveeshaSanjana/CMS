// src/components/layout/Sidebar.jsx
import { Home, Heart, PieChart, MessageCircle, Settings } from 'lucide-react';
import NavItem from './NavItem';
import { COLORS } from '../../utils/constants';

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside 
      className="hidden md:block w-64 shadow-md" 
      style={{ backgroundColor: COLORS.MAIN_GOLD }}
    >
      <nav className="px-4 py-6">
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
    </aside>
  );
}