import { createContext, useContext, useRef, useState, useCallback, useEffect, ReactNode } from 'react';

interface BackgroundMusicContextType {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  fadeOut: () => Promise<void>;
  fadeIn: () => Promise<void>;
}

const BackgroundMusicContext = createContext<BackgroundMusicContextType | null>(null);

interface BackgroundMusicProviderProps {
  children: ReactNode;
  src: string;
  autoPlay?: boolean;
}

export const BackgroundMusicProvider = ({ children, src, autoPlay = false }: BackgroundMusicProviderProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const targetVolume = 0.3;

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = targetVolume;

    // Auto-play on page load if enabled
    if (autoPlay) {
      const attemptAutoPlay = () => {
        if (audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch((error) => {
            console.log('Auto-play failed, will play on user interaction:', error);
          });
        }
      };
      
      // Try immediate autoplay
      attemptAutoPlay();
      
      // Also try on first user interaction if autoplay fails
      const handleFirstInteraction = () => {
        if (audioRef.current && !isPlaying) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {});
        }
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      };
      
      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('touchstart', handleFirstInteraction);
    }

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src, autoPlay]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.volume = targetVolume;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Audio play failed:', error);
      });
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const fadeOut = useCallback(() => {
    return new Promise<void>((resolve) => {
      if (!audioRef.current || !isPlaying) {
        resolve();
        return;
      }

      const fadeStep = 0.02;
      const fadeInterval = 50;
      
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }

      fadeIntervalRef.current = setInterval(() => {
        if (audioRef.current) {
          if (audioRef.current.volume > fadeStep) {
            audioRef.current.volume -= fadeStep;
          } else {
            audioRef.current.volume = 0;
            audioRef.current.pause();
            setIsPlaying(false);
            if (fadeIntervalRef.current) {
              clearInterval(fadeIntervalRef.current);
            }
            resolve();
          }
        }
      }, fadeInterval);
    });
  }, [isPlaying]);

  const fadeIn = useCallback(() => {
    return new Promise<void>((resolve) => {
      if (!audioRef.current) {
        resolve();
        return;
      }

      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        
        const fadeStep = 0.02;
        const fadeInterval = 50;
        
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }

        fadeIntervalRef.current = setInterval(() => {
          if (audioRef.current) {
            if (audioRef.current.volume < targetVolume - fadeStep) {
              audioRef.current.volume += fadeStep;
            } else {
              audioRef.current.volume = targetVolume;
              if (fadeIntervalRef.current) {
                clearInterval(fadeIntervalRef.current);
              }
              resolve();
            }
          }
        }, fadeInterval);
      }).catch((error) => {
        console.log('Audio fade in failed:', error);
        resolve();
      });
    });
  }, []);

  return (
    <BackgroundMusicContext.Provider value={{ isPlaying, play, pause, toggle, fadeOut, fadeIn }}>
      {children}
    </BackgroundMusicContext.Provider>
  );
};

export const useBackgroundMusic = () => {
  const context = useContext(BackgroundMusicContext);
  if (!context) {
    throw new Error('useBackgroundMusic must be used within a BackgroundMusicProvider');
  }
  return context;
};
