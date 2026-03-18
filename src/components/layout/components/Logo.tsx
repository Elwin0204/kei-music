// src/components/layout/components/Logo.tsx
import { type FC } from 'react';
import { Link } from 'react-router';
import { KeiIcon } from '@/components/ui/kei-icon';

interface LogoProps {
  onClick?: () => void; // 接收一个可选的点击回调，用于在Header中关闭菜单
}

export const Logo: FC<LogoProps> = ({ onClick }) => {
  return (
    <Link
      to="/"
      aria-label="陈佳音乐官网首页"
      className="text-base sm:text-xl font-bold outline-none tracking-tight text-foreground hover:text-primary transition-colors flex items-center gap-1"
      onClick={onClick}
    >
      <KeiIcon name="KeiLogo" size={40} className="shrink-0" />
      {/* 小圆点分隔符 */}
      <span className="hidden sm:inline-block text-2xl font-bold mx-1">
        ·
      </span>
      <span className="hidden sm:inline-block">陈佳</span>
    </Link>
  );
};