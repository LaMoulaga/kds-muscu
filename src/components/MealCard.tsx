import type { Meal } from "@/data/workoutData";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

interface MealCardProps {
  meal: Meal;
  index: number;
}

export function MealCard({ meal, index }: MealCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-4 transition-all duration-300 hover:border-primary/30 animate-fade-in",
        meal.isShake && "border-primary/50 bg-primary/5"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
            {meal.time}
          </span>
          <span className="font-display text-lg tracking-wide">{meal.name}</span>
        </div>
        {meal.isShake && (
          <span className="flex items-center gap-1 text-xs font-medium text-primary">
            <Zap className="w-3 h-3" />
            SHAKE
          </span>
        )}
      </div>
      <ul className="space-y-1">
        {meal.items.map((item, i) => (
          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-primary/50" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
