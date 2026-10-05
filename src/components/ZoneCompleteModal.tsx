import React, { useState } from 'react';
import { ZoneConfig } from '../types/game';
import { playClickSound } from '../utils/audio';
import { downloadImageFile } from '../utils/downloadHelper';

interface ZoneCompleteModalProps {
  zone: ZoneConfig;
  onBackToMap: () => void;
  onFinishApp: () => void;
  onOpenGallery?: () => void;
}

export const ZoneCompleteModal: React.FC<ZoneCompleteModalProps> = ({
  zone,
  onBackToMap,
  onFinishApp,
  onOpenGallery,
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleDownload = () => {
    playClickSound();
    downloadImageFile(zone.referenceImage, `gambar_fauna_${zone.animal.toLowerCase()}.jpg`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border-4 border-amber-400 text-center relative overflow-hidden my-4">
        {/* Confetti & Golden Glow Background */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-amber-300/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-emerald-300/30 rounded-full blur-2xl pointer-events-none" />

        {/* Big Golden Zone Badge (Requirement) */}
        <div className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-500 p-1.5 shadow-2xl animate-pulse-glow mb-3">
          <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center border-2 border-amber-400 shadow-inner">
            <span className="text-3xl">{zone.badgeIcon}</span>
            <span className="text-[9px] font-extrabold text-amber-900 tracking-wider uppercase mt-0.5">
              LENCANA
            </span>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-display">
          🎉 PETUALANGANMU DI ZONA INI SELESAI!
        </h3>

        <div className="mt-1 text-sm font-bold text-amber-800 bg-amber-50 inline-block px-4 py-1 rounded-full border border-amber-200">
          🏅 {zone.badge.toUpperCase()}
        </div>

        {/* Official Reference Artwork Unlocked Card (Requirement) */}
        <div className="mt-4 p-4 bg-gradient-to-b from-amber-50/90 to-emerald-50/60 border-2 border-amber-300 rounded-2xl text-left shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Gambar Panduan Resmi · {zone.pdfLabel}
              </span>
              <p className="font-extrabold text-slate-900 text-sm font-display mt-0.5">
                Model Gambar {zone.animal} untuk Digambar di Buku Gambar
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 cursor-pointer font-display shrink-0"
            >
              <span>📥</span>
              <span>Unduh Gambar</span>
            </button>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-amber-200 shadow group cursor-pointer" onClick={() => setIsPreviewOpen(true)}>
            <img
              src={zone.referenceImage}
              alt={`Gambar Fauna ${zone.animal}`}
              className="w-full h-44 sm:h-52 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1 backdrop-blur-[1px]">
              <span>🔍 Klik untuk Melihat Ukuran Penuh</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-600 mt-2 text-center">
            Gunakan gambar ini sebagai model acuan saat menggambar dengan pensil dan mewarnai di buku gambarmu!
          </p>
        </div>

        {/* 5-Item Checklist Ringkasan (Requirement) */}
        <div className="mt-4 bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-left max-w-sm mx-auto space-y-1.5 text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-2 text-emerald-700">
            <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold">✓</span>
            <span>Rakit Fauna</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700">
            <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold">✓</span>
            <span>Temukan Bentuk Dasar</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700">
            <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold">✓</span>
            <span>Amati Proporsi</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700">
            <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold">✓</span>
            <span>Temukan Ciri Khas</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700">
            <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold">✓</span>
            <span>Siap Menggambar</span>
          </div>
        </div>

        {/* Action Buttons (Requirement) */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <button
            onClick={() => {
              playClickSound();
              onBackToMap();
            }}
            className="w-full sm:w-auto px-5 py-3 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-display"
          >
            <span>🗺️</span>
            <span>KEMBALI KE PETA</span>
          </button>

          {onOpenGallery && (
            <button
              onClick={() => {
                playClickSound();
                onOpenGallery();
              }}
              className="w-full sm:w-auto px-4 py-3 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer font-display"
            >
              <span>🖼️</span>
              <span>BUKA GALERI</span>
            </button>
          )}

          <button
            onClick={() => {
              playClickSound();
              onFinishApp();
            }}
            className="w-full sm:w-auto px-5 py-3 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-display"
          >
            <span>🏁</span>
            <span>SELESAI</span>
          </button>
        </div>
      </div>

      {/* Full Size Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 shadow-2xl border-4 border-amber-300 text-center relative max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-extrabold text-slate-800 text-sm md:text-base font-display">
                {zone.pdfLabel} - Model Gambar Fauna
              </h4>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="my-3 overflow-hidden rounded-2xl border border-slate-200 flex-1 flex items-center justify-center bg-slate-50">
              <img
                src={zone.referenceImage}
                alt={`Gambar Fauna ${zone.animal}`}
                className="max-h-[60vh] w-auto object-contain rounded-xl"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={handleDownload}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs md:text-sm rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer font-display"
              >
                <span>📥 Unduh Gambar Ini</span>
              </button>
              <button
                onClick={() => setIsPreviewOpen(false)}
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

