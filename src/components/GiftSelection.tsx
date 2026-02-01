import { useState } from 'react';
import { Gift, Mail, Video, Heart, Sparkles } from 'lucide-react';
import LoveLetter from './gifts/LoveLetter';
import RomanticVideo from './gifts/RomanticVideo';
import RomanticPoem from './gifts/RomanticPoem';

type GiftType = 'letter' | 'video' | 'poem' | null;

interface GiftSelectionProps {
  onComplete: () => void;
}

const GiftSelection = ({ onComplete }: GiftSelectionProps) => {
  const [selectedGift, setSelectedGift] = useState<GiftType>(null);
  const [openedGifts, setOpenedGifts] = useState<Set<GiftType>>(new Set());

  const handleGiftOpen = (gift: GiftType) => {
    setSelectedGift(gift);
    if (gift) {
      setOpenedGifts(prev => new Set([...prev, gift]));
    }
  };

  const handleCloseGift = () => {
    setSelectedGift(null);
  };

  const allGiftsOpened = openedGifts.size === 3;

  if (selectedGift === 'letter') {
    return <LoveLetter onClose={handleCloseGift} />;
  }

  if (selectedGift === 'video') {
    return <RomanticVideo onClose={handleCloseGift} />;
  }

  if (selectedGift === 'poem') {
    return <RomanticPoem onClose={handleCloseGift} />;
  }

  return (
    <div className="romantic-bg min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-up"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-50px',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          >
            <Heart
              size={15 + Math.random() * 25}
              className="fill-primary/20 text-primary/20"
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-accent" size={24} />
            <Heart className="fill-primary text-primary" size={32} />
            <Sparkles className="text-accent" size={24} />
          </div>
          <h1 className="font-romantic text-4xl md:text-6xl text-foreground mb-4">
            I have surprises for you!
          </h1>
          <p className="text-xl text-muted-foreground">
            Open each gift to discover what's inside 💝
          </p>
        </div>

        {/* Gift boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
          {/* Gift 1: Love Letter */}
          <button
            onClick={() => handleGiftOpen('letter')}
            className="gift-box group"
          >
            <div className={`gift-box-inner ${openedGifts.has('letter') ? 'opened' : ''}`}>
              <div className="gift-ribbon" />
              <div className="gift-icon">
                <Mail size={48} className="text-primary" />
              </div>
              <h3 className="font-romantic text-2xl text-foreground mt-4">
                A Love Letter
              </h3>
              <p className="text-muted-foreground text-sm mt-2">
                Words from my heart
              </p>
              {openedGifts.has('letter') && (
                <span className="opened-badge">Opened ✓</span>
              )}
            </div>
          </button>

          {/* Gift 2: Romantic Video */}
          <button
            onClick={() => handleGiftOpen('video')}
            className="gift-box group"
          >
            <div className={`gift-box-inner ${openedGifts.has('video') ? 'opened' : ''}`}>
              <div className="gift-ribbon" />
              <div className="gift-icon">
                <Video size={48} className="text-primary" />
              </div>
              <h3 className="font-romantic text-2xl text-foreground mt-4">
                A Special Video
              </h3>
              <p className="text-muted-foreground text-sm mt-2">
                Something beautiful for you
              </p>
              {openedGifts.has('video') && (
                <span className="opened-badge">Opened ✓</span>
              )}
            </div>
          </button>

          {/* Gift 3: Romantic Poem */}
          <button
            onClick={() => handleGiftOpen('poem')}
            className="gift-box group"
          >
            <div className={`gift-box-inner ${openedGifts.has('poem') ? 'opened' : ''}`}>
              <div className="gift-ribbon" />
              <div className="gift-icon">
                <Heart size={48} className="text-primary fill-primary" />
              </div>
              <h3 className="font-romantic text-2xl text-foreground mt-4">
                A Love Poem
              </h3>
              <p className="text-muted-foreground text-sm mt-2">
                Verses just for you
              </p>
              {openedGifts.has('poem') && (
                <span className="opened-badge">Opened ✓</span>
              )}
            </div>
          </button>
        </div>

        {/* Continue button */}
        {allGiftsOpened && (
          <div className="mt-12 animate-fade-in">
            <button
              onClick={onComplete}
              className="btn-yes text-xl"
            >
              Continue to Celebration 🎉
            </button>
          </div>
        )}

        {!allGiftsOpened && (
          <p className="mt-10 text-muted-foreground animate-pulse">
            Open all gifts to continue... 💕
          </p>
        )}
      </div>
    </div>
  );
};

export default GiftSelection;
