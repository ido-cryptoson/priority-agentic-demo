'use client';

import { useState, useEffect } from 'react';
import { Globe, AlertTriangle, TrendingUp, Truck, Building2, Radio } from 'lucide-react';
import { networkAlerts } from '@/lib/mockData';
import { NetworkAlert } from '@/lib/types';

export function NetworkMap() {
  const [activeAlerts, setActiveAlerts] = useState<NetworkAlert[]>(networkAlerts);
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
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'disruption':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'price_change':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
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
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-400" />
            Network Intelligence
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Real-time insights from 17,000+ Priority customers worldwide
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Network Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Network Visualization */}
        <div className="lg:col-span-2 bg-gray-900/50 rounded-xl border border-gray-800 p-6">
          <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-600" />
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
                        stroke="rgba(59, 130, 246, 0.2)"
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
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                  pulsingNodes.has(node.id) ? 'animate-ping' : ''
                }`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div
                  className={`rounded-full bg-blue-500 ${
                    node.size === 'lg' ? 'w-4 h-4' : node.size === 'md' ? 'w-3 h-3' : 'w-2 h-2'
                  } ${pulsingNodes.has(node.id) ? 'bg-green-400' : ''}`}
                />
              </div>
            ))}

            {/* Alert indicators */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 bg-gray-900/80 px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-300">17,423 Active</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-900/80 px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-300">3 Alerts</span>
              </div>
            </div>

            {/* Priority logo watermark */}
            <div className="absolute bottom-4 left-4 text-gray-600 text-xs">
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
              <div key={i} className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <stat.icon className="w-3 h-3" />
                  <span className="text-xs">{stat.label}</span>
                </div>
                <span className="text-lg font-bold text-white">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            Network Alerts
          </h3>
          <div className="space-y-3">
            {activeAlerts.map((alert) => {
              const Icon = getAlertIcon(alert.type);
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium uppercase">{alert.type.replace('_', ' ')}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-200">{alert.message}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-gray-400">Source: {alert.source}</span>
                        <span className="text-xs px-2 py-0.5 bg-gray-800 rounded-full">
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
          <div className="mt-6 p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
            <h4 className="font-medium text-blue-400 mb-2">The Hive Mind Advantage</h4>
            <p className="text-sm text-gray-300">
              When one Priority customer experiences a supply chain issue, the entire network learns.
              This collective intelligence is impossible for competitors to replicate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
