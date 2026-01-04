import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Settings, Save, Target, Timer, Volume2, Trash2, Database, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";

interface AppSettings {
  target_weight: string;
  rest_timer_duration: string;
  sound_enabled: string;
  theme: string;
}

export function SettingsTab() {
  const [settings, setSettings] = useState<AppSettings>({
    target_weight: "85",
    rest_timer_duration: "90",
    sound_enabled: "true",
    theme: "dark",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("app_settings")
      .select("setting_key, setting_value");

    if (error) {
      console.error("Erreur chargement paramètres:", error);
    } else if (data) {
      const settingsObj: Partial<AppSettings> = {};
      data.forEach((item) => {
        settingsObj[item.setting_key as keyof AppSettings] = item.setting_value;
      });
      setSettings((prev) => ({ ...prev, ...settingsObj }));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSetting = async (key: keyof AppSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const saveSettings = async () => {
    setSaving(true);
    
    const updates = Object.entries(settings).map(([key, value]) => ({
      setting_key: key,
      setting_value: value,
    }));

    for (const update of updates) {
      const { error } = await supabase
        .from("app_settings")
        .update({ setting_value: update.setting_value, updated_at: new Date().toISOString() })
        .eq("setting_key", update.setting_key);

      if (error) {
        // If update fails, try insert
        await supabase.from("app_settings").insert(update);
      }
    }

    toast({ title: "Paramètres sauvegardés ✓" });
    setSaving(false);
  };

  const exportData = async () => {
    // Fetch all data
    const [weightData, sessionsData, photosData] = await Promise.all([
      supabase.from("weight_entries").select("*").order("date", { ascending: false }),
      supabase.from("workout_sessions").select("*, session_exercises(*)").order("session_date", { ascending: false }),
      supabase.from("progress_photos").select("*").order("photo_date", { ascending: false }),
    ]);

    const exportObj = {
      exportDate: new Date().toISOString(),
      weightEntries: weightData.data || [],
      workoutSessions: sessionsData.data || [],
      progressPhotos: photosData.data || [],
    };

    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `muscu-data-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({ title: "Données exportées ! 📦" });
  };

  const deleteAllData = async () => {
    // Delete all data from all tables
    await supabase.from("session_exercises").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("workout_sessions").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("weight_entries").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("progress_photos").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    toast({ title: "Toutes les données ont été supprimées", variant: "destructive" });
    setIsDeleteDialogOpen(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-display tracking-wider mb-2">
          ⚙️ <span className="text-gradient">PARAMÈTRES</span>
        </h2>
        <p className="text-muted-foreground">Personnalisez votre application</p>
      </div>

      {/* Objectives Section */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-primary" />
          <h3 className="font-display text-2xl tracking-wide">OBJECTIFS</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Poids cible (kg)</label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                step="0.5"
                value={settings.target_weight}
                onChange={(e) => updateSetting("target_weight", e.target.value)}
                className="bg-muted/50 max-w-[120px]"
              />
              <span className="text-muted-foreground">kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timer Section */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Timer className="w-6 h-6 text-primary" />
          <h3 className="font-display text-2xl tracking-wide">TIMER DE REPOS</h3>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm text-muted-foreground">Durée par défaut</label>
              <span className="font-display text-xl text-primary">
                {formatTime(parseInt(settings.rest_timer_duration))}
              </span>
            </div>
            <Slider
              value={[parseInt(settings.rest_timer_duration)]}
              onValueChange={(value) => updateSetting("rest_timer_duration", value[0].toString())}
              min={30}
              max={300}
              step={15}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>30s</span>
              <span>5 min</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-muted-foreground" />
              <span>Son activé</span>
            </div>
            <Switch
              checked={settings.sound_enabled === "true"}
              onCheckedChange={(checked) => updateSetting("sound_enabled", checked.toString())}
            />
          </div>
        </div>
      </div>

      {/* Data Management Section */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-6 h-6 text-primary" />
          <h3 className="font-display text-2xl tracking-wide">DONNÉES</h3>
        </div>

        <div className="space-y-4">
          <Button onClick={exportData} variant="outline" className="w-full justify-start">
            <Download className="w-5 h-5 mr-3" />
            Exporter toutes mes données (JSON)
          </Button>

          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30">
                <Trash2 className="w-5 h-5 mr-3" />
                Supprimer toutes mes données
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-destructive">⚠️ Supprimer les données</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Cette action est irréversible. Toutes vos données (poids, séances, photos) seront définitivement supprimées.
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="flex-1">
                  Annuler
                </Button>
                <Button variant="destructive" onClick={deleteAllData} className="flex-1">
                  Supprimer tout
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Save Button */}
      <Button onClick={saveSettings} disabled={saving} className="w-full bg-gradient-primary hover:opacity-90 py-6 text-lg">
        <Save className="w-5 h-5 mr-2" />
        {saving ? "Sauvegarde..." : "Sauvegarder les paramètres"}
      </Button>
    </div>
  );
}
