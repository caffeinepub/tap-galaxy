import { useState, useCallback, useEffect, useRef } from 'react';

export type GameStatus = 'idle' | 'playing' | 'gameOver';

export function useGameState() {
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(30);
    setGameStatus('playing');
  }, []);

  const endGame = useCallback(() => {
    setGameStatus('gameOver');
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const incrementScore = useCallback((points: number = 1) => {
    setScore((prev) => prev + points);
  }, []);

  const resetGame = useCallback(() => {
    setScore(0);
    setTimeLeft(30);
    setGameStatus('idle');
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (gameStatus === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameStatus, endGame]);

  return {
    score,
    gameStatus,
    timeLeft,
    startGame,
    endGame,
    incrementScore,
    resetGame,
  };
}
