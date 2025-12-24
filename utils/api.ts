import { fetchAPI } from './client';

export interface StatInput {
  manziGoals: number;
  manziFreekicks: number;
  johnsonGoals: number;
  johnsonFreekicks: number;
}

export interface Stat extends StatInput {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ManziStats {
  manziGoals: number;
  manziMatches: number;
  manziFreekicks: number;
  manziCleanSheets: number;
  manziAbove7: number;
}

export interface JohnsonStats {
  johnsonGoals: number;
  johnsonMatches: number;
  johnsonFreekicks: number;
  johnsonCleanSheets: number;
  johnsonAbove7: number;
}

export interface StatsResponse {
  manziStats: ManziStats;
  johnsonStats: JohnsonStats;
}

export interface HistoryData {
  date: string;
  matches: Stat[];
}

export interface HistoryResponse {
  data: HistoryData[];
}

// API Functions
export async function getStats(): Promise<StatsResponse> {
  return await fetchAPI('/stats');
}

export async function createStat(data: StatInput): Promise<Stat> {
  return await fetchAPI('/stats', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function bulkCreateStats(data: string): Promise<{ message: string; count: number }> {
  return await fetchAPI('/stats/bulk', {
    method: 'POST',
    body: JSON.stringify({ data }),
  });
}

export async function getHistory(from?: string, to?: string): Promise<HistoryResponse> {
  const params = new URLSearchParams();
  if (from) params.append('from', from);
  if (to) params.append('to', to);
  
  const queryString = params.toString();
  const endpoint = queryString ? `/stats/history?${queryString}` : '/stats/history';
  
  return await fetchAPI(endpoint);
}

export async function updateStat(id: string, data: Partial<StatInput>): Promise<Stat> {
  return await fetchAPI(`/stats/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
