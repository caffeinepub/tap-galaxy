import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGetHighScore() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['highScore'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getHighScore();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetHighScore() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ score, timestamp }: { score: number; timestamp: number }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setHighScore(BigInt(score), BigInt(timestamp));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['highScore'] });
    },
  });
}
