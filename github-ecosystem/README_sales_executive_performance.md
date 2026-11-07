# Sales Executive Performance Dashboard
### Field Sales Quota Tracking & Cash Collection Incentive Engine

[![Framework: React](https://img.shields.io/badge/Frontend-React%20%7C%20TypeScript-3178C6?logo=typescript&logoColor=white)](https://reactjs.org/)
[![Charts: Recharts](https://img.shields.io/badge/Visualization-Recharts-22C55E)](https://recharts.org/)
[![Type: Personal Project](https://img.shields.io/badge/Project%20Type-Personal%20Analytics%20Case%20Study-10B981)](https://github.com/Moazawad2002)

---

## 🎯 Overview & Purpose

A real-time field operations and sales performance analytics platform designed to bridge commercial sales goals with corporate accounting realities.

Tracks multi-representative quota attainment against consolidated company targets (**3,190,000 EGP monthly baseline** across Cairo, Alexandria, and Mansoura hubs), computing transparent tiered commissions while enforcing cash collection discipline.

---

## ⚠️ The Commercial Challenge

In high-velocity wholesale distribution:
1. Sales representatives are frequently rewarded on **gross invoiced sales**, creating perverse incentives to sell to unvetted or delinquent customers who never pay.
2. Manual commission tracking creates mistrust between field staff and financial accounting teams.
3. Regional branch heads lack real-time visibility into customer visit frequency and order velocity.

---

## 💡 System Solution & Governance Logic

```
   [Invoiced Sales (EGP)]          [Cash Collected (EGP)]
             │                               │
             ▼                               ▼
    [Quota Attainment %]            [Collection Rate %]
             │                               │
             └───────────────┬───────────────┘
                             ▼
              [Collection Gate Check (> 80%)]
              ├── PASSED  ──► Release 2.0% Net Sales Commission
              └── BLOCKED ──► Withhold Commission Until Debt Collected
```

### Key Analytical Features:
- **Team & Representative Quotas:** Real-time progress bars monitoring achievement against branch targets:
  - Cairo Branch: Omar Khaled (650,000 EGP), Nour Hassan (600,000 EGP)
  - Alexandria Branch: Salma Tarek (580,000 EGP), Karim Nabil (540,000 EGP)
  - Mansoura Branch: Mostafa Ibrahim (420,000 EGP), Aya Sherif (400,000 EGP)
- **Collection Gate Enforcement:** Guarantees that sales commissions are unlocked only after a representative hits an audited **80% cash collection threshold**, aligning field incentives with cash flow survival.
- **Dynamic Commission Calculator:** Computes exact 2% Net Sales payouts adjusted for customer returns and credit notes.
- **Audited Ledger Reconciliation:** Matches sales figures against bank deposits and general ledger receipts with 100% mathematical precision.

---

## 🛠️ Technology Stack

- **UI & Analytics:** React 18, TypeScript, Tailwind CSS, Recharts
- **Database Architecture:** PostgreSQL parameterized analytical queries with `NUMERIC(14,2)` precision
- **Component Architecture:** Modular KPI cards, interactive progress meters, and dynamic leaderboards

---

## 🏷️ Recommended Repository Topics
`react`, `typescript`, `recharts`, `sales-performance`, `commission-tracking`, `business-intelligence`, `dashboard`, `internal-controls`, `accounting`

---

## 👨‍💻 Author
**Moaz Awad** — Business Systems Developer  
- Portfolio: [moazawad2002.github.io](https://moazawad2002.github.io/)  
- Email: [moaz14714@gmail.com](mailto:moaz14714@gmail.com)  
- GitHub: [@Moazawad2002](https://github.com/Moazawad2002)
