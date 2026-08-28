-- ==============================================================================
-- ÉSZAK-EURÓPA FÖLDRAJZI KALAND (7. OSZTÁLY) - SUPABASE SQL TÁBLÁK
-- ==============================================================================
-- Minden tábla 'EE_' előtaggal jön létre az ütközések elkerülése érdekében.
-- Futtasd ezt a szkriptet a Supabase irányítópult -> SQL Editor menüpontjában.
-- ==============================================================================

-- 1. FŐ EREDMÉNYEK ÉS EXPEDÍCIÓK TÁBLÁJA
-- Tárolja a kapitány nevét, tagozatát, pontosságát, idejét, végső pontszámát és érdemjegyét
CREATE TABLE IF NOT EXISTS "EE_game_results" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    captain_name TEXT NOT NULL,
    squad TEXT NOT NULL,
    accuracy NUMERIC(5,2) NOT NULL, -- pl. 95.00 vagy 100.00 (%)
    elapsed_seconds INTEGER NOT NULL, -- Eltelt idő másodpercben
    final_score INTEGER NOT NULL, -- Végső pontszám
    grade TEXT DEFAULT '5', -- 7. osztályos magyar érdemjegy (pl. '5*', '5', '4', '3', '2')
    mistakes INTEGER DEFAULT 0, -- Elkövetett hibák száma
    vehicle TEXT DEFAULT 'airplane', -- 'airplane' | 'ship' | 'balloon'
    avatar TEXT DEFAULT '🛡️' -- Kiválasztott címer / jelvény emoji
);

-- 2. TAGOZATOK / OSZTÁLYOK ÖSSZESÍTŐ NÉZETE (STATISZTIKA TAGOZATONKÉNT)
-- Segít a tanárnak látni, melyik osztály (pl. 7.a vs 7.b) érte el a legjobb átlagot
CREATE OR REPLACE VIEW "EE_squad_leaderboard" AS
SELECT 
    squad,
    COUNT(*) AS total_expeditions,
    ROUND(AVG(final_score), 0) AS avg_score,
    ROUND(AVG(accuracy), 1) AS avg_accuracy,
    MIN(elapsed_seconds) AS best_time_seconds,
    MAX(final_score) AS highest_score
FROM "EE_game_results"
GROUP BY squad
ORDER BY avg_score DESC, total_expeditions DESC;

-- 3. INDEXEK A GYORS RANGLISTA LEKÉRDEZÉSEKHEZ
CREATE INDEX IF NOT EXISTS idx_EE_game_results_score_time 
ON "EE_game_results" (final_score DESC, elapsed_seconds ASC);

CREATE INDEX IF NOT EXISTS idx_EE_game_results_squad 
ON "EE_game_results" (squad);

CREATE INDEX IF NOT EXISTS idx_EE_game_results_created 
ON "EE_game_results" (created_at DESC);

-- 4. ROW LEVEL SECURITY (RLS) BEÁLLÍTÁSA
-- Engedélyezi a webes kliens számára a biztonságos beszúrást és olvasást
ALTER TABLE "EE_game_results" ENABLE ROW LEVEL SECURITY;

-- Új játékeredmények rögzítésének engedélyezése
CREATE POLICY "Allow public insert to EE_game_results" 
ON "EE_game_results" 
FOR INSERT 
WITH CHECK (true);

-- Ranglista és eredmények nyilvános olvasásának engedélyezése
CREATE POLICY "Allow public read from EE_game_results" 
ON "EE_game_results" 
FOR SELECT 
USING (true);

-- ==============================================================================
-- SIKERES TELEPÍTÉS ELLENŐRZŐ LEKÉRDEZÉS:
-- SELECT * FROM "EE_game_results" LIMIT 10;
-- ==============================================================================
