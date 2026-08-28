import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MascotMessage } from '../types';
import { Sparkles, MessageSquareQuote } from 'lucide-react';

interface VikingTrollDialogueProps {
  message: MascotMessage;
  curriculumFact?: string | null;
}

export const VikingTrollDialogue: React.FC<VikingTrollDialogueProps> = ({
  message,
  curriculumFact,
}) => {
  const isViking = message.speaker === 'viking';

  return (
    <div className="w-full max-w-4xl mx-auto my-0.5 px-1 select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className={`
            relative rounded-xl p-2 sm:p-2.5 border shadow-lg flex items-center gap-2.5 sm:gap-3
            ${
              message.mood === 'happy' || message.mood === 'excited'
                ? 'bg-[#1c1e22]/90 border-[#c9a86a]/80 shadow-[0_0_15px_rgba(201,168,106,0.15)]'
                : message.mood === 'oops'
                ? 'bg-[#1c1e22]/90 border-[#8e4545]/80 shadow-[0_0_15px_rgba(142,69,69,0.15)]'
                : 'bg-[#1c1e22]/80 border-[#3d3329]'
            }
          `}
        >
          {/* Avatar Icon */}
          <div className="relative shrink-0 flex flex-col items-center">
            <div
              className={`
                w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center text-xl sm:text-2xl shadow-inner
                ${
                  isViking
                    ? 'bg-[#2c241d] border-[#8e7345]'
                    : 'bg-[#2c241d] border-[#6b7b68]'
                }
              `}
            >
              {isViking ? (
                message.mood === 'happy' || message.mood === 'excited' ? '🛡️' : '⚔️'
              ) : (
                message.mood === 'happy' || message.mood === 'excited' ? '🧌' : '🏔️'
              )}
            </div>
          </div>

          {/* Dialogue Text Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#c9a86a] shrink-0" />
              <span className="font-viking text-[11px] text-[#c9a86a] font-bold tracking-widest uppercase">
                {isViking ? 'Einar (Skald)' : 'Torvald (Troll)'}
              </span>
              {message.mood === 'excited' && (
                <span className="inline-flex items-center gap-1 text-[9px] text-[#c9a86a] font-bold bg-[#2c241d] px-2 py-0.2 rounded-full border border-[#3d3329]">
                  <Sparkles className="w-2.5 h-2.5" /> Jeles találat!
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm font-serif text-[#e0d7cc] leading-snug">
              {message.text}
            </p>

            {/* 7th Grade Curriculum Explanatory Fact */}
            {curriculumFact && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-1.5 pt-1.5 border-t border-[#3d3329] text-[11px] font-body text-[#e0d7cc]/90 bg-[#121417]/80 p-1.5 rounded-lg border border-[#2c241d]"
              >
                <span className="font-bold text-[#c9a86a]">📖 7. osztályos tananyag: </span>
                {curriculumFact}
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
