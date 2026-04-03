// src/features/concerts/ui/HeroSection.tsx

import React, { useState, useEffect } from 'react';
import { cn } from '@/utils';
import styles from './HeroSection.module.css';
import concert_bg_pc from '@/assets/images/concert_bg_pc.jpg';

interface HeroSectionProps {
  onActionClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = () => {
  // 使用 state 存储计算出的高度
  const [calculatedHeight, setCalculatedHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      // 获取当前窗口的宽度
      const windowWidth = window.innerWidth;
      // 计算 16:9 比例下的高度 (windowWidth / 16 * 6)
      const newHeight = (windowWidth / 16) * 6;
      setCalculatedHeight(newHeight);
    };

    // 初始计算
    updateHeight();

    // 添加 resize 监听器，窗口大小改变时重新计算
    window.addEventListener('resize', updateHeight);

    // 组件卸载时移除监听器，防止内存泄漏
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []); // 空依赖数组

  return (
    <div className={styles.heroContainer}>
      {/* 将计算出的高度应用到背景 div */}
      <div
        className={cn(
          "w-full bg-cover bg-center bg-no-repeat",
          styles.heroBackground
        )}
        style={{
          backgroundImage: `url(${concert_bg_pc})`,
          // 动态设置计算出的高度
          height: `${calculatedHeight}px`,
        }}
      />
    </div>
  );
};

export default HeroSection;