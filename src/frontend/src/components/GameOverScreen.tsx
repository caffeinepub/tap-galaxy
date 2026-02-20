import { GameControls } from './GameControls';
import { AdPlaceholder } from './AdPlaceholder';
import { Trophy, Star, TrendingUp } from 'lucide-react';

interface GameOverScreenProps {
  score: number;
  highScore: number;
  onPlayAgain: () => void;
}

export function GameOverScreen({ score, highScore, onPlayAgain }: GameOverScreenProps) {
  const isNewHighScore = score > highScore;
  const isGoodScore = score >= highScore * 0.8;

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Interstitial Ad Placeholder */}
      <AdPlaceholder size="interstitial" />

      {/* Game Over Card */}
      <div className="game-card p-8 text-center space-y-6">
        {/* Icon and Title */}
        <div className="space-y-4">
          {isNewHighScore ? (
            <>
              <Trophy className="w-20 h-20 mx-auto text-game-accent animate-bounce" />
              <h2 className="text-3xl font-black text-game-accent">¡NUEVA PUNTUACIÓN MÁXIMA!</h2>
              <p className="text-game-text-muted">¡Estás en llamas! 🔥</p>
            </>
          ) : isGoodScore ? (
            <>
              <Star className="w-20 h-20 mx-auto text-game-accent-bright animate-pulse" />
              <h2 className="text-3xl font-black text-game-text-bright">¡Buen Trabajo!</h2>
              <p className="text-game-text-muted">¡Casi superas tu récord!</p>
            </>
          ) : (
            <>
              <TrendingUp className="w-20 h-20 mx-auto text-game-text-bright" />
              <h2 className="text-3xl font-black text-game-text-bright">Fin del Juego</h2>
              <p className="text-game-text-muted">¡Sigue practicando!</p>
            </>
          )}
        </div>

        {/* Score Display */}
        <div className="space-y-4">
          <div className="game-card-inner p-6">
            <div className="text-sm text-game-text-muted mb-2">Tu Puntuación</div>
            <div className="text-5xl font-black text-game-accent score-display">{score}</div>
          </div>

          <div className="flex justify-center gap-4 text-sm">
            <div className="text-center">
              <div className="text-game-text-muted">Puntuación Máxima</div>
              <div className="text-2xl font-bold text-game-text-bright">{Math.max(score, highScore)}</div>
            </div>
          </div>
        </div>

        {/* Play Again Button */}
        <GameControls gameStatus="gameOver" onStart={() => {}} onRestart={onPlayAgain} />
      </div>
    </div>
  );
}
