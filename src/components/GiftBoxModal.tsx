import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Gift, Heart } from 'lucide-react';
import { WEDDING_DATA, TRANSLATIONS } from '../data/weddingData';

interface GiftBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'vi' | 'en';
}

export const GiftBoxModal: React.FC<GiftBoxModalProps> = ({ isOpen, onClose, lang }) => {
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);

  if (!isOpen) return null;

  const currentPerson = activeTab === 'groom' ? WEDDING_DATA.groom : WEDDING_DATA.bride;

  const handleCopy = (text: string, type: 'groom' | 'bride') => {
    navigator.clipboard.writeText(text);
    if (type === 'groom') {
      setCopiedGroom(true);
      setTimeout(() => setCopiedGroom(false), 2500);
    } else {
      setCopiedBride(true);
      setTimeout(() => setCopiedBride(false), 2500);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md rounded-2xl bg-white border border-[#E8DCC4] shadow-2xl p-6 sm:p-8 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
          aria-label={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#8B1E2D]/10 text-[#8B1E2D] mb-1">
            <Gift className="w-6 h-6" />
          </div>
          <h3 className="font-display-wedding text-2xl text-stone-900">
            {t.giftBoxHeading}
          </h3>
          <p className="text-xs text-stone-600 max-w-xs mx-auto">
            {t.giftBoxSubtitle}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#FDFBF7] border border-[#E8DCC4] mb-6">
          <button
            onClick={() => setActiveTab('groom')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'groom'
                ? 'bg-[#8B1E2D] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t.groomGiftTab}
          </button>
          <button
            onClick={() => setActiveTab('bride')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'bride'
                ? 'bg-[#8B1E2D] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t.brideGiftTab}
          </button>
        </div>

        {/* Bank & QR Code Card */}
        <div className="rounded-xl bg-[#FDFBF7] border border-[#E8DCC4] p-5 text-center space-y-4">
          {/* VietQR code image */}
          <div className="w-48 h-48 mx-auto bg-white p-2 rounded-xl border border-[#E8DCC4] shadow-sm flex items-center justify-center">
            <img
              src={currentPerson.bankInfo.qrCodeUrl}
              alt={`Mã QR mừng cưới ${currentPerson.fullName}`}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-1 text-xs sm:text-sm">
            <p className="text-stone-500 uppercase tracking-wider text-[11px]">
              {currentPerson.bankInfo.bankName}
            </p>
            <p className="font-semibold text-stone-900 text-base">
              {currentPerson.bankInfo.accountName}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#E8DCC4] font-mono text-stone-800 text-sm font-bold tracking-wider">
              <span>{currentPerson.bankInfo.accountNumber}</span>
              <button
                onClick={() => handleCopy(currentPerson.bankInfo.accountNumber, activeTab)}
                className="p-1 rounded hover:bg-stone-100 text-[#8B1E2D] transition-colors"
                title={t.copyNumber}
              >
                {(activeTab === 'groom' ? copiedGroom : copiedBride) ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {(activeTab === 'groom' ? copiedGroom : copiedBride) && (
            <p className="text-xs text-emerald-600 font-medium animate-fadeIn">
              ✓ {t.copied}
            </p>
          )}
        </div>

        <p className="text-center text-[11px] text-stone-400 italic mt-4">
          Gia đình xin gửi lời cảm ơn chân thành và sâu sắc nhất đến tấm lòng của quý khách!
        </p>
      </div>
    </div>
  );
};
