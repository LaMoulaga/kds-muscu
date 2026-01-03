import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface ChecklistSectionProps {
  title: string;
  items: string[];
  icon?: string;
}

export function ChecklistSection({ title, items, icon }: ChecklistSectionProps) {
  const [checked, setChecked] = useState<boolean[]>(new Array(items.length).fill(false));

  const toggleItem = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const completedCount = checked.filter(Boolean).length;
  const progress = (completedCount / items.length) * 100;

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-xl tracking-wide flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </h3>
        <span className="text-sm text-muted-foreground">
          {completedCount}/{items.length}
        </span>
      </div>
      
      <div className="w-full h-1 bg-muted rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-gradient-primary rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => toggleItem(index)}
          >
            <Checkbox
              checked={checked[index]}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <span
              className={cn(
                "text-sm transition-all duration-200",
                checked[index]
                  ? "text-muted-foreground line-through"
                  : "text-foreground group-hover:text-primary"
              )}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
