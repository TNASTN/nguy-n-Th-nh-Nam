import React from 'react';
import { Heart, MapPin, Phone } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const Footer: React.FC<{ lang: 'vi' | 'en' }> = ({ lang }) => {
  return (
    <footer className="bg-[#240509] text-stone-300 py-16 border-t border-[#D4AF37]/40 relative overflow-hidden">
      {/* Background dưới cùng mờ khoảng 15% (trong khoảng 10-20%) với hiệu ứng tráng gương (scale-x-[-1] và vệt sáng gương phản chiếu) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <img
          src="/assets/aistudio/1__1__3a40259e.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-15 scale-x-[-1] filter contrast-110 brightness-115"
        />
        {/* Lớp phủ hiệu ứng tráng gương: ánh sáng phản chiếu gương & chuyển màu sâu */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#240509] via-[#240509]/75 to-[#240509]/85" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.09)_0%,transparent_35%,rgba(212,175,55,0.07)_65%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#8B1E2D]/25 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Double Happiness Golden Emblem */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#D4AF37]/50 bg-white/5 text-[#D4AF37] font-serif text-3xl shadow-inner">
          囍
        </div>

        {/* Couple names & thanks */}
        <div className="space-y-3">
          <h2 className="font-display-wedding text-3xl sm:text-4xl text-white font-medium">
            {WEDDING_DATA.groom.fullName} &amp; {WEDDING_DATA.bride.fullName}
          </h2>
          <p className="font-serif-wedding italic text-[#F4E0A5] text-lg sm:text-xl">
            "Chân thành cảm ơn sự hiện diện và những lời chúc phúc ngọt ngào của quý vị!"
          </p>
        </div>

        {/* Family Representatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto py-6 border-y border-[#D4AF37]/20 text-xs sm:text-sm">
          <div className="space-y-1 text-stone-300">
            <p className="text-[#D4AF37] font-semibold uppercase tracking-wider text-xs">
              Đại Diện Nhà Trai
            </p>
            <p className="font-medium text-white">{WEDDING_DATA.groom.parentsVi.father}</p>
            <p className="font-medium text-white">{WEDDING_DATA.groom.parentsVi.mother}</p>
            <p className="text-stone-400 text-xs">{WEDDING_DATA.groom.parentsVi.address}</p>
          </div>

          <div className="space-y-1 text-stone-300">
            <p className="text-[#D4AF37] font-semibold uppercase tracking-wider text-xs">
              Đại Diện Nhà Gái
            </p>
            <p className="font-medium text-white">{WEDDING_DATA.bride.parentsVi.father}</p>
            <p className="font-medium text-white">{WEDDING_DATA.bride.parentsVi.mother}</p>
            <p className="text-stone-400 text-xs">{WEDDING_DATA.bride.parentsVi.address}</p>
          </div>
        </div>

        {/* Date and Address summary */}
        <div className="space-y-2 text-xs text-stone-400 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>78 Thôn Tiến Đông, Ea Knốp, Đắk Lắk, Vietnam</span>
          </div>
          <p>Hôn lễ cử hành: 09:00 - Khai tiệc: 11:00 · Thứ Tư, ngày 18.11.2026</p>
        </div>

        <div className="pt-6 text-[11px] text-stone-500">
          <p>© 2026 Thành Nam &amp; Tú Uyên Wedding Invitation · Kunikaa Luxury Edition</p>
        </div>

      </div>
    </footer>
  );
};
