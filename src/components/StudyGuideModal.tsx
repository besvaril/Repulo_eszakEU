import React, { useState } from 'react';
import { motion } from 'motion/react';
import { COUNTRIES, ALL_CARD_ITEMS } from '../data/countriesData';
import { CountryId } from '../types';
import { X, BookOpen, Search, Shield, CheckCircle2 } from 'lucide-react';

interface StudyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountryFilter?: CountryId | null;
}

export const StudyGuideModal: React.FC<StudyGuideModalProps> = ({
  isOpen,
  onClose,
  selectedCountryFilter = null,
}) => {
  const [activeTab, setActiveTab] = useState<CountryId | 'all'>(selectedCountryFilter || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const countryKeys: CountryId[] = ['dk', 'no', 'se', 'fi', 'is'];

  const filteredItems = ALL_CARD_ITEMS.filter((item) => {
    const matchesCountry = activeTab === 'all' || item.countryId === activeTab;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.curriculumFact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      COUNTRIES[item.countryId].name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-4xl max-h-[90vh] bg-[#121417] border-2 border-[#3d3329] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden text-[#e0d7cc]"
      >
        {/* Modal Header */}
        <div className="p-4 md:p-5 border-b border-[#3d3329] bg-[#1c1e22] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2c241d] border border-[#8e7345] flex items-center justify-center text-[#c9a86a]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-viking text-lg md:text-xl font-bold text-[#c9a86a] tracking-wider uppercase">
                Észak-Európa tanulói kódexe
              </h2>
              <p className="text-xs text-[#8e8e8e] font-rune italic">
                7. osztályos összefoglaló az 5 országról és a 20 kulcsfogalomról
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

        {/* Filter & Search Bar */}
        <div className="p-3 md:p-4 border-b border-[#3d3329] bg-[#1c1e22]/60 flex flex-wrap items-center justify-between gap-3">
          {/* Country Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-[#c9a86a] text-[#121417] font-bold shadow-md'
                  : 'bg-[#121417] text-[#8e8e8e] border border-[#3d3329] hover:text-[#e0d7cc] hover:border-[#c9a86a]'
              }`}
            >
              Összes (20)
            </button>
            {countryKeys.map((cId) => {
              const c = COUNTRIES[cId];
              return (
                <button
                  key={cId}
                  onClick={() => setActiveTab(cId)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === cId
                      ? 'bg-[#c9a86a] text-[#121417] font-bold shadow-md'
                      : 'bg-[#121417] text-[#8e8e8e] border border-[#3d3329] hover:text-[#e0d7cc] hover:border-[#c9a86a]'
                  }`}
                >
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[200px] flex-1 max-w-xs">
            <Search className="w-4 h-4 text-[#8e8e8e] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Keresés fogalmak között..."
              className="w-full bg-[#121417] border border-[#3d3329] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#e0d7cc] placeholder:text-[#8e8e8e] focus:outline-none focus:border-[#c9a86a]"
            />
          </div>
        </div>

        {/* Content Cards Grid */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const country = COUNTRIES[item.countryId];
            return (
              <div
                key={item.id}
                className="bg-[#1c1e22] border border-[#3d3329] hover:border-[#c9a86a] rounded-2xl p-4 transition-all duration-200 flex flex-col gap-2.5 shadow-md"
              >
                {/* Header with emoji, title and country */}
                <div className="flex items-center justify-between gap-2 border-b border-[#2c241d] pb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 bg-[#121417] rounded-xl border border-[#3d3329]">
                      {item.visualEmoji}
                    </span>
                    <div>
                      <h3 className="font-viking text-base font-bold text-[#c9a86a]">
                        {item.title}
                      </h3>
                      <span className="text-[11px] text-[#8e8e8e] font-sans">
                        {item.categoryLabel}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#121417] border border-[#3d3329]">
                    <span>{country.flag}</span>
                    <span className="text-[#e0d7cc]">{country.name}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#8e8e8e] font-serif leading-relaxed">
                  {item.description}
                </p>

                {/* Curriculum Fact Box */}
                <div className="bg-[#121417] border border-[#2c241d] rounded-xl p-2.5 text-xs text-[#e0d7cc]/90 font-sans">
                  <span className="font-bold text-[#c9a86a] block mb-0.5">
                    📚 Miért fontos ez a földrajzórán?
                  </span>
                  {item.curriculumFact}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-3 md:p-4 border-t border-[#3d3329] bg-[#1c1e22] flex items-center justify-between text-xs text-[#8e8e8e]">
          <span>7. osztályos tananyag Észak-Európa természet- és gazdaságföldrajzáról.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#c9a86a] hover:bg-[#d4b984] text-[#121417] font-bold tracking-wider uppercase transition-all shadow-md active:scale-95"
          >
            Értem, vissza a játékhoz!
          </button>
        </div>
      </motion.div>
    </div>
  );
};
