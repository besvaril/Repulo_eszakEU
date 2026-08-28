import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VehicleType, VEHICLE_LIST, VEHICLES } from '../data/vehiclesData';
import { Check, Compass, Sparkles, Shield, Play } from 'lucide-react';

interface VehicleSelectModalProps {
  isOpen: boolean;
  selectedVehicle: VehicleType;
  captainName?: string;
  captainSquad?: string;
  captainAvatar?: string;
  onSelectVehicle: (vehicle: VehicleType) => void;
  onStartGame: () => void;
  onBackToEntry?: () => void;
  isInitialStart?: boolean;
}

export const VehicleSelectModal: React.FC<VehicleSelectModalProps> = ({
  isOpen,
  selectedVehicle,
  captainName,
  captainSquad,
  captainAvatar = '🛡️',
  onSelectVehicle,
  onStartGame,
  onBackToEntry,
  isInitialStart = false,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-3xl bg-[#1c1e22] border-2 border-[#8e7345] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-b from-[#2c241d] to-[#1c1e22] p-5 sm:p-6 border-b border-[#3d3329] text-center relative">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#121417] border border-[#c9a86a]/40 rounded-full text-xs text-[#c9a86a] font-viking tracking-widest uppercase">
                <Compass className="w-3.5 h-3.5 text-[#c9a86a] animate-spin" />
                <span>2. Lépés: Északi Járműválasztó</span>
              </div>

              {captainName && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#121417] border border-[#3d3329] rounded-full text-xs text-[#e0d7cc] font-sans">
                  <span>{captainAvatar}</span>
                  <span className="font-bold text-[#c9a86a]">{captainName}</span>
                  {captainSquad && <span className="text-[#8e8e8e]">({captainSquad})</span>}
                </div>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-viking font-extrabold text-[#c9a86a] tracking-wide uppercase">
              Válaszd ki a szállítójárművedet!
            </h2>
            <p className="text-xs sm:text-sm text-[#8e8e8e] font-serif italic max-w-lg mx-auto mt-1">
              Mivel szeretnéd eljuttatni a 20 észak-európai földrajzi kincset és fogalmat a rendeltetési helyére?
            </p>
          </div>

          {/* Vehicle Cards Grid */}
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {VEHICLE_LIST.map((vehicle) => {
              const isSelected = selectedVehicle === vehicle.id;

              return (
                <div
                  key={vehicle.id}
                  onClick={() => onSelectVehicle(vehicle.id)}
                  className={`
                    group cursor-pointer rounded-2xl p-4 transition-all duration-200 relative flex flex-col justify-between
                    ${
                      isSelected
                        ? 'bg-[#2c241d] border-2 border-[#c9a86a] shadow-[0_0_25px_rgba(201,168,106,0.3)] scale-[1.02]'
                        : 'bg-[#121417] border-2 border-[#3d3329] hover:border-[#8e7345] hover:bg-[#181a1e]'
                    }
                  `}
                >
                  {/* Selected Indicator Badge */}
                  {isSelected && (
                    <div className="absolute -top-2.5 right-3 bg-[#c9a86a] text-[#121417] text-[11px] font-bold font-sans px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md z-10">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>Kiválasztva</span>
                    </div>
                  )}

                  <div>
                    {/* Vehicle Image Preview Container */}
                    <div className="w-full h-36 bg-[#1c1e22] rounded-xl border border-[#3d3329] overflow-hidden flex items-center justify-center p-2 relative group-hover:border-[#c9a86a]/60 transition-colors">
                      <img
                        src={vehicle.imageSrc}
                        alt={vehicle.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute bottom-1.5 left-2 text-[10px] font-mono text-[#8e8e8e] bg-[#121417]/80 px-1.5 py-0.5 rounded">
                        {vehicle.shortCode}
                      </span>
                    </div>

                    {/* Vehicle Details */}
                    <div className="mt-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-base">{vehicle.emoji}</span>
                        <h3 className="font-viking text-sm font-bold text-[#c9a86a] leading-tight">
                          {vehicle.name}
                        </h3>
                      </div>
                      <span className="text-[11px] font-semibold text-[#8e7345] block mb-2">
                        {vehicle.categoryName}
                      </span>
                      <p className="text-xs text-[#e0d7cc]/80 font-serif leading-relaxed line-clamp-3">
                        {vehicle.description}
                      </p>
                    </div>
                  </div>

                  {/* Rating / Speed Badge & Selection Action */}
                  <div className="mt-4 pt-3 border-t border-[#3d3329]/60 flex flex-col gap-2">
                    <span className="text-[11px] font-sans text-[#8e8e8e]">
                      {vehicle.speedRating}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectVehicle(vehicle.id);
                      }}
                      className={`
                        w-full py-2 px-3 rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center gap-1.5
                        ${
                          isSelected
                            ? 'bg-[#c9a86a] text-[#121417] shadow-md'
                            : 'bg-[#1c1e22] text-[#c9a86a] border border-[#3d3329] hover:bg-[#2c241d] hover:border-[#8e7345]'
                        }
                      `}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Ezzel játszom!</span>
                        </>
                      ) : (
                        <span>Kiválasztás</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Action Bar */}
          <div className="bg-[#121417] p-4 sm:p-5 border-t border-[#3d3329] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              {onBackToEntry && (
                <button
                  type="button"
                  onClick={onBackToEntry}
                  className="px-3.5 py-2 rounded-xl bg-[#1c1e22] hover:bg-[#2c241d] border border-[#3d3329] text-xs font-bold text-[#8e8e8e] hover:text-[#c9a86a] transition-all cursor-pointer"
                >
                  ← Vissza a belépéshez
                </button>
              )}

              <div className="flex items-center gap-2 text-xs text-[#8e8e8e]">
                <Shield className="w-4 h-4 text-[#c9a86a]" />
                <span className="hidden sm:inline">
                  Választás:{' '}
                  <strong className="text-[#c9a86a]">
                    {VEHICLES[selectedVehicle].name}
                  </strong>
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onStartGame}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#d4b984] via-[#c9a86a] to-[#8e7345] hover:brightness-110 active:scale-95 text-[#121417] font-viking font-bold text-sm tracking-wider uppercase rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-[#121417]" />
              <span>{isInitialStart ? 'Induljon a skandináv expedíció!' : 'Kész, folytatom a játékot!'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
