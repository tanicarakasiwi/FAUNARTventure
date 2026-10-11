import React, { useState } from 'react';
import { AllZonesProgress, ZoneId } from '../types/game';
import { ZONES_CONFIG } from '../data/zones';
import { playClickSound } from '../utils/audio';
import { downloadImageFile } from '../utils/downloadHelper';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: AllZonesProgress;
  onGoToZone: (zoneId: ZoneId) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  progress,
  onGoToZone,
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [activePreviewZoneId, setActivePreviewZoneId] = useState<ZoneId | null>(null);

  if (!isOpen) return null;

  const zonesList = Object.values(ZONES_CONFIG);
  const completedCount = zonesList.filter((z) => progress[z.id].zoneCompleted).length;

  const filteredZones = zonesList.filter((z) => {
    const isDone = progress[z.id].zoneCompleted;
    if (filter === 'unlocked') return isDone;
    if (filter === 'locked') return !isDone;
    return true;
  });

  const handleDownloadImage = (zoneId: ZoneId) => {
    playClickSound();
    const zone = ZONES_CONFIG[zoneId];
    downloadImageFile(zone.referenceImage, `gambar_fauna_${zone.animal.toLowerCase()}.jpg`);
  };

  const previewZone = activePreviewZoneId ? ZONES_CONFIG[activePreviewZoneId] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl border-4 border-amber-300 relative flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🖼️</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                Galeri Gambar Fauna
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Koleksi gambar resmi yang terbuka setelah kamu menyelesaikan misi pengamatan di setiap habitat.
            </p>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Filter controls & Progress pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 my-3">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => {
                playClickSound();
                setFilter('all');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Fauna (6)
            </button>
            <button
              onClick={() => {
                playClickSound();
                setFilter('unlocked');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filter === 'unlocked'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Terbuka ({completedCount})
            </button>
            <button
              onClick={() => {
                playClickSound();
                setFilter('locked');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filter === 'locked'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Belum ({6 - completedCount})
            </button>
          </div>

          <div className="text-xs font-semibold text-slate-600">
            Status: <span className="text-emerald-700 font-bold">{completedCount} dari 6</span> gambar berhasil diselesaikan
          </div>
        </div>

        {/* Grid of 6 Animal Artworks */}
        <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-2">
          {filteredZones.map((zone) => {
            const isUnlocked = progress[zone.id].zoneCompleted;

            return (
              <div
                key={zone.id}
                className={`rounded-2xl border-2 transition-all overflow-hidden flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-white border-amber-300 shadow-md hover:shadow-xl'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                {/* Artwork Thumbnail Card */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 group">
                  {isUnlocked ? (
                    <>
                      <img
                        src={zone.referenceImage}
                        alt={zone.animal}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                        onClick={() => {
                          playClickSound();
                          setActivePreviewZoneId(zone.id);
                        }}
                      />
                      <div
                        className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1 cursor-pointer"
                        onClick={() => {
                          playClickSound();
                          setActivePreviewZoneId(zone.id);
                        }}
                      >
                        <span>🔍 Perbesar</span>
                      </div>
                      <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow">
                        ✓ TERBUKA
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-100/90 text-slate-400">
                      <span className="text-4xl mb-1 filter grayscale opacity-40">
                        {zone.badgeIcon}
                      </span>
                      <span className="text-xs font-bold text-slate-500">🔒 Terkunci</span>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Selesaikan misi di {zone.habitat} untuk membuka gambar ini.
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Details */}
                <div className="p-3.5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {zone.habitat}
                      </span>
                      <span className="text-sm">{zone.badgeIcon}</span>
                    </div>
                    <h4 className="font-extrabold text-slate-800 text-sm font-display mt-0.5">
                      {zone.pdfLabel}
                    </h4>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2">
                    {isUnlocked ? (
                      <>
                        <button
                          onClick={() => handleDownloadImage(zone.id)}
                          className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1 cursor-pointer font-display"
                        >
                          <span>📥</span>
                          <span>Unduh</span>
                        </button>
                        <button
                          onClick={() => {
                            playClickSound();
                            onClose();
                            onGoToZone(zone.id);
                          }}
                          className="py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                          title="Buka Kanvas Menggambar"
                        >
                          ✏️ Sketsa
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          playClickSound();
                          onClose();
                          onGoToZone(zone.id);
                        }}
                        className="w-full py-1.5 px-3 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1 cursor-pointer font-display"
                      >
                        <span>Jelajahi Misi</span>
                        <span>→</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>💡 Klik tombol "Unduh" untuk menyimpan gambar di komputermu.</span>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
          >
            Tutup Galeri
          </button>
        </div>
      </div>

      {/* Full Preview Modal inside Gallery */}
      {previewZone && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 shadow-2xl border-4 border-amber-300 text-center relative max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Gambar Panduan Resmi
                </span>
                <h4 className="font-extrabold text-slate-800 text-base font-display mt-0.5">
                  {previewZone.pdfLabel}
                </h4>
              </div>
              <button
                onClick={() => setActivePreviewZoneId(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="my-3 overflow-hidden rounded-2xl border border-slate-200 flex-1 flex items-center justify-center bg-slate-50">
              <img
                src={previewZone.referenceImage}
                alt={previewZone.animal}
                className="max-h-[60vh] w-auto object-contain rounded-xl"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => handleDownloadImage(previewZone.id)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs md:text-sm rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer font-display"
              >
                <span>📥 Unduh Gambar Ini</span>
              </button>
              <button
                onClick={() => setActivePreviewZoneId(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs md:text-sm rounded-xl transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
