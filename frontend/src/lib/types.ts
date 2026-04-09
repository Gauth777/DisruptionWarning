export interface Region {
  id: string;
  name: string;
  active_alerts: number;
  risk_index: number;
  affected_nodes: number;
  status: "critical" | "elevated" | "moderate" | "low";
  coordinates: { lat: number; lng: number };
}

export interface Alert {
  id: string;
  title: string;
  type: "weather" | "strike" | "logistics" | "supply" | "infrastructure";
  severity: number;
  probability: number;
  eta_hours: number;
  expected_delay_hours: number;
  impact_radius_km: number;
  cross_region_spread: boolean;
  impacted_regions: string[];
  impacted_regions_count: number;
  origin_region: string;
  timestamp: string;
}

export interface TreeNode {
  id: string;
  label: string;
  score: number;
  contribution: number;
  delay_hours: number;
  region: string;
  level: number;
  children: TreeNode[];
}

export interface AlertKPIs {
  severity: number;
  confidence: number;
  propagation_depth: number;
  affected_nodes: number;
  impacted_regions: number;
  peak_delay_hours: number;
  national_spread_index: number;
}

export interface FlatNode {
  id: string;
  label: string;
  level: number;
  score: number;
  contribution: number;
  delay_hours: number;
  region: string;
}

export interface Intervention {
  id: string;
  title: string;
  strategy_score: number;
  delay_reduction_pct: number;
  loss_reduction_pct: number;
  cost_delta_lakhs: number;
  recovery_gain_hours: number;
  feasibility: "high" | "medium" | "low";
}

export interface AlertDetail {
  alert: Alert;
  kpis: AlertKPIs;
  impact_tree: TreeNode;
  flat_nodes: FlatNode[];
  tree_stats: {
    total_nodes: number;
    max_depth: number;
    unique_regions: string[];
    region_count: number;
  };
}
