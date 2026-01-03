export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  weight: string;
  progression: string;
}

export interface WorkoutDay {
  day: string;
  title: string;
  emoji: string;
  duration?: string;
  intensity?: string;
  isRest: boolean;
  exercises?: Exercise[];
  notes?: string[];
}

export interface Meal {
  time: string;
  name: string;
  items: string[];
  isShake?: boolean;
}

export interface DayMeals {
  day: string;
  type: string;
  meals: Meal[];
}

export interface Supplement {
  name: string;
  dosage: string;
  timing: string;
  price: string;
  icon: string;
  isRequired: boolean;
}

export const userStats = {
  currentWeight: 75,
  targetWeight: 85,
  weightGain: 10,
  duration: 12,
  calories: 2600,
  protein: 165,
};

export const weekSummary = [
  { day: "Lundi", training: "REPOS", duration: "-", intensity: "-", kcal: 2600, protein: 165 },
  { day: "Mardi", training: "Haut Léger", duration: "45 min", intensity: "5/10", kcal: 2600, protein: 165 },
  { day: "Mercredi", training: "Bas Léger", duration: "40 min", intensity: "5/10", kcal: 2650, protein: 170 },
  { day: "Jeudi", training: "REPOS", duration: "-", intensity: "-", kcal: 2600, protein: 165 },
  { day: "Vendredi", training: "Haut 2", duration: "45 min", intensity: "5/10", kcal: 2600, protein: 165 },
  { day: "Samedi", training: "Bas 2", duration: "45 min", intensity: "5/10", kcal: 2600, protein: 165 },
  { day: "Dimanche", training: "REPOS", duration: "-", intensity: "-", kcal: 2600, protein: 165 },
];

export const workoutDays: WorkoutDay[] = [
  {
    day: "Lundi",
    title: "REPOS COMPLET",
    emoji: "✅",
    isRest: true,
    notes: [
      "Aucun entraînement",
      "Repos mental et physique",
      "Marche légère optionnelle",
      "Sommeil 8h importante",
    ],
  },
  {
    day: "Mardi",
    title: "HAUT DU CORPS LÉGER",
    emoji: "💪",
    duration: "40-45 min",
    intensity: "5/10",
    isRest: false,
    exercises: [
      { name: "Pompes normales (au sol)", sets: 3, reps: "8-12", weight: "Poids corps", progression: "+2 reps/mois" },
      { name: "Développé Haltères léger", sets: 3, reps: "10-12", weight: "15 kg/main", progression: "+1 kg/mois" },
      { name: "Tirage Poulie Haute (Lat)", sets: 3, reps: "10-12", weight: "30 kg", progression: "+2 kg/mois" },
      { name: "Élévations Latérales Haltères", sets: 3, reps: "12-15", weight: "6 kg", progression: "+0,5 kg/mois" },
      { name: "Curl Haltères Biceps", sets: 3, reps: "10-12", weight: "10 kg", progression: "+1 kg/mois" },
      { name: "Extension Triceps simple", sets: 2, reps: "12-15", weight: "8 kg", progression: "+0,5 kg/mois" },
    ],
  },
  {
    day: "Mercredi",
    title: "BAS DU CORPS LÉGER",
    emoji: "🔥",
    duration: "35-40 min",
    intensity: "5/10",
    isRest: false,
    exercises: [
      { name: "Leg Press (machine)", sets: 3, reps: "10-12", weight: "100 kg", progression: "+5 kg/mois" },
      { name: "Hack Squat OU Squat guidé", sets: 3, reps: "12-15", weight: "50 kg", progression: "+2,5 kg/mois" },
      { name: "Leg Curl Assis", sets: 3, reps: "12-15", weight: "30 kg", progression: "+2 kg/mois" },
      { name: "Presse Mollets", sets: 3, reps: "15-20", weight: "60 kg", progression: "+5 kg/mois" },
      { name: "Extensions Jambes (Quadriceps)", sets: 2, reps: "15-20", weight: "40 kg", progression: "+2 kg/mois" },
    ],
  },
  {
    day: "Jeudi",
    title: "REPOS",
    emoji: "😴",
    isRest: true,
    notes: ["Pas d'entraînement", "Récupération"],
  },
  {
    day: "Vendredi",
    title: "HAUT DU CORPS (2e séance)",
    emoji: "💥",
    duration: "40-45 min",
    intensity: "5/10",
    isRest: false,
    exercises: [
      { name: "Tirage Horizontal Poulie", sets: 3, reps: "10-12", weight: "25 kg", progression: "+2 kg/mois" },
      { name: "Tractions Assistées (machine)", sets: 3, reps: "6-10", weight: "-30 kg assistance", progression: "+2 reps/mois" },
      { name: "Développé Incliné Haltères", sets: 3, reps: "10-12", weight: "14 kg/main", progression: "+1 kg/mois" },
      { name: "Pec Deck Machine (pectoraux)", sets: 3, reps: "12-15", weight: "40 kg", progression: "+2 kg/mois" },
      { name: "Curl Barre Droite Légère", sets: 2, reps: "10-12", weight: "15 kg", progression: "+1 kg/mois" },
      { name: "Dips Assistés (machine)", sets: 2, reps: "8-12", weight: "-30 kg assistance", progression: "+2 reps/mois" },
    ],
  },
  {
    day: "Samedi",
    title: "BAS DU CORPS (2e séance)",
    emoji: "🏃",
    duration: "40-45 min",
    intensity: "5/10",
    isRest: false,
    exercises: [
      { name: "Hack Squat OU Leg Press Léger", sets: 3, reps: "12-15", weight: "80 kg", progression: "+3 kg/mois" },
      { name: "Fentes Haltères légères", sets: 3, reps: "12-15/jambe", weight: "8 kg/main", progression: "+1 kg/mois" },
      { name: "Leg Curl Couché", sets: 3, reps: "12-15", weight: "25 kg", progression: "+2 kg/mois" },
      { name: "Adducteurs Machine", sets: 2, reps: "15-20", weight: "40 kg", progression: "+5 kg/mois" },
      { name: "Abducteurs Machine", sets: 2, reps: "15-20", weight: "40 kg", progression: "+5 kg/mois" },
      { name: "Abdominaux Crunch Machine", sets: 2, reps: "15-20", weight: "30 kg", progression: "+2 kg/mois" },
    ],
  },
  {
    day: "Dimanche",
    title: "REPOS COMPLET",
    emoji: "😴",
    isRest: true,
    notes: ["Zéro entraînement", "Récupération totale", "Sommeil 8h"],
  },
];

