import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

interface AudioPlayerProps {
  autoPlayTrigger?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current && autoPlayTrigger && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay policy prevented playback, user can toggle manually
          setIsPlaying(false);
        });
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio playback notice:', err));
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      <audio
        ref={audioRef}
        src={WEDDING_DATA.backgroundMusicUrl}
        loop
        preload="auto"
      />
      
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all shadow-md backdrop-blur-md border ${
          isPlaying 
            ? 'bg-[#8B1E2D]/90 text-white border-[#D4AF37]/50 shadow-[#8B1E2D]/20 animate-pulse' 
            : 'bg-white/90 text-[#69131F] border-[#E8DCC4] hover:bg-white'
        }`}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Phát Nhạc</span>
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-3 bg-[#D4AF37] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 h-2 bg-[#D4AF37] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 h-3.5 bg-[#D4AF37] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden sm:inline">Bật Nhạc</span>
          </>
        )}
      </button>
    </div>
  );
};
