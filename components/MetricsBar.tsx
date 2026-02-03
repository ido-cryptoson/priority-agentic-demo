'use client';

import { TrendingUp, TrendingDown, Package, DollarSign, AlertTriangle, Truck } from 'lucide-react';

interface Metrics {
  totalRevenue: number;
  revenueGrowth: number;
  activeOrders: number;
  inventoryHealth: number;
  cashPosition: number;
  arAtRisk: number;
  productionEfficiency: number;
  onTimeDelivery: number;
}

export function MetricsBar({ metrics }: { metrics: Metrics }) {
  const cards = [
    {
      label: 'Monthly Revenue',
      value: `₪${(metrics.totalRevenue / 1000000).toFixed(1)}M`,
      change: metrics.revenueGrowth,
      icon: DollarSign,
      positive: true,
    },
    {
      label: 'Inventory Health',
      value: `${metrics.inventoryHealth}%`,
      change: -3,
      icon: Package,
      positive: false,
      warning: metrics.inventoryHealth < 80,
    },
    {
      label: 'AR at Risk',
      value: `₪${(metrics.arAtRisk / 1000).toFixed(0)}K`,
      change: 15,
      icon: AlertTriangle,
      positive: false,
      warning: true,
    },
    {
      label: 'Store Fulfillment',
      value: `${metrics.onTimeDelivery}%`,
      change: 2,
      icon: Truck,
      positive: true,
    },
  ];

  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border transition-all ${
                card.warning
                  ? 'bg-orange-50 border-orange-200'
                  : 'bg-white border-gray-200 hover:border-[#3B37E6]/30 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{card.label}</span>
                <card.icon className={`w-4 h-4 ${card.warning ? 'text-orange-500' : 'text-gray-400'}`} />
              </div>
              <div className="flex items-end justify-between">
                <span className={`text-2xl font-bold ${card.warning ? 'text-orange-600' : 'text-[#16213D]'}`}>
                  {card.value}
                </span>
                <span
                  className={`flex items-center text-xs font-medium ${
                    card.positive ? 'text-emerald-600' : 'text-red-500'
                  }`}
                >
                  {card.positive ? (
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5" />
                  )}
                  {Math.abs(card.change)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
