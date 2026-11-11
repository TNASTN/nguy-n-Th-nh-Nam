import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { WEDDING_DATA, TRANSLATIONS } from '../data/weddingData';

interface EnvelopeModalProps {
  onOpen: () => void;
  lang: 'vi' | 'en';
}

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({ onOpen, lang }) => {
  const [isOpening, setIsOpening] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Launch celebratory gold & ruby confetti petals
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#8B1E2D', '#F4E0A5', '#FFFFFF', '#C5A059']
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A0508]/85 backdrop-blur-md overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute w-96 h-96 bg-[#8B1E2D]/30 rounded-full blur-3xl pointer-events-none" />
      
      <div 
        className={`relative w-full max-w-lg transition-all duration-1000 transform ${
          isOpening ? 'scale-105 opacity-0 -translate-y-8 pointer-events-none' : 'scale-100 opacity-100 translate-y-0'
        }`}
      >
        {/* Ceremonial Envelope Outer Box */}
        <div className="relative rounded-2xl p-1 bg-gradient-to-b from-[#D4AF37] via-[#F4E0A5] to-[#AA7C11] shadow-2xl shadow-black/60">
          <div className="relative rounded-[14px] bg-gradient-to-br from-[#8B1E2D] via-[#751624] to-[#540D18] p-6 sm:p-10 text-center text-white border border-[#D4AF37]/40 overflow-hidden">
            
            {/* Ornamental Background Floral Filigree */}
            <div className="absolute -top-12 -right-12 w-40 h-40 border border-[#D4AF37]/20 rounded-full pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 border border-[#D4AF37]/20 rounded-full pointer-events-none" />

            {/* Top Subtitle */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#D4AF37]/30 text-xs tracking-[0.2em] uppercase text-[#F4E0A5] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.invitationKicker}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            </div>

            {/* Couple Grand Typography */}
            <p className="font-serif-wedding italic text-lg sm:text-xl text-[#F8E7C0]">
              Trân trọng báo tin Lễ Tân Hôn
            </p>
            <h1 className="font-display-wedding text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-wide my-3 text-white">
              {WEDDING_DATA.groom.shortName} <span className="text-[#D4AF37] font-serif-wedding font-normal">&</span> {WEDDING_DATA.bride.shortName}
            </h1>

            {/* Date line */}
            <div className="my-4 py-2 border-y border-[#D4AF37]/30 flex flex-col items-center justify-center">
              <span className="text-sm tracking-wider font-medium text-[#F4E0A5]">
                {WEDDING_DATA.weddingDateDisplayVi}
              </span>
              <span className="text-xs text-white/70 italic mt-0.5">
                ({WEDDING_DATA.lunarDateVi})
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-200/90 font-light max-w-sm mx-auto mb-8">
              {t.openEnvelopeSubtitle}
            </p>

            {/* Golden Wax Seal Button */}
            <button
              onClick={handleOpenEnvelope}
              className="group relative inline-flex flex-col items-center justify-center cursor-pointer focus:outline-none transition-transform active:scale-95"
            >
              {/* Wax Seal Circle with Song Hỷ 囍 */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#946F17] via-[#D4AF37] to-[#FFF1BF] p-1 shadow-lg shadow-black/50 group-hover:shadow-[#D4AF37]/40 transition-all duration-300">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#8B1E2D] to-[#590C16] flex items-center justify-center border-2 border-[#D4AF37]/80 group-hover:scale-105 transition-transform">
                  {/* Traditional Double Happiness Character 囍 */}
                  <span className="text-3xl text-[#F4E0A5] select-none font-serif leading-none filter drop-shadow">
                    囍
                  </span>
                </div>
              </div>

              {/* Action hint label */}
              <span className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#D4AF37] text-[#590C16] text-xs font-semibold tracking-wide uppercase shadow-md group-hover:bg-[#E5C158] transition-colors">
                <Mail className="w-3.5 h-3.5" />
                {t.openEnvelopeTitle}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
