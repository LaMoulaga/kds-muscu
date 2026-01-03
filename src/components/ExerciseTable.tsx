import type { Exercise } from "@/data/workoutData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp } from "lucide-react";

interface ExerciseTableProps {
  exercises: Exercise[];
}

export function ExerciseTable({ exercises }: ExerciseTableProps) {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 hover:bg-transparent">
            <TableHead className="text-primary font-display text-lg tracking-wide">Exercice</TableHead>
            <TableHead className="text-center">Séries</TableHead>
            <TableHead className="text-center">Reps</TableHead>
            <TableHead className="text-center">Charge</TableHead>
            <TableHead className="text-right">
              <TrendingUp className="w-4 h-4 inline-block" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exercises.map((exercise, index) => (
            <TableRow
              key={exercise.name}
              className="border-border/30 hover:bg-muted/30 transition-colors"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell className="font-medium">{exercise.name}</TableCell>
              <TableCell className="text-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-display text-lg">
                  {exercise.sets}
                </span>
              </TableCell>
              <TableCell className="text-center text-muted-foreground">{exercise.reps}</TableCell>
              <TableCell className="text-center font-medium">{exercise.weight}</TableCell>
              <TableCell className="text-right text-sm text-success">{exercise.progression}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
