import { cn } from "@/lib/utils";

interface AdviceCardProps {
  title: string;
  icon: string;
  tips: string[];
  index: number;
}

export function AdviceCard({ title, icon, tips, index }: AdviceCardProps) {
  return (
    <div
      className="glass rounded-xl p-6 transition-all duration-300 hover:border-primary/50 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{icon}</span>
        <h3 className="font-display text-xl tracking-wide">{title}</h3>
      </div>
      
      <ul className="space-y-2">
        {tips.map((tip, i) => (
          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
