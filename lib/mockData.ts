import { Supplier, InventoryItem, Customer, AgentAction, ProductionOrder, NetworkAlert } from './types';

// Saar Ltd. - Columbia Sportswear Israel
// Leading importer of Columbia with 50+ stores, 60+ POS stations, 2 eCommerce sites

export const suppliers: Supplier[] = [
  { id: 's1', name: 'Columbia HQ (Portland)', lead_time_days: 21, unit_cost: 45.00, quality_rating: 5.0, payment_terms: 'Net 60' },
  { id: 's2', name: 'Asia Distribution Center', lead_time_days: 14, unit_cost: 42.50, quality_rating: 4.8, payment_terms: 'Net 45' },
  { id: 's3', name: 'EU Warehouse (Netherlands)', lead_time_days: 7, unit_cost: 48.00, quality_rating: 4.9, payment_terms: 'Net 30' },
  { id: 's4', name: 'Local Express (Israel)', lead_time_days: 2, unit_cost: 55.00, quality_rating: 4.5, payment_terms: 'Net 15' },
  { id: 's5', name: 'Turkey Textile Partner', lead_time_days: 10, unit_cost: 38.00, quality_rating: 4.3, payment_terms: 'Net 45' },
];

export const inventory: InventoryItem[] = [
  // Critical - Winter jacket running low before season peak (THE DEMO ITEM)
  { id: 'i1', sku: 'COL-WJ-2024', name: 'Columbia Bugaboo Interchange Jacket', current_stock: 120, safety_stock: 80, reorder_point: 150, daily_burn_rate: 25, supplier_id: 's2' },
  // Also low - hiking boots
  { id: 'i2', sku: 'COL-HB-NEWTON', name: 'Newton Ridge Hiking Boots', current_stock: 85, safety_stock: 50, reorder_point: 100, daily_burn_rate: 12, supplier_id: 's3' },
  // Healthy stock levels
  { id: 'i3', sku: 'COL-FL-TECH', name: 'Tech Trail Fleece Pullover', current_stock: 450, safety_stock: 150, reorder_point: 200, daily_burn_rate: 18, supplier_id: 's2' },
  { id: 'i4', sku: 'COL-RP-SILVER', name: 'Silver Ridge Cargo Pants', current_stock: 320, safety_stock: 100, reorder_point: 150, daily_burn_rate: 15, supplier_id: 's5' },
  { id: 'i5', sku: 'COL-BP-ATLAS', name: 'Atlas Explorer Backpack', current_stock: 180, safety_stock: 60, reorder_point: 100, daily_burn_rate: 8, supplier_id: 's1' },
  { id: 'i6', sku: 'COL-CAP-OMNI', name: 'Omni-Shade Sun Cap', current_stock: 890, safety_stock: 200, reorder_point: 400, daily_burn_rate: 35, supplier_id: 's5' },
  { id: 'i7', sku: 'COL-SK-MERINO', name: 'Merino Wool Hiking Socks (3-pack)', current_stock: 1200, safety_stock: 400, reorder_point: 600, daily_burn_rate: 45, supplier_id: 's3' },
  { id: 'i8', sku: 'COL-WP-RAIN', name: 'Watertight II Rain Jacket', current_stock: 280, safety_stock: 100, reorder_point: 180, daily_burn_rate: 14, supplier_id: 's2' },
];

