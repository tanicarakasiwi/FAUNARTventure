import { DifficultyLevel, ZoneId } from '../types/game';

export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, {
  label: string;
  subLabel: string;
  badge: string;
  color: string;
  accentBg: string;
  activeBorder: string;
  badgeBg: string;
  description: string;
  shapesSummary: string;
  detailLevel: string;
}> = {
  EASY: {
    label: 'Easy (Pemula)',
    subLabel: 'Bentuk Geometris Sederhana',
    badge: '🟢',
    color: 'text-emerald-700',
    accentBg: 'bg-emerald-500',
    activeBorder: 'border-emerald-500 ring-2 ring-emerald-300',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Fokus pada siluet utama dan kombinasi 2-3 bentuk dasar besar (oval & lingkaran). Tanpa detail rumit, sangat cocok untuk pemahaman awal struktur bentuk fauna.',
    shapesSummary: '2 - 3 Bentuk Geometri Utama (Badan & Kepala)',
    detailLevel: 'Minimal (Siluet garis besar & mata utama)',
  },
  MEDIUM: {
    label: 'Medium (Standar)',
    subLabel: 'Proporsi & Karakteristik Khas',
    badge: '🟡',
    color: 'text-amber-700',
    accentBg: 'bg-amber-500',
    activeBorder: 'border-amber-500 ring-2 ring-amber-300',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Menambahkan anggota gerak (sirip, ekor, sayap, cangkang), perbandingan skala proporsi tubuh, serta ciri khas utama satwa yang membedakannya dengan hewan lain.',
    shapesSummary: '4 - 5 Bentuk Geometri Terhubung (Badan, Kepala, Ekor, Anggota Gerak)',
    detailLevel: 'Sedang (Proporsi anatomis seimbang, lipatan gerak, tekstur dasar)',
  },
  HARD: {
    label: 'Hard (Mahir)',
    subLabel: 'Detail Anatomi, Tekstur & Arsiran',
    badge: '🔴',
    color: 'text-rose-700',
    accentBg: 'bg-rose-500',
    activeBorder: 'border-rose-500 ring-2 ring-rose-300',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
    description: 'Tantangan observasi seni rupa tingkat lanjut: mengamati kurvatur dinamis, garis kontur transisi, arsiran tekstur nyata (sisik/bulu/urat cangkang), serta kontras pencahayaan.',
    shapesSummary: 'Struktur Geometri Komposit Kompleks + Garis Kontur Halus',
    detailLevel: 'Tinggi (Detail tekstur mikro, arsiran gelap-terang, ekspresi & anatomi mendalam)',
  },
};

export interface ZoneDifficultyDetail {
  baseShapes: string[];
  keyDetails: string[];
  simplifiedShapesGuide: { part: string; shape: string; note: string }[];
  drawingGuidance: string[];
  canvasTracingHint: string;
}

