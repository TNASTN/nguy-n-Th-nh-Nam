/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EnvelopeModal } from './components/EnvelopeModal';
import { TopBar } from './components/TopBar';
import { AudioPlayer } from './components/AudioPlayer';
import { HeroCountdown } from './components/HeroCountdown';
import { CoupleSection } from './components/CoupleSection';
import { EventItinerary } from './components/EventItinerary';
import { GalleryLightbox } from './components/GalleryLightbox';
import { RsvpSection } from './components/RsvpSection';
import { GuestbookSection } from './components/GuestbookSection';
import { SocialShare } from './components/SocialShare';
import { GiftBoxModal } from './components/GiftBoxModal';
import { AdminModal } from './components/AdminModal';
import { FloatingMobileNav } from './components/FloatingMobileNav';
import { OfflineIndicator } from './components/OfflineIndicator';
import { Footer } from './components/Footer';

export default function App() {
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [isGiftBoxOpen, setIsGiftBoxOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [audioAutoPlayTrigger, setAudioAutoPlayTrigger] = useState(false);

  const handleOpenEnvelope = () => {
    setHasOpenedEnvelope(true);
    setAudioAutoPlayTrigger(true);

    // Multi-angle grand confetti explosion celebrating the start of the wedding invitation
    try {
      const count = 220;
      const defaults = {
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#8B1E2D', '#FFD700', '#F4E0A5', '#E53E3E', '#FFFFFF'],
        disableForReducedMotion: true,
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      // Primary grand multi-burst explosion
      fire(0.25, {
        spread: 30,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.9,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 30,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });

      // Festive dual side cannons after 300ms
      setTimeout(() => {
        confetti({
          particleCount: 55,
          angle: 60,
          spread: 65,
          origin: { x: 0, y: 0.6 },
          colors: ['#D4AF37', '#8B1E2D', '#F4E0A5', '#FFD700', '#FFFFFF']
        });
        confetti({
          particleCount: 55,
          angle: 120,
          spread: 65,
          origin: { x: 1, y: 0.6 },
          colors: ['#D4AF37', '#8B1E2D', '#F4E0A5', '#FFD700', '#FFFFFF']
        });
      }, 300);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'vi' ? 'en' : 'vi'));
  };

  // Keyboard navigation (Arrow keys / Page Up / Page Down) & Smooth Scroll-Triggered Reveal
  useEffect(() => {
    // 1. Intersection Observer for gradual scroll reveal of all sections
    const sections = document.querySelectorAll('main > section');
    sections.forEach((sec) => sec.classList.add('section-reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08,
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    // 2. Keyboard Arrow / Page scroll between sections
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not intercept if user is typing in form inputs, textareas, or select
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        const sectionList = Array.from(document.querySelectorAll('main > section')) as HTMLElement[];
        if (sectionList.length === 0) return;

        const scrollY = window.scrollY;
        const currentIdx = sectionList.findIndex((sec) => {
          const rect = sec.getBoundingClientRect();
          return rect.top >= -50 && rect.top <= window.innerHeight * 0.45;
        });

        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
          e.preventDefault();
          const nextIdx = currentIdx >= 0 && currentIdx < sectionList.length - 1 ? currentIdx + 1 : 0;
          sectionList[nextIdx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          e.preventDefault();
          const prevIdx = currentIdx > 0 ? currentIdx - 1 : 0;
          sectionList[prevIdx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToAdjacentSection = (direction: 'prev' | 'next') => {
    const sectionList = Array.from(document.querySelectorAll('main > section')) as HTMLElement[];
    if (sectionList.length === 0) return;

    const currentIdx = sectionList.findIndex((sec) => {
      const rect = sec.getBoundingClientRect();
      return rect.top >= -80 && rect.top <= window.innerHeight * 0.5;
    });

    if (direction === 'next') {
      const nextIdx = currentIdx >= 0 && currentIdx < sectionList.length - 1 ? currentIdx + 1 : 0;
      sectionList[nextIdx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const prevIdx = currentIdx > 0 ? currentIdx - 1 : 0;
      sectionList[prevIdx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2420] flex flex-col font-sans pb-16 md:pb-0">
      
      {/* 1. Initial Ceremonial Wax Seal Envelope Modal */}
      {!hasOpenedEnvelope && (
        <EnvelopeModal
          onOpen={handleOpenEnvelope}
          lang={lang}
        />
      )}

      {/* 2. Audio Background Music Player */}
      <AudioPlayer autoPlayTrigger={audioAutoPlayTrigger} />

      {/* 3. Sticky Top Navigation Bar */}
      <TopBar
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenGiftBox={() => setIsGiftBoxOpen(true)}
      />

      {/* 4. Main Body Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Live Countdown & Master Photo */}
        <HeroCountdown lang={lang} />

        {/* Bride & Groom Introduction with Family Lineage */}
        <CoupleSection lang={lang} />

        {/* Schedule, Events & Google Maps Navigation */}
        <EventItinerary lang={lang} />

        {/* High-Resolution Photo Gallery & Lightbox */}
        <GalleryLightbox lang={lang} />

        {/* Online RSVP Confirmation Form */}
        <RsvpSection lang={lang} />

        {/* Real-time Guestbook & Wishes Stream (Single Frame with 3-wishes carousel view) */}
        <GuestbookSection lang={lang} />

        {/* Social Quick Share: Discreet minimalist bar with 1 single image at the bottom */}
        <SocialShare lang={lang} />
      </main>

      {/* 5. Footer */}
      <Footer lang={lang} />

      {/* Desktop Floating Arrow Nav Widget (Glide between sections) */}
      <div className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col gap-1.5 p-1 rounded-2xl bg-white/85 backdrop-blur-md border border-[#E8DCC4] shadow-md">
        <button
          onClick={() => scrollToAdjacentSection('prev')}
          className="p-2 rounded-xl text-stone-600 hover:text-[#8B1E2D] hover:bg-[#FDFBF7] transition-all cursor-pointer active:scale-90"
          title="Lướt lên phần trước (hoặc bấm phím ↑)"
          aria-label="Phần trước"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <div className="w-full h-px bg-[#E8DCC4]/60" />
        <button
          onClick={() => scrollToAdjacentSection('next')}
          className="p-2 rounded-xl text-stone-600 hover:text-[#8B1E2D] hover:bg-[#FDFBF7] transition-all cursor-pointer active:scale-90"
          title="Lướt xuống phần kế tiếp (hoặc bấm phím ↓)"
          aria-label="Phần kế tiếp"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* 6. Modals & Overlays */}
      <GiftBoxModal
        isOpen={isGiftBoxOpen}
        onClose={() => setIsGiftBoxOpen(false)}
        lang={lang}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        lang={lang}
      />

      {/* 7. Mobile Ergonomic Thumb Navigation Bar (< 15% viewport) */}
      <FloatingMobileNav
        lang={lang}
        onOpenGiftBox={() => setIsGiftBoxOpen(true)}
      />

      {/* 8. PWA & Offline Indicator */}
      <OfflineIndicator lang={lang} />

    </div>
  );
}
