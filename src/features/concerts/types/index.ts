// 定义地点类型
export interface Location {
  code: string; // 例如: 'BJ' 或 'SH'
  name: string; // 例如: '北京' 或 '上海'
  // 可以根据需要添加更多字段，如: country, province, areaCode 等
}

// 定义剧院类型
export interface Theater {
  code: string; // 例如: 'TJYH' (天桥艺术中心)
  name: string; // 例如: '天桥艺术中心'
  address?: string; // 地址是可选的
  city?: string; // 城市是可选的
  // 可以根据需要添加更多字段，如: phone, website, capacity 等
}

// 定义演唱会类型
export interface Concert {
  id: string;
  time: string;
  location: Location;
  coverImage: string; // 演唱會宣傳照: 图片 URL
  theaterImages: string[]; // 劇院照片: 图片 URL
  onSiteImages: string[]; // 現場照片列表: 图片 URL 数组
  artistMessage: string; // 歌手寄語
  fanMessages: string[]; // 粉絲寄語: 字符串数组
}