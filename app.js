let state = {
  invoices: [],
  challans: [],
  items: [],
  customers: [],
  settings: { bizName: 'SMT Enterprises', gst: '33AAACE4784E1ZU', phone: '9025024755', email: 'info@smtenterprises.com', address: '26/13 R V L WEST COLONY, UPPILIPALAYAM, SINGANALLUR, COIMBATORE, 641005, TAMIL NADU', city: 'COIMBATORE', pan: 'BPKPG2004Q', challanPrefix: 'CHN' },
  challanCounter: 424,
  invoiceCounter: 1001
};

const saved = localStorage.getItem('smt_enterprises_app');
if (saved) Object.assign(state, JSON.parse(saved));

function saveState() { localStorage.setItem('smt_enterprises_app', JSON.stringify(state)); }

function switchScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (event && event.target.closest) event.target.closest('.nav-item').classList.add('active');
  
  const titles = {
    home: ['🔺 SMT Enterprises Dashboard', 'Business Overview & Quick Stats'],
    challans: ['Delivery Challans', 'Create & manage delivery challans'],
    invoices: ['All Invoices', 'Manage invoices & payments'],
    items: ['Item Master', 'Manage product catalog'],
    customers: ['Customers', 'Manage customer information'],
    reports: ['Analytics & Reports', 'View business insights'],
    export: ['Export Data', 'Download and backup data'],
    settings: ['Settings', 'Configure business details']
  };
  
  document.getElementById('page-title').textContent = titles[id]?.[0] || 'SMT Enterprises';
  document.getElementById('page-subtitle').textContent = titles[id]?.[1] || '';

  if (id === 'home') refreshHome();
  else if (id === 'invoices') refreshInvoices();
  else if (id === 'challans') refreshChallans();
  else if (id === 'items') refreshItems();
  else if (id === 'customers') refreshCustomers();
  else if (id === 'reports') refreshReports();
  else if (id === 'settings') loadSettings();
}

function openModal(id) { document.getElementById(id).classList.add('show'); }
function closeModal(id) { document.getElementById(id).classList.remove('show'); }

function refreshHome() {
  const paid = state.invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0);
  const pending = state.invoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.total, 0);
  const total = state.invoices.reduce((s, i) => s + i.total, 0);
  
  document.getElementById('total-revenue').textContent = fmt(total);
  document.getElementById('total-invoices').textContent = state.invoices.length + ' invoices';
  document.getElementById('paid-amount').textContent = fmt(paid);
  document.getElementById('paid-count').textContent = state.invoices.filter(i => i.status === 'paid').length + ' invoices';
  document.getElementById('pending-amount').textContent = fmt(pending);
  document.getElementById('pending-count').textContent = state.invoices.filter(i => i.status === 'pending').length + ' invoices';
  document.getElementById('total-challans').textContent = state.challans.length;
  document.getElementById('challan-count').textContent = state.challans.length + ' created';
  
  const recent = [...state.challans].reverse().slice(0, 5);
  let html = '';
  if (!recent.length) html = '<tr><td colspan="5" style="text-align: center; padding: 40px; color: var(--text-secondary);">No challans yet. Create one!</td></tr>';
  else html = recent.map(ch => `<tr><td style="font-weight: 700;">${state.settings.challanPrefix}-${ch.number}</td><td>${ch.billTo}</td><td>${ch.items.length}</td><td>${ch.date}</td><td><button class="btn" style="background: var(--bg-accent); color: var(--primary); padding: 8px 14px; font-size: 12px; border: none; border-radius: 6px; cursor: pointer; font-weight: 700;" onclick="previewChallan(${state.challans.indexOf(ch)})">View</button></td></tr>`).join('');
  document.getElementById('recent-challans').innerHTML = html;
}

function refreshChallans() {
  let html = '';
  if (!state.challans.length) html = '<tr><td colspan="5" style="text-align: center; padding: 40px; color: var(--text-secondary);">No challans</td></tr>';
  else html = state.challans.map((ch, idx) => `<tr><td style="font-weight: 700;">${state.settings.challanPrefix}-${ch.number}</td><td>${ch.billTo}</td><td>${ch.items.length}</td><td>${ch.date}</td><td><button class="btn" style="background: var(--bg-accent); color: var(--primary); padding: 8px 14px; font-size: 12px; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; margin-right: 8px;" onclick="previewChallan(${idx})">View</button><button class="delete-btn" onclick="deleteChallan(${idx})">Delete</button></td></tr>`).join('');
  document.getElementById('challans-table').innerHTML = html;
}

function filterChallans() {
  const q = document.getElementById('search-challan').value.toLowerCase();
  const filtered = state.challans.filter(i => i.number.toString().includes(q) || i.billTo.toLowerCase().includes(q));
  let html = '';
  if (!filtered.length) html = '<tr><td colspan="5" style="text-align: center; padding: 40px; color: var(--text-secondary);">No results</td></tr>';
  else html = filtered.map((ch, idx) => `<tr><td style="font-weight: 700;">${state.settings.challanPrefix}-${ch.number}</td><td>${ch.billTo}</td><td>${ch.items.length}</td><td>${ch.date}</td><td><button class="btn" style="background: var(--bg-accent); color: var(--primary); padding: 8px 14px; font-size: 12px; border: none; border-radius: 6px; cursor: pointer;" onclick="previewChallan(${state.challans.indexOf(ch)})">View</button></td></tr>`).join('');
  document.getElementById('challans-table').innerHTML = html;
}

