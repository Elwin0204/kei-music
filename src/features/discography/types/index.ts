// src/types.ts

// 定义艺人类型
export interface Artist {
  name: string;
  image?: string; // 图片可能为空
  bio: string;
}

// 定义曲目类型
export interface Track {
  id: string;
  title: string;
  duration: string;
  alias: string;
}

// 定义专辑类型
export interface Album {
  id: string;
  title: string;
  coverImage: string;
  releaseDate: string;
  // 新增简介字段
  introduction?: string;
  description: string;
  albumType: 'studio' | 'live' | 'compilation' | 'single' | 'ep'; // 专辑类型
  artist: Artist;
  company?: string; // 发行公司是可选的
  distributor?: string; // 总经销商是可选的
  publisher?: string; // 出版社是可选的
  tracks: Track[];
  purchaseLink?: string; // 购买链接是可选的
  streamingLink?: string; // 流媒体链接是可选的
}