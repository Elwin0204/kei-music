// src/pages/Home.tsx
import type { FC } from 'react'
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async'
import { VinylPlayer } from '@/components/ui/vinyl-player';
import styles from './Home.module.css';
import { cn } from '@/utils';
import { useAppContext } from '@/components/AppProvider';

// 从 hooks 目录引入 hook
import { useSeason } from '@/hooks/useSeason';

/**
 * Home 页面组件
 *
 * 网站的首页，旨在提供一个全屏沉浸式的用户体验。
 * 特点：
 * - SEO 优化：使用 react-helmet-async 设置页面标题、描述等元数据。
 * - 视觉焦点：采用全屏背景图片，营造沉浸感。
 * - 内容展示：包含欢迎信息、核心标语等。
 * - 结构清晰：将背景层和内容层分离，确保内容可读性和布局稳定性。
 * - 响应式设计：利用 Tailwind CSS 实现基本的响应式布局。
 * - 多语言与季节主题：根据当前日期自动切换多语言和季节主题文案。
 */
export const Home: FC = () => {
  const [currentVinySize, setCurrentVinySize] = useState(375);
  const { theme, t } = useAppContext();

  const { currentSeason } = useSeason({
    initialMode: 'rotation',
    rotationIntervalMs: 5000,
  });

  // 根据主题计算透明度
  const getVinyOpacity = (t: 'light' | 'dark'): number => {
    // light 主题下调低透明度，dark 主题下保持不透明
    return t === 'light' ? 0.15 : 0.25;
  };

  // 根据主题计算文字透明度
  const getTextOpacity = (t: 'light' | 'dark'): number => {
    // light 主题下调低透明度以适应亮色背景，dark 主题下可以稍微深一些
    return t === 'light' ? 0.65 : 0.8; // 主标题透明度
  };

  // 根据主题计算副标题透明度
  const getSubTextOpacity = (t: 'light' | 'dark'): number => {
    // 副标题通常比主标题更淡一些
    return t === 'light' ? 0.5 : 0.65; // 副标题透明度
  };

  // 定义一个函数来根据屏幕高度计算 vinySize
  const calculateVinySize = (height: number): number => {
    // 基准：1080px 高度对应 1920px 大小
    const baseHeight = 1080;
    const baseSize = 1920;

    // 简单的线性比例缩放，基于高度
    let calculatedSize = (height / baseHeight) * baseSize;

    // 限制最小和最大尺寸 (可选)
    const minSize = 256;
    const maxSize = 1024;
    calculatedSize = Math.max(minSize, Math.min(maxSize, calculatedSize));

    return Math.round(calculatedSize);
  };

  useEffect(() => {
    // 初始化大小 - 使用 innerHeight
    const initialSize = calculateVinySize(window.innerHeight);
    setCurrentVinySize(initialSize);

    // 定义事件处理函数 - 使用 innerHeight
    const handleResize = () => {
      const newHeight = window.innerHeight; // 获取当前窗口高度
      const newSize = calculateVinySize(newHeight); // 使用高度计算
      setCurrentVinySize(newSize);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  // 动态获取当前季节的标题和副标题
  const currentTitle = t(`home.${currentSeason}.title`);
  const currentSubtitle = t(`home.${currentSeason}.subtitle`);

  return (
    <>
      <Helmet>
        <title>陈佳 · 传承经典 | 官方音乐网站</title>
        <meta name="description" content="著名歌手陈佳，邓丽君歌曲传承人，经典重现与原创音乐作品展示。" />
        <meta property="og:title" content="陈佳 · 传承经典" />
        <meta property="og:description" content="聆听陈佳演绎的邓丽君经典，感受时代金曲的永恒魅力。" />
        <meta property="og:image" content="/og/home.jpg" />
        <meta property="og:url" content="https://kei-music.com/" />
        <link rel="canonical" href="https://kei-music.com/" />
      </Helmet>

      {/* 背景容器 */}
      <div 
        className={cn("fixed inset-0 -z-10", styles.homeBackground)}
      />

      {/* 主要内容容器 */}
      <div className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
        {/* 左侧内容区 */}
        <div className="flex-1 flex flex-col justify-center items-center gap-8 p-8">
          <div className="hidden md:flex flex-col gap-4 w-full max-w-2xl mx-auto px-4">
            <h1 className="relative">
              <p 
                className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight whitespace-nowrap" 
                style={{ opacity: getTextOpacity(theme) }}
              >
                {currentTitle}
              </p>
              <p 
                className="text-[clamp(1.25rem,3.5vw,2rem)] leading-relaxed whitespace-nowrap absolute left-1/5 top-18" 
                style={{ opacity: getSubTextOpacity(theme) }}
              >
                {currentSubtitle}
              </p>
            </h1>
          </div>
          {/* 移动端黑胶 - 显示在文字下方，正中间 */}
          <div className="lg:hidden flex justify-center">
            <VinylPlayer
              className="w-32 h-32"
              vinySize={300}
              vinyOpacity={getVinyOpacity(theme)} // 根据主题传递透明度
            />
          </div>
        </div>

        {/* 右侧容器，作为黑胶的定位上下文 */}
        <div className="hidden lg:block lg:w-1/2 relative" style={{ height: `${currentVinySize}px` }}>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 z-10">
            <VinylPlayer
              className="w-full h-full"
              vinySize={currentVinySize}
              vinyOpacity={getVinyOpacity(theme)}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home