export const dailyMeals: DayMeals[] = [
  {
    day: "Lundi",
    type: "REPOS",
    meals: [
      { time: "7h", name: "PETIT-DÉJEUNER", items: ["2 œufs frits", "2 tranches pain", "1 banane", "Café/Thé"] },
      { time: "10h", name: "COLLATION", items: ["Yaourt grec 200g", "Poignée granola"] },
      { time: "13h", name: "DÉJEUNER", items: ["Riz 150g", "Poulet 180g", "Brocoli"] },
      { time: "16h", name: "SNACK", items: ["Yaourt grec 150g", "1 banane"] },
      { time: "21h", name: "DÎNER", items: ["Steak 200g", "Pommes de terre 180g", "Épinards"] },
      { time: "23h", name: "AVANT COUCHER", items: ["Fromage blanc 200g", "Miel"] },
    ],
  },
  {
    day: "Mardi",
    type: "HAUT",
    meals: [
      { time: "7h", name: "PETIT-DÉJEUNER", items: ["Flocons d'avoine 60g", "Lait 200ml", "Miel 15g", "Noix 25g"] },
      { time: "10h", name: "COLLATION", items: ["Yaourt grec 150g", "Granola 25g"] },
      { time: "13h", name: "DÉJEUNER", items: ["Pâtes 180g", "Thon boîte 150g", "Sauce tomate", "Fromage 25g"] },
      { time: "16h", name: "PRÉ-ENTRAÎNEMENT", items: ["Poulet froid 120g", "Pain blanc 1 tranche", "Miel 10g"] },
      { time: "19h30", name: "POST-ENTRAÎNEMENT 🔴", items: ["Whey 30g", "Lait 250ml", "Banane", "Créatine 5g"], isShake: true },
      { time: "21h30", name: "DÎNER", items: ["Saumon 180g", "Riz complet 130g", "Épinards"] },
      { time: "23h", name: "AVANT COUCHER", items: ["Fromage blanc 200g", "Miel"] },
    ],
  },
  {
    day: "Mercredi",
    type: "BAS",
    meals: [
      { time: "7h", name: "PETIT-DÉJEUNER", items: ["3 œufs", "2 tranches pain", "1 banane", "Huile olive 5ml"] },
      { time: "10h", name: "COLLATION", items: ["Yaourt grec 200g", "Granola 30g"] },
      { time: "13h", name: "DÉJEUNER", items: ["Riz 200g", "Poulet 200g", "Brocoli 150g", "Huile olive 5ml"] },
      { time: "16h", name: "PRÉ-ENTRAÎNEMENT", items: ["Whey 30g", "Lait 250ml", "Banane", "Riz soufflé 50g"] },
      { time: "19h30", name: "POST-ENTRAÎNEMENT 🔴", items: ["Whey 40g", "Lait 300ml", "Banane", "Créatine 5g", "Miel 10g"], isShake: true },
      { time: "21h30", name: "DÎNER", items: ["Steak 220g", "Pommes de terre 200g", "Épinards 150g"] },
      { time: "23h", name: "AVANT COUCHER", items: ["Fromage blanc 200g", "Miel"] },
    ],
  },
  {
    day: "Jeudi",
    type: "REPOS",
    meals: [
      { time: "7h", name: "PETIT-DÉJEUNER", items: ["2 œufs frits", "2 tranches pain", "1 banane", "Café/Thé"] },
      { time: "10h", name: "COLLATION", items: ["Yaourt grec 200g", "Poignée granola"] },
      { time: "13h", name: "DÉJEUNER", items: ["Riz 150g", "Poulet 180g", "Brocoli"] },
      { time: "16h", name: "SNACK", items: ["Yaourt grec 150g", "1 banane"] },
      { time: "21h", name: "DÎNER", items: ["Steak 200g", "Pommes de terre 180g", "Épinards"] },
      { time: "23h", name: "AVANT COUCHER", items: ["Fromage blanc 200g", "Miel"] },
    ],
  },
  {
    day: "Vendredi",
    type: "HAUT 2",
    meals: [
      { time: "7h", name: "PETIT-DÉJEUNER", items: ["Flocons d'avoine 60g", "Lait 200ml", "Miel 15g", "Noix 25g"] },
      { time: "10h", name: "COLLATION", items: ["Yaourt grec 150g", "Granola 25g"] },
      { time: "13h", name: "DÉJEUNER", items: ["Pâtes 180g", "Thon boîte 150g", "Sauce tomate", "Fromage 25g"] },
      { time: "16h", name: "PRÉ-ENTRAÎNEMENT", items: ["Poulet froid 120g", "Pain blanc 1 tranche", "Miel 10g"] },
      { time: "19h30", name: "POST-ENTRAÎNEMENT 🔴", items: ["Whey 30g", "Lait 250ml", "Banane", "Créatine 5g"], isShake: true },
      { time: "21h30", name: "DÎNER", items: ["Saumon 180g", "Riz complet 130g", "Épinards"] },
      { time: "23h", name: "AVANT COUCHER", items: ["Fromage blanc 200g", "Miel"] },
    ],
  },
  {
    day: "Samedi",
    type: "BAS 2",
    meals: [
      { time: "7h", name: "PETIT-DÉJEUNER", items: ["3 œufs", "2 tranches pain", "1 banane", "Huile olive 5ml"] },
      { time: "10h", name: "COLLATION", items: ["Yaourt grec 200g", "Granola 30g"] },
      { time: "13h", name: "DÉJEUNER", items: ["Riz 200g", "Poulet 200g", "Brocoli 150g", "Huile olive 5ml"] },
      { time: "16h", name: "PRÉ-ENTRAÎNEMENT", items: ["Whey 30g", "Lait 250ml", "Banane", "Riz soufflé 50g"] },
      { time: "19h30", name: "POST-ENTRAÎNEMENT 🔴", items: ["Whey 40g", "Lait 300ml", "Banane", "Créatine 5g", "Miel 10g"], isShake: true },
      { time: "21h30", name: "DÎNER", items: ["Steak 220g", "Pommes de terre 200g", "Épinards 150g"] },
      { time: "23h", name: "AVANT COUCHER", items: ["Fromage blanc 200g", "Miel"] },
    ],
  },
  {
    day: "Dimanche",
    type: "REPOS",
    meals: [
      { time: "7h", name: "PETIT-DÉJEUNER", items: ["2 œufs frits", "2 tranches pain", "1 banane", "Café/Thé"] },
      { time: "10h", name: "COLLATION", items: ["Yaourt grec 200g", "Poignée granola"] },
      { time: "13h", name: "DÉJEUNER", items: ["Riz 150g", "Poulet 180g", "Brocoli"] },
      { time: "16h", name: "SNACK", items: ["Yaourt grec 150g", "1 banane"] },
      { time: "21h", name: "DÎNER", items: ["Steak 200g", "Pommes de terre 180g", "Épinards"] },
      { time: "23h", name: "AVANT COUCHER", items: ["Fromage blanc 200g", "Miel"] },
    ],
  },
];

