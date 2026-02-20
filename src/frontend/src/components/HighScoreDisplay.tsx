import { Trophy } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface HighScoreDisplayProps {
  highScore: number;
  isLoading: boolean;
}

export function HighScoreDisplay({ highScore, isLoading }: HighScoreDisplayProps) {
  if (isLoading) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-game-card/50 backdrop-blur-sm">
        <Trophy className="w-4 h-4 text-game-accent" />
        <Skeleton className="h-4 w-16" />
      </div>
    );
  }

  if (highScore === 0) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-game-card/50 backdrop-blur-sm text-game-text-muted text-sm">
        <Trophy className="w-4 h-4" />
        <span>Aún no hay puntuación máxima</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-game-card/50 backdrop-blur-sm">
      <Trophy className="w-4 h-4 text-game-accent" />
      <span className="text-sm text-game-text-muted">Puntuación Máxima:</span>
      <span className="text-lg font-bold text-game-accent">{highScore}</span>
    </div>
  );
}
