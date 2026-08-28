import React from 'react';
import { Volume2, VolumeX, BookOpen, RotateCcw, Flame, Award, Shield, Compass } from 'lucide-react';
import { VehicleType, VEHICLES } from '../data/vehiclesData';

interface HeaderBarProps {
  score: number;
  placedCount: number;
  totalCount: number;
  streak: number;
  isMuted: boolean;
  vehicleType: VehicleType;
  captainName?: string;
  captainSquad?: string;
  captainAvatar?: string;
  onToggleMute: () => void;
  onOpenStudyGuide: () => void;
  onOpenVehicleSelect: () => void;
  onRestart: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  score,
  placedCount,
  totalCount,
  streak,
  isMuted,
  vehicleType,
  captainName,
  captainSquad,
  captainAvatar = '🛡️',
  onToggleMute,
  onOpenStudyGuide,
  onOpenVehicleSelect,
  onRestart,
}) => {
  // Calculate current percentage
  const progressPercent = Math.round((placedCount / totalCount) * 100);
  const currentVehicle = VEHICLES[vehicleType] || VEHICLES.airplane;

  return (
    <header className="w-full bg-[#1c1e22]/95 border-b-2 border-[#3d3329] backdrop-blur-md sticky top-0 z-30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        
        {/* Brand Title with Viking Shield Motif & Captain Profile */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#c9a86a] border-2 border-[#8e7345] flex items-center justify-center text-xl sm:text-2xl shadow-lg shrink-0 text-[#121417]">
            {captainAvatar}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-viking text-sm sm:text-lg font-bold text-[#c9a86a] tracking-widest uppercase">
                Észak-Európa Kaland
              </h1>
              {captainName ? (
                <span className="text-[11px] font-sans font-bold bg-[#2c241d] text-[#e0d7cc] border border-[#c9a86a]/50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="text-[#c9a86a] font-viking">Kapitány:</span> {captainName}
                  {captainSquad && <span className="text-[#8e8e8e]">({captainSquad})</span>}
                </span>
              ) : (
                <span className="text-[11px] font-sans font-bold bg-[#2c241d] text-[#c9a86a] border border-[#3d3329] px-2.5 py-0.5 rounded-full">
                  7. osztály
                </span>
              )}
            </div>
            <p className="text-xs text-[#8e8e8e] italic font-rune hidden md:block">
              🇩🇰 Dánia • 🇳🇴 Norvégia • 🇸🇪 Svédország • 🇫🇮 Finnország • 🇮🇸 Izland
            </p>
          </div>
        </div>

        {/* Stats & Progress Chips */}
        <div className="flex items-center gap-3 md:gap-5">
          
          {/* Progress Bar & Counter */}
          <div className="flex flex-col gap-1 min-w-[130px] md:min-w-[160px]">
            <div className="flex items-center justify-between text-xs font-sans text-[#8e8e8e]">
              <span className="flex items-center gap-1 font-semibold uppercase tracking-wider text-[#c9a86a]">
                <Shield className="w-3.5 h-3.5 text-[#c9a86a]" />
                Haladás
              </span>
              <span className="font-mono font-bold text-[#e0d7cc]">{placedCount} / {totalCount}</span>
            </div>
            <div className="w-full h-2.5 bg-[#2c241d] rounded-full overflow-hidden border border-[#3d3329]">
              <div
                className="h-full bg-[#c9a86a] shadow-[0_0_10px_rgba(201,168,106,0.6)] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Streak Counter */}
          {streak > 1 && (
            <div className="flex items-center gap-1.5 bg-[#2c241d] border border-[#c9a86a]/60 px-3 py-1.5 rounded-xl text-[#d4b984] text-xs font-bold shadow-md animate-gold-pulse">
              <Flame className="w-4 h-4 text-[#c9a86a] fill-[#c9a86a]" />
              <span>{streak}×-os széria</span>
            </div>
          )}

          {/* Score Badge */}
          <div className="flex items-center gap-2 bg-[#121417] border border-[#3d3329] px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#e0d7cc] shadow-inner">
            <Award className="w-4 h-4 text-[#c9a86a]" />
            <span className="font-mono text-[#c9a86a] text-sm">{score}</span>
            <span className="text-[#8e8e8e] text-[11px]">pont</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Vehicle Selector Button */}
            <button
              onClick={onOpenVehicleSelect}
              className="flex items-center gap-1.5 bg-[#2c241d] hover:bg-[#3d3329] border border-[#8e7345] text-[#c9a86a] px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
              title={`Jelenlegi jármű: ${currentVehicle.name} (Kattints a váltáshoz)`}
            >
              <span className="text-sm">{currentVehicle.emoji}</span>
              <span className="hidden lg:inline text-xs font-sans font-semibold">{currentVehicle.name.split(' ')[0]}</span>
              <Compass className="w-3.5 h-3.5 text-[#c9a86a]" />
            </button>

            {/* Audio Toggle */}
            <button
              onClick={onToggleMute}
              className={`p-2.5 rounded-xl border transition-all ${
                isMuted
                  ? 'bg-[#121417] border-[#3d3329] text-[#8e8e8e] hover:text-[#e0d7cc]'
                  : 'bg-[#2c241d] border-[#8e7345] text-[#c9a86a] hover:bg-[#3d3329]'
              }`}
              title={isMuted ? 'Zene és hangok bekapcsolása (Vargsången - The Wolf Song)' : 'Zene és hangok némítása (Vargsången - The Wolf Song)'}
              aria-label="Hangbeállítás"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Study Guide Button */}
            <button
              onClick={onOpenStudyGuide}
              className="flex items-center gap-2 bg-[#c9a86a] hover:bg-[#d4b984] text-[#121417] px-3.5 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-95"
              title="7. osztályos összefoglaló tanulókártyák"
            >
              <BookOpen className="w-4 h-4 text-[#121417]" />
              <span className="hidden md:inline">Kódex és súgó</span>
            </button>

            {/* Restart Button */}
            <button
              onClick={onRestart}
              className="p-2.5 rounded-xl bg-[#121417] hover:bg-[#2c241d] border border-[#3d3329] text-[#8e8e8e] hover:text-[#c9a86a] transition-all"
              title="Újrakezdés"
              aria-label="Újrakezdés"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};