export const supplements: Supplement[] = [
  {
    name: "WHEY PROTÉINE",
    dosage: "30-40g",
    timing: "Post-entraînement",
    price: "50€/mois",
    icon: "🥛",
    isRequired: true,
  },
  {
    name: "CRÉATINE",
    dosage: "5g/jour",
    timing: "Tous les jours",
    price: "10€/mois",
    icon: "💊",
    isRequired: true,
  },
  {
    name: "CASÉINE",
    dosage: "30g",
    timing: "Avant coucher",
    price: "20€/mois",
    icon: "🌙",
    isRequired: true,
  },
];

export const shoppingList = {
  proteins: [
    { item: "Œufs (25)", price: "5€" },
    { item: "Poulet (1 kg)", price: "12€" },
    { item: "Steak (800g)", price: "10€" },
    { item: "Saumon (400g)", price: "8€" },
    { item: "Thon boîte (2-3)", price: "5€" },
  ],
  carbs: [
    { item: "Riz (1 kg)", price: "3€" },
    { item: "Pâtes (400g)", price: "1,50€" },
    { item: "Pain (1 pain)", price: "2€" },
    { item: "Flocons d'avoine (500g)", price: "2€" },
    { item: "Pommes de terre (2,5 kg)", price: "2,50€" },
  ],
  fruits: [
    { item: "Bananes", price: "1€" },
    { item: "Brocoli", price: "3€" },
    { item: "Épinards", price: "2€" },
  ],
  others: [
    { item: "Yaourt grec (400g)", price: "3€" },
    { item: "Fromage blanc (800g)", price: "2€" },
    { item: "Lait (1,5L)", price: "2€" },
    { item: "Huile olive", price: "3€" },
    { item: "Miel", price: "1€" },
    { item: "Noix (150g)", price: "2€" },
    { item: "Granola", price: "1€" },
  ],
  totalWeekly: "~90€",
};

