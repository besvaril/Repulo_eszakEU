import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CardItem } from '../types';
import { VehicleType, VEHICLES } from '../data/vehiclesData';
import { Sparkles, Move, Compass, Waves, Wind } from 'lucide-react';

interface VikingPlaneProps {
  currentCard: CardItem | null;
  cardIndex: number;
  totalCards: number;
  vehicleType: VehicleType;
  onDragStart: (card: CardItem) => void;
  onDragEnd: () => void;
  onCardSelect: (card: CardItem) => void;
  isSelected: boolean;
  onShowHint?: () => void;
  onChangeVehicle?: () => void;
}

export const VikingPlane: React.FC<VikingPlaneProps> = ({
  currentCard,
  cardIndex,
  totalCards,
  vehicleType = 'airplane',
  onDragStart,
  onDragEnd,
  onCardSelect,
  isSelected,
  onChangeVehicle,
}) => {
  const currentVehicle = VEHICLES[vehicleType] || VEHICLES.airplane;

  if (!currentCard) {
    return (
      <div className="w-full py-4 text-center">
        <div className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#1c1e22] border border-[#c9a86a]/50 rounded-2xl text-[#c9a86a] font-viking text-base shadow-2xl">
          <Sparkles className="w-5 h-5 text-[#c9a86a] animate-spin" />
          <span>Minden rakomány célba ért a dicső északi kikötőkben!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative overflow-hidden py-2 px-2 sm:px-4 select-none">
      {/* Runway / Voyage Container */}
      <div className="max-w-4xl mx-auto relative flex flex-col items-center bg-[#1c1e22]/60 border border-[#3d3329] rounded-2xl p-3 md:p-4 shadow-xl backdrop-blur-sm">
        
        {/* Animated Flight / Voyage Squadron Header */}
        <div className="w-full flex flex-wrap items-center justify-between text-xs text-[#c9a86a] mb-2 px-2 gap-2">
          <div className="flex items-center gap-2 font-viking tracking-widest uppercase font-bold">
            <span className="inline-block w-2 h-2 rounded-full bg-[#c9a86a] animate-ping" />
            <span>{currentVehicle.carrierLabel} #{cardIndex + 1} / {totalCards}</span>
          </div>

          <div className="flex items-center gap-2">
            {onChangeVehicle && (
              <button
                type="button"
                onClick={onChangeVehicle}
                className="flex items-center gap-1.5 text-[#d4b984] hover:text-white transition-all bg-[#2c241d] hover:bg-[#3d3329] px-2.5 py-1 rounded-xl border border-[#8e7345]"
                title="Válts más szállítójárműre"
              >
                <Compass className="w-3.5 h-3.5 text-[#c9a86a]" />
                <span className="font-sans font-bold text-xs">Járműváltás</span>
              </button>
            )}
          </div>
        </div>

        {/* 🚀 VEHICLE CONVOY: Vehicle at the front (left), Molinó Banner behind it (right) */}
        {/* Arrives from the RIGHT (x: +650), Exits to the LEFT (x: -750) upon placement */}
        <div className="w-full flex items-center justify-center min-h-[140px] relative overflow-visible">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentCard.id}-${vehicleType}`}
              initial={{ x: 650, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -750, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 85,
                damping: 15,
                mass: 0.9,
              }}
              className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 relative"
            >
              {/* 🛩️ / ⛵ / 🎈 THE ACTIVE VEHICLE */}
              <div className="relative flex items-center shrink-0">
                
                {/* 1. AIRPLANE RENDER */}
                {vehicleType === 'airplane' && (
                  <div className="relative bg-[#1c1e22] border-2 border-[#38bdf8] rounded-2xl p-2 px-3 shadow-[0_10px_25px_rgba(0,0,0,0.8)] flex items-center gap-3">
                    {/* Jet Airplane Image Thumbnail */}
                    <div className="w-16 h-12 relative flex items-center justify-center overflow-hidden rounded-lg bg-[#121417]">
                      <img
                        src={currentVehicle.imageSrc}
                        alt="Repülőgép"
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain -scale-x-100 filter drop-shadow-md"
                      />
                      {/* Flashing Navigation Beacon */}
                      <span className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    </div>

                    {/* Aircraft Label */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">✈️</span>
                        <span className="font-viking text-[#38bdf8] text-xs font-bold tracking-wider">
                          {currentVehicle.shortCode}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#8e8e8e] font-sans flex items-center gap-1">
                        <Wind className="w-3 h-3 text-[#38bdf8]" />
                        <span>Kék légi szállító</span>
                      </div>
                    </div>

                    {/* Tow Hook Eyelet at Tail */}
                    <div className="w-5 h-5 rounded-full bg-[#121417] border border-[#38bdf8] flex items-center justify-center text-[10px] text-[#38bdf8] shrink-0 font-mono">
                      ⚓
                    </div>
                  </div>
                )}

                {/* 2. VIKING SHIP RENDER */}
                {vehicleType === 'ship' && (
                  <div className="relative bg-[#1c1e22] border-2 border-[#fb923c] rounded-2xl p-2 px-3 shadow-[0_10px_25px_rgba(0,0,0,0.8)] flex items-center gap-3">
                    {/* Viking Drakkar Image Thumbnail */}
                    <div className="w-16 h-12 relative flex items-center justify-center overflow-hidden rounded-lg bg-[#121417]">
                      <img
                        src={currentVehicle.imageSrc}
                        alt="Viking hajó"
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain -scale-x-100 filter drop-shadow-md"
                      />
                      {/* Water Wave Ripple Effect */}
                      <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#0284c7]/40 rounded-full animate-pulse" />
                    </div>

                    {/* Ship Details */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">⛵</span>
                        <span className="font-viking text-[#fb923c] text-xs font-bold tracking-wider">
                          {currentVehicle.shortCode}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#8e8e8e] font-rune italic flex items-center gap-1">
                        <Waves className="w-3 h-3 text-[#fb923c]" />
                        <span>Sárkányhajó</span>
                      </div>
                    </div>

                    {/* Stern Tow Ring */}
                    <div className="w-5 h-5 rounded-full bg-[#121417] border border-[#fb923c] flex items-center justify-center text-[10px] text-[#fb923c] shrink-0 font-mono">
                      ᛟ
                    </div>
                  </div>
                )}

                {/* 3. HOT AIR BALLOON RENDER */}
                {vehicleType === 'balloon' && (
                  <div className="relative bg-[#1c1e22] border-2 border-[#facc15] rounded-2xl p-2 px-3 shadow-[0_10px_25px_rgba(0,0,0,0.8)] flex items-center gap-3">
                    {/* Hot Air Balloon Image Thumbnail */}
                    <div className="w-16 h-12 relative flex items-center justify-center overflow-hidden rounded-lg bg-[#121417]">
                      <img
                        src={currentVehicle.imageSrc}
                        alt="Hőlégballon"
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain filter drop-shadow-md animate-bounce"
                        style={{ animationDuration: '3s' }}
                      />
                      {/* Burner Flame Glow */}
                      <span className="absolute bottom-1 right-2 w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    </div>

                    {/* Balloon Details */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">🎈</span>
                        <span className="font-viking text-[#facc15] text-xs font-bold tracking-wider">
                          {currentVehicle.shortCode}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#8e8e8e] font-sans flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#facc15]" />
                        <span>Királyi hőlégballon</span>
                      </div>
                    </div>

                    {/* Basket Harness Ring */}
                    <div className="w-5 h-5 rounded-full bg-[#121417] border border-[#facc15] flex items-center justify-center text-[10px] text-[#facc15] shrink-0 font-mono">
                      ✦
                    </div>
                  </div>
                )}
              </div>

              {/* 🪢 DUAL TOW CABLE CONNECTING VEHICLE TO MOLINÓ BANNER */}
              <div className="hidden md:flex items-center relative w-10 shrink-0">
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full h-0.5 border-t-2 border-dashed border-[#c9a86a]/90 relative">
                    <div className="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-[#8e7345] border border-[#c9a86a]" />
                  </div>
                  <div className="w-full h-0.5 border-t-2 border-dashed border-[#c9a86a]/90 relative">
                    <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-[#8e7345] border border-[#c9a86a]" />
                  </div>
                </div>
              </div>

              {/* Mobile Tow Rope */}
              <div className="md:hidden flex justify-center -my-1">
                <div className="w-0.5 h-3 border-l-2 border-dashed border-[#c9a86a]/80" />
              </div>

              {/* 📜 THE MOLINÓ BANNER (THE CARGO CARD TOWED BEHIND) */}
              <div className="relative">
                {/* Brass Eyelets where tow ropes attach */}
                <div className="hidden md:block absolute -left-1.5 top-3 w-3 h-3 rounded-full bg-[#121417] border-2 border-[#c9a86a] shadow-sm z-20" />
                <div className="hidden md:block absolute -left-1.5 bottom-3 w-3 h-3 rounded-full bg-[#121417] border-2 border-[#c9a86a] shadow-sm z-20" />

                {/* Interactive Molinó Banner Card (Draggable + Clickable) */}
                <div
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', currentCard.id);
                    onDragStart(currentCard);
                  }}
                  onDragEnd={onDragEnd}
                  onClick={() => onCardSelect(currentCard)}
                  className={`
                    group cursor-grab active:cursor-grabbing transition-all duration-200
                    relative bg-[#1c1e22]
                    border-2 ${isSelected ? 'border-[#c9a86a] ring-4 ring-[#c9a86a]/30 scale-105' : 'border-[#3d3329] hover:border-[#c9a86a] hover:scale-[1.02]'}
                    rounded-2xl p-3.5 md:p-4 shadow-[0_12px_30px_rgba(0,0,0,0.8)]
                    min-w-[280px] max-w-[340px] flex flex-col gap-2.5
                  `}
                >
                  {/* Corner Accents */}
                  <div className="absolute top-1.5 left-2 text-[10px] text-[#c9a86a]/60 font-mono">✦</div>
                  <div className="absolute top-1.5 right-2 text-[10px] text-[#c9a86a]/60 font-mono">✦</div>
                  <div className="absolute bottom-1.5 left-2 text-[10px] text-[#c9a86a]/60 font-mono">✦</div>
                  <div className="absolute bottom-1.5 right-2 text-[10px] text-[#c9a86a]/60 font-mono">✦</div>

                  {/* Top Badge & Category */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-sans px-2.5 py-0.5 rounded-full bg-[#2c241d] border border-[#3d3329] text-[#c9a86a]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a86a]" />
                      {currentCard.categoryLabel}
                    </span>
                    
                    <span className="text-[10px] text-[#8e8e8e] font-sans flex items-center gap-1">
                      <Move className="w-3 h-3 text-[#c9a86a] group-hover:animate-bounce" />
                      Húzd a térképre!
                    </span>
                  </div>

                  {/* Card Main Title & Emoji */}
                  <div className="flex items-center gap-3 bg-[#121417] rounded-xl p-2.5 border border-[#3d3329]">
                    <div className="w-12 h-12 rounded-xl bg-[#2c241d] border border-[#8e7345] flex items-center justify-center text-2xl shadow-inner shrink-0 group-hover:rotate-6 transition-transform">
                      {currentCard.visualEmoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-viking text-base md:text-lg font-bold text-[#c9a86a] tracking-wider truncate">
                        {currentCard.title}
                      </h3>
                      <p className="text-xs text-[#8e8e8e] line-clamp-1 font-serif">
                        {currentCard.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom guidance footer */}
                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#2c241d]">
                    <span className="text-[#8e8e8e] font-rune italic">
                      Melyik országhoz tartozik?
                    </span>
                    <span className={`font-semibold text-xs px-2.5 py-0.5 rounded-lg transition-colors ${isSelected ? 'bg-[#c9a86a] text-[#121417]' : 'bg-[#121417] text-[#c9a86a] border border-[#3d3329]'}`}>
                      {isSelected ? 'Kiválasztva! Kattints a térképre!' : 'Fogd meg vagy kattints rá!'}
                    </span>
                  </div>
                </div>

                {/* Trailing Molinó Streamer Edge */}
                <div className="hidden md:flex flex-col justify-between absolute -right-2 top-3 bottom-3 w-2 pointer-events-none opacity-70">
                  <div className="w-2 h-1 bg-[#c9a86a] rounded-r-full" />
                  <div className="w-1.5 h-1 bg-[#8e7345] rounded-r-full" />
                  <div className="w-2 h-1 bg-[#c9a86a] rounded-r-full" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
