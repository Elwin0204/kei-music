// src/utils/date.ts

// 定义季节类型
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

/**
 * 根据月份获取当前季节
 * @param month - 月份 (0-11)
 * @returns 季节字符串
 */
export const getSeasonByMonth = (month: number): Season => {
  // 月份从0开始，所以传入的month需要+1来判断
  const adjustedMonth = month + 1;
  if (adjustedMonth >= 3 && adjustedMonth <= 5) return 'spring';
  if (adjustedMonth >= 6 && adjustedMonth <= 8) return 'summer';
  if (adjustedMonth >= 9 && adjustedMonth <= 11) return 'autumn';
  return 'winter'; // 12, 1, 2 月为冬季
};