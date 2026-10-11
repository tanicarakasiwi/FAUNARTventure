import React from 'react';
import { playClickSound } from '../utils/audio';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border-4 border-amber-300 relative text-left max-h-[85vh] overflow-y-auto">
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-lg cursor-pointer"
        >
          ✕
        </button>

        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
          Materi Pembelajaran Seni Rupa SMP Kelas VII
        </span>

        <h3 className="text-2xl font-extrabold text-slate-900 font-display mt-2">
          Tahapan Menggambar Ragam Fauna
        </h3>

        <div className="mt-4 space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed font-sans">
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <h4 className="font-extrabold text-amber-950 text-sm font-display flex items-center gap-1.5">
              <span>1.</span>
              <span>Penyederhanaan Bentuk Dasar (Geometris)</span>
            </h4>
            <p className="mt-1 text-slate-600">
              Setiap bentuk hewan yang rumit sesungguhnya tersusun atas bentuk-bentuk dasar seperti <strong>lingkaran</strong> (kepala/mata), <strong>oval</strong> (badan utama), dan <strong>segitiga</strong> (sirip, telinga, ekor).
            </p>
          </div>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
            <h4 className="font-extrabold text-emerald-950 text-sm font-display flex items-center gap-1.5">
              <span>2.</span>
              <span>Proporsi & Keseimbangan</span>
            </h4>
            <p className="mt-1 text-slate-600">
              Proporsi adalah perbandingan ukuran antar bagian tubuh (misalnya kepala terhadap badan, atau panjang sayap terhadap tubuh). Menjaga proporsi yang tepat membuat gambar tampak proporsional dan tidak janggal.
            </p>
          </div>

          <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200">
            <h4 className="font-extrabold text-sky-950 text-sm font-display flex items-center gap-1.5">
              <span>3.</span>
              <span>Karakteristik & Ciri Khas</span>
            </h4>
            <p className="mt-1 text-slate-600">
              Setelah kerangka bentuk dasar dan proporsi selesai dibuat, sematkan ciri khas fauna seperti kumis dan telinga runcing pada kucing, paruh pipih pada bebek, atau spiral cangkang pada siput.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="font-extrabold text-slate-900 text-sm font-display flex items-center gap-1.5">
              <span>4.</span>
              <span>Penerapan pada Buku Sketsa</span>
            </h4>
            <p className="mt-1 text-slate-600">
              Gunakan pensil 2B untuk menarik garis sketsa tipis terlebih dahulu. Jangan langsung menekan pensil dengan keras. Setelah garis bentuk sesuai, tebalkan garis kontur utama dan hapus garis bantu.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer font-display"
          >
            Mengerti & Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};
