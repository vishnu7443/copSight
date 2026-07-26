import axios from 'axios';
import { Incident, AIQueryResponse, AuditLog, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject JWT Bearer Token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ksp_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  // Auth
  login: async (username: string, password: string) => {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Incidents
  getIncidents: async (params?: { category?: string; search?: string; status?: string }): Promise<Incident[]> => {
    const response = await apiClient.get('/incidents', { params });
    return response.data;
  },

  getIncidentById: async (id: string): Promise<Incident> => {
    const response = await apiClient.get(`/incidents/${id}`);
    return response.data;
  },

  createIncident: async (incidentData: Partial<Incident>): Promise<Incident> => {
    const response = await apiClient.post('/incidents', incidentData);
    return response.data;
  },

  // AI Operations
  executeAIQuery: async (prompt: string): Promise<AIQueryResponse> => {
    const response = await apiClient.post('/ai/query', { prompt });
    return response.data;
  },

  executeAgentQuery: async (payload: { prompt: string; station_id?: string }) => {
    const response = await apiClient.post('/ai/query', payload);
    return response.data;
  },

  getCaseSimilarity: async (incidentId: string) => {
    const response = await apiClient.get(`/ai/similarity/${incidentId}`);
    return response.data;
  },

  summarizeFIR: async (firId: string) => {
    const response = await apiClient.post('/ai/summarize', { fir_id: firId });
    return response.data;
  },

  getDailyBriefing: async (station_id?: string) => {
    const response = await apiClient.get('/ai/briefing', { params: { station_id } });
    return response.data;
  },

  // Analytics & Audit
  getDashboardAnalytics: async () => {
    const response = await apiClient.get('/analytics/dashboard');
    return response.data;
  },

  getAuditLogs: async (): Promise<AuditLog[]> => {
    const response = await apiClient.get('/audit');
    return response.data;
  },
};
