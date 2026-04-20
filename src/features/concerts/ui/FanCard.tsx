// src/features/concerts/ui/FanCard.tsx
import React from 'react';
import { cn } from '@/utils';
import { KeiIcon } from '@/components/ui/kei-icon';

interface FanCardProps {
  name: string;
  checkIn: string;
  message: string;
  className?: string;
}

// 预设颜色数组（保持原样，用于名字）
const NAME_COLORS = [
  'text-red-500',
  'text-blue-500',
  'text-green-500',
  'text-yellow-500',
  'text-purple-500',
  'text-pink-500',
  'text-indigo-500',
  'text-orange-500',
  'text-teal-500',
  'text-cyan-500',
  'text-lime-500',
  'text-emerald-500',
  'text-violet-500',
  'text-fuchsia-500',
  'text-rose-500'
];

// 根据名字生成确定性颜色（相同名字 → 相同颜色）
const getNameColor = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % NAME_COLORS.length;
  return NAME_COLORS[index];
};

export const FanCard: React.FC<FanCardProps> = ({ 
  name, 
  checkIn, 
  message, 
  className 
}) => {
  const nameColor = getNameColor(name);
  
  return (
    <div className={cn(
      "bg-white/10 backdrop-blur-sm border border-primary/30 rounded-xl p-4 mx-2 min-w-60 max-w-80 cursor-pointer",
      "shadow-sm shadow-primary/20",
      "hover:bg-white/20 hover:shadow-md hover:shadow-primary/30",
      "transition-all duration-300 ease-in-out",
      className
    )}>
      <h3 className="flex items-center font-semibold text-md mb-1 truncate text-foreground">
        <KeiIcon name="Fan" size={24} className="shrink-0 mr-1 text-[#FF4949]" />
        <span className={nameColor}>{name}</span>
      </h3>
      
      {/* checkIn：使用中灰色，匹配图中效果 */}
      <p className="flex items-center text-sm mb-2 truncate text-foreground/70">
        <KeiIcon name="Live" size={24} className="shrink-0 mr-1 text-primary" />
        {checkIn}
      </p>
      
      {/* message：使用更浅的灰色，图标保留 primary 色，文字淡灰 */}
      <p className="text-foreground/60 text-sm leading-relaxed wrap-break-word line-clamp-2">
        <KeiIcon name="Send" size={20} className="shrink-0 mr-1 text-primary" />
        {message}
      </p>
    </div>
  );
};