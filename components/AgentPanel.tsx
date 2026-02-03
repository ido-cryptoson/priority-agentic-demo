'use client';

import { useState, useEffect } from 'react';
import { Bot, Check, X, Clock, AlertTriangle, Package, DollarSign, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { AgentAction } from '@/lib/types';
import { agentActions as initialActions, suppliers } from '@/lib/mockData';

interface AgentPanelProps {
  compact?: boolean;
}

export function AgentPanel({ compact = false }: AgentPanelProps) {
  const [actions, setActions] = useState<AgentAction[]>(initialActions);
  const [expandedAction, setExpandedAction] = useState<string | null>(initialActions[0]?.id || null);
  const [showConfetti, setShowConfetti] = useState(false);

  const pendingActions = actions.filter((a) => a.status === 'pending');
  const completedActions = actions.filter((a) => a.status !== 'pending');

  const handleApprove = (actionId: string) => {
    setActions((prev) =>
      prev.map((a) =>
        a.id === actionId
          ? { ...a, status: 'approved' as const, approved_at: new Date().toISOString() }
          : a
      )
    );
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const handleReject = (actionId: string) => {
    setActions((prev) =>
      prev.map((a) =>
        a.id === actionId
          ? { ...a, status: 'rejected' as const }
          : a
      )
    );
  };

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'inventory':
        return Package;
      case 'collections':
        return DollarSign;
      default:
        return Bot;
    }
  };

  const getAgentColor = (type: string) => {
    switch (type) {
      case 'inventory':
        return 'text-blue-400 bg-blue-500/20';
      case 'collections':
        return 'text-green-400 bg-green-500/20';
      default:
        return 'text-purple-400 bg-purple-500/20';
    }
  };

  return (
    <div className={`bg-gray-900/50 rounded-xl border border-gray-800 flex flex-col ${compact ? 'h-[400px]' : 'h-auto'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-400" />
          <h2 className="font-semibold">AI Agents</h2>
        </div>
        <div className="flex items-center gap-2">
          {pendingActions.length > 0 && (
            <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {pendingActions.length} awaiting approval
            </span>
          )}
        </div>
      </div>

      {/* Success Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="bg-green-500/20 rounded-full p-8 animate-ping">
            <Check className="w-16 h-16 text-green-400" />
          </div>
        </div>
      )}

      {/* Actions List */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${compact ? '' : 'max-h-[600px]'}`}>
        {/* Pending Actions */}
        {pendingActions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Pending Approval</h3>
            {pendingActions.map((action) => {
              const Icon = getAgentIcon(action.agent_type);
              const isExpanded = expandedAction === action.id;

              return (
                <div
                  key={action.id}
                  className="bg-gray-800/50 rounded-lg border border-orange-500/30 overflow-hidden"
                >
                  {/* Action Header */}
                  <div
                    className="p-4 cursor-pointer hover:bg-gray-800/80 transition-colors"
                    onClick={() => setExpandedAction(isExpanded ? null : action.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getAgentColor(action.agent_type)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 capitalize">{action.agent_type} Agent</span>
                          <span className="px-1.5 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded">
                            Pending
                          </span>
                        </div>
                        <h4 className="font-medium text-white mt-1">{action.title}</h4>
                        {action.payload && (
                          <p className="text-sm text-gray-400 mt-1">
                            {action.agent_type === 'inventory' && (
                              <>
                                Draft PO: {action.payload.quantity} units @ ${action.payload.unit_cost}/ea =
                                <span className="text-white font-medium"> ${action.payload.total_cost?.toLocaleString()}</span>
                              </>
                            )}
                            {action.agent_type === 'collections' && (
                              <>
                                Amount: <span className="text-white font-medium">${action.payload.amount_due?.toLocaleString()}</span>
                                {' '}({action.payload.days_overdue} days overdue)
                              </>
                            )}
                          </p>
                        )}
                      </div>
                      <button className="text-gray-400 hover:text-white">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Reasoning */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-700">
                      <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-4 h-4 text-purple-400" />
                          <span className="text-sm font-medium text-purple-400">Agent Reasoning</span>
                        </div>
                        <div className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                          {action.reasoning.split('\n').map((line, i) => (
                            <p key={i} className={`${line.startsWith('|') ? 'text-xs' : ''} ${line.startsWith('**') ? 'font-bold text-white' : ''}`}>
                              {line.includes('**')
                                ? line.split('**').map((part, j) =>
                                    j % 2 === 1 ? <strong key={j} className="text-white">{part}</strong> : part
                                  )
                                : line
                              }
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(action.id);
                          }}
                          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                        >
                          <Check className="w-5 h-5" />
                          Approve
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(action.id);
                          }}
                          className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                        >
                          <X className="w-5 h-5" />
                          Reject
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Completed Actions */}
        {completedActions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</h3>
            {completedActions.map((action) => {
              const Icon = getAgentIcon(action.agent_type);
              return (
                <div
                  key={action.id}
                  className={`p-4 rounded-lg border ${
                    action.status === 'approved'
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getAgentColor(action.agent_type)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white text-sm">{action.title}</h4>
                      <p className="text-xs text-gray-400">
                        {action.status === 'approved' ? 'Approved' : 'Rejected'} just now
                      </p>
                    </div>
                    {action.status === 'approved' ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <X className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {actions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No pending agent actions</p>
            <p className="text-sm mt-1">Agents are monitoring your operations</p>
          </div>
        )}
      </div>

      {/* Agent Status Footer */}
      <div className="p-4 border-t border-gray-800 bg-gray-900/30">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Inventory Agent
            </span>
            <span className="flex items-center gap-1 text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Collections Agent
            </span>
            <span className="flex items-center gap-1 text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Production Agent
            </span>
          </div>
          <span className="text-gray-500 text-xs">Last scan: 2 min ago</span>
        </div>
      </div>
    </div>
  );
}
