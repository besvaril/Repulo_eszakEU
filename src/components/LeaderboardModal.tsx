import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Database,
  X,
  RefreshCw,
  Copy,
  Check,
  Award,
  Clock,
  Target,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import {
  getTopExpeditionResults,
  ExpeditionResult,
  isSupabaseConfigured,
  SUPABASE_SQL_SETUP,
  SUPABASE_TABLES,
} from '../lib/supabase';
import { soundEngine } from '../utils/audio';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'schema'>('leaderboard');
  const [results, setResults] = useState<ExpeditionResult[]>([]);
  const [dataSource, setDataSource] = useState<'supabase' | 'local'>('local');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isConfigured = isSupabaseConfigured();

  const loadData = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const resp = await getTopExpeditionResults(15);
      setResults(resp.results);
      setDataSource(resp.source);
      if (resp.error && !isConfigured) {
        // Normal info when keys not yet set
      } else if (resp.error) {
        setErrorMsg(resp.error);
      }
    } catch (e: any) {
      setErrorMsg(e?.message || 'Nem sikerült betölteni az adatokat.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setIsCopied(true);
    soundEngine.playCardSnap();
    setTimeout(() => setIsCopied(false), 2500);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}p ${rem < 10 ? '0' : ''}${rem}mp`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-2xl bg-[#1c1e22] border-2 border-[#8e7345] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden text-[#e0d7cc] my-auto flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2c241d] via-[#1c1e22] to-[#121417] border-b border-[#3d3329] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#c9a86a] text-[#121417] flex items-center justify-center text-xl font-bold shadow-lg">
                🏆
              </div>
              <div>
                <h2 className="font-viking text-base sm:text-lg font-bold text-[#c9a86a] uppercase tracking-wider">
                  Dicsőségcsarnok & Supabase Adatbázis
                </h2>
                <div className="flex items-center gap-2 text-xs text-[#8e8e8e]">
                  <span>Tábla: <strong className="text-[#e0d7cc] font-mono">{SUPABASE_TABLES.GAME_RESULTS}</strong></span>
                  <span>•</span>
                  {dataSource === 'supabase' ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Supabase Élő Kapcsolat
                    </span>
                  ) : (
                    <span className="text-[#d4b984] flex items-center gap-1">
                      <Database className="w-3.5 h-3.5" /> Helyi tárolás
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#121417] hover:bg-[#2c241d] text-[#8e8e8e] hover:text-[#e0d7cc] border border-[#3d3329] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-5 pt-3 bg-[#121417] border-b border-[#3d3329] flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('leaderboard')}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-viking font-bold uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
                activeTab === 'leaderboard'
                  ? 'text-[#c9a86a] border-[#c9a86a]'
                  : 'text-[#8e8e8e] border-transparent hover:text-[#e0d7cc]'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Kapitányi Ranglista</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('schema')}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-viking font-bold uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
                activeTab === 'schema'
                  ? 'text-[#c9a86a] border-[#c9a86a]'
                  : 'text-[#8e8e8e] border-transparent hover:text-[#e0d7cc]'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Supabase SQL Séma</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            {activeTab === 'leaderboard' ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#8e8e8e]">
                  <span>Összesen {results.length} rögzített expedíció</span>
                  <button
                    onClick={loadData}
                    disabled={isLoading}
                    className="inline-flex items-center gap-1 text-[#c9a86a] hover:underline cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    <span>Frissítés</span>
                  </button>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-[#2c1d1d] border border-[#8e4545] rounded-xl text-xs text-[#fca5a5] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {results.length === 0 ? (
                  <div className="p-8 text-center bg-[#121417] border border-[#3d3329] rounded-2xl">
                    <Trophy className="w-12 h-12 text-[#c9a86a]/40 mx-auto mb-2" />
                    <p className="font-viking text-sm font-bold text-[#c9a86a]">
                      Még nem fejeződött be expedíció!
                    </p>
                    <p className="text-xs text-[#8e8e8e] mt-1">
                      Játssz le egy menetet, juttasd célba a 20 kincset, és az eredményed automatikusan rögzítésre kerül az {SUPABASE_TABLES.GAME_RESULTS} táblába!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {results.map((res, idx) => {
                      const isTop3 = idx < 3;
                      const badgeColor =
                        idx === 0
                          ? 'bg-amber-400 text-black font-black'
                          : idx === 1
                          ? 'bg-slate-300 text-black font-black'
                          : idx === 2
                          ? 'bg-amber-700 text-white font-bold'
                          : 'bg-[#2c241d] text-[#8e8e8e]';

                      return (
                        <div
                          key={res.id || idx}
                          className={`p-3 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 transition-all ${
                            isTop3
                              ? 'bg-[#2c241d]/70 border-[#8e7345]'
                              : 'bg-[#121417] border-[#3d3329]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shadow ${badgeColor}`}>
                              {idx + 1}.
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-base">{res.avatar || '🛡️'}</span>
                                <span className="font-viking font-bold text-sm text-[#c9a86a]">
                                  {res.captain_name}
                                </span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-[#121417] border border-[#3d3329] text-[#e0d7cc] font-sans">
                                  {res.squad}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-[11px] text-[#8e8e8e] mt-0.5">
                                <span className="flex items-center gap-1">
                                  <Target className="w-3 h-3 text-[#c9a86a]" /> {res.accuracy}% pontosság
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-[#38bdf8]" /> {formatTime(res.elapsed_seconds)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-center">
                            {res.grade && (
                              <div className="text-right">
                                <span className="text-[10px] text-[#8e8e8e] block uppercase">Jegy</span>
                                <span className="text-xs font-bold text-[#c9a86a]">{res.grade}</span>
                              </div>
                            )}
                            <div className="bg-[#121417] border border-[#8e7345] px-3 py-1.5 rounded-xl text-right">
                              <span className="text-[10px] text-[#8e8e8e] block uppercase tracking-wider">Pontszám</span>
                              <span className="font-viking font-black text-sm text-[#d4b984]">
                                {res.final_score} pont
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-[#121417] border border-[#3d3329] rounded-2xl text-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#c9a86a] font-viking font-bold uppercase">
                    <Database className="w-4 h-4" />
                    <span>Supabase Tábla specifikáció: {SUPABASE_TABLES.GAME_RESULTS}</span>
                  </div>
                  <p className="text-[#8e8e8e] leading-relaxed">
                    A játék a kért <code className="text-[#c9a86a] font-mono font-bold">EE_</code> előtaggal hozza létre és kezeli a táblát.
                    Az alábbi mezők automatikusan mentésre kerülnek:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[#e0d7cc] font-mono text-[11px] pt-1">
                    <li>• <strong className="text-[#c9a86a]">captain_name</strong> (TEXT) - Kapitány neve</li>
                    <li>• <strong className="text-[#c9a86a]">squad</strong> (TEXT) - Kiképző tagozat (pl.: 7.a)</li>
                    <li>• <strong className="text-[#c9a86a]">accuracy</strong> (NUMERIC) - Pontosság %</li>
                    <li>• <strong className="text-[#c9a86a]">elapsed_seconds</strong> (INT) - Eltelt idő</li>
                    <li>• <strong className="text-[#c9a86a]">final_score</strong> (INT) - Végső pontszám</li>
                    <li>• <strong className="text-[#8e8e8e]">grade, vehicle, avatar</strong> (META)</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-viking font-bold text-[#c9a86a] uppercase">
                      Supabase SQL Editorba másolható szkript:
                    </span>
                    <button
                      onClick={handleCopySql}
                      className="px-3 py-1 bg-[#2c241d] hover:bg-[#3d3329] border border-[#8e7345] rounded-lg text-xs text-[#c9a86a] flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Másolva!' : 'SQL másolása'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-[#121417] border border-[#3d3329] rounded-xl text-[11px] text-[#e0d7cc] font-mono overflow-x-auto max-h-56 leading-relaxed select-all">
                    {SUPABASE_SQL_SETUP}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-[#121417] border-t border-[#3d3329] flex items-center justify-between">
            <span className="text-xs text-[#8e8e8e]">
              {isConfigured ? '🟢 Supabase API kulcsok csatlakoztatva' : '🟡 Supabase kulcsok hozzáadása a .env fájlban lehetséges'}
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c9a86a] to-[#8e7345] text-[#121417] font-viking font-bold text-xs uppercase tracking-wider cursor-pointer hover:brightness-110"
            >
              Bezárás
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
