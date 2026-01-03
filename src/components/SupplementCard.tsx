import type { Supplement } from "@/data/workoutData";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SupplementCardProps {
  supplement: Supplement;
  index: number;
}

export function SupplementCard({ supplement, index }: SupplementCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-glow animate-fade-in"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{supplement.icon}</span>
        {supplement.isRequired && (
          <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
            Obligatoire
          </Badge>
        )}
      </div>
      
      <h3 className="font-display text-2xl tracking-wide mb-2">{supplement.name}</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Dosage</span>
          <span className="font-medium">{supplement.dosage}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Timing</span>
          <span className="font-medium">{supplement.timing}</span>
        </div>
        <div className="flex justify-between border-t border-border/50 pt-2 mt-2">
          <span className="text-muted-foreground">Prix</span>
          <span className="font-display text-lg text-primary">{supplement.price}</span>
        </div>
      </div>
    </div>
  );
}
