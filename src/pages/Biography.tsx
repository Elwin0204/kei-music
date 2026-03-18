// src/pages/Biography.tsx
import type { FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { cn } from '@/utils'
import { timelineData } from '@/features/biography/data'
import type { TimelineSection } from '@/features/biography/types'
import styles from './Biography.module.css'
import { KeiIcon } from '@/components/ui/kei-icon'

/**
 * 生平事迹页：垂直时间轴叙事
 * - 按年份展示关键事件（加入基金会、首演等）
 * - 配历史照片/剧照
 * - 支持懒加载图片
 * - 包含年份导航（桌面端侧边，移动端顶部悬浮）
 */
export const Biography: FC = () => {
  // 提取所有年份用于导航
  const years = timelineData.map(section => section.year)

  return (
    <>
      <Helmet>
        <title>生平事迹 | 陈佳官方音乐网站</title>
        <meta name="description" content="了解歌手陈佳的艺术人生：从加入邓丽君文教基金会到全球巡演的精彩历程。" />
        <meta property="og:title" content="陈佳 · 生平事迹" />
        <meta property="og:description" content="探索陈佳如何成为邓丽君歌曲的最佳传承者之一。" />
        <meta property="og:image" content="/og/biography.jpg" />
        <meta property="og:url" content="https://kei-music.com/biography" />
        <link rel="canonical" href="https://kei-music.com/biography" />
      </Helmet>

      {/* 使用项目主题背景色 */}
      <div className="min-h-screen bg-background pb-16">
        {/* 移动端导航栏 - 绝对定位悬浮在顶部 */}
        <div className="fixed top-18 left-0 right-0 z-20 backdrop-blur-sm shadow-md md:hidden px-4 py-2">
          <nav className={ cn("overflow-x-auto", styles.hideScrollbar) }>
            <ul className="flex space-x-2 min-w-max">
              {years.map((year) => (
                <li key={year}>
                  <a
                    href={`#${year.replace(/\s+/g, '-').toLowerCase()}`}
                    className="block py-1 px-3 text-xs font-medium text-foreground whitespace-nowrap
                              hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors duration-200"
                  >
                    {year}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="container mx-auto px-4 pt-24 md:pt-12 pb-12 flex">
          {/* 桌面端固定年份导航栏 */}
          <div className="hidden md:block mr-8 sticky top-24 self-start">
            <nav className="space-y-2">
              <div className='flex flex-col justify-center items-center'>
                <KeiIcon name="AlarmClock" size={64} className="shrink-0" />
              </div>
              {years.map((year) => (
                <a
                  key={year}
                  href={`#${year.replace(/\s+/g, '-').toLowerCase()}`}
                  className={cn(
                    "block py-1.5 px-3 rounded-md text-center text-sm font-medium transition-all duration-200",
                    "hover:bg-primary/20 hover:text-primary focus:outline-none",
                    "text-foreground",
                  )}
                >
                  {year}
                </a>
              ))}
            </nav>
          </div>

          {/* 主要内容区域 */}
          <div className="w-full md:w-5/6">
            <header className="text-center mb-16">
              {/* 主标题 */}
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 relative inline-block">
                <span className="relative z-10">艺术人生</span>
                {/* 使用自定义动画的装饰线 */}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary ${styles.growHorizontalFromCenter}`}></span>
              </h1>
              
              {/* 副标题/描述 */}
              <p className="text-base md:text-lg text-muted-foreground mx-auto leading-relaxed">
                从古典音乐教育到金融硕士，再到成为邓丽君歌曲的卓越传承人，陈佳的艺术之路充满传奇色彩。
              </p>
            </header>

            <div className="relative">
              {/* 时间轴线 - 也可以考虑使用 primary 变量 */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 md:w-1 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/70 hidden md:block z-0"></div>

              {/* 时间轴内容 */}
              <div className="space-y-12 md:space-y-16 relative z-10">
                {timelineData.map((section: TimelineSection) => (
                  <section
                    key={section.year}
                    id={section.year.replace(/\s+/g, '-').toLowerCase()}
                    className="relative"
                  >
                    {/* 年份标签 - 使用主题色 */}
                    <div className="text-center mb-8 md:mb-10">
                      <h2 className="inline-block bg-primary text-primary-foreground text-lg md:text-2xl font-bold px-6 md:px-8 py-2 md:py-3 rounded-full shadow-md md:shadow-lg transform rotate-1 transition-transform hover:rotate-0">
                        {section.year}
                      </h2>
                    </div>

                    {/* 事件列表 - 优化移动端样式 */}
                    <div className="space-y-8 md:space-y-16"> {/* 移动端间距稍微调整 */}
                      {section.events.map((event, eventIndex) => (
                        <div
                          key={`${section.year}-${eventIndex}`}
                          className={cn(
                            "flex flex-col items-center md:flex-row md:items-center",
                            eventIndex % 2 === 0 ? "md:flex-row-reverse" : ""
                          )}
                        >
                          {/* 图片容器 - 移动端全宽，保留基础样式 */}
                          <div className="w-full mb-2 md:mb-0 md:w-2/5 flex justify-center">
                            <div className="overflow-hidden rounded shadow-sm w-full h-32 md:h-48 lg:h-64">
                              <img
                                src={event.image}
                                alt={event.alt}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          </div>

                          {/* 描述文本 - 移动端直接显示，无卡片包裹，移除背景色 */}
                          <div className="w-full md:w-3/5 px-1 md:px-4 lg:px-8 mt-2 md:mt-0">
                            {/* 文本颜色 */}
                            <p className="text-sm md:text-base text-foreground leading-relaxed">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Biography