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
      <div className="bg-[#1c1e22]/95 border-2 border-[#c9a86a]/60 rounded-2xl p-3 shadow-2xl backdrop-blur-md text-center">
        <div className="inline-flex items-center gap-2 text-[#c9a86a] font-viking text-xs sm:text-sm">
          <Sparkles className="w-4 h-4 text-[#c9a86a] animate-spin" />
          <span>Minden rakomány célba ért a kikötőkben!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative select-none">
      {/* Runway / Voyage Container in Map Corner */}
      <div className="relative flex flex-col bg-[#1c1e22]/95 border-2 border-[#c9a86a] rounded-2xl p-2 sm:p-2.5 shadow-[0_12px_35px_rgba(0,0,0,0.9)] backdrop-blur-md">
        
        {/* Animated Flight / Voyage Squadron Header */}
        <div className="w-full flex items-center justify-between text-xs text-[#c9a86a] mb-1 px-1 gap-1">
          <div className="flex items-center gap-1.5 font-viking tracking-wider uppercase font-bold text-[10px] sm:text-[11px]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#c9a86a] animate-ping" />
            <span>{currentVehicle.carrierLabel} #{cardIndex + 1}/{totalCards}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {onChangeVehicle && (
              <button
                type="button"
                onClick={onChangeVehicle}
                className="flex items-center gap-1 text-[#d4b984] hover:text-white transition-all bg-[#2c241d] hover:bg-[#3d3329] px-2 py-0.5 rounded-lg border border-[#8e7345] text-[10px]"
                title="Válts más szállítójárműre"
              >
                <Compass className="w-3 h-3 text-[#c9a86a]" />
                <span className="font-sans font-bold">Járműváltás</span>
              </button>
            )}
          </div>
        </div>

        {/* 🚀 VEHICLE CONVOY: Vehicle at the top/left, Molinó Banner behind it */}
        <div className="w-full relative overflow-visible">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentCard.id}-${vehicleType}`}
              initial={{ x: 250, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -250, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 16,
                mass: 0.9,
              }}
              className="flex flex-col gap-1.5 relative"
            >
              {/* Top Vehicle Strip + Tow Cable */}
              <div className="flex items-center justify-between bg-[#121417] px-2 py-1 rounded-xl border border-[#3d3329]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-6 relative flex items-center justify-center overflow-hidden rounded bg-[#1c1e22]">
                    <img
                      src={currentVehicle.imageSrc}
                      alt={currentVehicle.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain -scale-x-100 filter drop-shadow-sm"
                    />
                  </div>
                  <span className="font-viking text-xs font-bold text-[#c9a86a] tracking-wide">
                    {currentVehicle.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#8e8e8e] font-mono">
                  <span>Vontatás</span>
                  <span className="animate-pulse text-[#c9a86a]">➔</span>
                </div>
              </div>

              {/* 📜 THE MOLINÓ BANNER (THE CARGO QUESTION CARD) */}
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
                  border-2 ${isSelected ? 'border-[#c9a86a] ring-2 ring-[#c9a86a]/40 scale-[1.01]' : 'border-[#3d3329] hover:border-[#c9a86a]'}
                  rounded-xl p-2 shadow-lg flex flex-col gap-1
                `}
              >
                {/* Top Badge & Category */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold font-sans px-1.5 py-0.5 rounded-full bg-[#2c241d] border border-[#3d3329] text-[#c9a86a]">
                    <span className="w-1 h-1 rounded-full bg-[#c9a86a]" />
                    {currentCard.categoryLabel}
                  </span>
                  
                  <span className="text-[10px] text-[#8e8e8e] font-sans flex items-center gap-1">
                    <Move className="w-3 h-3 text-[#c9a86a] group-hover:animate-bounce" />
                    Húzd a térképre!
                  </span>
                </div>

                {/* Card Main Title & Emoji */}
                <div className="flex items-center gap-2 bg-[#121417] rounded-lg p-1.5 border border-[#3d3329]">
                  <div className="w-8 h-8 rounded-lg bg-[#2c241d] border border-[#8e7345] flex items-center justify-center text-lg shadow-inner shrink-0 group-hover:rotate-6 transition-transform">
                    {currentCard.visualEmoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-viking text-xs sm:text-sm font-bold text-[#c9a86a] tracking-wider truncate">
                      {currentCard.title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-[#8e8e8e] line-clamp-1 font-serif">
                      {currentCard.description}
                    </p>
                  </div>
                </div>

                {/* Bottom guidance footer */}
                <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[#2c241d]">
                  <span className="text-[#8e8e8e] italic text-[9px] sm:text-[10px]">
                    Melyik országhoz tartozik?
                  </span>
                  <span className={`font-semibold text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded transition-colors ${isSelected ? 'bg-[#c9a86a] text-[#121417]' : 'bg-[#121417] text-[#c9a86a] border border-[#3d3329]'}`}>
                    {isSelected ? 'Kiválasztva! Kattints a célországra!' : 'Fogd meg vagy kattints rá!'}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
