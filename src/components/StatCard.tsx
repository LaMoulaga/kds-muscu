import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  highlight?: boolean;
  className?: string;
}

export function StatCard({ label, value, unit, icon, highlight, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]",
        highlight && "border-primary/50 shadow-glow",
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
          {label}
        </span>
        {icon && <span className="text-primary">{icon}</span>}
      </div>
      <div className="flex items-baseline gap-1">
        <span className={cn(
          "text-3xl font-display tracking-wider",
          highlight ? "text-primary" : "text-foreground"
        )}>
          {value}
        </span>
        {unit && <span className="text-muted-foreground text-sm">{unit}</span>}
      </div>
    </div>
  );
}
