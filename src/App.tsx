/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { CardItem, CountryId, MascotMessage, CountryInfo } from './types';
import { ALL_CARD_ITEMS, COUNTRIES, VIKING_QUOTES } from './data/countriesData';
import { VehicleType, VEHICLES } from './data/vehiclesData';
import { soundEngine } from './utils/audio';
import { HeaderBar } from './components/HeaderBar';
import { VikingPlane } from './components/VikingPlane';
import { NordicMap } from './components/NordicMap';
import { VikingTrollDialogue } from './components/VikingTrollDialogue';
import { StudyGuideModal } from './components/StudyGuideModal';
import { CountryDetailsModal } from './components/CountryDetailsModal';
import { VictoryModal } from './components/VictoryModal';
import { VehicleSelectModal } from './components/VehicleSelectModal';

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  // Vehicle selection state (opens at start of the game)
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>('airplane');
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState<boolean>(true);
  const [hasStartedGame, setHasStartedGame] = useState<boolean>(false);

  // Game state
  const [deck, setDeck] = useState<CardItem[]>(() => shuffleArray(ALL_CARD_ITEMS));
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [placedItems, setPlacedItems] = useState<Record<CountryId, CardItem[]>>({
    dk: [],
    no: [],
    se: [],
    fi: [],
    is: [],
  });

  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Time tracking
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Mascot dialogue state
  const [mascotMessage, setMascotMessage] = useState<MascotMessage>({
    speaker: 'viking',
    text: 'Üdvözöllek, ifjú vándor! Válaszd ki a szállítójárművedet, majd húzd a rakományokat a megfelelő északi országra a térképen!',
    mood: 'neutral',
    id: 1,
  });
  const [activeCurriculumFact, setActiveCurriculumFact] = useState<string | null>(null);

  // Interaction state
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [draggedCard, setDraggedCard] = useState<CardItem | null>(null);
  const [lastDroppedCountry, setLastDroppedCountry] = useState<CountryId | null>(null);
  const [isErrorAnimation, setIsErrorAnimation] = useState<boolean>(false);

  // Modals state
  const [isStudyGuideOpen, setIsStudyGuideOpen] = useState<boolean>(false);
  const [inspectingCountry, setInspectingCountry] = useState<CountryInfo | null>(null);

  // Current active card being towed by the vehicle
  const currentCard = currentCardIndex < deck.length ? deck[currentCardIndex] : null;

  // Sound whoosh on card flight
  useEffect(() => {
    if (currentCard && !isCompleted && hasStartedGame) {
      soundEngine.playPlaneWhoosh();
    }
  }, [currentCardIndex, isCompleted, hasStartedGame]);

  // Timer interval
  useEffect(() => {
    if (isCompleted || !hasStartedGame) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, isCompleted, hasStartedGame]);

  // Handle vehicle confirmation
  const handleConfirmVehicle = (veh: VehicleType) => {
    setSelectedVehicle(veh);
    setIsVehicleModalOpen(false);
    setHasStartedGame(true);
    setStartTime(Date.now());

    const vehicleObj = VEHICLES[veh];
    setMascotMessage({
      speaker: 'viking',
      text: `Kiváló választás: a ${vehicleObj.name}! Húzd a rakományt vagy kattints rá, majd válaszd ki a megfelelő észak-európai országot!`,
      mood: 'excited',
      id: Date.now(),
    });
    soundEngine.playPlaneWhoosh();
  };

  // Handle card placement (by drag-and-drop or click)
  const handleAssignToCountry = useCallback(
    (targetCountryId: CountryId) => {
      const cardToPlace = draggedCard || selectedCard || currentCard;
      if (!cardToPlace || isCompleted) return;

      const targetCountry = COUNTRIES[targetCountryId];

      if (cardToPlace.countryId === targetCountryId) {
        // ✅ CORRECT MATCH
        soundEngine.playCorrectChime();

        // Increment placed items
        setPlacedItems((prev) => ({
          ...prev,
          [targetCountryId]: [...prev[targetCountryId], cardToPlace],
        }));

        // Calculate score
        const newStreak = streak + 1;
        setStreak(newStreak);
        setMaxStreak((prev) => Math.max(prev, newStreak));
        setScore((prev) => prev + 100 + newStreak * 20);

        if (newStreak % 3 === 0) {
          soundEngine.playVikingHorn();
        }

        // Mascot cheer & 7th grade curriculum explanation
        const randomQuote =
          VIKING_QUOTES.correct[Math.floor(Math.random() * VIKING_QUOTES.correct.length)];
        setMascotMessage({
          speaker: 'viking',
          text: `${randomQuote} A(z) "${cardToPlace.title}" sikeresen megérkezett ${targetCountry.name} területére!`,
          mood: newStreak > 2 ? 'excited' : 'happy',
          id: Date.now(),
        });
        setActiveCurriculumFact(cardToPlace.curriculumFact);

        // Reset active selections
        setSelectedCard(null);
        setDraggedCard(null);
        setLastDroppedCountry(targetCountryId);
        setIsErrorAnimation(false);

        // Check if finished
        const nextIndex = currentCardIndex + 1;
        if (nextIndex >= deck.length) {
          setIsCompleted(true);
          soundEngine.playVictoryFanfare();
          setMascotMessage({
            speaker: 'viking',
            text: 'DICSŐSÉG! Mind az 5 északi ország mind a 20 kincsét sikeresen a helyére juttattad!',
            mood: 'excited',
            id: Date.now() + 1,
          });
        } else {
          setCurrentCardIndex(nextIndex);
        }
      } else {
        // ❌ INCORRECT MATCH
        soundEngine.playIncorrectThud();
        setMistakes((prev) => prev + 1);
        setStreak(0);
        setScore((prev) => Math.max(0, prev - 25));

        setLastDroppedCountry(targetCountryId);
        setIsErrorAnimation(true);
        setTimeout(() => setIsErrorAnimation(false), 600);

        const trollQuote =
          VIKING_QUOTES.incorrect[Math.floor(Math.random() * VIKING_QUOTES.incorrect.length)];
        setMascotMessage({
          speaker: 'troll',
          text: `${trollQuote} A(z) "${cardToPlace.title}" nem ${targetCountry.name} része! Gondold át, melyik északi országhoz tartozik!`,
          mood: 'oops',
          id: Date.now(),
        });
        setActiveCurriculumFact(null);
      }
    },
    [draggedCard, selectedCard, currentCard, isCompleted, streak, currentCardIndex, deck.length]
  );

  // Sound toggle handler
  const handleToggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  // Restart game
  const handleRestart = () => {
    setDeck(shuffleArray(ALL_CARD_ITEMS));
    setCurrentCardIndex(0);
    setPlacedItems({
      dk: [],
      no: [],
      se: [],
      fi: [],
      is: [],
    });
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setMistakes(0);
    setStartTime(Date.now());
    setElapsedSeconds(0);
    setIsCompleted(false);
    setSelectedCard(null);
    setDraggedCard(null);
    setLastDroppedCountry(null);
    setActiveCurriculumFact(null);
    setIsVehicleModalOpen(true);
    setMascotMessage({
      speaker: 'viking',
      text: 'Új északi expedíció indult! Válassz járművet az induláshoz!',
      mood: 'neutral',
      id: Date.now(),
    });
  };

  // Hint button
  const handleShowHint = () => {
    if (!currentCard) return;
    const country = COUNTRIES[currentCard.countryId];
    setMascotMessage({
      speaker: 'troll',
      text: `Súgó: A(z) "${currentCard.title}" (${currentCard.categoryLabel}) ${country.name} (${country.nativeName}) területéhez kötődik, melynek fővárosa ${country.capital}!`,
      mood: 'thinking',
      id: Date.now(),
    });
  };

  const totalPlacedCount = (Object.values(placedItems) as CardItem[][]).reduce(
    (sum: number, items: CardItem[]) => sum + items.length,
    0
  );

  return (
    <div className="min-h-screen w-full bg-[#121417] text-[#e0d7cc] flex flex-col font-body selection:bg-[#c9a86a]/30 selection:text-[#d4b984]">
      
      {/* 🧭 Top Navigation & Score Header */}
      <HeaderBar
        score={score}
        placedCount={totalPlacedCount}
        totalCount={ALL_CARD_ITEMS.length}
        streak={streak}
        isMuted={isMuted}
        vehicleType={selectedVehicle}
        onToggleMute={handleToggleMute}
        onOpenStudyGuide={() => setIsStudyGuideOpen(true)}
        onOpenVehicleSelect={() => setIsVehicleModalOpen(true)}
        onRestart={handleRestart}
      />

      {/* Main Game Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-4 md:p-6 flex flex-col gap-3 md:gap-4">
        
        {/* ✈️ / ⛵ / 🎈 VEHICLE CARGO TOWING STRIP */}
        <VikingPlane
          currentCard={currentCard}
          cardIndex={currentCardIndex}
          totalCards={ALL_CARD_ITEMS.length}
          vehicleType={selectedVehicle}
          onDragStart={(card) => {
            setDraggedCard(card);
            soundEngine.playCardSnap();
          }}
          onDragEnd={() => setDraggedCard(null)}
          onCardSelect={(card) => {
            setSelectedCard((prev) => (prev?.id === card.id ? null : card));
            soundEngine.playCardSnap();
          }}
          isSelected={selectedCard?.id === currentCard?.id}
          onShowHint={handleShowHint}
          onChangeVehicle={() => setIsVehicleModalOpen(true)}
        />

        {/* 🧌 MASCOT DIALOGUE / FEEDBACK BOX */}
        <VikingTrollDialogue
          message={mascotMessage}
          curriculumFact={activeCurriculumFact}
        />

        {/* 🗺️ INTERACTIVE NORTHERN EUROPE MAP */}
        <NordicMap
          placedItems={placedItems}
          activeCard={selectedCard || currentCard}
          onDropOnCountry={handleAssignToCountry}
          onCountryClick={handleAssignToCountry}
          onInspectCountry={(countryId) => setInspectingCountry(COUNTRIES[countryId])}
          lastDroppedCountry={lastDroppedCountry}
          isErrorAnimation={isErrorAnimation}
        />

        {/* 📜 7th Grade Summary Banner (At bottom of viewport) */}
        <footer className="w-full bg-[#1c1e22]/90 border border-[#3d3329] rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#8e8e8e] shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-[#c9a86a] font-bold font-viking">Észak-Európa országai:</span>
            <span className="text-[#e0d7cc]/90">🇩🇰 Dánia • 🇳🇴 Norvégia • 🇸🇪 Svédország • 🇫🇮 Finnország • 🇮🇸 Izland</span>
          </div>
          <button
            onClick={() => setIsStudyGuideOpen(true)}
            className="text-[#c9a86a] hover:text-[#d4b984] underline font-semibold cursor-pointer transition-colors"
          >
            Nézd meg mind a 20 földrajzi fogalmat a tanulókódexben →
          </button>
        </footer>

      </main>

      {/* 🚀 Vehicle Selection Modal (At start & on demand) */}
      <VehicleSelectModal
        isOpen={isVehicleModalOpen}
        selectedVehicle={selectedVehicle}
        onSelectVehicle={(veh) => setSelectedVehicle(veh)}
        onStartGame={() => handleConfirmVehicle(selectedVehicle)}
        isInitialStart={!hasStartedGame}
      />

      {/* 📚 Study Guide Modal */}
      <StudyGuideModal
        isOpen={isStudyGuideOpen}
        onClose={() => setIsStudyGuideOpen(false)}
      />

      {/* 🛡️ Country Details Modal */}
      <CountryDetailsModal
        country={inspectingCountry}
        placedItems={inspectingCountry ? placedItems[inspectingCountry.id] || [] : []}
        isOpen={Boolean(inspectingCountry)}
        onClose={() => setInspectingCountry(null)}
      />

      {/* 🏆 Victory Celebration Modal */}
      <VictoryModal
        isOpen={isCompleted}
        score={score}
        mistakes={mistakes}
        maxStreak={maxStreak}
        durationSeconds={elapsedSeconds}
        placedItems={placedItems}
        vehicleType={selectedVehicle}
        onRestart={handleRestart}
        onOpenStudyGuide={() => {
          setIsStudyGuideOpen(true);
        }}
      />

    </div>
  );
}
