'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, AlertTriangle, TrendingDown, Package, Loader2 } from 'lucide-react';
import { ChatMessage } from '@/lib/types';
import { getCriticalInventory, getHighRiskCustomers, getTotalARAtRisk, dashboardMetrics, productionOrders } from '@/lib/mockData';

interface NLQChatProps {
  compact?: boolean;
}

// Pre-defined responses for demo (fast, reliable) - Saar Ltd / Columbia Sportswear
const demoResponses: Record<string, { content: string; data?: Record<string, unknown> }> = {
  'worry': {
    content: `Based on my analysis across your **52 Columbia stores**, here are the **top priorities for this week**:

**Critical Issues:**
1. **Bugaboo Winter Jacket Stockout Risk** - Only 120 units left across all stores, selling 25/day. Will stockout in **4.8 days** - right before peak winter season!
   - Tel Aviv Dizengoff: 8 units (CRITICAL)
   - Jerusalem Malha: 5 units (CRITICAL)

2. **AR at Risk: ₪239,000** - 4 B2B accounts overdue:
   - Outdoor Adventures Tours: ₪67K (72 avg days - HIGH RISK)
   - Extreme Sports IL: ₪78K (68 avg days)
   - Nature & Parks Authority: ₪128K (62 avg days)

3. **Ashdod Port Congestion** - Your next shipment may be delayed 2-3 days. Network intelligence from 89 Priority customers detected this issue.

**Recommended Actions:**
- Approve the pending PO for Winter Jackets from EU Warehouse (I've already drafted it)
- Send payment reminders to high-risk B2B accounts
- Consider expedited shipping for critical inventory`,
    data: { priority: 'high', actionRequired: true }
  },
  'stockout': {
    content: `**Inventory Alert: 2 Products at Risk Across 52 Stores**

| Product | Current | Daily Sales | Days Left | Status |
|---------|---------|-------------|-----------|--------|
| **Bugaboo Interchange Jacket** | 120 | 25 | 4.8 | CRITICAL |
| Newton Ridge Hiking Boots | 85 | 12 | 7.0 | Warning |

**Store-Level Breakdown (Jackets):**
| Store | Stock | Status |
|-------|-------|--------|
| Tel Aviv Dizengoff | 8 | CRITICAL |
| Jerusalem Malha | 5 | CRITICAL |
| Herzliya Marina | 12 | Low |
| Haifa Grand Canyon | 18 | Low |

**Impact Analysis:**
- Winter Season Collection Restock needs 800 jackets
- Dizengoff Center Store Opening needs 100 more
- Estimated lost sales if stockout: **₪85,000**

**Agent Action:**
I've analyzed 4 suppliers and drafted a PO for EU Warehouse (Netherlands) - 7 day delivery, $24,000 for 500 units. Check the Agents tab to approve.`,
    data: { criticalItems: 2 }
  },
  'cash': {
    content: `**Cash Flow Analysis - Saar Ltd.**

**Current Position:** ₪3,200,000

**Scenario: If high-risk B2B accounts don't pay this month:**

| Customer | Outstanding | Avg Days | Risk |
|----------|-------------|----------|------|
| Outdoor Adventures Tours | ₪67,000 | 72 days | HIGH |
| Extreme Sports IL | ₪78,000 | 68 days | HIGH |
| Nature & Parks Authority | ₪128,000 | 62 days | MEDIUM |
| Decathlon Israel | ₪89,000 | 55 days | MEDIUM |

**Potential Impact:** -₪362,000

**Projected Cash Position:** ₪2,838,000

**Risk Level:** Low - Well above operating threshold. But trend is concerning.

**Recommendation:**
- Initiate 2% early payment discount for Outdoor Adventures Tours (₪1,340 discount)
- Consider reducing their credit limit from ₪80K to ₪50K
- IDF Logistics always pays - ₪185K expected within 45 days`,
    data: { cashImpact: -362000 }
  },
  'production': {
    content: `**Store Performance Report - Last 30 Days**

| Region | Store Fill Rate | Sales/SqM | Trend |
|--------|-----------------|-----------|-------|
| Tel Aviv Metro | 94% | ₪2,450 | Stable |
| Jerusalem | 89% | ₪2,120 | Improving |
| Haifa & North | 91% | ₪1,980 | Stable |
| Eilat & South | 97% | ₪2,890 | Strong |

**eCommerce Performance:**
- columbia.co.il: 12,400 orders (+18% MoM)
- Salesforce Commerce Cloud integration: 99.2% uptime

**Top Selling Items This Week:**
1. Bugaboo Interchange Jacket (running low!)
2. Newton Ridge Hiking Boots
3. Tech Trail Fleece Pullover

**Recommendation:**
- Restock Dizengoff & Malha stores urgently
- Holiday campaign inventory looks good for eCommerce`,
    data: { overallEfficiency: 94 }
  },
  'default': {
    content: `I can help you manage your **52 Columbia stores** and **2 eCommerce sites**. Try asking me:

- "What should I worry about this week?"
- "Which products are at risk of stockout?"
- "What's our cash position if late payers don't pay?"
- "Show me store performance by region"

I have real-time access to inventory across all stores, B2B customer accounts, supplier data, and POS transactions.`,
  }
};

