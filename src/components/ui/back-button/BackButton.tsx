// src/components/ui/back-button/BackButton.tsx
import { useNavigate } from 'react-router';
import { cn } from '@/utils';
import { KeiIcon } from '../kei-icon';

export interface BackButtonProps {
  className?: string;
  fallbackPath?: string; // 可选的备用路径，如果 history.back() 不成功，则导航到此路径
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  className = '',
  fallbackPath = '/' // 默认返回首页
}) => {
  const navigate = useNavigate(); // 获取 navigate 函数

  const handleClick = () => {
    // 尝试返回上一页
    if (window.history.state && window.history.state.idx > 0) {
      // 如果浏览器历史记录中有上一页，则返回
      navigate(-1);
    } else {
      // 否则，导航到备用路径（例如首页）
      navigate(fallbackPath);
    }
  };

  return (
    <button
      onClick={handleClick}
      // 使用 cn 函数合并基础类名和传入的 className
      className={cn(
        "p-2 rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none",
        className
      )}
      aria-label="返回上一页"
    >
      <KeiIcon name="ArrowLeft" size={20} className="shrink-0 text-primary" />
    </button>
  );
};