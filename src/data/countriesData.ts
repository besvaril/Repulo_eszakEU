import { CountryId, CountryInfo, CardItem } from '../types';

export const ALL_CARD_ITEMS: CardItem[] = [
  // 🇩🇰 Dánia
  {
    id: 'dk-copenhagen',
    countryId: 'dk',
    title: 'Koppenhága',
    category: 'capital',
    categoryLabel: 'Főváros',
    iconName: 'Crown',
    visualEmoji: '👑',
    description: 'Dánia fővárosa és legnagyobb városa a Sjælland-szigeten.',
    curriculumFact: 'Koppenhága a Dán Királyság központja, a Balti-tenger és az Északi-tenger közötti tengerszorosok kulcsfontosságú kikötője.'
  },
  {
    id: 'dk-lego',
    countryId: 'dk',
    title: 'LEGO',
    category: 'industry',
    categoryLabel: 'Világhírű márka',
    iconName: 'Blocks',
    visualEmoji: '🧱',
    description: 'A világ leghíresebb műanyag építőjátéka, melyet Billundban alapítottak.',
    curriculumFact: 'A LEGO név a dán „leg godt” (játssz jól) kifejezésből ered. Ole Kirk Christiansen asztalosmester alapította 1932-ben.'
  },
  {
    id: 'dk-jylland',
    countryId: 'dk',
    title: 'Jylland-félsziget',
    category: 'geography',
    categoryLabel: 'Felszínforma',
    iconName: 'MapPin',
    visualEmoji: '🗺️',
    description: 'Dánia szárazföldi részét alkotó nagy félsziget az Északi- és a Balti-tenger között.',
    curriculumFact: 'A Jylland-félsziget (Jütland) alkotja Dánia területének zömét és egyetlen szárazföldi határát (Németországgal). Morénákkal és parti dűnékkel tagolt sík vidék.'
  },
  {
    id: 'dk-greenland',
    countryId: 'dk',
    title: 'Grönland',
    category: 'geography',
    categoryLabel: 'Autonóm terület',
    iconName: 'Snowflake',
    visualEmoji: '🧊',
    description: 'A Föld legnagyobb szigete, amely a Dán Királysághoz tartozik.',
    curriculumFact: 'Bár földrajzilag Észak-Amerikához tartozik, politikailag Dánia autonóm része. Felszínének kb. 80%-át vastag belföldi jégtakaró borítja.'
  },

  // 🇳🇴 Norvégia
  {
    id: 'no-oslo',
    countryId: 'no',
    title: 'Oslo',
    category: 'capital',
    categoryLabel: 'Főváros',
    iconName: 'Crown',
    visualEmoji: '🏰',
    description: 'Norvégia fővárosa, az Oslo-fjord mélyén fekvő zöld világváros.',
    curriculumFact: 'Oslo Norvégia politikai, gazdasági és kulturális központja, itt adják át évente a Nobel-békedíjat is.'
  },
  {
    id: 'no-salmon',
    countryId: 'no',
    title: 'Lazac',
    category: 'nature',
    categoryLabel: 'Tengeri gazdaság',
    iconName: 'Fish',
    visualEmoji: '🐟',
    description: 'A hideg, tiszta norvég fjordokban folyó világhírű lazactenyésztés és halászat.',
    curriculumFact: 'Norvégia a világ vezető atlanti lazac exportőre. A hosszú, védett fjordok kiváló feltételeket nyújtanak a modern akvakultúrának.'
  },
  {
    id: 'no-fjord',
    countryId: 'no',
    title: 'Fjord',
    category: 'geography',
    categoryLabel: 'Felszínforma',
    iconName: 'Mountain',
    visualEmoji: '🏞️',
    description: 'Gleccserek által kivájt, meredek sziklafalakkal övezett mély tengeröblök.',
    curriculumFact: 'A jégkorszakban a leereszkedő gleccserek U alakú völgyeket vájtak, melyeket a jég elolvadásakor elöntött a tenger (pl. Geiranger-fjord).'
  },
  {
    id: 'no-oil',
    countryId: 'no',
    title: 'Kőolaj',
    category: 'industry',
    categoryLabel: 'Ásványkincs',
    iconName: 'Fuel',
    visualEmoji: '🛢️',
    description: 'Az Északi-tenger mélyén rejtőző „fekete arany”, Norvégia fő gazdasági pillére.',
    curriculumFact: 'Az 1960-as évek végén felfedezett északi-tengeri kőolaj- és földgázmezők gazdagsága tette Norvégiát a világ egyik legfejlettebb jóléti államává.'
  },

  // 🇸🇪 Svédország
  {
    id: 'se-stockholm',
    countryId: 'se',
    title: 'Stockholm',
    category: 'capital',
    categoryLabel: 'Főváros',
    iconName: 'Crown',
    visualEmoji: '⛵',
    description: 'Svédország fővárosa, amelyet 14 szigetre építettek a Mälaren-tó és a Balti-tenger találkozásánál.',
    curriculumFact: 'Gyakran „Észak Velencéjének” is nevezik csodálatos vízi hálózata és szigetei miatt. Itt adják át a többi Nobel-díjat.'
  },
  {
    id: 'se-match',
    countryId: 'se',
    title: 'Biztonsági gyufa',
    category: 'industry',
    categoryLabel: 'Svéd találmány',
    iconName: 'Flame',
    visualEmoji: '🔥',
    description: 'A biztonsági gyufát Gustaf Erik Pasch és a Lundström fivérek fejlesztették ki.',
    curriculumFact: 'A svéd Jönköping városa a biztonsági gyufa gyártásának világközpontjává vált a 19. században az északi nyárfa és a vörösfoszfor felhasználásával.'
  },
  {
    id: 'se-iron',
    countryId: 'se',
    title: 'Vasérc',
    category: 'industry',
    categoryLabel: 'Bányászat',
    iconName: 'Pickaxe',
    visualEmoji: '⛏️',
    description: 'Kiváló minőségű mágneses vasérc a sarkvidéki Kiruna és Gällivare bányáiból.',
    curriculumFact: 'Svédország északi részén található Európa legnagyobb és legmodernebb föld alatti vasércbányája (Kiruna), melyből a híres svédacélt készítik.'
  },
  {
    id: 'se-ikea',
    countryId: 'se',
    title: 'IKEA',
    category: 'culture',
    categoryLabel: 'Világmárka',
    iconName: 'Armchair',
    visualEmoji: '🛋️',
    description: 'Ingvar Kamprad által 1943-ban Älmhultban alapított lapraszerelt bútoróriás.',
    curriculumFact: 'A svéd fenyőfa-alapanyagokra és az egyszerű, letisztult skandináv dizájnra épülő cég mára a Föld szinte minden táján jelen van.'
  },

  // 🇫🇮 Finnország
  {
    id: 'fi-helsinki',
    countryId: 'fi',
    title: 'Helsinki',
    category: 'capital',
    categoryLabel: 'Főváros',
    iconName: 'Crown',
    visualEmoji: '🏛️',
    description: 'Finnország pezsgő fővárosa a Finn-öböl partján fekvő félszigeten és szigeteken.',
    curriculumFact: 'Helsinki a finn kultúra és technológia székhelye, fehér neoklasszicista dómjáról és zöld szigeteiről ismert.'
  },
  {
    id: 'fi-lakes',
    countryId: 'fi',
    title: 'Finn-tóvidék',
    category: 'geography',
    categoryLabel: 'Természeti táj',
    iconName: 'Waves',
    visualEmoji: '🌊',
    description: 'Finnország az „ezer tó országa”, valójában több mint 187 000 tó pettyezi a felszínét.',
    curriculumFact: 'A pleisztocén jégtakaró visszahúzódásakor a mélyedésekben felgyűlt olvadékvizek hozták létre a hatalmas Finn-tóvidéket (pl. Saimaa-tó).'
  },
  {
    id: 'fi-sauna',
    countryId: 'fi',
    title: 'Szauna',
    category: 'culture',
    categoryLabel: 'Hagyomány',
    iconName: 'Sparkles',
    visualEmoji: '🧖',
    description: 'A több ezer éves finn gőzfürdő-kultúra, az UNESCO szellemi kulturális örökségének része.',
    curriculumFact: 'Finnországban több mint 3 millió szauna található (átlagosan szinte minden háztartásra jut egy). A „szauna” szó az egyik legismertebb finn jövevényszó.'
  },
  {
    id: 'fi-nokia',
    countryId: 'fi',
    title: 'Nokia',
    category: 'industry',
    categoryLabel: 'Csúcstechnológia',
    iconName: 'Smartphone',
    visualEmoji: '📱',
    description: 'A Nokia folyó partján indult finn telekommunikációs és technológiai világcég.',
    curriculumFact: 'Eredetileg fafeldolgozó üzemként és gumicsizmagyárként indult, majd a 2000-es évekre a világ vezető mobiltelefon- és hálózatfejlesztő óriása lett.'
  },

  // 🇮🇸 Izland
  {
    id: 'is-reykjavik',
    countryId: 'is',
    title: 'Reykjavík',
    category: 'capital',
    categoryLabel: 'Főváros',
    iconName: 'Crown',
    visualEmoji: '🌋',
    description: 'A világ legészakibb független állami fővárosa, a „füstölgő öböl”.',
    curriculumFact: 'Nevét az első viking telepesektől kapta a felszálló geotermikus gőzök miatt. Ma szinte teljes egészében zöld geotermikus energiával fűtik.'
  },
  {
    id: 'is-geyser',
    countryId: 'is',
    title: 'Gejzír',
    category: 'nature',
    categoryLabel: 'Földtani jelenség',
    iconName: 'FlameKindling',
    visualEmoji: '💨',
    description: 'Szabályos időközönként forró vizet és gőzt a magasba lövellő forrás.',
    curriculumFact: 'Maga a világ összes ilyen forrására használt „gejzír” szó az izlandi Geysir névből származik (gjósa = feltörni).'
  },
  {
    id: 'is-volcano',
    countryId: 'is',
    title: 'Vulkán',
    category: 'nature',
    categoryLabel: 'Vulkanizmus',
    iconName: 'Flame',
    visualEmoji: '🌋',
    description: 'A Közép-Atlanti-hátságon fekvő „tűz és jég földje” aktív tűzhányói.',
    curriculumFact: 'Izland két kőzetlemez (az észak-amerikai és az eurázsiai) távolodási vonalán fekszik, ezért rendkívül aktív a vulkáni működés (pl. Hekla, Eyjafjallajökull).'
  },
  {
    id: 'is-bluelagoon',
    countryId: 'is',
    title: 'Kék lagúna',
    category: 'culture',
    categoryLabel: 'Geotermikus csoda',
    iconName: 'Droplets',
    visualEmoji: '🩵',
    description: 'A fekete lávamezők közepén gőzölgő, ásványi anyagokban és szilíciumban gazdag türkizkék gyógyfürdő (Blue Lagoon).',
    curriculumFact: 'A Kék lagúna a közeli Svartsengi geotermikus erőmű tiszta, ásványi anyagokban gazdag meleg vizének felhasználásával jött létre, világhírű turisztikai célpont.'
  }
];

