import { Theater } from "../../types";

export const THEATERS: Theater[] = [
  {
    code: 'TIANJIN-LIHUA',
    name: '天津大礼堂大剧场',
    city: 'TIANJIN', // 改为引用 Location.code
    address: '天津市河西区友谊路24号',
  },
  {
    code: 'BEIJING-ZSYYT',
    name: '中山音乐堂',
    city: 'BEIJING', // 改为引用 Location.code
    address: '北京市西城区文津街1号',
  },
  {
    code: 'GUANGZHOU-SHANZI',
    name: '广州中山纪念堂',
    city: 'GUANGZHOU', // 改为引用 Location.code
    address: '广州市越秀区东风中路259号',
  },
  {
    code: 'CHENGDU-TIANFU',
    name: '中国-欧洲中心天府音乐厅',
    city: 'CHENGDU', // 改为引用 Location.code
    address: '成都市高新区天府大道北段1700号',
  },
  {
    code: 'SHANGHAI-MEIQI',
    name: '美琪大戏院',
    city: 'SHANGHAI', // 改为引用 Location.code
    address: '上海市黄浦区南京西路628号',
  },
  {
    code: 'SHANTOU-LINXIN',
    name: '林百欣会展中心',
    city: 'SHANTOU', // 改为引用 Location.code
    address: '广东省汕头市龙祥路与衡山路交界处',
  },
  {
    code: 'HUHEHAOTE-YALAN',
    name: '内蒙古乌兰恰特大剧院',
    city: 'HUHEHAOTE', // 改为引用 Location.code
    address: '内蒙古自治区呼和浩特市新城区新华东街16号',
  },
  {
    code: 'HARBIN-HUANQIU',
    name: '哈尔滨国际会展体育中心环球剧场',
    city: 'HARBIN', // 改为引用 Location.code
    address: '黑龙江省哈尔滨市南岗区学府路333号',
  },
  {
    code: 'NANNING-BOLI',
    name: '广西文化艺术中心(保利)大剧院',
    city: 'NANNING', // 改为引用 Location.code
    address: '广西壮族自治区南宁市五象新区五象湖畔',
  },
];