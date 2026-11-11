import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { MessageSquare, Heart, Send, Sparkles, Pin, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  db, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  updateDoc, 
  increment,
  handleFirestoreError,
  OperationType
} from '../lib/firebase';
import { TRANSLATIONS } from '../data/weddingData';

interface GuestbookSectionProps {
  lang: 'vi' | 'en';
}

interface WishItem {
  id: string;
  senderName: string;
  relationship: 'friend' | 'colleague' | 'family' | 'other';
  message: string;
  avatarEmoji: string;
  likesCount: number;
  isPinned: boolean;
  createdAt: string;
}

const DEFAULT_EMOJIS = ['🌹', '🥂', '❤️', '💍', '✨', '🕊️', '💐', '🎉'];

// No dummy seed wishes; only real wishes sent by guests will be displayed
const INITIAL_WISHES: WishItem[] = [];

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [wishes, setWishes] = useState<WishItem[]>(INITIAL_WISHES);
  const [senderName, setSenderName] = useState('');
  const [relationship, setRelationship] = useState<'friend' | 'colleague' | 'family' | 'other'>('friend');
  const [message, setMessage] = useState('');
  const [avatarEmoji, setAvatarEmoji] = useState('❤️');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  // Carousel ref and dragging state for 3-wish view
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Real-time listener on Firebase Firestore
  useEffect(() => {
    let unsubscribe: () => void = () => {};

    try {
      const q = query(collection(db, 'wedding_wishes'), orderBy('createdAt', 'desc'));
      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const list: WishItem[] = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              list.push({
                id: docSnap.id,
                senderName: data.senderName || 'Khách quý',
                relationship: data.relationship || 'friend',
                message: data.message || '',
                avatarEmoji: data.avatarEmoji || '❤️',
                likesCount: typeof data.likesCount === 'number' ? data.likesCount : 0,
                isPinned: Boolean(data.isPinned),
                createdAt: data.createdAt || new Date().toISOString()
              });
            });
            // Sort: pinned first, then newest
            list.sort((a, b) => {
              if (a.isPinned && !b.isPinned) return -1;
              if (!a.isPinned && b.isPinned) return 1;
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
            setWishes(list);
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, 'wedding_wishes');
        }
      );
    } catch (err) {
      console.warn('Real-time listener notice:', err);
    }

    return () => unsubscribe();
  }, []);

  const handlePostWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    setIsSubmitting(true);
    const newWish = {
      senderName: senderName.trim().slice(0, 100),
      relationship,
      message: message.trim().slice(0, 1000),
      avatarEmoji,
      likesCount: 0,
      isPinned: false,
      createdAt: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, 'wedding_wishes'), newWish);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#D4AF37', '#8B1E2D', '#F4E0A5']
        });
      } catch {
        // ignore
      }

      setSenderName('');
      setMessage('');
      // Scroll to the beginning of the carousel so user sees their new wish
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'wedding_wishes');
      // Local fallback
      const localItem: WishItem = { ...newWish, id: 'local-' + Date.now() };
      setWishes((prev) => [localItem, ...prev]);
      setSenderName('');
      setMessage('');
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (wishId: string) => {
    if (likedMap[wishId]) return;

    setLikedMap((prev) => ({ ...prev, [wishId]: true }));
    setWishes((prev) =>
      prev.map((w) => (w.id === wishId ? { ...w, likesCount: w.likesCount + 1 } : w))
    );

    if (!wishId.startsWith('seed-') && !wishId.startsWith('local-')) {
      try {
        await updateDoc(doc(db, 'wedding_wishes', wishId), {
          likesCount: increment(1)
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `wedding_wishes/${wishId}`);
      }
    }
  };

  // Drag and smooth scroll helpers for 3-wishes carousel
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth / 3;
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section id="guestbook" className="py-20 bg-white border-y border-[#E8DCC4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8B1E2D]">
            {t.guestbookHeading}
          </span>
          <h2 className="font-display-wedding text-3xl sm:text-4xl text-stone-900">
            Sổ Lưu Bút Chúc Phúc Trực Tuyến
          </h2>
          <p className="font-serif-wedding italic text-stone-600 text-base sm:text-lg">
            {t.guestbookSubtitle}
          </p>
        </div>

        {/* 1. Form To Send A Wish */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="rounded-2xl bg-[#FDFBF7] border border-[#E8DCC4] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#8B1E2D]">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-display-wedding text-xl text-stone-900">
                {t.sendWish}
              </h3>
            </div>

            <form onSubmit={handlePostWish} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sender Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Họ tên hoặc xưng hô
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder={t.senderNamePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCC4] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 focus:border-[#8B1E2D]"
                  />
                </div>

                {/* Relationship */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    {t.relationshipLabel}
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCC4] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 focus:border-[#8B1E2D]"
                  >
                    <option value="friend">{t.relFriend}</option>
                    <option value="colleague">{t.relColleague}</option>
                    <option value="family">{t.relFamily}</option>
                    <option value="other">{t.relOther}</option>
                  </select>
                </div>
              </div>

              {/* Emoji Selector */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Biểu tượng cảm xúc
                </label>
                <div className="flex flex-wrap gap-2">
                  {DEFAULT_EMOJIS.map((em) => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => setAvatarEmoji(em)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform cursor-pointer ${
                        avatarEmoji === em
                          ? 'bg-[#8B1E2D] text-white scale-110 shadow-xs'
                          : 'bg-white border border-[#E8DCC4] hover:bg-stone-50'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Lời chúc phúc
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCC4] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 focus:border-[#8B1E2D]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-[#8B1E2D] hover:bg-[#721522] text-white text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all shadow-md shadow-[#8B1E2D]/20 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>{t.postingWish}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.postWishBtn}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* 2. Unified Wishes Container: Displays 3 wishes at a time with smooth drag/scroll */}
        <div className="rounded-2xl bg-[#FDFBF7] border border-[#E8DCC4] p-6 sm:p-8 shadow-sm">
          {/* Top Bar with Navigation Controls & Stats */}
          <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-[#E8DCC4]">
            <div className="flex items-center gap-2">
              <span className="font-display-wedding text-lg sm:text-xl text-stone-900 font-semibold">
                Sổ Lời Chúc Cặp Đôi
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#8B1E2D]/10 text-[#8B1E2D] font-medium">
                {wishes.length} lời chúc
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-stone-500 mr-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Kéo hoặc bấm mũi tên để xem
              </span>
              {/* Prev Button */}
              <button
                onClick={() => handleScroll('left')}
                className="w-8 h-8 rounded-lg bg-white border border-[#E8DCC4] hover:bg-[#F4EFE6] text-stone-700 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                title="Xem lời chúc trước"
                aria-label="Xem lời chúc trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {/* Next Button */}
              <button
                onClick={() => handleScroll('right')}
                className="w-8 h-8 rounded-lg bg-white border border-[#E8DCC4] hover:bg-[#F4EFE6] text-stone-700 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                title="Xem lời chúc kế tiếp"
                aria-label="Xem lời chúc kế tiếp"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {wishes.length === 0 ? (
            <div className="text-center py-10 px-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#8B1E2D]/10 text-[#8B1E2D] flex items-center justify-center mx-auto text-xl">
                💌
              </div>
              <p className="font-display-wedding text-base text-stone-800">
                {lang === 'vi' ? 'Chưa có lời chúc nào' : 'No wishes yet'}
              </p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                {lang === 'vi'
                  ? 'Hãy là người đầu tiên gửi những lời chúc tốt đẹp nhất đến Thành Nam & Tú Uyên bằng biểu mẫu phía trên!'
                  : 'Be the first to send warm blessings to Thanh Nam & Tu Uyen using the form above!'}
              </p>
            </div>
          ) : (
            <>
              {/* Carousel Frame: Exactly 3 cards visible simultaneously on md/lg, draggable/swipeable */}
              <div
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className={`flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory no-scrollbar ${
                  isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
                }`}
                style={{ scrollbarWidth: 'none' }}
              >
                {wishes.map((item) => (
                  <div
                    key={item.id}
                    className={`w-[85vw] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] shrink-0 snap-start flex flex-col justify-between p-5 rounded-xl border transition-all ${
                      item.isPinned
                        ? 'bg-gradient-to-br from-[#FFFDF9] to-[#FDF8EE] border-[#D4AF37] ring-1 ring-[#D4AF37]/30 shadow-xs'
                        : 'bg-white border-[#E8DCC4] hover:border-[#D4AF37]/60 shadow-2xs'
                    }`}
                  >
                    <div>
                      {/* Card Header: Avatar & Sender */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-9 h-9 rounded-full bg-[#FDFBF7] border border-[#E8DCC4] flex items-center justify-center text-lg shrink-0 shadow-2xs">
                            {item.avatarEmoji}
                          </span>
                          <div className="min-w-0">
                            <h4 className="font-semibold text-stone-900 text-sm truncate">
                              {item.senderName}
                            </h4>
                            <span className="text-[10px] text-stone-500 capitalize">
                              {item.relationship === 'family' ? 'Họ hàng' : item.relationship === 'colleague' ? 'Đồng nghiệp' : 'Bạn bè'}
                            </span>
                          </div>
                        </div>

                        {item.isPinned && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#8B1E2D] text-[9px] font-semibold uppercase tracking-wider shrink-0">
                            <Pin className="w-2.5 h-2.5 text-[#D4AF37] fill-current" />
                            Ghim
                          </span>
                        )}
                      </div>

                      {/* Card Message */}
                      <p className="text-stone-700 text-xs sm:text-sm leading-relaxed my-2 whitespace-pre-wrap line-clamp-4">
                        {item.message}
                      </p>
                    </div>

                    {/* Card Footer: Date & Heart Like */}
                    <div className="flex items-center justify-between text-[11px] text-stone-400 pt-3 mt-2 border-t border-[#E8DCC4]/60">
                      <span>
                        {new Date(item.createdAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </span>

                      <button
                        onClick={() => handleLike(item.id)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full transition-colors cursor-pointer active:scale-90 ${
                          likedMap[item.id]
                            ? 'bg-rose-50 text-rose-600 font-medium'
                            : 'hover:bg-stone-100 text-stone-500'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${likedMap[item.id] ? 'fill-rose-600 text-rose-600' : ''}`} />
                        <span className="tabular-nums">{item.likesCount}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Hint */}
              <div className="text-center pt-2 text-[11px] text-stone-400">
                <span>✨ Có thể lướt kéo ngang để xem đồng thời 3 lời chúc</span>
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  );
};
