// src/components/AudioProvider.tsx
import { useEffect, useRef, useState } from 'react';
import { AudioContext, AudioState } from '../hooks/useAudio'; 
import audio1 from '@/assets/audios/audio1.ogg';
import audio2 from '@/assets/audios/audio2.ogg';
import audio3 from '@/assets/audios/audio3.ogg';
import audio4 from '@/assets/audios/audio4.ogg';
import audio5 from '@/assets/audios/audio5.ogg';
import audio6 from '@/assets/audios/audio6.ogg';
import audio7 from '@/assets/audios/audio7.ogg';
import audio8 from '@/assets/audios/audio8.ogg';
import audio9 from '@/assets/audios/audio9.ogg';
import audio10 from '@/assets/audios/audio10.ogg';
import audio11 from '@/assets/audios/audio11.ogg';
import audio12 from '@/assets/audios/audio12.ogg';
import audio13 from '@/assets/audios/audio13.ogg';
import audio14 from '@/assets/audios/audio14.ogg';

// 将所有音频路径放入一个数组中
const TRACKS = [
  audio1,
  audio2,
  audio3,
  audio4,
  audio5,
  audio6,
  audio7,
  audio8,
  audio9,
  audio10,
  audio11,
  audio12,
  audio13,
  audio14,
];

// 惰性初始化函数：仅在组件首次渲染时执行一次
const getRandomInitialTrackIndex = () => {
  return Math.floor(Math.random() * TRACKS.length);
};

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false); 
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  
  // 使用惰性初始化器来设置初始的 currentTrackIndex
  const [currentTrackIndex, setCurrentTrackIndex] = useState(getRandomInitialTrackIndex);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 新增：切换到下一首
  const nextTrack = () => {
    setCurrentTrackIndex(prevIndex => (prevIndex + 1) % TRACKS.length); // 循环播放
  };

  // 新增：切换到上一首
  const prevTrack = () => {
    setCurrentTrackIndex(prevIndex => {
      // 使用加法和取模来处理负数情况，例如从索引 0 跳到 length - 1
      return ((prevIndex - 1) % TRACKS.length + TRACKS.length) % TRACKS.length;
    });
  };

  // 当 currentTrackIndex 变化时，加载并播放新音频
  useEffect(() => {
    if (currentTrackIndex >= TRACKS.length) return; // 防止越界

    const audio = new Audio(TRACKS[currentTrackIndex]);
    audio.loop = false; // 关闭单曲循环，以便触发 ended 事件
    audio.volume = volume;
    audio.muted = isMuted;
    
    // 设置 ended 事件监听器，用于播放完毕后切换到下一首
    const handleEnded = () => {
      nextTrack(); // 播放完毕自动切换
    };
    audio.addEventListener('ended', handleEnded);

    // 清理上一个音频实例
    if (audioRef.current) {
      audioRef.current.removeEventListener('ended', handleEnded);
      audioRef.current.pause();
      audioRef.current.src = ''; // 清空 src 有助于释放资源
    }

    audioRef.current = audio;

    const attemptPlayOnLoad = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        console.log(`音频 '${TRACKS[currentTrackIndex]}' 开始播放`);
      } catch (err) {
        console.log("音频自动播放被阻止，等待用户交互。", err);
      }
    };

    attemptPlayOnLoad();

    const handleFirstInteraction = async () => {
      if (audioRef.current && audioRef.current.paused) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          console.log(`音频在交互后开始播放: ${TRACKS[currentTrackIndex]}`);
        } catch (err) {
          console.error("在交互后播放音频失败:", err);
        }
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);

      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded); // 移除事件监听器
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [currentTrackIndex, isMuted, volume]);

  // 同步 volume 和 muted 状态到 audioRef
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
    currentTrackIndex, // 导出当前索引
    tracks: TRACKS,     // 导出曲目列表
    togglePlay,
    toggleMute,
    setVolume: setVolumeWrapper,
    prevTrack, // 导出上一首函数
    nextTrack, // 导出下一首函数
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};