# Al OFUK — Food Distribution Management System
### Enterprise B2B Web ERP with Supabase PostgreSQL & Row-Level Security (RLS)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Live Demo: Vercel](https://img.shields.io/badge/Live%20Demo-Vercel%20Staging-black?logo=vercel&logoColor=white)](https://al-ofok-food-distribution.vercel.app/)
[![Framework: React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Database: PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%7C%20Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Styling: Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📌 Executive Summary

**Al OFUK Food Distribution Management System** is an enterprise-grade B2B web application engineered specifically for wholesale food and Fast-Moving Consumer Goods (FMCG) distribution in the Egyptian market. 

The system synchronizes field sales representatives, warehouse logistics, purchasing managers, and C-level executive oversight into a secure, single source of operational truth.

---

## ⚠️ The Business Problem

Prior to the system, operations relied on fragmented Excel sheets, paper delivery receipts, and unstructured WhatsApp messages, causing severe operational leaks:
1. **Phantom Stock Sales:** Representatives sold inventory in the field that had already been allocated to other orders, resulting in stockouts and delayed fulfillments.
2. **Gross Margin Erosion:** Sales representatives offered discretionary discounts beyond sustainable profitability thresholds without executive visibility.
3. **Credit Risk & Bad Debts:** Customers placed new orders while exceeding credit limits or carrying overdue invoices beyond allowed payment windows.
4. **Inventory Variance (Stock Drift):** Warehouses lacked an immutable transactional ledger, preventing management from pinpointing causes of stock discrepancies, spoilage, or expiration.

---

## 💡 Architectural Solution & Internal Controls

```
[Field Sales Reps]        [Warehouse Terminals]       [Executive Management]
       │                            │                           │
       └────────────────────┬───────┴───────────────────────────┘
                            ▼
           [React + Vite Frontend (Tailwind UI)]
                            │
               HTTPS / TLS 1.3 Authenticated
                            ▼
          [Supabase PostgreSQL Enterprise Engine]
   ├── Row-Level Security (RLS) Policies (Territory & Role Scoping)
   ├── Real-Time Available Stock Calculation: OnHand - Reserved
   ├── Automated 5% Discount Approval Gate
   ├── Real-Time Customer Credit Exposure Engine
   └── Immutable Double-Entry Ledger: inventory_movements
```

### Core Accounting & Systems Safeguards:
- **Deterministic Stock Gate:** Order entry strictly checks `Available Stock = Physical On-Hand - Reserved Stock`. Transactions are rejected atomically if stock is insufficient.
- **Automated 5% Discount Gate:** Discounts $\le$ 5% are auto-approved; discounts $> 5\%$ automatically flag an Approval Request, freezing order dispatch until authorized by executive management.
- **Customer Credit Exposure Engine:** Evaluates total exposure as `(Outstanding Invoices + Pending Approved Orders)`. If exposure exceeds the customer's credit limit, orders require explicit credit override.
- **Immutable Inventory Ledger:** Every stock change is written to `inventory_movements` with source document, movement reason, batch/lot number, user identity, and timestamp.
- **Row-Level Security (RLS):** Database-level security policies ensure sales representatives only query and record orders within their assigned customer accounts.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, Modern ESModules, Tailwind CSS, Lucide Icons
- **Backend & Cloud:** Supabase, PostgreSQL 16 (Relational schemas, Foreign Keys, Triggers, RLS)
- **Data Validation:** Custom Business Logic Validators (`orderValidator.js`, `inventoryService.js`, `financeService.js`)
- **Testing:** Automated regression suites and live audit verification scripts

---

## 🚀 Quick Start & Local Setup

```bash
# 1. Clone repository
git clone https://github.com/Moazawad2002/al-ofok-food-distribution.git
cd al-ofok-food-distribution

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Add your Supabase project URL and Anon/Service keys

# 4. Start local development server
npm run dev
```

---

## 🏷️ Recommended Repository Topics
`business-systems`, `erp`, `distribution-management`, `fmcg`, `supabase`, `postgresql`, `row-level-security`, `react`, `vite`, `tailwindcss`, `inventory-management`, `internal-controls`

---

## 👨‍💻 Author
**Moaz Awad** — Business Systems Developer  
- Portfolio: [moazawad2002.github.io](https://moazawad2002.github.io/)  
- Email: [moaz14714@gmail.com](mailto:moaz14714@gmail.com)  
- GitHub: [@Moazawad2002](https://github.com/Moazawad2002)