function deleteChallan(idx) {
  if (confirm('Delete this challan?')) {
    state.challans.splice(idx, 1);
    saveState();
    refreshHome();
    refreshChallans();
  }
}

function previewChallan(idx) {
  const ch = state.challans[idx];
  const biz = state.settings;
  
  let html = `
  <div class="print-page">
    <div class="print-header">
      <div>
        <div class="print-logo">🔺</div>
      </div>
      <div class="print-company-info">
        <div class="print-company-name">${biz.bizName}</div>
        <div class="print-company-details">
          ${biz.address}<br>
          Mobile: ${biz.phone} | PAN: ${biz.pan}<br>
          Email: ${biz.email}
        </div>
      </div>
      <div>
        <div class="print-doc-type">DELIVERY CHALLAN</div>
        <div class="print-doc-meta">
          <div class="print-doc-meta-line">
            <span class="print-doc-meta-label">Challan No.:</span><br>
            <span class="print-doc-meta-value">${state.settings.challanPrefix}-${ch.number}</span>
          </div>
          <div class="print-doc-meta-line" style="margin-top: 10px;">
            <span class="print-doc-meta-label">Challan Date:</span><br>
            <span class="print-doc-meta-value">${ch.date}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="print-bill-to">
      <div class="print-bill-to-label">BILL TO</div>
      <div class="print-bill-to-customer">${ch.billTo}</div>
    </div>

    <table class="print-table">
      <thead>
        <tr>
          <th style="width: 50%;">ITEMS</th>
          <th style="width: 15%; text-align: center;">QTY.</th>
          <th style="width: 15%; text-align: right;">RATE</th>
          <th style="width: 20%; text-align: right;">AMOUNT</th>
        </tr>
      </thead>
      <tbody>
        ${ch.items.map(item => `
          <tr>
            <td><strong>${item.name}</strong></td>
            <td style="text-align: center;">${item.qty} ${item.unit}</td>
            <td style="text-align: right;">${fmt(item.rate)}</td>
            <td style="text-align: right;"><strong>${fmt(item.qty * item.rate)}</strong></td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="print-totals">
      <div class="print-total-row subtotal">
        <span>SUBTOTAL</span>
        <span>${fmt(ch.total)}</span>
      </div>
      <div class="print-total-row final-total">
        <span>Total Amount</span>
        <span>${fmt(ch.total)}</span>
      </div>
    </div>

    <div class="print-amount-in-words">
      <div class="print-amount-in-words-label">Total Amount (in words)</div>
      <div class="print-amount-in-words-value"><strong>${numberToWords(ch.total)} Rupees</strong></div>
    </div>

    ${ch.notes ? `<div class="print-notes"><strong>Notes:</strong> ${ch.notes}</div>` : ''}

    <div class="print-signature">
      <div class="print-signature-line"></div>
      <div class="print-signature-name">AUTHORISED SIGNATORY FOR</div>
      <div class="print-signature-name"><strong>${biz.bizName}</strong></div>
    </div>
  </div>
  `;

  document.getElementById('challan-preview-content').innerHTML = html;
  openModal('challanPreviewModal');
}

function printChallan() {
  window.print();
}

function refreshInvoices() {
  let html = '';
  if (!state.invoices.length) html = '<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--text-secondary);">No invoices</td></tr>';
  else html = state.invoices.map((inv, idx) => `<tr><td style="font-weight: 700;">INV-${inv.number}</td><td>${inv.customer}</td><td>${inv.items.length}</td><td><strong>${fmt(inv.total)}</strong></td><td>${inv.date}</td><td><span class="badge badge-${inv.status}">${inv.status.toUpperCase()}</span></td><td><button class="btn" style="background: var(--bg-accent); color: var(--primary); padding: 8px 14px; font-size: 12px; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; margin-right: 8px;" onclick="previewInvoice(${idx})">View</button><button class="delete-btn" onclick="deleteInvoice(${idx})">Delete</button></td></tr>`).join('');
  document.getElementById('invoices-table').innerHTML = html;
}

function filterInvoices() {
  const q = document.getElementById('search-invoice').value.toLowerCase();
  const filtered = state.invoices.filter(i => i.number.toString().includes(q) || i.customer.toLowerCase().includes(q));
  let html = '';
  if (!filtered.length) html = '<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--text-secondary);">No results</td></tr>';
  else html = filtered.map((inv, idx) => `<tr><td style="font-weight: 700;">INV-${inv.number}</td><td>${inv.customer}</td><td>${inv.items.length}</td><td><strong>${fmt(inv.total)}</strong></td><td>${inv.date}</td><td><span class="badge badge-${inv.status}">${inv.status.toUpperCase()}</span></td><td><button class="btn" style="background: var(--bg-accent); color: var(--primary); padding: 8px 14px; font-size: 12px; border: none; border-radius: 6px; cursor: pointer;" onclick="previewInvoice(${state.invoices.indexOf(inv)})">View</button></td></tr>`).join('');
  document.getElementById('invoices-table').innerHTML = html;
}

function deleteInvoice(idx) {
  if (confirm('Delete this invoice?')) {
    state.invoices.splice(idx, 1);
    saveState();
    refreshHome();
    refreshInvoices();
  }
}

function previewInvoice(idx) {
  const inv = state.invoices[idx];
  const biz = state.settings;
  
  let html = `
  <div class="print-container-preview">
    <!-- COMPANY HEADER -->
    <div class="print-company-header">
      <div class="print-company-name">${biz.bizName}</div>
      <div class="print-company-detail">${biz.address}</div>
      <div class="print-company-detail">Mobile: ${biz.phone} | PAN: ${biz.pan}</div>
      <div class="print-company-detail">Email: ${biz.email}</div>
    </div>

    <!-- DOCUMENT TYPE AND INFO -->
    <div class="print-doc-section">
      <div class="print-doc-type">INVOICE</div>
      <div class="print-doc-info">
        <div class="print-doc-row"><span class="print-doc-label">Invoice No.:</span> <span class="print-doc-value">INV-${inv.number}</span></div>
        <div class="print-doc-row"><span class="print-doc-label">Invoice Date:</span> <span class="print-doc-value">${inv.date}</span></div>
        <div class="print-doc-row"><span class="print-doc-label">Due Date:</span> <span class="print-doc-value">${inv.due}</span></div>
      </div>
    </div>

    <!-- BILL TO -->
    <div class="print-bill-to">
      <div class="print-bill-to-label">BILL TO</div>
      <div class="print-bill-to-content">${inv.customer}</div>
    </div>

    <!-- ITEMS TABLE -->
    <table class="print-items-table">
      <thead>
        <tr>
          <th class="print-col-item">ITEM</th>
          <th class="print-col-qty">QTY</th>
          <th class="print-col-rate">RATE</th>
          <th class="print-col-amount">AMOUNT</th>
        </tr>
      </thead>
      <tbody>
        ${inv.items.map(item => `
          <tr>
            <td class="print-col-item">${item.name}</td>
            <td class="print-col-qty">${item.qty}</td>
            <td class="print-col-rate">${fmt(item.rate)}</td>
            <td class="print-col-amount">${fmt(item.qty * item.rate)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- TOTALS -->
    <div class="print-totals-section">
      <div class="print-subtotal-row">
        <span>Subtotal</span>
        <span>${fmt(inv.sub)}</span>
      </div>
      ${inv.disc > 0 ? `
      <div class="print-gst-row">
        <span>GST (${inv.gstPct}%)</span>
        <span>${fmt(inv.gst)}</span>
      </div>
      ` : ''}
      <div class="print-total-row">
        <span>Total Amount</span>
        <span>${fmt(inv.total)}</span>
      </div>
    </div>

    <!-- AMOUNT IN WORDS -->
    <div class="print-amount-in-words">
      <div class="print-amount-label">TOTAL AMOUNT (IN WORDS)</div>
      <div class="print-amount-value">${numberToWords(inv.total)} Rupees</div>
    </div>

    <!-- STATUS AND TERMS -->
    <div class="print-status-section">
      <strong>Status:</strong> ${inv.status.toUpperCase()} | <strong>Terms:</strong> ${inv.notes || 'Thank you for your business!'}
    </div>

    <!-- SIGNATURE -->
    <div class="print-signature-section">
      <div class="print-signature-line"></div>
      <div class="print-signature-label">AUTHORISED SIGNATORY FOR</div>
      <div class="print-signature-label">${biz.bizName}</div>
    </div>
  </div>
  `;

  document.getElementById('invoice-preview-content').innerHTML = html;
  openModal('invoicePreviewModal');
}

function printInvoice() {
  window.print();
}

function refreshItems() {
  let html = '';
  if (!state.items.length) html = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary);">No items yet</td></tr>';
  else html = state.items.map((item, idx) => `<tr><td style="font-weight: 600;">${item.name}</td><td><strong style="color: var(--primary);">${fmt(item.price)}</strong></td><td>${item.unit || '-'}</td><td>${item.category || '-'}</td><td>${item.desc || '-'}</td><td><button class="delete-btn" onclick="deleteItem(${idx})">Delete</button></td></tr>`).join('');
  document.getElementById('items-table').innerHTML = html;
}

function filterItems() {
  const q = document.getElementById('search-item').value.toLowerCase();
  const filtered = state.items.filter(it => it.name.toLowerCase().includes(q) || (it.category || '').toLowerCase().includes(q));
  let html = '';
  if (!filtered.length) html = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary);">No results</td></tr>';
  else html = filtered.map((item, idx) => `<tr><td style="font-weight: 600;">${item.name}</td><td><strong style="color: var(--primary);">${fmt(item.price)}</strong></td><td>${item.unit || '-'}</td><td>${item.category || '-'}</td><td>${item.desc || '-'}</td><td><button class="delete-btn" onclick="deleteItem(${state.items.indexOf(item)})">Delete</button></td></tr>`).join('');
  document.getElementById('items-table').innerHTML = html;
}

