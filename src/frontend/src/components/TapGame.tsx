import { useEffect, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { useGetHighScore, useSetHighScore } from '../hooks/useQueries';
import { GameControls } from './GameControls';
import { GameOverScreen } from './GameOverScreen';
import { HighScoreDisplay } from './HighScoreDisplay';
import { GameIcon } from './GameIcon';
import { Sparkles, Zap } from 'lucide-react';
import { toast } from 'sonner';

export function TapGame() {
  const { score, gameStatus, timeLeft, startGame, incrementScore, resetGame } = useGameState();
  const { data: highScore, isLoading: isLoadingHighScore } = useGetHighScore();
  const setHighScoreMutation = useSetHighScore();
  const [tapAnimations, setTapAnimations] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [comboCount, setComboCount] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);

  useEffect(() => {
    if (gameStatus === 'gameOver' && highScore !== undefined) {
      const currentHighScore = Number(highScore);
      if (score > currentHighScore) {
        setHighScoreMutation.mutate(
          { score, timestamp: Date.now() },
          {
            onSuccess: () => {
              toast.success('🎉 ¡Nueva Puntuación Máxima!', {
                description: `¡Anotaste ${score} puntos!`,
              });
            },
          }
        );
      }
    }
  }, [gameStatus, score, highScore, setHighScoreMutation]);

  const handleTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (gameStatus !== 'playing') return;

    const rect = e.currentTarget.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Combo system
    const now = Date.now();
    if (now - lastTapTime < 500) {
      setComboCount((prev) => prev + 1);
    } else {
      setComboCount(1);
    }
    setLastTapTime(now);

    const points = Math.min(comboCount, 5);
    incrementScore(points);

    // Add tap animation
    const id = Date.now() + Math.random();
    setTapAnimations((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setTapAnimations((prev) => prev.filter((anim) => anim.id !== id));
    }, 1000);
  };

  if (gameStatus === 'gameOver') {
    return <GameOverScreen score={score} highScore={Number(highScore || BigInt(0))} onPlayAgain={resetGame} />;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6 space-y-4">
        <GameIcon />
        <h1 className="text-5xl font-black text-game-text-bright tracking-tight game-title">
          GALAXIA DEL TOQUE
        </h1>
        <p className="text-game-text-muted text-sm">¡Toca tan rápido como puedas!</p>
        <HighScoreDisplay highScore={Number(highScore || BigInt(0))} isLoading={isLoadingHighScore} />
      </div>

      {/* Game Area */}
      {gameStatus === 'idle' ? (
        <div className="game-card p-8 text-center space-y-6">
          <div className="space-y-3">
            <Sparkles className="w-16 h-16 mx-auto text-game-accent animate-pulse" />
            <h2 className="text-2xl font-bold text-game-text-bright">¿Listo para Jugar?</h2>
            <p className="text-game-text-muted">
              ¡Toca la pantalla tantas veces como puedas en 30 segundos!
              <br />
              <span className="text-game-accent font-semibold">¡Construye combos para puntos extra!</span>
            </p>
          </div>
          <GameControls gameStatus={gameStatus} onStart={startGame} />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Score and Timer Display */}
          <div className="flex justify-between items-center gap-4">
            <div className="game-card flex-1 p-4 text-center">
              <div className="text-sm text-game-text-muted mb-1">Puntuación</div>
              <div className="text-3xl font-black text-game-accent score-display">{score}</div>
              {comboCount > 1 && (
                <div className="text-xs text-game-accent-bright font-bold mt-1 animate-bounce flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3" />
                  ¡COMBO {comboCount}x!
                </div>
              )}
            </div>
            <div className="game-card flex-1 p-4 text-center">
              <div className="text-sm text-game-text-muted mb-1">Tiempo</div>
              <div className={`text-3xl font-black ${timeLeft <= 5 ? 'text-game-warning animate-pulse' : 'text-game-text-bright'}`}>
                {timeLeft}s
              </div>
            </div>
          </div>

          {/* Tap Area */}
          <div
            className="game-card relative overflow-hidden cursor-pointer select-none touch-none"
            style={{ minHeight: '400px' }}
            onClick={handleTap}
            onTouchStart={handleTap}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4 pointer-events-none">
                <div className="text-6xl animate-bounce">👆</div>
                <div className="text-2xl font-bold text-game-text-bright">¡TOCA AQUÍ!</div>
                <div className="text-game-text-muted">Sigue tocando rápido para combos</div>
              </div>
            </div>

            {/* Tap animations */}
            {tapAnimations.map((anim) => (
              <div
                key={anim.id}
                className="absolute pointer-events-none tap-effect"
                style={{
                  left: `${anim.x}px`,
                  top: `${anim.y}px`,
                }}
              >
                +{Math.min(comboCount, 5)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
