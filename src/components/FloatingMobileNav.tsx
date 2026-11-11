import React from 'react';
import { Calendar, Navigation, CheckSquare, MessageSquareHeart } from 'lucide-react';
import { TRANSLATIONS } from '../data/weddingData';

interface FloatingMobileNavProps {
  lang: 'vi' | 'en';
  onOpenGiftBox?: () => void;
}

export const FloatingMobileNav: React.FC<FloatingMobileNavProps> = ({ lang }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#E8DCC4] shadow-lg">
      <div className="grid grid-cols-4 items-center h-16 px-2 max-w-lg mx-auto">
        
        {/* Itinerary */}
        <a
          href="#events"
          className="flex flex-col items-center justify-center min-h-[44px] text-stone-600 hover:text-[#8B1E2D] active:scale-95 transition-transform"
        >
          <Calendar className="w-5 h-5 text-[#8B1E2D]" />
          <span className="text-[10px] font-medium tracking-tight mt-1">
            {lang === 'vi' ? 'Lịch Trình' : 'Events'}
          </span>
        </a>

        {/* Directions / Maps */}
        <a
          href="#location"
          className="flex flex-col items-center justify-center min-h-[44px] text-stone-600 hover:text-[#8B1E2D] active:scale-95 transition-transform"
        >
          <Navigation className="w-5 h-5 text-[#8B1E2D]" />
          <span className="text-[10px] font-medium tracking-tight mt-1">
            {lang === 'vi' ? 'Chỉ Đường' : 'Directions'}
          </span>
        </a>

        {/* RSVP */}
        <a
          href="#rsvp"
          className="flex flex-col items-center justify-center min-h-[44px] text-stone-600 hover:text-[#8B1E2D] active:scale-95 transition-transform"
        >
          <CheckSquare className="w-5 h-5 text-[#8B1E2D]" />
          <span className="text-[10px] font-medium tracking-tight mt-1">
            RSVP
          </span>
        </a>

        {/* Lời Chúc (Thay thế tạm thời cho Mừng Cưới) */}
        <a
          href="#guestbook"
          className="flex flex-col items-center justify-center min-h-[44px] text-stone-600 hover:text-[#8B1E2D] active:scale-95 transition-transform"
        >
          <MessageSquareHeart className="w-5 h-5 text-[#8B1E2D]" />
          <span className="text-[10px] font-medium tracking-tight mt-1">
            {lang === 'vi' ? 'Lời Chúc' : 'Wishes'}
          </span>
        </a>

      </div>
    </nav>
  );
};
