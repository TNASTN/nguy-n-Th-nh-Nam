import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { TRANSLATIONS } from '../data/weddingData';

interface SocialShareProps {
  lang: 'vi' | 'en';
}

export const SocialShare: React.FC<SocialShareProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://thanhnam-tuuyen.wedding';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Thành Nam ❤️ Tú Uyên',
          text: 'Thành Nam ❤️ Tú Uyên - Trân trọng kính mời quý khách tham dự lễ tân hôn và tiệc cưới ngày 18.11.2026 tại 78 Thôn Tiến Đông, Ea Knốp, Đắk Lắk!',
          url: currentUrl,
        });
        return;
      } catch {
        // Fallback to clipboard if user cancels or share fails
      }
    }
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <section id="share" className="py-6 bg-[#FDFBF7] border-t border-[#E8DCC4]/60">
      <div className="max-w-md mx-auto px-4">
        {/* Single discreet preview card: only 1 image, subtle, non-intrusive */}
        <div className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-white border border-[#E8DCC4] shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            {/* 1 single image */}
            <div className="w-12 h-16 rounded-lg overflow-hidden border border-[#D4AF37]/50 shrink-0 bg-stone-100 shadow-2xs">
              <img
                src="/assets/wedding/QYN_7687.jpg"
                alt="Thiệp cưới Thành Nam & Tú Uyên"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-stone-800 truncate">
                {lang === 'vi' ? 'Chia sẻ thiệp cưới' : 'Share Invitation'}
              </p>
              <p className="text-[11px] text-stone-500 truncate mt-0.5">
                {lang === 'vi' ? 'Gửi lời mời đến bạn bè & người thân' : 'Invite friends & family'}
              </p>
            </div>
          </div>

          {/* Quick share / copy button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FDFBF7] hover:bg-[#F4EFE6] border border-[#D4AF37] text-[#8B1E2D] text-xs font-medium transition-all shadow-2xs shrink-0 active:scale-95 cursor-pointer"
            title={lang === 'vi' ? 'Chia sẻ thiệp mời' : 'Share invitation'}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">{t.copied}</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#8B1E2D]" />
                <span>{lang === 'vi' ? 'Chia sẻ' : 'Share'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
