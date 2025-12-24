import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStats, createStat, bulkCreateStats, getHistory, updateStat } from '@/utils/api';
import type { StatInput } from '@/utils/api';

// Hooks
export function useGetStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
  });
}

export function useCreateStat() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createStat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
  });
}

export function useBulkCreateStats() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: bulkCreateStats,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
  });
}

export function useGetHistory(from?: string, to?: string) {
  return useQuery({
    queryKey: ['history', { from, to }],
    queryFn: () => getHistory(from, to),
  });
}

export function useUpdateStat() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<StatInput> }) => updateStat(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
  });
}
