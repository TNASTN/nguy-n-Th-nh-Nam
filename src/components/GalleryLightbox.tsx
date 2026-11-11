import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { WEDDING_DATA, GalleryImage, TRANSLATIONS } from '../data/weddingData';

interface GalleryLightboxProps {
  lang: 'vi' | 'en';
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'western' | 'traditional'>('all');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const filteredImages = WEDDING_DATA.gallery.filter((img) => {
    if (selectedFilter === 'all') return true;
    return img.category === selectedFilter;
  });

  const activeImage = activeImageIndex !== null ? filteredImages[activeImageIndex] : null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, filteredImages.length]);

  const handleNext = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section id="gallery" className="py-20 bg-white border-y border-[#E8DCC4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8B1E2D]">
            {t.galleryHeading}
          </span>
          <h2 className="font-display-wedding text-3xl sm:text-4xl text-stone-900">
            Album Ảnh Cưới Sắc Nét
          </h2>
          <p className="font-serif-wedding italic text-stone-600 text-base sm:text-lg">
            {t.gallerySubtitle}
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: t.allPhotos },
            { id: 'western', label: t.westernPhotos },
            { id: 'traditional', label: t.traditionalPhotos }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedFilter(tab.id as any);
                setActiveImageIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                selectedFilter === tab.id
                  ? 'bg-[#8B1E2D] text-white shadow-sm'
                  : 'bg-[#FDFBF7] text-stone-600 border border-[#E8DCC4] hover:bg-[#F4EFE6]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, idx) => (
            <div
              key={image.id}
              onClick={() => setActiveImageIndex(idx)}
              className="group relative rounded-2xl overflow-hidden bg-stone-100 border border-[#E8DCC4] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[3/4]"
            >
              <img
                src={image.url}
                alt={image.titleVi}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />

              {/* Hover overlay with title & icon */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display-wedding text-lg font-medium text-[#F4E0A5]">
                      {image.titleVi}
                    </p>
                    <p className="text-xs text-white/80 line-clamp-2 mt-1 font-light">
                      {image.captionVi}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Top Bar with Title & Close button */}
          <div 
            className="w-full max-w-5xl flex items-center justify-between text-white py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="font-display-wedding text-lg sm:text-xl text-[#F4E0A5]">
                {activeImage.titleVi}
              </h3>
              <p className="text-xs text-stone-300">
                {activeImageIndex! + 1} / {filteredImages.length}
              </p>
            </div>

            <button
              onClick={() => setActiveImageIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Đóng ảnh"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Central Image Container */}
          <div 
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.url}
              alt={activeImage.titleVi}
              className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
            />

            {/* Left / Right Nav Buttons */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-transform active:scale-90"
                  aria-label="Ảnh trước"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-transform active:scale-90"
                  aria-label="Ảnh kế tiếp"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Caption */}
          <div 
            className="w-full max-w-2xl text-center text-stone-300 text-xs sm:text-sm py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <p>{activeImage.captionVi}</p>
          </div>
        </div>
      )}
    </section>
  );
};
