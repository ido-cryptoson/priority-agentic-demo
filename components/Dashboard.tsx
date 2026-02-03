'use client';

import { useState } from 'react';
import { NLQChat } from './NLQChat';
import { AgentPanel } from './AgentPanel';
import { NetworkMap } from './NetworkMap';
import { MetricsBar } from './MetricsBar';
import { CRMPanel } from './CRMPanel';
import { dashboardMetrics, companyInfo } from '@/lib/mockData';
import { Bot, MessageSquare, Globe, LayoutDashboard, Users } from 'lucide-react';

type TabType = 'overview' | 'chat' | 'agents' | 'crm' | 'network';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chat', label: 'Ask AI', icon: MessageSquare },
    { id: 'agents', label: 'AI Agents', icon: Bot },
    { id: 'crm', label: 'CRM', icon: Users },
    { id: 'network', label: 'Network Intel', icon: Globe },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-sky-400 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                C
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
                  Priority Intelligence
                </h1>
                <p className="text-xs text-gray-400">{companyInfo.name} ({companyInfo.brand}) - {companyInfo.stores} Stores</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                3 Agents Active
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-gray-800 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-blue-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                )}
                {tab.id === 'agents' && (
                  <span className="ml-1 px-1.5 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                    2
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Metrics Bar */}
      <MetricsBar metrics={dashboardMetrics} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-1">
              <NLQChat compact />
            </div>
            <div className="lg:col-span-1">
              <AgentPanel compact />
            </div>
          </div>
        )}
        {activeTab === 'chat' && <NLQChat />}
        {activeTab === 'agents' && <AgentPanel />}
        {activeTab === 'crm' && <CRMPanel />}
        {activeTab === 'network' && <NetworkMap />}
      </main>
    </div>
  );
}
