export type UserRole = 'CONSTABLE' | 'INSPECTOR' | 'SUPERINTENDENT' | 'ADMIN';

export interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  badge_number: string;
  role: UserRole;
  station_id?: string | null;
}

export interface Incident {
  id: string;
  fir_number: string;
  station_id: string;
  incident_date: string;
  filed_date: string;
  ipc_sections: string[];
  category: string;
  status: 'OPEN' | 'UNDER_INVESTIGATION' | 'CHARGESHEET_FILED' | 'CLOSED';
  location_name: string;
  latitude: number;
  longitude: number;
  complainant_name: string;
  accused_name: string;
  investigating_officer: string;
  raw_fir_text: string;
}

export interface AgentExecutionLog {
  step: string;
  status: 'EXECUTING' | 'COMPLETED' | 'REJECTED' | 'PASSED' | 'SKIPPED' | 'IN_PROGRESS';
  details?: string;
  generated_sql?: string;
  timestamp?: string;
}

export interface FIRSummaryData {
  summary_text: string;
  timeline: Array<{ time: string; event: string }>;
  accused_details: string[];
  victim_details: string[];
  weapons_involved: string[];
  vehicles_involved: string[];
  modus_operandi: string;
  ipc_sections_suggested: string[];
}

export interface ValidationData {
  confidence_score: number;
  is_hallucination_detected: boolean;
  validation_notes: string;
  field_completeness: number;
}

export interface AIQueryResponse {
  success: boolean;
  error?: string;
  query: string;
  search_output?: {
    generated_sql: string;
    category_filter?: string;
    location_keyword?: string;
    date_range_days?: number;
    explanation: string;
  };
  summary_output?: FIRSummaryData;
  validation_output?: ValidationData;
  trend_output?: {
    crime_surge_detected: boolean;
    surge_percentage: number;
    dominant_category: string;
    hotspot_zones: string[];
    recommendations: string[];
  };
  matched_incidents_count: number;
  matched_incidents: Incident[];
  execution_logs: AgentExecutionLog[];
  execution_time_ms: number;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  username: string;
  user_role: string;
  action: string;
  resource_target: string;
  details?: any;
  ip_address: string;
  timestamp: string;
}
