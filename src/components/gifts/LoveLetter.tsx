import { Heart, X, Sparkles } from 'lucide-react';

interface LoveLetterProps {
  onClose: () => void;
}

const LoveLetter = ({ onClose }: LoveLetterProps) => {
  return (
    <div className="celebration-bg min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 p-2 rounded-full bg-card/80 hover:bg-card transition-colors"
      >
        <X size={24} className="text-foreground" />
      </button>

      {/* Letter content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="letter-paper">
          {/* Decorative elements */}
          <div className="flex justify-center gap-2 mb-6">
            <Sparkles className="text-primary/60" size={16} />
            <Heart className="text-primary fill-primary" size={24} />
            <Sparkles className="text-primary/60" size={16} />
          </div>

          <h2 className="font-romantic text-3xl md:text-4xl text-primary text-center mb-8">
            My Dearest Chigz,
          </h2>

          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-foreground/90">
            <p>
              From the moment you came into my life, everything changed. The colors seem brighter, 
              the music sounds sweeter, and every day feels like a beautiful adventure waiting to unfold.
            </p>

            <p>
              You have this incredible way of making me smile even on my worst days. Your laugh 
              is my favorite sound, and your happiness means everything to me.
            </p>

            <p>
              I never knew what true love felt like until I met you. Now I understand why 
              all the love songs were written, why poets spend their lives searching for 
              the perfect words to describe this feeling.
            </p>

            <p>
              Thank you for being you – for your kindness, your warmth, your beautiful soul. 
              Thank you for choosing me, for loving me, for making every moment together magical.
            </p>

            <p className="text-center font-romantic text-2xl text-primary pt-4">
              I love you more than words could ever say.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-10 text-right">
            <p className="font-romantic text-2xl text-primary">
              Forever Yours,
            </p>
            <div className="flex items-center justify-end gap-2 mt-2">
              <Heart className="text-primary fill-primary" size={16} />
              <span className="text-muted-foreground">Your Valentine</span>
              <Heart className="text-primary fill-primary" size={16} />
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="text-center mt-8">
          <button onClick={onClose} className="btn-secondary">
            Back to Gifts 🎁
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoveLetter;
