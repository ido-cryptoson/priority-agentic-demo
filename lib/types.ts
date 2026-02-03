// TechFlow Manufacturing - Mock Data Types

export interface Supplier {
  id: string;
  name: string;
  lead_time_days: number;
  unit_cost: number;
  quality_rating: number;
  payment_terms: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  current_stock: number;
  safety_stock: number;
  reorder_point: number;
  daily_burn_rate: number;
  supplier_id: string;
  supplier?: Supplier;
}

export interface ProductionOrder {
  id: string;
  product_name: string;
  quantity: number;
  status: 'scheduled' | 'in_progress' | 'completed';
  start_date: string;
  due_date: string;
  components_required: Record<string, number>;
}

export interface PurchaseOrder {
  id: string;
  supplier_id: string;
  supplier?: Supplier;
  status: 'draft' | 'pending_approval' | 'approved' | 'sent';
  items: Array<{ sku: string; quantity: number; unit_cost: number }>;
  total_cost: number;
  created_at: string;
  created_by: 'human' | 'agent';
}

export interface Customer {
  id: string;
  name: string;
  credit_limit: number;
  avg_payment_days: number;
  outstanding_ar: number;
  payment_risk: 'low' | 'medium' | 'high';
}

export interface AgentAction {
  id: string;
  agent_type: 'inventory' | 'collections' | 'production';
  action_type: string;
  title: string;
  reasoning: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  approved_at?: string;
  payload: Record<string, unknown>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  data?: Record<string, unknown>;
}

export interface NetworkAlert {
  id: string;
  type: 'delay' | 'disruption' | 'price_change';
  source: string;
  affected_companies: number;
  message: string;
  timestamp: string;
}
