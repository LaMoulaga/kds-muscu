import { StatCard } from "@/components/StatCard";
import { userStats, weekSummary } from "@/data/workoutData";
import { Target, Scale, Flame, Dumbbell, TrendingUp, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DashboardTab() {
  const today = new Date();
  const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const currentDay = dayNames[today.getDay()];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-display tracking-wider mb-2">
          PROGRAMME <span className="text-gradient">DÉBUTANT</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Progression lente & solide - 2026
        </p>
      </div>

      {/* Current Day Highlight */}
      <div className="glass rounded-2xl p-6 border-primary/50 shadow-glow text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Calendar className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground uppercase tracking-wide">Aujourd'hui</span>
        </div>
        <h2 className="text-3xl font-display tracking-wide">
          {currentDay}
        </h2>
        {weekSummary.find(d => d.day === currentDay)?.training && (
          <p className="text-primary font-medium mt-1">
            {weekSummary.find(d => d.day === currentDay)?.training}
          </p>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Poids actuel"
          value={userStats.currentWeight}
          unit="kg"
          icon={<Scale className="w-5 h-5" />}
        />
        <StatCard
          label="Objectif"
          value={userStats.targetWeight}
          unit="kg"
          icon={<Target className="w-5 h-5" />}
          highlight
        />
        <StatCard
          label="Calories/jour"
          value={userStats.calories}
          unit="kcal"
          icon={<Flame className="w-5 h-5" />}
        />
        <StatCard
          label="Protéines/jour"
          value={userStats.protein}
          unit="g"
          icon={<Dumbbell className="w-5 h-5" />}
        />
      </div>

      {/* Progress Banner */}
      <div className="glass rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display text-2xl tracking-wide">OBJECTIF 12 MOIS</h3>
            <p className="text-muted-foreground">+{userStats.weightGain} kg de masse musculaire</p>
          </div>
        </div>
        <div className="text-center md:text-right">
          <span className="text-5xl font-display text-gradient">+10</span>
          <span className="text-xl text-muted-foreground ml-1">kg</span>
        </div>
      </div>

      {/* Week Summary Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border/50">
          <h3 className="font-display text-2xl tracking-wide">📊 RÉSUMÉ DE LA SEMAINE</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-primary">Jour</TableHead>
              <TableHead>Entraînement</TableHead>
              <TableHead className="text-center">Durée</TableHead>
              <TableHead className="text-center">Intensité</TableHead>
              <TableHead className="text-center">Kcal</TableHead>
              <TableHead className="text-center">Protéines</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weekSummary.map((day) => (
              <TableRow
                key={day.day}
                className={`border-border/30 hover:bg-muted/30 transition-colors ${
                  day.day === currentDay ? "bg-primary/10" : ""
                }`}
              >
                <TableCell className="font-medium">
                  {day.day === currentDay ? `📍 ${day.day}` : day.day}
                </TableCell>
                <TableCell className={day.training === "REPOS" ? "text-muted-foreground" : "text-primary font-medium"}>
                  {day.training}
                </TableCell>
                <TableCell className="text-center text-muted-foreground">{day.duration}</TableCell>
                <TableCell className="text-center text-muted-foreground">{day.intensity}</TableCell>
                <TableCell className="text-center">{day.kcal}</TableCell>
                <TableCell className="text-center">{day.protein}g</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Motivation Quote */}
      <div className="text-center py-8">
        <p className="text-lg text-muted-foreground italic">
          "Faites les exercices simples avec du poids léger, mangez vos repas simples, dormez bien, et progressez lentement."
        </p>
        <p className="text-primary font-display text-xl mt-2 tracking-wide">
          VOUS ALLEZ GROSSIR EN MUSCLE. GARANTI. 💪
        </p>
      </div>
    </div>
  );
}