function saveItem() {
  const name = document.getElementById('item-name').value.trim();
  const price = parseFloat(document.getElementById('item-price').value);
  if (!name || !price) { alert('Item name and price required'); return; }
  state.items.push({
    name,
    price,
    unit: document.getElementById('item-unit').value.trim(),
    category: document.getElementById('item-category').value.trim(),
    desc: document.getElementById('item-desc').value.trim()
  });
  saveState();
  refreshItems();
  closeModal('addItemModal');
  document.getElementById('item-name').value = '';
  document.getElementById('item-price').value = '';
  document.getElementById('item-unit').value = '';
  document.getElementById('item-category').value = '';
  document.getElementById('item-desc').value = '';
  alert('Item added!');
}

function deleteItem(idx) {
  if (confirm('Delete this item?')) {
    state.items.splice(idx, 1);
    saveState();
    refreshItems();
  }
}

function refreshCustomers() {
  let html = '';
  if (!state.customers.length) html = '<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--text-secondary);">No customers yet</td></tr>';
  else html = state.customers.map((cust, idx) => {
    const custInvoices = state.invoices.filter(i => i.customer === cust.name);
    const total = custInvoices.reduce((s, i) => s + i.total, 0);
    return `<tr><td style="font-weight: 600;">${cust.name}</td><td>${cust.phone || '-'}</td><td>${cust.email || '-'}</td><td>${cust.gst || '-'}</td><td>${custInvoices.length}</td><td><strong style="color: var(--primary);">${fmt(total)}</strong></td><td><button class="delete-btn" onclick="deleteCustomer(${idx})">Delete</button></td></tr>`;
  }).join('');
  document.getElementById('customers-table').innerHTML = html;
}

