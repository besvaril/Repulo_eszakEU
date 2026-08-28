import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, User, GraduationCap, ArrowRight, Compass, MapPin, Award } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface CaptainEntryScreenProps {
  onProceedToVehicleSelect: (captainName: string, captainSquad: string, captainAvatar: string) => void;
  initialName?: string;
  initialSquad?: string;
  initialAvatar?: string;
}

const AVATARS = [
  { id: 'viking_shield', emoji: '🛡️', label: 'Arany Pajzs' },
  { id: 'wolf', emoji: '🐺', label: 'Északi Farkas' },
  { id: 'bear', emoji: '🐻', label: 'Barlangi Medve' },
  { id: 'eagle', emoji: '🦅', label: 'Hegyi Sas' },
  { id: 'dragon', emoji: '🐉', label: 'Tengeri Sárkány' },
  { id: 'crown', emoji: '👑', label: 'Skandináv Korona' },
];

export const CaptainEntryScreen: React.FC<CaptainEntryScreenProps> = ({
  onProceedToVehicleSelect,
  initialName = '',
  initialSquad = '',
  initialAvatar = '🛡️',
}) => {
  const [captainName, setCaptainName] = useState<string>(initialName);
  const [captainSquad, setCaptainSquad] = useState<string>(initialSquad);
  const [selectedAvatar, setSelectedAvatar] = useState<string>(initialAvatar);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = captainName.trim();
    const trimmedSquad = captainSquad.trim();

    if (!trimmedName) {
      setErrorMessage('Kérlek, add meg a kapitány nevét a hajónaplóhoz!');
      soundEngine.playIncorrectThud();
      return;
    }

    if (!trimmedSquad) {
      setErrorMessage('Kérlek, add meg a kiképző tagozatodat (pl.: 7.a)!');
      soundEngine.playIncorrectThud();
      return;
    }

    setErrorMessage(null);
    soundEngine.playCardSnap();
    onProceedToVehicleSelect(trimmedName, trimmedSquad, selectedAvatar);
  };

  return (
    <div className="min-h-screen w-full bg-[#121417] text-[#e0d7cc] flex flex-col items-center justify-center p-3 sm:p-6 relative overflow-hidden select-none">
      
      {/* Ambient Aurora Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#c9a86a]/15 via-[#1c1e22]/50 to-[#121417] -z-10 animate-aurora" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#c9a86a]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Runic Runes Frame */}
      <div className="absolute top-4 left-6 text-[#c9a86a]/30 font-rune text-base hidden sm:block">
        ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ • ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛋ
      </div>
      <div className="absolute top-4 right-6 text-[#c9a86a]/30 font-rune text-base hidden sm:block">
        ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛞ ᛟ • VALHALLA 7. OSZTÁLY
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-xl bg-[#1c1e22]/95 border-2 border-[#8e7345] rounded-3xl p-5 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-md relative my-auto"
      >
        {/* Golden Nordic Badge */}
        <div className="flex justify-center -mt-12 sm:-mt-14 mb-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#c9a86a] via-[#8e7345] to-[#2c241d] border-4 border-[#121417] shadow-2xl flex items-center justify-center text-4xl sm:text-5xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
            {selectedAvatar}
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#121417] border border-[#c9a86a]/40 rounded-full text-xs text-[#c9a86a] font-viking tracking-widest uppercase mb-2">
            <Compass className="w-3.5 h-3.5 text-[#c9a86a] animate-spin" />
            <span>7. Osztályos Földrajzi Expedíció</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-viking font-black text-[#c9a86a] tracking-wider uppercase drop-shadow-md">
            Észak-Európa Kaland
          </h1>
          <p className="text-xs sm:text-sm text-[#8e8e8e] font-serif italic mt-1 max-w-md mx-auto">
            Dánia • Norvégia • Svédország • Finnország • Izland
          </p>
        </div>

        {/* Captain Greeting Callout */}
        <div className="bg-[#121417] border border-[#3d3329] rounded-2xl p-4 mb-6 relative">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2c241d] border border-[#8e7345] flex items-center justify-center text-2xl shrink-0">
              🛡️
            </div>
            <div>
              <h2 className="font-viking text-sm font-bold text-[#c9a86a] uppercase tracking-wide">
                A Kapitány üdvözlése
              </h2>
              <p className="text-xs sm:text-sm text-[#e0d7cc] font-serif leading-relaxed mt-1">
                „Üdvözöllek a fedélzeten, ifjú felfedező! Írd be a nevedet és a tagozatodat a skandináv hajónaplóba, válassz szállítójárművet, és hódítsd meg Észak-Európa 20 földrajzi kincsét!”
              </p>
            </div>
          </div>
        </div>

        {/* Entry Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Avatar Sigil Selector */}
          <div>
            <label className="block text-xs font-viking font-bold text-[#c9a86a] uppercase tracking-wider mb-2">
              Válassz kapitányi címert / jelvényt:
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((av) => (
                <button
                  type="button"
                  key={av.id}
                  onClick={() => setSelectedAvatar(av.emoji)}
                  className={`
                    h-12 rounded-xl border flex items-center justify-center text-2xl transition-all
                    ${
                      selectedAvatar === av.emoji
                        ? 'bg-[#2c241d] border-[#c9a86a] ring-2 ring-[#c9a86a]/50 scale-105 shadow-md'
                        : 'bg-[#121417] border-[#3d3329] hover:border-[#8e7345] opacity-75 hover:opacity-100'
                    }
                  `}
                  title={av.label}
                >
                  {av.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Captain Name Input */}
          <div>
            <label
              htmlFor="captain-name"
              className="block text-xs font-viking font-bold text-[#c9a86a] uppercase tracking-wider mb-1.5"
            >
              Kapitány neve:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8e7345]">
                <User className="w-4 h-4" />
              </div>
              <input
                id="captain-name"
                type="text"
                value={captainName}
                onChange={(e) => setCaptainName(e.target.value)}
                placeholder="pl.: Erik a Vörös / Lili / Bence"
                maxLength={30}
                className="w-full bg-[#121417] border-2 border-[#3d3329] focus:border-[#c9a86a] focus:ring-2 focus:ring-[#c9a86a]/30 rounded-xl py-3 pl-10 pr-4 text-sm font-sans text-[#e0d7cc] placeholder-[#6b655f] outline-none transition-all"
                autoFocus
              />
            </div>
          </div>

          {/* Training Squad / Class Input */}
          <div>
            <label
              htmlFor="captain-squad"
              className="block text-xs font-viking font-bold text-[#c9a86a] uppercase tracking-wider mb-1.5"
            >
              Kiképző tagozat:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8e7345]">
                <GraduationCap className="w-4 h-4" />
              </div>
              <input
                id="captain-squad"
                type="text"
                value={captainSquad}
                onChange={(e) => setCaptainSquad(e.target.value)}
                placeholder="pl.: 7.a vagy 7.b osztály"
                maxLength={20}
                className="w-full bg-[#121417] border-2 border-[#3d3329] focus:border-[#c9a86a] focus:ring-2 focus:ring-[#c9a86a]/30 rounded-xl py-3 pl-10 pr-4 text-sm font-sans text-[#e0d7cc] placeholder-[#6b655f] outline-none transition-all"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-[#2c1d1d] border border-[#8e4545] rounded-xl text-xs text-[#fca5a5] flex items-center gap-2"
            >
              <span className="text-base">⚠️</span>
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Quick Mission Highlights */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-[#8e8e8e]">
            <div className="bg-[#121417] border border-[#3d3329] rounded-xl p-2">
              <MapPin className="w-3.5 h-3.5 text-[#c9a86a] mx-auto mb-0.5" />
              <span>5 Északi Ország</span>
            </div>
            <div className="bg-[#121417] border border-[#3d3329] rounded-xl p-2">
              <Sparkles className="w-3.5 h-3.5 text-[#c9a86a] mx-auto mb-0.5" />
              <span>20 Földrajzi Kincs</span>
            </div>
            <div className="bg-[#121417] border border-[#3d3329] rounded-xl p-2">
              <Award className="w-3.5 h-3.5 text-[#c9a86a] mx-auto mb-0.5" />
              <span>7. Osztályos Érdemjegy</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-3 py-3.5 px-6 bg-gradient-to-r from-[#d4b984] via-[#c9a86a] to-[#8e7345] hover:brightness-110 active:scale-[0.98] text-[#121417] font-viking font-extrabold text-sm sm:text-base tracking-wider uppercase rounded-2xl shadow-[0_10px_25px_rgba(201,168,106,0.35)] flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <span>Tovább a járműválasztáshoz</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </motion.div>

      {/* Footer Info */}
      <footer className="mt-6 text-center text-xs text-[#6b655f] font-serif">
        <span>Viking Hajónapló & Térképes Gyakorló • 7. osztályos természetföldrajz és gazdaság</span>
      </footer>
    </div>
  );
};
