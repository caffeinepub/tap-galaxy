import { Button } from '@/components/ui/button';
import { Play, RotateCcw } from 'lucide-react';
import type { GameStatus } from '../hooks/useGameState';

interface GameControlsProps {
  gameStatus: GameStatus;
  onStart: () => void;
  onRestart?: () => void;
}

export function GameControls({ gameStatus, onStart, onRestart }: GameControlsProps) {
  if (gameStatus === 'idle') {
    return (
      <Button
        size="lg"
        className="w-full text-lg font-bold game-button"
        onClick={onStart}
      >
        <Play className="w-5 h-5 mr-2" />
        Comenzar Juego
      </Button>
    );
  }

  if (gameStatus === 'gameOver' && onRestart) {
    return (
      <Button
        size="lg"
        className="w-full text-lg font-bold game-button"
        onClick={onRestart}
      >
        <RotateCcw className="w-5 h-5 mr-2" />
        Jugar de Nuevo
      </Button>
    );
  }

  return null;
}
