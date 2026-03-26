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
type MusicToggleProps = React.HTMLAttributes<HTMLDivElement>

export const MusicToggle: FC<MusicToggleProps> = ({ className, ...props }) => {
  // 从 AudioProvider 获取状态和方法
  const { isPlaying, togglePlay, prevTrack, nextTrack } = useAudio();

  const handleToggle = () => {
    togglePlay();
  };

  const handlePrev = () => {
    prevTrack();
  };

  const handleNext = () => {
    nextTrack();
  };

  // 根据当前播放状态选择图标
  const renderPlayIcon = () => {
    return isPlaying ? <KeiIcon name="Pause" size={28} /> : <KeiIcon name="Play" size={28} />;
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-transparent px-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hover:ring-1 hover:ring-ring",
        className
      )}
      {...props}
    >
      {/* 上一曲按钮 */}
      <button
        onClick={handlePrev}
        className="p-2 rounded-full transition-colors cursor-pointer focus:outline-none hover:text-primary"
        aria-label="上一曲"
      >
        <KeiIcon name="SkipPrevious" size={20} />
      </button>

      {/* 播放/暂停按钮 */}
      <button
        onClick={handleToggle}
        className="p-2 rounded-full transition-colors cursor-pointer focus:outline-none hover:text-primary mx-1" // 添加左右 margin
        aria-label={isPlaying ? '暂停音乐' : '播放音乐'}
      >
        {renderPlayIcon()}
      </button>

      {/* 下一曲按钮 */}
      <button
        onClick={handleNext}
        className="p-2 rounded-full transition-colors cursor-pointer focus:outline-none hover:text-primary"
        aria-label="下一曲"
      >
        <KeiIcon name="SkipNext" size={20} />
      </button>
    </div>
  );
};