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
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shrink-0">
        <div className="w-full px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Priority Logo */}
              <img
                src="https://cdn-ildofcc.nitrocdn.com/kitdiqlmIRSNEPcfDMXRsJhcusqfcNfZ/assets/images/source/rev-ac550fe/www.priority-software.com/wp-content/uploads/2023/02/logo.svg"
                alt="Priority"
                className="h-7"
              />
              <div className="h-5 w-px bg-gray-300" />
              {/* Outsiders Logo & Company Info */}
              <div className="flex items-center gap-3">
                <img
                  src={companyInfo.logo}
                  alt="Outsiders Israel"
                  className="h-6"
                />
                <div>
                  <h1 className="text-sm font-semibold text-[#16213D] flex items-center gap-2">
                    {companyInfo.dba}
                    <span className="text-xs font-normal text-gray-400">({companyInfo.name})</span>
                  </h1>
                  <p className="text-xs text-gray-500">{companyInfo.stores} Stores • {companyInfo.posStations} POS • {companyInfo.ecomSites} eCommerce</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#F3F6FF] text-[#3B37E6] text-xs font-medium rounded-full flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#3B37E6] rounded-full animate-pulse" />
                3 AI Agents Active
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200 shrink-0">
        <div className="w-full px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
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
      <div className="shrink-0">
        <MetricsBar metrics={dashboardMetrics} />
      </div>

      {/* Main Content */}
      <main className="w-full px-6 py-4 flex-1 overflow-hidden flex flex-col">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
            <div className="lg:col-span-1 min-h-0">
              <NLQChat compact />
            </div>
            <div className="lg:col-span-1 min-h-0">
              <AgentPanel compact />
            </div>
          </div>
        )}
        {activeTab === 'chat' && <NLQChat />}
        {activeTab === 'agents' && <AgentPanel />}
        {activeTab === 'crm' && <CRMPanel />}
        {activeTab === 'network' && <NetworkMap />}
      </main>

      {/* Footer - Minimal */}
      <footer className="bg-white border-t border-gray-200 py-1.5 px-6 shrink-0">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Priority Software • aiERP Platform</span>
          <span>Blackstone Demo</span>
        </div>
      </footer>
    </div>
  );
}
