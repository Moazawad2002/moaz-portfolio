/**
 * Enterprise Multi-Branch ERP - In-Browser Mock API Layer
 * Runs the authentic compiled React 18 application bundle without requiring a local Node.js server.
 * Intercepts window.fetch for http://localhost:4000/api/*
 */
(function() {
  const STORAGE_KEY = 'egypt_erp_mock_db_v2';

  const defaultDb = {
    branches: [
      { id: 'branch-cai-01', code: 'CAI', nameEn: 'Cairo Branch', nameAr: 'فرع القاهرة', address: 'Obour Market Logistics Hub, Cairo', phone: '+20 2 2456 7890', colorCode: '#1E3A8A', isActive: true },
      { id: 'branch-alx-02', code: 'ALX', nameEn: 'Alexandria Branch', nameAr: 'فرع الإسكندرية', address: 'Kababgi Commercial Zone, Smouha, Alexandria', phone: '+20 3 4876 5432', colorCode: '#0D9488', isActive: true },
      { id: 'branch-mns-03', code: 'MNS', nameEn: 'Mansoura Branch', nameAr: 'فرع المنصورة', address: 'Gomhoria Logistics Corridor, Mansoura, Dakahlia', phone: '+20 50 2345 678', colorCode: '#15803D', isActive: true }
    ],
    users: [
      { id: 'user-ceo-01', branchId: null, role: 'CEO', username: 'ceo', email: 'ceo@egypt-distribution.com', fullName: 'Sameh Abdel-Rahman (CEO)', phone: '+20 100 111 2222', isActive: true, permissions: ['*'] },
      { id: 'user-admin-01', branchId: null, role: 'ADMIN', username: 'admin', email: 'admin@egypt-distribution.com', fullName: 'Tarek Zaki (Admin)', phone: '+20 100 333 4444', isActive: true, permissions: ['*'] },
      { id: 'user-mgr-cai-01', branchId: 'branch-cai-01', role: 'BRANCH_MANAGER', username: 'manager.cairo', email: 'cairo.mgr@egypt-distribution.com', fullName: 'Hassan El-Shamy (Cairo Mgr)', phone: '+20 100 444 5555', isActive: true, permissions: ['sales:read', 'sales:write', 'inventory:read', 'finance:read'] },
      { id: 'user-mgr-alx-02', branchId: 'branch-alx-02', role: 'BRANCH_MANAGER', username: 'manager.alex', email: 'alex.mgr@egypt-distribution.com', fullName: 'Ahmed Farouk (Alex Mgr)', phone: '+20 100 555 6666', isActive: true, permissions: ['sales:read', 'sales:write', 'inventory:read', 'finance:read'] },
      { id: 'user-mgr-mns-03', branchId: 'branch-mns-03', role: 'BRANCH_MANAGER', username: 'manager.mansoura', email: 'mansoura.mgr@egypt-distribution.com', fullName: 'Khaled Mansour (Mansoura Mgr)', phone: '+20 100 666 7777', isActive: true, permissions: ['sales:read', 'sales:write', 'inventory:read', 'finance:read'] },
      { id: 'user-acct-01', branchId: null, role: 'ACCOUNTANT', username: 'accountant', email: 'finance@egypt-distribution.com', fullName: 'Mona El-Gammal (Accountant)', phone: '+20 100 777 8888', isActive: true, permissions: ['finance:*', 'sales:read', 'commissions:*'] }
    ],
    salesReps: [
      { id: 'rep-cai-01', branchId: 'branch-cai-01', code: 'REP-CAI-01', name: 'Omar Khaled', branchName: 'فرع القاهرة', phone: '+20 101 234 5678', monthlyTarget: 650000, commissionRate: 0.02, isActive: true },
      { id: 'rep-cai-02', branchId: 'branch-cai-01', code: 'REP-CAI-02', name: 'Youssef Nabil', branchName: 'فرع القاهرة', phone: '+20 102 345 6789', monthlyTarget: 600000, commissionRate: 0.02, isActive: true },
      { id: 'rep-alx-01', branchId: 'branch-alx-02', code: 'REP-ALX-01', name: 'Mahmoud Saeed', branchName: 'فرع الإسكندرية', phone: '+20 103 456 7890', monthlyTarget: 580000, commissionRate: 0.02, isActive: true },
      { id: 'rep-alx-02', branchId: 'branch-alx-02', code: 'REP-ALX-02', name: 'Ibrahim Hamdy', branchName: 'فرع الإسكندرية', phone: '+20 104 567 8901', monthlyTarget: 540000, commissionRate: 0.02, isActive: true },
      { id: 'rep-mns-01', branchId: 'branch-mns-03', code: 'REP-MNS-01', name: 'Amr Mostafa', branchName: 'فرع المنصورة', phone: '+20 105 678 9012', monthlyTarget: 420000, commissionRate: 0.02, isActive: true },
      { id: 'rep-mns-02', branchId: 'branch-mns-03', code: 'REP-MNS-02', name: 'Karim Adel', branchName: 'فرع المنصورة', phone: '+20 106 789 0123', monthlyTarget: 400000, commissionRate: 0.02, isActive: true }
    ],
    customers: [
      { id: 'cust-cai-01', branchId: 'branch-cai-01', salesRepId: 'rep-cai-01', code: 'CUST-CAI-001', name: 'Al-Baraka Supermarkets Group', tradeNameEn: 'Al-Baraka Supermarkets Group', tradeNameAr: 'مجموعة أسواق البركة', taxNumber: '200-456-789', paymentTermsDays: 45, creditLimit: 250000, currentBalance: 88500, address: 'Nasr City, Cairo', phone: '+20 2 2270 1234', isKeyAccount: true, isActive: true },
      { id: 'cust-cai-02', branchId: 'branch-cai-01', salesRepId: 'rep-cai-02', code: 'CUST-CAI-002', name: 'Misr Wholesale Groceries Hub', tradeNameEn: 'Misr Wholesale Groceries Hub', tradeNameAr: 'مركز مصر لتجارة الجملة', taxNumber: '310-567-890', paymentTermsDays: 30, creditLimit: 180000, currentBalance: 51250, address: 'Rod El-Farag, Cairo', phone: '+20 2 2458 9876', isKeyAccount: false, isActive: true },
      { id: 'cust-alx-01', branchId: 'branch-alx-02', salesRepId: 'rep-alx-01', code: 'CUST-ALX-001', name: 'Al-Mansheya Trading Company', tradeNameEn: 'Al-Mansheya Trading Company', tradeNameAr: 'شركة المنشية التجارية', taxNumber: '420-678-901', paymentTermsDays: 60, creditLimit: 300000, currentBalance: 90650, address: 'Al-Mansheya Commercial District, Alexandria', phone: '+20 3 4850 1122', isKeyAccount: true, isActive: true },
      { id: 'cust-alx-02', branchId: 'branch-alx-02', salesRepId: 'rep-alx-02', code: 'CUST-ALX-002', name: 'Smouha Gourmet Hypermarket', tradeNameEn: 'Smouha Gourmet Hypermarket', tradeNameAr: 'هايبر ماركت سموحة', taxNumber: '530-789-012', paymentTermsDays: 30, creditLimit: 150000, currentBalance: 53700, address: 'Victor Emmanuel Sq, Smouha, Alexandria', phone: '+20 3 4290 3344', isKeyAccount: false, isActive: true },
      { id: 'cust-mns-01', branchId: 'branch-mns-03', salesRepId: 'rep-mns-01', code: 'CUST-MNS-001', name: 'Delta FMCG Wholesale Syndicate', tradeNameEn: 'Delta FMCG Wholesale Syndicate', tradeNameAr: 'نقابة تجار الدلتا للمواد الغذائية', taxNumber: '640-890-123', paymentTermsDays: 45, creditLimit: 200000, currentBalance: 42300, address: 'Toriel Commercial St, Mansoura', phone: '+20 50 2240 5566', isKeyAccount: true, isActive: true },
      { id: 'cust-mns-02', branchId: 'branch-mns-03', salesRepId: 'rep-mns-02', code: 'CUST-MNS-002', name: 'Al-Gomhoria Food Marts', tradeNameEn: 'Al-Gomhoria Food Marts', tradeNameAr: 'سلسلة أسواق الجمهورية', taxNumber: '750-901-234', paymentTermsDays: 30, creditLimit: 120000, currentBalance: 30400, address: 'Gomhoria Street, Mansoura', phone: '+20 50 2310 7788', isKeyAccount: false, isActive: true }
    ],
    products: [
      { id: 'prod-oil-01', sku: 'OIL-CRN-08L', nameEn: 'Crystal Pure Corn Oil 0.8L (Carton 12)', nameAr: 'زيت ذرة كريستال أنقى 0.8 لتر (كرتونة 12)', brand: 'Crystal', category: 'Cooking Oils', unitOfMeasure: 'Carton', itemsPerCarton: 12, costPrice: 780, sellingPrice: 890, minimumSellingPrice: 850, defaultTaxRate: 0.14, reorderPoint: 150, currentStock: 180, inventoryValuation: 140400, isLowStock: false, quantitySold: 420, netRevenue: 373800, cogs: 327600, grossProfit: 46200, grossProfitMargin: 12.36, isActive: true },
      { id: 'prod-oil-02', sku: 'OIL-SNF-16L', nameEn: 'Crystal Sunflower Oil 1.6L (Carton 6)', nameAr: 'زيت عباد شمس كريستال 1.6 لتر (كرتونة 6)', brand: 'Crystal', category: 'Cooking Oils', unitOfMeasure: 'Carton', itemsPerCarton: 6, costPrice: 620, sellingPrice: 710, minimumSellingPrice: 675, defaultTaxRate: 0.14, reorderPoint: 120, currentStock: 180, inventoryValuation: 111600, isLowStock: false, quantitySold: 310, netRevenue: 220100, cogs: 192200, grossProfit: 27900, grossProfitMargin: 12.68, isActive: true },
      { id: 'prod-rice-01', sku: 'RCE-DHA-05K', nameEn: 'Al Doha Premium Egyptian Rice 5kg (Pack 4)', nameAr: 'أرز الضحى فاخر مصري 5 كجم (بالتة 4)', brand: 'Al Doha', category: 'Grains & Pulses', unitOfMeasure: 'Pack', itemsPerCarton: 4, costPrice: 660, sellingPrice: 760, minimumSellingPrice: 720, defaultTaxRate: 0.00, reorderPoint: 200, currentStock: 180, inventoryValuation: 118800, isLowStock: true, quantitySold: 280, netRevenue: 212800, cogs: 184800, grossProfit: 28000, grossProfitMargin: 13.16, isActive: true },
      { id: 'prod-pst-01', sku: 'PST-MLK-400G', nameEn: 'El Maleka Penne Pasta 400g (Carton 20)', nameAr: 'مكرونة الملكة قلم 400 جم (كرتونة 20)', brand: 'El Maleka', category: 'Pasta', unitOfMeasure: 'Carton', itemsPerCarton: 20, costPrice: 240, sellingPrice: 285, minimumSellingPrice: 265, defaultTaxRate: 0.14, reorderPoint: 300, currentStock: 180, inventoryValuation: 43200, isLowStock: true, quantitySold: 550, netRevenue: 156750, cogs: 132000, grossProfit: 24750, grossProfitMargin: 15.79, isActive: true },
      { id: 'prod-sgr-01', sku: 'SGR-WHT-01K', nameEn: 'Hawamdia Refined White Sugar 1kg (Sack 10)', nameAr: 'سكر أبيض نقي الحوامدية 1 كجم (رابطة 10)', brand: 'Hawamdia', category: 'Sugar & Sweeteners', unitOfMeasure: 'Sack', itemsPerCarton: 10, costPrice: 320, sellingPrice: 370, minimumSellingPrice: 350, defaultTaxRate: 0.00, reorderPoint: 250, currentStock: 180, inventoryValuation: 57600, isLowStock: true, quantitySold: 390, netRevenue: 144300, cogs: 124800, grossProfit: 19500, grossProfitMargin: 13.51, isActive: true },
      { id: 'prod-det-01', sku: 'DET-OXI-04K', nameEn: 'Oxi Automatic Powder Detergent 4kg (Pack 4)', nameAr: 'مسحوق غسيل أوتوماتيك أوكسي 4 كجم (كرتونة 4)', brand: 'Oxi', category: 'Home Care', unitOfMeasure: 'Pack', itemsPerCarton: 4, costPrice: 710, sellingPrice: 830, minimumSellingPrice: 790, defaultTaxRate: 0.14, reorderPoint: 100, currentStock: 180, inventoryValuation: 127800, isLowStock: false, quantitySold: 190, netRevenue: 157700, cogs: 134900, grossProfit: 22800, grossProfitMargin: 14.46, isActive: true },
      { id: 'prod-det-02', sku: 'DET-FRY-650M', nameEn: 'Fairy Lemon Dishwashing Liquid 650ml (Carton 16)', nameAr: 'سائل غسيل أطباق فيري ليمون 650 مل (كرتونة 16)', brand: 'Fairy', category: 'Home Care', unitOfMeasure: 'Carton', itemsPerCarton: 16, costPrice: 640, sellingPrice: 745, minimumSellingPrice: 700, defaultTaxRate: 0.14, reorderPoint: 180, currentStock: 180, inventoryValuation: 115200, isLowStock: false, quantitySold: 210, netRevenue: 156450, cogs: 134400, grossProfit: 22050, grossProfitMargin: 14.09, isActive: true }
    ],
    invoices: [
      { id: 'inv-cai-01', invoiceNumber: 'INV-CAI-2026-0001', branchId: 'branch-cai-01', branchName: 'Cairo Branch (القاهرة)', customerId: 'cust-cai-01', customerName: 'Al-Baraka Supermarkets Group', salesRepresentativeId: 'rep-cai-01', repName: 'Omar Khaled', invoiceDate: '2026-10-01', dueDate: '2026-11-15', status: 'ISSUED', grossAmount: 185000, discountAmount: 5500, netAmount: 179500, taxAmount: 23450, totalAmount: 202950, paidAmount: 120000, balanceDue: 82950, cogsAmount: 154500, paymentStatus: 'PARTIAL', notes: 'Monthly distribution cycle - Delivery confirmation receipt #8812', lines: [] },
      { id: 'inv-cai-02', invoiceNumber: 'INV-CAI-2026-0002', branchId: 'branch-cai-01', branchName: 'Cairo Branch (القاهرة)', customerId: 'cust-cai-02', customerName: 'Misr Wholesale Groceries Hub', salesRepresentativeId: 'rep-cai-02', repName: 'Youssef Nabil', invoiceDate: '2026-10-03', dueDate: '2026-11-02', status: 'ISSUED', grossAmount: 125000, discountAmount: 3750, netAmount: 121250, taxAmount: 15850, totalAmount: 137100, paidAmount: 80000, balanceDue: 57100, cogsAmount: 104200, paymentStatus: 'PARTIAL', notes: 'Grains & Cooking oil bulk order', lines: [] },
      { id: 'inv-cai-03', invoiceNumber: 'INV-CAI-2026-0003', branchId: 'branch-cai-01', branchName: 'Cairo Branch (القاهرة)', customerId: 'cust-cai-01', customerName: 'Al-Baraka Supermarkets Group', salesRepresentativeId: 'rep-cai-01', repName: 'Omar Khaled', invoiceDate: '2026-10-06', dueDate: '2026-11-20', status: 'ISSUED', grossAmount: 210000, discountAmount: 5800, netAmount: 204200, taxAmount: 26600, totalAmount: 230800, paidAmount: 0, balanceDue: 230800, cogsAmount: 174400, paymentStatus: 'UNPAID', notes: 'Promotional bundle shipment - Pasta & Detergents', lines: [] },
      { id: 'inv-alx-01', invoiceNumber: 'INV-ALX-2026-0001', branchId: 'branch-alx-02', branchName: 'Alexandria Branch (الإسكندرية)', customerId: 'cust-alx-01', customerName: 'Al-Mansheya Trading Company', salesRepresentativeId: 'rep-alx-01', repName: 'Mahmoud Saeed', invoiceDate: '2026-10-02', dueDate: '2026-12-01', status: 'ISSUED', grossAmount: 195000, discountAmount: 5850, netAmount: 189150, taxAmount: 24700, totalAmount: 213850, paidAmount: 100000, balanceDue: 113850, cogsAmount: 160200, paymentStatus: 'PARTIAL', notes: 'Quarterly agreement batch 1', lines: [] },
      { id: 'inv-alx-02', invoiceNumber: 'INV-ALX-2026-0002', branchId: 'branch-alx-02', branchName: 'Alexandria Branch (الإسكندرية)', customerId: 'cust-alx-02', customerName: 'Smouha Gourmet Hypermarket', salesRepresentativeId: 'rep-alx-02', repName: 'Ibrahim Hamdy', invoiceDate: '2026-10-05', dueDate: '2026-11-04', status: 'ISSUED', grossAmount: 160000, discountAmount: 4800, netAmount: 155200, taxAmount: 20200, totalAmount: 175400, paidAmount: 50000, balanceDue: 125400, cogsAmount: 131300, paymentStatus: 'PARTIAL', notes: 'Hypermarket weekend promotions replenishment', lines: [] },
      { id: 'inv-mns-01', invoiceNumber: 'INV-MNS-2026-0001', branchId: 'branch-mns-03', branchName: 'Mansoura Branch (المنصورة)', customerId: 'cust-mns-01', customerName: 'Delta FMCG Wholesale Syndicate', salesRepresentativeId: 'rep-mns-01', repName: 'Amr Mostafa', invoiceDate: '2026-10-02', dueDate: '2026-11-16', status: 'ISSUED', grossAmount: 150000, discountAmount: 3000, netAmount: 147000, taxAmount: 19200, totalAmount: 166200, paidAmount: 110000, balanceDue: 56200, cogsAmount: 125000, paymentStatus: 'PARTIAL', notes: 'Syndicate consolidated requisition', lines: [] },
      { id: 'inv-mns-02', invoiceNumber: 'INV-MNS-2026-0002', branchId: 'branch-mns-03', branchName: 'Mansoura Branch (المنصورة)', customerId: 'cust-mns-02', customerName: 'Al-Gomhoria Food Marts', salesRepresentativeId: 'rep-mns-02', repName: 'Karim Adel', invoiceDate: '2026-10-07', dueDate: '2026-11-06', status: 'ISSUED', grossAmount: 125000, discountAmount: 2500, netAmount: 122500, taxAmount: 16000, totalAmount: 138500, paidAmount: 70000, balanceDue: 68500, cogsAmount: 104200, paymentStatus: 'PARTIAL', notes: 'Supermarket chain routine supply', lines: [] }
    ],
    movements: [
      { id: 'mov-01', warehouseId: 'wh-cai-01', productId: 'prod-oil-01', productName: 'Crystal Pure Corn Oil 0.8L (زيت كريستال ذرة)', sku: 'OIL-CRN-08L', movementType: 'SALES_DISPATCH', referenceId: 'INV-CAI-2026-0001', quantityChange: -200, unitCost: 780, totalCost: 156000, balanceAfter: 180, timestamp: '2026-10-01T10:00:00Z' },
      { id: 'mov-02', warehouseId: 'wh-cai-01', productId: 'prod-oil-01', productName: 'Crystal Pure Corn Oil 0.8L (زيت كريستال ذرة)', sku: 'OIL-CRN-08L', movementType: 'RETURN_INWARD', referenceId: 'RET-CAI-2026-0001', quantityChange: 5, unitCost: 780, totalCost: 3900, balanceAfter: 185, timestamp: '2026-10-04T12:00:00Z' },
      { id: 'mov-03', warehouseId: 'wh-alx-02', productId: 'prod-rice-01', productName: 'Al Doha Premium Egyptian Rice 5kg (أرز الضحى)', sku: 'RCE-DHA-05K', movementType: 'SALES_DISPATCH', referenceId: 'INV-ALX-2026-0001', quantityChange: -150, unitCost: 660, totalCost: 99000, balanceAfter: 180, timestamp: '2026-10-02T11:00:00Z' },
      { id: 'mov-04', warehouseId: 'wh-mns-03', productId: 'prod-pst-01', productName: 'El Maleka Penne Pasta 400g (مكرونة الملكة)', sku: 'PST-MLK-400G', movementType: 'SALES_DISPATCH', referenceId: 'INV-MNS-2026-0001', quantityChange: -300, unitCost: 240, totalCost: 72000, balanceAfter: 180, timestamp: '2026-10-02T14:30:00Z' }
    ],
    expenses: [
      { id: 'exp-cai-01', branchId: 'branch-cai-01', branchName: 'فرع القاهرة', categoryId: 'cat-transport', categoryName: 'Transportation & Fleet Fuel (وقود ومحروقات الأسطول)', amount: 14500, expenseDate: '2026-10-05', recipientOrVendor: 'Misr Petroleum Fleet Fueling', paymentMethod: 'BANK_TRANSFER', notes: 'Fleet diesel fueling - Cairo distribution vans (Oct 1-5)', isOperatingExpense: true },
      { id: 'exp-cai-02', branchId: 'branch-cai-01', branchName: 'فرع القاهرة', categoryId: 'cat-rent', categoryName: 'Warehouse Rent (إيجار مستودع العبور)', amount: 35000, expenseDate: '2026-10-01', recipientOrVendor: 'Obour Logistics Real Estate Co.', paymentMethod: 'BANK_TRANSFER', notes: 'October warehouse rent & refrigeration power allocation', isOperatingExpense: true },
      { id: 'exp-alx-01', branchId: 'branch-alx-02', branchName: 'فرع الإسكندرية', categoryId: 'cat-transport', categoryName: 'Transportation & Fleet Fuel (وقود أسطول الإسكندرية)', amount: 12200, expenseDate: '2026-10-06', recipientOrVendor: 'Gemsa Oil & Fuel Service', paymentMethod: 'BANK_TRANSFER', notes: 'Alexandria coastal route van fleet fuel', isOperatingExpense: true },
      { id: 'exp-alx-02', branchId: 'branch-alx-02', branchName: 'فرع الإسكندرية', categoryId: 'cat-rent', categoryName: 'Warehouse Rent (إيجار مستودع سموحة)', amount: 28000, expenseDate: '2026-10-01', recipientOrVendor: 'Smouha Commercial Logistics Park', paymentMethod: 'BANK_TRANSFER', notes: 'Smouha warehouse facility lease for October', isOperatingExpense: true },
      { id: 'exp-mns-01', branchId: 'branch-mns-03', branchName: 'فرع المنصورة', categoryId: 'cat-transport', categoryName: 'Transportation & Fleet Fuel (محروقات شاحنات الدلتا)', amount: 9800, expenseDate: '2026-10-07', recipientOrVendor: 'Delta Energy Station', paymentMethod: 'BANK_TRANSFER', notes: 'Mansoura rural delivery trucks fuel allowance', isOperatingExpense: true },
      { id: 'exp-mns-02', branchId: 'branch-mns-03', branchName: 'فرع المنصورة', categoryId: 'cat-rent', categoryName: 'Warehouse Rent (إيجار depot المنصورة)', amount: 19000, expenseDate: '2026-10-01', recipientOrVendor: 'Dakahlia Warehousing Trust', paymentMethod: 'BANK_TRANSFER', notes: 'Mansoura central depot rent for October', isOperatingExpense: true }
    ],
    payments: [
      { id: 'pay-cai-01', receiptNumber: 'RCP-CAI-2026-0001', branchId: 'branch-cai-01', branchName: 'فرع القاهرة', customerId: 'cust-cai-01', customerName: 'Al-Baraka Supermarkets Group', invoiceId: 'inv-cai-01', paymentDate: '2026-10-04', amount: 120000, paymentMethod: 'BANK_TRANSFER', referenceNumber: 'NBE-TRF-99014', notes: 'Direct bank transfer via National Bank of Egypt' },
      { id: 'pay-cai-02', receiptNumber: 'RCP-CAI-2026-0002', branchId: 'branch-cai-01', branchName: 'فرع القاهرة', customerId: 'cust-cai-02', customerName: 'Misr Wholesale Groceries Hub', invoiceId: 'inv-cai-02', paymentDate: '2026-10-06', amount: 80000, paymentMethod: 'CHEQUE', referenceNumber: 'CIB-CHQ-44512', notes: 'Commercial International Bank current check' },
      { id: 'pay-alx-01', receiptNumber: 'RCP-ALX-2026-0001', branchId: 'branch-alx-02', branchName: 'فرع الإسكندرية', customerId: 'cust-alx-01', customerName: 'Al-Mansheya Trading Company', invoiceId: 'inv-alx-01', paymentDate: '2026-10-05', amount: 100000, paymentMethod: 'BANK_TRANSFER', referenceNumber: 'QNB-TRF-77123', notes: 'QNB corporate portal payment' },
      { id: 'pay-alx-02', receiptNumber: 'RCP-ALX-2026-0002', branchId: 'branch-alx-02', branchName: 'فرع الإسكندرية', customerId: 'cust-alx-02', customerName: 'Smouha Gourmet Hypermarket', invoiceId: 'inv-alx-02', paymentDate: '2026-10-08', amount: 50000, paymentMethod: 'CASH', referenceNumber: 'CASH-REC-1120', notes: 'Cash receipt signed by Alex branch cashier' },
      { id: 'pay-mns-01', receiptNumber: 'RCP-MNS-2026-0001', branchId: 'branch-mns-03', branchName: 'فرع المنصورة', customerId: 'cust-mns-01', customerName: 'Delta FMCG Wholesale Syndicate', invoiceId: 'inv-mns-01', paymentDate: '2026-10-05', amount: 110000, paymentMethod: 'BANK_TRANSFER', referenceNumber: 'BDC-TRF-33214', notes: 'Banque Du Caire transfer confirmation' },
      { id: 'pay-mns-02', receiptNumber: 'RCP-MNS-2026-0002', branchId: 'branch-mns-03', branchName: 'فرع المنصورة', customerId: 'cust-mns-02', customerName: 'Al-Gomhoria Food Marts', invoiceId: 'inv-mns-02', paymentDate: '2026-10-08', amount: 70000, paymentMethod: 'CHEQUE', referenceNumber: 'BM-CHQ-88910', notes: 'Banque Misr certified check' }
    ],
    commissions: [
      { id: 'comm-01', salesRepresentativeId: 'rep-cai-01', salesRepName: 'Omar Khaled', branchId: 'branch-cai-01', branchName: 'فرع القاهرة', periodYear: 2026, periodMonth: 10, policyCode: 'POLICY_NET_AFTER_RETURNS', eligibleBaseAmount: 383700, appliedRate: 0.02, calculatedCommission: 7674, recordedCommission: 7975, discrepancyAmount: -301, status: 'APPROVED', notes: 'Settlement reconciled against unadjusted discount deduction' },
      { id: 'comm-02', salesRepresentativeId: 'rep-cai-02', salesRepName: 'Youssef Nabil', branchId: 'branch-cai-01', branchName: 'فرع القاهرة', periodYear: 2026, periodMonth: 10, policyCode: 'POLICY_NET_AFTER_RETURNS', eligibleBaseAmount: 121250, appliedRate: 0.02, calculatedCommission: 2425, recordedCommission: 2425, discrepancyAmount: 0, status: 'DRAFT', notes: 'Routine distribution tier' },
      { id: 'comm-03', salesRepresentativeId: 'rep-alx-01', salesRepName: 'Mahmoud Saeed', branchId: 'branch-alx-02', branchName: 'فرع الإسكندرية', periodYear: 2026, periodMonth: 10, policyCode: 'POLICY_NET_AFTER_RETURNS', eligibleBaseAmount: 189150, appliedRate: 0.02, calculatedCommission: 3783, recordedCommission: 3783, discrepancyAmount: 0, status: 'APPROVED', notes: 'Reconciled' },
      { id: 'comm-04', salesRepresentativeId: 'rep-alx-02', salesRepName: 'Ibrahim Hamdy', branchId: 'branch-alx-02', branchName: 'فرع الإسكندرية', periodYear: 2026, periodMonth: 10, policyCode: 'POLICY_NET_AFTER_RETURNS', eligibleBaseAmount: 155200, appliedRate: 0.02, calculatedCommission: 3104, recordedCommission: 3104, discrepancyAmount: 0, status: 'APPROVED', notes: 'Reconciled' },
      { id: 'comm-05', salesRepresentativeId: 'rep-mns-01', salesRepName: 'Amr Mostafa', branchId: 'branch-mns-03', branchName: 'فرع المنصورة', periodYear: 2026, periodMonth: 10, policyCode: 'POLICY_NET_AFTER_RETURNS', eligibleBaseAmount: 147000, appliedRate: 0.02, calculatedCommission: 2940, recordedCommission: 2940, discrepancyAmount: 0, status: 'APPROVED', notes: 'Reconciled' },
      { id: 'comm-06', salesRepresentativeId: 'rep-mns-02', salesRepName: 'Karim Adel', branchId: 'branch-mns-03', branchName: 'فرع المنصورة', periodYear: 2026, periodMonth: 10, policyCode: 'POLICY_NET_AFTER_RETURNS', eligibleBaseAmount: 122500, appliedRate: 0.02, calculatedCommission: 2450, recordedCommission: 2450, discrepancyAmount: 0, status: 'APPROVED', notes: 'Reconciled' }
    ],
    auditLogs: [
      { id: 'log-01', timestamp: '2026-10-08T14:22:10Z', userId: 'user-mgr-cai-01', username: 'manager.cairo', branchId: 'branch-cai-01', action: 'APPROVE_COMMISSION', entityName: 'COMMISSION_SETTLEMENT', entityId: 'comm-01', details: 'Approved October rep commission for Omar Khaled (7,674 EGP)', ipAddress: '192.168.1.104' },
      { id: 'log-02', timestamp: '2026-10-07T11:45:33Z', userId: 'user-mgr-mns-03', username: 'manager.mansoura', branchId: 'branch-mns-03', action: 'CREATE_INVOICE', entityName: 'SALES_INVOICE', entityId: 'inv-mns-02', details: 'Created distribution invoice INV-MNS-2026-0002 for Al-Gomhoria Food Marts (138,500 EGP)', ipAddress: '192.168.3.12' },
      { id: 'log-03', timestamp: '2026-10-07T09:15:20Z', userId: 'user-mgr-alx-02', username: 'manager.alex', branchId: 'branch-alx-02', action: 'APPROVE_RETURN', entityName: 'STOCK_RETURN', entityId: 'ret-alx-01', details: 'Approved near-expiry stock return for Al-Mansheya Trading (3,200 EGP)', ipAddress: '192.168.2.45' },
      { id: 'log-04', timestamp: '2026-10-06T16:05:12Z', userId: 'user-ceo-01', username: 'ceo', branchId: null, action: 'EXPORT_REPORT', entityName: 'EXECUTIVE_ANALYTICS', entityId: 'ceo-overview', details: 'Exported consolidated C-suite performance report across all 3 regional branches', ipAddress: '10.0.0.1' }
    ]
  };

  function getDb() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch(e) {}
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDb));
    return defaultDb;
  }

  function saveDb(db) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch(e) {}
  }

  // Intercept fetch
  const originalFetch = window.fetch;
  window.fetch = async function(input, init) {
    let url = typeof input === 'string' ? input : (input && input.url ? input.url : '');

    if (url.includes('localhost:4000/api') || url.startsWith('/api') || url.includes('/api/')) {
      const urlObj = new URL(url, window.location.origin);
      const path = urlObj.pathname.replace(/^.*\/api/, '');
      const method = (init && init.method ? init.method : 'GET').toUpperCase();
      const body = init && init.body ? (typeof init.body === 'string' ? JSON.parse(init.body) : init.body) : {};
      const params = urlObj.searchParams;
      const branchIdParam = params.get('branchId');

      const db = getDb();

      function jsonResponse(data, status = 200) {
        return new Response(JSON.stringify({ success: status < 400, data: data }), {
          status: status,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 1. Auth routes
      if (path === '/auth/login' && method === 'POST') {
        const u = db.users.find(x => x.username.toLowerCase() === (body.username || '').toLowerCase());
        const userObj = u || db.users[0];
        const token = 'mock-jwt-token-' + userObj.username;
        return jsonResponse({ token: token, user: userObj });
      }

      if (path === '/auth/me') {
        const token = localStorage.getItem('erp_token') || '';
        const username = token.replace('mock-jwt-token-', '');
        const userObj = db.users.find(x => x.username === username) || db.users[0];
        return jsonResponse(userObj);
      }

      // 2. Org routes
      if (path === '/org/branches') {
        return jsonResponse(db.branches);
      }
      if (path === '/org/sales-reps') {
        let list = db.salesReps;
        if (branchIdParam) list = list.filter(r => r.branchId === branchIdParam);
        return jsonResponse(list);
      }
      if (path === '/org/customers') {
        let list = db.customers;
        if (branchIdParam) list = list.filter(c => c.branchId === branchIdParam);
        return jsonResponse(list);
      }

      // 3. Sales routes
      if (path === '/sales/invoices') {
        if (method === 'POST') {
          const b = db.branches.find(x => x.id === (body.branchId || 'branch-cai-01')) || db.branches[0];
          const c = db.customers.find(x => x.id === body.customerId) || db.customers[0];
          const r = db.salesReps.find(x => x.id === (body.salesRepresentativeId || body.salesRepId)) || db.salesReps[0];

          let gross = 0;
          let net = 0;
          let tax = 0;
          let disc = 0;

          if (body.lines && body.lines.length > 0) {
            body.lines.forEach(l => {
              const lineGross = (l.quantity || 1) * (l.unitPrice || 0);
              const lineDisc = lineGross * ((l.discountPercent || 0) / 100);
              gross += lineGross;
              disc += lineDisc;
            });
            net = gross - disc;
            tax = net * 0.14;
          } else {
            gross = Number(body.grossAmount || 50000);
            disc = Number(body.discountAmount || 0);
            net = gross - disc;
            tax = net * 0.14;
          }

          const newInv = {
            id: 'inv-gen-' + Date.now(),
            invoiceNumber: 'INV-' + b.code + '-2026-' + Math.floor(1000 + Math.random() * 9000),
            branchId: b.id,
            branchName: b.nameEn + ' (' + b.nameAr + ')',
            customerId: c.id,
            customerName: c.name,
            salesRepresentativeId: r.id,
            repName: r.name,
            invoiceDate: new Date().toISOString().split('T')[0],
            dueDate: body.dueDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
            status: 'ISSUED',
            grossAmount: gross,
            discountAmount: disc,
            netAmount: net,
            taxAmount: tax,
            totalAmount: net + tax,
            paidAmount: 0,
            balanceDue: net + tax,
            cogsAmount: Math.round(gross * 0.82),
            paymentStatus: 'UNPAID',
            notes: body.notes || 'In-browser interactive distribution order',
            lines: body.lines || []
          };
          db.invoices.unshift(newInv);

          // Add corresponding movement
          db.movements.unshift({
            id: 'mov-gen-' + Date.now(),
            warehouseId: 'wh-' + b.code.toLowerCase() + '-01',
            productId: body.lines?.[0]?.productId || 'prod-oil-01',
            productName: 'Commercial Dispatch (' + (b.code) + ')',
            sku: 'DISP-' + (b.code),
            movementType: 'SALES_DISPATCH',
            referenceId: newInv.invoiceNumber,
            quantityChange: -(body.lines?.[0]?.quantity || 10),
            unitCost: 780,
            totalCost: (body.lines?.[0]?.quantity || 10) * 780,
            balanceAfter: 170,
            timestamp: new Date().toISOString()
          });

          // Add audit log
          db.auditLogs.unshift({
            id: 'log-gen-' + Date.now(),
            timestamp: new Date().toISOString(),
            userId: 'user-ceo-01',
            username: 'ceo',
            branchId: b.id,
            action: 'CREATE_INVOICE',
            entityName: 'SALES_INVOICE',
            entityId: newInv.id,
            details: 'Issued distribution invoice ' + newInv.invoiceNumber + ' for ' + c.name + ' (' + Math.round(net + tax).toLocaleString() + ' EGP)',
            ipAddress: '127.0.0.1'
          });

          saveDb(db);
          return jsonResponse(newInv, 201);
        }

        let list = db.invoices;
        if (branchIdParam) list = list.filter(i => i.branchId === branchIdParam);
        return jsonResponse(list);
      }

      if (path.startsWith('/sales/invoices/')) {
        const id = path.replace('/sales/invoices/', '');
        const inv = db.invoices.find(i => i.id === id) || db.invoices[0];
        return jsonResponse(inv);
      }

      if (path === '/sales/returns') {
        return jsonResponse([
          { id: 'ret-01', returnNumber: 'RET-CAI-2026-0001', branchId: 'branch-cai-01', customerId: 'cust-cai-01', customerName: 'Al-Baraka Supermarkets', totalAmount: 4800, returnReason: 'DEFECTIVE_PRODUCT', stockDisposition: 'RETURN_TO_STOCK', status: 'APPROVED', returnDate: '2026-10-04' },
          { id: 'ret-02', returnNumber: 'RET-ALX-2026-0001', branchId: 'branch-alx-02', customerId: 'cust-alx-01', customerName: 'Al-Mansheya Trading', totalAmount: 3200, returnReason: 'NEAR_EXPIRY', stockDisposition: 'RETURN_TO_STOCK', status: 'APPROVED', returnDate: '2026-10-07' }
        ]);
      }

      // 4. Inventory routes
      if (path === '/inventory/products') {
        return jsonResponse(db.products);
      }
      if (path === '/inventory/movements') {
        return jsonResponse(db.movements);
      }
      if (path === '/inventory/summary') {
        const totalValuation = db.products.reduce((acc, p) => acc + (p.currentStock * p.costPrice), 0);
        return jsonResponse({
          totalValuation,
          totalSkus: db.products.length,
          lowStockCount: db.products.filter(p => p.isLowStock).length,
          outOfStockCount: 0,
          branchesCount: 3
        });
      }

      // 5. Finance routes
      if (path === '/finance/aging') {
        let totalReceivables = 0;
        let totalOverdue = 0;
        const agingInvoices = db.invoices.map(inv => {
          totalReceivables += (inv.balanceDue || 0);
          const daysOverdue = inv.paymentStatus === 'PAID' ? 0 : 25;
          if (daysOverdue > 0) totalOverdue += (inv.balanceDue || 0);
          return {
            id: inv.id,
            invoiceNumber: inv.invoiceNumber,
            customerName: inv.customerName,
            branchName: inv.branchName,
            dueDate: inv.dueDate,
            daysOverdue: daysOverdue,
            agingBucket: '1 - 30 يوماً',
            balanceDue: inv.balanceDue
          };
        });

        return jsonResponse({
          summary: {
            current: 178500,
            days1To30: 98400,
            days31To60: 51250,
            days61To90: 18000,
            over90: 10650,
            totalReceivables: totalReceivables || 356800,
            totalOverdue: totalOverdue || 178300,
            overdueRatio: 49.9
          },
          invoices: agingInvoices
        });
      }

      if (path === '/finance/payments') {
        if (method === 'POST') {
          const c = db.customers.find(x => x.id === body.customerId) || db.customers[0];
          const b = db.branches.find(x => x.id === (body.branchId || c.branchId)) || db.branches[0];
          const payAmount = Number(body.amount || 10000);

          const newPay = {
            id: 'pay-gen-' + Date.now(),
            receiptNumber: 'RCP-' + b.code + '-2026-' + Math.floor(1000 + Math.random() * 9000),
            branchId: b.id,
            branchName: b.nameEn + ' (' + b.nameAr + ')',
            customerId: c.id,
            customerName: c.name,
            invoiceId: body.allocations?.[0]?.salesInvoiceId || 'inv-cai-01',
            paymentDate: new Date().toISOString().split('T')[0],
            amount: payAmount,
            paymentMethod: body.paymentMethod || 'BANK_TRANSFER',
            referenceNumber: body.referenceNumber || ('REF-' + Date.now().toString().slice(-6)),
            notes: 'Interactive payment posted in demo'
          };
          db.payments.unshift(newPay);

          // Update invoice balance
          if (body.allocations?.[0]?.salesInvoiceId) {
            const matchedInv = db.invoices.find(i => i.id === body.allocations[0].salesInvoiceId);
            if (matchedInv) {
              matchedInv.paidAmount += payAmount;
              matchedInv.balanceDue = Math.max(0, matchedInv.balanceDue - payAmount);
              matchedInv.paymentStatus = matchedInv.balanceDue <= 0 ? 'PAID' : 'PARTIAL';
            }
          }

          db.auditLogs.unshift({
            id: 'log-gen-' + Date.now(),
            timestamp: new Date().toISOString(),
            userId: 'user-ceo-01',
            username: 'ceo',
            branchId: b.id,
            action: 'RECORD_PAYMENT',
            entityName: 'CUSTOMER_PAYMENT',
            entityId: newPay.id,
            details: 'Recorded customer collection ' + newPay.receiptNumber + ' for ' + c.name + ' (' + payAmount.toLocaleString() + ' EGP)',
            ipAddress: '127.0.0.1'
          });

          saveDb(db);
          return jsonResponse(newPay, 201);
        }

        let list = db.payments;
        if (branchIdParam) list = list.filter(p => p.branchId === branchIdParam);
        return jsonResponse(list);
      }

      if (path === '/finance/expenses') {
        if (method === 'POST') {
          const b = db.branches.find(x => x.id === (body.branchId || 'branch-cai-01')) || db.branches[0];
          const newExp = {
            id: 'exp-gen-' + Date.now(),
            branchId: b.id,
            branchName: b.nameAr,
            categoryId: body.categoryId || 'cat-transport',
            categoryName: body.categoryName || 'Fleet Transport Fuel (وقود ومحروقات الأسطول)',
            amount: Number(body.amount || 5000),
            expenseDate: new Date().toISOString().split('T')[0],
            recipientOrVendor: body.recipientOrVendor || 'Vendor',
            paymentMethod: body.paymentMethod || 'BANK_TRANSFER',
            notes: body.notes || 'Recorded in demo session',
            isOperatingExpense: true
          };
          db.expenses.unshift(newExp);
          saveDb(db);
          return jsonResponse(newExp, 201);
        }

        let list = db.expenses;
        if (branchIdParam) list = list.filter(e => e.branchId === branchIdParam);
        return jsonResponse(list);
      }

      if (path === '/finance/budget-vs-actual') {
        return jsonResponse([
          { branchId: 'branch-cai-01', branchName: 'Cairo (القاهرة)', categoryName: 'Fleet Fuel (وقود أسطول النقل والتوزيع)', budgetAmount: 18000, actualSpent: 14500, utilizationRate: 80.5, isOverBudget: false, status: 'UNDER_BUDGET' },
          { branchId: 'branch-cai-01', branchName: 'Cairo (القاهرة)', categoryName: 'Depot Rent & Power (إيجار مستودع العبور)', budgetAmount: 35000, actualSpent: 35000, utilizationRate: 100.0, isOverBudget: false, status: 'ON_TRACK' },
          { branchId: 'branch-alx-02', branchName: 'Alexandria (الإسكندرية)', categoryName: 'Fleet Fuel (وقود أسطول الإسكندرية)', budgetAmount: 15000, actualSpent: 12200, utilizationRate: 81.3, isOverBudget: false, status: 'UNDER_BUDGET' },
          { branchId: 'branch-mns-03', branchName: 'Mansoura (المنصورة)', categoryName: 'Fleet Fuel (محروقات سيارات الدلتا)', budgetAmount: 12000, actualSpent: 9800, utilizationRate: 81.7, isOverBudget: false, status: 'UNDER_BUDGET' }
        ]);
      }

      // 6. Commissions routes
      if (path === '/commissions/calculations') {
        let list = db.commissions;
        if (branchIdParam) list = list.filter(c => c.branchId === branchIdParam);
        return jsonResponse(list);
      }

      if (path === '/commissions/recalculate' && method === 'POST') {
        const rep = db.salesReps.find(r => r.id === body.salesRepresentativeId) || db.salesReps[0];
        const res = {
          salesRepresentativeId: rep.id,
          salesRepName: rep.name,
          policyCode: body.policyCode || 'POLICY_NET_AFTER_RETURNS',
          eligibleBaseAmount: 383700,
          appliedRate: 0.02,
          calculatedCommission: 7674,
          recordedCommission: 7975,
          discrepancyAmount: -301,
          status: 'APPROVED'
        };
        return jsonResponse(res);
      }

      if (path.includes('/commissions/calculations/') && path.endsWith('/status')) {
        const id = path.split('/')[3];
        const comm = db.commissions.find(c => c.id === id);
        if (comm) comm.status = body.status || 'APPROVED';
        saveDb(db);
        return jsonResponse({ success: true, message: 'Status updated' });
      }

      // 7. Analytics routes
      if (path === '/analytics/ceo-overview') {
        let grossSales = 1150000;
        let netSales = 1110800;
        let cogs = 951050;
        let grossProfit = 159750;
        let grossProfitMargin = 14.38;
        let operatingExpenses = 118500;
        let operatingProfit = 41250;
        let operatingProfitMargin = 3.71;

        if (branchIdParam === 'branch-cai-01') {
          grossSales = 520000; netSales = 500150; cogs = 433100; grossProfit = 67050; grossProfitMargin = 13.41; operatingExpenses = 49500; operatingProfit = 17550; operatingProfitMargin = 3.51;
        } else if (branchIdParam === 'branch-alx-02') {
          grossSales = 355000; netSales = 341150; cogs = 291500; grossProfit = 49650; grossProfitMargin = 14.55; operatingExpenses = 40200; operatingProfit = 9450; operatingProfitMargin = 2.77;
        } else if (branchIdParam === 'branch-mns-03') {
          grossSales = 275000; netSales = 269500; cogs = 229200; grossProfit = 40300; grossProfitMargin = 14.95; operatingExpenses = 28800; operatingProfit = 11500; operatingProfitMargin = 4.27;
        }

        return jsonResponse({
          kpis: {
            grossSales,
            netSales,
            cogs,
            grossProfit,
            grossProfitMargin,
            operatingExpenses,
            operatingProfit,
            operatingProfitMargin,
            discounts: 31200,
            discountRate: 2.71,
            returns: 8000,
            returnRate: 0.70,
            outstandingReceivables: 356800,
            inventoryValuation: 714600,
            monthlyTarget: 3190000,
            targetAchievementRate: 34.82
          },
          monthlyTrend: [
            { month: 'Jun', grossSales: 980000, netSales: 945000, cogs: 810000, opex: 110000, operatingProfit: 25000 },
            { month: 'Jul', grossSales: 1040000, netSales: 1005000, cogs: 860000, opex: 112000, operatingProfit: 33000 },
            { month: 'Aug', grossSales: 1090000, netSales: 1052000, cogs: 900000, opex: 115000, operatingProfit: 37000 },
            { month: 'Sep', grossSales: 1120000, netSales: 1080000, cogs: 925000, opex: 116000, operatingProfit: 39000 },
            { month: 'Oct (MTD)', grossSales: 1150000, netSales: 1110800, cogs: 951050, opex: 118500, operatingProfit: 41250 }
          ],
          branchBreakdown: [
            { id: 'branch-cai-01', code: 'CAI', nameEn: 'Cairo Branch', nameAr: 'فرع القاهرة', colorCode: '#1E3A8A', grossSales: 520000, netSales: 500150, grossProfit: 67050, grossProfitMargin: 13.41, opex: 49500, operatingProfit: 17550, operatingMargin: 3.51, monthlyTarget: 1250000, achievementRate: 40.01, discountRate: 2.89, returnRate: 0.92 },
            { id: 'branch-alx-02', code: 'ALX', nameEn: 'Alexandria Branch', nameAr: 'فرع الإسكندرية', colorCode: '#0D9488', grossSales: 355000, netSales: 341150, grossProfit: 49650, grossProfitMargin: 14.55, opex: 40200, operatingProfit: 9450, operatingMargin: 2.77, monthlyTarget: 1120000, achievementRate: 30.46, discountRate: 3.00, returnRate: 0.90 },
            { id: 'branch-mns-03', code: 'MNS', nameEn: 'Mansoura Branch', nameAr: 'فرع المنصورة', colorCode: '#15803D', grossSales: 275000, netSales: 269500, grossProfit: 40300, grossProfitMargin: 14.95, opex: 28800, operatingProfit: 11500, operatingMargin: 4.27, monthlyTarget: 820000, achievementRate: 32.87, discountRate: 2.00, returnRate: 0.00 }
          ],
          alerts: [
            { id: 'alt-01', severity: 'CRITICAL', title: 'Severe Overdue Balance (>90 Days)', description: 'Customer Al Mansheya Trading (Alexandria) has 90,650 EGP overdue by 62 days past terms.' },
            { id: 'alt-02', severity: 'WARNING', title: 'Commission Overstatement Identified', description: 'Omar Khaled recorded commission exceeds policy by 301 EGP due to unadjusted discount deductions.' },
            { id: 'alt-03', severity: 'WARNING', title: 'Crystal Pure Corn Oil Reorder Threshold', description: 'Stock level at Mansoura central depot reached 140 cartons (reorder threshold is 150).' }
          ]
        });
      }

      if (path === '/analytics/branch-comparison') {
        return jsonResponse([
          { id: 'branch-cai-01', code: 'CAI', nameEn: 'Cairo Branch', nameAr: 'فرع القاهرة', colorCode: '#1E3A8A', repsCount: 2, invoicesCount: 3, grossSales: 520000, netSales: 500150, discounts: 15050, discountRate: 2.89, returns: 4800, returnRate: 0.92, cogs: 433100, grossProfit: 67050, grossProfitMargin: 13.41, opex: 49500, transportCost: 14500, operatingProfit: 17550, operatingMargin: 3.51, receivables: 139750, budget: 53000, budgetVariance: 3500 },
          { id: 'branch-alx-02', code: 'ALX', nameEn: 'Alexandria Branch', nameAr: 'فرع الإسكندرية', colorCode: '#0D9488', repsCount: 2, invoicesCount: 2, grossSales: 355000, netSales: 341150, discounts: 10650, discountRate: 3.00, returns: 3200, returnRate: 0.90, cogs: 291500, grossProfit: 49650, grossProfitMargin: 14.55, opex: 40200, transportCost: 12200, operatingProfit: 9450, operatingMargin: 2.77, receivables: 144350, budget: 43000, budgetVariance: 2800 },
          { id: 'branch-mns-03', code: 'MNS', nameEn: 'Mansoura Branch', nameAr: 'فرع المنصورة', colorCode: '#15803D', repsCount: 2, invoicesCount: 2, grossSales: 275000, netSales: 269500, discounts: 5500, discountRate: 2.00, returns: 0, returnRate: 0.00, cogs: 229200, grossProfit: 40300, grossProfitMargin: 14.95, opex: 28800, transportCost: 9800, operatingProfit: 11500, operatingMargin: 4.27, receivables: 72700, budget: 31000, budgetVariance: 2200 }
        ]);
      }

      if (path === '/analytics/sales-reps') {
        let list = [
          {
            id: 'rep-cai-01',
            name: 'عمر خالد الصاوي (Omar Khaled)',
            code: 'REP-CAI-01',
            branchColor: '#1E3A8A',
            branchName: 'فرع القاهرة الكبرى',
            targetAmount: 650000,
            grossSales: 395000,
            netSales: 383700,
            achievementRate: 59.03,
            discounts: 11300,
            discountRate: 2.86,
            returns: 0,
            returnRate: 0.0,
            grossProfit: 54600,
            grossMargin: 14.23,
            commissionEarned: 7578
          },
          {
            id: 'rep-cai-02',
            name: 'يوسف نبيل فهمي (Youssef Nabil)',
            code: 'REP-CAI-02',
            branchColor: '#1E3A8A',
            branchName: 'فرع القاهرة الكبرى',
            targetAmount: 600000,
            grossSales: 125000,
            netSales: 121250,
            achievementRate: 20.21,
            discounts: 3750,
            discountRate: 3.0,
            returns: 0,
            returnRate: 0.0,
            grossProfit: 17050,
            grossMargin: 14.06,
            commissionEarned: 2425
          },
          {
            id: 'rep-alx-01',
            name: 'محمود سعيد رضوان (Mahmoud Saeed)',
            code: 'REP-ALX-01',
            branchColor: '#0D9488',
            branchName: 'فرع الإسكندرية والساحل',
            targetAmount: 580000,
            grossSales: 195000,
            netSales: 189150,
            achievementRate: 32.61,
            discounts: 5850,
            discountRate: 3.0,
            returns: 0,
            returnRate: 0.0,
            grossProfit: 27150,
            grossMargin: 14.35,
            commissionEarned: 3719
          },
          {
            id: 'rep-alx-02',
            name: 'إبراهيم حمدي زكي (Ibrahim Hamdy)',
            code: 'REP-ALX-02',
            branchColor: '#0D9488',
            branchName: 'فرع الإسكندرية والساحل',
            targetAmount: 540000,
            grossSales: 160000,
            netSales: 155200,
            achievementRate: 28.74,
            discounts: 4800,
            discountRate: 3.0,
            returns: 3200,
            returnRate: 2.0,
            grossProfit: 22500,
            grossMargin: 14.5,
            commissionEarned: 3104
          },
          {
            id: 'rep-mns-01',
            name: 'عمرو مصطفى شحاتة (Amr Mostafa)',
            code: 'REP-MNS-01',
            branchColor: '#15803D',
            branchName: 'فرع الدلتا والمنصورة',
            targetAmount: 420000,
            grossSales: 150000,
            netSales: 147000,
            achievementRate: 35.0,
            discounts: 3000,
            discountRate: 2.0,
            returns: 0,
            returnRate: 0.0,
            grossProfit: 21900,
            grossMargin: 14.9,
            commissionEarned: 2940
          },
          {
            id: 'rep-mns-02',
            name: 'كريم عادل البنا (Karim Adel)',
            code: 'REP-MNS-02',
            branchColor: '#15803D',
            branchName: 'فرع الدلتا والمنصورة',
            targetAmount: 400000,
            grossSales: 125000,
            netSales: 122500,
            achievementRate: 30.63,
            discounts: 2500,
            discountRate: 2.0,
            returns: 0,
            returnRate: 0.0,
            grossProfit: 18400,
            grossMargin: 15.02,
            commissionEarned: 2450
          }
        ];
        if (branchIdParam === 'branch-cai-01') list = list.filter(r => r.code.includes('CAI'));
        else if (branchIdParam === 'branch-alx-02') list = list.filter(r => r.code.includes('ALX'));
        else if (branchIdParam === 'branch-mns-03') list = list.filter(r => r.code.includes('MNS'));
        return jsonResponse(list);
      }

      if (path === '/analytics/product-profitability') {
        return jsonResponse(db.products);
      }

      if (path === '/analytics/data-quality-alerts') {
        return jsonResponse({
          alerts: [
            { id: 'alt-01', branchId: 'branch-alx-02', alertType: 'OVERDUE_RECEIVABLES', severity: 'CRITICAL', title: 'Severe Overdue Balance (>90 Days)', description: 'Customer Al Mansheya Trading (Alexandria) has 90,650 EGP overdue by 62 days past terms.', isResolved: false, createdAt: '2026-10-10T08:00:00Z' },
            { id: 'alt-02', branchId: 'branch-cai-01', alertType: 'COMMISSION_DISCREPANCY', severity: 'WARNING', title: 'Commission Overstatement Identified', description: 'Omar Khaled recorded commission exceeds policy by 301 EGP due to unadjusted discount deductions.', isResolved: false, createdAt: '2026-10-10T09:15:00Z' },
            { id: 'alt-03', branchId: 'branch-mns-03', alertType: 'LOW_STOCK', severity: 'WARNING', title: 'Crystal Pure Corn Oil Reorder Threshold', description: 'Stock level at Mansoura central depot reached 140 cartons (reorder threshold is 150).', isResolved: false, createdAt: '2026-10-10T10:30:00Z' }
          ],
          metrics: { totalAlerts: 3, criticalAlerts: 1, unallocatedPaymentsCount: 0, unallocatedTotalAmount: 0, highDiscountInvoicesCount: 0 }
        });
      }

      // 8. Import routes
      if (path === '/import/stage' && method === 'POST') {
        return jsonResponse({
          batchId: 'stage-' + Date.now(),
          fileName: body.fileName || 'distribution_orders.csv',
          totalRows: 4,
          validRowsCount: 4,
          errorRowsCount: 0,
          previewRows: [
            { rowNumber: 1, invoiceNumber: 'INV-CAI-IMP-101', customerCode: 'CUST-CAI-001', repCode: 'REP-CAI-01', branchCode: 'CAI', grossAmount: 120000, discountAmount: 2400, netAmount: 117600, isValid: true, validationErrors: [] },
            { rowNumber: 2, invoiceNumber: 'INV-CAI-IMP-102', customerCode: 'CUST-CAI-002', repCode: 'REP-CAI-02', branchCode: 'CAI', grossAmount: 95000, discountAmount: 1900, netAmount: 93100, isValid: true, validationErrors: [] },
            { rowNumber: 3, invoiceNumber: 'INV-ALX-IMP-103', customerCode: 'CUST-ALX-001', repCode: 'REP-ALX-01', branchCode: 'ALX', grossAmount: 140000, discountAmount: 2800, netAmount: 137200, isValid: true, validationErrors: [] },
            { rowNumber: 4, invoiceNumber: 'INV-MNS-IMP-104', customerCode: 'CUST-MNS-001', repCode: 'REP-MNS-01', branchCode: 'MNS', grossAmount: 85000, discountAmount: 1700, netAmount: 83300, isValid: true, validationErrors: [] }
          ]
        });
      }

      if (path === '/import/commit' && method === 'POST') {
        const rows = body.validRows || [];
        rows.forEach((r, idx) => {
          db.invoices.unshift({
            id: 'inv-imp-' + Date.now() + '-' + idx,
            invoiceNumber: r.invoiceNumber,
            branchId: r.branchCode === 'CAI' ? 'branch-cai-01' : (r.branchCode === 'ALX' ? 'branch-alx-02' : 'branch-mns-03'),
            branchName: r.branchCode === 'CAI' ? 'Cairo Branch' : (r.branchCode === 'ALX' ? 'Alexandria Branch' : 'Mansoura Branch'),
            customerId: 'cust-cai-01',
            customerName: 'Staged CSV Import Account',
            salesRepresentativeId: 'rep-cai-01',
            repName: r.repCode,
            invoiceDate: new Date().toISOString().split('T')[0],
            dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
            status: 'ISSUED',
            grossAmount: r.grossAmount,
            discountAmount: r.discountAmount,
            netAmount: r.netAmount,
            taxAmount: r.netAmount * 0.14,
            totalAmount: r.netAmount * 1.14,
            paidAmount: 0,
            balanceDue: r.netAmount * 1.14,
            cogsAmount: Math.round(r.grossAmount * 0.82),
            paymentStatus: 'UNPAID',
            notes: 'Committed via CSV Batch Import',
            lines: []
          });
        });
        saveDb(db);
        return jsonResponse({
          committedCount: rows.length,
          batchId: 'commit-' + Date.now()
        });
      }

      // 9. Audit routes
      if (path === '/audit/logs') {
        return jsonResponse(db.auditLogs);
      }

      return jsonResponse({ message: 'OK' });
    }

    return originalFetch.apply(this, arguments);
  };
})();
