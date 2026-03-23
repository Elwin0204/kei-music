// src/pages/Journal.tsx
import type { FC } from 'react'
import { Helmet } from 'react-helmet-async'

/**
 * 佳话页面：个人故事与分享
 * - 内容类型：个人日志、随笔、生活照片、创作感悟
 * - 展示形式：时间轴列表、卡片式网格
 * - 互动元素：点赞、评论（可选）
 * - 内容筛选：按时间、标签分类
 */
export const Journal: FC = () => {
  const canonicalUrl = `https://elwin0204.github.io/kei-music/journal`;
  return (
    <>
      <Helmet>
        <title>佳话 | 陈佳的个人故事与分享</title>
        <meta name="description" content="聆听陈佳的创作心声，分享生活点滴与幕后故事。" />
        <meta property="og:title" content="陈佳 · 佳话" />
        <meta property="og:description" content="走进陈佳的内心世界，感受音乐背后的真实故事。" />
        <meta property="og:image" content="/og/kei.jpg" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="陈佳 · 传承经典" />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div>
        {/* 佳话内容 */}
      </div>
    </>
  )
}

export default Journal