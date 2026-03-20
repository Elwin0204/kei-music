// src/hooks/useAudio.ts
import { createContext, useContext } from 'react';

export type AudioState = {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
};

// 定义 Context 类型，初始值为 undefined
const AudioContext = createContext<AudioState | undefined>(undefined);

/**
 * 自定义 Hook，用于在组件树中获取音频状态和控制方法
 * @returns {AudioState} 包含播放状态、音量控制等方法的对象
 * @throws {Error} 如果 Hook 没有在 AudioProvider 内部使用，则抛出错误
 */
export const useAudio = (): AudioState => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

// 导出 Context，供 AudioProvider 组件使用
export { AudioContext };