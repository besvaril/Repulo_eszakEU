import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, BookOpen, Flame, Award, CheckCircle2, Shield, Compass, Database, Check, Loader2 } from 'lucide-react';
import { COUNTRIES } from '../data/countriesData';
import { CountryId, CardItem } from '../types';
import { VehicleType, VEHICLES } from '../data/vehiclesData';
import { saveExpeditionResult, isSupabaseConfigured, SUPABASE_TABLES } from '../lib/supabase';

interface VictoryModalProps {
  isOpen: boolean;
  score: number;
  mistakes: number;
  maxStreak: number;
  durationSeconds: number;
  placedItems: Record<CountryId, CardItem[]>;
  vehicleType?: VehicleType;
  captainName?: string;
  captainSquad?: string;
  captainAvatar?: string;
  onRestart: () => void;
  onOpenStudyGuide: () => void;
  onOpenLeaderboard?: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  score,
  mistakes,
  maxStreak,
  durationSeconds,
  placedItems,
  vehicleType = 'airplane',
  captainName,
  captainSquad,
  captainAvatar = '🛡️',
  onRestart,
  onOpenStudyGuide,
  onOpenLeaderboard,
}) => {
  const currentVehicle = VEHICLES[vehicleType] || VEHICLES.airplane;
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'local'>('idle');

  useEffect(() => {
    if (isOpen) {
      // Trigger festive Norse confetti shower
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#38bdf8', '#22c55e', '#ef4444'],
      });

      const interval = setInterval(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 1400);

      // Auto-save result to Supabase EE_game_results table
      const accuracyCalc = Math.max(0, Math.round((20 / (20 + mistakes)) * 100));
      let calculatedGrade = '5';
      if (mistakes === 0) calculatedGrade = '5*';
      else if (mistakes <= 2) calculatedGrade = '5';
      else if (mistakes <= 5) calculatedGrade = '4';
      else if (mistakes <= 8) calculatedGrade = '3';
      else calculatedGrade = '2';

      setSaveStatus('saving');
      saveExpeditionResult({
        captain_name: captainName || 'Névtelen Kapitány',
        squad: captainSquad || '7.a',
        accuracy: accuracyCalc,
        elapsed_seconds: durationSeconds,
        final_score: score,
        grade: calculatedGrade,
        mistakes,
        vehicle: vehicleType,
        avatar: captainAvatar,
      }).then((res) => {
        if (res.success && !res.isLocalFallback) {
          setSaveStatus('saved');
        } else {
          setSaveStatus('local');
        }
      });

      return () => clearInterval(interval);
    }
  }, [isOpen, score, mistakes, durationSeconds, captainName, captainSquad, vehicleType, captainAvatar]);

  if (!isOpen) return null;

  // Grade calculation (Hungarian standard grading 1-5 for 7th grade)
  let grade = '5';
  let gradeText = 'Jeles (kiváló viking nagymester)';
  let gradeColor = 'text-[#c9a86a] border-[#8e7345] bg-[#2c241d]';

  if (mistakes === 0) {
    grade = '5*';
    gradeText = 'Csillagos ötös (tökéletes hadvezér!)';
    gradeColor = 'text-[#d4b984] border-[#c9a86a] bg-[#2c241d] shadow-[0_0_15px_rgba(201,168,106,0.3)]';
  } else if (mistakes <= 2) {
    grade = '5';
    gradeText = 'Jeles 5-ös (Odin büszkesége)';
    gradeColor = 'text-[#c9a86a] border-[#8e7345] bg-[#2c241d]';
  } else if (mistakes <= 5) {
    grade = '4';
    gradeText = 'Jó 4-es (bátor felfedező)';
    gradeColor = 'text-[#e0d7cc] border-[#3d3329] bg-[#1c1e22]';
  } else if (mistakes <= 8) {
    grade = '3';
    gradeText = 'Közepes 3-as (gyakorló harcos)';
    gradeColor = 'text-[#d4b984] border-[#3d3329] bg-[#1c1e22]';
  } else {
    grade = '2';
    gradeText = 'Elégséges 2-es (próbáld újra!)';
    gradeColor = 'text-[#8e4545] border-[#8e4545]/60 bg-[#1c1e22]';
  }

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}p ${remaining < 10 ? '0' : ''}${remaining}mp`;
  };

  const accuracy = Math.max(0, Math.round((20 / (20 + mistakes)) * 100));

  const countryKeys: CountryId[] = ['dk', 'no', 'se', 'fi', 'is'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-3xl bg-[#121417] border-2 border-[#3d3329] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden text-[#e0d7cc] my-auto"
      >
        {/* Banner with Trophy & Viking Cheers */}
        <div className="p-6 text-center bg-[#1c1e22] border-b border-[#3d3329] relative">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-3xl bg-[#2c241d] border-2 border-[#8e7345] flex items-center justify-center text-4xl md:text-5xl shadow-2xl animate-bounce mb-3 text-[#c9a86a]">
            🏆
          </div>

          <h2 className="font-viking text-2xl md:text-3xl font-extrabold text-[#c9a86a] tracking-wider uppercase">
            Győzelem! Észak-Európa meghódítva!
          </h2>
          {captainName ? (
            <p className="text-sm text-[#e0d7cc] font-serif mt-1">
              Gratulálunk, <strong className="text-[#c9a86a] font-viking">{captainName}</strong> kapitány
              {captainSquad && <span className="text-[#8e8e8e]"> ({captainSquad} tagozat)</span>}! Mind a 20 földrajzi rakomány sikeresen megérkezett a rendeltetési helyére!
            </p>
          ) : (
            <p className="text-sm text-[#8e8e8e] font-serif italic mt-1">
              Mind a 20 földrajzi rakomány sikeresen megérkezett a rendeltetési helyére!
            </p>
          )}

          {/* Hungarian Grade Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <div className={`inline-flex items-center gap-3 px-6 py-2 rounded-2xl border-2 shadow-lg backdrop-blur-md ${gradeColor}`}>
              <span className="font-viking text-3xl font-black text-[#c9a86a]">
                Jegy: {grade}
              </span>
              <div className="text-left border-l border-[#3d3329] pl-3">
                <span className="text-xs text-[#8e8e8e] font-sans block">Értékelés:</span>
                <span className="text-sm font-bold text-[#e0d7cc]">{gradeText}</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#121417] border border-[#3d3329] rounded-2xl text-xs text-[#e0d7cc] shadow-md">
              <span className="text-base">{currentVehicle.emoji}</span>
              <span className="font-sans">
                Jármű: <strong className="text-[#c9a86a]">{currentVehicle.name}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Stats Matrix */}
        <div className="p-5 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-3 bg-[#121417] border-b border-[#3d3329]">
          <div className="bg-[#1c1e22] border border-[#3d3329] p-3 rounded-2xl text-center">
            <Award className="w-5 h-5 text-[#c9a86a] mx-auto mb-1" />
            <span className="text-[11px] text-[#8e8e8e] block font-sans">Végső pontszám</span>
            <span className="font-viking text-xl font-bold text-[#c9a86a]">{score}</span>
          </div>

          <div className="bg-[#1c1e22] border border-[#3d3329] p-3 rounded-2xl text-center">
            <CheckCircle2 className="w-5 h-5 text-[#c9a86a] mx-auto mb-1" />
            <span className="text-[11px] text-[#8e8e8e] block font-sans">Pontosság</span>
            <span className="font-viking text-xl font-bold text-[#e0d7cc]">{accuracy}%</span>
          </div>

          <div className="bg-[#1c1e22] border border-[#3d3329] p-3 rounded-2xl text-center">
            <Flame className="w-5 h-5 text-[#c9a86a] mx-auto mb-1" />
            <span className="text-[11px] text-[#8e8e8e] block font-sans">Max. széria</span>
            <span className="font-viking text-xl font-bold text-[#c9a86a]">{maxStreak}×</span>
          </div>

          <div className="bg-[#1c1e22] border border-[#3d3329] p-3 rounded-2xl text-center">
            <Shield className="w-5 h-5 text-[#c9a86a] mx-auto mb-1" />
            <span className="text-[11px] text-[#8e8e8e] block font-sans">Eltelt idő</span>
            <span className="font-viking text-xl font-bold text-[#e0d7cc]">
              {formatTime(durationSeconds)}
            </span>
          </div>
        </div>

        {/* Database Save Status Banner */}
        <div className="px-5 py-2.5 bg-[#16181d] border-b border-[#3d3329] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#c9a86a]" />
            <span className="text-[#8e8e8e]">
              Supabase tábla: <strong className="text-[#e0d7cc] font-mono">{SUPABASE_TABLES.GAME_RESULTS}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {saveStatus === 'saving' && (
              <span className="text-[#d4b984] flex items-center gap-1.5 font-sans">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Eredmény mentése...
              </span>
            )}
            {saveStatus === 'saved' && (
              <span className="text-emerald-400 flex items-center gap-1.5 font-sans font-bold">
                <Check className="w-3.5 h-3.5" /> Sikeresen rögzítve a Supabase-ben!
              </span>
            )}
            {saveStatus === 'local' && (
              <span className="text-[#d4b984] flex items-center gap-1.5 font-sans">
                <Check className="w-3.5 h-3.5" /> Helyi hajónaplóban tárolva
              </span>
            )}
          </div>
        </div>

        {/* Completed 5 Countries Overview Summary */}
        <div className="p-5 max-h-[35vh] overflow-y-auto space-y-2 bg-[#121417]">
          <h3 className="font-viking text-xs font-bold text-[#c9a86a] tracking-widest uppercase mb-2">
            Összesítő az észak-európai országokról:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {countryKeys.map((cId) => {
              const country = COUNTRIES[cId];
              const items = placedItems[cId] || [];
              return (
                <div
                  key={cId}
                  className="bg-[#1c1e22] border border-[#3d3329] rounded-xl p-2.5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{country.flag}</span>
                    <div>
                      <div className="font-viking font-bold text-xs text-[#c9a86a]">
                        {country.name}
                      </div>
                      <div className="text-[10px] text-[#8e8e8e]">
                        Főváros: {country.capital}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {items.map((it) => (
                      <span
                        key={it.id}
                        title={`${it.title}: ${it.description}`}
                        className="text-base bg-[#121417] px-1.5 py-0.5 rounded border border-[#3d3329]"
                      >
                        {it.visualEmoji}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="p-4 md:p-5 border-t border-[#3d3329] bg-[#1c1e22] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenStudyGuide}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#121417] hover:bg-[#2c241d] border border-[#3d3329] text-[#8e8e8e] hover:text-[#c9a86a] font-semibold text-xs transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#c9a86a]" />
              <span>Tananyag</span>
            </button>

            {onOpenLeaderboard && (
              <button
                onClick={onOpenLeaderboard}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#121417] hover:bg-[#2c241d] border border-[#8e7345] text-[#c9a86a] font-bold text-xs transition-colors"
              >
                <Trophy className="w-4 h-4 text-[#c9a86a]" />
                <span>Dicsőségcsarnok</span>
              </button>
            )}
          </div>

          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#c9a86a] hover:bg-[#d4b984] text-[#121417] font-viking font-extrabold text-sm tracking-wider uppercase transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-[#121417]" />
            <span>Új kaland indítása!</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
