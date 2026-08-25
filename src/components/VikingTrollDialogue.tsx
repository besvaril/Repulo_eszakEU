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
    <div className="w-full max-w-4xl mx-auto my-2 px-2 select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className={`
            relative rounded-2xl p-3.5 md:p-4 border-2 shadow-2xl flex items-start gap-3 md:gap-4
            ${
              message.mood === 'happy' || message.mood === 'excited'
                ? 'bg-[#1c1e22] border-[#c9a86a] shadow-[0_0_20px_rgba(201,168,106,0.2)]'
                : message.mood === 'oops'
                ? 'bg-[#1c1e22] border-[#8e4545]/80 shadow-[0_0_20px_rgba(142,69,69,0.2)]'
                : 'bg-[#1c1e22] border-[#3d3329]'
            }
          `}
        >
          {/* Avatar Icon */}
          <div className="relative shrink-0 flex flex-col items-center">
            <div
              className={`
                w-12 h-12 md:w-14 md:h-14 rounded-2xl border-2 flex items-center justify-center text-2xl md:text-3xl shadow-inner
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
            <span
              className={`text-[10px] font-viking font-bold mt-1.5 px-2 py-0.5 rounded-full border ${
                isViking
                  ? 'bg-[#121417] text-[#c9a86a] border-[#3d3329]'
                  : 'bg-[#121417] text-[#a4bfa2] border-[#3d3329]'
              }`}
            >
              {isViking ? 'Einar, a skald' : 'Torvald, a troll'}
            </span>
          </div>

          {/* Dialogue Text Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <MessageSquareQuote className="w-4 h-4 text-[#c9a86a] shrink-0" />
              <span className="font-viking text-xs text-[#c9a86a] font-bold tracking-widest uppercase">
                {isViking ? 'A viking bölcsessége' : 'A hegyi troll tanácsa'}
              </span>
              {message.mood === 'excited' && (
                <span className="inline-flex items-center gap-1 text-[10px] text-[#c9a86a] font-bold bg-[#2c241d] px-2.5 py-0.5 rounded-full border border-[#3d3329]">
                  <Sparkles className="w-3 h-3" /> Jeles találat!
                </span>
              )}
            </div>

            <p className="text-sm md:text-base font-serif text-[#e0d7cc] leading-relaxed">
              {message.text}
            </p>

            {/* 7th Grade Curriculum Explanatory Fact */}
            {curriculumFact && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2.5 pt-2.5 border-t border-[#3d3329] text-xs font-body text-[#e0d7cc]/90 bg-[#121417] p-2.5 rounded-xl border border-[#2c241d]"
              >
                <span className="font-bold text-[#c9a86a]">📖 7. osztályos földrajzi tudnivaló: </span>
                {curriculumFact}
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
