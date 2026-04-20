// src/features/concerts/ui/FanInteractions.tsx

import React, { useState, useEffect, useRef } from 'react'
import { liveCardsData } from '@/features/concerts/data/lives' // 導入數據
import { KeiIcon } from '@/components/ui/kei-icon'
import styles from './LiveMoments.module.css'
import { cn } from '@/utils'

const FanInteractions: React.FC = () => {
  const extendedCards = [...liveCardsData, ...liveCardsData, ...liveCardsData]
  const originalLength = liveCardsData.length // 假設為 10
  const slideCount = extendedCards.length // 擴展後的卡片總數，為 originalLength * 3
  const cardWidth = 340 // 假設每張卡片的寬度為 340px，請根據實際情況調整
  const [containerWidth, setContainerWidth] = useState(0) // 用於存儲容器寬度
  const containerRef = useRef<HTMLDivElement>(null)

  // 初始化位置為第一組真實數據的起始位置 (索引 10)
  const initialIndex = originalLength
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isTransitioning, setIsTransitioning] = useState(false)
  // 新增狀態：是否跳過過渡動畫
  const [skipTransition, setSkipTransition] = useState(false)

  // 在組件掛載時及窗口大小改變時更新容器寬度
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    updateWidth() // 初始化
    window.addEventListener('resize', updateWidth) // 監聽視窗大小改變

    return () => {
      window.removeEventListener('resize', updateWidth) // 清理監聽器
    }
  }, [])

  const handleSlideChange = (newIndex: number) => {
    if (isTransitioning) return; // 防止快速点击

    let targetIndex = newIndex;
    let shouldSkipTransition = false;

    // 檢查是否到達右邊界或左邊界
    if (newIndex >= originalLength * 2) {
      // 從第二組跳轉到第一組
      targetIndex = newIndex - originalLength;
      shouldSkipTransition = true;
    } else if (newIndex < originalLength) {
      // 從第一組跳轉到第三組
      targetIndex = newIndex + originalLength;
      shouldSkipTransition = true;
    }

    // 觸發正常過渡
    setIsTransitioning(true);
    setCurrentIndex(newIndex);

    if (shouldSkipTransition) {
      // 跨越邊界時的特殊處理
      setTimeout(() => {
        setSkipTransition(true);
        setCurrentIndex(targetIndex);
        requestAnimationFrame(() => {
          setSkipTransition(false);
          setIsTransitioning(false);
        });
      }, 400);
    } else {
      // 正常情況下400ms後重置
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
    }
  };
  const nextSlide = () => {
    handleSlideChange(currentIndex + 1);
  }

  const prevSlide = () => {
    handleSlideChange(currentIndex - 1);
  }

  // 計算動態軌道寬度 (容器寬度 x 卡片數量)
  const dynamicTrackWidth = containerWidth * slideCount;

  // 計算當前偏移量 (translateX)
  // 偏移量 = -(currentIndex * 卡片寬度)
  const translateX = -currentIndex * cardWidth

  return (
    <section className="py-8">
      <div className="px-0">
        <h2 className="mb-6 text-center text-3xl font-bold flex items-center justify-center gap-2">
          <KeiIcon name="Live" size={48} className="shrink-0 text-primary" />
          现场风采，光影瞬间
        </h2>

        {/* 卡片容器 */}
        <div ref={containerRef} className="slick-slider relative">
          {/* 左侧箭头 */}
          <button
            onClick={prevSlide}
            className="hover:bg-primary/20 text-primary-foreground hover:text-primary absolute top-1/2 left-4 z-10 -translate-y-1/2 transform rounded-full bg-white/30 p-2 shadow-md backdrop-blur-md transition-all duration-300"
            aria-label="上一张"
            disabled={isTransitioning} // 添加禁用状态防止过渡期间点击
          >
            <KeiIcon name="SlickLeft" size={24} className="shrink-0" />
          </button>
          {/* 右侧箭头 */}
          <button
            onClick={nextSlide}
            className="hover:bg-primary/20 text-primary-foreground hover:text-primary absolute top-1/2 right-4 z-10 -translate-y-1/2 transform rounded-full bg-white/30 p-2 shadow-md backdrop-blur-md transition-all duration-300"
            aria-label="下一张"
            disabled={isTransitioning} // 添加禁用状态防止过渡期间点击
          >
            <KeiIcon name="SlickRight" size={24} className="shrink-0" />
          </button>
          {/* 滑动轨道 */}
          <div
            className={cn("slick-list relative translate-z-0 overflow-hidden focus:outline-none", styles.slickList)}
            dir="ltr"
          >
            <div
              className={cn(
                'slick-track relative mx-auto before:table before:content-[""] after:table after:content-[""]',
                skipTransition ? 'transition-none' : styles.slickTransition // 條件性地應用類
              )}
              style={{
                width: `${dynamicTrackWidth}px`, // 動態計算寬度 (容器寬度 x 卡片數量)
                transform: `translate3d(${translateX}px, 0, 0)` // 動態計算偏移量
              }}
            >
              {extendedCards.map((item, index) => {
                return (
                  <div className="slick-slide min-h-1px float-left h-full outline-none" key={index}>
                    <div className="inline-block align-top w-85 py-6">
                      <div className="relative h-120 w-80 overflow-hidden rounded-3xl shadow-sm shadow-gray-400/30">
                        <img src={ item.cover } alt={item.name} className='w-full h-full object-cover' />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* 指示器区域 */}
          <div className="flex justify-center mt-6 space-x-3">
            {liveCardsData.map((_, index) => (
              <button
                key={`indicator-${index}`}
                className={cn(
                  "w-3 h-3 rounded-full cursor-pointer transition-all duration-300",
                  index + originalLength === currentIndex 
                    ? "bg-primary scale-150" // 当前项放大并使用主色调
                    : "bg-gray-300 hover:bg-gray-400" // 其他项使用灰色
                )}
                onClick={() => {
                  // 计算目标索引，使其落在中间组的范围内
                  const targetIndex = index + originalLength;
                  handleSlideChange(targetIndex);
                }}
                aria-label={`前往第 ${index + 1} 张卡片`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FanInteractions