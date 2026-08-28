import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Table names prefixed with EE as requested
export const SUPABASE_TABLES = {
  GAME_RESULTS: 'EE_game_results',
  CAPTAINS: 'EE_captains',
} as const;

export interface ExpeditionResult {
  id?: string;
  created_at?: string;
  captain_name: string;
  squad: string;
  accuracy: number; // Percentage (0-100)
  elapsed_seconds: number; // Time in seconds
  final_score: number; // Score points
  grade?: string; // e.g. "5*", "5", "4"
  mistakes?: number;
  vehicle?: string;
  avatar?: string;
}

// Lazy initialization of Supabase client to avoid crashes if keys are not yet provided
let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey && supabaseUrl.trim() !== '' && supabaseAnonKey.trim() !== '') {
    try {
      supabaseInstance = createClient(supabaseUrl.trim(), supabaseAnonKey.trim());
      return supabaseInstance;
    } catch (err) {
      console.warn('Supabase client initialization failed:', err);
      return null;
    }
  }

  return null;
}

export function isSupabaseConfigured(): boolean {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.trim() !== '' && supabaseAnonKey.trim() !== '');
}

/**
 * Saves a completed game expedition to the Supabase EE_game_results table
 */
export async function saveExpeditionResult(
  result: ExpeditionResult
): Promise<{ success: boolean; data?: ExpeditionResult; error?: string; isLocalFallback?: boolean }> {
  const client = getSupabaseClient();

  // Local fallback storage so data is never lost even if Supabase is offline or not yet configured
  try {
    const localHistory = JSON.parse(localStorage.getItem('EE_local_results') || '[]');
    const newEntry = {
      ...result,
      id: result.id || `local-${Date.now()}`,
      created_at: result.created_at || new Date().toISOString(),
    };
    localStorage.setItem('EE_local_results', JSON.stringify([newEntry, ...localHistory].slice(0, 50)));
  } catch (e) {
    console.error('Failed to save to local cache:', e);
  }

  if (!client) {
    return {
      success: true,
      isLocalFallback: true,
      error: 'A Supabase környezeti változók (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) még nincsenek megadva. Az eredmény helyileg tárolva lett.',
    };
  }

  try {
    const payload = {
      captain_name: result.captain_name,
      squad: result.squad,
      accuracy: result.accuracy,
      elapsed_seconds: result.elapsed_seconds,
      final_score: result.final_score,
      grade: result.grade || '5',
      mistakes: result.mistakes ?? 0,
      vehicle: result.vehicle || 'airplane',
      avatar: result.avatar || '🛡️',
    };

    const { data, error } = await client
      .from(SUPABASE_TABLES.GAME_RESULTS)
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.warn('Supabase insertion error on table EE_game_results:', error);
      return {
        success: false,
        isLocalFallback: true,
        error: error.message || 'Nem sikerült menteni a Supabase EE_game_results táblába.',
      };
    }

    return {
      success: true,
      data: data as ExpeditionResult,
    };
  } catch (err: any) {
    console.error('Supabase save error:', err);
    return {
      success: false,
      isLocalFallback: true,
      error: err?.message || 'Hálózati hiba történt a Supabase elérésekor.',
    };
  }
}

/**
 * Fetches the top scoring expeditions from Supabase EE_game_results table
 */
export async function getTopExpeditionResults(
  limit: number = 10
): Promise<{ results: ExpeditionResult[]; source: 'supabase' | 'local'; error?: string }> {
  const client = getSupabaseClient();

  if (!client) {
    const local = getLocalResults();
    return {
      results: local.slice(0, limit),
      source: 'local',
      error: 'Supabase nincs konfigurálva (helyi adatok megjelenítve)',
    };
  }

  try {
    const { data, error } = await client
      .from(SUPABASE_TABLES.GAME_RESULTS)
      .select('*')
      .order('final_score', { ascending: false })
      .order('elapsed_seconds', { ascending: true })
      .limit(limit);

    if (error || !data) {
      console.warn('Could not fetch from Supabase EE_game_results:', error);
      return {
        results: getLocalResults().slice(0, limit),
        source: 'local',
        error: error?.message,
      };
    }

    return {
      results: data as ExpeditionResult[],
      source: 'supabase',
    };
  } catch (err: any) {
    return {
      results: getLocalResults().slice(0, limit),
      source: 'local',
      error: err?.message,
    };
  }
}

/**
 * Helper to get locally cached results
 */
export function getLocalResults(): ExpeditionResult[] {
  try {
    const raw = localStorage.getItem('EE_local_results');
    if (!raw) return [];
    const parsed: ExpeditionResult[] = JSON.parse(raw);
    return parsed.sort((a, b) => b.final_score - a.final_score || a.elapsed_seconds - b.elapsed_seconds);
  } catch {
    return [];
  }
}

/**
 * SQL script helper for the user to run in Supabase SQL Editor
 */
export const SUPABASE_SQL_SETUP = `-- Supabase SQL tábla létrehozó szkript az Észak-Európa játékhoz
-- Másold be és futtasd a Supabase irányítópult -> SQL Editor felületén:

CREATE TABLE IF NOT EXISTS "EE_game_results" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    captain_name TEXT NOT NULL,
    squad TEXT NOT NULL,
    accuracy NUMERIC NOT NULL,
    elapsed_seconds INTEGER NOT NULL,
    final_score INTEGER NOT NULL,
    grade TEXT,
    mistakes INTEGER DEFAULT 0,
    vehicle TEXT,
    avatar TEXT
);

-- Indexek a gyors ranglista lekérdezésekhez
CREATE INDEX IF NOT EXISTS idx_EE_game_results_score ON "EE_game_results" (final_score DESC, elapsed_seconds ASC);
CREATE INDEX IF NOT EXISTS idx_EE_game_results_squad ON "EE_game_results" (squad);

-- Row Level Security (RLS) bekapcsolása és hozzáférés engedélyezése
ALTER TABLE "EE_game_results" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to EE_game_results"
ON "EE_game_results" FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read from EE_game_results"
ON "EE_game_results" FOR SELECT USING (true);
`;
