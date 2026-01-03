import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { userStats } from "@/data/workoutData";
import { Scale, Target, TrendingUp, Plus, Trash2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

interface WeightEntry {
  id: string;
  weight: number;
  date: string;
  notes: string | null;
}

export function SuiviTab() {
  const [entries, setEntries] = useState<WeightEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [newWeight, setNewWeight] = useState("");
  const [newDate, setNewDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [newNotes, setNewNotes] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from("weight_entries")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      setEntries(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const addEntry = async () => {
    if (!newWeight) return;

    setIsAdding(true);
    const { error } = await supabase.from("weight_entries").insert({
      weight: parseFloat(newWeight),
      date: newDate,
      notes: newNotes || null,
    });

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Succès", description: "Poids enregistré !" });
      setNewWeight("");
      setNewNotes("");
      fetchEntries();
    }
    setIsAdding(false);
  };

  const deleteEntry = async (id: string) => {
    const { error } = await supabase.from("weight_entries").delete().eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Supprimé", description: "Entrée supprimée" });
      fetchEntries();
    }
  };

  const latestWeight = entries.length > 0 ? entries[entries.length - 1].weight : userStats.currentWeight;
  const weightGain = latestWeight - userStats.currentWeight;
  const progressPercent = Math.min(100, Math.max(0, (weightGain / userStats.weightGain) * 100));

  const chartData = entries.map((e) => ({
    date: format(parseISO(e.date), "dd/MM", { locale: fr }),
    fullDate: format(parseISO(e.date), "dd MMM yyyy", { locale: fr }),
    poids: Number(e.weight),
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-display tracking-wider mb-2">
          📊 <span className="text-gradient">SUIVI</span> DU POIDS
        </h2>
        <p className="text-muted-foreground">Suivez votre progression vers l'objectif de {userStats.targetWeight} kg</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground uppercase">Poids actuel</span>
          </div>
          <p className="text-3xl font-display text-foreground">{latestWeight} <span className="text-sm text-muted-foreground">kg</span></p>
        </div>
        <div className="glass rounded-xl p-4 border-primary/50">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground uppercase">Objectif</span>
          </div>
          <p className="text-3xl font-display text-primary">{userStats.targetWeight} <span className="text-sm text-muted-foreground">kg</span></p>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-xs text-muted-foreground uppercase">Gain</span>
          </div>
          <p className={`text-3xl font-display ${weightGain >= 0 ? "text-success" : "text-destructive"}`}>
            {weightGain >= 0 ? "+" : ""}{weightGain.toFixed(1)} <span className="text-sm text-muted-foreground">kg</span>
          </p>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-muted-foreground uppercase">Progression</span>
          </div>
          <p className="text-3xl font-display text-primary">{progressPercent.toFixed(0)}<span className="text-sm text-muted-foreground">%</span></p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="glass rounded-xl p-6">
        <div className="flex justify-between text-sm mb-2">
          <span>{userStats.currentWeight} kg</span>
          <span className="text-primary font-medium">{latestWeight} kg</span>
          <span>{userStats.targetWeight} kg</span>
        </div>
        <div className="h-4 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-primary rounded-full transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Chart */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-display text-2xl tracking-wide mb-4">📈 ÉVOLUTION DU POIDS</h3>
        {chartData.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis
                  domain={[userStats.currentWeight - 2, userStats.targetWeight + 2]}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelFormatter={(_, payload) => payload[0]?.payload?.fullDate || ""}
                  formatter={(value: number) => [`${value} kg`, "Poids"]}
                />
                <ReferenceLine y={userStats.targetWeight} stroke="hsl(var(--primary))" strokeDasharray="5 5" label={{ value: "Objectif", fill: "hsl(var(--primary))", fontSize: 12 }} />
                <ReferenceLine y={userStats.currentWeight} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="poids"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Scale className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Aucune donnée. Ajoutez votre premier poids !</p>
            </div>
          </div>
        )}
      </div>

      {/* Add Entry Form */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-display text-2xl tracking-wide mb-4">➕ AJOUTER UNE ENTRÉE</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Poids (kg)</label>
            <Input
              type="number"
              step="0.1"
              placeholder="75.5"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              className="bg-muted/50"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Date</label>
            <Input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="bg-muted/50"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-muted-foreground mb-1 block">Notes (optionnel)</label>
            <Input
              placeholder="Ex: Après entraînement..."
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              className="bg-muted/50"
            />
          </div>
        </div>
        <Button
          onClick={addEntry}
          disabled={!newWeight || isAdding}
          className="mt-4 bg-gradient-primary hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          {isAdding ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>

      {/* History */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border/50">
          <h3 className="font-display text-2xl tracking-wide">📅 HISTORIQUE</h3>
        </div>
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Chargement...</div>
        ) : entries.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">Aucune entrée pour l'instant</div>
        ) : (
          <div className="divide-y divide-border/30">
            {[...entries].reverse().slice(0, 10).map((entry) => (
              <div key={entry.id} className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-display text-xl">{Number(entry.weight)} kg</p>
                    <p className="text-sm text-muted-foreground">
                      {format(parseISO(entry.date), "EEEE d MMMM yyyy", { locale: fr })}
                    </p>
                    {entry.notes && <p className="text-xs text-muted-foreground mt-1">{entry.notes}</p>}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteEntry(entry.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
