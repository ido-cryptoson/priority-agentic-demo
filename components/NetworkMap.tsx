'use client';

import { useState, useEffect } from 'react';
import { Globe, AlertTriangle, TrendingUp, Truck, Building2, Radio } from 'lucide-react';
import { networkAlerts } from '@/lib/mockData';
import { NetworkAlert } from '@/lib/types';

export function NetworkMap() {
  const [activeAlerts] = useState<NetworkAlert[]>(networkAlerts);
  const [pulsingNodes, setPulsingNodes] = useState<Set<number>>(new Set());

  // Simulate network activity with pulsing nodes
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNodes = new Set<number>();
      const count = Math.floor(Math.random() * 5) + 3;
      for (let i = 0; i < count; i++) {
        randomNodes.add(Math.floor(Math.random() * 20));
      }
      setPulsingNodes(randomNodes);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'delay':
        return Truck;
      case 'disruption':
        return AlertTriangle;
      case 'price_change':
        return TrendingUp;
      default:
        return Radio;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'delay':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'disruption':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'price_change':
        return 'text-[#3B37E6] bg-[#F3F6FF] border-[#3B37E6]/30';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  // Generate network node positions
  const nodes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: 10 + (i % 5) * 20 + (Math.random() * 10 - 5),
    y: 15 + Math.floor(i / 5) * 20 + (Math.random() * 10 - 5),
    size: Math.random() > 0.7 ? 'lg' : Math.random() > 0.5 ? 'md' : 'sm',
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#16213D] flex items-center gap-2">
            <Globe className="w-6 h-6 text-[#3B37E6]" />
            Network Intelligence
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Real-time insights from 17,000+ Priority customers worldwide
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-full flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Network Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Network Visualization */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="relative aspect-video bg-gradient-to-br from-[#F8FAFC] to-[#F3F6FF] rounded-xl overflow-hidden border border-gray-100">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-300" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full">
              {nodes.map((node, i) =>
                nodes.slice(i + 1).map((other, j) => {
                  const distance = Math.sqrt(Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2));
                  if (distance < 30) {
                    return (
                      <line
                        key={`${i}-${j}`}
                        x1={`${node.x}%`}
                        y1={`${node.y}%`}
                        x2={`${other.x}%`}
                        y2={`${other.y}%`}
                        stroke="rgba(59, 55, 230, 0.15)"
                        strokeWidth="1"
                      />
                    );
                  }
                  return null;
                })
              )}
            </svg>

            {/* Network nodes */}
            {nodes.map((node) => (
              <div
                key={node.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                  pulsingNodes.has(node.id) ? 'scale-150' : ''
                }`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div
                  className={`rounded-full ${
                    pulsingNodes.has(node.id) ? 'bg-emerald-500' : 'bg-[#3B37E6]'
                  } ${
                    node.size === 'lg' ? 'w-4 h-4' : node.size === 'md' ? 'w-3 h-3' : 'w-2 h-2'
                  }`}
                />
              </div>
            ))}

            {/* Alert indicators */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                <span className="w-2 h-2 bg-[#3B37E6] rounded-full animate-pulse" />
                <span className="text-xs text-[#16213D] font-medium">17,423 Active</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-xs text-[#16213D] font-medium">3 Alerts</span>
              </div>
            </div>

            {/* Priority logo watermark */}
            <div className="absolute bottom-4 left-4 text-gray-400 text-xs font-medium">
              Priority Network • Real-time supply chain intelligence
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-4 grid grid-cols-4 gap-4">
            {[
              { label: 'Active Companies', value: '17,423', icon: Building2 },
              { label: 'Data Points/Day', value: '2.4M', icon: Radio },
              { label: 'Supply Chains', value: '8,921', icon: Truck },
              { label: 'Alert Response', value: '<5min', icon: AlertTriangle },
            ].map((stat, i) => (
              <div key={i} className="bg-[#F8FAFC] rounded-xl p-3 border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <stat.icon className="w-3 h-3" />
                  <span className="text-xs font-medium">{stat.label}</span>
                </div>
                <span className="text-lg font-bold text-[#16213D]">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-[#16213D] mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Network Alerts
          </h3>
          <div className="space-y-3">
            {activeAlerts.map((alert) => {
              const Icon = getAlertIcon(alert.type);
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold uppercase">{alert.type.replace('_', ' ')}</span>
                        <span className="text-xs opacity-60">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm">{alert.message}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs opacity-70">Source: {alert.source}</span>
                        <span className="text-xs px-2 py-0.5 bg-white/50 rounded-full font-medium">
                          {alert.affected_companies} companies affected
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Network Effect Explanation */}
          <div className="mt-6 p-4 bg-gradient-to-br from-[#F3F6FF] to-white rounded-xl border border-[#3B37E6]/20">
            <h4 className="font-semibold text-[#3B37E6] mb-2">The Hive Mind Advantage</h4>
            <p className="text-sm text-gray-600">
              When one Priority customer experiences a supply chain issue, the entire network learns.
              This collective intelligence is impossible for competitors to replicate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
