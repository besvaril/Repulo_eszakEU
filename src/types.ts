export type CountryId = 'dk' | 'no' | 'se' | 'fi' | 'is';

export type VehicleType = 'airplane' | 'ship' | 'balloon';

export type ItemCategory = 'capital' | 'nature' | 'industry' | 'culture' | 'geography';

export interface CardItem {
  id: string;
  countryId: CountryId;
  title: string;
  category: ItemCategory;
  categoryLabel: string;
  iconName: string;
  description: string;
  curriculumFact: string; // 7th grade curriculum explanation
  visualEmoji: string;
}

export interface CountryInfo {
  id: CountryId;
  name: string;
  nativeName: string;
  capital: string;
  flag: string;
  flagDescription: string;
  color: string;
  borderColor: string;
  glowColor: string;
  vikingTitle: string;
  motto: string;
  svgPath: string;
  labelPos: { x: number; y: number };
  badgePos: { x: number; y: number };
  bounds: { minX: number; minY: number; maxX: number; maxY: number };
  items: CardItem[];
}

export interface GameState {
  currentCardIndex: number;
  deck: CardItem[];
  placedItems: Record<CountryId, CardItem[]>;
  mistakes: number;
  streak: number;
  maxStreak: number;
  score: number;
  startTime: number;
  endTime: number | null;
  isCompleted: boolean;
  selectedCard: CardItem | null;
  draggedCard: CardItem | null;
  isPlaneFlying: boolean;
}

export interface MascotMessage {
  speaker: 'viking' | 'troll';
  text: string;
  mood: 'neutral' | 'happy' | 'excited' | 'thinking' | 'oops';
  id: number;
}
