import { COUNTRIES } from "../data/locations/country";
import { PROVINCES_CN } from "../data/locations/province";
import { THEATERS } from "../data/theaters";
import { Country, Province, Theater } from "../types";

const countryMap = new Map<string, Country>(COUNTRIES.map(country => [country.code, country]));

/**
 * 根据国家代码快速查找国家信息
 * 使用 Map 实现 O(1) 时间复杂度的查找
 * @param countryCode - 国家代码，例如 'CN'
 * @returns Country 对象或 undefined
 */
export const findCountryByCode = (countryCode: string): Country | undefined => {
  return countryMap.get(countryCode);
};

/**
 * 根据国家代码获取国家中文名
 * @param countryCode - 国家代码，例如 'CN'
 * @returns 国家中文名，如果未找到则返回空字符串
 */
export const getCountryName = (countryCode: string): string => {
  const country = findCountryByCode(countryCode);
  return country ? country.name : '';
};

const provinceMap = new Map<string, Province>(PROVINCES_CN.map(province => [province.code, province]));

/**
 * 根据省份代码快速查找省份信息
 * 使用 Map 实现 O(1) 时间复杂度的查找
 * @param provinceCode - 省份代码，例如 '11'
 * @returns Province 对象或 undefined
 */
export const findProvinceByCode = (provinceCode: string): Province | undefined => {
  return provinceMap.get(provinceCode);
};

// --- 创建 Map 用于快速查找 ---
const theaterMap = new Map<string, Theater>(THEATERS.map(theater => [theater.code, theater]));

/**
 * 根据剧院代码快速查找剧院信息
 * @param theaterCode - 剧院代码，例如 'TJYH'
 * @returns Theater 对象或 undefined
 */
export const findTheaterByCode = (theaterCode: string): Theater | undefined => {
  return theaterMap.get(theaterCode);
};