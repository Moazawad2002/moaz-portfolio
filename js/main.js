/**
 * Moaz Awad — Professional Portfolio Ecosystem Scripts
 * Architecture: Zero-dependency, performant, modular Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initProjectDataAndModals();
  initProjectFilters();
  initContactCopy();
});

/* ==========================================================================
   Project Data Store (Authentic Architectures & Features)
   ========================================================================== */
const PROJECTS_DATA = {
  'al-ofok': {
    title: 'Al OFUK — Food Distribution Management System',
    type: 'Enterprise B2B Web ERP',
    tag: 'Web & Cloud ERP',
    image: 'assets/images/al-ofok-screenshot.png',
    gallery: [
      'assets/images/al-ofok-screenshot.png',
      'assets/screenshots/al-ofok/02-sales-orders-and-invoices.png'
    ],
    logo: 'assets/images/al-ofok-logo.jpg',
    demo: 'https://al-ofok-food-distribution.vercel.app/',
    github: 'https://github.com/Moazawad2002/al-ofok-food-distribution',
    overview: 'Full-stack enterprise distribution management system engineered for high-volume FMCG and food wholesale operations in Egypt.',
    problem: 'The business faced operational bottlenecks from disconnected Excel sheets and WhatsApp orders: field sales representatives frequently sold depleted stock, unauthorized discounts eroded gross margins, and customers accumulated uncontrolled debt beyond credit limits.',
    solution: 'Designed and deployed a unified web application powered by Supabase PostgreSQL with strict Row-Level Security (RLS). Enforces a real-time Available Stock equation (Physical On-Hand - Reserved Stock), an automated 5% discount approval gate, credit limit checking, and an immutable double-entry movement ledger.',
    features: [
      { name: 'Deterministic Stock Reservation', desc: 'Prevents phantom sales by instantly locking inventory when orders are submitted.' },
      { name: 'Automated 5% Discount Gate', desc: 'Discounts exceeding 5% halt the workflow until executive management approves.' },
      { name: 'Credit Exposure Check', desc: 'Real-time calculation of (Unpaid Invoices + Pending Orders) against customer limits.' },
      { name: 'Immutable Movement Ledger', desc: 'Double-entry style audit trail (inventory_movements) eliminating stock drift.' },
      { name: 'Executive Dashboard & Fleet KPIs', desc: 'Live gross margin tracking, collections ratio, and route fulfillment status.' }
    ],
    tech: ['React', 'Vite', 'Tailwind CSS', 'PostgreSQL', 'Supabase RLS', 'REST API', 'Design Tokens'],
    nature: 'Client Business System / Real-World Specification & Staging'
  },
  'al-amal-desktop': {
    title: 'Al Amal Distribution Management System (Desktop ERP)',
    type: 'Enterprise Windows Desktop App',
    tag: 'Desktop Systems',
    image: 'assets/screenshots/al-amal/01-ceo-executive-dashboard.png',
    gallery: [
      'assets/screenshots/al-amal/01-ceo-executive-dashboard.png',
      'assets/screenshots/al-amal/02-rep-route-isolated-dashboard.png',
      'assets/screenshots/al-amal/03-customers-credit-governance.png',
      'assets/screenshots/al-amal/04-products-inventory-catalog.png',
      'assets/screenshots/al-amal/05-sales-invoicing-management.png',
      'assets/screenshots/al-amal/06-reports-and-profit-analytics.png'
    ],
    logo: 'assets/images/al-amal-logo.png',
    demo: 'demos/al-amal-erp/index.html',
    github: 'https://github.com/Moazawad2002/al-amal-desktop',
    overview: 'Native Windows desktop ERP application with dedicated role-based interfaces for executive management and field sales representatives.',
    problem: 'Food distributors require desktop-grade offline reliability, fast transaction entry, and ironclad security ensuring field representatives only see their assigned territory while executives maintain company-wide consolidated auditability.',
    solution: 'Engineered an Electron desktop application powered by React 18 and PostgreSQL Row-Level Security. Reps in North Cairo, Giza, and East Cairo are strictly isolated to their routes, while the CEO dashboard monitors live stock, treasury balances, and expiring batches.',
    features: [
      { name: 'Role-Based Desktop Views', desc: 'Consolidated CEO executive suite vs. isolated field rep order-entry modules.' },
      { name: 'PostgreSQL Row-Level Security', desc: 'Database-level tenant and territory isolation preventing cross-rep data leaks.' },
      { name: 'Warehouse Batch & Expiry Alerts', desc: 'Automatic dispatch warnings for batches with under 30 days remaining shelf life.' },
      { name: 'Cash Treasury & OPEX Tracking', desc: 'Real-time reconciliation of invoice cash collections vs operating expenses.' },
      { name: 'Automated Test Suite', desc: 'Rigorous unit and security tests (auth.test, financial.test, inventory.test).' }
    ],
    tech: ['Electron', 'React 18', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Supabase RLS', 'Lucide Icons'],
    nature: 'Enterprise Desktop Application (Packaged .exe / NSIS)'
  },
  'al-amal-dms': {
    title: 'Google Apps Script Distribution Management System',
    type: 'Cloud-Native Serverless DMS',
    tag: 'Web & Cloud ERP',
    image: 'assets/screenshots/dms/01-gas-engine-architecture.svg',
    gallery: [
      'assets/screenshots/dms/01-gas-engine-architecture.svg',
      'assets/screenshots/dms/02-relational-sheets-schema.svg'
    ],
    logo: 'assets/images/al-amal-logo.png',
    demo: 'https://github.com/Moazawad2002/al-amal-dms',
    demoText: 'View Architecture & Code ↗',
    github: 'https://github.com/Moazawad2002/al-amal-dms',
    overview: 'Zero-infrastructure cloud distribution ERP built directly on Google Workspace, combining Google Sheets as a relational database with modular Apps Script backends.',
    problem: 'SMEs in Egypt often cannot afford expensive ERP recurring licenses or complex cloud hosting, yet require structured financial governance, document generation, and multi-user controls.',
    solution: 'Architected a modular JavaScript suite running on the Google Apps Script V8 engine. Implements session-based user authentication, automated document numbering (INV-YYYY-XXXX, RCP, PO), a 5% discount cap, and an immutable audit log.',
    features: [
      { name: 'Modular Architecture', desc: 'Clean separation of concerns across Config.gs, Auth.gs, Database.gs, and Audit.gs.' },
      { name: 'Automated Document Numbering', desc: 'Standardized sequential ID generation for Invoices, Receipts, POs, and Credit Notes.' },
      { name: 'Concurrency Lock Protection', desc: 'Integrated LockService ensuring multi-user order writes never collide.' },
      { name: 'Immutable Audit Trail', desc: 'Logs user ID, operation type, affected row, timestamp, and financial values.' },
      { name: '100% Zero Hosting Overhead', desc: 'Runs entirely within standard Google Drive / Google Sheets environment.' }
    ],
    tech: ['Google Apps Script (V8)', 'Google Sheets API', 'JavaScript', 'HTML Service', 'Google Drive'],
    nature: 'Serverless Business Management Solution'
  },
  'sales-intelligence': {
    title: 'Premium Sales Intelligence Dashboard – Excel',
    type: 'Executive Business Intelligence & Financial Model',
    tag: 'Analytics & Excel',
    image: 'assets/screenshots/excel/01-executive-dashboard-overview.png',
    gallery: [
      'assets/images/sales-dashboard_excel.gif',
      'assets/screenshots/excel/01-executive-dashboard-overview.png',
      'assets/screenshots/excel/02-kpi-summary-insights.png',
      'assets/screenshots/excel/03-analytical-charts-suite.png',
      'assets/screenshots/excel/04-slicer-drilldown-state.png'
    ],
    demo: 'https://www.fiverr.com/s/VrD0ogx',
    demoText: 'Request a Custom Dashboard ↗',
    github: 'https://github.com/Moazawad2002/premium-sales-intelligence-dashboard',
    overview: 'Advanced Excel analytics engine and dynamic executive dashboard designed for C-level visibility into FMCG distribution performance.',
    problem: 'Executive leaders spent days manually compiling fragmented sales spreadsheets, creating severe lag in identifying margin erosion, lagging product categories, and overdue customer debts.',
    solution: 'Constructed an automated analytics dashboard utilizing Power Query (M) for ETL, dynamic array formulas (XLOOKUP, FILTER, UNIQUE), and interactive slicers. Surfaces real-time margin breakdown, customer concentration, and DSO aging buckets.',
    features: [
      { name: 'Dynamic Period Slicing', desc: 'Instant filtering across multi-year data by Region, Sales Rep, and Product Category.' },
      { name: 'Gross Margin Decomposition', desc: 'Deep-dive analysis separating volume growth from price elasticity and product mix.' },
      { name: 'Pareto 80/20 Analysis', desc: 'Identifies the critical 20% of SKUs and wholesale clients driving 80% of net margin.' },
      { name: 'Receivables Aging Schedule', desc: 'Color-coded aging buckets (Current, 31-60, 61-90, >90) assessing bad debt risk.' },
      { name: 'Automated Data Refresh', desc: 'Power Query automated ingestion that updates all charts in a single click.' }
    ],
    tech: ['Microsoft Excel', 'Power Query (M)', 'DAX & Data Modeling', 'Dynamic Arrays', 'Financial Analytics'],
    nature: 'Personal Project / Business Analytics Case Study'
  },
  'sales-executive': {
    title: 'Sales Executive Performance Dashboard',
    type: 'Operational Quota Tracking & Commission System',
    tag: 'Analytics & Excel',
    image: 'assets/screenshots/sales-executive/02-executive-performance-overview.png',
    gallery: [
      'assets/screenshots/sales-executive/01-multi-branch-login-personas.png',
      'assets/screenshots/sales-executive/02-executive-performance-overview.png',
      'assets/screenshots/sales-executive/03-branch-profitability-leaderboard.png',
      'assets/screenshots/sales-executive/04-monthly-trend-regional-share.png'
    ],
    demo: 'https://moazawad2002.github.io/sales-executive-dashboard/',
    github: 'https://github.com/Moazawad2002/sales-executive-dashboard',
    overview: 'Field sales performance analytics system tracking rep quota attainment against corporate revenue targets (e.g. 3,190,000 EGP monthly targets across 3 regional branches).',
    problem: 'Sales teams often experience friction over commission transparency, uncollected customer invoices, and misaligned incentives between sales volume and cash collection.',
    solution: 'Built an integrated performance dashboard tracking multi-representative achievement, dynamic 2% net sales commissions, and an automated collection enforcement gate requiring >80% cash collection before commission payout.',
    features: [
      { name: 'Target vs. Actual Quota Tracking', desc: 'Real-time progress bars tracking representative achievement against regional targets.' },
      { name: 'Collection Gate Enforcement', desc: 'Protects business cash flow by conditioning commission eligibility on actual cash collected.' },
      { name: 'Representative Leaderboard', desc: 'Objective performance ranking across Cairo, Alexandria, and Mansoura territories.' },
      { name: 'Customer Visit & Velocity Metrics', desc: 'Monitors customer concentration and repeat ordering cadence.' },
      { name: 'Audit Reconciliation Engine', desc: 'Aligns sales figures directly with general ledger banking records.' }
    ],
    tech: ['React', 'TypeScript', 'Recharts', 'PostgreSQL Queries', 'Tailwind CSS', 'Financial Modeling'],
    nature: 'Personal Project / Field Operations Analytics'
  },
  'egypt-erp': {
    title: 'Enterprise Multi-Branch Desktop ERP & Backend',
    type: 'Multi-Branch Architecture & Analytics Engine',
    tag: 'Desktop Systems',
    image: 'assets/screenshots/egypt-erp/01-multi-branch-executive-console.svg',
    gallery: [
      'assets/screenshots/egypt-erp/01-multi-branch-executive-console.svg',
      'assets/screenshots/egypt-erp/02-system-architecture-topology.svg'
    ],
    demo: 'demos/egypt-multi-branch-erp/index.html',
    github: 'https://github.com/Moazawad2002/egypt-distribution-erp',
    overview: 'Full-stack multi-branch ERP system connecting Cairo, Alexandria, and Mansoura operations through authenticated REST APIs and PostgreSQL 16 Enterprise.',
    problem: 'Fast-growing Egyptian distributors with multiple regional branches face data fragmentation, cross-branch data corruption, and financial rounding discrepancies when operations are not strictly scoped at the server level.',
    solution: 'Designed a centralized multi-branch architecture with Express.js and Prisma ORM, enforcing strict server-side branch scoping (403 Forbidden on cross-branch tampering) and NUMERIC(14,2) decimal precision.',
    features: [
      { name: 'Server-Side Branch Scoping', desc: 'Enforces strict geographical isolation across Cairo (CAI), Alex (ALX), and Mansoura (MNS).' },
      { name: 'Financial Precision Engine', desc: 'PostgreSQL NUMERIC(14,2) preventing floating-point rounding errors across all monetary fields.' },
      { name: 'Multi-Branch Comparison', desc: 'Consolidated CEO executive dashboard comparing regional branch P&L, quota hits, and margins.' },
      { name: 'Dockerized Deployment', desc: 'Production-ready docker-compose configuration for database, API, and migration services.' },
      { name: 'Complete SDLC Specifications', desc: 'Exhaustive architecture documents, database schemas, and KPI dictionaries.' }
    ],
    tech: ['PostgreSQL 16 Enterprise', 'Express.js', 'Prisma ORM', 'TypeScript', 'Docker Compose', 'Electron', 'Tailwind CSS'],
    nature: 'Enterprise Architecture / Multi-Branch System'
  }
};

/* ==========================================================================
   Navigation & Mobile Menu
   ========================================================================== */
function initNavigation() {
  const toggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isExpanded = navMenu.classList.contains('open');
      toggle.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Active section scroll spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  });
}

