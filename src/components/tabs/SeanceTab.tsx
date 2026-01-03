import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { workoutDays } from "@/data/workoutData";
import { Play, Check, Clock, Dumbbell, Save, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface SessionExercise {
  id: string;
  session_id: string;
  exercise_name: string;
  planned_sets: number;
  planned_reps: string;
  planned_weight: string;
  actual_sets: number | null;
  actual_reps: string | null;
  actual_weight: string | null;
  completed: boolean;
  notes: string | null;
}

interface WorkoutSession {
  id: string;
  day_name: string;
  workout_title: string;
  session_date: string;
  duration_minutes: number | null;
  notes: string | null;
  completed: boolean;
  session_exercises: SessionExercise[];
}

export function SeanceTab() {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [expandedHistory, setExpandedHistory] = useState<string | null>(null);
  const { toast } = useToast();

  const today = new Date();
  const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const currentDay = dayNames[today.getDay()];
  const todayWorkout = workoutDays.find((w) => w.day === currentDay);

  const fetchSessions = async () => {
    const { data, error } = await supabase
      .from("workout_sessions")
      .select("*, session_exercises(*)")
      .order("session_date", { ascending: false })
      .limit(20);

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      setSessions((data as WorkoutSession[]) || []);
      // Check for active session today
      const todaySession = data?.find(
        (s) => s.session_date === format(today, "yyyy-MM-dd") && !s.completed
      );
      if (todaySession) {
        setActiveSession(todaySession as WorkoutSession);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime && activeSession && !activeSession.completed) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, activeSession]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startSession = async () => {
    if (!todayWorkout || todayWorkout.isRest) return;

    const { data: sessionData, error: sessionError } = await supabase
      .from("workout_sessions")
      .insert({
        day_name: todayWorkout.day,
        workout_title: todayWorkout.title,
        session_date: format(today, "yyyy-MM-dd"),
      })
      .select()
      .single();

    if (sessionError) {
      toast({ title: "Erreur", description: sessionError.message, variant: "destructive" });
      return;
    }

    // Add exercises
    const exercises = todayWorkout.exercises?.map((ex) => ({
      session_id: sessionData.id,
      exercise_name: ex.name,
      planned_sets: ex.sets,
      planned_reps: ex.reps,
      planned_weight: ex.weight,
    })) || [];

    const { error: exError } = await supabase.from("session_exercises").insert(exercises);

    if (exError) {
      toast({ title: "Erreur", description: exError.message, variant: "destructive" });
      return;
    }

    setStartTime(new Date());
    toast({ title: "C'est parti ! 💪", description: "Séance démarrée" });
    fetchSessions();
  };

  const updateExercise = async (exerciseId: string, updates: Partial<SessionExercise>) => {
    const { error } = await supabase
      .from("session_exercises")
      .update(updates)
      .eq("id", exerciseId);

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      fetchSessions();
    }
  };

  const completeSession = async () => {
    if (!activeSession) return;

    const { error } = await supabase
      .from("workout_sessions")
      .update({
        completed: true,
        duration_minutes: Math.floor(elapsedTime / 60),
      })
      .eq("id", activeSession.id);

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Bravo ! 🎉", description: "Séance terminée avec succès !" });
      setActiveSession(null);
      setStartTime(null);
      setElapsedTime(0);
      fetchSessions();
    }
  };

  const deleteSession = async (sessionId: string) => {
    const { error } = await supabase.from("workout_sessions").delete().eq("id", sessionId);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Supprimé" });
      fetchSessions();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-display tracking-wider mb-2">
          🏋️ <span className="text-gradient">SÉANCE</span> EN COURS
        </h2>
        <p className="text-muted-foreground">Enregistrez votre entraînement en temps réel</p>
      </div>

      {/* Today's Workout Info */}
      <div className="glass rounded-2xl p-6 border-primary/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide">Aujourd'hui - {currentDay}</p>
            <h3 className="text-3xl font-display tracking-wide flex items-center gap-3">
              <span>{todayWorkout?.emoji}</span>
              {todayWorkout?.title || "Programme non trouvé"}
            </h3>
          </div>
          {activeSession && startTime && (
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Temps écoulé</p>
              <p className="text-4xl font-display text-primary animate-pulse-glow">{formatTime(elapsedTime)}</p>
            </div>
          )}
        </div>

        {todayWorkout?.isRest ? (
          <div className="text-center py-8">
            <p className="text-xl text-muted-foreground">😴 Jour de repos - Profitez-en !</p>
          </div>
        ) : !activeSession ? (
          <Button onClick={startSession} size="lg" className="w-full bg-gradient-primary hover:opacity-90 py-6 text-lg">
            <Play className="w-6 h-6 mr-2" />
            Démarrer la séance
          </Button>
        ) : (
          <Button onClick={completeSession} size="lg" className="w-full bg-success hover:bg-success/90 py-6 text-lg">
            <Check className="w-6 h-6 mr-2" />
            Terminer la séance ({formatTime(elapsedTime)})
          </Button>
        )}
      </div>

      {/* Active Session Exercises */}
      {activeSession && activeSession.session_exercises && (
        <div className="space-y-4">
          <h3 className="font-display text-2xl tracking-wide">📋 EXERCICES À FAIRE</h3>
          {activeSession.session_exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className={cn(
                "glass rounded-xl p-4 transition-all duration-300",
                exercise.completed && "border-success/50 bg-success/5"
              )}
            >
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={exercise.completed}
                  onCheckedChange={(checked) =>
                    updateExercise(exercise.id, { completed: checked as boolean })
                  }
                  className="mt-1 data-[state=checked]:bg-success data-[state=checked]:border-success"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={cn(
                      "font-medium text-lg",
                      exercise.completed && "line-through text-muted-foreground"
                    )}>
                      {exercise.exercise_name}
                    </h4>
                    <span className="text-sm text-muted-foreground">
                      {exercise.planned_sets} × {exercise.planned_reps}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Séries faites</label>
                      <Input
                        type="number"
                        placeholder={exercise.planned_sets.toString()}
                        value={exercise.actual_sets || ""}
                        onChange={(e) => updateExercise(exercise.id, { actual_sets: parseInt(e.target.value) || null })}
                        className="bg-muted/50 h-9 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Reps</label>
                      <Input
                        placeholder={exercise.planned_reps}
                        value={exercise.actual_reps || ""}
                        onChange={(e) => updateExercise(exercise.id, { actual_reps: e.target.value })}
                        className="bg-muted/50 h-9 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Poids</label>
                      <Input
                        placeholder={exercise.planned_weight}
                        value={exercise.actual_weight || ""}
                        onChange={(e) => updateExercise(exercise.id, { actual_weight: e.target.value })}
                        className="bg-muted/50 h-9 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Session History */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border/50">
          <h3 className="font-display text-2xl tracking-wide">📅 HISTORIQUE DES SÉANCES</h3>
        </div>
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Chargement...</div>
        ) : sessions.filter((s) => s.completed).length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Dumbbell className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucune séance enregistrée</p>
          </div>
        ) : (
          <div className="divide-y divide-border/30">
            {sessions
              .filter((s) => s.completed)
              .slice(0, 10)
              .map((session) => (
                <div key={session.id}>
                  <div
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/20 transition-colors"
                    onClick={() => setExpandedHistory(expandedHistory === session.id ? null : session.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                        <Check className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="font-display text-lg">{session.workout_title}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(parseISO(session.session_date), "EEEE d MMMM", { locale: fr })}
                          {session.duration_minutes && ` • ${session.duration_minutes} min`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.id);
                        }}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      {expandedHistory === session.id ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  {expandedHistory === session.id && session.session_exercises && (
                    <div className="px-4 pb-4 bg-muted/10">
                      <div className="space-y-2">
                        {session.session_exercises.map((ex) => (
                          <div key={ex.id} className="flex items-center justify-between text-sm py-2 border-b border-border/20 last:border-0">
                            <span className={cn(ex.completed && "text-success")}>
                              {ex.completed && "✓ "}{ex.exercise_name}
                            </span>
                            <span className="text-muted-foreground">
                              {ex.actual_sets || ex.planned_sets} × {ex.actual_reps || ex.planned_reps} @ {ex.actual_weight || ex.planned_weight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
