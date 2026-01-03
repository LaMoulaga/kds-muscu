-- Table pour le suivi du poids
CREATE TABLE public.weight_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  weight DECIMAL(5,2) NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les sessions d'entraînement
CREATE TABLE public.workout_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  day_name TEXT NOT NULL,
  workout_title TEXT NOT NULL,
  session_date DATE NOT NULL DEFAULT CURRENT_DATE,
  duration_minutes INTEGER,
  notes TEXT,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les exercices effectués dans une session
CREATE TABLE public.session_exercises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.workout_sessions(id) ON DELETE CASCADE,
  exercise_name TEXT NOT NULL,
  planned_sets INTEGER NOT NULL,
  planned_reps TEXT NOT NULL,
  planned_weight TEXT NOT NULL,
  actual_sets INTEGER,
  actual_reps TEXT,
  actual_weight TEXT,
  completed BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (sans restrictions car pas d'auth pour l'instant - usage personnel)
ALTER TABLE public.weight_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_exercises ENABLE ROW LEVEL SECURITY;

-- Policies pour accès public (usage personnel sans auth)
CREATE POLICY "Allow all access to weight_entries" ON public.weight_entries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to workout_sessions" ON public.workout_sessions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to session_exercises" ON public.session_exercises FOR ALL USING (true) WITH CHECK (true);

-- Index pour améliorer les performances
CREATE INDEX idx_weight_entries_date ON public.weight_entries(date DESC);
CREATE INDEX idx_workout_sessions_date ON public.workout_sessions(session_date DESC);
CREATE INDEX idx_session_exercises_session ON public.session_exercises(session_id);