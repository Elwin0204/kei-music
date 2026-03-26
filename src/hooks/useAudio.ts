// src/hooks/useAudio.ts
import { createContext, useContext } from 'react';

// 定义音频状态类型
export interface AudioState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTrackIndex: number; // 新增：当前播放曲目的索引
  tracks: string[];         // 新增：曲目列表
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
  prevTrack: () => void;    // 新增：切换到上一首
  nextTrack: () => void;    // 新增：切换到下一首
}

// 创建 Context
export const AudioContext = createContext<AudioState | undefined>(undefined);

// 自定义 Hook
export const useAudio = (): AudioState => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};