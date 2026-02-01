import { useEffect, useState } from 'react';
import { Heart, Sparkles, Stars } from 'lucide-react';

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  color: string;
  size: number;
}

const CelebrationScreen = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [showMessage, setShowMessage] = useState(false);

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

  return (
    <div className="celebration-bg min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
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
        className={`relative z-10 text-center max-w-3xl mx-auto transition-all duration-1000 ${
          showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Big heart */}
        <div className="mb-8 flex justify-center">
          <div className="heart-pulse">
            <Heart 
              size={120} 
              className="fill-primary text-primary"
              style={{ filter: 'drop-shadow(0 0 30px hsl(350, 80%, 60%, 0.6))' }}
            />
          </div>
        </div>

        {/* Celebration text */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Stars className="text-accent" size={28} />
          <h1 className="font-romantic text-5xl md:text-7xl text-primary">
            Yay!
          </h1>
          <Stars className="text-accent" size={28} />
        </div>

        {/* Romantic message */}
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-primary/20">
          <p className="font-romantic text-3xl md:text-5xl text-foreground leading-relaxed mb-6">
            You just made me the happiest person alive!
          </p>
          
          <div className="flex justify-center gap-2 my-8">
            <Sparkles className="text-primary" size={20} />
            <Heart className="text-primary fill-primary" size={20} />
            <Sparkles className="text-primary" size={20} />
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-6">
            Chigz, every moment with you feels like a beautiful dream I never want to wake up from.
          </p>

          <p className="font-romantic text-2xl md:text-3xl text-primary mt-8">
            I can't wait to spend Valentine's Day with you! 💕
          </p>
        </div>

        {/* Extra love message */}
        <p className="mt-10 text-lg text-muted-foreground animate-pulse">
          Forever and always yours... 💝
        </p>
      </div>
    </div>
  );
};

export default CelebrationScreen;
