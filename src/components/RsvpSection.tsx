import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { db, collection, addDoc, handleFirestoreError, OperationType } from '../lib/firebase';
import { TRANSLATIONS } from '../data/weddingData';

interface RsvpSectionProps {
  lang: 'vi' | 'en';
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const [formData, setFormData] = useState({
    guestName: '',
    phoneNumber: '',
    attendingEvent: 'wedding_18',
    guestCount: 1,
    guestSide: 'groom',
    note: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName.trim() || !formData.phoneNumber.trim()) {
      setErrorMessage(lang === 'vi' ? 'Vui lòng nhập họ tên và số điện thoại.' : 'Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      guestName: formData.guestName.trim().slice(0, 100),
      phoneNumber: formData.phoneNumber.trim().slice(0, 25),
      attendingEvent: formData.attendingEvent,
      guestCount: Number(formData.guestCount),
      guestSide: formData.guestSide,
      note: formData.note.trim().slice(0, 500),
      createdAt: new Date().toISOString()
    };

    try {
      // 1. Save to Firebase Firestore
      await addDoc(collection(db, 'wedding_rsvps'), payload);

      // 2. Also save to LocalStorage for offline resilience
      const existingOffline = JSON.parse(localStorage.getItem('wedding_rsvps_cache') || '[]');
      existingOffline.push(payload);
      localStorage.setItem('wedding_rsvps_cache', JSON.stringify(existingOffline));

      // Celebrate
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#8B1E2D', '#D4AF37', '#F4E0A5']
        });
      } catch {
        // ignore
      }

      setIsSuccess(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'wedding_rsvps');
      
      // Fallback save to localStorage if offline
      const existingOffline = JSON.parse(localStorage.getItem('wedding_rsvps_cache') || '[]');
      existingOffline.push(payload);
      localStorage.setItem('wedding_rsvps_cache', JSON.stringify(existingOffline));
      
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8B1E2D]">
            {t.rsvpHeading}
          </span>
          <h2 className="font-display-wedding text-3xl sm:text-4xl text-stone-900">
            Xác Nhận Tham Dự
          </h2>
          <p className="font-serif-wedding italic text-stone-600 text-base sm:text-lg">
            {t.rsvpSubtitle}
          </p>
        </div>

        {/* Card Box */}
        <div className="rounded-2xl bg-white border border-[#E8DCC4] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          
          {isSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-display-wedding text-2xl sm:text-3xl text-stone-900">
                Xác Nhận Thành Công!
              </h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                {t.rsvpSuccess}
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({
                      guestName: '',
                      phoneNumber: '',
                      attendingEvent: 'wedding_18',
                      guestCount: 1,
                      guestSide: 'groom',
                      note: ''
                    });
                  }}
                  className="px-5 py-2 rounded-xl border border-[#E8DCC4] hover:bg-[#FDFBF7] text-stone-700 text-xs font-medium transition-colors"
                >
                  Gửi thêm phản hồi khác
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider">
                    {t.guestNameLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCC4] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 focus:border-[#8B1E2D] text-sm text-stone-900 bg-[#FDFBF7]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider">
                    {t.phoneLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="Ví dụ: 0912 345 678"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCC4] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 focus:border-[#8B1E2D] text-sm text-stone-900 bg-[#FDFBF7]"
                  />
                </div>
              </div>

              {/* Attending Event Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider">
                  {t.attendingEventLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'wedding_18', label: t.wedding18Option },
                    { id: 'dinner_17', label: t.dinner17Option },
                    { id: 'both', label: t.bothOption },
                    { id: 'declined', label: t.declinedOption },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        formData.attendingEvent === option.id
                          ? 'border-[#8B1E2D] bg-[#8B1E2D]/5 font-medium text-[#8B1E2D]'
                          : 'border-[#E8DCC4] hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendingEvent"
                        value={option.id}
                        checked={formData.attendingEvent === option.id}
                        onChange={(e) => setFormData({ ...formData, attendingEvent: e.target.value })}
                        className="accent-[#8B1E2D]"
                      />
                      <span className="text-xs sm:text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Guest Count & Guest Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider">
                    {t.guestCountLabel}
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCC4] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 focus:border-[#8B1E2D] text-sm text-stone-900 bg-[#FDFBF7]"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} người
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider">
                    {t.guestSideLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, guestSide: 'groom' })}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all ${
                        formData.guestSide === 'groom'
                          ? 'border-[#8B1E2D] bg-[#8B1E2D] text-white shadow-sm'
                          : 'border-[#E8DCC4] bg-[#FDFBF7] text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {t.ofGroom}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, guestSide: 'bride' })}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all ${
                        formData.guestSide === 'bride'
                          ? 'border-[#8B1E2D] bg-[#8B1E2D] text-white shadow-sm'
                          : 'border-[#E8DCC4] bg-[#FDFBF7] text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {t.ofBride}
                    </button>
                  </div>
                </div>
              </div>

              {/* Note / Dietary */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider">
                  {t.noteLabel}
                </label>
                <textarea
                  rows={2}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Ví dụ: Ngồi cùng bàn bạn đại học, hoặc ăn chay..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCC4] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 focus:border-[#8B1E2D] text-sm text-stone-900 bg-[#FDFBF7]"
                />
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#8B1E2D] hover:bg-[#721522] text-white text-sm font-semibold tracking-wide uppercase transition-all shadow-md shadow-[#8B1E2D]/20 active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t.submitting}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t.submitRsvp}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
