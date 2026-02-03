'use client';

import { useState } from 'react';
import { Bot, Check, X, Clock, AlertTriangle, Package, DollarSign, ChevronDown, ChevronUp, Sparkles, ShoppingCart } from 'lucide-react';
import { AgentAction } from '@/lib/types';
import { agentActions as initialActions } from '@/lib/mockData';

interface AgentPanelProps {
  compact?: boolean;
}

export function AgentPanel({ compact = false }: AgentPanelProps) {
  const [actions, setActions] = useState<AgentAction[]>(initialActions);
  const [expandedAction, setExpandedAction] = useState<string | null>(initialActions[0]?.id || null);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);

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
    setShowSuccess(actionId);
    setTimeout(() => setShowSuccess(null), 2000);
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
        return type === 'collections' ? ShoppingCart : DollarSign;
      default:
        return Bot;
    }
  };

  const getAgentColor = (type: string) => {
    switch (type) {
      case 'inventory':
        return 'text-[#3B37E6] bg-[#F3F6FF]';
      case 'collections':
        return 'text-emerald-600 bg-emerald-50';
      default:
        return 'text-purple-600 bg-purple-50';
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-200 flex flex-col shadow-sm ${compact ? 'h-full' : 'h-auto'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#3B37E6] rounded-lg flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-[#16213D]">AI Agents</h2>
            <p className="text-xs text-gray-500">Autonomous decision support</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {pendingActions.length > 0 && (
            <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {pendingActions.length} awaiting approval
            </span>
          )}
        </div>
      </div>

      {/* Actions List */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC] ${compact ? '' : 'max-h-[600px]'}`}>
        {/* Pending Actions */}
        {pendingActions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pending Approval</h3>
            {pendingActions.map((action) => {
              const Icon = getAgentIcon(action.agent_type);
              const isExpanded = expandedAction === action.id;
              const isSuccess = showSuccess === action.id;

              return (
                <div
                  key={action.id}
                  className={`bg-white rounded-xl border-2 overflow-hidden transition-all ${
                    isSuccess ? 'border-emerald-500 bg-emerald-50' : 'border-orange-200'
                  }`}
                >
                  {/* Action Header */}
                  <div
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedAction(isExpanded ? null : action.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl ${getAgentColor(action.agent_type)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 capitalize font-medium">{action.agent_type} Agent</span>
                          {isSuccess ? (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-full">
                              Approved!
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
                              Pending
                            </span>
                          )}
                        </div>
                        <h4 className="font-semibold text-[#16213D] mt-1">{action.title}</h4>
                        {action.payload && (
                          <p className="text-sm text-gray-600 mt-1">
                            {action.agent_type === 'inventory' && (
                              <>
                                Draft PO: {action.payload.quantity} units @ ${action.payload.unit_cost}/ea =
                                <span className="text-[#16213D] font-semibold"> ${action.payload.total_cost?.toLocaleString()}</span>
                              </>
                            )}
                            {action.agent_type === 'collections' && action.action_type === 'crm_campaign' && (
                              <>
                                Recovery campaign: <span className="text-[#16213D] font-semibold">{(action.payload as { carts_targeted?: number }).carts_targeted} carts</span>
                                {' '}worth ₪{(action.payload as { total_value?: number }).total_value?.toLocaleString()}
                              </>
                            )}
                            {action.agent_type === 'collections' && action.action_type !== 'crm_campaign' && (
                              <>
                                Amount: <span className="text-[#16213D] font-semibold">₪{action.payload.amount_due?.toLocaleString()}</span>
                                {' '}({action.payload.days_overdue} days overdue)
                              </>
                            )}
                          </p>
                        )}
                      </div>
                      <button className="text-gray-400 hover:text-[#16213D]">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Reasoning */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                      <div className="mt-4 p-4 bg-[#F8FAFC] rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-4 h-4 text-[#3B37E6]" />
                          <span className="text-sm font-semibold text-[#3B37E6]">Agent Reasoning</span>
                        </div>
                        <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {action.reasoning.split('\n').map((line, i) => (
                            <p key={i} className={`${line.startsWith('|') ? 'font-mono text-xs bg-white p-1 rounded' : ''} ${line.startsWith('**') ? 'font-semibold text-[#16213D] mt-2' : ''}`}>
                              {line.includes('**')
                                ? line.split('**').map((part, j) =>
                                    j % 2 === 1 ? <strong key={j} className="text-[#16213D]">{part}</strong> : part
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
                          className="flex-1 flex items-center justify-center gap-2 bg-[#3B37E6] hover:bg-[#5753F0] text-white py-3 px-4 rounded-full font-medium transition-colors"
                        >
                          <Check className="w-5 h-5" />
                          Approve
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(action.id);
                          }}
                          className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-full font-medium transition-colors"
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
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Completed</h3>
            {completedActions.map((action) => {
              const Icon = getAgentIcon(action.agent_type);
              return (
                <div
                  key={action.id}
                  className={`p-4 rounded-xl border ${
                    action.status === 'approved'
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${getAgentColor(action.agent_type)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#16213D] text-sm">{action.title}</h4>
                      <p className="text-xs text-gray-500">
                        {action.status === 'approved' ? 'Approved' : 'Rejected'} just now
                      </p>
                    </div>
                    {action.status === 'approved' ? (
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-emerald-600" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <X className="w-4 h-4 text-red-600" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {actions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="w-16 h-16 bg-[#F3F6FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-[#3B37E6]" />
            </div>
            <p className="font-medium">No pending agent actions</p>
            <p className="text-sm mt-1">Agents are monitoring your operations</p>
          </div>
        )}
      </div>

      {/* Agent Status Footer */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#3B37E6]">
              <span className="w-2 h-2 bg-[#3B37E6] rounded-full animate-pulse" />
              Inventory Agent
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Collections Agent
            </span>
            <span className="flex items-center gap-1.5 text-purple-600">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              CRM Agent
            </span>
          </div>
          <span className="text-gray-400 text-xs">Last scan: 2 min ago</span>
        </div>
      </div>
    </div>
  );
}
