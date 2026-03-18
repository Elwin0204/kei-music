import { useState, useEffect, useCallback } from 'react';
import { Season, getSeasonByMonth } from '@/utils/date';

// 定义模式类型
export type Mode = 'auto' | 'rotation';

// 定义所有季节的数组
const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter'];

interface UseSeasonProps {
  initialMode?: Mode;
  rotationIntervalMs?: number; // 轮播模式下的切换间隔，单位毫秒
}

export const useSeason = ({ initialMode = 'auto', rotationIntervalMs = 10000 }: UseSeasonProps = {}) => {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [currentSeason, setCurrentSeason] = useState<Season>('spring');
  const [seasonIndex, setSeasonIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const updateSeasonBasedOnDate = useCallback(() => {
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const newSeason = getSeasonByMonth(month);
    setCurrentSeason(newSeason);
    setSeasonIndex(SEASONS.indexOf(newSeason));
  }, []);

  useEffect(() => {
    if (mode !== 'auto') return;
    const autoUpdateTimer = setInterval(updateSeasonBasedOnDate, 60000);
    updateSeasonBasedOnDate();
    return () => { clearInterval(autoUpdateTimer); };
  }, [mode, updateSeasonBasedOnDate]);

  useEffect(() => {
    if (mode !== 'rotation') return;
    let intervalId: NodeJS.Timeout | null = null;
    const startInterval = () => {
      if (!isPaused) {
        // 使用传入的 rotationIntervalMs
        intervalId = setInterval(() => {
          setSeasonIndex(prevIndex => (prevIndex + 1) % SEASONS.length);
        }, rotationIntervalMs);
      }
    };
    startInterval();
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [mode, isPaused, rotationIntervalMs]); // 将 rotationIntervalMs 加入依赖数组

  useEffect(() => {
    if (mode !== 'rotation') return;
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => { document.removeEventListener('visibilitychange', handleVisibilityChange); };
  }, [mode]);

  useEffect(() => {
    if (mode === 'rotation') {
      setCurrentSeason(SEASONS[seasonIndex]);
    }
  }, [mode, seasonIndex, SEASONS]);

  const switchToAutoMode = () => setMode('auto');
  const switchToRotationMode = () => setMode('rotation');

  return {
    mode,
    currentSeason,
    seasonIndex,
    isPaused,
    switchToAutoMode,
    switchToRotationMode,
  };
};