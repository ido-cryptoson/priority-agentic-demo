'use client';

import { useState } from 'react';
import { Users, ShoppingCart, Mail, Phone, MessageSquare, RefreshCw, ExternalLink, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface CustomerInteraction {
  id: string;
  type: 'purchase' | 'support' | 'email' | 'call' | 'web';
  source: 'priority' | 'salesforce';
  customer: string;
  summary: string;
  timestamp: string;
  value?: number;
  status?: 'open' | 'resolved' | 'pending';
}

interface Customer360 {
  id: string;
  name: string;
  type: 'B2C' | 'B2B';
  loyaltyTier: 'Gold' | 'Silver' | 'Bronze' | 'New';
  totalSpend: number;
  lastPurchase: string;
  openTickets: number;
  nps: number;
  source: 'priority' | 'salesforce' | 'both';
}

const recentInteractions: CustomerInteraction[] = [
  {
    id: '1',
    type: 'purchase',
    source: 'salesforce',
    customer: 'Yael Cohen',
    summary: 'Purchased Bugaboo Jacket + Newton Ridge Boots via columbia.co.il',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    value: 1890,
  },
  {
    id: '2',
    type: 'support',
    source: 'priority',
    customer: 'Nature & Parks Authority',
    summary: 'Bulk order inquiry - 200 fleece pullovers for rangers',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    status: 'open',
  },
  {
    id: '3',
    type: 'web',
    source: 'salesforce',
    customer: 'Anonymous (Session #4521)',
    summary: 'Abandoned cart: 2x Bugaboo Jackets (₪1,580) - Checkout page',
    timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    value: 1580,
  },
  {
    id: '4',
    type: 'call',
    source: 'priority',
    customer: 'IDF Logistics',
    summary: 'Confirmed Q1 uniform order - awaiting PO documentation',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
  },
  {
    id: '5',
    type: 'email',
    source: 'salesforce',
    customer: 'David Levi',
    summary: 'Product inquiry: Omni-Heat technology for hiking trip',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    status: 'open',
  },
];

const topCustomers: Customer360[] = [
  {
    id: 'c1',
    name: 'IDF Logistics',
    type: 'B2B',
    loyaltyTier: 'Gold',
    totalSpend: 2450000,
    lastPurchase: '3 days ago',
    openTickets: 1,
    nps: 9,
    source: 'priority',
  },
  {
    id: 'c2',
    name: 'Yael Cohen',
    type: 'B2C',
    loyaltyTier: 'Gold',
    totalSpend: 12800,
    lastPurchase: '15 min ago',
    openTickets: 0,
    nps: 10,
    source: 'salesforce',
  },
  {
    id: 'c3',
    name: 'Nature & Parks Authority',
    type: 'B2B',
    loyaltyTier: 'Silver',
    totalSpend: 890000,
    lastPurchase: '2 weeks ago',
    openTickets: 2,
    nps: 7,
    source: 'both',
  },
  {
    id: 'c4',
    name: 'Outdoor Adventures Tours',
    type: 'B2B',
    loyaltyTier: 'Bronze',
    totalSpend: 245000,
    lastPurchase: '45 days ago',
    openTickets: 0,
    nps: 6,
    source: 'priority',
  },
];

const syncStats = {
  lastSync: '2 min ago',
  recordsSynced: 12847,
  pendingSync: 23,
  syncHealth: 99.2,
};

export function CRMPanel() {
  const [activeView, setActiveView] = useState<'activity' | 'customers' | 'insights'>('activity');

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'purchase': return ShoppingCart;
      case 'support': return MessageSquare;
      case 'email': return Mail;
      case 'call': return Phone;
      case 'web': return ExternalLink;
      default: return Users;
    }
  };

  const getSourceBadge = (source: string) => {
    if (source === 'salesforce') {
      return (
        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full flex items-center gap-1">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
          Salesforce
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 bg-[#F3F6FF] text-[#3B37E6] text-xs font-medium rounded-full">
        Priority CRM
      </span>
    );
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Gold': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Silver': return 'text-gray-600 bg-gray-100 border-gray-200';
      case 'Bronze': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Sync Status */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#16213D] flex items-center gap-2">
            <Users className="w-6 h-6 text-[#3B37E6]" />
            Unified CRM
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Priority CRM + Salesforce Commerce Cloud - Real-time sync
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Salesforce Sync Status */}
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 border border-gray-200">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-500 animate-spin" style={{ animationDuration: '3s' }} />
              <span className="text-sm text-gray-600 font-medium">Salesforce Sync</span>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <span className="text-xs text-gray-400">Last: {syncStats.lastSync}</span>
            <span className="text-xs text-emerald-600 font-medium">{syncStats.syncHealth}% healthy</span>
          </div>
        </div>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[#3B37E6]/20 p-5 hover:shadow-md hover:border-[#3B37E6]/40 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#F3F6FF] rounded-xl flex items-center justify-center">
              <span className="text-[#3B37E6] font-bold text-lg">P</span>
            </div>
            <span className="font-semibold text-[#16213D]">Priority CRM</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wide">B2B Accounts</span>
              <p className="text-2xl font-bold text-[#16213D]">847</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Open Cases</span>
              <p className="text-2xl font-bold text-[#16213D]">23</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-blue-200 p-5 hover:shadow-md hover:border-blue-400 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              </svg>
            </div>
            <span className="font-semibold text-[#16213D]">Salesforce Commerce</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wide">B2C Profiles</span>
              <p className="text-2xl font-bold text-[#16213D]">45.2K</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Active Carts</span>
              <p className="text-2xl font-bold text-orange-500">127</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-emerald-200 p-5 hover:shadow-md hover:border-emerald-400 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="font-semibold text-[#16213D]">Unified View</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Total Customers</span>
              <p className="text-2xl font-bold text-[#16213D]">46K+</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Synced Today</span>
              <p className="text-2xl font-bold text-emerald-600">{syncStats.recordsSynced.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { id: 'activity', label: 'Live Activity' },
          { id: 'customers', label: 'Customer 360' },
          { id: 'insights', label: 'AI Insights' },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id as typeof activeView)}
            className={`px-5 py-3 text-sm font-medium transition-colors relative ${
              activeView === view.id ? 'text-[#3B37E6]' : 'text-gray-500 hover:text-[#16213D]'
            }`}
          >
            {view.label}
            {activeView === view.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B37E6]" />
            )}
          </button>
        ))}
      </div>

      {/* Activity Feed */}
      {activeView === 'activity' && (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {recentInteractions.map((interaction) => {
            const Icon = getInteractionIcon(interaction.type);
            return (
              <div key={interaction.id} className="p-4 hover:bg-[#F8FAFC] transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl ${
                    interaction.type === 'purchase' ? 'bg-emerald-50 text-emerald-600' :
                    interaction.type === 'support' ? 'bg-orange-50 text-orange-600' :
                    interaction.type === 'web' ? 'bg-amber-50 text-amber-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-[#16213D]">{interaction.customer}</span>
                      {getSourceBadge(interaction.source)}
                      {interaction.status && (
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          interaction.status === 'open' ? 'bg-orange-50 text-orange-600' :
                          interaction.status === 'resolved' ? 'bg-emerald-50 text-emerald-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {interaction.status}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{interaction.summary}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span>{new Date(interaction.timestamp).toLocaleTimeString()}</span>
                      {interaction.value && (
                        <span className="text-emerald-600 font-medium">₪{interaction.value.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Customer 360 View */}
      {activeView === 'customers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topCustomers.map((customer) => (
            <div key={customer.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-[#3B37E6]/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#16213D]">{customer.name}</h3>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getTierColor(customer.loyaltyTier)}`}>
                      {customer.loyaltyTier}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{customer.type} Customer</span>
                </div>
                {customer.source === 'both' ? (
                  <div className="flex gap-1">
                    <span className="px-2 py-0.5 bg-[#F3F6FF] text-[#3B37E6] text-xs font-medium rounded">P</span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded">SF</span>
                  </div>
                ) : (
                  getSourceBadge(customer.source)
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-xs text-gray-500">Total Spend</span>
                  <p className="font-bold text-[#16213D]">₪{(customer.totalSpend / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Last Purchase</span>
                  <p className="font-medium text-[#16213D]">{customer.lastPurchase}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">NPS Score</span>
                  <p className={`font-bold ${customer.nps >= 9 ? 'text-emerald-600' : customer.nps >= 7 ? 'text-amber-600' : 'text-red-500'}`}>
                    {customer.nps}/10
                  </p>
                </div>
              </div>
              {customer.openTickets > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs text-orange-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {customer.openTickets} open support ticket{customer.openTickets > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* AI Insights */}
      {activeView === 'insights' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-[#F3F6FF] to-blue-50 rounded-xl border border-[#3B37E6]/20 p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[#3B37E6]" />
              <h3 className="font-semibold text-[#16213D]">Cross-Platform Insights</h3>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <p className="text-sm text-gray-700">
                  <span className="text-emerald-600 font-semibold">Upsell Opportunity:</span> 23 B2C customers who bought Newton Ridge Boots also viewed Bugaboo Jackets. Recommend bundled promotion.
                </p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <p className="text-sm text-gray-700">
                  <span className="text-orange-600 font-semibold">Churn Risk:</span> Outdoor Adventures Tours hasn't made a purchase in 45 days (vs 14-day avg). Consider re-engagement campaign.
                </p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <p className="text-sm text-gray-700">
                  <span className="text-[#3B37E6] font-semibold">Cart Recovery:</span> 127 abandoned carts totaling ₪89,400. Salesforce triggered 45 recovery emails, 12% conversion rate.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-[#16213D] mb-3 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#3B37E6]" />
              Sync Intelligence
            </h3>
            <p className="text-sm text-gray-600">
              Priority's OneCore engine synced <span className="text-[#16213D] font-semibold">12,847 records</span> with Salesforce Commerce Cloud today.
              Customer purchase history, loyalty points, and support tickets are unified in real-time.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              Average sync latency: 1.2 seconds
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
