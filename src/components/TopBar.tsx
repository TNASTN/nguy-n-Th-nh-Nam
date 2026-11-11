import React from 'react';
import { Globe, Lock } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

interface TopBarProps {
  lang: 'vi' | 'en';
  onToggleLang: () => void;
  onOpenAdmin: () => void;
  onOpenGiftBox?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  lang,
  onToggleLang,
  onOpenAdmin,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E8DCC4] px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a 
          href="#home" 
          className="font-display-wedding text-lg sm:text-xl font-semibold text-[#8B1E2D] tracking-wide whitespace-nowrap shrink-0 hover:text-[#69131F] transition-colors"
        >
          {WEDDING_DATA.groom.shortName} <span className="text-[#D4AF37] font-normal">&</span> {WEDDING_DATA.bride.shortName}
        </a>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-stone-700">
          <a href="#events" className="hover:text-[#8B1E2D] transition-colors whitespace-nowrap shrink-0">
            {lang === 'vi' ? 'Lịch Trình' : 'Itinerary'}
          </a>
          <a href="#location" className="hover:text-[#8B1E2D] transition-colors whitespace-nowrap shrink-0">
            {lang === 'vi' ? 'Bản Đồ' : 'Location'}
          </a>
          <a href="#gallery" className="hover:text-[#8B1E2D] transition-colors whitespace-nowrap shrink-0">
            {lang === 'vi' ? 'Album Ảnh' : 'Gallery'}
          </a>
          <a href="#rsvp" className="hover:text-[#8B1E2D] transition-colors whitespace-nowrap shrink-0">
            {lang === 'vi' ? 'Xác Nhận Tham Dự' : 'RSVP'}
          </a>
          <a href="#guestbook" className="hover:text-[#8B1E2D] transition-colors whitespace-nowrap shrink-0">
            {lang === 'vi' ? 'Sổ Lưu Bút' : 'Wishes'}
          </a>
        </nav>

        {/* Zone 3: Actions (Language toggle, Admin entrance) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#E8DCC4] text-xs font-medium text-stone-700 hover:bg-[#F4EFE6] transition-colors whitespace-nowrap shrink-0"
            title="Chuyển đổi ngôn ngữ / Switch language"
          >
            <Globe className="w-3.5 h-3.5 text-[#8B1E2D]" />
            <span className="uppercase">{lang}</span>
          </button>

          {/* Admin PIN Modal Trigger */}
          <button
            onClick={onOpenAdmin}
            className="p-1.5 rounded-lg border border-transparent hover:border-[#E8DCC4] text-stone-500 hover:text-[#8B1E2D] transition-colors shrink-0"
            title={lang === 'vi' ? 'Quản trị viên cô dâu chú rể' : 'Couple Admin Portal'}
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
