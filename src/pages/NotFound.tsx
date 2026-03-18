// src/pages/NotFound.tsx
import { FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'
import { cn } from '@/utils'
import styles from './NotFound.module.css'

export const NotFound: FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>页面未找到 | 陈佳音乐官网</title>
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-foreground">
        <div className="text-center max-w-lg w-full space-y-6"> {/* 减小了 space-y-8 到 space-y-6 */}

          {/* 趣味性图标/角色 - 简化版 */}
          <div className="flex justify-center">
            <div className="relative inline-block">
              {/* 主体 - 一个戴着耳机的困惑表情 */}
              <div className={`text-[6rem] md:text-[7rem] text-primary ${styles.gentleFloat}`}>
                🎧
              </div>
              {/* 可选：添加一个小小的“晕头转向”指示器 */}
              {/* 使用 absolute 定位，top-1/2 left-1/2 将其左上角定位到父元素中心 */}
              {/* transform -translate-x-1/2 -translate-y-1/2 将其自身中心点拉回父元素中心 */}
              <div className={`absolute top-1/2 left-1/2 transform text-accent ${styles.spin}`} style={{ fontSize: '1.5rem' }}>
                🎵 {/* 使用一个旋转的音符 */}
              </div>
            </div>
          </div>

          {/* 错误描述 */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2"> {/* 调整标题大小和间距 */}
              糟糕！迷路了？
            </h1>
            <p className="text-base text-muted-foreground">
              你寻找的那个页面好像躲进了陈佳的音乐宇宙里...<br />或许它正在某个旋律中休息呢。
            </p>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4"> {/* 调整按钮上方间距 */}
            <button
              onClick={() => navigate(-1)}
              className={cn(
                "px-6 py-3 border border-border rounded-lg font-medium transition-all duration-200",
                "bg-card text-foreground hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              )}
            >
              <span className="inline-flex items-center gap-1.5">
                ← 返回上一步
              </span>
            </button>
            <button
              onClick={() => navigate('/')}
              className={cn(
                "px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg transition-all duration-200",
                "hover:bg-primary/90 shadow-md hover:shadow-lg",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              )}
            >
              <span className="inline-flex items-center gap-1.5">
                🏠 回到音乐之家
              </span>
            </button>
          </div>

          {/* 额外的趣味引导 */}
          <div className="pt-6 border-t border-border"> {/* 调整分割线上方间距 */}
            <p className="text-sm text-muted-foreground">
              或者，你可以直接听听 <a 
                href="https://music.163.com/#/artist?id=10559" // 示例链接
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                最新音乐
              </a> ？ 🎧
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound