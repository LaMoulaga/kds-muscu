import { useState } from "react";
import { MealCard } from "@/components/MealCard";
import { dailyMeals, userStats, shoppingList } from "@/data/workoutData";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Flame, Beef } from "lucide-react";

export function NutritionTab() {
  const [selectedDay, setSelectedDay] = useState(0);
  const dayMeals = dailyMeals[selectedDay];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-display tracking-wider mb-2">
          🍽️ REPAS <span className="text-gradient">ULTRA-SIMPLES</span>
        </h2>
        <p className="text-muted-foreground">
          {userStats.calories} kcal/jour | {userStats.protein}g protéines
        </p>
      </div>

      {/* Macro Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Flame className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Calories quotidiennes</p>
            <p className="text-2xl font-display tracking-wide">{userStats.calories} <span className="text-sm text-muted-foreground">kcal</span></p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Beef className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Protéines quotidiennes</p>
            <p className="text-2xl font-display tracking-wide">{userStats.protein} <span className="text-sm text-muted-foreground">g</span></p>
          </div>
        </div>
      </div>

      {/* Day Selector */}
      <Tabs value={selectedDay.toString()} onValueChange={(v) => setSelectedDay(parseInt(v))}>
        <TabsList className="w-full flex overflow-x-auto bg-muted/50 p-1 rounded-xl">
          {dailyMeals.map((day, index) => (
            <TabsTrigger
              key={day.day}
              value={index.toString()}
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-fit px-3"
            >
              <span className="hidden sm:inline">{day.day}</span>
              <span className="sm:hidden">{day.day.slice(0, 3)}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Day Header */}
      <div className="glass rounded-xl p-4 text-center">
        <h3 className="font-display text-2xl tracking-wide">
          {dayMeals.day} - <span className="text-primary">{dayMeals.type}</span>
        </h3>
      </div>

      {/* Meals Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {dayMeals.meals.map((meal, index) => (
          <MealCard key={meal.time} meal={meal} index={index} />
        ))}
      </div>

      {/* Shopping List */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <h3 className="font-display text-2xl tracking-wide">LISTE DE COURSES</h3>
          </div>
          <span className="text-primary font-display text-xl">{shoppingList.totalWeekly}/semaine</span>
        </div>
        <div className="p-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
              <span>🥩</span> Protéines
            </h4>
            <ul className="space-y-1 text-sm">
              {shoppingList.proteins.map((item) => (
                <li key={item.item} className="flex justify-between text-muted-foreground">
                  <span>{item.item}</span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
              <span>🍚</span> Féculents
            </h4>
            <ul className="space-y-1 text-sm">
              {shoppingList.carbs.map((item) => (
                <li key={item.item} className="flex justify-between text-muted-foreground">
                  <span>{item.item}</span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
              <span>🥦</span> Fruits & Légumes
            </h4>
            <ul className="space-y-1 text-sm">
              {shoppingList.fruits.map((item) => (
                <li key={item.item} className="flex justify-between text-muted-foreground">
                  <span>{item.item}</span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
              <span>🥛</span> Autres
            </h4>
            <ul className="space-y-1 text-sm">
              {shoppingList.others.map((item) => (
                <li key={item.item} className="flex justify-between text-muted-foreground">
                  <span>{item.item}</span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
