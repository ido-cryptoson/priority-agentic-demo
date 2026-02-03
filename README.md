# Priority Agentic ERP Demo

**Live Demo:** https://priority-agentic-demo.vercel.app

A 10-minute demonstration of the future of Agentic ERP for Priority Software, designed for Blackstone CEO presentation.

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/ido-cryptoson/priority-agentic-demo.git
cd priority-agentic-demo

# Install dependencies
npm install

# Run locally
npm run dev

# Open http://localhost:3000
```

---

## What This Demo Shows

### The Core Message
> "Priority is transforming from a system users feed data INTO, to a system that feeds insights and actions OUT."

### Demo Flow (10 minutes)

| Tab | Duration | What It Shows |
|-----|----------|---------------|
| **Dashboard** | 1 min | Overview with KPI metrics, live agent status |
| **Ask AI** | 2 min | Natural language queries - "What should I worry about?" |
| **AI Agents** | 4 min | **Centerpiece** - Autonomous agents drafting POs, awaiting approval |
| **CRM** | 1 min | Priority CRM + Salesforce Commerce Cloud integration |
| **Network Intel** | 1.5 min | Hive mind intelligence from 17K+ Priority customers |

---

## Demo Company: Saar Ltd / Outsiders Israel

The demo showcases a real Priority customer:

- **Legal Entity:** Saar Ltd.
- **DBA:** Outsiders Israel
- **Brand:** Columbia Sportswear Israel
- **Operations:** 52 stores, 64 POS stations, 2 eCommerce sites
- **Employees:** 380
- **Priority Partner:** 13 years

### Key Scenarios Demonstrated

1. **Inventory Stockout Alert**
   - Bugaboo Winter Jackets: 120 units left, 25/day burn rate
   - AI Agent drafts PO for 500 units from EU Warehouse
   - One-click approval

2. **AR Collection Risk**
   - 239K NIS at risk from 4 B2B accounts
   - Outdoor Adventures Tours: 72 days overdue
   - AI recommends payment plan with 2% early discount

3. **Abandoned Cart Recovery**
   - 127 carts worth 89,400 NIS detected via Salesforce sync
   - AI drafts recovery campaign
   - Expected recovery: 10,700-13,400 NIS

4. **Network Intelligence**
   - Port of Rotterdam delays (12 customers reported)
   - Ashdod Port congestion (89 customers flagged)
   - Turkish textile price increase warning

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Hosting | Vercel |
| Source Control | GitHub |

---

## Project Structure

```
priority-agentic-demo/
├── app/
│   ├── layout.tsx          # Root layout with Priority branding
│   ├── page.tsx            # Main page (renders Dashboard)
│   └── globals.css         # Priority brand CSS variables
├── components/
│   ├── Dashboard.tsx       # Main shell with tabs
│   ├── MetricsBar.tsx      # KPI metrics bar
│   ├── NLQChat.tsx         # Natural language query interface
│   ├── AgentPanel.tsx      # AI agents with approval workflow
│   ├── CRMPanel.tsx        # CRM integration view
│   └── NetworkMap.tsx      # Network intelligence visualization
├── lib/
│   ├── mockData.ts         # Saar Ltd / Columbia demo data
│   └── types.ts            # TypeScript interfaces
├── DEMO_SCRIPT.md          # Presentation walkthrough script
└── README.md               # This file
```

---

## Key Files to Modify

### To change demo company:
Edit `lib/mockData.ts`:
- `companyInfo` - Company name, logo, store count
- `inventory` - Products and stock levels
- `customers` - B2B customer list
- `agentActions` - Pending AI agent actions

### To change branding:
Edit `app/globals.css`:
```css
:root {
  --priority-primary: #3B37E6;      /* Main brand color */
  --priority-primary-light: #5753F0; /* Hover state */
  --priority-accent: #F3F6FF;        /* Light background */
  --priority-dark: #16213D;          /* Text color */
}
```

### To change NLQ responses:
Edit `components/NLQChat.tsx`:
- `demoResponses` object contains all pre-defined AI responses

---

## Deployment

### Vercel (Current)
```bash
vercel --prod
```

### Manual Build
```bash
npm run build
npm start
```

---

## Demo Script

See **[DEMO_SCRIPT.md](./DEMO_SCRIPT.md)** for the complete 10-minute presentation walkthrough with:
- Exact talking points
- What to click and when
- Timing checkpoints
- Q&A backup answers
- Recovery tips

---

## Key Talking Points for Blackstone CEO

1. **Defensibility:** Switching costs go from "high" to "unthinkable" - you're not leaving software, you're leaving your AI workforce

2. **Pricing Power:** AI agents = premium tier pricing (30-50% uplift potential)

3. **Competitive Moat:** NetSuite/SAP are 3-5 years behind - their bureaucracy prevents rapid AI deployment

4. **Network Effect:** 17K+ customers create intelligence impossible to replicate

5. **The Transformation:** "This isn't Priority Software. This is Priority Intelligence."

---

## Links

- **Live Demo:** https://priority-agentic-demo.vercel.app
- **GitHub Repo:** https://github.com/ido-cryptoson/priority-agentic-demo
- **Vercel Dashboard:** https://vercel.com/ido-3681s-projects/priority-agentic-demo

---

## Future Enhancements

- [ ] Real OpenAI/Claude API integration for dynamic NLQ
- [ ] Supabase backend for persistent data
- [ ] Real-time WebSocket updates for agent notifications
- [ ] Mobile responsive design
- [ ] Hebrew language support

---

Last updated: February 2026