function filterCustomers() {
  const q = document.getElementById('search-customer').value.toLowerCase();
  const filtered = state.customers.filter(c => c.name.toLowerCase().includes(q));
  let html = '';
  if (!filtered.length) html = '<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--text-secondary);">No results</td></tr>';
  else html = filtered.map((cust, idx) => {
    const custInvoices = state.invoices.filter(i => i.customer === cust.name);
    const total = custInvoices.reduce((s, i) => s + i.total, 0);
    return `<tr><td style="font-weight: 600;">${cust.name}</td><td>${cust.phone || '-'}</td><td>${cust.email || '-'}</td><td>${cust.gst || '-'}</td><td>${custInvoices.length}</td><td><strong style="color: var(--primary);">${fmt(total)}</strong></td><td><button class="delete-btn" onclick="deleteCustomer(${state.customers.indexOf(cust)})">Delete</button></td></tr>`;
  }).join('');
  document.getElementById('customers-table').innerHTML = html;
}

function saveCustomer() {
  const name = document.getElementById('cust-name').value.trim();
  if (!name) { alert('Name required'); return; }
  state.customers.push({
    name,
    phone: document.getElementById('cust-phone').value.trim(),
    email: document.getElementById('cust-email').value.trim(),
    gst: document.getElementById('cust-gst').value.trim()
  });
  saveState();
  refreshCustomers();
  refreshChallanCustomerDropdown();
  refreshInvoiceCustomerDropdown();
  closeModal('addCustomerModal');
  document.getElementById('cust-name').value = '';
  document.getElementById('cust-phone').value = '';
  document.getElementById('cust-email').value = '';
  document.getElementById('cust-gst').value = '';
  alert('Customer added!');
}

function deleteCustomer(idx) {
  if (confirm('Delete this customer?')) {
    state.customers.splice(idx, 1);
    saveState();
    refreshCustomers();
  }
}

let currentChallanItems = [];

function addChallanItem() {
  currentChallanItems.push({ name: '', qty: 1, rate: 0, unit: '', category: '' });
  renderChallanItems();
}

function removeChallanItem(idx) {
  currentChallanItems.splice(idx, 1);
  renderChallanItems();
  calculateChallanTotal();
}

function renderChallanItems() {
  let html = '';
  currentChallanItems.forEach((item, idx) => {
    const amount = parseFloat(item.qty || 0) * parseFloat(item.rate || 0);
    html += `<div class="item-row"><div class="form-group" style="margin-bottom: 0; position: relative;"><input type="text" class="form-input item-input" id="challan-item-name-${idx}" placeholder="Item name" value="${item.name}" onchange="currentChallanItems[${idx}].name = this.value; calculateChallanTotal();" oninput="showItemDropdownChallan(${idx})"><div class="dropdown-list" id="challan-dropdown-${idx}"></div></div><input type="text" class="form-input item-input item-readonly" id="challan-item-unit-${idx}" placeholder="Unit" value="${item.unit}" readonly><input type="number" class="form-input item-input" min="1" step="0.01" value="${item.qty}" onchange="currentChallanItems[${idx}].qty = parseFloat(this.value) || 1; renderChallanItems(); calculateChallanTotal();" oninput="currentChallanItems[${idx}].qty = parseFloat(this.value) || 1; calculateChallanTotal();"><input type="number" class="form-input item-input item-readonly" step="0.01" value="${item.rate}" readonly placeholder="Rate"><div class="item-amount">${fmt(amount)}</div><button type="button" class="delete-btn" onclick="removeChallanItem(${idx})" style="width: 100%; padding: 12px 14px;">✕</button></div>`;
  });
  document.getElementById('challan-items').innerHTML = html;
}

