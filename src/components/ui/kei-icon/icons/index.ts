import { AlarmClock } from './AlarmClock';
import { ArrowLeft } from './ArrowLeft';
import { Biography } from './Biography';
import { CloseCircleBroken } from './CloseCircleBroken';
import { Concert } from './Concert';
import { Contact } from './Contact';
import { Douyin } from './Douyin';
import { ExternalLink } from './ExternalLink';
import { Globe } from './Globe';
import { KeiLogo } from './KeiLogo';
import { Moon } from './Moon';
import { Music } from './Music';
import { Sun } from './Sun';
import { VinylRecord } from './VinylRecord';
import { WeChat } from './WeChat';
import { Weibo } from './Weibo';
import { XiaoHongShu } from './XiaoHongShu';
import { YouTube } from './YouTube';

export const ICON_MAP = {
  KeiLogo,
  VinylRecord,
  Biography,
  Music,
  Concert,
  Contact,
  Moon,
  Sun,
  ArrowLeft,
  CloseCircleBroken,
  Globe,
  ExternalLink,
  XiaoHongShu,
  Weibo,
  WeChat,
  Douyin,
  YouTube,
  AlarmClock,
} as const;

export type KeiIconName = keyof typeof ICON_MAP;