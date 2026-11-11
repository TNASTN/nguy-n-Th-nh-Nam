import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Download, 
  Search, 
  Trash2, 
  Pin, 
  Users, 
  MessageSquare, 
  CheckCircle, 
  Calendar,
  Filter
} from 'lucide-react';
import { 
  db, 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  deleteDoc, 
  updateDoc,
  handleFirestoreError,
  OperationType
} from '../lib/firebase';
import { TRANSLATIONS } from '../data/weddingData';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'vi' | 'en';
}

interface RsvpItem {
  id: string;
  guestName: string;
  phoneNumber: string;
  attendingEvent: string;
  guestCount: number;
  guestSide: string;
  note?: string;
  createdAt: string;
}

interface WishItem {
  id: string;
  senderName: string;
  relationship: string;
  message: string;
  isPinned: boolean;
  createdAt: string;
}

const ADMIN_PIN = '998832';

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, lang }) => {
  const t = TRANSLATIONS[lang];
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'rsvps' | 'wishes'>('rsvps');
  const [rsvps, setRsvps] = useState<RsvpItem[]>([]);
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSide, setFilterSide] = useState<'all' | 'groom' | 'bride'>('all');

  // Load RSVPs and Wishes from Firestore
  useEffect(() => {
    if (!isAuthenticated) return;

    // 1. RSVPs Listener
    let unsubRsvp = () => {};
    try {
      const qRsvp = query(collection(db, 'wedding_rsvps'), orderBy('createdAt', 'desc'));
      unsubRsvp = onSnapshot(
        qRsvp,
        (snapshot) => {
          const list: RsvpItem[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            list.push({
              id: docSnap.id,
              guestName: data.guestName || 'Khách',
              phoneNumber: data.phoneNumber || '',
              attendingEvent: data.attendingEvent || 'wedding_18',
              guestCount: Number(data.guestCount) || 1,
              guestSide: data.guestSide || 'groom',
              note: data.note || '',
              createdAt: data.createdAt || ''
            });
          });
          setRsvps(list);
        },
        (error) => handleFirestoreError(error, OperationType.GET, 'wedding_rsvps')
      );
    } catch (e) {
      console.warn('Admin RSVP fetch warning:', e);
    }

    // 2. Wishes Listener
    let unsubWishes = () => {};
    try {
      const qWishes = query(collection(db, 'wedding_wishes'), orderBy('createdAt', 'desc'));
      unsubWishes = onSnapshot(
        qWishes,
        (snapshot) => {
          const list: WishItem[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            list.push({
              id: docSnap.id,
              senderName: data.senderName || '',
              relationship: data.relationship || '',
              message: data.message || '',
              isPinned: Boolean(data.isPinned),
              createdAt: data.createdAt || ''
            });
          });
          setWishes(list);
        },
        (error) => handleFirestoreError(error, OperationType.GET, 'wedding_wishes')
      );
    } catch (e) {
      console.warn('Admin wishes fetch warning:', e);
    }

    return () => {
      unsubRsvp();
      unsubWishes();
    };
  }, [isAuthenticated]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleDeleteRsvp = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa phản hồi này?')) return;
    try {
      await deleteDoc(doc(db, 'wedding_rsvps', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `wedding_rsvps/${id}`);
    }
  };

  const handleTogglePinWish = async (id: string, currentPin: boolean) => {
    try {
      await updateDoc(doc(db, 'wedding_wishes', id), {
        isPinned: !currentPin
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `wedding_wishes/${id}`);
    }
  };

  const handleDeleteWish = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa lời chúc này?')) return;
    try {
      await deleteDoc(doc(db, 'wedding_wishes', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `wedding_wishes/${id}`);
    }
  };

  // CSV Export
  const handleExportCsv = () => {
    const headers = ['STT', 'Họ Và Tên', 'Số Điện Thoại', 'Sự Kiện Tham Dự', 'Số Lượng', 'Khách Của', 'Ghi Chú', 'Thời Gian Gửi'];
    const rows = filteredRsvps.map((r, i) => [
      i + 1,
      `"${r.guestName.replace(/"/g, '""')}"`,
      `"${r.phoneNumber}"`,
      r.attendingEvent === 'wedding_18' ? 'Tiệc Cưới Chính (18/11)' : r.attendingEvent === 'dinner_17' ? 'Cơm Thân Mật (17/11)' : r.attendingEvent === 'both' ? 'Cả Hai Buổi' : 'Không Tham Dự',
      r.guestCount,
      r.guestSide === 'groom' ? 'Nhà Trai' : 'Nhà Gái',
      `"${(r.note || '').replace(/"/g, '""')}"`,
      new Date(r.createdAt).toLocaleString('vi-VN')
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `danh_sach_khach_moi_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered RSVPs
  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch = r.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.phoneNumber.includes(searchTerm);
    const matchesSide = filterSide === 'all' || r.guestSide === filterSide;
    return matchesSearch && matchesSide;
  });

  // Analytics Metrics
  const totalAttendingGuests = rsvps
    .filter(r => r.attendingEvent !== 'declined')
    .reduce((sum, r) => sum + r.guestCount, 0);

  const totalDinnerGuests = rsvps
    .filter(r => r.attendingEvent === 'dinner_17' || r.attendingEvent === 'both')
    .reduce((sum, r) => sum + r.guestCount, 0);

  const totalWeddingGuests = rsvps
    .filter(r => r.attendingEvent === 'wedding_18' || r.attendingEvent === 'both')
    .reduce((sum, r) => sum + r.guestCount, 0);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-white border border-[#E8DCC4] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DCC4] bg-[#FDFBF7]">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#8B1E2D]" />
            <h3 className="font-display-wedding text-xl text-stone-900 font-semibold">
              {t.adminTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-sm mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#8B1E2D]/10 text-[#8B1E2D] flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="font-display-wedding text-2xl text-stone-900">
              Đăng Nhập Quản Trị
            </h4>
            <p className="text-xs text-stone-500">
              {t.adminPinPrompt}
            </p>

            <form onSubmit={handleLogin} className="space-y-3 pt-2">
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Nhập mã PIN..."
                className="w-full text-center tracking-widest text-lg font-mono py-2.5 px-4 rounded-xl border border-[#E8DCC4] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 focus:border-[#8B1E2D]"
              />
              {pinError && (
                <p className="text-xs text-red-600 font-medium">
                  {t.adminWrongPin}
                </p>
              )}
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#8B1E2D] hover:bg-[#721522] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                {t.adminLogin}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden p-4 sm:p-6 space-y-4">
            
            {/* KPI Metric Summary Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#FDFBF7] border border-[#E8DCC4] text-center">
                <span className="block text-[11px] text-stone-500 uppercase tracking-wider">Tổng Lượt Phản Hồi</span>
                <span className="block font-display-wedding text-2xl font-bold text-[#8B1E2D] tabular-nums mt-0.5">
                  {rsvps.length}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FDFBF7] border border-[#E8DCC4] text-center">
                <span className="block text-[11px] text-stone-500 uppercase tracking-wider">Khách Tiệc 18/11</span>
                <span className="block font-display-wedding text-2xl font-bold text-emerald-700 tabular-nums mt-0.5">
                  {totalWeddingGuests}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FDFBF7] border border-[#E8DCC4] text-center">
                <span className="block text-[11px] text-stone-500 uppercase tracking-wider">Khách Cơm 17/11</span>
                <span className="block font-display-wedding text-2xl font-bold text-amber-700 tabular-nums mt-0.5">
                  {totalDinnerGuests}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FDFBF7] border border-[#E8DCC4] text-center">
                <span className="block text-[11px] text-stone-500 uppercase tracking-wider">Lời Chúc Đã Nhận</span>
                <span className="block font-display-wedding text-2xl font-bold text-indigo-700 tabular-nums mt-0.5">
                  {wishes.length}
                </span>
              </div>
            </div>

            {/* Navigation Tabs & Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1 border-b border-[#E8DCC4] pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('rsvps')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                    activeTab === 'rsvps'
                      ? 'bg-[#8B1E2D] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Danh Sách Khách Mời ({filteredRsvps.length})
                </button>
                <button
                  onClick={() => setActiveTab('wishes')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                    activeTab === 'wishes'
                      ? 'bg-[#8B1E2D] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Quản Lý Lời Chúc ({wishes.length})
                </button>
              </div>

              {activeTab === 'rsvps' && (
                <button
                  onClick={handleExportCsv}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.exportCsv}</span>
                </button>
              )}
            </div>

            {/* Tab 1: RSVPs Content */}
            {activeTab === 'rsvps' && (
              <div className="flex-1 flex flex-col overflow-hidden space-y-3">
                {/* Search & Side Filter */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Tìm theo tên hoặc số điện thoại..."
                      className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#E8DCC4] text-xs text-stone-800 bg-[#FDFBF7] focus:outline-none focus:border-[#8B1E2D]"
                    />
                  </div>

                  <div className="flex items-center gap-1 bg-[#FDFBF7] border border-[#E8DCC4] p-0.5 rounded-lg text-xs">
                    {(['all', 'groom', 'bride'] as const).map((side) => (
                      <button
                        key={side}
                        onClick={() => setFilterSide(side)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                          filterSide === side
                            ? 'bg-[#8B1E2D] text-white'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {side === 'all' ? 'Tất cả họ' : side === 'groom' ? 'Nhà Trai' : 'Nhà Gái'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table Container */}
                <div className="flex-1 overflow-y-auto border border-[#E8DCC4] rounded-xl">
                  {filteredRsvps.length === 0 ? (
                    <div className="p-8 text-center text-xs text-stone-500">
                      Chưa có phản hồi nào phù hợp.
                    </div>
                  ) : (
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#FDFBF7] border-b border-[#E8DCC4] text-stone-600 font-semibold sticky top-0">
                        <tr>
                          <th className="py-2.5 px-3">Khách Mời</th>
                          <th className="py-2.5 px-3">Điện Thoại</th>
                          <th className="py-2.5 px-3">Sự Kiện</th>
                          <th className="py-2.5 px-3 text-center">Số Lượng</th>
                          <th className="py-2.5 px-3">Khách Của</th>
                          <th className="py-2.5 px-3">Ghi Chú</th>
                          <th className="py-2.5 px-3 text-right">Xóa</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8DCC4]/50 text-stone-800">
                        {filteredRsvps.map((r) => (
                          <tr key={r.id} className="hover:bg-stone-50 transition-colors">
                            <td className="py-2 px-3 font-semibold text-stone-900">{r.guestName}</td>
                            <td className="py-2 px-3 font-mono">{r.phoneNumber}</td>
                            <td className="py-2 px-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                r.attendingEvent === 'wedding_18'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : r.attendingEvent === 'dinner_17'
                                  ? 'bg-amber-50 text-amber-700'
                                  : r.attendingEvent === 'both'
                                  ? 'bg-indigo-50 text-indigo-700'
                                  : 'bg-rose-50 text-rose-700'
                              }`}>
                                {r.attendingEvent === 'wedding_18' ? 'Tiệc cưới 18/11' : r.attendingEvent === 'dinner_17' ? 'Cơm thân mật 17/11' : r.attendingEvent === 'both' ? 'Cả hai buổi' : 'Không tham dự'}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-center font-bold tabular-nums">{r.guestCount}</td>
                            <td className="py-2 px-3">
                              <span className="text-[11px] text-stone-600">
                                {r.guestSide === 'groom' ? 'Nhà Trai' : 'Nhà Gái'}
                              </span>
                            </td>
                            <td className="py-2 px-3 max-w-[180px] truncate text-stone-500 text-[11px]">
                              {r.note || '—'}
                            </td>
                            <td className="py-2 px-3 text-right">
                              <button
                                onClick={() => handleDeleteRsvp(r.id)}
                                className="p-1 rounded text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Xóa bản ghi"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Wishes Management */}
            {activeTab === 'wishes' && (
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {wishes.map((w) => (
                  <div
                    key={w.id}
                    className="p-3.5 rounded-xl border border-[#E8DCC4] bg-[#FDFBF7] flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-stone-900 text-sm">
                          {w.senderName}
                        </span>
                        <span className="text-[10px] text-stone-500 capitalize">
                          ({w.relationship})
                        </span>
                        {w.isPinned && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[9px] font-bold uppercase">
                            Đã ghim
                          </span>
                        )}
                      </div>
                      <p className="text-stone-700 text-xs">
                        {w.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleTogglePinWish(w.id, w.isPinned)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          w.isPinned ? 'bg-amber-100 text-amber-800' : 'hover:bg-stone-200 text-stone-500'
                        }`}
                        title={w.isPinned ? 'Bỏ ghim' : 'Ghim lên đầu'}
                      >
                        <Pin className="w-3.5 h-3.5 fill-current" />
                      </button>
                      <button
                        onClick={() => handleDeleteWish(w.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                        title="Xóa lời chúc"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