function showItemDropdownChallan(idx) {
  const input = document.getElementById(`challan-item-name-${idx}`).value.toLowerCase();
  const dropdown = document.getElementById(`challan-dropdown-${idx}`);
  
  if (!input) {
    dropdown.classList.remove('show');
    return;
  }
  
  const matches = state.items.filter(it => it.name.toLowerCase().includes(input));
  
  if (!matches.length) {
    dropdown.classList.remove('show');
    return;
  }
  
  let html = '';
  matches.slice(0, 8).forEach(item => {
    html += `<div class="dropdown-item" onclick="selectItemChallan(${idx}, '${item.name.replace(/'/g, "\\'")}', ${item.price}, '${item.unit}', '${item.category}')"><strong>${item.name}</strong><small>₹${item.price.toFixed(2)} | ${item.unit || 'pcs'}</small></div>`;
  });
  
  dropdown.innerHTML = html;
  dropdown.classList.add('show');
}

function selectItemChallan(idx, name, price, unit, category) {
  currentChallanItems[idx].name = name;
  currentChallanItems[idx].rate = price;
  currentChallanItems[idx].unit = unit;
  currentChallanItems[idx].category = category;
  
  document.getElementById(`challan-item-name-${idx}`).value = name;
  document.getElementById(`challan-item-unit-${idx}`).value = unit;
  document.getElementById(`challan-dropdown-${idx}`).classList.remove('show');
  renderChallanItems();
  calculateChallanTotal();
}

function calculateChallanTotal() {
  const sub = currentChallanItems.reduce((s, i) => s + (parseFloat(i.qty || 0) * parseFloat(i.rate || 0)), 0);
  document.getElementById('challan-subtotal').textContent = fmt(sub);
  document.getElementById('challan-total').textContent = fmt(sub);
}

function saveChallan() {
  const custName = document.getElementById('challan-customer').value;
  if (!custName || custName === '-- Select Customer --') { alert('Select customer'); return; }
  if (!currentChallanItems.filter(i => i.name.trim()).length) { alert('Add at least one item'); return; }
  
  const sub = currentChallanItems.reduce((s, i) => s + (parseFloat(i.qty || 0) * parseFloat(i.rate || 0)), 0);
  
  state.challans.push({
    number: state.challanCounter++,
    billTo: custName,
    date: document.getElementById('challan-date').value,
    deliveryDate: document.getElementById('challan-delivery-date').value,
    items: [...currentChallanItems.filter(i => i.name.trim())],
    subtotal: sub,
    total: sub,
    notes: document.getElementById('challan-notes').value
  });
  
  saveState();
  refreshHome();
  refreshChallans();
  closeModal('challanModal');
  resetChallanForm();
  alert('Challan saved!');
}

function saveAndPreviewChallan() {
  saveChallan();
  setTimeout(() => previewChallan(state.challans.length - 1), 500);
}

function resetChallanForm() {
  document.getElementById('challan-number').value = state.settings.challanPrefix + '-' + state.challanCounter;
  document.getElementById('challan-date').valueAsDate = new Date();
  document.getElementById('challan-delivery-date').value = '';
  document.getElementById('challan-customer').value = '-- Select Customer --';
  document.getElementById('challan-notes').value = '';
  currentChallanItems = [{ name: '', qty: 1, rate: 0, unit: '', category: '' }];
  renderChallanItems();
  calculateChallanTotal();
}

function refreshChallanCustomerDropdown() {
  let html = '<option>-- Select Customer --</option>';
  html += state.customers.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
  document.getElementById('challan-customer').innerHTML = html;
}

let currentInvoiceItems = [];

function addInvoiceItem() {
  currentInvoiceItems.push({ name: '', qty: 1, rate: 0, unit: '', category: '' });
  renderInvoiceItems();
}

function removeInvoiceItem(idx) {
  currentInvoiceItems.splice(idx, 1);
  renderInvoiceItems();
  calculateInvoiceTotal();
}

function renderInvoiceItems() {
  let html = '';
  currentInvoiceItems.forEach((item, idx) => {
    const amount = parseFloat(item.qty || 0) * parseFloat(item.rate || 0);
    html += `<div class="item-row"><div class="form-group" style="margin-bottom: 0; position: relative;"><input type="text" class="form-input item-input" id="item-name-${idx}" placeholder="Item name" value="${item.name}" onchange="currentInvoiceItems[${idx}].name = this.value; calculateInvoiceTotal();" oninput="showItemDropdown(${idx})"><div class="dropdown-list" id="dropdown-${idx}"></div></div><input type="text" class="form-input item-input item-readonly" id="item-unit-${idx}" placeholder="Unit" value="${item.unit}" readonly><input type="number" class="form-input item-input" min="1" step="0.01" value="${item.qty}" onchange="currentInvoiceItems[${idx}].qty = parseFloat(this.value) || 1; renderInvoiceItems(); calculateInvoiceTotal();" oninput="currentInvoiceItems[${idx}].qty = parseFloat(this.value) || 1; calculateInvoiceTotal();"><input type="number" class="form-input item-input item-readonly" step="0.01" value="${item.rate}" readonly placeholder="Rate"><div class="item-amount">${fmt(amount)}</div><button type="button" class="delete-btn" onclick="removeInvoiceItem(${idx})" style="width: 100%; padding: 12px 14px;">✕</button></div>`;
  });
  document.getElementById('inv-items').innerHTML = html;
}

