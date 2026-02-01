import { Heart, X, Sparkles, Stars } from 'lucide-react';

interface RomanticPoemProps {
  onClose: () => void;
}

const RomanticPoem = ({ onClose }: RomanticPoemProps) => {
  return (
    <div className="celebration-bg min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 p-2 rounded-full bg-card/80 hover:bg-card transition-colors"
      >
        <X size={24} className="text-foreground" />
      </button>

      {/* Floating sparkles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-up"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-30px',
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${5 + Math.random() * 3}s`,
            }}
          >
            <Stars
              size={12 + Math.random() * 16}
              className="text-accent/40"
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Stars className="text-accent" size={24} />
          <Heart className="fill-primary text-primary" size={32} />
          <Stars className="text-accent" size={24} />
        </div>

        <h2 className="font-romantic text-3xl md:text-5xl text-foreground mb-2">
          A Poem For My Love
        </h2>
        <p className="text-muted-foreground mb-10">Written from the depths of my heart</p>

        {/* Poem content */}
        <div className="poem-container">
          <div className="poem-verse">
            <p>In the garden of my heart, you bloom so bright,</p>
            <p>A flower more precious than morning light.</p>
            <p>With every beat, my heart sings your name,</p>
            <p>Since you came along, nothing's been the same.</p>
          </div>

          <div className="poem-divider">
            <Sparkles className="text-primary" size={20} />
          </div>

          <div className="poem-verse">
            <p>Your smile, a sunrise that melts the night,</p>
            <p>Your eyes, two stars that make my world so bright.</p>
            <p>Your laughter echoes like a sweet melody,</p>
            <p>In this symphony of love, you're the harmony.</p>
          </div>

          <div className="poem-divider">
            <Heart className="text-primary fill-primary" size={20} />
          </div>

          <div className="poem-verse">
            <p>Through seasons of life, whatever may come,</p>
            <p>With you by my side, I've already won.</p>
            <p>My love for you grows stronger each day,</p>
            <p>Forever and always, with you I'll stay.</p>
          </div>

          <div className="poem-divider">
            <Sparkles className="text-primary" size={20} />
          </div>

          <div className="poem-verse italic">
            <p>So take my hand and never let go,</p>
            <p>For you are the love I'm blessed to know.</p>
            <p>Chigz, my darling, my heart's one true song,</p>
            <p>With you, my love, is where I belong.</p>
          </div>
        </div>

        {/* Footer hearts */}
        <div className="flex justify-center gap-3 mt-10">
          <Heart className="text-primary/60 fill-primary/60" size={16} />
          <Heart className="text-primary fill-primary" size={24} />
          <Heart className="text-primary/60 fill-primary/60" size={16} />
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

export default RomanticPoem;
