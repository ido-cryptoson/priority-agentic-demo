import { Supplier, InventoryItem, Customer, AgentAction, ProductionOrder, NetworkAlert } from './types';

// TechFlow Manufacturing - $50M Electronics Manufacturer

export const suppliers: Supplier[] = [
  { id: 's1', name: 'FastParts Inc', lead_time_days: 3, unit_cost: 12.50, quality_rating: 4.2, payment_terms: 'Net 30' },
  { id: 's2', name: 'ReliableSupply Co', lead_time_days: 5, unit_cost: 11.80, quality_rating: 4.7, payment_terms: 'Net 45' },
  { id: 's3', name: 'BudgetParts Ltd', lead_time_days: 7, unit_cost: 10.20, quality_rating: 3.8, payment_terms: 'Net 60' },
  { id: 's4', name: 'PrecisionTech', lead_time_days: 4, unit_cost: 15.30, quality_rating: 4.9, payment_terms: 'Net 30' },
  { id: 's5', name: 'GlobalComponents', lead_time_days: 10, unit_cost: 9.50, quality_rating: 4.0, payment_terms: 'Net 45' },
];

export const inventory: InventoryItem[] = [
  // Critical - Will stockout soon (THE DEMO ITEM)
  { id: 'i1', sku: 'XR-7', name: 'Component XR-7 (Microcontroller)', current_stock: 450, safety_stock: 200, reorder_point: 500, daily_burn_rate: 80, supplier_id: 's2' },
  // Also low
  { id: 'i2', sku: 'CAP-220', name: 'Capacitor 220uF', current_stock: 1200, safety_stock: 800, reorder_point: 1500, daily_burn_rate: 150, supplier_id: 's3' },
  // Healthy stock levels
  { id: 'i3', sku: 'RES-10K', name: 'Resistor 10K Ohm', current_stock: 15000, safety_stock: 5000, reorder_point: 8000, daily_burn_rate: 400, supplier_id: 's5' },
  { id: 'i4', sku: 'PCB-MAIN', name: 'Main PCB Board', current_stock: 890, safety_stock: 300, reorder_point: 500, daily_burn_rate: 45, supplier_id: 's4' },
  { id: 'i5', sku: 'CONN-USB', name: 'USB-C Connector', current_stock: 3200, safety_stock: 1000, reorder_point: 1500, daily_burn_rate: 120, supplier_id: 's1' },
  { id: 'i6', sku: 'LED-BLU', name: 'Blue LED 5mm', current_stock: 8500, safety_stock: 2000, reorder_point: 4000, daily_burn_rate: 250, supplier_id: 's5' },
  { id: 'i7', sku: 'CHIP-PWR', name: 'Power Management IC', current_stock: 620, safety_stock: 200, reorder_point: 400, daily_burn_rate: 35, supplier_id: 's4' },
  { id: 'i8', sku: 'CASE-BLK', name: 'Enclosure Black ABS', current_stock: 1450, safety_stock: 500, reorder_point: 800, daily_burn_rate: 60, supplier_id: 's3' },
];

export const customers: Customer[] = [
  { id: 'c1', name: 'TechRetail Corp', credit_limit: 500000, avg_payment_days: 28, outstanding_ar: 45000, payment_risk: 'low' },
  { id: 'c2', name: 'ElectroMart Inc', credit_limit: 250000, avg_payment_days: 42, outstanding_ar: 78500, payment_risk: 'medium' },
  { id: 'c3', name: 'Gadget World LLC', credit_limit: 150000, avg_payment_days: 65, outstanding_ar: 52000, payment_risk: 'high' },
  { id: 'c4', name: 'SmartDevice Co', credit_limit: 300000, avg_payment_days: 35, outstanding_ar: 23000, payment_risk: 'low' },
  { id: 'c5', name: 'ConsumerTech Ltd', credit_limit: 400000, avg_payment_days: 58, outstanding_ar: 89000, payment_risk: 'high' },
  { id: 'c6', name: 'Digital Solutions', credit_limit: 200000, avg_payment_days: 30, outstanding_ar: 15000, payment_risk: 'low' },
  { id: 'c7', name: 'Innovation Labs', credit_limit: 350000, avg_payment_days: 48, outstanding_ar: 67000, payment_risk: 'medium' },
  { id: 'c8', name: 'Future Electronics', credit_limit: 275000, avg_payment_days: 55, outstanding_ar: 41000, payment_risk: 'high' },
];

