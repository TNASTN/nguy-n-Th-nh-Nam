import React from 'react';
import { Heart, Users } from 'lucide-react';
import { WEDDING_DATA, TRANSLATIONS } from '../data/weddingData';

interface CoupleSectionProps {
  lang: 'vi' | 'en';
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="couple" className="py-20 bg-white border-y border-[#E8DCC4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8B1E2D]">
            {t.weddingOf}
          </span>
          <h2 className="font-display-wedding text-3xl sm:text-4xl text-stone-900">
            Cô Dâu &amp; Chú Rể
          </h2>
          <p className="font-serif-wedding italic text-stone-600 text-base sm:text-lg">
            "Hai nửa mảnh ghép tình cờ tìm thấy nhau, cùng nhau dệt nên câu chuyện trăm năm viên mãn."
          </p>
        </div>

        {/* 2-Column Couple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-stretch max-w-5xl mx-auto">
          
          {/* Groom Card */}
          <div className="flex flex-col rounded-2xl bg-[#FDFBF7] border border-[#E8DCC4] p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            {/* Groom Photo with delicate oval/rounded frame */}
            <div className="w-48 h-64 sm:w-56 sm:h-72 mx-auto rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-md mb-6 relative group">
              <img
                src="/assets/aistudio/ae99462b-8da5-427f-869b-9800219d04ea_30adaafe.jpg"
                alt="Chú rể Nguyễn Thành Nam"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40" />
            </div>

            <div className="space-y-1 mb-4">
              <h3 className="font-display-wedding text-2xl sm:text-3xl text-stone-900 font-medium">
                {WEDDING_DATA.groom.fullName}
              </h3>
            </div>

            {/* Parents Info */}
            <div className="mt-auto pt-4 border-t border-[#E8DCC4] text-xs sm:text-sm text-stone-600 space-y-1">
              <p className="font-medium text-stone-800">
                Thân phụ: <span className="font-normal">{WEDDING_DATA.groom.parentsVi.father}</span>
              </p>
              <p className="font-medium text-stone-800">
                Thân mẫu: <span className="font-normal">{WEDDING_DATA.groom.parentsVi.mother}</span>
              </p>
              <p className="text-stone-500 text-xs mt-1">
                {WEDDING_DATA.groom.parentsVi.address}
              </p>
            </div>
          </div>

          {/* Bride Card */}
          <div className="flex flex-col rounded-2xl bg-[#FDFBF7] border border-[#E8DCC4] p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            {/* Bride Photo */}
            <div className="w-48 h-64 sm:w-56 sm:h-72 mx-auto rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-md mb-6 relative group">
              <img
                src="/assets/wedding/QYN_8732.jpg"
                alt="Cô dâu Lê Huỳnh Tú Uyên"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40" />
            </div>

            <div className="space-y-1 mb-4">
              <h3 className="font-display-wedding text-2xl sm:text-3xl text-stone-900 font-medium">
                {WEDDING_DATA.bride.fullName}
              </h3>
            </div>

            {/* Parents Info */}
            <div className="mt-auto pt-4 border-t border-[#E8DCC4] text-xs sm:text-sm text-stone-600 space-y-1">
              <p className="font-medium text-stone-800">
                Thân phụ: <span className="font-normal">{WEDDING_DATA.bride.parentsVi.father}</span>
              </p>
              <p className="font-medium text-stone-800">
                Thân mẫu: <span className="font-normal">{WEDDING_DATA.bride.parentsVi.mother}</span>
              </p>
              <p className="text-stone-500 text-xs mt-1">
                {WEDDING_DATA.bride.parentsVi.address}
              </p>
            </div>
          </div>

        </div>

        {/* Traditional Blessing Box */}
        <div className="mt-14 max-w-3xl mx-auto rounded-2xl bg-[#F8F5EE] border border-[#D4AF37]/40 p-6 sm:p-8 text-center space-y-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#8B1E2D] text-[#D4AF37] mb-1">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <h4 className="font-display-wedding text-xl text-stone-900">
            Lời Ngỏ Từ Hai Gia Đình
          </h4>
          <p className="text-stone-700 text-sm leading-relaxed max-w-2xl mx-auto">
            Hôn nhân là sự hòa hợp thiêng liêng giữa hai tâm hồn và gắn kết giữa hai bên gia đình. 
            Sự hiện diện, lời chúc phúc và tình cảm yêu thương của quý vị chính là niềm vinh hạnh, 
            món quà quý giá nhất trong ngày khởi đầu hạnh phúc lứa đôi của các con chúng tôi.
          </p>
        </div>

      </div>
    </section>
  );
};
