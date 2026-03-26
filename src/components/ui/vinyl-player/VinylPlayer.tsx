// src/components/ui/vinyl-player/VinylPlayer.tsx

import React, { useState, useEffect, useRef } from 'react';
import styles from './VinylPlayer.module.css';
import { cn } from '@/utils';
import VinyBg from '@/assets/images/viny.png';

export interface VinylPlayerProps {
  title?: string;
  artist?: string;
  rpm?: number;
  isPlaying?: boolean;
  onPlayPause?: (isPlaying: boolean) => void;
  className?: string;
  // 专辑封面图片 URL
  albumCoverUrl?: string;
  // 黑胶花纹图片 URL
  vinylPatternUrl?: string;
  // 黑胶唱片大小 (像素值)
  vinySize?: number;
  vinyOpacity?: number;
  // 叠加颜色
  overlayColor?: string;
}

export const VinylPlayer: React.FC<VinylPlayerProps> = ({
  rpm = 33,
  isPlaying: externalIsPlaying,
  onPlayPause,
  className = '',
  vinySize = 128, // 默认大小为 128px
  vinyOpacity = 1.0,
  albumCoverUrl = '', // 默认专辑封面
  vinylPatternUrl = VinyBg, // 默认黑胶花纹图片
}) => {
  const [internalIsPlaying] = useState(true);
  const isCurrentlyPlaying = onPlayPause ? externalIsPlaying : internalIsPlaying;

  const rotationDuration = `${(60 / rpm) * 60}s`;

  const vinylRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (vinylRef.current) {
      if (isCurrentlyPlaying) {
        vinylRef.current.classList.remove(styles.vinylPause);
        vinylRef.current.classList.add(styles.vinylPlay);
      } else {
        vinylRef.current.classList.remove(styles.vinylPlay);
        vinylRef.current.classList.add(styles.vinylPause);
      }
    }
  }, [isCurrentlyPlaying]);

  // 计算动态样式
  const vinylStyle = {
    width: `${vinySize}px`,
    height: `${vinySize}px`,
    opacity: `${vinyOpacity}`,
    animationDuration: rotationDuration,
    transform: 'translateZ(0)',
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* 唱片容器 */}
      <div className="relative">
        {/* 唱片容器 - 使用 mask */}
        <div
          ref={vinylRef}
          className={cn(
            "relative rounded-full overflow-hidden", // 移除固定的 w-96 h-96
            isCurrentlyPlaying ? styles.vinylPlay : styles.vinylPause
          )}
          style={vinylStyle} // 应用动态计算的样式
        >
          {/* 专辑封面 */}
          <div
            className={styles.albumCover}
            style={{
              backgroundImage: `url(${albumCoverUrl})`,
            }}
          ></div>

          {/* 唱片本体 - 使用你的黑胶花纹图片 */}
          <div
            className={styles.vinylDisc}
            style={{
              backgroundImage: `url(${vinylPatternUrl})`,
              backgroundSize: 'cover', // 确保花纹图片铺满整个唱片
              backgroundPosition: 'center', // 居中
              mixBlendMode: 'multiply', // 使用 mix-blend-mode 进行颜色叠加
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

VinylPlayer.displayName = 'VinylPlayer';