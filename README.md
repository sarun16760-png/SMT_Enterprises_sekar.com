# 🔺 SMT ENTERPRISES - Professional Invoice & Delivery Challan System

## 📦 PROJECT STRUCTURE

```
SMT_Enterprises_Complete/
├── index.html           (27 KB) - Main HTML structure & modals
├── styles.css           (12 KB) - Complete styling & responsive design
├── app.js               (41 KB) - All JavaScript logic & functionality
├── README.md            (This file)
└── .gitignore           (Optional - for git)
```

## ✨ COMPLETE FEATURES INCLUDED

### 🏠 Dashboard
- Business overview with SMT Enterprises branding
- Real-time statistics (Total Revenue, Paid, Pending, Challans)
- Recent challans display
- Quick access links

### 📋 Delivery Challans (MAIN FEATURE)
- ✅ Create professional delivery challans
- ✅ Customer selection dropdown
- ✅ Add items with Qty × Rate = Amount calculation
- ✅ Professional challan preview
- ✅ Print-ready format
- ✅ Number to words conversion (Indian format)
- ✅ Search & filter
- ✅ Delete/View options

### 🧾 Invoices
- ✅ Create invoices with full tax support
- ✅ GST calculation (5%, 12%, 18%, 28%)
- ✅ Discount handling
- ✅ Status tracking (Pending, Paid, Overdue)
- ✅ Professional invoice preview
- ✅ Search & filter
- ✅ Delete/View options

### 📦 Item Master
- ✅ Add items manually
- ✅ Upload items via Excel (.xlsx, .xls, .csv)
- ✅ Auto-fill in challan/invoice forms
- ✅ Search & filter
- ✅ Delete items
- ✅ Category tracking
- ✅ Unit management

### 👥 Customers
- ✅ Add customer information
- ✅ Phone, email, GSTIN tracking
- ✅ Invoice history per customer
- ✅ Total billed calculation
- ✅ Search & filter
- ✅ Delete customers

### 📊 Reports & Analytics
- ✅ Monthly revenue calculation
- ✅ Collection rate percentage
- ✅ Revenue breakdown charts
- ✅ Top customers ranking
- ✅ Customer statistics
- ✅ Item count tracking

### 📥 Export & Backup
- ✅ Export challans to CSV
- ✅ Export invoices to CSV
- ✅ Export items to CSV
- ✅ Export customers to CSV
- ✅ JSON backup of all data
- ✅ Print reports

### ⚙️ Settings
- ✅ Company name (SMT Enterprises)
- ✅ GSTIN (33AAACE4784E1ZU)
- ✅ Phone (9025024755)
- ✅ Email (info@smtenterprises.com)
- ✅ Address (Full address pre-filled)
- ✅ City (COIMBATORE)
- ✅ PAN (BPKPG2004Q)
- ✅ Challan prefix customization (CHN)

## 🚀 QUICK START GUIDE

### Installation (30 seconds)

```bash
# 1. Extract ZIP
unzip "SMT_Enterprises_Complete.zip"
cd SMT_Enterprises_Complete

# 2. Run with Python 3
python -m http.server 8000

# 3. Open Browser
http://localhost:8000

# Done! Application is ready to use 🎉
```

### Alternative Deployment Methods

**With Node.js (http-server):**
```bash
npm install -g http-server
http-server
```

**With PHP:**
```bash
php -S localhost:8000
```

**Direct File Opening (Not recommended):**
- Simply open `index.html` in browser (may have security issues)

## 🖨️ PROFESSIONAL PRINTING & PDF DOWNLOAD

### Print to PDF (Google Chrome / Edge)

1. Open challan/invoice preview
2. Click **🖨️ Print / Download as PDF**
3. Select printer: **"Save as PDF"**
4. Click **Save**
5. ✅ Professional PDF ready to share!

### Print to Paper (Any Printer)

1. Open challan/invoice preview
2. Click **🖨️ Print / Download as PDF**
3. Select your printer
4. Click **Print**
5. ✅ Professional printout ready!

### Professional Output Format

The print output matches the reference PDF:
- ✅ Professional header with company logo (🔺)
- ✅ Company name, address, contact details
- ✅ Document type (DELIVERY CHALLAN / INVOICE)
- ✅ Document number & date (auto-generated)
- ✅ BILL TO section
- ✅ Professional item table
- ✅ Totals with GST calculation
- ✅ Amount in words (Indian format)
- ✅ Signature section
- ✅ Professional styling & formatting

---

```
🔺 SMT ENTERPRISES
26/13 R V L WEST COLONY, UPPILIPALAYAM
SINGANALLUR, COIMBATORE, 641005, TAMIL NADU
City: COIMBATORE
Mobile: 9025024755 | PAN: BPKPG2004Q
Email: info@smtenterprises.com

DELIVERY CHALLAN
Challan No.: CHN-424
Challan Date: 09/06/2026

BILL TO
ABC Manufacturing Ltd

ITEMS                  | QTY | RATE (₹) | AMOUNT (₹)
Hydraulic Hose         | 1   | 2,500    | 2,500
Installation Service   | 2   | 3,000    | 6,000
─────────────────────────────────────────────
SUBTOTAL               | 2   |          | 8,500
═════════════════════════════════════════════

Total Amount: ₹8,500
Total Amount (in words): Eight Thousand Five Hundred Rupees

AUTHORISED SIGNATORY FOR
SMT ENTERPRISES
```

## 🎯 WORKFLOW EXAMPLES

### Create a Delivery Challan

1. Click **📋 Challans** in sidebar
2. Click **+ Create Challan** button
3. Select customer from dropdown
4. Set challan date
5. Add items:
   - Type item name → auto-complete appears
   - Click item from dropdown
   - Set quantity
   - Amount auto-calculates
