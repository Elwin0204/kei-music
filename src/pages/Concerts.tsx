// src/pages/Concerts.tsx
import type { FC } from 'react'
import { Helmet } from 'react-helmet-async'
import HeroSection from '@/features/concerts/ui/HeroSection';
import LiveMoments from '@/features/concerts/ui/LiveMoments';
import FanInteractions from '@/features/concerts/ui/FanInteractions';

/**
 * 演出活动页：双视图展示
 * - 视图切换：日历模式 / 地图模式
 * - 日历：高亮未来演出日期
 * - 地图：城市标记（使用轻量地图库）
 * - 演出列表：日期、城市、场馆、购票链接
 */
export const Concerts: FC = () => {
  const canonicalUrl = `https://elwin0204.github.io/kei-music/concerts`;
  

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
        {/* 模块 1: Hero 主视觉区 */}
        <HeroSection onActionClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} />
        
        {/* 模块 2: 现场风采，光影瞬间 */}
        <LiveMoments />

        {/* 模块 3: 粉丝情谊，寄语传心 */}
        <FanInteractions />
      </div>
    </>
  )
}

export default Concerts