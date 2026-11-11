import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { TRANSLATIONS } from '../data/weddingData';

export const OfflineIndicator: React.FC<{ lang: 'vi' | 'en' }> = ({ lang }) => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      setTimeout(() => setShowReconnected(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showReconnected) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 z-50 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900/90 text-white text-xs backdrop-blur-md shadow-lg border border-stone-700 animate-fadeIn">
      {!isOnline ? (
        <>
          <WifiOff className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>{TRANSLATIONS[lang].offlineNotice}</span>
        </>
      ) : (
        <>
          <Wifi className="w-4 h-4 text-emerald-400" />
          <span>Đã kết nối lại trực tuyến!</span>
        </>
      )}
    </div>
  );
};
