import type { FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react';

import styles from './Discography.module.css'; // 确保导入

import { discographyData } from '@/features/discography/data';
import type { Album } from '@/features/discography/types';
import { KeiIcon } from '@/components/ui/kei-icon';
import { AlbumDetails } from '@/features/discography/ui/AlbumDetails';
import { KeiModal } from '@/components/ui/kei-modal';

// --- 更新: 上下波动的渐变波浪 SVG 组件 ---
const AnimatedWaveDivider = () => (
  <div className={`overflow-hidden w-full h-16`}> {/* 设置固定高度，确保波浪可见 */}
    <svg 
      viewBox="0 0 1200 120" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`w-full h-full ${styles.waveBounce}`} // 应用上下波动动画
      preserveAspectRatio="none"
    >
      {/* 定义渐变 */}
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E0E7FF" stopOpacity="0.6" /> {/* 淡蓝紫 */}
          <stop offset="50%" stopColor="#D1D5DB" stopOpacity="0.4" /> {/* 灰色过渡 */}
          <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.6" /> {/* 淡黄 */}
        </linearGradient>
      </defs>
      {/* 使用渐变填充路径 */}
      <path 
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
        fill="url(#waveGradient)" // 使用上面定义的渐变
      ></path>
    </svg>
  </div>
);

export const Discography: FC = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAlbum(null);
  };

  const totalAlbums = discographyData.length;
  const totalTracks = discographyData.reduce((acc, album) => acc + album.tracks.length, 0);

  return (
    <>
      <Helmet>
        <title>音乐作品 | 陈佳专辑全集</title>
        <meta name="description" content="陈佳发行专辑全收录：《去年今日》《似是故人来》等经典重现与原创作品试听。" />
        <meta property="og:title" content="陈佳 · 音乐作品" />
        <meta property="og:description" content="在线欣赏陈佳所有正式发行专辑，重温邓丽君金曲新声。" />
        <meta property="og:image" content="/og/discography.jpg" />
        <meta property="og:url" content="https://kei-music.com/music" />
        <link rel="canonical" href="https://kei-music.com/music" />
      </Helmet>

      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          
          {/* 新的简约而不简单的头部 */}
          <div className="relative text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4 relative inline-block">
              <span className="relative">
                音乐作品
                <span className={`absolute bottom-0.5 left-0 h-0.5 bg-primary ${styles.growHorizontalFromCenter}`}></span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
              “<span className="italic">以声传情，跨越时光的温柔对话</span>”
            </p>

            {/* 应用浮动动画到数据卡片 */}
            <div className={`inline-flex items-center gap-6 px-6 py-3 bg-accent/30 backdrop-blur-sm rounded-full border border-border shadow-sm ${styles.float}`}>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-foreground tabular-nums">{totalAlbums}</span>
                <span className="text-xs text-muted-foreground">张专辑</span>
              </div>
              <span className="text-muted-foreground/50">|</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-foreground tabular-nums">{totalTracks}</span>
                <span className="text-xs text-muted-foreground">首歌曲</span>
              </div>
            </div>

            {/* 使用新的带动画的波浪分割线 */}
            <div className="mt-12">
              <AnimatedWaveDivider />
            </div>
          </div>
          {/* 头部结束 */}

          {/* 专辑网格 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {discographyData.map((album) => (
              <div
                key={album.id}
                className="group cursor-pointer"
                onClick={() => handleAlbumClick(album)}
              >
                <div className="flex flex-col">
                  <div className="relative w-full aspect-square mb-3">
                    <div className="relative w-full h-full">
                      {/* CD图标应用脉动动画 */}
                      <div className={`absolute -top-2 -left-2 z-1 p-1 rounded-full backdrop-blur-sm bg-white/30 shadow-md group-hover:bg-white/50 transition-colors ${styles.pulse}`}>
                        <KeiIcon name="Music" size={32} className="shrink-0 text-primary drop-shadow-lg" />
                      </div>
                      {/* 封面应用脉动动画 */}
                      <div className={`overflow-hidden rounded-lg shadow-md w-full h-full ${styles.pulse}`}>
                        <img
                          src={album.coverImage}
                          alt={album.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).replaceWith(
                              document.createTextNode(`[封面: ${album.title}]`)
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {album.title}
                    </h3>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{album.releaseDate}</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                        {album.albumType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedAlbum && (
        <KeiModal
          title={selectedAlbum.title}
          icon={ { name: 'Music', size: 32 } }
          description={`${selectedAlbum.releaseDate} • ${selectedAlbum.albumType}`}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onClose={handleCloseModal}
        >
          <AlbumDetails album={selectedAlbum} />
        </KeiModal>
      )}
    </>
  )
}

export default Discography