import { ChecklistSection } from "@/components/ChecklistSection";
import { AdviceCard } from "@/components/AdviceCard";
import {
  dailyChecklist,
  sessionChecklist,
  weeklyChecklist,
  progressionTips,
  importantAdvice,
} from "@/data/workoutData";
import { TrendingUp } from "lucide-react";

export function ProgressionTab() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-display tracking-wider mb-2">
          🚀 <span className="text-gradient">PROGRESSION</span> & CONSEILS
        </h2>
        <p className="text-muted-foreground">Ne pas aller trop vite = KEY TO SUCCESS</p>
      </div>

      {/* Progression Phases */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h3 className="font-display text-2xl tracking-wide">PHASES DE PROGRESSION</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {progressionTips.map((phase, index) => (
            <div
              key={phase.phase}
              className="p-4 rounded-xl bg-muted/30 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display">
                  {index + 1}
                </span>
                <span className="text-sm text-muted-foreground">{phase.phase}</span>
              </div>
              <h4 className="font-display text-lg tracking-wide mb-3">{phase.title}</h4>
              <ul className="space-y-2">
                {phase.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Golden Rules */}
      <div className="glass rounded-2xl p-6 border-primary/30">
        <h3 className="font-display text-2xl tracking-wide mb-4">⭐ RÈGLE DÉBUTANT</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-success/10 border border-success/30 text-center">
            <p className="text-success font-medium">Si c'est facile</p>
            <p className="text-sm text-muted-foreground mt-1">→ Augmentez légèrement poids OU reps</p>
          </div>
          <div className="p-4 rounded-xl bg-warning/10 border border-warning/30 text-center">
            <p className="text-warning font-medium">Si c'est dur</p>
            <p className="text-sm text-muted-foreground mt-1">→ Restez même charge 2 semaines</p>
          </div>
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-center">
            <p className="text-destructive font-medium">Ne pas forcer</p>
            <p className="text-sm text-muted-foreground mt-1">= Clé pour pas se blesser</p>
          </div>
        </div>
      </div>

      {/* Important Advice */}
      <div>
        <h3 className="font-display text-2xl tracking-wide mb-4">⚠️ CONSEILS IMPORTANTS</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {importantAdvice.map((advice, index) => (
            <AdviceCard key={advice.title} {...advice} index={index} />
          ))}
        </div>
      </div>

      {/* Checklists */}
      <div className="grid md:grid-cols-3 gap-6">
        <ChecklistSection title="Quotidien" items={dailyChecklist} icon="📋" />
        <ChecklistSection title="Avant/Après Séance" items={sessionChecklist} icon="🏋️" />
        <ChecklistSection title="Hebdomadaire" items={weeklyChecklist} icon="📅" />
      </div>

      {/* Comparison Banner */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-display text-2xl tracking-wide mb-4">🎯 DIFFÉRENCES DÉBUTANT vs AVANCÉ</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 rounded-lg bg-muted/30">
            <p className="text-muted-foreground">Poids</p>
            <p className="font-medium">30-50% moins lourd</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/30">
            <p className="text-muted-foreground">Reps</p>
            <p className="font-medium">10-20 vs 6-8</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/30">
            <p className="text-muted-foreground">Machines</p>
            <p className="font-medium">&gt; Poids libres</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/30">
            <p className="text-muted-foreground">Séries</p>
            <p className="font-medium">2-3 vs 4-5</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/30">
            <p className="text-muted-foreground">Jours repos</p>
            <p className="font-medium">3 vs 2</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/30">
            <p className="text-muted-foreground">Objectif</p>
            <p className="font-medium text-primary">+10 kg/12 mois</p>
          </div>
        </div>
      </div>
    </div>
  );
}
