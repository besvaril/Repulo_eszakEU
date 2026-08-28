import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CountryId, CountryInfo, CardItem } from '../types';
import { COUNTRIES } from '../data/countriesData';
import { Shield, Sparkles, CheckCircle2, Info } from 'lucide-react';

interface NordicMapProps {
  placedItems: Record<CountryId, CardItem[]>;
  activeCard: CardItem | null;
  onDropOnCountry: (countryId: CountryId) => void;
  onCountryClick: (countryId: CountryId) => void;
  onInspectCountry: (countryId: CountryId) => void;
  lastDroppedCountry: CountryId | null;
  isErrorAnimation: boolean;
  cargoSlot?: React.ReactNode;
}

export const NordicMap: React.FC<NordicMapProps> = ({
  placedItems,
  activeCard: _activeCard,
  onDropOnCountry,
  onCountryClick,
  onInspectCountry,
  lastDroppedCountry,
  isErrorAnimation,
  cargoSlot,
}) => {
  const [hoveredCountry, setHoveredCountry] = useState<CountryId | null>(null);
  const [dragOverCountry, setDragOverCountry] = useState<CountryId | null>(null);

  // SVG coordinate configuration - shifted left by 75px to leave unobstructed room on the right
  const MAP_VIEWBOX = { minX: 75, minY: 0, width: 900, height: 760 };

  const countryKeys: CountryId[] = ['is', 'no', 'se', 'fi', 'dk'];

  const handleDragOver = (e: React.DragEvent, countryId: CountryId) => {
    e.preventDefault();
    setDragOverCountry(countryId);
  };

  const handleDragLeave = () => {
    setDragOverCountry(null);
  };

  const handleDrop = (e: React.DragEvent, countryId: CountryId) => {
    e.preventDefault();
    setDragOverCountry(null);
    onDropOnCountry(countryId);
  };

  return (
    <div className="w-full relative bg-[#1c1e22] rounded-3xl border-2 border-[#3d3329] p-2.5 sm:p-3.5 md:p-4 shadow-[0_12px_35px_rgba(0,0,0,0.9)] overflow-hidden">
      
      {/* Decorative Runic & Wooden Frame Corners */}
      <div className="absolute top-2 left-3 text-[#c9a86a]/40 font-rune text-sm">ᚠ ᚢ ᚦ ᚨ</div>
      <div className="absolute top-2 right-3 text-[#c9a86a]/40 font-rune text-sm">ᚱ ᚲ ᚷ ᚹ</div>
      <div className="absolute bottom-2 left-3 text-[#c9a86a]/40 font-rune text-sm">ᚺ ᚾ ᛁ ᛃ</div>
      <div className="absolute bottom-2 right-3 text-[#c9a86a]/40 font-rune text-sm">ᛈ ᛇ ᛉ ᛊ</div>

      {/* Map Ocean & Atmospheric Background */}
      <div className="absolute inset-0 bg-[#121417] -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#c9a86a]/10 via-[#1c1e22]/20 to-transparent -z-10 animate-aurora" />

      {/* Header bar over map */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-1.5 border-b border-[#3d3329]">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#c9a86a]" />
          <h2 className="font-viking text-sm sm:text-base md:text-lg font-bold text-[#c9a86a] tracking-widest uppercase">
            Észak-Európa térképe (5 ország)
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#8e8e8e]">
          <span className="hidden sm:inline text-[#8e8e8e]">Tipp:</span>
          <span className="bg-[#121417] px-2.5 py-0.5 rounded-lg border border-[#3d3329] text-[#c9a86a] font-medium text-[11px] sm:text-xs">
            Húzd a kártyát vagy kattints az országra!
          </span>
        </div>
      </div>

      {/* Primary SVG Northern Europe Map */}
      <div className="relative w-full aspect-[4/3] max-h-[460px] md:max-h-[500px] flex items-center justify-center">
        <svg
          viewBox={`${MAP_VIEWBOX.minX} ${MAP_VIEWBOX.minY} ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
          className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] select-none"
        >
          {/* Subtle Grid / Latitudes */}
          <defs>
            {/* Country Gradient Fills */}
            <linearGradient id="grad-no" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#14263f" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="grad-se" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5a4623" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#3d2e14" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="grad-fi" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#233a5a" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#172439" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="grad-dk" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5a2323" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#3d1414" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="grad-is" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#264448" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#16292b" stopOpacity="0.95" />
            </linearGradient>

            {/* Sea wave pattern */}
            <pattern id="sea-waves" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 0 30 Q 15 25 30 30 T 60 30" fill="none" stroke="rgba(201,168,106,0.05)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Sea background with subtle wave lines covering entire translated width */}
          <rect x="0" y="0" width="1050" height="760" fill="url(#sea-waves)" />

          {/* Ocean Water Labels (Educational for 7th grade) */}
          <g className="font-rune text-[13px] fill-[#8e8e8e]/50 select-none pointer-events-none">
            <text x="90" y="110" className="tracking-widest">ATLANTI-ÓCEÁN</text>
            <text x="320" y="180" className="tracking-widest">NORVÉG-TENGER</text>
            <text x="240" y="580" className="tracking-widest">ÉSZAKI-TENGER</text>
            <text x="560" y="590" className="tracking-widest">BALTI-TENGER</text>
            <text x="680" y="470" className="tracking-wider text-[11px]">Finn-öböl</text>
            <text x="580" y="320" className="tracking-wider text-[11px] rotate-[-75deg]">Botteni-öböl</text>
          </g>

          {/* Arctic Circle Line (Északi-sarkkör 66.5° É) */}
          <g className="pointer-events-none">
            <line
              x1="0"
              y1="230"
              x2="1050"
              y2="210"
              stroke="#c9a86a"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              strokeOpacity="0.4"
            />
            <text x="80" y="222" fill="#c9a86a" fillOpacity="0.75" fontSize="11" fontFamily="sans-serif">
              ✦ Északi-sarkkör (66,5° É)
            </text>
          </g>

          {/* Neighboring Country Outlines (Light faded context) */}
          {/* United Kingdom / Scotland */}
          <path
            d="M 190,620 L 220,590 L 230,640 L 210,690 L 180,680 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1"
            opacity="0.4"
          />
          <text x="180" y="650" fill="#64748b" fontSize="10" fontFamily="sans-serif">Egyesült Királyság</text>

          {/* Germany / Baltic states */}
          <path
            d="M 420,710 L 480,710 L 560,710 L 590,750 L 400,750 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1"
            opacity="0.4"
          />
          <text x="470" y="740" fill="#64748b" fontSize="10" fontFamily="sans-serif">Közép-Európa</text>

          {/* Baltic States (Észtország, Lettország, Litvánia) */}
          <path
            d="M 670,490 L 730,490 L 740,560 L 680,590 L 650,530 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1"
            opacity="0.4"
          />
          <text x="670" y="540" fill="#64748b" fontSize="10" fontFamily="sans-serif">Balti államok</text>

          {/* Russian Karelia / Kola Peninsula */}
          <path
            d="M 780,140 L 870,120 L 890,240 L 820,290 L 780,210 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1"
            opacity="0.4"
          />
          <text x="810" y="190" fill="#64748b" fontSize="10" fontFamily="sans-serif">Kola-félsziget</text>

          {/* 🗺️ THE 5 INTERACTIVE NORDIC COUNTRIES */}
          {countryKeys.map((cId) => {
            const country = COUNTRIES[cId];
            const isHovered = hoveredCountry === cId;
            const isDragOver = dragOverCountry === cId;
            const isTarget = isHovered || isDragOver;
            const isJustDropped = lastDroppedCountry === cId;
            const countryPlaced = placedItems[cId] || [];
            const isCompleted = countryPlaced.length === 4;

            let fillStyle = `url(#grad-${cId})`;
            if (isCompleted) {
              fillStyle = `url(#grad-${cId})`;
            }

            return (
              <g
                key={cId}
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredCountry(cId)}
                onMouseLeave={() => setHoveredCountry(null)}
                onDragOver={(e) => handleDragOver(e, cId)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, cId)}
                onClick={() => onCountryClick(cId)}
              >
                {/* Glow Filter / Drop Target Ring */}
                {isTarget && (
                  <path
                    d={country.svgPath}
                    fill="none"
                    stroke={country.color}
                    strokeWidth="12"
                    strokeOpacity="0.4"
                    className="animate-pulse"
                  />
                )}

                {/* Country Base Shape */}
                <path
                  d={country.svgPath}
                  fill={fillStyle}
                  stroke={isTarget ? '#fbbf24' : isCompleted ? '#22c55e' : '#f8fafc'}
                  strokeWidth={isTarget ? '3.5' : isCompleted ? '2.5' : '1.5'}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className={`transition-all duration-200 ${
                    isTarget ? 'filter drop-shadow-[0_0_12px_rgba(251,191,36,0.7)]' : ''
                  } ${isJustDropped && isErrorAnimation ? 'animate-shake' : ''}`}
                />

                {/* Capital City Marker Dot */}
                <circle
                  cx={country.labelPos.x}
                  cy={country.labelPos.y}
                  r="5"
                  fill="#fbbf24"
                  stroke="#0f172a"
                  strokeWidth="2"
                />
                <circle
                  cx={country.labelPos.x}
                  cy={country.labelPos.y}
                  r="8"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="1"
                  className="animate-ping opacity-60"
                />

                {/* Country Name & Flag Label on SVG */}
                <g className="pointer-events-none select-none">
                  <rect
                    x={country.labelPos.x - 48}
                    y={country.labelPos.y - 30}
                    width="96"
                    height="22"
                    rx="6"
                    fill="rgba(15, 23, 42, 0.85)"
                    stroke={isTarget ? '#fbbf24' : '#475569'}
                    strokeWidth="1"
                  />
                  <text
                    x={country.labelPos.x}
                    y={country.labelPos.y - 15}
                    textAnchor="middle"
                    fill="#f8fafc"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                  >
                    {country.flag} {country.name}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Floating Country Shield Badges & Placed Items Overlays */}
        {countryKeys.map((cId) => {
          const country = COUNTRIES[cId];
          const countryPlaced = placedItems[cId] || [];
          const isCompleted = countryPlaced.length === 4;
          const isTarget = hoveredCountry === cId || dragOverCountry === cId;

          // Position style on top of map container based on country badge coordinates
          const leftPercent = ((country.badgePos.x - MAP_VIEWBOX.minX) / MAP_VIEWBOX.width) * 100;
          const topPercent = ((country.badgePos.y - MAP_VIEWBOX.minY) / MAP_VIEWBOX.height) * 100;

          return (
            <div
              key={`badge-${cId}`}
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
            >
              <div
                onClick={() => onInspectCountry(cId)}
                onDragOver={(e) => handleDragOver(e, cId)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, cId)}
                className={`
                  group cursor-pointer transition-all duration-200
                  bg-[#1c1e22]/95 backdrop-blur-md rounded-2xl p-2 md:p-2.5
                  border-2 ${
                    isCompleted
                      ? 'border-[#c9a86a] ring-2 ring-[#c9a86a]/40 shadow-[0_0_15px_rgba(201,168,106,0.3)]'
                      : isTarget
                      ? 'border-[#c9a86a] scale-110 shadow-[0_0_20px_rgba(201,168,106,0.6)]'
                      : 'border-[#3d3329] hover:border-[#c9a86a]'
                  }
                  shadow-2xl min-w-[140px] md:min-w-[160px] flex flex-col gap-1.5
                `}
              >
                {/* Header with Flag and Progress */}
                <div className="flex items-center justify-between gap-1 border-b border-[#2c241d] pb-1">
                  <div className="flex items-center gap-1.5 font-viking font-bold text-xs text-[#c9a86a]">
                    <span className="text-sm">{country.flag}</span>
                    <span>{country.name}</span>
                  </div>
                  <span
                    className={`text-[10px] font-sans px-2 py-0.5 rounded-full font-bold ${
                      isCompleted
                        ? 'bg-[#2c241d] text-[#c9a86a] border border-[#c9a86a]/50'
                        : 'bg-[#121417] text-[#8e8e8e] border border-[#3d3329]'
                    }`}
                  >
                    {countryPlaced.length} / 4
                  </span>
                </div>

                {/* 4 Item Slots for this Country */}
                <div className="grid grid-cols-4 gap-1">
                  {[0, 1, 2, 3].map((slotIdx) => {
                    const item = countryPlaced[slotIdx];
                    return (
                      <div
                        key={slotIdx}
                        title={item ? `${item.title}: ${item.description}` : 'Üres rakományhely'}
                        className={`
                          w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center text-xs
                          transition-all duration-200
                          ${
                            item
                              ? 'bg-[#2c241d] border border-[#8e7345] text-sm shadow-inner'
                              : 'bg-[#121417] border border-dashed border-[#3d3329] text-[#8e8e8e]/40'
                          }
                        `}
                      >
                        {item ? (
                          <motion.span
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                          >
                            {item.visualEmoji}
                          </motion.span>
                        ) : (
                          <span className="text-[10px] opacity-40">ᛟ</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Quick inspect info hint */}
                <div className="flex items-center justify-between text-[9px] text-[#8e8e8e] group-hover:text-[#c9a86a] transition-colors">
                  <span className="truncate">{country.capital}</span>
                  <Info className="w-3 h-3 shrink-0" />
                </div>
              </div>
            </div>
          );
        })}

        {/* ✈️ / ⛵ / 🎈 Bottom-Right Cargo Vehicle & Question Card Overlay */}
        {cargoSlot && (
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 z-30 pointer-events-auto w-[270px] sm:w-[300px] md:w-[330px] max-w-[92vw]">
            {cargoSlot}
          </div>
        )}
      </div>

      {/* Map Legend / Country Fast Selector Bar */}
      <div className="mt-3 pt-3 border-t border-[#3d3329] flex flex-wrap items-center justify-center gap-2 md:gap-3">
        <span className="text-xs text-[#8e8e8e] font-rune mr-1">Gyorsválasztó gombok:</span>
        {countryKeys.map((cId) => {
          const country = COUNTRIES[cId];
          const count = (placedItems[cId] || []).length;
          const isDone = count === 4;
          return (
            <button
              key={`btn-${cId}`}
              onClick={() => onCountryClick(cId)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold
                transition-all duration-200 border
                ${
                  isDone
                    ? 'bg-[#2c241d] border-[#8e7345] text-[#c9a86a] hover:bg-[#3d3329]'
                    : 'bg-[#121417] border-[#3d3329] text-[#e0d7cc] hover:border-[#c9a86a] hover:text-[#c9a86a]'
                }
              `}
            >
              <span>{country.flag}</span>
              <span>{country.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isDone ? 'bg-[#121417] text-[#c9a86a]' : 'bg-[#2c241d] text-[#8e8e8e]'}`}>
                {count}/4
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
