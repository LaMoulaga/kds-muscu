import { SupplementCard } from "@/components/SupplementCard";
import { supplements } from "@/data/workoutData";
import { AlertCircle, Check } from "lucide-react";

export function SupplementsTab() {
  const totalCost = supplements.reduce((acc, s) => {
    const price = parseInt(s.price.replace("€/mois", ""));
    return acc + price;
  }, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-display tracking-wider mb-2">
          💊 <span className="text-gradient">SUPPLÉMENTS</span> DÉBUTANT
        </h2>
        <p className="text-muted-foreground">Seulement l'essentiel pour progresser</p>
      </div>

      {/* Budget Summary */}
      <div className="glass rounded-2xl p-6 border-primary/50 shadow-glow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Budget mensuel obligatoire</p>
            <p className="text-4xl font-display tracking-wide text-primary">{totalCost}€<span className="text-lg text-muted-foreground">/mois</span></p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Nombre de suppléments</p>
            <p className="text-2xl font-display">{supplements.length}</p>
          </div>
        </div>
      </div>

      {/* Supplements Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {supplements.map((supplement, index) => (
          <SupplementCard key={supplement.name} supplement={supplement} index={index} />
        ))}
      </div>

      {/* Usage Instructions */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-display text-2xl tracking-wide mb-4">📋 COMMENT LES PRENDRE</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
            <span className="text-2xl">🥛</span>
            <div>
              <h4 className="font-medium mb-1">Whey Protéine</h4>
              <p className="text-sm text-muted-foreground">
                Post-entraînement : 30-40g dans un shake avec lait + banane + créatine. C'est votre ami.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
            <span className="text-2xl">💊</span>
            <div>
              <h4 className="font-medium mb-1">Créatine</h4>
              <p className="text-sm text-muted-foreground">
                5g par jour = 1 petite cuillère à café rase. Dans le shake post-entraînement. 
                <strong className="text-primary"> TOUS LES JOURS</strong> (même dimanche repos)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
            <span className="text-2xl">🌙</span>
            <div>
              <h4 className="font-medium mb-1">Caséine</h4>
              <p className="text-sm text-muted-foreground">
                30g avant coucher (ou fromage blanc 200g gratuit). Récupération nocturne.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Supplements */}
      <div className="glass rounded-xl p-6">
        <h3 className="font-display text-xl tracking-wide mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-muted-foreground" />
          OPTIONNEL (Pas besoin comme débutant)
        </h3>
        <div className="flex flex-wrap gap-3">
          {["BCAA", "Oméga-3", "Multivitamines"].map((item) => (
            <span
              key={item}
              className="px-4 py-2 rounded-full bg-muted/50 text-muted-foreground text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Pro Tip */}
      <div className="text-center py-4">
        <p className="text-muted-foreground">
          💡 <strong className="text-foreground">Pro tip :</strong> Le fromage blanc peut remplacer la caséine gratuitement !
        </p>
      </div>
    </div>
  );
}