function showItemDropdown(idx) {
  const input = document.getElementById(`item-name-${idx}`).value.toLowerCase();
  const dropdown = document.getElementById(`dropdown-${idx}`);
  
  if (!input) {
    dropdown.classList.remove('show');
    return;
  }
  
  const matches = state.items.filter(it => it.name.toLowerCase().includes(input));
  
  if (!matches.length) {
    dropdown.classList.remove('show');
    return;
  }
  
  let html = '';
  matches.slice(0, 8).forEach(item => {
    html += `<div class="dropdown-item" onclick="selectItem(${idx}, '${item.name.replace(/'/g, "\\'")}', ${item.price}, '${item.unit}', '${item.category}')"><strong>${item.name}</strong><small>₹${item.price.toFixed(2)} | ${item.unit || 'pcs'}</small></div>`;
  });
  
  dropdown.innerHTML = html;
  dropdown.classList.add('show');
}

function selectItem(idx, name, price, unit, category) {
  currentInvoiceItems[idx].name = name;
  currentInvoiceItems[idx].rate = price;
  currentInvoiceItems[idx].unit = unit;
  currentInvoiceItems[idx].category = category;
  
  document.getElementById(`item-name-${idx}`).value = name;
  document.getElementById(`item-unit-${idx}`).value = unit;
  document.getElementById(`dropdown-${idx}`).classList.remove('show');
  renderInvoiceItems();
  calculateInvoiceTotal();
}

function calculateInvoiceTotal() {
  const sub = currentInvoiceItems.reduce((s, i) => s + (parseFloat(i.qty || 0) * parseFloat(i.rate || 0)), 0);
  const disc = parseFloat(document.getElementById('inv-discount').value) || 0;
  const gstPct = parseFloat(document.getElementById('inv-gst').value) || 0;
  const afterDisc = Math.max(0, sub - disc);
  const gst = afterDisc * gstPct / 100;
  
  document.getElementById('inv-subtotal').textContent = fmt(sub);
  document.getElementById('inv-disc-show').textContent = fmt(disc);
  document.getElementById('inv-gst-show').textContent = fmt(gst);
  document.getElementById('inv-total').textContent = fmt(afterDisc + gst);
}

function saveInvoice() {
  const custName = document.getElementById('inv-customer').value;
  if (!custName || custName === '-- Select Customer --') { alert('Select customer'); return; }
  if (!currentInvoiceItems.filter(i => i.name.trim()).length) { alert('Add at least one item'); return; }
  
  const sub = currentInvoiceItems.reduce((s, i) => s + (parseFloat(i.qty || 0) * parseFloat(i.rate || 0)), 0);
  const disc = parseFloat(document.getElementById('inv-discount').value) || 0;
  const gstPct = parseFloat(document.getElementById('inv-gst').value) || 0;
  const afterDisc = Math.max(0, sub - disc);
  const gst = afterDisc * gstPct / 100;
  
  state.invoices.push({
    number: state.invoiceCounter++,
    customer: custName,
    date: document.getElementById('inv-date').value,
    due: document.getElementById('inv-due').value,
    items: [...currentInvoiceItems.filter(i => i.name.trim())],
    sub, disc, gstPct, gst,
    total: afterDisc + gst,
    status: document.getElementById('inv-status').value,
    notes: document.getElementById('inv-notes').value
  });
  
  saveState();
  refreshHome();
  refreshInvoices();
  closeModal('invoiceModal');
  resetInvoiceForm();
  alert('Invoice saved!');
}

function saveAndPreviewInvoice() {
  saveInvoice();
  setTimeout(() => previewInvoice(state.invoices.length - 1), 500);
}

function resetInvoiceForm() {
  document.getElementById('inv-number').value = 'INV-' + state.invoiceCounter;
  document.getElementById('inv-date').valueAsDate = new Date();
  const due = new Date();
  due.setDate(due.getDate() + 15);
  document.getElementById('inv-due').valueAsDate = due;
  document.getElementById('inv-customer').value = '-- Select Customer --';
  document.getElementById('inv-discount').value = '0';
  document.getElementById('inv-gst').value = '18';
  document.getElementById('inv-notes').value = '';
  document.getElementById('inv-status').value = 'pending';
  currentInvoiceItems = [{ name: '', qty: 1, rate: 0, unit: '', category: '' }];
  renderInvoiceItems();
  calculateInvoiceTotal();
}

function refreshInvoiceCustomerDropdown() {
  let html = '<option>-- Select Customer --</option>';
  html += state.customers.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
  document.getElementById('inv-customer').innerHTML = html;
}

