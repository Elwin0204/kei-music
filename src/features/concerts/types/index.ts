/**
 * 基础数据：国家
 */
export interface Country {
  code: string; // 国家代码，例如 'CN' (中国), 'US' (美国)
  name: string; // 国家名称，例如 '中国', '美国'
  i18n_key: string; // 国际化键名，例如 'common.country.china', 'common.country.usa'
}

/**
 * 基础数据：省份/直辖市/自治区/特别行政区
 * 使用中国国家标准行政区划代码 (GB/T 2260) 的前两位或四位
 * 例如 '11' 代表北京市, '31' 代表上海市
 */
export interface Province {
  code: string; // 省份代码，例如 '11' (北京市), '31' (上海市), '44' (广东省)
  name: string; // 省份全称，例如 '北京市', '上海市', '广东省'
  short_name?: string; // 省份简称 (可选)，例如 '京', '沪', '粤'
  country: string; // 所属国家的代码 (例如 'CN')
  i18n_key: string; // 国际化键名，例如 'common.province.beijing'
}

// 定义地点类型
export interface Location {
  code: string;
  name: string; // 例如: '北京'，'烟台'， '廊坊'，'沈阳'
  country: string;
  province: string;
}

// 定义剧院类型
export interface Theater {
  code: string; // 例如: 'TJYH' (天桥艺术中心)
  name: string; // 例如: '天桥艺术中心'
  city: string; // 城市， Location的code
  address?: string; // 地址是可选的, 详细地址
}

// 定义演唱会类型
export interface Concert {
  id: string;
  time: string;  // ISO 8601 格式的时间字符串，例如 "2026-06-19T14:30:00+08:00"
  city: string;  // Location的code
  theater: string; // Theater的code
  cover?: string; // 演唱會宣傳照: 图片 URL
}

export interface LiveCard {
  name: string;
  cover: string;  // 现场照片
}

export interface FanCard {
  name: string;
  checkIn: string;  // 活动信息（时间地点）
  message: string;  // 粉丝寄语
}