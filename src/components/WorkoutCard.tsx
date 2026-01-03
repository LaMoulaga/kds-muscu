import { cn } from "@/lib/utils";
import type { WorkoutDay } from "@/data/workoutData";
import { Clock, Flame, Moon } from "lucide-react";

interface WorkoutCardProps {
  workout: WorkoutDay;
  isActive?: boolean;
  onClick?: () => void;
}

export function WorkoutCard({ workout, isActive, onClick }: WorkoutCardProps) {
  const isRest = workout.isRest;

  return (
    <div
      onClick={onClick}
      className={cn(
        "glass rounded-xl p-4 cursor-pointer transition-all duration-300",
        "hover:border-primary/50 hover:shadow-glow",
        isActive && "border-primary shadow-glow",
        isRest && "opacity-75"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{workout.emoji}</span>
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {workout.day}
          </span>
        </div>
        {isRest ? (
          <Moon className="w-4 h-4 text-muted-foreground" />
        ) : (
          <Flame className="w-4 h-4 text-primary" />
        )}
      </div>
      
      <h3 className="font-display text-xl tracking-wide mb-2">
        {workout.title}
      </h3>
      
      {!isRest && workout.duration && (
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{workout.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-3 h-3 text-primary" />
            <span>{workout.intensity}</span>
          </div>
        </div>
      )}
      
      {isRest && workout.notes && (
        <p className="text-sm text-muted-foreground">
          {workout.notes[0]}
        </p>
      )}
    </div>
  );
}
