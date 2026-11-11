import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Navigation, ExternalLink, Check, Copy } from 'lucide-react';
import { WEDDING_DATA, TRANSLATIONS } from '../data/weddingData';

interface EventItineraryProps {
  lang: 'vi' | 'en';
}

export const EventItinerary: React.FC<EventItineraryProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyAddress = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const createGoogleCalendarUrl = (
    title: string,
    details: string,
    location: string,
    startDateStr: string,
    endDateStr: string
  ) => {
    const start = startDateStr.replace(/[-:]/g, '').replace('.000', '');
    const end = endDateStr.replace(/[-:]/g, '').replace('.000', '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  };

  return (
    <section id="events" className="py-20 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8B1E2D]">
            {t.eventsHeading}
          </span>
          <h2 className="font-display-wedding text-3xl sm:text-4xl text-stone-900">
            Thời Gian &amp; Địa Điểm Tổ Chức
          </h2>
          <p className="font-serif-wedding italic text-stone-600 text-base sm:text-lg">
            Kính mời quý quan khách sắp xếp thời gian đến chung vui cùng gia đình chúng tôi.
          </p>
        </div>

        {/* 2 Event Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {WEDDING_DATA.events.map((evt, idx) => {
            const isMainEvent = evt.id === 'solemn-ceremony';
            return (
              <div
                key={evt.id}
                className={`flex flex-col rounded-2xl bg-white border p-6 sm:p-8 shadow-sm transition-all hover:shadow-md ${
                  isMainEvent ? 'border-[#8B1E2D]/50 ring-1 ring-[#8B1E2D]/20' : 'border-[#E8DCC4]'
                }`}
              >
                {/* Event Badge */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                    isMainEvent ? 'bg-[#8B1E2D] text-white' : 'bg-[#E8DCC4] text-stone-800'
                  }`}>
                    {isMainEvent ? 'Sự Kiện Chính' : 'Tiệc Thân Mật'}
                  </span>
                  <span className="text-xs text-stone-500 italic">
                    {evt.lunarDateVi}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display-wedding text-2xl sm:text-3xl text-stone-900 mb-2">
                  {evt.titleVi}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mb-6 italic">
                  {evt.subtitleVi}
                </p>

                {/* Time & Date Block */}
                <div className="p-4 rounded-xl bg-[#FDFBF7] border border-[#E8DCC4] space-y-2.5 mb-6">
                  <div className="flex items-center gap-2.5 text-stone-800 text-sm font-semibold">
                    <Calendar className="w-4 h-4 text-[#8B1E2D] shrink-0" />
                    <span>{evt.dateVi}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-stone-800 text-sm font-medium">
                    <Clock className="w-4 h-4 text-[#8B1E2D] shrink-0" />
                    <span>{evt.timeVi}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-stone-700 text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 text-[#8B1E2D] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-stone-900">{evt.locationNameVi}</p>
                      <p className="text-stone-600">{evt.addressVi}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline breakdown */}
                <div className="mb-6 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Lịch trình chi tiết:
                  </p>
                  <div className="space-y-2 border-l-2 border-[#D4AF37]/50 pl-3">
                    {evt.timeline.map((step, sIdx) => (
                      <div key={sIdx} className="text-xs sm:text-sm flex items-baseline gap-2">
                        <span className="font-semibold text-[#8B1E2D] tabular-nums whitespace-nowrap">
                          {step.time}:
                        </span>
                        <span className="text-stone-700">
                          {step.activityVi}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto pt-4 border-t border-[#E8DCC4] flex flex-wrap items-center gap-2.5">
                  <a
                    href={evt.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8B1E2D] hover:bg-[#721522] text-white text-xs font-medium transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{t.openGoogleMaps}</span>
                  </a>

                  <button
                    onClick={() => handleCopyAddress(evt.id, evt.addressVi)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E8DCC4] hover:bg-stone-50 text-stone-700 text-xs font-medium transition-colors"
                  >
                    {copiedId === evt.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Đã sao chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-500" />
                        <span>Sao chép ĐC</span>
                      </>
                    )}
                  </button>

                  <a
                    href={createGoogleCalendarUrl(
                      `Đám Cưới Thành Nam & Tú Uyên - ${evt.titleVi}`,
                      `${evt.subtitleVi}. Địa chỉ: ${evt.addressVi}`,
                      evt.addressVi,
                      idx === 0 ? '20261117T170000' : '20261118T090000',
                      idx === 0 ? '20261117T210000' : '20261118T140000'
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#D4AF37] hover:bg-[#FDFBF7] text-stone-800 text-xs font-medium transition-colors ml-auto"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{t.addToCalendar}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Google Maps Location Container */}
        <div id="location" className="rounded-2xl bg-white border border-[#E8DCC4] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B1E2D]">
                <MapPin className="w-4 h-4 text-[#8B1E2D]" />
                <span>Bản Đồ Chỉ Đường Chi Tiết</span>
              </div>
              <h3 className="font-display-wedding text-2xl text-stone-900 mt-1">
                Tư Gia Nhà Trai — 78 Thôn Tiến Đông, Ea Knốp, Đắk Lắk
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                78 Thôn Tiến Đông, Ea Knốp, Đắk Lắk, Vietnam
              </p>
            </div>

            <a
              href="https://maps.google.com/?q=78+Th%C3%B4n+Ti%E1%BA%BFn+%C4%90%C3%B4ng,+Ea+Kn%E1%BB%91p,+%C4%90%E1%BA%AFk+L%E1%BA%AFk,+Vietnam"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B1E2D] hover:bg-[#721522] text-white text-xs sm:text-sm font-semibold shadow transition-all whitespace-nowrap"
            >
              <Navigation className="w-4 h-4" />
              <span>Chỉ Đường Bằng Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

          {/* Interactive Google Maps Embed */}
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full rounded-xl overflow-hidden border border-[#E8DCC4] relative shadow-inner bg-stone-100">
            <iframe
              title="Bản đồ vị trí đám cưới tại 78 Thôn Tiến Đông, Ea Knốp, Đắk Lắk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=78+Th%C3%B4n+Ti%E1%BA%BFn+%C4%90%C3%B4ng,+Ea+Kn%E1%BB%91p,+%C4%90%E1%BA%AFk+L%E1%BA%AFk,+Vietnam&t=&z=16&ie=UTF8&iwloc=&output=embed"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-stone-500 gap-2">
            <span>💡 Mẹo: Quý khách đi theo Quốc Lộ 26 đến thị trấn Ea Knốp, rẽ vào 78 Thôn Tiến Đông.</span>
            <span className="font-medium text-stone-700">Hotline đón tiếp: 098.765.4321</span>
          </div>
        </div>

      </div>
    </section>
  );
};
