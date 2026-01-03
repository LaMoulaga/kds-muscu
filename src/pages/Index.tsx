import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DashboardTab } from "@/components/tabs/DashboardTab";
import { ProgrammeTab } from "@/components/tabs/ProgrammeTab";
import { NutritionTab } from "@/components/tabs/NutritionTab";
import { SupplementsTab } from "@/components/tabs/SupplementsTab";
import { ProgressionTab } from "@/components/tabs/ProgressionTab";
import { SuiviTab } from "@/components/tabs/SuiviTab";
import { SeanceTab } from "@/components/tabs/SeanceTab";
import { LayoutDashboard, Dumbbell, UtensilsCrossed, Pill, TrendingUp, Scale, PlayCircle } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { value: "dashboard", label: "Accueil", icon: LayoutDashboard },
    { value: "seance", label: "Séance", icon: PlayCircle },
    { value: "programme", label: "Programme", icon: Dumbbell },
    { value: "suivi", label: "Suivi", icon: Scale },
    { value: "nutrition", label: "Nutrition", icon: UtensilsCrossed },
    { value: "supplements", label: "Suppléments", icon: Pill },
    { value: "progression", label: "Conseils", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-xl tracking-wider">MUSCU</h1>
                <p className="text-xs text-muted-foreground">Débutant 2026</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Objectif:</span>
              <span className="font-display text-primary">75kg → 85kg</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Tab Navigation */}
          <TabsList className="w-full flex bg-muted/30 p-1.5 rounded-2xl overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="dashboard" className="mt-0">
            <DashboardTab />
          </TabsContent>
          <TabsContent value="seance" className="mt-0">
            <SeanceTab />
          </TabsContent>
          <TabsContent value="programme" className="mt-0">
            <ProgrammeTab />
          </TabsContent>
          <TabsContent value="suivi" className="mt-0">
            <SuiviTab />
          </TabsContent>
          <TabsContent value="nutrition" className="mt-0">
            <NutritionTab />
          </TabsContent>
          <TabsContent value="supplements" className="mt-0">
            <SupplementsTab />
          </TabsContent>
          <TabsContent value="progression" className="mt-0">
            <ProgressionTab />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 mt-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            💪 Programme Musculation Débutant 2026 - Progression Lente & Solide
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
