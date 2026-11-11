import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Heart, ChevronDown } from 'lucide-react';
import { WEDDING_DATA, TRANSLATIONS } from '../data/weddingData';

interface HeroCountdownProps {
  lang: 'vi' | 'en';
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const HeroCountdown: React.FC<HeroCountdownProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    const targetDate = new Date(WEDDING_DATA.weddingDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-center pt-8 pb-16 overflow-hidden">
      {/* Background paper texture & decorative corner floral ornaments */}
      <div className="absolute inset-0 paper-texture opacity-80 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Kicker */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8B1E2D] font-medium">
            <span>—</span>
            <span>{t.invitationKicker}</span>
            <span>—</span>
          </div>
        </div>

        {/* 2-Column Split: Editorial Presentation & Hero Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typographic Majesty */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            <div className="space-y-2">
              <p className="font-script-wedding text-4xl sm:text-5xl text-[#8B1E2D]">
                Save Our Date
              </p>
              
              <h1 className="font-display-wedding text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-tight">
                {WEDDING_DATA.groom.shortName}
                <span className="block font-serif-wedding italic text-[#D4AF37] text-3xl sm:text-4xl my-1">
                  &amp;
                </span>
                {WEDDING_DATA.bride.shortName}
              </h1>
            </div>

            {/* Official Date & Location details */}
            <div className="pt-2 pb-4 space-y-2 border-y border-[#E8DCC4] max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-stone-800 font-medium text-sm sm:text-base">
                <Calendar className="w-4 h-4 text-[#8B1E2D]" />
                <span>{WEDDING_DATA.weddingDateDisplayVi}</span>
                <span className="text-xs text-stone-500 italic">({WEDDING_DATA.lunarDateVi})</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-stone-600 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 text-[#8B1E2D]" />
                <span>Tư Gia Nhà Trai: 78 Thôn Tiến Đông, Ea Knốp, Đắk Lắk</span>
              </div>
            </div>

            {/* Live Countdown Timer */}
            <div className="space-y-3 pt-2">
              <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                {t.countdownHeading}
              </p>
              
              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto lg:mx-0">
                {[
                  { label: t.days, val: timeLeft.days },
                  { label: t.hours, val: timeLeft.hours },
                  { label: t.minutes, val: timeLeft.minutes },
                  { label: t.seconds, val: timeLeft.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 rounded-xl bg-white border border-[#E8DCC4] shadow-sm text-center"
                  >
                    <span className="block font-display-wedding text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#8B1E2D] tabular-nums">
                      {String(item.val).padStart(2, '0')}
                    </span>
                    <span className="block text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="#rsvp"
                className="px-6 py-3 rounded-xl bg-[#8B1E2D] hover:bg-[#721522] text-white text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all shadow-md shadow-[#8B1E2D]/20 active:scale-95"
              >
                {t.submitRsvp}
              </a>
              <a
                href="#events"
                className="px-5 py-3 rounded-xl border border-[#D4AF37] hover:bg-white text-stone-800 text-xs sm:text-sm font-medium tracking-wide transition-colors"
              >
                {t.eventsHeading}
              </a>
            </div>
          </div>

          {/* Right Column: Original Masterpiece Wedding Photograph */}
          <div className="lg:col-span-6 relative flex justify-center">
            {/* Ornamental Frame Shadow */}
            <div className="relative w-full max-w-md lg:max-w-none">
              <div className="relative rounded-2xl p-2 bg-white border border-[#E8DCC4] shadow-xl shadow-stone-900/10 overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden rounded-xl relative group">
                  <img
                    src="/assets/aistudio/7c89500b-1831-47a4-8528-709a25caeb23_8e706367.jpg"
                    alt="Nguyễn Thành Nam & Lê Huỳnh Tú Uyên trong trang phục áo dài cưới đỏ truyền thống"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                  {/* Subtle vignette gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Photo Caption Tag */}
                  <div className="absolute bottom-4 left-4 right-4 text-center text-white">
                    <p className="font-script-wedding text-2xl sm:text-3xl text-[#F4E0A5]">
                      Trăm Năm Tình Viên Mãn
                    </p>
                    <p className="text-xs text-white/90 font-light mt-0.5">
                      Thành Nam &amp; Tú Uyên · 18.11.2026
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Floating Golden Seal Emblem */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-tr from-[#946F17] via-[#D4AF37] to-[#FFF1BF] p-0.5 shadow-lg hidden sm:flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#8B1E2D] flex items-center justify-center text-[#F4E0A5] font-serif text-xl border border-[#D4AF37]">
                  囍
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 text-center">
          <a
            href="#couple"
            aria-label="Cuộn xuống xem câu chuyện"
            className="inline-flex flex-col items-center gap-1 text-stone-400 hover:text-[#8B1E2D] transition-colors"
          >
            <span className="text-[10px] uppercase tracking-widest">Khám phá</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