// Retail customers (B2B wholesale + major accounts)
export const customers: Customer[] = [
  { id: 'c1', name: 'IDF Logistics (Military)', credit_limit: 2000000, avg_payment_days: 45, outstanding_ar: 185000, payment_risk: 'low' },
  { id: 'c2', name: 'Krav Maga Worldwide', credit_limit: 150000, avg_payment_days: 38, outstanding_ar: 42000, payment_risk: 'low' },
  { id: 'c3', name: 'Nature & Parks Authority', credit_limit: 500000, avg_payment_days: 62, outstanding_ar: 128000, payment_risk: 'medium' },
  { id: 'c4', name: 'Decathlon Israel (B2B)', credit_limit: 350000, avg_payment_days: 55, outstanding_ar: 89000, payment_risk: 'medium' },
  { id: 'c5', name: 'Outdoor Adventures Tours', credit_limit: 80000, avg_payment_days: 72, outstanding_ar: 67000, payment_risk: 'high' },
  { id: 'c6', name: 'School Sports Federation', credit_limit: 200000, avg_payment_days: 48, outstanding_ar: 35000, payment_risk: 'low' },
  { id: 'c7', name: 'Kibbutz Resorts Network', credit_limit: 250000, avg_payment_days: 58, outstanding_ar: 94000, payment_risk: 'medium' },
  { id: 'c8', name: 'Extreme Sports IL', credit_limit: 120000, avg_payment_days: 68, outstanding_ar: 78000, payment_risk: 'high' },
];

export const productionOrders: ProductionOrder[] = [
  {
    id: 'po1',
    product_name: 'Winter Season Collection Restock',
    quantity: 2500,
    status: 'scheduled',
    start_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    components_required: { 'COL-WJ-2024': 800, 'COL-FL-TECH': 600, 'COL-HB-NEWTON': 400 }
  },
  {
    id: 'po2',
    product_name: 'Dizengoff Center Store Opening',
    quantity: 500,
    status: 'in_progress',
    start_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    components_required: { 'COL-WJ-2024': 100, 'COL-BP-ATLAS': 80, 'COL-RP-SILVER': 120 }
  },
  {
    id: 'po3',
    product_name: 'eCommerce Holiday Campaign',
    quantity: 1500,
    status: 'scheduled',
    start_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    due_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    components_required: { 'COL-WP-RAIN': 300, 'COL-CAP-OMNI': 500, 'COL-SK-MERINO': 700 }
  },
];

// THE CENTERPIECE - Agent actions for the demo
export const agentActions: AgentAction[] = [
  {
    id: 'a0',
    agent_type: 'collections',
    action_type: 'crm_campaign',
    title: 'Abandoned Cart Recovery - 127 Carts Worth ₪89,400',
    reasoning: `**Salesforce Commerce Cloud Sync Alert:**
- 127 abandoned carts detected in last 24 hours
- Total potential revenue: ₪89,400
- Average cart value: ₪704

**Top Abandoned Items:**
| Product | Abandoned | Revenue at Risk |
|---------|-----------|-----------------|
| Bugaboo Interchange Jacket | 34 carts | ₪26,860 |
| Newton Ridge Hiking Boots | 28 carts | ₪19,600 |
| Tech Trail Fleece | 22 carts | ₪11,000 |

**Customer Segments:**
- New visitors: 45% (need trust-building)
- Returning customers: 32% (likely price-sensitive)
- Loyalty members: 23% (high conversion potential)

**Recommended Action:**
Trigger Salesforce Marketing Cloud campaign:
- Loyalty members: 10% discount code + free shipping
- Returning customers: Free shipping only
- New visitors: Welcome offer + social proof

**Projected Recovery:** 15-18% = ₪13,400-₪16,100`,
    status: 'pending',
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    payload: {
      campaign_type: 'cart_recovery',
      carts_targeted: 127,
      total_value: 89400,
      segments: ['loyalty', 'returning', 'new'],
    }
  },
  {
    id: 'a1',
    agent_type: 'inventory',
    action_type: 'purchase_order',
    title: 'Winter Jacket Stockout Alert - Peak Season Risk',
    reasoning: `**Inventory Analysis - Bugaboo Interchange Jacket (COL-WJ-2024):**
- Current stock: 120 units across 52 stores
- Daily sell-through rate: 25 units/day
- Days until stockout: **4.8 days**
- Upcoming demand: Winter Season Restock needs 800 units

**Store-Level Impact:**
- Tel Aviv Dizengoff: 8 units remaining (HIGH RISK)
- Herzliya Marina: 12 units remaining
- Jerusalem Malha: 5 units remaining (CRITICAL)

**Supplier Comparison:**
| Supplier | Lead Time | Unit Cost | Total (500 units) | Arrival |
|----------|-----------|-----------|-------------------|---------|
| Columbia HQ (Portland) | 21 days | $45.00 | $22,500 | Too late |
| Asia Distribution Center | 14 days | $42.50 | $21,250 | Cutting close |
| EU Warehouse (Netherlands) | 7 days | $48.00 | $24,000 | Safe margin |
| Local Express (Israel) | 2 days | $55.00 | $27,500 | Emergency only |

**Recommendation:** EU Warehouse (Netherlands) - 7-day delivery ensures stock arrives before stockout while maintaining reasonable cost. The $2,750 premium over Asia DC is justified by the risk mitigation.

**Business Impact if Approved:**
- Prevents estimated ₪85,000 in lost sales
- Maintains store fill rates above 95%
- Protects Columbia brand experience`,
    status: 'pending',
    created_at: new Date().toISOString(),
    payload: {
      supplier_id: 's3',
      supplier_name: 'EU Warehouse (Netherlands)',
      sku: 'COL-WJ-2024',
      quantity: 500,
      unit_cost: 48.00,
      total_cost: 24000,
      estimated_arrival: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }
  },
  {
    id: 'a2',
    agent_type: 'collections',
    action_type: 'payment_reminder',
    title: 'High-Risk AR: Outdoor Adventures Tours',
    reasoning: `**Customer Analysis - Outdoor Adventures Tours:**
- Outstanding AR: ₪67,000
- Average payment days: 72 (vs 30 day terms)
- Payment risk: HIGH
- Credit utilization: 84% of limit

**Payment History:**
- Last 3 invoices: 45, 58, 72 days to pay (worsening trend)
- Last payment: 28 days ago

**Recommended Action:**
Send automated payment reminder with 2% early payment discount offer (₪1,340 discount for payment within 7 days).

**Alternative:** Reduce credit limit from ₪80,000 to ₪50,000 after payment received.`,
    status: 'pending',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    payload: {
      customer_id: 'c5',
      customer_name: 'Outdoor Adventures Tours',
      amount_due: 67000,
      days_overdue: 42,
      discount_offer: 0.02
    }
  }
];