export const ZONE_DIFFICULTY_DETAILS: Record<ZoneId, Record<DifficultyLevel, ZoneDifficultyDetail>> = {
  ikan: {
    EASY: {
      baseShapes: ['1 Oval Horizontal (Badan)', '1 Segitiga Lebar (Ekor)', '1 Lingkaran (Mata)'],
      keyDetails: [
        'Arah hadap ikan menghadap ke samping',
        'Ukuran oval badan sekitar 3 kali lebih besar dari ekor',
        'Mata bulat diletakkan di bagian depan badan',
      ],
      simplifiedShapesGuide: [
        { part: 'Badan', shape: 'Oval', note: 'Bentuk telur memanjang sebagai pusat badan' },
        { part: 'Ekor', shape: 'Segitiga', note: 'Segitiga menempel di ujung belakang oval' },
        { part: 'Mata', shape: 'Lingkaran', note: 'Titik lingkaran kecil di kepala depan' },
      ],
      drawingGuidance: [
        'Tarik satu oval lonjong sebagai badan utama ikan.',
        'Tambahkan segitiga sederhana di belakang untuk ekor.',
        'Beri titik mata bulat di dekat moncong depan.',
        'Tarik garis lengkung insang sederhana.',
      ],
      canvasTracingHint: 'Fokus pada bentuk OVAL lonjong badan dan SEGITIGA ekor yang seimbang.',
    },
    MEDIUM: {
      baseShapes: [
        '1 Oval Ramping (Badan streamline)',
        '3 Segitiga Sirip (Punggung dorsal, dada pektoral, dan perut)',
        '1 Ekor Kipas Dinamis',
        'Bukaan Mulut & Garis Insang',
      ],
      keyDetails: [
        'Proporsi: panjang badan 2,5x lebar badan',
        'Sirip punggung tegak di atas lengkung badan dengan tinggi sepertiga badan',
        'Ciri khas: sirip dada berbentuk segitiga runcing dan garis lengkung penutup insang',
        'Garis pemisah kepala dan tubuh',
      ],
      simplifiedShapesGuide: [
        { part: 'Badan', shape: 'Oval Memanjang', note: 'Menyempit halus ke arah pangkal ekor' },
        { part: 'Sirip Punggung', shape: 'Segitiga Lengkung', note: 'Tegak di sepertiga atas punggung' },
        { part: 'Sirip Dada', shape: 'Segitiga Halus', note: 'Menempel di bawah garis operkulum insang' },
        { part: 'Ekor', shape: 'Segitiga Terbelah', note: 'Melebar di ujung belakang membentuk kipas dorong' },
      ],
      drawingGuidance: [
        'Gambar oval dasar lalu runcingkan sedikit ujung moncong mulut.',
        'Pasang sirip punggung dan dada sesuai rasio proporsi seimbang.',
        'Hubungkan ekor kipas dengan pangkal ekor yang luwes.',
        'Tarik pola belang melengkung di badan untuk volume 3D.',
      ],
      canvasTracingHint: 'Perhatikan perbandingan letak sirip punggung dan keluwesan lekukan pangkal ekor.',
    },
    HARD: {
      baseShapes: [
        'Geometri Komposit Streamline Terpadu',
        'Garis Tulang Rangka Sirip Transparan (Fin Rays)',
        'Susunan Sisik Mengikuti Kontur Lengkung Tubuh',
        'Refleksi Cahaya pada Bola Mata & Iris Berlapis',
      ],
      keyDetails: [
        'Detail tekstur: susunan sisik berulang dengan pola lengkung "C" teratur',
        'Garis-garis tulang sirip halus dengan kelenturan realistis',
        'Arsiran gelap-terang (shading): bagian perut lebih terang dibanding punggung',
        'Bibir berdimensi dan lipatan operkulum ganda',
      ],
      simplifiedShapesGuide: [
        { part: 'Siluet Garis Luar', shape: 'Kontur Dinamis Organik', note: 'Transisi halus tanpa sudut tajam kaku' },
        { part: 'Rangka Sirip', shape: 'Garis Radial Sejajar', note: 'Garis tulang halus memancar dari pangkal sirip' },
        { part: 'Tekstur Sisik', shape: 'Pola Romboid Melengkung', note: 'Mengecil secara proporsional ke arah ekor' },
        { part: 'Pencahayaan', shape: 'Gradasi Bayangan', note: 'Arsiran bawah perut mempertegas volume bulat' },
      ],
      drawingGuidance: [
        'Buat sketsa anatomi lengkap dengan proporsi presisi.',
        'Haluskan sambungan kontur siluet seluruh tubuh.',
        'Arsir garis-garis tipis pada seluruh sirip punggung, dada, dan ekor.',
        'Tambahkan tekstur sisik mikro dan highlight kilau pantulan air.',
      ],
      canvasTracingHint: 'Terapkan teknik arsiran gradasi punggung-perut dan detail tulang sirip yang halus.',
    },
  },

  lumba: {
    EASY: {
      baseShapes: ['1 Oval Melengkung seperti Pisang (Badan)', '1 Segitiga Melengkung (Sirip Punggung)', '1 Segitiga Lebar (Ekor Horizontal)'],
      keyDetails: [
        'Bentuk tubuh melengkung seperti busur panah melompat',
        'Moncong mulut bulat sedikit menonjol ke depan',
        'Sirip punggung melengkung ke belakang',
      ],
      simplifiedShapesGuide: [
        { part: 'Badan', shape: 'Oval Lengkung', note: 'Lengkungan dinamis lumba-lumba melompat' },
        { part: 'Sirip Atas', shape: 'Segitiga', note: 'Sirip sabit melengkung ke belakang' },
        { part: 'Ekor', shape: 'Segitiga Ganda', note: 'Bilah ekor mendatar khas mamalia laut' },
      ],
      drawingGuidance: [
        'Tarik satu garis lengkung busur besar untuk punggung lumba-lumba.',
        'Tutup lengkungan di bagian perut membentuk bulan sabit atau pisang.',
        'Tambahkan moncong tumpul di depan dan sirip punggung di tengah.',
        'Gambar ekor melebar di ujung belakang.',
      ],
      canvasTracingHint: 'Tangkap kelenturan gerak melompat (kurva busur) tubuh lumba-lumba.',
    },
    MEDIUM: {
      baseShapes: [
        'Oval Torpedo Hidrodinamis',
        'Moncong Rostrum Botol Khas',
        'Sirip Dada Pektoral Melengkung Fleksibel',
        'Sirip Punggung Sabit (Falcate)',
        'Fluke Ekor Mendatar Bercelah Tengah',
      ],
      keyDetails: [
        'Dahi membulat (melon) yang khas menurun ke paruh (beak)',
        'Garis senyum alami pada bukaan mulut memanjang ke mata',
        'Sirip dada melengkung ke bawah tubuh',
        'Pola dua warna: punggung abu-abu gelap, perut putih terang (countershading)',
      ],
      simplifiedShapesGuide: [
        { part: 'Kepala Melon', shape: 'Kubah Bulat', note: 'Tonjolan dahi membulat di atas paruh' },
        { part: 'Rostrum (Paruh)', shape: 'Kerucut Tumpul', note: 'Moncong khas lumba-lumba hidung botol' },
        { part: 'Sirip Pectoral', shape: 'Segitiga Sabit', note: 'Melengkung luwes ke arah belakang bawah' },
        { part: 'Fluke Ekor', shape: 'Sayap Mendatar Kupu-kupu', note: 'Dua bilah simetris dengan takik tengah' },
      ],
      drawingGuidance: [
        'Bentuk siluet torpedo dengan lekuk dahi dan moncong jelas.',
        'Tentukan letak sirip dorsal tepat di puncak lengkung punggung.',
        'Tarik garis batas warna antara punggung abu-abu dan perut terang.',
        'Tambahkan mata kecil tepat di belakang sudut garis mulut.',
      ],
      canvasTracingHint: 'Perhatikan lekukan moncong paruh dan batas warna perut yang terang.',
    },
    HARD: {
      baseShapes: [
        'Anatomi Mamalia Laut Cetacea Presisi',
        'Lubang Sembur (Blowhole) di Atas Kepala',
        'Garis Gelombang Percikan Air & Efek Basah Mengkilap',
        'Gradasi Countershading Halus dengan Arsiran Halus',
      ],
      keyDetails: [
        'Refleksi kilau kulit karet licin khas lumba-lumba (wet sheen highlight)',
        'Lekukan otot peduncle ekor yang kuat sebelum mengembang ke bilah fluke',
        'Transisi gradasi warna abu-abu kebiruan di punggung ke krem keputihan di perut',
        'Cipratan tetes air dinamis di sekitar tubuh',
      ],
      simplifiedShapesGuide: [
        { part: 'Siluet Otot Ekor', shape: 'Penyempitan Runcing Kuat', note: 'Peduncle ekor memiliki tonjolan otot dorong' },
        { part: 'Blowhole', shape: 'Oval Cekung Kecil', note: 'Katup pernapasan di bagian ubun-ubun dahi' },
        { part: 'Kilau Kulit', shape: 'Highlight Pita Putih', note: 'Pantulan sinar matahari di sepanjang puncak punggung' },
        { part: 'Air Dinamis', shape: 'Pola Tetes & Gelombang', note: 'Menambah kesan dramatis gerakan di dalam laut' },
      ],
      drawingGuidance: [
        'Gambar kontur siluet dengan lekukan otot anatomi yang luwes dan proporsional.',
        'Gunakan arsiran lembut pensil untuk menghasilkan gradasi warna tubuh gelap ke terang.',
        'Sisakan garis putih tanpa arsir di punggung sebagai pantulan cahaya kulit basah.',
        'Lengkapi dengan gelembung udara dan cipratan ombak biru di bawahnya.',
      ],
      canvasTracingHint: 'Ciptakan efek mengkilap kulit basah dengan menyisakan area highlight putih di punggung.',
    },
  },

  kucing: {
    EASY: {
      baseShapes: ['1 Lingkaran (Kepala)', '1 Oval (Badan Jongkok/Duduk)', '2 Segitiga Tegak (Telinga)', '1 Garis Lengkung (Ekor)'],
      keyDetails: [
        'Dua telinga segitiga tegak di atas kepala',
        'Ekor panjang melengkung seperti huruf S atau tanda tanya',
        'Kumis 3 helai di sisi kiri dan kanan pipi',
      ],
      simplifiedShapesGuide: [
        { part: 'Kepala', shape: 'Lingkaran', note: 'Bulat sempurna untuk kepala kucing lucu' },
        { part: 'Telinga', shape: 'Segitiga', note: 'Dua segitiga runcing berdiri tegak' },
        { part: 'Badan', shape: 'Oval Miring', note: 'Pondasi badan kucing sedang duduk' },
        { part: 'Ekor', shape: 'Garis S', note: 'Garis melengkung luwes di belakang' },
      ],
      drawingGuidance: [
        'Gambar lingkaran untuk kepala dan oval miring untuk badan.',
        'Pasang 2 segitiga telinga di atas kepala.',
        'Tarik ekor melengkung ke atas dari bagian bawah badan.',
        'Beri mata, hidung segitiga kecil terbalik, dan kumis tipis.',
      ],
      canvasTracingHint: 'Fokus pada bentuk dasar LINGKARAN kepala dan 2 SEGITIGA telinga yang seimbang.',
    },
    MEDIUM: {
      baseShapes: [
        'Lingkaran Kepala dengan Pipi Mengembang',
        'Bentuk Oval Ganda (Dada dan Panggul)',
        '4 Kaki Cakar dengan Telapak Menapak',
        'Pola Belang Tabby atau Bercak Warna',
      ],
      keyDetails: [
        'Mata almond miring dengan pupil vertikal',
        'Hidung segitiga kecil dihubungkan ke garis mulut huruf "w"',
        'Proporsi kaki depan tegak lurus dan paha belakang melengkung saat duduk',
        'Pipi sedikit melebar dengan bulu halus',
      ],
      simplifiedShapesGuide: [
        { part: 'Mata', shape: 'Oval Almond', note: 'Bentuk biji kenari dengan pupil vertikal' },
        { part: 'Hidung & Mulut', shape: 'Segitiga Terbalik + Garis W', note: 'Muzzle kucing yang menggemaskan' },
        { part: 'Paha Belakang', shape: 'Oval Besar Tertekuk', note: 'Otot paha kucing yang khas saat berjongkok' },
        { part: 'Cakar', shape: 'Oval Kecil Berjari Tiga', note: 'Telapak kaki depan menumpu di lantai' },
      ],
      drawingGuidance: [
        'Bentuk poros kepala dan tentukan garis tengah wajah untuk simetri mata.',
        'Bentuk paha belakang yang melengkung kuat dan kedua kaki depan yang sejajar.',
        'Hubungkan leher dan bahu dengan garis lembut.',
        'Tambahkan pola loreng belang di dahi berbentuk huruf "M".',
      ],
      canvasTracingHint: 'Perhatikan posisi telapak kaki dan garis simetri wajah agar mata tidak miring.',
    },
    HARD: {
      baseShapes: [
        'Struktur Kerangka Feline Dinamis',
        'Detail Arah Tumbuh Bulu (Fur Direction)',
        'Kedalaman Bola Mata Kaca dengan Cincin Limbal',
        'Kumis Berdimensi (Vibrissae) Melengkung Alami',
      ],
      keyDetails: [
        'Arsiran tekstur bulu lembut searah aliran tubuh dari kepala ke ekor',
        'Detail daun telinga dengan lipatan kantung Henry di pinggir luar',
        'Bantalan telapak kaki (paw pads) dan kuku tersembunyi',
        'Refleksi specular highlight pada bola mata kucing',
      ],
      simplifiedShapesGuide: [
        { part: 'Tekstur Bulu', shape: 'Goresan Arsir Cepat', note: 'Goresan pensil pendek-pendek mengikuti arah tumbuh bulu' },
        { part: 'Mata Kaca', shape: 'Lensa Bola 3D', note: 'Gradasi hijau/kuning dengan kilau pantulan jendela' },
        { part: 'Kumis Melengkung', shape: 'Garis Tarikan Tunggal', note: 'Tumbuh dari bintik-bintik pori pipi' },
        { part: 'Volume Telinga', shape: 'Segitiga Berongga Dalam', note: 'Arsiran gelap di dalam rongga telinga' },
      ],
      drawingGuidance: [
        'Sketsa garis luar tubuh kucing secara proporsional.',
        'Gunakan teknik arsir hatching pendek untuk menciptakan ilusi bulu lebat.',
        'Detailkan bagian mata dengan pupil tajam dan efek kilau kaca hidup.',
        'Tarik garis kumis tipis dan tegas dengan satu tarikan tangan percaya diri.',
      ],
      canvasTracingHint: 'Gunakan goresan pensil lembut searah untuk bulu dan buat rongga telinga berdimensi 3D.',
    },
  },

  burung: {
    EASY: {
      baseShapes: ['1 Lingkaran (Kepala)', '1 Oval Miring (Badan)', '1 Segitiga Runcing (Paruh)', '1 Segitiga Melebar (Ekor)'],
      keyDetails: [
        'Paruh segitiga runcing menghadap ke samping',
        'Badan oval miring seperti telur berdiri',
        'Dua kaki garis lurus dengan cakar kecil',
      ],
      simplifiedShapesGuide: [
        { part: 'Kepala', shape: 'Lingkaran', note: 'Kepala bulat kompak burung berkicau' },
        { part: 'Paruh', shape: 'Segitiga Runcing', note: 'Paruh pematuk serangga yang tajam' },
        { part: 'Badan', shape: 'Oval Miring', note: 'Badan berisi tempat sayap terlipat' },
        { part: 'Ekor', shape: 'Persegi Panjang/Segitiga', note: 'Bulu ekor memanjang di belakang' },
      ],
      drawingGuidance: [
        'Tarik lingkaran kepala dan hubungkan dengan oval miring badan.',
        'Beri segitiga kecil untuk paruh runcing.',
        'Gambarkan sayap menempel di samping badan.',
        'Tarik dua kaki kecil yang sedang bertengger.',
      ],
      canvasTracingHint: 'Pastikan kemiringan oval badan pas seperti burung yang sedang bertengger santai.',
    },
    MEDIUM: {
      baseShapes: [
        'Bentuk Pir (Kombinasi Kepala & Dada)',
        'Sayap Terlipat Bersusun Tiga Tingkat',
        'Bulu Ekor Bertingkat (Remiges & Rectrices)',
        'Kaki Bertengger Tiga Jari Depan Satu Belakang',
      ],
      keyDetails: [
        'Proporsi paruh terhadap kepala: panjang paruh sekitar setengah diameter kepala',
        'Lapisan bulu sayap: bulu penutup kecil di atas, bulu terbang panjang di bawah',
        'Cakar mencengkeram ranting kayu dengan kuat',
        'Lingkaran putih di sekeliling mata',
      ],
      simplifiedShapesGuide: [
        { part: 'Sayap Lipat', shape: 'Oval Berjenjang', note: 'Menutupi sebagian besar punggung dan sisi badan' },
        { part: 'Garis Paruh', shape: 'Segitiga Kerucut Ganda', note: 'Bilah atas sedikit melengkung di ujung' },
        { part: 'Cakar Ranting', shape: 'Cakar Kait Bertulang', note: 'Mencengkeram dahan dengan erat' },
        { part: 'Ekor', shape: 'Kipas Persegi Panjang', note: 'Tumpang tindih antar helai bulu ekor' },
      ],
      drawingGuidance: [
        'Buat siluet tubuh menyerupai buah pir miring.',
        'Bagi sayap menjadi 3 kelompok bulu bertingkat.',
        'Gambar ranting kayu di bawah cakar untuk memperkuat pose alami.',
        'Tarik garis pemisah warna dada dan punggung.',
      ],
      canvasTracingHint: 'Perhatikan susunan lapisan sayap dan lekuk cengkeraman cakar pada dahan pohon.',
    },
    HARD: {
      baseShapes: [
        'Anatomi Avian Sayap & Tulang Dada (Keel)',
        'Detail Batang & Cabang Helai Bulu (Rachis & Barbules)',
        'Tekstur Sisik Sisik Kaki (Podotheca)',
        'Kilau Metalik / Gradasi Warna Bulu Berkilau',
      ],
      keyDetails: [
        'Tekstur helaian bulu yang saling menindih teratur di sayap dan dada',
        'Mata burung dengan cincin pupil jernih dan kelopak tipis',
        'Tekstur kasar pada kulit dahan pohon tempat bertengger',
        'Gradasi bayangan di bawah sayap dan perut mempertegas volume bulat',
      ],
      simplifiedShapesGuide: [
        { part: 'Urat Bulu Sayap', shape: 'Garis Daun Runcing', note: 'Setiap bulu primer digambar dengan garis tengah tulang' },
        { part: 'Kulit Kaki Bersisik', shape: 'Gelang-gelang Cincin', note: 'Tekstur sisik keras reptilian pada tarsus burung' },
        { part: 'Paruh Bertanduk', shape: 'Kerucut Halus Mengkilap', note: 'Terdapat lubang hidung nares kecil di pangkal paruh' },
        { part: 'Bayangan Tubuh', shape: 'Arsir Menyilang Halus', note: 'Volume bulat bulu dada terasa montok dan hangat' },
      ],
      drawingGuidance: [
        'Sketsa anatomi burung bertengger dengan sudut pandang menyamping.',
        'Gambarkan setiap helai bulu sayap primer dan sekunder secara presisi.',
        'Tambahkan tekstur gelang sisik pada kaki dan kuku tajam melengkung.',
        'Beri arsiran lembut di bawah dada dan perut untuk memberi kesan montok 3D.',
      ],
      canvasTracingHint: 'Beri perhatian khusus pada detail urat helai bulu sayap dan tekstur sisik kaki burung.',
    },
  },

  bebek: {
    EASY: {
      baseShapes: ['1 Lingkaran (Kepala)', '1 Oval Mendatar (Badan)', '1 Persegi Panjang Lebar / Oval Pipih (Paruh Sudip)', 'Garis Air Mengapung'],
      keyDetails: [
        'Paruh pipih tumpul melebar (berbeda dengan burung yang runcing)',
        'Badan oval mendatar mengapung di atas air',
        'Ekor sedikit terangkat naik ke atas',
      ],
      simplifiedShapesGuide: [
        { part: 'Kepala', shape: 'Lingkaran', note: 'Kepala bulat ramah' },
        { part: 'Paruh Sudip', shape: 'Persegi Panjang/Oval', note: 'Paruh lebar untuk menyaring makanan di air' },
        { part: 'Badan', shape: 'Oval Horizontal', note: 'Badan montok mengapung di kolam' },
        { part: 'Ekor Naik', shape: 'Segitiga Kecil', note: 'Ujung ekor mencuat ke atas' },
      ],
      drawingGuidance: [
        'Gambar oval besar mendatar seperti perahu kecil di air.',
        'Tambahkan leher dan lingkaran kepala di depan.',
        'Beri paruh lebar mendatar.',
        'Buat garis riak air di bawah badan bebek.',
      ],
      canvasTracingHint: 'Bentuk paruh harus pipih melebar ke depan seperti sendok/sudip.',
    },
    MEDIUM: {
      baseShapes: [
        'Leher Lengkung Berbentuk Huruf S Halus',
        'Badan Perahu Angsa Montok',
        'Paruh Lebar dengan Tonjolan Kuku Ujung (Nail)',
        'Gelombang Riak Air Konsentris Melingkar',
      ],
      keyDetails: [
        'Proporsi leher bebek yang fleksibel menghubungkan kepala ke dada',
        'Paruh memiliki lubang hidung memanjang dan ujung membulat',
        'Sayap terlipat rapi di punggung dengan sedikit ujung sayap menyilang',
        'Refleksi bayangan di permukaan air tenang',
      ],
      simplifiedShapesGuide: [
        { part: 'Leher', shape: 'Tabung Lengkung S', note: 'Lengkungan anggun leher unggas air' },
        { part: 'Paruh Pipih', shape: 'Sudip dengan Lubang Hidung', note: 'Tonjolan kuku paruh di ujung depan' },
        { part: 'Sayap Lipat', shape: 'Bentuk Daun di Punggung', note: 'Bulu penutup sayap menempel rapat' },
        { part: 'Riak Air', shape: 'Oval Konsentris Tipis', note: 'Lingkaran gelombang air yang terdorong badan bebek' },
      ],
      drawingGuidance: [
        'Buat kurva leher anggun yang menyambung mulus ke dada yang membusung.',
        'Bentuk paruh pipih khas unggas air dengan proporsi yang pas.',
        'Gambarkan sayap yang terlipat rapi di atas punggung montok.',
        'Tarik garis riak air bergelombang di sekeliling badan bebek.',
      ],
      canvasTracingHint: 'Perhatikan keluwesan lekuk leher dan proporsi dada bebek yang membusung di air.',
    },
    HARD: {
      baseShapes: [
        'Anatomi Anatidae Berbulu Tahan Air (Waterproof Plumage)',
        'Detail Lamela Gigi Penyaring di Pinggir Paruh',
        'Lapisan Bulu Halus Dada dan Kontur Sayap Mengkilap',
        'Efek Transparansi dan Pantulan Cermin Air Kolam',
      ],
      keyDetails: [
        'Permukaan bulu tampak berminyak dan halus menolak air (water-repellent sheen)',
        'Tetesan air bundar yang bergulir di atas bulu punggung',
        'Refleksi bayangan bebek terbalik di air dengan distorsi gelombang riak',
        'Bulu ekor keriting kecil khas bebek jantan (drake curl) jika jantan',
      ],
      simplifiedShapesGuide: [
        { part: 'Bulu Tahan Air', shape: 'Tekstur Halus Mengkilat', note: 'Arsiran rapat dan lembut tanpa helai bulu kusut' },
        { part: 'Lamela Paruh', shape: 'Garis Gerigi Halus', note: 'Saringan mikro di pinggir bukaan paruh' },
        { part: 'Bayangan Air', shape: 'Siluet Terbalik Bergoyang', note: 'Refleksi cermin di bawah permukaan air hijau/biru' },
        { part: 'Tetes Air', shape: 'Lingkaran Kaca Berkilau', note: 'Butiran air yang tidak terserap bulu' },
      ],
      drawingGuidance: [
        'Sketsa postur bebek berenang dengan proporsi anatomi akurat.',
        'Gunakan arsiran halus terarah untuk menciptakan kesan bulu licin kedap air.',
        'Tambahkan detail butiran air di atas bulu dan riak ombak kolam.',
        'Gambarkan bayangan pantulan di bawah permukaan air dengan efek distorsi.',
      ],
      canvasTracingHint: 'Gambarkan efek pantulan bayangan bebek di air dan butiran air yang mengalir di bulunya.',
    },
  },

  siput: {
    EASY: {
      baseShapes: ['1 Lingkaran / Spiral Obat Nyamuk (Cangkang)', '1 Oval Memanjang di Lantai (Tubuh Berlendir)', '2 Antena Garis dengan Titik (Mata)'],
      keyDetails: [
        'Cangkang berbentuk spiral melingkar dari tengah ke luar',
        'Tubuh lunak pipih menempel di daun atau tanah',
        'Dua tentakel mata tegak di bagian kepala',
      ],
      simplifiedShapesGuide: [
        { part: 'Cangkang', shape: 'Lingkaran Spiral', note: 'Pusaran rumah cangkang dari kecil ke besar' },
        { part: 'Tubuh Kaki Lunak', shape: 'Oval Memanjang', note: 'Bagian bawah tubuh yang melata di tanah' },
        { part: 'Antena Mata', shape: 'Garis Berpentol', note: 'Tentakel mata yang menjulang penasaran' },
      ],
      drawingGuidance: [
        'Mulai dengan memutar garis spiral dari dalam ke luar untuk cangkang.',
        'Gambar tubuh lonjong lunak di bawah cangkang yang menempel di daun.',
        'Beri 2 antena dengan bulatan mata kecil di ujung atasnya.',
        'Beri senyum kecil di kepala depan siput.',
      ],
      canvasTracingHint: 'Pusaran garis SPIRAL cangkang adalah kunci utama mengenali bentuk siput.',
    },
    MEDIUM: {
      baseShapes: [
        'Pusaran Spiral Kerucut Berulir 3-4 Putaran',
        'Kaki Perut (Gastropoda Foot) Bergelombang',
        'Dua Pasang Tentakel (Tentakel Mata Panjang & Sensor Pendek)',
        'Bukaan Bibir Cangkang (Aperture)',
      ],
      keyDetails: [
        'Dua pasang tentakel: sepasang atas panjang untuk mata, sepasang bawah pendek untuk peraba',
        'Garis tumbuh melingkar (growth rings) pada dinding cangkang berulir',
        'Lipatan kerut pada tepi kaki perut yang sedang merayap',
        'Jejak lendir tipis berkilau di belakang tubuh siput',
      ],
      simplifiedShapesGuide: [
        { part: 'Ulir Cangkang', shape: 'Spiral Berlapis Bertingkat', note: 'Setiap putaran membesar secara konsentris' },
        { part: 'Aperture', shape: 'Bibir Cangkang Oval', note: 'Pintu keluar-masuk tubuh lunak siput' },
        { part: 'Kaki Perut', shape: 'Pita Berkerut Halus', note: 'Gelombang kontraksi otot saat merayap' },
        { part: 'Tentakel Ganda', shape: 'Dua Pasang Silinder Luwes', note: 'Sepasang panjang di atas dan sepasang pendek di bawah' },
      ],
      drawingGuidance: [
        'Buat putaran spiral cangkang dengan garis konsentris membesar teratur.',
        'Bentuk bukaan bibir cangkang tempat tubuh siput menjulur keluar.',
        'Gambarkan dua pasang tentakel dengan proporsi berbeda (panjang & pendek).',
        'Tarik garis kerut-kerut halus di sepanjang kaki perut yang menyentuh daun.',
      ],
      canvasTracingHint: 'Gambarkan 2 pasang tentakel (panjang dan pendek) serta lingkar bibir bukaan cangkang.',
    },
    HARD: {
      baseShapes: [
        'Geometri Spiral Logaritmik Cangkang (Fibonacci)',
        'Tekstur Garis Pertumbuhan Kalsium & Retakan Alami Cangkang',
        'Tekstur Kulit Bertotol Kerikil Halus (Granular Skin Tubercles)',
        'Efek Transparansi Lendir Kaca dan Kelembapan Basah Alami',
      ],
      keyDetails: [
        'Pola pita warna bergaris cokelat melingkar di sepanjang ulir cangkang',
        'Tekstur berbintil-bintil halus pada kulit lunak siput yang kenyal dan basah',
        'Pantulan cahaya mengkilap pada jejak lendir transparan di permukaan daun',
        'Bayangan cangkang jatuh ke punggung kaki siput mempertegas kedalaman 3D',
      ],
      simplifiedShapesGuide: [
        { part: 'Spiral Logaritmik', shape: 'Proporsi Fibonacci Alami', note: 'Kurvatur matematis sempurna rumah siput' },
        { part: 'Bintil Kulit', shape: 'Titik Tekstur Granular', note: 'Kulit gastropoda bertekstur kerikil lembut' },
        { part: 'Jejak Lendir', shape: 'Pita Transparan Mengkilap', note: 'Refleksi putih tipis di permukaan alas berjalan' },
        { part: 'Bayangan Tebal', shape: 'Arsir Ambient Occlusion', note: 'Bayangan di sela-sela lekukan cangkang dan tubuh' },
      ],
      drawingGuidance: [
        'Gambarkan geometri cangkang spiral logaritmik dengan garis ulir konsisten.',
        'Arsir variasi garis pertumbuhan cangkang dengan pola belang cokelat alami.',
        'Tambahkan tekstur berbintil-bintil halus pada seluruh permukaan kulit lunak.',
        'Beri efek kilap lendir basah di belakang tubuh siput dan urat daun di bawahnya.',
      ],
      canvasTracingHint: 'Gunakan teknik tekstur bintil-bintil kulit basah dan pola ulir spiral logaritmik alami.',
    },
  },
};
