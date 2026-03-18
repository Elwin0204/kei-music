import React from 'react';
import { Album } from '../types';

interface AlbumDetailsProps {
  album: Album;
}

export const AlbumDetails: React.FC<AlbumDetailsProps> = ({ album }) => {
  // 定义统一的标题样式
  const sectionTitleClass = "font-semibold text-lg text-foreground mb-4";

  return (
    <div className="space-y-6 p-4"> {/* 添加 bg-background 以匹配应用主背景 */}
      {/* 第一部分：专辑介绍 (包含商品信息) */}
      <section>
        <h3 className={sectionTitleClass}>专辑介绍</h3>
        <div className=""> {/* 为内容区域也添加背景色 */}
          {/* PC端: 左右分布的商品信息，确保文字区域与封面高度一致 */}
          <div className="hidden md:flex mt-4">
            {/* 左侧: 专辑封面 */}
            <div className="shrink-0">
              <img
                src={album.artist.image || '/placeholder-image.jpg'}
                alt={`${album.title} 专辑封面`}
                className="w-64 h-64 rounded-lg object-cover shadow-md" // 固定尺寸
                onError={(e) => {
                  (e.target as HTMLImageElement).replaceWith(
                    document.createTextNode('💿')
                  );
                }}
              />
            </div>
            
            {/* 右侧: 发行信息容器 */}
            <div className="flex flex-col justify-between px-4">
              {/* 上半部分: 专辑简介 */}
              <div className="text-justify">
                <p className="text-sm text-muted-foreground">素有”小邓丽君“之称的陈佳，唱功深厚。她独特的嗓音，细腻而甜美，清新而明丽听起来韵味十足。轻松俏皮的民歌小调，舒缓缠绵的日本演歌，还有那深情、彷徨亦或是悲伤的情歌，其中承载的是一段情，是一个故事。就让我们轻闭双眼，随着这磁性的歌声，一起聆听那逝去的动人时光。</p>
              </div>
              {/* 下半部分: 歌手、发行时间等信息 */}
              <div className="flex flex-col justify-end">
                <p className="text-sm text-muted-foreground mb-1">艺人：{album.artist.name}</p>
                <p className="text-sm text-muted-foreground mb-1">发行时间：{album.releaseDate}</p>
                <p className="text-sm text-muted-foreground mb-1">发行公司：{album.company}</p>
                <p className="text-sm text-muted-foreground mb-1">总经销：{album.distributor}</p>
                <p className="text-sm text-muted-foreground">出版社：{album.publisher}</p>
              </div>
            </div>
          </div>

          {/* 移动端: 上下堆叠的商品信息 */}
          <div className="md:hidden mt-4">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={album.artist.image || '/placeholder-image.jpg'}
                alt={`${album.title} 专辑封面`}
                className="w-32 h-32 rounded-md object-cover shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).replaceWith(
                    document.createTextNode('💿')
                  );
                }}
              />
              <div>
                <p className="text-xs font-medium text-foreground mb-3">艺人：{album.artist.name}</p>
                <p className="text-xs text-muted-foreground mb-3">发行时间：{album.releaseDate}</p>
                <p className="text-xs text-muted-foreground mb-3">发行公司：{album.company}</p>
                <p className="text-xs text-muted-foreground mb-3">总经销：{album.distributor}</p>
                <p className="text-xs text-muted-foreground">出版社：{album.publisher}</p>
              </div>
            </div>
          </div>

          {/* 专辑介绍文字 (在商品信息下方) */}
          <p className="text-sm text-muted-foreground leading-relaxed mt-6 text-justify">
            {album.description}
          </p>
        </div>
      </section>

      {/* 添加分隔线 - 优化颜色 */}
      <div className="border-t border-dashed border-border my-6"></div> {/* 使用 border-border 替代固定颜色 */}

      {/* 第二部分：佳佳寄语 */}
      <section>
        <h3 className={sectionTitleClass}>佳佳寄语</h3>
        <div className="prose prose-sm max-w-none">
          <p className="text-sm text-muted-foreground leading-relaxed text-justify">{album.artist.bio}</p>
        </div>
      </section>

      {/* 添加分隔线 - 优化颜色 */}
      <div className="border-t border-dashed border-border my-6"></div> {/* 使用 border-border 替代固定颜色 */}

      {/* 第三部分：曲目列表 - 序号+歌名+虚线+时长 */}
      <section>
        <h3 className={sectionTitleClass}>曲目列表</h3>
        <ul className="space-y-2 pb-4">
          {album.tracks.map((track, index) => {
            const paddedIndex = (index + 1).toString().padStart(2, '0');
            
            return (
              <li key={track.id} className="flex items-center p-2 rounded">
                <div className="flex items-center min-w-0 mr-2">
                  <span className="text-sm font-medium text-foreground w-8 flex-shrink-0">{paddedIndex}.</span>
                  <span className="text-sm text-foreground truncate">{track.title}</span>
                </div>
                {/* 优化虚线颜色 */}
                <span className="flex-1 border-t border-dashed border-border mx-1"></span> {/* 使用 border-border */}
                <div className="flex items-center space-x-2 shrink-0 relative">
                  {track.alias && (
                    <span className="text-xs text-muted-foreground italic absolute right-0 top-0 translate-y-full whitespace-nowrap">{track.alias}</span>
                  )}
                  <span className="text-xs text-muted-foreground">{track.duration}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};