import { Country } from "../../types";

// 目前用到的国家数据
export const COUNTRIES: Country[] = [
  { 
    code: 'CN', 
    name: '中国',
    i18n_key: 'country_china' // 使用下划线
  },
  { 
    code: 'US', 
    name: '美国',
    i18n_key: 'country_usa'
  },
  { 
    code: 'SG', 
    name: '新加坡',
    i18n_key: 'country_singapore'
  },
  { 
    code: 'MY', 
    name: '马来西亚',
    i18n_key: 'country_malaysia'
  },
  { 
    code: 'JP', 
    name: '日本',
    i18n_key: 'country_japan'
  },
];