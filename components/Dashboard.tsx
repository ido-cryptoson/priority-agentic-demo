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
    { id: 'agents', label: 'AI Agents', icon: Bot, badge: 3 },
    { id: 'crm', label: 'CRM', icon: Users },
    { id: 'network', label: 'Network Intel', icon: Globe },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Priority Logo */}
              <img
                src="https://cdn-ildofcc.nitrocdn.com/kitdiqlmIRSNEPcfDMXRsJhcusqfcNfZ/assets/images/source/rev-ac550fe/www.priority-software.com/wp-content/uploads/2023/02/logo.svg"
                alt="Priority"
                className="h-8"
              />
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-lg font-semibold text-[#16213D]">
                  Priority Intelligence
                </h1>
                <p className="text-xs text-gray-500">{companyInfo.name} • {companyInfo.stores} Stores</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 bg-[#F3F6FF] text-[#3B37E6] text-sm font-medium rounded-full flex items-center gap-2">
                <span className="w-2 h-2 bg-[#3B37E6] rounded-full animate-pulse" />
                3 AI Agents Active
              </span>
              <button className="btn-primary text-sm">
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-[#3B37E6]'
                    : 'text-gray-500 hover:text-[#16213D]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B37E6]" />
                )}
                {'badge' in tab && tab.badge && (
                  <span className="ml-1 px-2 py-0.5 bg-[#3B37E6] text-white text-xs rounded-full">
                    {tab.badge}
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
      <main className="max-w-7xl mx-auto px-6 py-6">
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-sm text-gray-500">
          <span>Powered by Priority Software • aiERP Platform</span>
          <span>Demo for Blackstone • {new Date().toLocaleDateString()}</span>
        </div>
      </footer>
    </div>
  );
}