6. Click **Save & Preview**
7. View professional challan
8. Click **🖨️ Print** to print

### Create an Invoice

1. Click **🧾 Invoices** in sidebar
2. Click **+ Create Invoice** button
3. Select customer
4. Set invoice date & due date
5. Add items (same as challan)
6. Set discount & GST percentage
7. Choose status (Pending/Paid/Overdue)
8. Click **Save & Preview**
9. View invoice with calculations

### Add Items via Excel

1. Click **📦 Items**
2. Click **📤 Upload Excel**
3. Prepare Excel with headers:
   - Item Name | Price | Unit | Category | Description
   - Example: Hydraulic Hose | 2500 | QTY | Spares | Premium quality
4. Drag & drop file or click to browse
5. Click **✅ Import Items**
6. Items automatically added!

### Add Customer

1. Click **👥 Customers**
2. Click **+ Add Customer**
3. Enter:
   - Name (Required)
   - Phone
   - Email
   - GST Number
4. Click **Save Customer**
5. Customer appears in all dropdowns

## 📱 BROWSER COMPATIBILITY

✅ **Desktop**
- Chrome (recommended)
- Firefox
- Safari
- Edge

✅ **Tablet**
- iPad (iOS)
- Android tablets

✅ **Mobile**
- Responsive design
- Touch-friendly buttons

✅ **Printing**
- Professional print layout
- No sidebar/header in print

✅ **Offline**
- Works without internet
- 100% localStorage

## 💾 DATA STORAGE

- **Location**: Browser's localStorage
- **Capacity**: ~5MB per domain
- **Persistence**: Data saved until cleared
- **Backup**: Use Export → JSON Backup
- **Security**: Local storage only, no cloud

## 🔒 SECURITY & PRIVACY

✅ **100% Offline** - No data sent to servers
✅ **No Cloud Upload** - Everything local
✅ **No Tracking** - Complete privacy
✅ **Easy Backup** - Export JSON anytime
✅ **Easy Restore** - Import from backup
✅ **No Dependencies** - Standalone app

## 📊 STATISTICS TRACKED

- Total Revenue
- Paid Amount
- Pending Amount
- Total Challans
- Total Invoices
- Monthly Revenue
- Collection Rate
- Top Customers
- Customer Count
- Item Count

## 🎨 DESIGN FEATURES

✅ Modern gradient UI with dark sidebar
✅ Professional color scheme
✅ Smooth animations & transitions
✅ Beautiful form design
✅ Professional tables
✅ Responsive layout
✅ Touch-friendly buttons
✅ Print-optimized styling
✅ Professional typography
✅ Brand consistency

## 🔧 TECHNICAL STACK

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript** - No framework required
- **XLSX Library** - Excel import/export
- **Google Fonts** - Professional typography
- **LocalStorage API** - Data persistence

## 📄 FILE DESCRIPTIONS

### index.html (27 KB)
- HTML structure for all screens
- All modals (Challan, Invoice, Item, Customer, Preview)
- Responsive layout
- Form elements
- Tables & data displays
- Links to CSS & JS

### styles.css (12 KB)
- Complete styling
- CSS variables for theming
- Responsive media queries
- Print styles
- Dark sidebar styling
- Modal & form styling
- Table & button styling
- Animation & transitions

### app.js (41 KB)
- State management
- Screen navigation
- CRUD operations (Create, Read, Update, Delete)
- Calculations (Qty × Rate, GST, Discount)
- Search & filter logic
- Export functionality (CSV, JSON)
- Excel import logic
- Number to words conversion
- Event handlers
- localStorage integration

## 🚨 TROUBLESHOOTING

**Problem**: Data not saving
- **Solution**: Check browser's localStorage enabled
- **Check**: Settings → Privacy → Cookies & site data

**Problem**: Excel import not working
- **Solution**: Ensure Excel has proper headers
- **Format**: Item Name | Price | Unit | Category | Description

**Problem**: Print looks wrong
- **Solution**: Use Chrome/Firefox for best print results
- **Tip**: Check "Margins" in print settings

**Problem**: Can't see items in dropdown
- **Solution**: Add items first in Item Master
- **Path**: 📦 Items → + Add Item

## 💡 TIPS & BEST PRACTICES

1. **Always Backup**: Export JSON weekly
2. **Add Customers First**: Makes challan/invoice creation faster
3. **Categorize Items**: Use categories for organization
4. **Check Settings**: Verify company details before printing
5. **Use Search**: Filter by customer/item name for quick access
6. **Export Regularly**: Keep CSV backups of important data

## 📞 COMPANY INFO (SMT ENTERPRISES)

- **Name**: SMT Enterprises
- **GSTIN**: 33AAACE4784E1ZU
- **Phone**: 9025024755
- **Email**: info@smtenterprises.com
- **Address**: 26/13 R V L WEST COLONY, UPPILIPALAYAM, SINGANALLUR, COIMBATORE, 641005, TAMIL NADU
- **City**: COIMBATORE
- **PAN**: BPKPG2004Q

## 🎯 KEY IMPROVEMENTS IN THIS VERSION

✅ Separated HTML, CSS, and JavaScript files
✅ Professional modular structure
✅ Complete documentation
✅ All features implemented
✅ Production-ready code
✅ Responsive design
✅ Professional styling
✅ Full functionality included
✅ Data persistence
✅ Export capabilities

## 🚀 READY TO USE!

Extract, run, and start creating professional invoices and delivery challans immediately!

**Everything pre-configured for SMT Enterprises:**
- Company name ✓
- GSTIN ✓
- Contact details ✓
- Address ✓
- Logo (🔺) ✓

---

**SMT Enterprises - Professional Invoice & Delivery Challan Management System**

Built with ❤️ for efficient business operations
