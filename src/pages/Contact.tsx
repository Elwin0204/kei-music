import { cn } from '@/utils'
import type { FC } from 'react'
import { Helmet } from 'react-helmet-async'
import styles from './Contact.module.css'

export const Contact: FC = () => {
  const canonicalUrl = `https://elwin0204.github.io/kei-music/contact`;

  return (
    <>
      <Helmet>
        <title>联系与关注 | 陈佳官方渠道</title>
        <meta name="description" content="通过官方社交媒体关注陈佳，或发送合作邀请至 2227367998@qq.com。" />
        <meta property="og:title" content="陈佳 · 联系我们" />
        <meta property="og:description" content="获取陈佳官方联系方式，加入粉丝社群。" />
        <meta property="og:image" content="/og/contact.jpg" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="陈佳 · 传承经典" />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="min-h-screen py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-2xl">

          {/* 标题区域 */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 relative inline-block">
              <span className="relative z-10">联系我们</span>
              {/* 使用自定义动画的装饰线 */}
              <span className={cn("absolute bottom-0 left-0 h-0.5 bg-primary", styles.growHorizontalFromCenter)}></span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto mt-6 leading-relaxed">
              如需商务合作或咨询演出事宜，请通过以下方式联系我们。
            </p>
          </header>

          {/* 商务联系信息卡片 */}
          <div className="bg-background border border-border rounded-lg p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-6">商务合作</h2>
            
            {/* 邮箱链接按钮 */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">邮箱地址</p>
              <a 
                href="mailto:2227367998@qq.com" 
                className="
                  inline-flex items-center
                  w-full max-w-md
                  text-primary font-medium
                  transition-colors duration-200
                "
              >
                2227367998@qq.com
              </a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              我们会定期查阅邮件，并尽快回复您的合作意向。
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact