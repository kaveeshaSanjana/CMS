// src/components/layout/NavItem.jsx
import { COLORS } from '../../utils/constants';

export default function NavItem({ icon, label, active, onClick }) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center w-full px-4 py-2 rounded-md ${
          active ? 'bg-opacity-20' : 'hover:bg-opacity-10'
        }`}
        style={{ 
          backgroundColor: active ? COLORS.MAIN_GOLD : 'transparent',
          opacity: active ? 0.2 : 1
        }}
      >
        <span 
          className={active ? 'text-gray-900' : 'text-gray-200'}
          style={active ? { color: COLORS.MAIN_GOLD } : {}}
        >
          {icon}
        </span>
        <span 
          className={`ml-3 ${active ? 'font-medium' : ''}`}
          style={active ? { color: COLORS.MAIN_GOLD } : { color: COLORS.WHITE }}
        >
          {label}
        </span>
      </button>
    </li>
  );
}