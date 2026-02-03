'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, AlertTriangle, TrendingDown, Package, Loader2 } from 'lucide-react';
import { ChatMessage } from '@/lib/types';
import { getCriticalInventory, getHighRiskCustomers, getTotalARAtRisk, dashboardMetrics, productionOrders } from '@/lib/mockData';

interface NLQChatProps {
  compact?: boolean;
}

// Pre-defined responses for demo (fast, reliable)
const demoResponses: Record<string, { content: string; data?: Record<string, unknown> }> = {
  'worry': {
    content: `Based on my analysis of your current operations, here are the **top priorities for this week**:

**Critical Issues:**
1. **Component XR-7 Stockout Risk** - Current stock: 450 units, burn rate: 80/day. Will stockout in ~5.6 days. Production order for SmartSensor Pro requires 700 units.

2. **AR at Risk: $182,000** - 3 customers are in high-risk payment status:
   - Gadget World LLC: $52K overdue (65 avg days)
   - ConsumerTech Ltd: $89K outstanding (58 avg days)
   - Future Electronics: $41K outstanding (55 avg days)

3. **Production Efficiency** - Line 2 running at 85% vs target 92%. Recommend maintenance review.

**Recommended Actions:**
- Approve the pending PO for Component XR-7 (I've already drafted it)
- Send payment reminders to high-risk accounts
- Schedule maintenance for Production Line 2`,
    data: { priority: 'high', actionRequired: true }
  },
  'stockout': {
    content: `**Inventory Alert: 2 Components at Risk**

| Component | Current | Daily Use | Days Left | Status |
|-----------|---------|-----------|-----------|--------|
| **XR-7 Microcontroller** | 450 | 80 | 5.6 | CRITICAL |
| CAP-220 Capacitor | 1,200 | 150 | 8.0 | Warning |

**Impact Analysis:**
- XR-7 is needed for the SmartSensor Pro production run (600 units scheduled)
- Current stock insufficient - need 700 units, have 450

**Agent Recommendation:**
I've already analyzed suppliers and drafted a PO for ReliableSupply Co. Check the Agents tab to approve.`,
    data: { criticalItems: 2 }
  },
  'cash': {
    content: `**Cash Flow Analysis**

**Current Position:** $1,250,000

**Scenario: If top 3 late payers don't pay this month:**

| Customer | Outstanding | Probability of Delay |
|----------|-------------|---------------------|
| ConsumerTech Ltd | $89,000 | 72% |
| Gadget World LLC | $52,000 | 85% |
| Future Electronics | $41,000 | 68% |

**Potential Impact:** -$182,000

**Projected Cash Position:** $1,068,000

**Risk Level:** Medium - Still above minimum operating threshold of $800K

**Recommendation:** Initiate early payment discount (2%) for ConsumerTech Ltd - they're most likely to respond positively.`,
    data: { cashImpact: -182000 }
  },
  'production': {
    content: `**Production Efficiency Report - Last 30 Days**

| Shift | Efficiency | vs Target | Trend |
|-------|------------|-----------|-------|
| Day Shift (A) | 94% | +2% | Stable |
| Day Shift (B) | 91% | -1% | Declining |
| Night Shift | 78% | -14% | Critical |

**Root Cause Analysis (Night Shift):**
- Equipment downtime: 45 mins avg per shift
- Material staging delays: 23 mins avg
- Staffing gap: 2 positions unfilled

**Recommendations:**
1. Priority maintenance on CNC Machine #3 (scheduled downtime: 4hrs)
2. Pre-stage materials during day shift handoff
3. Approve overtime for current night crew until positions filled`,
    data: { overallEfficiency: 85 }
  },
  'default': {
    content: `I can help you understand your business operations. Try asking me:

- "What should I worry about this week?"
- "Which products are at risk of stockout?"
- "What's our cash position if late payers don't pay?"
- "Show me production efficiency by shift"

I have access to your inventory, customers, suppliers, and production data in real-time.`,
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
    "Which products are at risk of stockout?",
    "What's our cash position if late payers don't pay?",
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
