import type { FC } from 'react'
import { useEffect, useRef, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async'
import { VinylPlayer } from '@/components/ui/vinyl-player';
import styles from './Home.module.css';
import { cn } from '@/utils';
import { useAppContext } from '@/components/AppProvider';

import { useSeason } from '@/hooks/useSeason';

import bg_pc from '@/assets/images/home_bg_pc.jpg';
import bg_pc1 from '@/assets/images/home_bg_pc1.jpg';
import bg_pc2 from '@/assets/images/home_bg_pc2.jpg';
import bg_pc3 from '@/assets/images/home_bg_pc3.jpg';
import bg_pc4 from '@/assets/images/home_bg_pc4.jpg';
import bg_pc5 from '@/assets/images/home_bg_pc5.jpg';
import bg_pc6 from '@/assets/images/home_bg_pc6.jpg';

import bg_mobile from '@/assets/images/home_bg_mobile.jpg';
import bg_mobile1 from '@/assets/images/home_bg_mobile1.jpg';
import bg_mobile2 from '@/assets/images/home_bg_mobile2.jpg';
import bg_mobile3 from '@/assets/images/home_bg_mobile3.jpg';
import bg_mobile4 from '@/assets/images/home_bg_mobile4.jpg';
import bg_mobile5 from '@/assets/images/home_bg_mobile5.jpg';
import bg_mobile6 from '@/assets/images/home_bg_mobile6.jpg';
import bg_mobile7 from '@/assets/images/home_bg_mobile7.jpg';
import bg_mobile8 from '@/assets/images/home_bg_mobile8.jpg';

import bg_magnolia from '@/assets/images/home_bg_magnolia.png';

export const Home: FC = () => {
  const canonicalUrl = `https://elwin0204.github.io/kei-music/`;
  // 使用 useRef 来存储初始计算的尺寸
  const initialCalculatedSizeRef = useRef<number | null>(null);

  // 将初始状态设置为 null 或一个合理的默认值，然后在 effect 中更新
  const [currentVinySize, setCurrentVinySize] = useState<number | null>(null); 
  const { theme, t } = useAppContext();

  const { currentSeason } = useSeason({
    initialMode: 'rotation',
    rotationIntervalMs: 5000,
  });

  const pcBackgroundImages = [bg_pc, bg_pc1, bg_pc2, bg_pc3, bg_pc4, bg_pc5, bg_pc6];
  const mobileBackgroundImages = [bg_mobile, bg_mobile1, bg_mobile2, bg_mobile3, bg_mobile4, bg_mobile5, bg_mobile6, bg_mobile7, bg_mobile8];

  const currentImageArray = window.innerWidth >= 1024 ? pcBackgroundImages : mobileBackgroundImages;
  const totalImages = currentImageArray.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 新增：玉兰花滤镜值状态
  const [currentMagnoliaFilter, setCurrentMagnoliaFilter] = useState<string>('');
  const [isFilterTransitioning, setIsFilterTransitioning] = useState(false);

  // 使用 useRef 来跟踪是否是首次渲染
  const isFirstRender = useRef(true);

  // 使用 useMemo 缓存根据currentIndex计算的滤镜值
  const computedFilter = useMemo(() => {
    // 定义每个索引对应的滤镜值
    const filters = [
      'hue-rotate(-20deg) saturate(1.1) brightness(0.9)', // 冷色调
      'hue-rotate(0deg) saturate(1.0) brightness(1.0)',  // 中性
      'hue-rotate(15deg) saturate(1.2) brightness(1.05)', // 暖黄
      'hue-rotate(30deg) saturate(1.3) brightness(1.1)',  // 暖色调
      'hue-rotate(10deg) saturate(1.15) brightness(1.0)', // 橙色
      'hue-rotate(-10deg) saturate(1.05) brightness(0.95)', // 蓝色
    ];
    
    return filters[currentIndex % filters.length];
  }, [currentIndex]);

  const changeImage = () => {
    if (totalImages <= 1) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setNextIndex(prevIndex => (prevIndex + 1) % totalImages);
      setIsTransitioning(false);
    }, 3000);
  };

  useEffect(() => {
    const intervalId = setInterval(changeImage, 6000);
    return () => clearInterval(intervalId);
  }, [nextIndex, totalImages]);

  useEffect(() => {
    const handleResize = () => {
      const newArray = window.innerWidth >= 1024 ? pcBackgroundImages : mobileBackgroundImages;
      if (newArray.length !== totalImages) {
        setCurrentIndex(0);
        setNextIndex(1);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [totalImages]);

  // 当computedFilter变化时，处理滤镜过渡
  useEffect(() => {
    // 使用Promise.resolve().then来将状态更新推迟到下一个tick
    Promise.resolve().then(() => {
      if (isFirstRender.current) {
        // 首次渲染时直接设置滤镜
        setCurrentMagnoliaFilter(computedFilter);
        isFirstRender.current = false;
      } else {
        // 不是首次渲染，开始过渡动画
        setIsFilterTransitioning(true);
        
        // 使用setTimeout确保DOM已经更新，然后完成过渡
        const timer = setTimeout(() => {
          setCurrentMagnoliaFilter(computedFilter);
          setIsFilterTransitioning(false);
        }, 300); // 300ms过渡时间

        return () => clearTimeout(timer);
      }
    });
  }, [computedFilter]); // 依赖于computedFilter

  const getVinyOpacity = (t: 'light' | 'dark'): number => {
    return t === 'light' ? 0.15 : 0.25;
  };

  const getTextOpacity = (t: 'light' | 'dark'): number => {
    return t === 'light' ? 0.65 : 0.8;
  };

  const getSubTextOpacity = (t: 'light' | 'dark'): number => {
    return t === 'light' ? 0.5 : 0.65;
  };

  const calculateVinySize = (height: number): number => {
    const baseHeight = 1080;
    const baseSize = 1920;
    let calculatedSize = (height / baseHeight) * baseSize;
    const minSize = 256;
    const maxSize = 1024;
    calculatedSize = Math.max(minSize, Math.min(maxSize, calculatedSize));
    return Math.round(calculatedSize);
  };

  // 修正后的尺寸计算和更新逻辑
  useEffect(() => {
    // 只在组件挂载时执行一次
    if (initialCalculatedSizeRef.current === null) {
      // 计算初始尺寸并存储在 ref 中
      initialCalculatedSizeRef.current = calculateVinySize(window.innerHeight);
      // 然后设置状态
      setCurrentVinySize(initialCalculatedSizeRef.current);
    }

    const handleResize = () => {
      const newHeight = window.innerHeight;
      const newSize = calculateVinySize(newHeight);
      setCurrentVinySize(newSize); // 响应式更新
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 依赖数组为空，确保此 effect 只在挂载和卸载时运行


  const currentTitle = t(`home.${currentSeason}.title`);
  const currentSubtitle = t(`home.${currentSeason}.subtitle`);

  return (
    <>
      <Helmet>
        <title>陈佳 · 传承经典 | 官方音乐网站</title>
        <meta name="description" content="著名歌手陈佳，邓丽君歌曲传承人，经典重现与原创音乐作品展示。" />
        <meta property="og:title" content="陈佳 · 传承经典" />
        <meta property="og:description" content="聆听陈佳演绎的邓丽君经典，感受时代金曲的永恒魅力。" />
        <meta property="og:image" content="/og/kei.jpg" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="陈佳 · 传承经典" />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center bg-no-repeat",
            isTransitioning ? styles.fadeTransition : ''
          )}
          style={{
            backgroundImage: `url(${currentImageArray[currentIndex]})`,
            opacity: isTransitioning ? 0 : 'var(--home-bg-opacity)',
          }}
        />
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center bg-no-repeat",
            isTransitioning ? styles.fadeIn : ''
          )}
          style={{
            backgroundImage: `url(${currentImageArray[nextIndex]})`,
            opacity: isTransitioning ? 'var(--home-bg-opacity)' : 0,
          }}
        />
        {/* 玉兰花叠加层 - 放置在背景之上 */}
        <div className="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none">
          <img
            src={ bg_magnolia }
            alt="玉兰花"
            className="absolute top-16 left-0 h-full opacity-70"
            style={{
              filter: currentMagnoliaFilter,
              transition: isFilterTransitioning ? 'filter 2s ease-in-out' : 'none' // 平滑过渡滤镜变化
            }}
          />
        </div>
      </div>

      <div className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
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
          <div className="lg:hidden flex justify-center">
            {/* 添加条件渲染，避免在 size 为 null 时传递 */}
            {currentVinySize !== null && (
              <VinylPlayer
                className="w-32 h-32"
                vinySize={300}
                vinyOpacity={getVinyOpacity(theme)}
              />
            )}
          </div>
        </div>

        <div className="hidden lg:block lg:w-1/2 relative" style={{ height: `${currentVinySize !== null ? currentVinySize : '500'}px` }}> {/* 提供一个默认高度 */}
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 z-10">
            {/* 添加条件渲染，避免在 size 为 null 时传递 */}
            {currentVinySize !== null && (
              <VinylPlayer
                className="w-full h-full"
                vinySize={currentVinySize}
                vinyOpacity={getVinyOpacity(theme)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home