export const COUNTRIES: Record<CountryId, CountryInfo> = {
  dk: {
    id: 'dk',
    name: 'Dánia',
    nativeName: 'Danmark',
    capital: 'Koppenhága',
    flag: '🇩🇰',
    flagDescription: 'Piros alapon fehér skandináv kereszt (Dannebrog)',
    color: '#ef4444',
    borderColor: '#b91c1c',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    vikingTitle: 'A dán királyok földje',
    motto: 'Gorm király és a viking hajósok hazája',
    // Realistic SVG path for Denmark (Jutland peninsula + Funen + Zealand)
    svgPath: 'M 430,680 L 440,650 L 435,610 L 445,580 L 435,560 L 440,540 L 455,545 L 460,565 L 452,600 L 465,640 L 458,680 Z M 480,640 C 490,635 500,645 495,655 C 485,660 475,650 480,640 Z M 510,620 C 525,615 535,630 530,645 C 515,655 500,640 510,620 Z M 545,635 C 555,635 560,645 550,650 C 540,645 540,635 545,635 Z',
    labelPos: { x: 460, y: 625 },
    badgePos: { x: 445, y: 710 },
    bounds: { minX: 420, minY: 535, maxX: 565, maxY: 690 },
    items: ALL_CARD_ITEMS.filter(item => item.countryId === 'dk')
  },
  no: {
    id: 'no',
    name: 'Norvégia',
    nativeName: 'Norge',
    capital: 'Oslo',
    flag: '🇳🇴',
    flagDescription: 'Piros alapon kék-fehér skandináv kereszt',
    color: '#0284c7',
    borderColor: '#0369a1',
    glowColor: 'rgba(2, 132, 199, 0.4)',
    vikingTitle: 'A fjordok és jarlok birodalma',
    motto: 'Harald Széphajú és a bátor drakkar-harcosok országa',
    // Realistic SVG path for Norway (long fjord coast, Lofoten, north cape)
    svgPath: 'M 425,520 L 415,480 L 400,430 L 415,380 L 445,320 L 485,250 L 530,190 L 580,140 L 640,110 L 700,90 L 750,95 L 735,120 L 690,135 L 630,165 L 570,225 L 530,285 L 500,350 L 490,410 L 480,480 L 465,525 L 445,540 Z M 515,220 C 530,205 545,215 535,230 C 525,240 510,230 515,220 Z',
    labelPos: { x: 450, y: 410 },
    badgePos: { x: 380, y: 360 },
    bounds: { minX: 395, minY: 85, maxX: 755, maxY: 545 },
    items: ALL_CARD_ITEMS.filter(item => item.countryId === 'no')
  },
  se: {
    id: 'se',
    name: 'Svédország',
    nativeName: 'Sverige',
    capital: 'Stockholm',
    flag: '🇸🇪',
    flagDescription: 'Kék alapon sárga skandináv kereszt',
    color: '#eab308',
    borderColor: '#ca8a04',
    glowColor: 'rgba(234, 179, 8, 0.4)',
    vikingTitle: 'A varég harcosok és tavak földje',
    motto: 'A keleti kereskedőutak és a sűrű fenyvesek országa',
    // Realistic SVG path for Sweden (Gulf of Bothnia, Baltic coast, Skåne, Gotland)
    svgPath: 'M 480,480 L 490,410 L 500,350 L 530,285 L 570,225 L 630,165 L 690,135 L 675,170 L 645,240 L 620,310 L 600,380 L 590,450 L 585,520 L 565,580 L 525,600 L 495,570 L 480,520 Z M 610,510 C 620,500 625,525 615,545 C 605,550 600,530 610,510 Z M 590,535 C 596,528 600,545 595,555 C 590,555 588,542 590,535 Z',
    labelPos: { x: 545, y: 420 },
    badgePos: { x: 580, y: 320 },
    bounds: { minX: 475, minY: 130, maxX: 695, maxY: 605 },
    items: ALL_CARD_ITEMS.filter(item => item.countryId === 'se')
  },
  fi: {
    id: 'fi',
    name: 'Finnország',
    nativeName: 'Suomi',
    capital: 'Helsinki',
    flag: '🇫🇮',
    flagDescription: 'Fehér alapon kék skandináv kereszt',
    color: '#3b82f6',
    borderColor: '#2563eb',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    vikingTitle: 'A Kalevala és a sarki fény hazája',
    motto: 'A bátor sámánok, a tajga és a kristálytiszta tavak földje',
    // Realistic SVG path for Finland (Bothnia coast, Saimaa lakes, Lapland)
    svgPath: 'M 675,170 L 690,135 L 735,120 L 775,150 L 780,210 L 760,280 L 765,350 L 755,420 L 730,470 L 670,480 L 645,465 L 635,420 L 625,350 L 645,240 Z M 605,475 C 612,470 620,478 615,488 C 608,490 602,482 605,475 Z',
    labelPos: { x: 700, y: 320 },
    badgePos: { x: 770, y: 260 },
    bounds: { minX: 620, minY: 115, maxX: 790, maxY: 490 },
    items: ALL_CARD_ITEMS.filter(item => item.countryId === 'fi')
  },
  is: {
    id: 'is',
    name: 'Izland',
    nativeName: 'Ísland',
    capital: 'Reykjavík',
    flag: '🇮🇸',
    flagDescription: 'Kék alapon piros-fehér skandináv kereszt',
    color: '#06b6d4',
    borderColor: '#0891b2',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    vikingTitle: 'A tűz, jég és trollok szigete',
    motto: 'Ingólfur Arnarson és a sagák varázslatos szülőföldje',
    // Realistic SVG path for Iceland (Northwest fjords, south coast, Reykjanes)
    svgPath: 'M 140,210 L 175,190 L 220,185 L 260,200 L 285,225 L 280,250 L 255,270 L 205,275 L 160,265 L 130,245 L 120,225 L 140,210 Z M 130,200 C 135,185 148,190 145,205 C 138,212 128,210 130,200 Z',
    labelPos: { x: 200, y: 235 },
    badgePos: { x: 200, y: 155 },
    bounds: { minX: 115, minY: 180, maxX: 290, maxY: 280 },
    items: ALL_CARD_ITEMS.filter(item => item.countryId === 'is')
  }
};

