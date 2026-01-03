import { useState } from "react";
import { WorkoutCard } from "@/components/WorkoutCard";
import { ExerciseTable } from "@/components/ExerciseTable";
import { workoutDays } from "@/data/workoutData";
import { Clock, Flame, Moon } from "lucide-react";

export function ProgrammeTab() {
  const [selectedDay, setSelectedDay] = useState(1); // Mardi by default
  const workout = workoutDays[selectedDay];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-display tracking-wider mb-2">
          📅 PLAN D'<span className="text-gradient">ENTRAÎNEMENT</span>
        </h2>
        <p className="text-muted-foreground">4 jours d'entraînement + 3 jours de repos</p>
      </div>

      {/* Day Selector Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {workoutDays.map((day, index) => (
          <WorkoutCard
            key={day.day}
            workout={day}
            isActive={selectedDay === index}
            onClick={() => setSelectedDay(index)}
          />
        ))}
      </div>

      {/* Selected Day Details */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{workout.emoji}</span>
            <div>
              <h3 className="font-display text-3xl tracking-wide">{workout.day}</h3>
              <p className="text-primary font-medium">{workout.title}</p>
            </div>
          </div>
          {!workout.isRest && workout.duration && (
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{workout.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium">{workout.intensity}</span>
              </div>
            </div>
          )}
        </div>

        {workout.isRest ? (
          <div className="text-center py-12">
            <Moon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h4 className="font-display text-2xl tracking-wide mb-4">JOUR DE REPOS</h4>
            <ul className="space-y-2 text-muted-foreground">
              {workout.notes?.map((note, i) => (
                <li key={i} className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            {workout.exercises && <ExerciseTable exercises={workout.exercises} />}
            <div className="mt-4 p-4 rounded-xl bg-muted/30 text-center">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Repos entre séries :</strong> 60-90 sec | 
                <strong className="text-foreground ml-2">Intensité :</strong> TRÈS FACILE
              </p>
            </div>
          </>
        )}
      </div>

      {/* Quick Tips */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <span className="text-2xl mb-2 block">⏱️</span>
          <p className="text-sm text-muted-foreground">Repos: 60-90 sec entre séries</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <span className="text-2xl mb-2 block">📈</span>
          <p className="text-sm text-muted-foreground">Progression: +1-2 kg/mois</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <span className="text-2xl mb-2 block">✅</span>
          <p className="text-sm text-muted-foreground">Form {">"} Poids toujours</p>
        </div>
      </div>
    </div>
  );
}
