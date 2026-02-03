'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, AlertTriangle, Loader2 } from 'lucide-react';
import { ChatMessage } from '@/lib/types';

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
  if (q.includes('production') || q.includes('efficiency') || q.includes('shift') || q.includes('store') || q.includes('performance')) {
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
    <div className={`bg-white rounded-xl border border-gray-200 flex flex-col shadow-sm ${compact ? 'h-full' : 'h-[600px]'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-2">
        <div className="w-8 h-8 bg-[#3B37E6] rounded-lg flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="font-semibold text-[#16213D]">Ask Priority AI</h2>
          <p className="text-xs text-gray-500">Natural Language Query</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#F3F6FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-[#3B37E6]" />
            </div>
            <p className="text-gray-600 mb-4 font-medium">Ask me anything about your business</p>
            <div className="space-y-2 max-w-md mx-auto">
              {suggestedQueries.map((query, i) => (
                <button
                  key={i}
                  onClick={() => setInput(query)}
                  className="block w-full text-left px-4 py-3 text-sm bg-white hover:bg-[#F3F6FF] rounded-xl text-gray-700 transition-colors border border-gray-200 hover:border-[#3B37E6]/30"
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
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-[#3B37E6] text-white'
                  : 'bg-white text-[#16213D] border border-gray-200 shadow-sm'
              }`}
            >
              <div className="text-sm whitespace-pre-wrap">
                {message.content.split('\n').map((line, i) => (
                  <p key={i} className={`${line.startsWith('|') ? 'font-mono text-xs' : ''} ${i > 0 ? 'mt-1' : ''}`}>
                    {line.includes('**')
                      ? line.split('**').map((part, j) =>
                          j % 2 === 1 ? <strong key={j} className={message.role === 'user' ? 'text-white' : 'text-[#3B37E6]'}>{part}</strong> : part
                        )
                      : line
                    }
                  </p>
                ))}
              </div>
              {(message.data as { actionRequired?: boolean })?.actionRequired && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className="inline-flex items-center gap-1 text-xs text-orange-600 font-medium">
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
            <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-2 border border-gray-200 shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-[#3B37E6]" />
              <span className="text-sm text-gray-500">Analyzing your data...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about inventory, cash flow, store performance..."
            className="flex-1 bg-[#F8FAFC] border border-gray-200 rounded-full px-5 py-3 text-[#16213D] placeholder-gray-400 focus:outline-none focus:border-[#3B37E6] focus:ring-2 focus:ring-[#3B37E6]/20 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-[#3B37E6] hover:bg-[#5753F0] disabled:bg-gray-300 disabled:cursor-not-allowed rounded-full px-5 py-3 transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
}