export const dailyChecklist = [
  "2600 kcal mangés",
  "165g protéines (minimum)",
  "2,5L eau bu",
  "8h sommeil",
  "Caséine avant coucher",
  "Suppléments pris",
];

export const sessionChecklist = [
  "Échauffement 5 min",
  "Charges notées",
  "Tous les exercices faits",
  "Shake POST-ENTRAÎNEMENT dans les 30 min",
];

export const weeklyChecklist = [
  "Pesage samedi matin",
  "Photos 1x/mois",
  "Charges notées dans carnet",
  "Progression +1 kg si possible",
];

export const progressionTips = [
  {
    phase: "Semaines 1-4",
    title: "Apprentissage des Mouvements",
    tips: [
      "Charges semaine 1 : Cherchez des charges faciles",
      "Progression : +1 kg par mois (très lent)",
      "Reps : Cherchez 10-15 reps faciles",
      "But : Apprendre la form correcte",
    ],
  },
  {
    phase: "Semaines 5-12",
    title: "Habituation",
    tips: [
      "Progression : +1-2 kg par mois",
      "Reps : Augmentez de 1-2 reps",
      "But : Augmenter le volume",
    ],
  },
  {
    phase: "Mois 3-12",
    title: "Progression Linéaire",
    tips: [
      "Progression : +1-2 kg par mois (tranquille)",
      "OU +2-3 reps quand charge difficile",
      "Augmentez volume (séries) tous les 3 mois",
    ],
  },
];

export const importantAdvice = [
  {
    title: "Form > Poids",
    icon: "✅",
    tips: [
      "Faire 10 reps PARFAITES = mieux que 15 reps nulles",
      "Prenez vidéos de vous pour vérifier form",
      "Commencez très léger",
    ],
  },
  {
    title: "Progression Lente",
    icon: "📈",
    tips: [
      "+1 kg par mois = OK pour débutant",
      "+5 kg par mois = TROP VITE (risque blessure)",
      "Patience = muscle quand même",
    ],
  },
  {
    title: "Repos = Croissance",
    icon: "😴",
    tips: [
      "3 jours repos par semaine = parfait pour débutant",
      "Sommeil 8h = NON-NÉGOCIABLE",
      "Les muscles poussent en repos, pas à la salle",
    ],
  },
  {
    title: "Blessure = Stop",
    icon: "⚠️",
    tips: [
      "Douleur articulaire ? Stop cet exercice 1-2 semaines",
      "Consulter physio si douleur persiste",
      "Mieux vaut manquer 1 jour que 3 mois",
    ],
  },
];
