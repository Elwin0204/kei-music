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
import { MusicClefTreble } from './MusicClefTreble';
import { MusicClefBass } from './MusicClefBass';
import { MusicClefAlto } from './MusicClefAlto';
import { MusicWholeNote } from './MusicWholeNote';
import { MusicHalfNote } from './MusicHalfNote';
import { MusicQuarterNote } from './MusicQuarterNote';
import { MusicEighthNote } from './MusicEighthNote';
import { MusicSixteenthNote } from './MusicSixteenthNote';
import { MusicThirtySecondNote } from './MusicThirtySecondNote';
import { MusicHalfNoteDotted } from './MusicHalfNoteDotted';
import { MusicQuarterNoteDotted } from './MusicQuarterNoteDotted';
import { MusicRhythmTwoEight } from './MusicRhythmTwoEight';
import { MusicRhythmThree } from './MusicRhythmThree';
import { MusicRhythmEightSixteen } from './MusicRhythmEightSixteen';
import { MusicRhythmFourSixteen } from './MusicRhythmFourSixteen';
import { Play } from './Play';
import { Pause } from './Pause';
import { FeatherPen } from './FeatherPen';
import { Hourglass } from './Hourglass';
import { ReleaseDate } from './ReleaseDate';
import { Microphone } from './Microphone';

export const ICON_MAP = {
  KeiLogo,
  VinylRecord,
  Biography,
  Music,
  FeatherPen,
  Concert,
  Hourglass,
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
  MusicClefTreble,
  MusicClefBass,
  MusicClefAlto,
  MusicWholeNote,
  MusicHalfNote,
  MusicQuarterNote,
  MusicEighthNote,
  MusicSixteenthNote,
  MusicThirtySecondNote,
  MusicHalfNoteDotted,
  MusicQuarterNoteDotted,
  MusicRhythmTwoEight,
  MusicRhythmThree,
  MusicRhythmEightSixteen,
  MusicRhythmFourSixteen,
  Play,
  Pause,
  ReleaseDate,
  Microphone
} as const;

export type KeiIconName = keyof typeof ICON_MAP;