export const VIKING_QUOTES = {
  welcome: [
    'Üdvözöllek, ifjú vándor! Készülj fel Észak-Európa meghódítására!',
    'Thor kalapácsára! Ismerd fel a skandináv tájak kincseit!',
    'A viking postagép hamarosan meghozza az első rakományt!'
  ],
  correct: [
    'Bravó! Odin bölcsessége ragyog benned!',
    'Pontos találat, ifjú viking!',
    'Kiváló földrajztudás! A trollok is elismerően csettintenek!',
    'Helyes! Ezt a tudást még a sagák is megéneklik!'
  ],
  incorrect: [
    'Ajaj! Ezt a rakományt rossz kikötőbe irányítottad!',
    'Ó, a hegyi trollok megtréfáltak! Nézd meg alaposabban a kártyát!',
    'Nem oda való! De semmi baj, egy igazi viking sosem adja fel!',
    'Nem talált! Gondold át, melyik északi ország büszkesége ez!'
  ],
  hint: [
    'Tipp: Figyeld a kártya leírását és a felségjelzést!',
    'Tipp: Nézd meg a térképen az országok fekvését és körvonalát!',
    'Tipp: A fővárosok és a természeti kincsek segítenek a tájékozódásban!'
  ],
  completed: [
    'Dicsőség! Mind a 20 északi kincset sikeresen a helyére juttattad!',
    'Megszerezted a skandináv földrajz viking nagymestere címet!',
    'Valhalla kapui megnyílnak az ilyen jeles 7. osztályos tudás előtt!'
  ]
};
