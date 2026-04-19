// src/features/concerts/ui/FanInteractions.tsx

import React from 'react'
import { fanCardsData1, fanCardsData2, fanCardsData3, fanCardsData4 } from '@/features/concerts/data/fans' // 導入數據
// import { KeiIcon } from '@/components/ui/kei-icon'
import { FanCard } from './FanCard'; // 导入新组件
import styles from './FanInteractions.module.css'
import { cn } from '@/utils'

const FanInteractions: React.FC = () => {
  const slideData1 = [...fanCardsData1, ...fanCardsData1];
  const slideData2 = [...fanCardsData2, ...fanCardsData2];
  const slideData3 = [...fanCardsData3, ...fanCardsData3];
  const slideData4 = [...fanCardsData4, ...fanCardsData4];

  return (
    <section className="py-8">
      <div className="px-0">
        <h2 className="mb-6 text-center text-3xl font-bold">佳友相伴，寄语暖心</h2>
        
        {/* 第一行 - 快速滚动 */}
        <div className={cn(styles.marqueeContainer, 'mb-4')}>
          <div className={cn(styles.marquee, styles.fast)}>
            <div className={styles.marqueeContent}>
              {slideData1.map((item, index) => (
                <FanCard 
                  key={`row1-${index}`} 
                  name={item.name}
                  checkIn={item.checkIn}
                  message={item.message}
                />
              ))}
            </div>
            <div className={styles.marqueeContent} aria-hidden="true">
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
          <div className={cn(styles.marquee, styles.slow)}>
            <div className={styles.marqueeContent}>
              {slideData2.map((item, index) => (
                <FanCard 
                  key={`row2-${index}`} 
                  name={item.name}
                  checkIn={item.checkIn}
                  message={item.message}
                />
              ))}
            </div>
            <div className={styles.marqueeContent} aria-hidden="true">
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
          <div className={cn(styles.marquee, styles.fast)}>
            <div className={styles.marqueeContent}>
              {slideData3.map((item, index) => (
                <FanCard 
                  key={`row3-${index}`} 
                  name={item.name}
                  checkIn={item.checkIn}
                  message={item.message}
                />
              ))}
            </div>
            <div className={styles.marqueeContent} aria-hidden="true">
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
          <div className={cn(styles.marquee, styles.slow)}>
            <div className={styles.marqueeContent}>
              {slideData4.map((item, index) => (
                <FanCard 
                  key={`row4-${index}`} 
                  name={item.name}
                  checkIn={item.checkIn}
                  message={item.message}
                />
              ))}
            </div>
            <div className={styles.marqueeContent} aria-hidden="true">
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