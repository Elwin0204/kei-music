// src/features/biography/types/index.ts

export interface TimelineEvent {
  /** 事件描述文字 */
  description: string;
  /** 图片 URL */
  image: string;
  /** 图片替代文字 */
  alt: string;
}

export interface TimelineSection {
  /** 年份或时期名称 */
  year: string;
  /** 该年份下的事件列表 */
  events: TimelineEvent[];
}