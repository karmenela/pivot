export const scenarios = [
  {
    id: 1,
    text: "Tebrikler! Bir Melek Yatırımcı fikrini beğendi ve şirketin için 200.000$ yatırım yaptı. İlk iş olarak bir çalışma alanı ayarlaman gerekiyor. Ne yapacaksın?",
    options: [
      { 
        id: 'a', 
        text: "Plazadan lüks bir ofis tut (Prestij sağlar ama çok pahalı)", 
        cost: 20000, 
        nextScenarioId: 2, 
        risk: 'low',
        feedback: "Lüks ofis motivasyonu artırdı ama sermayenden büyük bir pay yedi."
      },
      { 
        id: 'b', 
        text: "Garajda başla / Home Office (Maliyet yok)", 
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
        text: "Deneyimli senior yazılımcılar işe al (Hızlı ve kaliteli)", 
        cost: 15000, 
        nextScenarioId: 3, 
        risk: 'low',
        feedback: "Ürün harika oldu ama bütçe sarsıldı."
      },
      { 
        id: 'b', 
        text: "Üniversite stajyerleri ve juniorlar ile başla (Ucuz)", 
        cost: 3000, 
        nextScenarioId: 3, 
        risk: 'high',
        feedback: "Ürün biraz gecikti ve hatalar çıktı ama paran cebinde kaldı."
      }
    ],
    info: "MVP (Minimum Viable Product) için mükemmeliyetçi olmak yerine, hızlı ve düşük maliyetli çıktılar bazen daha değerlidir."
  },
  {
    id: 3,
    text: "Ürünün ilk versiyonu hazır! Şimdi pazarlama zamanı.",
    options: [
      { 
        id: 'a', 
        text: "Sosyal Medya Reklamlarına yüklen (Geniş kitle)", 
        cost: 10000, 
        nextScenarioId: 4, 
        risk: 'medium',
        feedback: "Kullanıcı sayısı arttı!"
      },
      { 
        id: 'b', 
        text: "Sadece arkadaşlar ve tanıdıklara duyur (Word of Mouth)", 
        cost: 0, 
        nextScenarioId: 4, 
        risk: 'high',
        feedback: "Büyüme yavaş ama sağlam adımlarla ilerliyorsun."
      }
    ],
    info: "Müşteri Edinme Maliyeti (CAC), bir müşteriyi kazanmak için harcadığın paradır. Başlangıçta organik büyüme değerlidir."
  },
  {
    id: 4,
    text: "Büyük bir şirket seni satın almak istiyor! (Exit Zamanı mı?)",
    options: [
      { 
        id: 'a', 
        text: "Teklifi kabul et ve şirketi sat (Güvenli çıkış)", 
        cost: -500000, // Kazanç
        nextScenarioId: 'END', 
        risk: 'low',
        feedback: "Zengin oldun! Girişimcilik serüvenin başarıyla bitti."
      },
      { 
        id: 'b', 
        text: "Reddet ve büyümeye devam et (Unicorn olma hayali)", 
        cost: 0, 
        nextScenarioId: 'END', 
        risk: 'high',
        feedback: "Cesurca! Belki geleceğin Google'ı olacaksın, belki de batacaksın. (Oyun Sonu)"
      }
    ],
    info: "Exit, bir girişimcinin şirket hisselerini satarak projeden çıkış yapmasıdır."
  }
];
