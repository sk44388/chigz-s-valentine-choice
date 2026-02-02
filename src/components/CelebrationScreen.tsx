import { useEffect, useState, useRef } from 'react';
import { Heart, Sparkles, Stars, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  color: string;
  size: number;
}

interface MediaItem {
  type: 'image' | 'video';
  src: string;
}

const mediaItems: MediaItem[] = [
  { type: 'image', src: '/slideshow/photo1.jpeg' },
  { type: 'image', src: '/slideshow/photo2.jpeg' },
  { type: 'image', src: '/slideshow/photo3.jpeg' },
  { type: 'video', src: '/slideshow/video1.mp4' },
  { type: 'image', src: '/slideshow/photo4.jpeg' },
  { type: 'image', src: '/slideshow/photo5.jpeg' },
];

const CelebrationScreen = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Create confetti
    const colors = [
      'hsl(350, 80%, 60%)',
      'hsl(340, 90%, 70%)',
      'hsl(320, 70%, 65%)',
      'hsl(0, 85%, 65%)',
      'hsl(350, 100%, 85%)',
    ];

    const pieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 8 + Math.random() * 12,
    }));

    setConfetti(pieces);

    // Show message with delay for dramatic effect
    const timer = setTimeout(() => setShowMessage(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const currentMedia = mediaItems[currentIndex];
    let timeout: NodeJS.Timeout;
    
    if (currentMedia.type === 'video') {
      // For videos, wait for them to finish
      const checkVideoEnd = () => {
        if (videoRef.current) {
          videoRef.current.onended = () => {
            goToNext();
          };
        }
      };
      checkVideoEnd();
    } else {
      // For images, advance after 4 seconds
      timeout = setTimeout(() => {
        goToNext();
      }, 4000);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [currentIndex, isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const currentMedia = mediaItems[currentIndex];

  return (
    <div className="celebration-bg min-h-screen flex flex-col items-center justify-start relative overflow-hidden px-4 py-8">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute animate-confetti"
            style={{
              left: `${piece.left}%`,
              top: '-20px',
              animationDelay: `${piece.delay}s`,
            }}
          >
            <Heart
              size={piece.size}
              style={{ color: piece.color, fill: piece.color }}
            />
          </div>
        ))}
      </div>

      {/* Floating hearts in background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-up"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-50px',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          >
            <Heart
              size={20 + Math.random() * 30}
              className="fill-primary/30 text-primary/30"
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div 
        className={`relative z-10 w-full max-w-4xl mx-auto transition-all duration-1000 ${
          showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Slideshow */}
        <div className="relative mb-8">
          <div className="aspect-[4/3] md:aspect-video w-full overflow-hidden rounded-3xl shadow-2xl bg-card/50 border-4 border-primary/20">
            {currentMedia.type === 'image' ? (
              <img
                key={currentIndex}
                src={currentMedia.src}
                alt="Our memories"
                className="w-full h-full object-cover animate-fade-in"
              />
            ) : (
              <video
                ref={videoRef}
                key={currentIndex}
                src={currentMedia.src}
                autoPlay
                muted={false}
                playsInline
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Slideshow overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-card/80 hover:bg-card transition-all shadow-lg border border-primary/20 hover:scale-110"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-card/80 hover:bg-card transition-all shadow-lg border border-primary/20 hover:scale-110"
          >
            <ChevronRight size={24} className="text-foreground" />
          </button>

          {/* Play/Pause button */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute bottom-4 right-4 p-2 rounded-full bg-card/80 hover:bg-card transition-all shadow-lg border border-primary/20"
          >
            {isAutoPlaying ? (
              <Pause size={20} className="text-foreground" />
            ) : (
              <Play size={20} className="text-foreground" />
            )}
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {mediaItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                  idx === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Text content below slideshow */}
        <div className="text-center">
          {/* Celebration text */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Stars className="text-accent" size={28} />
            <h1 className="font-romantic text-5xl md:text-7xl text-primary">
              Yay!
            </h1>
            <Stars className="text-accent" size={28} />
          </div>

          {/* Romantic message */}
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-2xl border border-primary/20">
            <p className="font-romantic text-2xl md:text-4xl text-foreground leading-relaxed mb-4">
              You just made me the happiest person alive!
            </p>
            
            <div className="flex justify-center gap-2 my-6">
              <Sparkles className="text-primary" size={20} />
              <Heart className="text-primary fill-primary" size={20} />
              <Sparkles className="text-primary" size={20} />
            </div>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
              Chigz, every moment with you feels like a beautiful dream I never want to wake up from.
            </p>

            <p className="font-romantic text-xl md:text-2xl text-primary mt-6">
              I can't wait to spend Valentine's Day with you! 💕
            </p>
          </div>

          {/* Extra love message */}
          <p className="mt-8 text-lg text-muted-foreground animate-pulse">
            Forever and always yours... 💝
          </p>
        </div>
      </div>
    </div>
  );
};

export default CelebrationScreen;
