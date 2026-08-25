import React from 'react';
import { motion } from 'motion/react';
import { CountryInfo, CardItem } from '../types';
import { X, Shield, CheckCircle2, Circle, MapPin, Sparkles } from 'lucide-react';

interface CountryDetailsModalProps {
  country: CountryInfo | null;
  placedItems: CardItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const CountryDetailsModal: React.FC<CountryDetailsModalProps> = ({
  country,
  placedItems,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !country) return null;

  const placedIds = new Set(placedItems.map((item) => item.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-[#121417] border-2 border-[#3d3329] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#e0d7cc]"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#3d3329] bg-[#1c1e22] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <span className="text-4xl">{country.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-viking text-xl font-bold text-[#c9a86a] tracking-wider uppercase">
                  {country.name}
                </h2>
                <span className="text-xs text-[#8e8e8e] font-sans">({country.nativeName})</span>
              </div>
              <p className="text-xs text-[#8e8e8e] font-rune italic">
                {country.vikingTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#121417] hover:bg-[#2c241d] border border-[#3d3329] text-[#8e8e8e] hover:text-[#e0d7cc] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 overflow-y-auto max-h-[70vh]">
          {/* General info box */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1c1e22] border border-[#3d3329] p-3.5 rounded-2xl flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#c9a86a] shrink-0" />
              <div>
                <span className="text-[11px] text-[#8e8e8e] block font-sans">Főváros</span>
                <span className="font-bold text-sm text-[#e0d7cc]">{country.capital}</span>
              </div>
            </div>
            <div className="bg-[#1c1e22] border border-[#3d3329] p-3.5 rounded-2xl flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#c9a86a] shrink-0" />
              <div>
                <span className="text-[11px] text-[#8e8e8e] block font-sans">Begyűjtött kincsek</span>
                <span className="font-bold text-sm text-[#c9a86a]">
                  {placedItems.length} / {country.items.length} kártya
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#1c1e22] border border-[#3d3329] p-4 rounded-2xl">
            <span className="text-xs font-bold text-[#c9a86a] font-viking block mb-1 tracking-wider uppercase">
              Zászló és szimbólumok
            </span>
            <p className="text-xs text-[#8e8e8e] font-serif leading-relaxed">{country.flagDescription}</p>
          </div>

          {/* Assigned 4 items list */}
          <div>
            <h3 className="font-viking text-sm font-bold text-[#c9a86a] mb-2.5 flex items-center gap-2 tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-[#c9a86a]" />
              A 4 hozzárendelt földrajzi fogalom:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {country.items.map((item) => {
                const isFound = placedIds.has(item.id);
                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-2xl border transition-all ${
                      isFound
                        ? 'bg-[#2c241d] border-[#8e7345] text-[#d4b984] shadow-sm'
                        : 'bg-[#1c1e22] border-[#3d3329] text-[#8e8e8e]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.visualEmoji}</span>
                        <span className="font-viking font-bold text-sm text-[#c9a86a]">
                          {item.title}
                        </span>
                      </div>
                      {isFound ? (
                        <CheckCircle2 className="w-4 h-4 text-[#c9a86a]" />
                      ) : (
                        <Circle className="w-4 h-4 text-[#3d3329]" />
                      )}
                    </div>
                    <p className="text-xs text-[#8e8e8e] leading-tight font-serif">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#3d3329] bg-[#1c1e22] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#c9a86a] hover:bg-[#d4b984] text-[#121417] font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95"
          >
            Vissza a feladathoz
          </button>
        </div>
      </motion.div>
    </div>
  );
};