export const productionOrders: ProductionOrder[] = [
  {
    id: 'po1',
    product_name: 'SmartSensor Pro',
    quantity: 600,
    status: 'scheduled',
    start_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    due_date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
    components_required: { 'XR-7': 700, 'CAP-220': 1200, 'PCB-MAIN': 600 }
  },
  {
    id: 'po2',
    product_name: 'PowerHub Mini',
    quantity: 400,
    status: 'in_progress',
    start_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    due_date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    components_required: { 'CHIP-PWR': 400, 'CONN-USB': 800, 'CASE-BLK': 400 }
  },
  {
    id: 'po3',
    product_name: 'LED Controller',
    quantity: 1000,
    status: 'scheduled',
    start_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    due_date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    components_required: { 'LED-BLU': 3000, 'RES-10K': 2000, 'PCB-MAIN': 1000 }
  },
];

// THE CENTERPIECE - Agent actions for the demo
export const agentActions: AgentAction[] = [
  {
    id: 'a1',
    agent_type: 'inventory',
    action_type: 'purchase_order',
    title: 'Component XR-7 Stockout Prevention',
    reasoning: `**Analysis:**
- Current stock: 450 units
- Daily burn rate: 80 units/day
- Days until stockout: 5.6 days
- Upcoming production: SmartSensor Pro requires 700 units

**Supplier Comparison:**
| Supplier | Lead Time | Unit Cost | Total (250 units) | Quality |
|----------|-----------|-----------|-------------------|---------|
| FastParts Inc | 3 days | $12.50 | $3,125 | 4.2/5 |
| ReliableSupply Co | 5 days | $11.80 | $2,950 | 4.7/5 |
| BudgetParts Ltd | 7 days | $10.20 | $2,550 | 3.8/5 |

**Recommendation:** ReliableSupply Co offers the optimal balance of cost ($175 savings vs FastParts), quality (4.7 rating), and timing (arrives 1 day before stockout threshold).`,
    status: 'pending',
    created_at: new Date().toISOString(),
    payload: {
      supplier_id: 's2',
      supplier_name: 'ReliableSupply Co',
      sku: 'XR-7',
      quantity: 250,
      unit_cost: 11.80,
      total_cost: 2950,
      estimated_arrival: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    }
  },
  {
    id: 'a2',
    agent_type: 'collections',
    action_type: 'payment_reminder',
    title: 'High-Risk AR: Gadget World LLC',
    reasoning: `**Customer Analysis:**
- Outstanding AR: $52,000
- Average payment days: 65 (vs 30 day terms)
- Payment risk: HIGH
- Last payment: 45 days ago

**Recommended Action:** Send automated payment reminder with 2% early payment discount offer.`,
    status: 'pending',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    payload: {
      customer_id: 'c3',
      customer_name: 'Gadget World LLC',
      amount_due: 52000,
      days_overdue: 35,
      discount_offer: 0.02
    }
  }
];

// Network intelligence alerts
export const networkAlerts: NetworkAlert[] = [
  {
    id: 'n1',
    type: 'delay',
    source: 'Port of Rotterdam',
    affected_companies: 47,
    message: '3 Priority customers reported shipping delays from Port of Rotterdam. Average delay: 4 days.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: 'n2',
    type: 'price_change',
    source: 'Semiconductor Market',
    affected_companies: 128,
    message: 'Microcontroller prices trending +8% across 12 suppliers. Consider forward purchasing.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'n3',
    type: 'disruption',
    source: 'Shenzhen Manufacturing Zone',
    affected_companies: 89,
    message: 'Factory capacity reduction reported. 12 Priority customers have pending orders through this route.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  }
];

// Dashboard metrics
export const dashboardMetrics = {
  totalRevenue: 4250000,
  revenueGrowth: 12.5,
  activeOrders: 47,
  inventoryHealth: 78,
  cashPosition: 1250000,
  arAtRisk: 182000,
  productionEfficiency: 85,
  onTimeDelivery: 94,
};

// Helper function to get inventory with supplier info
export function getInventoryWithSuppliers(): (InventoryItem & { supplier: Supplier })[] {
  return inventory.map(item => ({
    ...item,
    supplier: suppliers.find(s => s.id === item.supplier_id)!
  }));
}

// Helper to calculate days until stockout
export function getDaysUntilStockout(item: InventoryItem): number {
  return Math.floor(item.current_stock / item.daily_burn_rate);
}

// Get critical inventory items (below reorder point)
export function getCriticalInventory(): InventoryItem[] {
  return inventory.filter(item => item.current_stock <= item.reorder_point);
}

// Get high-risk customers
export function getHighRiskCustomers(): Customer[] {
  return customers.filter(c => c.payment_risk === 'high');
}

// Calculate total AR at risk
export function getTotalARAtRisk(): number {
  return customers
    .filter(c => c.payment_risk === 'high')
    .reduce((sum, c) => sum + c.outstanding_ar, 0);
}
