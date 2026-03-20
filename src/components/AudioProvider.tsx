// src/components/AudioProvider.tsx
import { useEffect, useRef, useState } from 'react';
import { AudioContext, AudioState } from '../hooks/useAudio'; 
import audio1 from '@/assets/audios/audio1.ogg';

// 音频文件路径
const BACKGROUND_MUSIC_PATH = audio1;

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false); 
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(BACKGROUND_MUSIC_PATH);
    audio.loop = true;
    audio.volume = volume;
    audio.muted = isMuted;
    audioRef.current = audio;

    const attemptPlayOnLoad = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        console.log("音频自动播放成功");
      } catch (err) {
        console.log("音频自动播放被阻止，等待用户交互。", err);
      }
    };

    attemptPlayOnLoad();

    const handleFirstInteraction = async () => {
      // 优化：直接检查音频元素状态，避免闭包状态过期问题
      if (audioRef.current && audioRef.current.paused) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          console.log("音频在首次交互后开始播放");
        } catch (err) {
          console.error("在交互后播放音频失败:", err);
        }
      }
      // 删除了手动 removeEventListener，因为 addEventListener 已设置 { once: true }
    };

    // 监听多种类型的首次用户交互
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      // 修复：removeEventListener 不支持 once 选项，直接移除即可
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("播放失败:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const setVolumeWrapper = (vol: number) => {
    const clampedVol = Math.max(0, Math.min(1, vol));
    setVolume(clampedVol);
  };

  const value: AudioState = {
    isPlaying,
    isMuted,
    volume,
    togglePlay,
    toggleMute,
    setVolume: setVolumeWrapper
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};