// src/features/concerts/ui/FanInteractions.tsx

import React from 'react'
import { fanCardsData1, fanCardsData2, fanCardsData3, fanCardsData4 } from '@/features/concerts/data/fans'
import { FanCard } from './FanCard';
import styles from './FanInteractions.module.css'
import { cn } from '@/utils'
import { KeiIcon } from '@/components/ui/kei-icon';

const FanInteractions: React.FC = () => {
  const slideData1 = [...fanCardsData1]; // 原始数据
  const slideData2 = [...fanCardsData2];
  const slideData3 = [...fanCardsData3];
  const slideData4 = [...fanCardsData4];

  return (
    <section className="py-8">
      <div className="px-0">
        <h2 className="mb-6 text-center text-3xl font-bold flex items-center justify-center gap-2">
          <KeiIcon name="Fan" size={48} className="shrink-0 text-[#FF4949]" />
          佳友相伴，寄语暖心
        </h2>
        
        {/* 第一行 - 快速滚动 */}
        <div className={cn(styles.marqueeContainer, 'mb-4')}>
          <div className={cn(styles.marquee)}>
            <div className={cn(styles.marqueeContent, styles.fast)}>
              {slideData1.map((item, index) => (
                <FanCard
                  key={`row1-${index}`}
                  name={item.name}
                  checkIn={item.checkIn}
                  message={item.message}
                />
              ))}
            </div>
            {/* 无缝滚动的关键：添加相同的内容作为副本 */}
            <div className={cn(styles.marqueeContent, styles.fast)} aria-hidden="true">
              {slideData1.map((item, index) => (
                <FanCard
                  key={`row1-dup-${index}`}
                  name={item.name}
                  checkIn={item.checkIn}
                  message={item.message}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 第二行 - 慢速滚动 */}
        <div className={cn(styles.marqueeContainer, 'mb-4')}>
          <div className={cn(styles.marquee)}>
            <div className={cn(styles.marqueeContent, styles.slow)}>
              {slideData2.map((item, index) => (
                <FanCard
                  key={`row2-${index}`}
                  name={item.name}
                  checkIn={item.checkIn}
                  message={item.message}
                />
              ))}
            </div>
            {/* 无缝滚动的关键：添加相同的内容作为副本 */}
            <div className={cn(styles.marqueeContent, styles.slow)} aria-hidden="true">
              {slideData2.map((item, index) => (
                <FanCard
                  key={`row2-dup-${index}`}
                  name={item.name}
                  checkIn={item.checkIn}
                  message={item.message}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 第三行 - 快速滚动 */}
        <div className={cn(styles.marqueeContainer, 'mb-4')}>
          <div className={cn(styles.marquee)}>
            <div className={cn(styles.marqueeContent, styles.fast)}>
              {slideData3.map((item, index) => (
                <FanCard
                  key={`row3-${index}`}
                  name={item.name}
                  checkIn={item.checkIn}
                  message={item.message}
                />
              ))}
            </div>
            {/* 无缝滚动的关键：添加相同的内容作为副本 */}
            <div className={cn(styles.marqueeContent, styles.fast)} aria-hidden="true">
              {slideData3.map((item, index) => (
                <FanCard
                  key={`row3-dup-${index}`}
                  name={item.name}
                  checkIn={item.checkIn}
                  message={item.message}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 第四行 - 慢速滚动 */}
        <div className={cn(styles.marqueeContainer, 'mb-4')}>
          <div className={cn(styles.marquee)}>
            <div className={cn(styles.marqueeContent, styles.slow)}>
              {slideData4.map((item, index) => (
                <FanCard
                  key={`row4-${index}`}
                  name={item.name}
                  checkIn={item.checkIn}
                  message={item.message}
                />
              ))}
            </div>
            {/* 无缝滚动的关键：添加相同的内容作为副本 */}
            <div className={cn(styles.marqueeContent, styles.slow)} aria-hidden="true">
              {slideData4.map((item, index) => (
                <FanCard
                  key={`row4-dup-${index}`}
                  name={item.name}
                  checkIn={item.checkIn}
                  message={item.message}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FanInteractions