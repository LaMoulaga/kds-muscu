import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Timer, Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface RestTimerProps {
  defaultDuration?: number;
  onComplete?: () => void;
}

export function RestTimer({ defaultDuration = 90, onComplete }: RestTimerProps) {
  const [duration, setDuration] = useState(defaultDuration);
  const [timeLeft, setTimeLeft] = useState(defaultDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playSound = useCallback(() => {
    if (!soundEnabled) return;
    
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    gainNode.gain.value = 0.3;
    
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
      audioContext.close();
    }, 200);
    
    // Play 3 beeps
    setTimeout(() => {
      const ctx2 = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc2 = ctx2.createOscillator();
      const gain2 = ctx2.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx2.destination);
      osc2.frequency.value = 800;
      osc2.type = "sine";
      gain2.gain.value = 0.3;
      osc2.start();
      setTimeout(() => { osc2.stop(); ctx2.close(); }, 200);
    }, 300);
    
    setTimeout(() => {
      const ctx3 = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc3 = ctx3.createOscillator();
      const gain3 = ctx3.createGain();
      osc3.connect(gain3);
      gain3.connect(ctx3.destination);
      osc3.frequency.value = 1000;
      osc3.type = "sine";
      gain3.gain.value = 0.3;
      osc3.start();
      setTimeout(() => { osc3.stop(); ctx3.close(); }, 400);
    }, 600);
  }, [soundEnabled]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      playSound();
      onComplete?.();
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, playSound, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    if (timeLeft === 0) {
      setTimeLeft(duration);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const handleDurationChange = (value: number[]) => {
    const newDuration = value[0];
    setDuration(newDuration);
    if (!isRunning) {
      setTimeLeft(newDuration);
    }
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="glass rounded-2xl p-6 border-primary/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-primary" />
          <h3 className="font-display text-xl tracking-wide">TIMER DE REPOS</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="text-muted-foreground hover:text-foreground"
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </Button>
      </div>

      {/* Timer Display */}
      <div className="relative flex items-center justify-center my-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-40 h-40 -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 70}
              strokeDashoffset={2 * Math.PI * 70 * (1 - progress / 100)}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
        </div>
        <span className={cn(
          "text-5xl font-display z-10 transition-colors",
          timeLeft === 0 && "text-success animate-pulse",
          timeLeft <= 5 && timeLeft > 0 && "text-warning"
        )}>
          {formatTime(timeLeft)}
        </span>
      </div>

      {/* Duration Slider */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Durée: {formatTime(duration)}</span>
          <span>30s - 5min</span>
        </div>
        <Slider
          value={[duration]}
          onValueChange={handleDurationChange}
          min={30}
          max={300}
          step={15}
          disabled={isRunning}
          className="py-2"
        />
        <div className="flex gap-2 flex-wrap">
          {[60, 90, 120, 180].map((preset) => (
            <Button
              key={preset}
              variant="outline"
              size="sm"
              onClick={() => {
                setDuration(preset);
                setTimeLeft(preset);
              }}
              disabled={isRunning}
              className={cn(
                "text-xs",
                duration === preset && "bg-primary text-primary-foreground border-primary"
              )}
            >
              {formatTime(preset)}
            </Button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {!isRunning ? (
          <Button onClick={handleStart} className="flex-1 bg-gradient-primary hover:opacity-90">
            <Play className="w-5 h-5 mr-2" />
            {timeLeft === 0 ? "Recommencer" : "Démarrer"}
          </Button>
        ) : (
          <Button onClick={handlePause} variant="secondary" className="flex-1">
            <Pause className="w-5 h-5 mr-2" />
            Pause
          </Button>
        )}
        <Button onClick={handleReset} variant="outline" size="icon">
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