// Network intelligence alerts - retail/apparel focused
export const networkAlerts: NetworkAlert[] = [
  {
    id: 'n1',
    type: 'delay',
    source: 'Port of Rotterdam',
    affected_companies: 47,
    message: '3 Priority retail customers reported shipping delays from EU warehouse. Average delay: 4 days. Consider expedited shipping for critical items.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: 'n2',
    type: 'price_change',
    source: 'Textile Market Index',
    affected_companies: 156,
    message: 'Cotton prices trending +12% across Asian suppliers. 23 apparel retailers considering forward purchasing. Recommended: Lock in Q1 pricing now.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'n3',
    type: 'disruption',
    source: 'Israel Ports Authority',
    affected_companies: 89,
    message: 'Ashdod Port congestion detected. 15 Priority customers have containers awaiting clearance. Estimated delay: 2-3 days.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  }
];

// Dashboard metrics - Saar Ltd / Columbia specific
export const dashboardMetrics = {
  totalRevenue: 8500000, // Monthly revenue in ILS
  revenueGrowth: 18.5,
  activeOrders: 156, // Orders across 52 stores
  inventoryHealth: 72, // Lower due to winter jacket issue
  cashPosition: 3200000,
  arAtRisk: 239000,
  productionEfficiency: 94, // Store fulfillment rate
  onTimeDelivery: 91,
};

// Company info for display
export const companyInfo = {
  name: 'Saar Ltd.',
  dba: 'Outsiders Israel',
  brand: 'Columbia Sportswear Israel',
  logo: 'https://www.outsiders.co.il/wp-content/uploads/2023/10/outsiders_logo_grey.png',
  industry: 'Apparel & Footwear Retail',
  stores: 52,
  posStations: 64,
  ecomSites: 2,
  employees: 380,
  ceo: 'Aviad Tsabary',
  partnerYears: 13,
  location: 'Israel',
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
    .filter(c => c.payment_risk === 'high' || c.payment_risk === 'medium')
    .reduce((sum, c) => sum + c.outstanding_ar, 0);
}