function getResponse(query: string): { content: string; data?: Record<string, unknown> } {
  const q = query.toLowerCase();
  if (q.includes('worry') || q.includes('priorities') || q.includes('focus') || q.includes('important')) {
    return demoResponses['worry'];
  }
  if (q.includes('stockout') || q.includes('inventory') || q.includes('stock') || q.includes('risk')) {
    return demoResponses['stockout'];
  }
  if (q.includes('cash') || q.includes('pay') || q.includes('ar') || q.includes('receivable')) {
    return demoResponses['cash'];
  }
  if (q.includes('production') || q.includes('efficiency') || q.includes('shift') || q.includes('manufacturing')) {
    return demoResponses['production'];
  }
  return demoResponses['default'];
}

export function NLQChat({ compact = false }: NLQChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking (for demo effect)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = getResponse(input);
    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.content,
      timestamp: new Date().toISOString(),
      data: response.data,
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMessage]);
  };

  const suggestedQueries = [
    "What should I worry about this week?",
    "Which products are at risk of stockout across our 52 stores?",
    "What's our cash position with B2B accounts?",
  ];

  return (
    <div className={`bg-gray-900/50 rounded-xl border border-gray-800 flex flex-col ${compact ? 'h-[400px]' : 'h-[600px]'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h2 className="font-semibold">Ask Priority AI</h2>
        <span className="ml-auto text-xs text-gray-500">Natural Language Query</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Sparkles className="w-12 h-12 text-purple-400/50 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">Ask me anything about your business</p>
            <div className="space-y-2">
              {suggestedQueries.map((query, i) => (
                <button
                  key={i}
                  onClick={() => setInput(query)}
                  className="block w-full text-left px-4 py-2 text-sm bg-gray-800/50 hover:bg-gray-800 rounded-lg text-gray-300 transition-colors"
                >
                  "{query}"
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-100'
              }`}
            >
              <div className="text-sm whitespace-pre-wrap prose prose-invert prose-sm max-w-none">
                {message.content.split('\n').map((line, i) => (
                  <p key={i} className={line.startsWith('|') ? 'font-mono text-xs' : ''}>
                    {line.includes('**')
                      ? line.split('**').map((part, j) =>
                          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                        )
                      : line
                    }
                  </p>
                ))}
              </div>
              {(message.data as { actionRequired?: boolean })?.actionRequired && (
                <div className="mt-2 pt-2 border-t border-gray-700">
                  <span className="inline-flex items-center gap-1 text-xs text-orange-400">
                    <AlertTriangle className="w-3 h-3" />
                    Action required - Check Agents tab
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-xl px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
              <span className="text-sm text-gray-400">Analyzing your data...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about inventory, cash flow, production..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg px-4 py-2 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
