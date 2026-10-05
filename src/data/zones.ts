import { ZoneConfig, ZoneId } from '../types/game';
import faunaIkanImg from '../assets/images/fauna_ikan_zoom_1791119438038.jpg';
import faunaLumbaImg from '../assets/images/fauna_lumba_zoom_1791119449155.jpg';
import faunaKucingImg from '../assets/images/fauna_kucing_zoom_1791119459928.jpg';
import faunaBurungImg from '../assets/images/fauna_burung_zoom_1791119425558.jpg';
import faunaBebekImg from '../assets/images/fauna_bebek_zoom_1791119410239.jpg';
import faunaSiputImg from '../assets/images/fauna_siput_zoom_1791119397444.jpg';

export const ZONES_CONFIG: Record<ZoneId, ZoneConfig> = {
  ikan: {
    id: 'ikan',
    habitat: 'Akuarium',
    animal: 'Ikan',
    badge: 'Penjelajah Akuarium',
    badgeIcon: '🐟',
    subtitle: 'Temukan: Ikan',
    accentColor: '#0284C7',
    headerBg: 'from-cyan-900 via-sky-800 to-blue-950',
    mapCoords: { x: 22, y: 72 },
    greeting: 'Selamat datang di AKUARIUM!',
    observationPrompt: 'Coba amati ikan di sekitarmu.',
    referenceImage: faunaIkanImg,
    pdfLabel: 'Akuarium: Ikan',
    shapes: [
      {
        partName: 'Badan',
        correctShape: 'Oval',
        explanation: 'Badan ikan menyerupai bentuk OVAL yang memanjang dan pipih (streamline) untuk memudahkannya meluncur di air.',
      },
      {
        partName: 'Mata',
        correctShape: 'Lingkaran',
        explanation: 'Mata ikan berbentuk LINGKARAN sempurna dengan pupil gelap di tengahnya.',
      },
      {
        partName: 'Sirip',
        correctShape: 'Segitiga',
        explanation: 'Sirip punggung dan dada ikan memiliki dasar bentuk SEGITIGA dengan garis-garis tulang sirip halus.',
      },
      {
        partName: 'Ekor',
        correctShape: 'Segitiga',
        explanation: 'Ekor ikan melebar ke belakang seperti SEGITIGA atau kipas untuk mendorong laju renang.',
      },
      {
        partName: 'Mulut',
        correctShape: 'Segitiga',
        explanation: 'Bentuk mulut ikan menyerupai lipatan bukaan SEGITIGA kecil di ujung depan kepala.',
      },
    ],
    proportions: [
      {
        question: 'Bagian tubuh mana yang memiliki ukuran paling besar?',
        options: [
          { id: 'a', label: 'Sirip punggung ikan', isCorrect: false, explanation: 'Sirip adalah anggota gerak tambahan dengan proporsi lebih kecil.' },
          { id: 'b', label: 'Badan utama ikan', isCorrect: true, explanation: 'Tepat! Badan adalah bagian terbesar yang menjadi pondasi utama gambar.' },
          { id: 'c', label: 'Ekor ikan', isCorrect: false, explanation: 'Ekor penting sebagai pendorong, tetapi ukurannya lebih kecil dari badan.' },
        ],
      },
      {
        question: 'Bagaimana perbandingan panjang badan terhadap ekor?',
        options: [
          { id: 'a', label: 'Panjang badan sama persis dengan ekor', isCorrect: false, explanation: 'Jika sama persis, ikan akan terlihat tidak seimbang.' },
          { id: 'b', label: 'Ekor lebih panjang dari badan', isCorrect: false, explanation: 'Ekor biasanya hanya sekitar sepertiga atau seperempat dari total panjang tubuh.' },
          { id: 'c', label: 'Panjang badan sekitar 2 hingga 3 kali panjang ekor', isCorrect: true, explanation: 'Benar! Badan ikan jauh lebih panjang (sekitar 2-3x) dibandingkan bagian ekornya.' },
        ],
      },
      {
        question: 'Di manakah letak posisi mata pada anatomi ikan?',
        options: [
          { id: 'a', label: 'Di tengah-tengah badan', isCorrect: false, explanation: 'Mata tidak berada di tengah perut, melainkan di area kepala.' },
          { id: 'b', label: 'Di area depan kepala, agak ke atas mendekati punggung', isCorrect: true, explanation: 'Tepat sekali! Posisi mata di depan kepala bagian atas membantunya mengamati mangsa dan predator.' },
          { id: 'c', label: 'Di ujung ekor', isCorrect: false, explanation: 'Ekor berfungsi untuk kemudi renang, bukan organ penglihatan.' },
        ],
      },
      {
        question: 'Di manakah letak posisi sirip punggung (dorsal)?',
        options: [
          { id: 'a', label: 'Di bagian atas garis punggung badan', isCorrect: true, explanation: 'Benar! Sirip punggung tegak di atas garis lengkung tubuh ikan.' },
          { id: 'b', label: 'Di bawah perut dekat mulut', isCorrect: false, explanation: 'Itu adalah sirip dada/perut, bukan sirip punggung.' },
          { id: 'c', label: 'Tepat di ujung ekor', isCorrect: false, explanation: 'Sirip ekor disebut caudal fin, berbeda dengan sirip punggung.' },
        ],
      },
    ],
    features: {
      question: 'Bagian apa saja yang membuat ikan mudah dikenali sebagai ikan?',
      options: [
        { id: '1', label: 'Bentuk badan ramping (oval)', isCorrect: true },
        { id: '2', label: 'Sirip atas dan samping', isCorrect: true },
        { id: '3', label: 'Ekor kipas/segitiga', isCorrect: true },
        { id: '4', label: 'Mata bulat tanpa kelopak', isCorrect: true },
        { id: 'all', label: 'Semuanya adalah ciri khas ikan!', isCorrect: true },
      ],
      explanation: 'Hebat! Kombinasi badan lonjong meluncur, sirip segitiga penyeimbang, ekor kipas, dan sisik bergaris adalah ciri khas tak tergantikan.',
    },
    drawingSteps: [
      {
        step: 1,
        title: 'Tarik Bentuk Dasar Oval',
        instruction: 'Mulailah dengan membuat sketsa tipis bentuk OVAL horizontal untuk badan dan LINGKARAN kecil untuk mata.',
        tip: 'Gunakan pensil 2B dengan tekanan ringan agar mudah dihapus atau disesuaikan.',
      },
      {
        step: 2,
        title: 'Tambahkan Segitiga Ekor & Sirip',
        instruction: 'Tarik bentuk SEGITIGA di belakang oval untuk ekor, lalu tambahkan segitiga sirip di atas punggung dan bawah perut.',
        tip: 'Perhatikan proporsinya: tinggi sirip punggung sekitar sepertiga dari ketebalan badan ikan.',
      },
      {
        step: 3,
        title: 'Bentuk Garis Lengkung & Ciri Khas',
        instruction: 'Haluskan sambungan antara badan dan ekor, buat garis lengkung insang, garis mulut, dan pola garis-garis pada sirip.',
        tip: 'Ciri khas ikan tropis memiliki pola belang (garis putih berkontur) yang mengikuti lengkung badan.',
      },
      {
        step: 4,
        title: 'Tebalkan Garis Kontur & Arsir Sisik',
        instruction: 'Tebalkan garis siluet utama, bersihkan garis panduan bantu, lalu tambahkan arsiran sisik atau warna gradasi air.',
        tip: 'Sisik dapat digambar dengan pola lengkung "C" berulang yang teratur dan mengecil ke arah ekor.',
      },
    ],
  },

  lumba: {
    id: 'lumba',
    habitat: 'Dunia Laut',
    animal: 'Lumba-lumba',
    badge: 'Penjelajah Dunia Laut',
    badgeIcon: '🐬',
    subtitle: 'Temukan: Lumba-lumba',
    accentColor: '#0284C7',
    headerBg: 'from-blue-950 via-indigo-900 to-sky-900',
    mapCoords: { x: 50, y: 82 },
    greeting: 'Selamat datang di Dunia Laut!',
    observationPrompt: 'Amati lumba-lumba yang sedang melompat lincah.',
    referenceImage: faunaLumbaImg,
    pdfLabel: 'Dunia Laut: Lumba-lumba',
    shapes: [
      {
        partName: 'Kepala/Badan',
        correctShape: 'Oval',
        explanation: 'Badan lumba-lumba adalah bentuk OVAL memanjang yang melengkung aerodinamis (streamline).',
      },
      {
        partName: 'Mata',
        correctShape: 'Lingkaran',
        explanation: 'Mata lumba-lumba berbentuk LINGKARAN gelap yang terletak di sisi samping dekat garis mulut.',
      },
      {
        partName: 'Sirip Punggung',
        correctShape: 'Segitiga',
        explanation: 'Sirip punggungnya (dorsal fin) berbentuk SEGITIGA yang melengkung anggun ke arah belakang.',
      },
      {
        partName: 'Sirip Samping',
        correctShape: 'Segitiga',
        explanation: 'Sirip dada (flipper) berbentuk SEGITIGA pipih membulat di bagian ujungnya.',
      },
      {
        partName: 'Ekor',
        correctShape: 'Segitiga',
        explanation: 'Ekor lumba-lumba (fluke) mendatar horizontal menyerupai gabungan dua SEGITIGA atau bulan sabit.',
      },
    ],
    proportions: [
      {
        question: 'Bagaimana perbandingan panjang moncong lumba-lumba terhadap badannya?',
        options: [
          { id: 'a', label: 'Moncong sama panjang dengan setengah badan', isCorrect: false, explanation: 'Itu terlalu panjang, mirip paruh burung camar.' },
          { id: 'b', label: 'Moncong relatif pendek dan ramping menyatu ke dahi', isCorrect: true, explanation: 'Benar! Moncong (beak) lumba-lumba tidak terlalu panjang dan menyatu halus ke dahi melengkungnya.' },
          { id: 'c', label: 'Lumba-lumba tidak memiliki moncong', isCorrect: false, explanation: 'Lumba-lumba memiliki moncong khas dengan garis senyum.' },
        ],
      },
      {
        question: 'Bagian tubuh mana yang paling dominan dan terpanjang?',
        options: [
          { id: 'a', label: 'Badan memanjang yang melengkung', isCorrect: true, explanation: 'Tepat! Badan memanjang adalah fokus proporsi utama sebelum menggambar sirip.' },
          { id: 'b', label: 'Sirip samping', isCorrect: false, explanation: 'Sirip samping ukurannya jauh lebih kecil dari tubuh.' },
          { id: 'c', label: 'Sirip punggung', isCorrect: false, explanation: 'Sirip punggung berfungsi sebagai penstabil arah di tengah tubuh.' },
        ],
      },
      {
        question: 'Di manakah letak sirip punggung lumba-lumba?',
        options: [
          { id: 'a', label: 'Di atas kepala', isCorrect: false, explanation: 'Di atas kepala terdapat lubang pernapasan (blowhole), bukan sirip.' },
          { id: 'b', label: 'Di pangkal ekor', isCorrect: false, explanation: 'Pangkal ekor bebas dari sirip agar leluasa mengibaskan ekor.' },
          { id: 'c', label: 'Tepat di tengah punggung melengkung ke belakang', isCorrect: true, explanation: 'Betul sekali! Sirip punggung terletak di tengah-tengah kurva punggung.' },
        ],
      },
      {
        question: 'Bagaimana orientasi kibasan ekor lumba-lumba saat berenang dibanding ikan biasa?',
        options: [
          { id: 'a', label: 'Ekornya tegak vertikal dan bergerak kiri-kanan', isCorrect: false, explanation: 'Itu adalah cara berenang ikan biasa (pisces), bukan mamalia lumba-lumba.' },
          { id: 'b', label: 'Ekor lumba-lumba mendatar (horizontal) dan bergerak naik-turun', isCorrect: true, explanation: 'Luar biasa! Sebagai mamalia laut, ekor lumba-lumba pipih horizontal dan mendayung naik-turun.' },
        ],
      },
    ],
    features: {
      question: 'Ciri khas unik apa yang membuat lumba-lumba tampak ramah dan mudah dikenali?',
      options: [
        { id: '1', label: 'Bentuk moncong dengan garis bibir melengkung tersenyum', isCorrect: true },
        { id: '2', label: 'Sirip punggung berbentuk segitiga melengkung ke belakang', isCorrect: true },
        { id: '3', label: 'Kulit halus mengilap dengan gradasi warna abu-abu kebiruan dan perut putih', isCorrect: true },
        { id: 'all', label: 'Semua ciri di atas!', isCorrect: true },
      ],
      explanation: 'Tepat sekali! Bentuk tubuh kurva aerodinamis, sirip melengkung, dan lengkung bibir tersenyum adalah identitas visual lumba-lumba.',
    },
    drawingSteps: [
      {
        step: 1,
        title: 'Tarik Garis Lengkung S & Oval Tubuh',
        instruction: 'Buat garis kurva lembut seperti huruf "S" memanjang untuk alur punggung yang sedang melompat, lalu buat bentuk OVAL lonjong mengikutinya.',
        tip: 'Jaga kurva tetap luwes agar gerakan melompat lumba-lumba terasa dinamis dan hidup.',
      },
      {
        step: 2,
        title: 'Bentuk Moncong & Sirip Segitiga',
        instruction: 'Tarik moncong segitiga membulat di kepala, tambahkan sirip punggung segitiga melengkung di tengah, dan flipper di dada.',
        tip: 'Sirip punggung selalu melengkung condong ke arah ekor.',
      },
      {
        step: 3,
        title: 'Gambarkan Ekor Bulan Sabit & Mata',
        instruction: 'Buat ekor mendatar mirip dua segitiga yang bertemu di pangkal, lalu letakkan lingkaran mata di dekat sudut bibir senyum.',
        tip: 'Garis perut putih di bawah tubuh memberikan kesan dimensi dan volume tiga dimensi.',
      },
      {
        step: 4,
        title: 'Finishing & Efek Percikan Air',
        instruction: 'Tebalkan garis siluet bersih, tambahkan arsiran lembut pada bagian punggung atas, dan buat garis percikan air laut.',
        tip: 'Biarkan area perut dan pantulan cahaya tetap terang untuk menghasilkan efek basah berkilau.',
      },
    ],
  },

  kucing: {
    id: 'kucing',
    habitat: 'Zona Darat',
    animal: 'Kucing',
    badge: 'Penjelajah Zona Darat',
    badgeIcon: '🐱',
    subtitle: 'Temukan: Kucing',
    accentColor: '#D97706',
    headerBg: 'from-amber-900 via-amber-700 to-emerald-900',
    mapCoords: { x: 75, y: 65 },
    greeting: 'Selamat datang di Zona Darat!',
    observationPrompt: 'Amati bentuk tubuh kucing yang sedang duduk santai.',
    referenceImage: faunaKucingImg,
    pdfLabel: 'Zona Darat: Kucing',
    shapes: [
      {
        partName: 'Kepala',
        correctShape: 'Lingkaran',
        explanation: 'Kepala kucing tampak dari depan didasari oleh bentuk LINGKARAN yang seimbang dan lucu.',
      },
      {
        partName: 'Badan',
        correctShape: 'Oval',
        explanation: 'Badan kucing yang sedang duduk membentuk siluet OVAL tegak atau sedikit miring.',
      },
      {
        partName: 'Mata',
        correctShape: 'Oval',
        explanation: 'Mata kucing berbentuk OVAL dengan sudut runcing di kedua sisinya dan pupil vertikal.',
      },
      {
        partName: 'Telinga',
        correctShape: 'Segitiga',
        explanation: 'Telinga kucing berdiri tegak membentuk SEGITIGA runcing di bagian atas kepala.',
      },
      {
        partName: 'Kaki',
        correctShape: 'Persegi panjang',
        explanation: 'Kaki depan kucing tegak lurus menyerupai PERSEGI PANJANG dengan bantalan cakar membulat di bawahnya.',
      },
      {
        partName: 'Ekor',
        correctShape: 'Persegi panjang',
        explanation: 'Ekor kucing berbentuk PERSEGI PANJANG panjang lentur yang melengkung indah.',
      },
    ],
    proportions: [
      {
        question: 'Berapa perbandingan ukuran kepala kucing dibanding seluruh badannya?',
        options: [
          { id: 'a', label: 'Kepala lebih besar dari badannya', isCorrect: false, explanation: 'Jika kepala lebih besar dari badan, itu gaya karikatur super cilik/chibi.' },
          { id: 'b', label: 'Kepala hanya 1/10 dari badan', isCorrect: false, explanation: 'Itu terlalu kecil, tidak proporsional untuk kucing.' },
          { id: 'c', label: 'Kepala sekitar 1/3 (sepertiga) dari panjang badan', isCorrect: true, explanation: 'Benar! Proporsi kepala kucing dewasa sekitar sepertiga panjang tubuhnya.' },
        ],
      },
      {
        question: 'Di manakah letak posisi kedua telinga kucing?',
        options: [
          { id: 'a', label: 'Di samping pipi dekat leher', isCorrect: false, explanation: 'Itu posisi telinga manusia, bukan kucing.' },
          { id: 'b', label: 'Di kedua sisi atas tempurung kepala', isCorrect: true, explanation: 'Tepat sekali! Telinga tegak di atas kepala menghadap ke depan untuk mendeteksi bunyi.' },
          { id: 'c', label: 'Di tengah dahi', isCorrect: false, explanation: 'Telinga kucing terpisah di sisi kiri dan kanan kepala.' },
        ],
      },
      {
        question: 'Bagaimana perbandingan panjang kaki depan saat kucing duduk tegak?',
        options: [
          { id: 'a', label: 'Kaki depan menopang dada tegak lurus ke tanah', isCorrect: true, explanation: 'Bagus sekali! Kaki depan tampak seperti dua tiang silindris sejajar yang kokoh.' },
          { id: 'b', label: 'Kaki depan melipat ke dalam kepala', isCorrect: false, explanation: 'Saat duduk tegak, kaki depan berpijak lurus di depan dada.' },
        ],
      },
      {
        question: 'Bagaimana kelenturan ekor kucing saat beristirahat?',
        options: [
          { id: 'a', label: 'Ekor kaku seperti kayu lurus', isCorrect: false, explanation: 'Ekor kucing memiliki banyak ruas tulang sehingga selalu melengkung dinamis.' },
          { id: 'b', label: 'Ekor lentur melingkar di samping badan atau menjuntai santai', isCorrect: true, explanation: 'Tepat! Garis ekor yang lentur memberikan kesan rileks dan hidup pada gambar.' },
        ],
      },
    ],
    features: {
      question: 'Ciri khas visual apa yang membuat gambar kucing langsung dikenali?',
      options: [
        { id: '1', label: 'Telinga segitiga tegak & kumis panjang di pipi', isCorrect: true },
        { id: '2', label: 'Mata lentik dengan pupil yang ekspresif', isCorrect: true },
        { id: '3', label: 'Ekor panjang yang lentur', isCorrect: true },
        { id: 'all', label: 'Semua ciri tersebut!', isCorrect: true },
      ],
      explanation: 'Hebat! Telinga segitiga, kumis tipis di pipi, dan ekor lentur adalah kunci karakter visual kucing.',
    },
    drawingSteps: [
      {
        step: 1,
        title: 'Gambar Lingkaran Kepala & Oval Badan',
        instruction: 'Tarik LINGKARAN untuk kepala di atas, lalu buat OVAL lebih besar di bawahnya agak miring untuk badan.',
        tip: 'Jarak antara kepala dan badan jangan terlalu jauh agar leher tidak tampak kepanjangan.',
      },
      {
        step: 2,
        title: 'Tambahkan Segitiga Telinga & Kaki',
        instruction: 'Tarik dua SEGITIGA lancip di atas kepala, lalu buat dua silinder/persegi panjang kaki depan yang bertumpu ke bawah.',
        tip: 'Beri sedikit lekukan pada telinga luar agar tampak bervolume.',
      },
      {
        step: 3,
        title: 'Buat Mata Lentik, Hidung & Ekor',
        instruction: 'Letakkan mata oval di garis tengah wajah, hidung segitiga kecil terbalik, mulut "W", dan ekor melengkung di samping badan.',
        tip: 'Tarik 3 garis kumis tipis di setiap pipi menggunakan goresan pensil yang cepat dan mantap.',
      },
      {
        step: 4,
        title: 'Tekstur Bulu Halus & Bayangan',
        instruction: 'Ganti garis kontur keras dengan arsiran bulu pendek halus di pipi, dada, dan ekor.',
        tip: 'Tambahkan bayangan jatuh di bawah telapak kaki agar kucing tampak menjejak di lantai.',
      },
    ],
  },

  burung: {
    id: 'burung',
    habitat: 'Taman Burung',
    animal: 'Burung',
    badge: 'Penjelajah Taman Burung',
    badgeIcon: '🐦',
    subtitle: 'Temukan: Burung',
    accentColor: '#06B6D4',
    headerBg: 'from-emerald-950 via-teal-900 to-sky-950',
    mapCoords: { x: 75, y: 25 },
    greeting: 'Selamat datang di Taman Burung!',
    observationPrompt: 'Amati burung yang bertengger gagah di ranting.',
    referenceImage: faunaBurungImg,
    pdfLabel: 'Taman Burung: Burung',
    shapes: [
      {
        partName: 'Kepala',
        correctShape: 'Lingkaran',
        explanation: 'Kepala burung berukuran proporsional dengan bentuk dasar LINGKARAN bulat.',
      },
      {
        partName: 'Badan',
        correctShape: 'Oval',
        explanation: 'Badan burung membentuk siluet OVAL miring mengikuti arah dada dan punggung.',
      },
      {
        partName: 'Mata',
        correctShape: 'Lingkaran',
        explanation: 'Mata burung bulat LINGKARAN jernih dengan titik kilau cahaya putih.',
      },
      {
        partName: 'Paruh',
        correctShape: 'Segitiga',
        explanation: 'Paruh burung pematuk serangga/biji berbentuk SEGITIGA runcing ke depan.',
      },
      {
        partName: 'Sayap',
        correctShape: 'Oval',
        explanation: 'Saat terlipat di samping tubuh, sayap membentuk OVAL melengkung seperti tetesan air.',
      },
      {
        partName: 'Kaki',
        correctShape: 'Persegi panjang',
        explanation: 'Kaki burung kecil ramping menyerupai garis atau PERSEGI PANJANG tipis mencengkeram dahan.',
      },
      {
        partName: 'Ekor',
        correctShape: 'Persegi panjang',
        explanation: 'Bulu ekor berjajar lurus memanjang ke belakang membentuk susunan PERSEGI PANJANG atau trapesium.',
      },
    ],
    proportions: [
      {
        question: 'Bagaimana perbandingan ukuran kepala burung dibanding badannya?',
        options: [
          { id: 'a', label: 'Kepala lebih besar dari seluruh tubuhnya', isCorrect: false, explanation: 'Jika kepala terlalu besar, burung tidak akan seimbang saat bertengger.' },
          { id: 'b', label: 'Kepala lebih kecil dan menyatu ramping ke badan oval', isCorrect: true, explanation: 'Benar! Badan oval burung sekitar 2 sampai 3 kali volume kepalanya.' },
        ],
      },
      {
        question: 'Seberapa panjang sayap burung saat terlipat di samping badan?',
        options: [
          { id: 'a', label: 'Hampir menutupi sepanjang punggung hingga pangkal ekor', isCorrect: true, explanation: 'Tepat sekali! Sayap yang terlipat melindungi sebagian besar area samping tubuh.' },
          { id: 'b', label: 'Hanya menempel di bawah paruh', isCorrect: false, explanation: 'Sayap menempel di sendi bahu dada, membentang ke belakang.' },
        ],
      },
      {
        question: 'Bagaimana ketebalan kaki burung dibanding tubuhnya?',
        options: [
          { id: 'a', label: 'Sangat tebal dan gemuk seperti kaki gajah', isCorrect: false, explanation: 'Kaki burung ramping dan lincah.' },
          { id: 'b', label: 'Sangat ramping namun kuat dengan cakar mencengkeram ranting', isCorrect: true, explanation: 'Bagus! Tulang kaki burung berongga dan ramping agar ringan saat terbang.' },
        ],
      },
      {
        question: 'Bagaimana arah kemiringan tubuh burung saat bertengger di ranting?',
        options: [
          { id: 'a', label: 'Tegak lurus 90° seperti tiang bendera', isCorrect: false, explanation: 'Posisi miring memberikan kesan burung sedang waspada dan hidup.' },
          { id: 'b', label: 'Tubuh miring membentuk sudut sekitar 30° hingga 45°', isCorrect: true, explanation: 'Betul! Kemiringan ini menjaga pusat massa burung tepat di atas titik cengkeraman kaki.' },
        ],
      },
    ],
    features: {
      question: 'Bagian apa saja yang menjadi ciri khas utama burung?',
      options: [
        { id: '1', label: 'Paruh runcing tanpa gigi', isCorrect: true },
        { id: '2', label: 'Sayap berbulu dengan arah susunan teratur', isCorrect: true },
        { id: '3', label: 'Kaki bercakar untuk mencengkeram', isCorrect: true },
        { id: 'all', label: 'Semua jawaban benar!', isCorrect: true },
      ],
      explanation: 'Sempurna! Paruh, susunan bulu sayap, ekor bertingkat, dan cakar adalah ciri khas burung.',
    },
    drawingSteps: [
      {
        step: 1,
        title: 'Tentukan Kemiringan & Dua Bentuk Dasar',
        instruction: 'Tarik garis miring 45° sebagai panduan ranting, lalu buat LINGKARAN kepala dan OVAL badan bertumpu di atasnya.',
        tip: 'Jaga proporsi lingkaran kepala sekitar 1/2 dari tinggi oval badan.',
      },
      {
        step: 2,
        title: 'Tambahkan Paruh Segitiga & Ekor',
        instruction: 'Tarik SEGITIGA runcing di depan kepala untuk paruh, dan buat bulu ekor memanjang di belakang bawah badan.',
        tip: 'Garis paruh tengah harus sejajar lurus mengarah ke tengah lingkaran mata.',
      },
      {
        step: 3,
        title: 'Bentuk Sayap Lipat & Garis Bulu',
        instruction: 'Gambarkan sayap oval di samping tubuh dengan ujung melancip ke arah ekor, lalu beri garis lengkung pola helai bulu primer.',
        tip: 'Goreskan garis bulu secara searah dari pangkal bahu menuju ke ujung sayap.',
      },
      {
        step: 4,
        title: 'Detail Mata, Cakar & Ranting Kayu',
        instruction: 'Beri lingkaran mata dengan kilau putih, gambar 3 cakar depan melingkari ranting kayu bertekstur kasar, lalu pertegas garis kontur.',
        tip: 'Beri arsiran gradasi lebih gelap di bawah perut untuk memberi kesan bulat bervolume.',
      },
    ],
  },

  bebek: {
    id: 'bebek',
    habitat: 'Kolam Bebek',
    animal: 'Bebek',
    badge: 'Penjelajah Kolam Bebek',
    badgeIcon: '🦆',
    subtitle: 'Temukan: Bebek',
    accentColor: '#CA8A04',
    headerBg: 'from-teal-950 via-emerald-900 to-amber-950',
    mapCoords: { x: 50, y: 32 },
    greeting: 'Selamat datang di Kolam Bebek!',
    observationPrompt: 'Amati bebek yang berenang anggun di atas air.',
    referenceImage: faunaBebekImg,
    pdfLabel: 'Kolam Bebek: Bebek',
    shapes: [
      {
        partName: 'Kepala',
        correctShape: 'Lingkaran',
        explanation: 'Kepala bebek berbentuk LINGKARAN bulat yang menyambung anggun ke lehernya.',
      },
      {
        partName: 'Badan',
        correctShape: 'Oval',
        explanation: 'Badan bebek mengapung menyerupai lambung perahu dengan bentuk dasar OVAL memanjang.',
      },
      {
        partName: 'Mata',
        correctShape: 'Lingkaran',
        explanation: 'Mata bebek berbentuk LINGKARAN kecil berwarna hitam yang diletakkan di sisi atas kepala.',
      },
      {
        partName: 'Paruh',
        correctShape: 'Persegi panjang',
        explanation: 'Paruh bebek khas pipih dan mendatar menyerupai PERSEGI PANJANG membulat (spatula).',
      },
      {
        partName: 'Sayap',
        correctShape: 'Oval',
        explanation: 'Sayap bebek terlipat rapi di lambung tubuh membentuk OVAL menyatu.',
      },
      {
        partName: 'Kaki',
        correctShape: 'Segitiga',
        explanation: 'Kaki bebek memiliki selaput renang berbentuk segitiga kipas untuk mendayung di air.',
      },
      {
        partName: 'Ekor',
        correctShape: 'Segitiga',
        explanation: 'Bulu ekor bebek meruncing dan menjungkit ke atas membentuk SEGITIGA kecil di belakang.',
      },
    ],
    proportions: [
      {
        question: 'Bagaimana perbandingan bentuk badan bebek dengan bentuk perahu?',
        options: [
          { id: 'a', label: 'Badan bebek tipis seperti selembar kertas', isCorrect: false, explanation: 'Badan bebek gempal dan berisi bulu tebal.' },
          { id: 'b', label: 'Badan bebek mengapung melebar dan stabil seperti perahu kecil', isCorrect: true, explanation: 'Benar! Badan bebek berongga dan memiliki lapisan lemak lilin sehingga terapung anggun bagai lambung perahu.' },
        ],
      },
      {
        question: 'Bagaimana bentuk dan ukuran paruh bebek dibanding paruh burung penyanyi?',
        options: [
          { id: 'a', label: 'Paruh bebek lebih lebar, pipih mendatar, dan membulat di ujung', isCorrect: true, explanation: 'Tepat! Bentuk pipih ini berguna menyaring lumut, serangga air, dan biji-bijian.' },
          { id: 'b', label: 'Paruh bebek sangat tajam melengkung seperti elang', isCorrect: false, explanation: 'Elang adalah pemangsa daging, sedangkan bebek memiliki paruh pipih penyaring.' },
        ],
      },
      {
        question: 'Ke manakah arah ujung ekor bebek saat sedang mengapung di kolam?',
        options: [
          { id: 'a', label: 'Tenggelam lurus vertikal ke dasar lumpur', isCorrect: false, explanation: 'Ekor berada di atas permukaan air.' },
          { id: 'b', label: 'Menjungkit miring ke arah atas', isCorrect: true, explanation: 'Bagus sekali! Ekor bebek khas menjungkit ke atas di belakang badannya.' },
        ],
      },
      {
        question: 'Bagaimana leher bebek menyambungkan kepala dengan badannya?',
        options: [
          { id: 'a', label: 'Leher kaku tanpa sendi', isCorrect: false, explanation: 'Leher unggas air sangat fleksibel saat mencari makan.' },
          { id: 'b', label: 'Leher berbentuk kurva lentur lembut menyerupai huruf "S" halus', isCorrect: true, explanation: 'Betul! Kurva leher ini memberikan kesan luwes dan anggun pada siluet bebek.' },
        ],
      },
    ],
    features: {
      question: 'Ciri khas visual terpenting apa yang membedakan bebek dari unggas lain?',
      options: [
        { id: '1', label: 'Paruh pipih lebar berwarna kuning/oranye', isCorrect: true },
        { id: '2', label: 'Badan montok mengapung dan ekor menjungkit', isCorrect: true },
        { id: '3', label: 'Kaki berselaput renang di bawah air', isCorrect: true },
        { id: 'all', label: 'Semua ciri tersebut!', isCorrect: true },
      ],
      explanation: 'Tepat! Paruh pipih mendatar, badan perahu, dan ekor menjungkit adalah ciri khas bebek.',
    },
    drawingSteps: [
      {
        step: 1,
        title: 'Gambar Oval Badan & Lingkaran Kepala',
        instruction: 'Tarik OVAL horizontal mendatar untuk badan yang mengapung, lalu buat LINGKARAN kepala di bagian depan agak ke atas.',
        tip: 'Buat garis dasar datar di bawah oval untuk menggambarkan batas permukaan air.',
      },
      {
        step: 2,
        title: 'Hubungkan dengan Leher & Tarik Paruh Pipih',
        instruction: 'Tarik dua garis lengkung menyambungkan kepala ke dada dan punggung, lalu buat PERSEGI PANJANG membulat untuk paruh khas bebek.',
        tip: 'Paruh bebek menempel pas di bawah dahi dan sedikit mendatar.',
      },
      {
        step: 3,
        title: 'Tambahkan Sayap & Ekor Menjungkit',
        instruction: 'Gambarkan sayap melengkung di samping tubuh dan buat SEGITIGA ekor yang menjungkit ke atas di bagian belakang.',
        tip: 'Berikan riak gelombang air melingkar di sekeliling badan bebek.',
      },
      {
        step: 4,
        title: 'Tebalkan Kontur & Beri Warna Hangat',
        instruction: 'Tebalkan garis luar bebek, buat pupil mata jernih, lalu beri sentuhan warna kuning cerah pada paruh dan bulu putih/krem.',
        tip: 'Goreskan garis bayangan biru lembut di atas permukaan air di bawah perut bebek.',
      },
    ],
  },

  siput: {
    id: 'siput',
    habitat: 'Taman Mini',
    animal: 'Siput',
    badge: 'Penjelajah Taman Mini',
    badgeIcon: '🐌',
    subtitle: 'Temukan: Siput',
    accentColor: '#65A30D',
    headerBg: 'from-stone-900 via-emerald-950 to-amber-950',
    mapCoords: { x: 25, y: 22 },
    greeting: 'Selamat datang di Taman Mini!',
    observationPrompt: 'Coba amati siput dari bentuk yang paling sederhana.',
    referenceImage: faunaSiputImg,
    pdfLabel: 'Taman Mini: Siput',
    shapes: [
      {
        partName: 'Cangkang',
        correctShape: 'Lingkaran',
        explanation: 'Cangkang pelindung siput didasari bentuk LINGKARAN besar dengan garis pola spiral memutar ke dalam.',
      },
      {
        partName: 'Tubuh',
        correctShape: 'Oval',
        explanation: 'Tubuh lunak siput (kaki perut) mendatar di atas daun menyerupai OVAL panjang yang lentur.',
      },
      {
        partName: 'Kepala',
        correctShape: 'Lingkaran',
        explanation: 'Kepala siput membulat LINGKARAN kecil di bagian ujung depan tubuhnya.',
      },
      {
        partName: 'Tentakel/Mata',
        correctShape: 'Lingkaran',
        explanation: 'Sepasang tentakel mata menjulang ke atas dengan bulatan LINGKARAN kecil mata di ujungnya.',
      },
    ],
    proportions: [
      {
        question: 'Berapa ukuran cangkang dibanding seluruh tubuh siput yang tampak?',
        options: [
          { id: 'a', label: 'Cangkang sangat kecil seperti biji pasir', isCorrect: false, explanation: 'Cangkang siput cukup besar untuk memuat seluruh tubuhnya saat bersembunyi.' },
          { id: 'b', label: 'Cangkang mengambil porsi terbesar di tengah punggung siput', isCorrect: true, explanation: 'Benar! Cangkang bulat adalah bagian paling dominan yang melindungi organ dalam siput.' },
        ],
      },
      {
        question: 'Di manakah letak sepasang tentakel pembawa mata siput?',
        options: [
          { id: 'a', label: 'Tegak menjulang di bagian atas kepala', isCorrect: true, explanation: 'Tepat sekali! Tentakel mata menjulang tinggi ke atas agar dapat melihat sekeliling dengan fleksibel.' },
          { id: 'b', label: 'Di ujung ekor belakang', isCorrect: false, explanation: 'Tentakel berada di depan kepala.' },
        ],
      },
      {
        question: 'Bagaimana bentuk bagian bawah tubuh siput saat merayap di daun?',
        options: [
          { id: 'a', label: 'Memiliki 8 kaki berbulu', isCorrect: false, explanation: 'Itu adalah laba-laba, bukan siput yang bergerak dengan otot perut.' },
          { id: 'b', label: 'Pipih rata menempel pada permukaan daun mengikuti lekukan bidang', isCorrect: true, explanation: 'Hebat! Kaki perut siput berotot lentur dan mengeluarkan lendir perekat.' },
        ],
      },
      {
        question: 'Bagaimana perbandingan arah spiral pada cangkang siput?',
        options: [
          { id: 'a', label: 'Berbentuk garis lurus sejajar seperti penggaris', isCorrect: false, explanation: 'Pola cangkang siput selalu berbentuk kurva spiral logaritmik.' },
          { id: 'b', label: 'Spiral berputar dari titik pusat tengah dan membesar ke arah luar', isCorrect: true, explanation: 'Luar biasa! Ini adalah contoh proporsi geometri alami (golden spiral) dalam Seni Rupa.' },
        ],
      },
    ],
    features: {
      question: 'Bagian apa yang paling mudah dikenali dari seekor siput?',
      options: [
        { id: '1', label: 'Cangkang bergaris spiral melingkar', isCorrect: true },
        { id: '2', label: 'Sepasang tentakel mata yang lentur di kepala', isCorrect: true },
        { id: '3', label: 'Tubuh lunak berlendir yang merayap di daun', isCorrect: true },
        { id: 'all', label: 'Semua benar!', isCorrect: true },
      ],
      explanation: 'Benar sekali! Cangkang rumah spiral dan tentakel mata adalah tanda pengenal utama siput.',
    },
    drawingSteps: [
      {
        step: 1,
        title: 'Gambar Lingkaran Cangkang & Spiral',
        instruction: 'Buat LINGKARAN besar di tengah bidang gambar, lalu tarik garis lengkung SPIRAL memutar mulai dari titik pusat hingga tepi cangkang.',
        tip: 'Jaga jarak putaran spiral semakin membesar ke arah luar secara ritmis.',
      },
      {
        step: 2,
        title: 'Tarik Garis Tubuh Lunak di Bawah Cangkang',
        instruction: 'Tarik garis OVAL mendatar di bawah cangkang yang memanjang ke depan untuk kepala dan meruncing halus di belakang untuk ekor.',
        tip: 'Garis bawah tubuh harus rata mengikuti permukaan daun tempat ia bertumpu.',
      },
      {
        step: 3,
        title: 'Tambahkan Sepasang Tentakel Mata',
        instruction: 'Tarik dua garis melengkung tegak di atas kepala, lalu beri bulatan LINGKARAN kecil di setiap ujung tentakel untuk bola mata.',
        tip: 'Buat satu tentakel sedikit lebih condong agar siluet tampak alami dan tidak kaku.',
      },
      {
        step: 4,
        title: 'Beri Tekstur Garis Cangkang & Daun Hijau',
        instruction: 'Tambahkan garis-garis rusuk melintang di sepanjang spiral cangkang, lalu gambar daun berurat di bawah tubuh siput.',
        tip: 'Beri kilau putih pada bola mata dan cangkang untuk memberikan efek permukaan lembap.',
      },
    ],
  },
};