/* ==========================================================================
   Project Filters (Tabs)
   ========================================================================== */
function initProjectFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   Case Study Modal Dialog
   ========================================================================== */
function initProjectDataAndModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalType = document.getElementById('modal-type');
  const modalImage = document.getElementById('modal-image');
  const modalOverview = document.getElementById('modal-overview');
  const modalProblem = document.getElementById('modal-problem');
  const modalSolution = document.getElementById('modal-solution');
  const modalFeaturesList = document.getElementById('modal-features-list');
  const modalTechBadges = document.getElementById('modal-tech-badges');
  const modalGithubLink = document.getElementById('modal-github-link');
  const modalCloseBtn = document.querySelector('.modal-close-btn');

  // Open modal buttons
  const detailButtons = document.querySelectorAll('[data-project-id]');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project-id');
      const data = PROJECTS_DATA[projId];

      if (!data) return;

      modalTitle.textContent = data.title;
      modalType.textContent = data.nature + ' • ' + data.type;
      modalImage.src = data.image;
      modalImage.alt = data.title;

      // Render gallery strip
      const modalGalleryStrip = document.getElementById('modal-gallery-strip');
      if (modalGalleryStrip) {
        modalGalleryStrip.innerHTML = '';
        const gallery = data.gallery || [data.image];
        if (gallery.length > 1) {
          modalGalleryStrip.style.display = 'flex';
          gallery.forEach((imgSrc, idx) => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.className = 'modal-gallery-thumb' + (idx === 0 ? ' active' : '');
            thumb.alt = data.title + ' Screenshot ' + (idx + 1);
            thumb.addEventListener('click', () => {
              modalImage.src = imgSrc;
              modalGalleryStrip.querySelectorAll('.modal-gallery-thumb').forEach(t => t.classList.remove('active'));
              thumb.classList.add('active');
            });
            modalGalleryStrip.appendChild(thumb);
          });
        } else {
          modalGalleryStrip.style.display = 'none';
        }
      }

      modalOverview.textContent = data.overview;
      modalProblem.textContent = data.problem;
      modalSolution.textContent = data.solution;

      // Render features
      modalFeaturesList.innerHTML = '';
      data.features.forEach(f => {
        const box = document.createElement('div');
        box.className = 'modal-feature-box';
        box.innerHTML = `
          <div class="modal-feature-name">✓ ${escapeHtml(f.name)}</div>
          <div class="modal-feature-desc">${escapeHtml(f.desc)}</div>
        `;
        modalFeaturesList.appendChild(box);
      });

      // Render tech badges
      modalTechBadges.innerHTML = '';
      data.tech.forEach(t => {
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = t;
        modalTechBadges.appendChild(badge);
      });

      // Github link
      if (data.github) {
        modalGithubLink.href = data.github;
        modalGithubLink.style.display = 'inline-flex';
      } else {
        modalGithubLink.style.display = 'none';
      }

      // Demo link
      const modalDemoLink = document.getElementById('modal-demo-link');
      if (modalDemoLink) {
        if (data.demo) {
          modalDemoLink.href = data.demo;
          modalDemoLink.textContent = data.demoText || 'Live Demo ↗';
          modalDemoLink.removeAttribute('download');
          modalDemoLink.style.display = 'inline-flex';
        } else {
          modalDemoLink.style.display = 'none';
        }
      }

      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Keyboard escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   Copy to Clipboard Functionality
   ========================================================================== */
function initContactCopy() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalTitle = btn.getAttribute('title') || 'Copy';
          btn.textContent = '✓ Copied!';
          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.setAttribute('title', originalTitle);
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
      }
    });
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
