import { useState, useRef } from 'react';
import { Heart, Sparkles, Volume2, VolumeX } from 'lucide-react';
import FloatingHearts from './FloatingHearts';
import CelebrationScreen from './CelebrationScreen';
import GiftSelection from './GiftSelection';
import { BackgroundMusicProvider, useBackgroundMusic } from '@/hooks/useBackgroundMusic';

type Screen = 'proposal' | 'gifts' | 'celebration';

// YouTube video ID for Raindance by Tems & Dave
const RAINDANCE_YOUTUBE_ID = 'dWmU6Z9k1t0';

const MusicControl = () => {
  const { isPlaying, toggle } = useBackgroundMusic();
  
  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-card/80 hover:bg-card transition-colors shadow-lg border border-primary/20"
      aria-label={isPlaying ? 'Mute music' : 'Play music'}
    >
      {isPlaying ? (
        <Volume2 size={24} className="text-primary" />
      ) : (
        <VolumeX size={24} className="text-muted-foreground" />
      )}
    </button>
  );
};

const ValentineContent = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('proposal');
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [hasMovedNo, setHasMovedNo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const { play: playMusic } = useBackgroundMusic();

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    const maxX = container.width - button.width - 40;
    const maxY = container.height - button.height - 40;
    
    let newX = Math.random() * maxX - maxX / 2;
    let newY = Math.random() * maxY - maxY / 2;

    // Ensure it doesn't go off screen
    newX = Math.max(-150, Math.min(150, newX));
    newY = Math.max(-100, Math.min(200, newY));

    setNoButtonPosition({ x: newX, y: newY });
    setHasMovedNo(true);
  };

  const handleYesClick = () => {
    setCurrentScreen('gifts');
    // Start playing background music when user clicks Yes
    playMusic();
  };

  const handleGiftsComplete = () => {
    setCurrentScreen('celebration');
  };

  if (currentScreen === 'celebration') {
    return <CelebrationScreen />;
  }

  if (currentScreen === 'gifts') {
    return <GiftSelection onComplete={handleGiftsComplete} />;
  }

  return (
    <div 
      ref={containerRef}
      className="romantic-bg min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
    >
      <FloatingHearts />
      
      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Heart icon */}
        <div className="mb-8 flex justify-center">
          <div className="heart-pulse">
            <Heart 
              size={80} 
              className="fill-primary text-primary drop-shadow-lg"
              style={{ filter: 'drop-shadow(0 0 20px hsl(350, 80%, 60%, 0.5))' }}
            />
          </div>
        </div>

        {/* Question */}
        <h1 className="font-romantic text-5xl md:text-7xl lg:text-8xl text-foreground mb-4 leading-tight">
          Chigz
        </h1>
        <h2 className="font-romantic text-4xl md:text-5xl lg:text-6xl text-primary mb-12">
          Will you be my Valentine?
        </h2>

        {/* Sparkle decoration */}
        <div className="flex justify-center gap-4 mb-12 opacity-60">
          <Sparkles className="text-accent" size={24} />
          <Sparkles className="text-primary" size={20} />
          <Sparkles className="text-accent" size={24} />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[120px]">
          <button
            onClick={handleYesClick}
            className="btn-yes text-xl md:text-2xl z-10"
          >
            Yes! 💕
          </button>

          <button
            ref={noButtonRef}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            className="btn-no text-xl md:text-2xl transition-all duration-150"
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              position: hasMovedNo ? 'absolute' : 'relative',
            }}
          >
            No
          </button>
        </div>

        {hasMovedNo && (
          <p className="mt-16 text-muted-foreground text-sm animate-fade-in">
            Hehe, that button seems to have a mind of its own... 💝
          </p>
        )}
      </div>
    </div>
  );
};

// Audio URL for Raindance - using a placeholder that can be replaced with actual audio file
const MUSIC_URL = `https://www.youtube.com/watch?v=${RAINDANCE_YOUTUBE_ID}`;

const ValentineProposal = () => {
  return (
    <BackgroundMusicProvider src="/raindance.mp3" autoPlay={true}>
      <MusicControl />
      <ValentineContent />
    </BackgroundMusicProvider>
  );
};

export default ValentineProposal;
