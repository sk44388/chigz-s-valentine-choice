import { Heart, X, Play, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface RomanticVideoProps {
  onClose: () => void;
}

const RomanticVideo = ({ onClose }: RomanticVideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="celebration-bg min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 p-2 rounded-full bg-card/80 hover:bg-card transition-colors"
      >
        <X size={24} className="text-foreground" />
      </button>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="text-accent" size={24} />
          <h2 className="font-romantic text-3xl md:text-5xl text-foreground">
            A Video Made For You
          </h2>
          <Sparkles className="text-accent" size={24} />
        </div>

        <p className="text-muted-foreground text-lg mb-8">
          Every love story is beautiful, but ours is my favorite 💕
        </p>

        {/* Video container */}
        <div className="video-container">
          {!isPlaying ? (
            <div className="video-placeholder">
              <div className="video-play-overlay">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="play-button"
                >
                  <Play size={48} className="text-white ml-1" />
                </button>
              </div>
              <div className="video-placeholder-content">
                <Heart size={80} className="text-primary/30 fill-primary/30 mb-4" />
                <p className="font-romantic text-2xl text-foreground/60">
                  Click to play our love story
                </p>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-card/50 rounded-2xl overflow-hidden">
              {/* Romantic video embed - using a romantic YouTube video */}
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/450p7goxZqg?autoplay=1&rel=0"
                title="Romantic Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* Romantic message */}
        <div className="mt-8 p-6 bg-card/60 backdrop-blur-sm rounded-2xl border border-primary/20">
          <p className="font-romantic text-xl md:text-2xl text-foreground">
            "I choose you. And I'll choose you over and over again. 
            Without pause, without doubt, in a heartbeat. I'll keep choosing you."
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Heart className="text-primary fill-primary" size={16} />
            <Heart className="text-primary fill-primary" size={20} />
            <Heart className="text-primary fill-primary" size={16} />
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

export default RomanticVideo;