function refreshReports() {
  const total = state.invoices.length;
  document.getElementById('total-customers').textContent = state.customers.length;
  document.getElementById('total-items').textContent = state.items.length;
  
  const now = new Date();
  const monthInvoices = state.invoices.filter(i => {
    const d = new Date(i.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  document.getElementById('monthly-revenue').textContent = fmt(monthInvoices.reduce((s, i) => s + i.total, 0));
  
  const paid = state.invoices.filter(i => i.status === 'paid').length;
  document.getElementById('collection-rate').textContent = total ? Math.round(paid / total * 100) + '%' : '0%';
  
  const statuses = { paid: 0, pending: 0, overdue: 0 };
  state.invoices.forEach(i => {
    if (statuses.hasOwnProperty(i.status)) statuses[i.status] += i.total;
  });
  
  const maxVal = Math.max(...Object.values(statuses), 1);
  let chartHtml = '';
  Object.entries(statuses).forEach(([status, val]) => {
    const colors = { paid: 'var(--secondary)', pending: 'var(--warning)', overdue: 'var(--danger)' };
    const labels = { paid: 'Paid', pending: 'Pending', overdue: 'Overdue' };
    const height = (val / maxVal) * 250;
    chartHtml += `<div style="display: flex; flex-direction: column; align-items: center;"><div style="height: ${height}px; width: 90px; background: linear-gradient(180deg, ${colors[status]} 0%, rgba(0,0,0,0.08) 100%); border-radius: 10px 10px 0 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);"></div><div style="font-weight: 700; margin-top: 14px; font-size: 14px;">${labels[status]}</div><div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${fmt(val)}</div></div>`;
  });
  document.getElementById('revenue-chart').innerHTML = chartHtml;
  
  const custTotals = {};
  state.invoices.forEach(i => {
    custTotals[i.customer] = (custTotals[i.customer] || 0) + i.total;
  });
  const top = Object.entries(custTotals).sort((a, b) => b[1] - a[1]).slice(0, 5);
  let html = '';
  if (!top.length) html = '<tr><td colspan="3" style="text-align: center; padding: 30px; color: var(--text-secondary);">No data yet</td></tr>';
  else html = top.map(([name, amt]) => `<tr><td style="font-weight: 600;">${name}</td><td>${state.invoices.filter(i => i.customer === name).length}</td><td><strong style="color: var(--primary);">${fmt(amt)}</strong></td></tr>`).join('');
  document.getElementById('top-customers').innerHTML = html;
}

function exportChallansCSV() {
  if (!state.challans.length) { alert('No challans to export'); return; }
  let csv = 'Challan No,Bill To,Items,Date,Total\n';
  state.challans.forEach(ch => {
    csv += `"${state.settings.challanPrefix}-${ch.number}","${ch.billTo}",${ch.items.length},${ch.date},${ch.total}\n`;
  });
  downloadCSV(csv, 'challans.csv');
}

function exportInvoicesCSV() {
  if (!state.invoices.length) { alert('No invoices to export'); return; }
  let csv = 'Invoice No,Customer,Date,Amount,Status\n';
  state.invoices.forEach(i => {
    csv += `"INV-${i.number}","${i.customer}",${i.date},${i.total},${i.status}\n`;
  });
  downloadCSV(csv, 'invoices.csv');
}

function exportItemsCSV() {
  if (!state.items.length) { alert('No items to export'); return; }
  let csv = 'Item Name,Price,Unit,Category,Description\n';
  state.items.forEach(it => {
    csv += `"${it.name}",${it.price},"${it.unit}","${it.category}","${it.desc}"\n`;
  });
  downloadCSV(csv, 'items.csv');
}

function exportCustomersCSV() {
  if (!state.customers.length) { alert('No customers to export'); return; }
  let csv = 'Name,Phone,Email,GST\n';
  state.customers.forEach(c => {
    csv += `"${c.name}","${c.phone}","${c.email}","${c.gst}"\n`;
  });
  downloadCSV(csv, 'customers.csv');
}

function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

function downloadJSON() {
  const json = JSON.stringify(state, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'smt_enterprises_backup_' + new Date().toISOString().split('T')[0] + '.json';
  a.click();
}

function loadSettings() {
  document.getElementById('biz-name').value = state.settings.bizName || '';
  document.getElementById('biz-gst').value = state.settings.gst || '';
  document.getElementById('biz-phone').value = state.settings.phone || '';
  document.getElementById('biz-email').value = state.settings.email || '';
  document.getElementById('biz-address').value = state.settings.address || '';
  document.getElementById('biz-city').value = state.settings.city || '';
  document.getElementById('biz-pan').value = state.settings.pan || '';
  document.getElementById('challan-prefix').value = state.settings.challanPrefix || 'CHN';
}

function saveSettings() {
  state.settings = {
    bizName: document.getElementById('biz-name').value.trim(),
    gst: document.getElementById('biz-gst').value.trim(),
    phone: document.getElementById('biz-phone').value.trim(),
    email: document.getElementById('biz-email').value.trim(),
    address: document.getElementById('biz-address').value.trim(),
    city: document.getElementById('biz-city').value.trim(),
    pan: document.getElementById('biz-pan').value.trim(),
    challanPrefix: document.getElementById('challan-prefix').value.trim() || 'CHN'
  };
  saveState();
  resetChallanForm();
  loadSettings();
  alert('Settings saved!');
}

function clearAllData() {
  localStorage.removeItem('smt_enterprises_app');
  location.reload();
}

function fmt(n) {
  return '₹' + parseFloat(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function numberToWords(num) {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const scales = ['', 'Thousand', 'Lakh', 'Crore'];
  
  if (num === 0) return 'Zero';
  
  let words = '';
  let scaleIndex = 0;
  
  while (num > 0) {
    let groupValue = num % (scaleIndex === 0 ? 1000 : 100);
    num = Math.floor(num / (scaleIndex === 0 ? 1000 : 100));
    
    if (groupValue > 0) {
      let groupWords = '';
      
      if (groupValue >= 100) {
        groupWords += ones[Math.floor(groupValue / 100)] + ' Hundred ';
        groupValue %= 100;
      }
      
      if (groupValue >= 20) {
        groupWords += tens[Math.floor(groupValue / 10)];
        if (groupValue % 10 > 0) groupWords += ' ' + ones[groupValue % 10];
      } else if (groupValue >= 10) {
        groupWords += teens[groupValue - 10];
      } else if (groupValue > 0) {
        groupWords += ones[groupValue];
      }
      
      if (scales[scaleIndex]) words = groupWords + ' ' + scales[scaleIndex] + ' ' + words;
      else words = groupWords + ' ' + words;
    }
    
    scaleIndex++;
  }
  
  return words.trim();
}

document.getElementById('upload-zone').addEventListener('click', () => document.getElementById('excel-file').click());

function handleDragOver(e) {
  e.preventDefault();
  document.getElementById('upload-zone').style.background = 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(37,99,235,0.08) 100%)';
}

function handleDragLeave(e) {
  document.getElementById('upload-zone').style.background = 'linear-gradient(135deg, var(--bg-accent) 0%, rgba(37,99,235,0.03) 100%)';
}

function handleDrop(e) {
  e.preventDefault();
  document.getElementById('upload-zone').style.background = 'linear-gradient(135deg, var(--bg-accent) 0%, rgba(37,99,235,0.03) 100%)';
  handleFileSelect({ target: { files: e.dataTransfer.files } });
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      let rows = [];
      if (file.name.endsWith('.csv')) {
        const text = event.target.result;
        rows = text.split('\n').map(line => line.split(',').map(cell => cell.trim().replace(/^"|"$/g, '')));
      } else {
        const wb = XLSX.read(event.target.result, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      }
      parseExcelRows(rows);
    } catch (err) {
      alert('Error reading file: ' + err.message);
    }
  };
  
  if (file.name.endsWith('.csv')) reader.readAsText(file);
  else reader.readAsArrayBuffer(file);
}

function parseExcelRows(rows) {
  if (!rows || rows.length < 2) { alert('No data found'); return; }
  
  const header = rows[0].map(h => String(h).toLowerCase().trim());
  let nameIdx = -1, priceIdx = -1, unitIdx = -1, catIdx = -1, descIdx = -1;
  
  header.forEach((h, i) => {
    if (/item.?name|name|item|product/i.test(h)) nameIdx = i;
    if (/price|rate|cost|amount|mrp/i.test(h)) priceIdx = i;
    if (/unit|uom|measure/i.test(h)) unitIdx = i;
    if (/cat|category|group/i.test(h)) catIdx = i;
    if (/desc|description/i.test(h)) descIdx = i;
  });
  
  if (nameIdx === -1) nameIdx = 0;
  if (priceIdx === -1) priceIdx = 1;
  
  const parsed = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const name = String(row[nameIdx] || '').trim();
    const price = parseFloat(row[priceIdx]) || 0;
    if (!name || price <= 0) continue;
    
    parsed.push({
      name,
      price,
      unit: unitIdx >= 0 ? String(row[unitIdx] || '').trim() : '',
      category: catIdx >= 0 ? String(row[catIdx] || '').trim() : '',
      desc: descIdx >= 0 ? String(row[descIdx] || '').trim() : ''
    });
  }
  
  if (!parsed.length) { alert('No valid items found'); return; }
  
  let added = 0, skipped = 0;
  parsed.forEach(item => {
    if (state.items.find(x => x.name.toLowerCase() === item.name.toLowerCase())) {
      skipped++;
      return;
    }
    state.items.push(item);
    added++;
  });
  
  saveState();
  refreshItems();
  closeModal('uploadModal');
  document.getElementById('excel-file').value = '';
  alert(`Imported ${added} items${skipped > 0 ? ` (${skipped} duplicates skipped)` : ''}!`);
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('challan-date').valueAsDate = new Date();
  document.getElementById('challan-number').value = state.settings.challanPrefix + '-' + state.challanCounter;
  document.getElementById('inv-date').valueAsDate = new Date();
  const due = new Date();
  due.setDate(due.getDate() + 15);
  document.getElementById('inv-due').valueAsDate = due;
  document.getElementById('inv-number').value = 'INV-' + state.invoiceCounter;
  
  loadSettings();
  refreshChallanCustomerDropdown();
  refreshInvoiceCustomerDropdown();
  addChallanItem();
  addInvoiceItem();
  refreshHome();
  
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('show');
    });
  });
  
  document.addEventListener('click', e => {
    document.querySelectorAll('.dropdown-list').forEach(d => {
      if (!d.contains(e.target) && !e.target.closest('.form-group')) {
        d.classList.remove('show');
      }
    });
  });
});
