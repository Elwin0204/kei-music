// src/pages/Concerts.tsx
import { cn } from '@/utils';
import type { FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react';
import concert_bg_pc from '@/assets/images/concert_bg_pc.jpg'
import styles from './Concerts.module.css';

/**
 * 演出活动页：双视图展示
 * - 视图切换：日历模式 / 地图模式
 * - 日历：高亮未来演出日期
 * - 地图：城市标记（使用轻量地图库）
 * - 演出列表：日期、城市、场馆、购票链接
 */
export const Concerts: FC = () => {
  const canonicalUrl = `https://elwin0204.github.io/kei-music/concerts`;
  
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
  }, []); // 空依赖数组，表示此 effect 只在组件挂载和卸载时运行

  return (
    <>
      <Helmet>
        <title>演出活动 | 陈佳演唱会日程</title>
        <meta name="description" content="查看陈佳最新演唱会安排、城市巡演日程及购票信息。" />
        <meta property="og:title" content="陈佳 · 演出活动" />
        <meta property="og:description" content="现场感受陈佳演绎的经典之声，获取最新演出资讯。" />
        <meta property="og:image" content="/og/kei.jpg" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="陈佳 · 传承经典" />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div>
        {/* 演出内容 */}
        <div
          className={cn(
            "w-full bg-cover bg-center bg-no-repeat",
            styles.fadeMask
          )}
          style={{
            backgroundImage: `url(${concert_bg_pc})`,
            // 动态设置计算出的高度
            height: `${calculatedHeight}px`,
          }}
        />
      </div>
    </>
  )
}

export default Concerts