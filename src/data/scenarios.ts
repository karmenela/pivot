export const scenarios = [
  // ─────────────────────────────────────────────
  // ACT 1: KURULUŞ
  // ─────────────────────────────────────────────
  {
    id: 1,
    text: "Tebrikler! Bir Melek Yatırımcı fikrini beğendi ve şirketin için 200.000$ yatırım yaptı. İlk iş olarak bir çalışma alanı ayarlaman gerekiyor. Ne yapacaksın?",
    options: [
      {
        id: 'a',
        text: "Plazadan lüks bir ofis tut",
        pros: "Prestij sağlar, motivasyonu artırır",
        cons: "Yüksek maliyet, gereksiz lüks",
        cost: 45000,
        nextScenarioId: 2,
        risk: 'low',
        feedback: "Lüks ofis motivasyonu artırdı ama sermayenden büyük bir pay yedi."
      },
      {
        id: 'b',
        text: "Garajda başla / Home Office",
        pros: "Sıfır maliyet, odaklanma",
        cons: "Profesyonel değil, sıkışık ortam",
        cost: 0,
        nextScenarioId: 2,
        risk: 'high',
        feedback: "Tasarruf ettin! Ancak ekibin biraz sıkışık çalışacak."
      }
    ],
    info: "Başlangıç aşamasındaki girişimler (Startup), 'Burn Rate'i (aylık nakit yakma hızı) düşük tutmalıdır. Lüks harcamalar iflasa sürükleyebilir."
  },

  {
    id: 2,
    text: "Ürün geliştirme aşamasına geldin. Yazılım ekibini nasıl kuracaksın?",
    options: [
      {
        id: 'a',
        text: "Deneyimli senior yazılımcılar işe al",
        pros: "Hızlı geliştirme, kaliteli kod",
        cons: "Çok yüksek maaş maliyeti",
        cost: 60000,
        nextScenarioId: 3,
        risk: 'low',
        feedback: "Ürün harika oldu ama bütçe sarsıldı. Hızlı yola geçiyorsun!"
      },
      {
        id: 'b',
        text: "Üniversite stajyerleri ve juniorlar ile başla",
        pros: "Düşük maliyet, dinamik ekip",
        cons: "Yavaş ilerleme, hata riski",
        cost: 10000,
        nextScenarioId: 5,
        risk: 'high',
        feedback: "Paran cebinde kaldı ama ürün gecikti. Zorlu bir süreç seni bekliyor."
      }
    ],
    info: "MVP (Minimum Viable Product) için mükemmeliyetçi olmak yerine, hızlı ve düşük maliyetli çıktılar bazen daha değerlidir."
  },

  // ─────────────────────────────────────────────
  // ACT 2A: HIZLI ÜRÜN YOLU (Senior team path)
  // ─────────────────────────────────────────────
  {
    id: 3,
    text: "Ürünün ilk versiyonu hazır! Şimdi pazarlama zamanı. İlk kullanıcıları nasıl kazanacaksın?",
    options: [
      {
        id: 'a',
        text: "Sosyal Medya Reklamlarına yüklen",
        pros: "Geniş kitle erişimi, hızlı dönüş",
        cons: "Reklam bütçesini tüketir",
        cost: 35000,
        nextScenarioId: 4,
        risk: 'medium',
        feedback: "Kullanıcı sayısı patladı! Büyük bir oyuncu dikkatini çektin."
      },
      {
        id: 'b',
        text: "İçerik & SEO ile organik büyü",
        pros: "Bedava, uzun vadeli trafik",
        cons: "Sonuç almak ay alabilir",
        cost: 0,
        nextScenarioId: 6,
        risk: 'high',
        feedback: "Yavaş ama sağlam büyüyorsun. Yatırımcılar fark etti."
      }
    ],
    info: "Müşteri Edinme Maliyeti (CAC), bir müşteriyi kazanmak için harcadığın paradır. Başlangıçta organik büyüme değerlidir."
  },

  {
    id: 4,
    text: "Büyük bir teknoloji şirketi seni satın almak istiyor! Teklif: 500.000$. Henüz erken aşamadasın.",
    options: [
      {
        id: 'a',
        text: "Teklifi kabul et ve şirketi sat",
        pros: "Garantili kazanç, stressiz hayat",
        cons: "Potansiyel büyümeden vazgeçiş",
        cost: -500000,
        nextScenarioId: 'END',
        risk: 'low',
        feedback: "500.000$ kazandın! Erken çıkış yaptın ama şirket bugün milyonlarca değer."
      },
      {
        id: 'b',
        text: "Reddet, büyümeye devam et",
        pros: "Unicorn olma şansı, kontrol sende",
        cons: "Daha fazla risk ve emek",
        cost: 0,
        nextScenarioId: 7,
        risk: 'high',
        feedback: "Cesurca! Büyüme yolculuğun devam ediyor."
      }
    ],
    info: "Exit, bir girişimcinin şirket hisselerini satarak projeden çıkış yapmasıdır. Doğru zamanlama kritiktir."
  },

  // ─────────────────────────────────────────────
  // ACT 2B: YAVAŞ ÜRÜN YOLU (Stajyer team path)
  // ─────────────────────────────────────────────
  {
    id: 5,
    text: "Ürün nihayet hazır! Ama tam bu sırada büyük bir rakip benzer ürünü piyasaya sürdü ve kullanıcıları kapıyor. Ne yapacaksın?",
    options: [
      {
        id: 'a',
        text: "Pivot et — farklı bir sektöre yönel",
        pros: "Rakipsiz alan, taze başlangıç",
        cons: "Tüm geliştirme süreci yeniden",
        cost: 25000,
        nextScenarioId: 6,
        risk: 'medium',
        feedback: "Cesur bir pivot! Yeni pazarda dikkat çekmeye başladın."
      },
      {
        id: 'b',
        text: "Aynı pazarda kal, fiyatı düşür ve rekabet et",
        pros: "Mevcut kodu kullanırsın",
        cons: "Fiyat savaşı sermayeni eritir",
        cost: 40000,
        nextScenarioId: 7,
        risk: 'high',
        feedback: "Fiyat savaşı pahalıya patladı ama bir kısım kullanıcı kazandın."
      }
    ],
    info: "Pivot; iş modelini veya ürünü, pazar şartlarına göre köklü biçimde değiştirmektir. Başarılı pivotlara örnek: Instagram (fotoğraf paylaşımına geçiş) ve Slack (oyun şirketinden mesajlaşmaya)."
  },

  // ─────────────────────────────────────────────
  // ACT 3: BÜYÜME & YATIRIMCI
  // ─────────────────────────────────────────────
  {
    id: 6,
    text: "Kullanıcılar ürünü seviyor ama büyüme yavaş. Bir risk sermayedarı (VC) Series A teklif ediyor: 300.000$ karşılığında şirketin %30'unu istiyor.",
    options: [
      {
        id: 'a',
        text: "Yatırımı kabul et",
        pros: "300.000$ nakit + VC bağlantıları",
        cons: "Hissenin %30'unu kaybedersin",
        cost: -300000,
        nextScenarioId: 7,
        risk: 'medium',
        feedback: "300.000$ kasaya girdi! Büyüme hızlanıyor ama şirketin artık tamamen senin değil."
      },
      {
        id: 'b',
        text: "Reddet, bootstrapped büyümeye devam et",
        pros: "Tam kontrol, hisse kaybı yok",
        cons: "Yavaş büyüme, rakipler geçebilir",
        cost: 0,
        nextScenarioId: 8,
        risk: 'high',
        feedback: "Özgürsün ama kaynakların kısıtlı. Verimlilik senin en büyük silahın."
      }
    ],
    info: "Venture Capital (VC), hızlı büyüme potansiyeli olan girişimlere yatırım yapan fonlardır. 'Dilution' (hisse seyreltmesi) yatırım alırken dikkat edilmesi gereken en kritik konudur."
  },

  {
    id: 7,
    text: "Şirket büyüyor ve uluslararası bir fırsat kapıda: MENA bölgesine (Orta Doğu & Kuzey Afrika) açılma şansın var. Bu devasa bir pazar.",
    options: [
      {
        id: 'a',
        text: "MENA'ya açıl, ofis kur ve yerel ekip oluştur",
        pros: "Devasa pazar, ilk mover avantajı",
        cons: "Yüksek maliyet, kültürel riskler",
        cost: 70000,
        nextScenarioId: 8,
        risk: 'high',
        feedback: "Dubai ofisi açıldı! Risk büyük ama ödülü de büyük olabilir."
      },
      {
        id: 'b',
        text: "Türkiye pazarında derinleş, uzmanlaş",
        pros: "Düşük maliyet, tanıdık pazar",
        cons: "Büyüme tavanı daha düşük",
        cost: 15000,
        nextScenarioId: 9,
        risk: 'low',
        feedback: "Türkiye'de lider konumuna geçiyorsun. Sağlam ama sınırlı bir büyüme."
      }
    ],
    info: "Uluslararası genişleme (Global Expansion), büyüme potansiyeli sunar ama yeni pazarların kültürel ve hukuki dinamiklerini anlamak zorunludur."
  },

  // ─────────────────────────────────────────────
  // ACT 4: KRİZ & DAYANIKLILIK
  // ─────────────────────────────────────────────
  {
    id: 8,
    text: "Ekonomik kriz vurdu! Enflasyon tırmandı, kullanıcıların %25'i aboneliğini iptal etti. Nakit akışın bozuldu. Acil karar vermelisin.",
    options: [
      {
        id: 'a',
        text: "Maliyetleri kes: 3 çalışanı üzgünerek işten çıkar",
        pros: "Aylık 8.000$ tasarruf, şirket hayatta kalır",
        cons: "Ekip morali çöküyor, teknik borç birikir",
        cost: -8000,
        nextScenarioId: 9,
        risk: 'medium',
        feedback: "Zor ama zorunlu bir karar. Şirket hayatta kaldı, ekip küçüldü."
      },
      {
        id: 'b',
        text: "Krizde yatırım yap: yeni özellik çıkar, rakipleri geç",
        pros: "Krizden güçlü çıkma şansı",
        cons: "Pahalı, başarısız olursa iflas",
        cost: 50000,
        nextScenarioId: 9,
        risk: 'high',
        feedback: "Riskli hamle! Piyasa toparlanırsa şirket sektör lideri olabilir."
      }
    ],
    info: "Runway (uçuş süresi), şirketin mevcut kasasıyla kaç ay daha ayakta kalabileceğini gösterir. Kriz dönemlerinde runway uzatmak hayatta kalmanın anahtarıdır."
  },

  {
    id: 9,
    text: "En yetenekli yazılım mimarın LinkedIn'den rakip firmadan teklif aldı ve ayrılmak istiyor. Kaybedersen ürün geliştirme 3 ay durabilir.",
    options: [
      {
        id: 'a',
        text: "Maaşını iki katına çıkar, teklifi geri çevirmesini sağla",
        pros: "Bilgi kaybı yok, süreklilik",
        cons: "Diğer çalışanlar da zam isteyebilir",
        cost: 20000,
        nextScenarioId: 10,
        risk: 'low',
        feedback: "Kaldı! Ama bu pahalıya patladı. Diğer çalışanlar da fark etti."
      },
      {
        id: 'b',
        text: "Ayrılmasına izin ver, yeni biri işe al",
        pros: "Taze bakış açısı, yeni enerji",
        cons: "Onboarding süreci, geçici yavaşlama",
        cost: 30000,
        nextScenarioId: 10,
        risk: 'medium',
        feedback: "Zor bir dönem ama yeni mimar harika fikirler getirdi."
      }
    ],
    info: "Yetenek yönetimi (Talent Retention), özellikle startuplarda kritiktir. Çalışanları elde tutmak için sadece para değil; misyon, hisse senedi (stock option) ve büyüme fırsatları da önemlidir."
  },

  // ─────────────────────────────────────────────
  // ACT 5: BÜYÜK KARAR — EXIT mi, UNICORN mu?
  // ─────────────────────────────────────────────
  {
    id: 10,
    text: "Şirketin artık sektörün tanınan isimlerinden biri. Global bir teknoloji devi 2.000.000$ ile satın almak istiyor. Aynı zamanda yatırımcıların IPO baskısı da var.",
    options: [
      {
        id: 'a',
        text: "2 milyon dolara şirketi sat (Exit)",
        pros: "Kesin kazanç, emeklilik senin",
        cons: "Şirketin başkasının eline geçiyor",
        cost: -2000000,
        nextScenarioId: 'END',
        risk: 'low',
        feedback: "2.000.000$! Girişimcilik yolculuğunu başarıyla tamamladın. Serüven bitti."
      },
      {
        id: 'b',
        text: "Halka arz ol (IPO) — Borsa'ya aç",
        pros: "Milyarlara ulaşma şansı, şirket senin kalır",
        cons: "Yoğun düzenleyici süreç, yüksek maliyet",
        cost: 80000,
        nextScenarioId: 'END',
        risk: 'high',
        feedback: "Borsa'ya açıldın! Unicorn yolculuğu devam ediyor. Hayallerinin peşindeydin ve buraya geldin!"
      }
    ],
    info: "IPO (Initial Public Offering / Halka Arz), şirketin hisselerini borsada halka satışa çıkarmasıdır. Bu süreç şirkete büyük sermaye kazandırır ama yoğun denetim ve şeffaflık gerektirir."
  }
];
