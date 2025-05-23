// src/components/dashboard/ActionButton.jsx
import { useState } from 'react';
import { COLORS } from '../../utils/constants';

export default function ActionButton({ label, icon, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const buttonStyle = {
    backgroundColor: COLORS.LIGHT_GOLD,
    color: COLORS.GRAY_800,
    borderColor: COLORS.MAIN_GOLD
  };
  
  const hoverStyle = {
    backgroundColor: COLORS.MAIN_GOLD,
    color: COLORS.WHITE
  };
  
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-colors"
      style={isHovered ? {...buttonStyle, ...hoverStyle} : buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}