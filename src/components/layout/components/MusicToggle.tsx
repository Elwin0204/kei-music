// src/components/ui/music-toggle.tsx
import { KeiIcon } from '@/components/ui/kei-icon';
import { cn } from '@/utils';
import { type FC } from 'react';
// 从新的 AudioProvider 导入 Hook
import { useAudio } from '@/hooks/useAudio'; 

/**
 * MusicToggle 组件
 *
 * 一个用于切换背景音乐播放/暂停状态的按钮。
 * 特点：
 * - 依赖于 AudioProvider 管理的全局音频状态。
 * - 通过 useAudio Hook 获取播放状态和控制方法。
 * - 图标切换：根据当前播放状态显示对应的图标 (Pause, Play)。
 * - 可定制：允许外部通过 `className` 传入自定义样式。
 */
interface MusicToggleProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const MusicToggle: FC<MusicToggleProps> = ({ className, ...props }) => {
  // 从 AudioProvider 获取状态和方法
  const { isPlaying, togglePlay } = useAudio();

  const handleToggle = () => {
    togglePlay();
  };

  // 根据当前播放状态选择图标
  const renderIcon = () => {
    return isPlaying ? <KeiIcon name="Pause" size={28} /> : <KeiIcon name="Play" size={28} />;
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "p-2 rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-1 focus:ring-ring",
        className
      )}
      aria-label={isPlaying ? '暂停音乐' : '播放音乐'}
      {...props}
    >
      {renderIcon()} <span className='text-sm hidden sm:inline-block'>{isPlaying ? '暂停' : '播放'}</span>
    </button>
  );
};