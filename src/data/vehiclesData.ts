import airplaneImg from '../assets/images/blue_jet_airplane_1787676572236.jpg';
import shipImg from '../assets/images/viking_ship_1787675022026.jpg';
import balloonImg from '../assets/images/hot_air_balloon_1787675037916.jpg';

export type VehicleType = 'airplane' | 'ship' | 'balloon';

export interface VehicleConfig {
  id: VehicleType;
  name: string;
  categoryName: string;
  imageSrc: string;
  emoji: string;
  shortCode: string;
  description: string;
  lore: string;
  speedRating: string;
  soundEffect: string;
  accentColor: string;
  borderColor: string;
  glowColor: string;
  carrierLabel: string;
}

export const VEHICLES: Record<VehicleType, VehicleConfig> = {
  airplane: {
    id: 'airplane',
    name: 'Kék utasszállító repülőgép',
    categoryName: 'Modern légi szállító',
    imageSrc: airplaneImg,
    emoji: '✈️',
    shortCode: 'SAS-NORDIC-07',
    description: 'Gyors, modern kék-fehér sugárhajtású repülőgép, amely a felhők felett száguldva vontatja a feladatmolinót.',
    lore: 'A modern északi légitársaságok stílusát idéző sugárhajtású gép, mely villámgyorsan juttatja el a földrajzi kincseket Skandináviába.',
    speedRating: '⚡⚡⚡ Maximális sebesség',
    soundEffect: 'whoosh',
    accentColor: '#38bdf8',
    borderColor: '#0284c7',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    carrierLabel: 'Légi szállítmány'
  },
  ship: {
    id: 'ship',
    name: 'Viking drakkar sárkányhajó',
    categoryName: 'Hagyományos északi hadihajó',
    imageSrc: shipImg,
    emoji: '⛵',
    shortCode: 'DRAKKAR-ORMAR',
    description: 'Hatalmas csíkos vitorlájú, fafaragású sárkányhajó evezőkkel és pajzsokkal, amely az északi vizeken szeli a habokat.',
    lore: 'A legendás viking hajósok és felfedezők megbízható drakkarja, amellyel egykor egész Észak-Európát és a fjordokat bejárták.',
    speedRating: '🌊🌊 Stabil tengeri járó',
    soundEffect: 'splash',
    accentColor: '#fb923c',
    borderColor: '#c2410c',
    glowColor: 'rgba(251, 146, 60, 0.4)',
    carrierLabel: 'Tengeri szállítmány'
  },
  balloon: {
    id: 'balloon',
    name: 'Színes királyi hőlégballon',
    categoryName: 'Békés égi felfedező',
    imageSrc: balloonImg,
    emoji: '🎈',
    shortCode: 'AURORA-BALLOON',
    description: 'Vidám, kék-piros-sárga mintázatú, kosaras hőlégballon, amely lágyan lebegve húzza maga után a kérdéskártyát.',
    lore: 'A sarki fény és a havas fenyvesek felett békésen sikló hőlégballon, amelyről madártávlatból csodálható meg a skandináv táj.',
    speedRating: '☁️☁️ Nyugodt, pásztázó repülés',
    soundEffect: 'chime',
    accentColor: '#facc15',
    borderColor: '#ca8a04',
    glowColor: 'rgba(250, 204, 21, 0.4)',
    carrierLabel: 'Légi lebegő szállítmány'
  }
};

export const VEHICLE_LIST: VehicleConfig[] = Object.values(VEHICLES);
