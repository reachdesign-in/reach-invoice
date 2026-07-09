const React = window.React;
const { createRoot } = window.ReactDOM;
const DEFAULT_LOGO = window.REACH_DEFAULT_LOGO || './src/assets/reach-design-logo.svg';

function StudioIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

const BarChart3 = StudioIcon;
const BriefcaseBusiness = StudioIcon;
const Building2 = StudioIcon;
const Calculator = StudioIcon;
const Check = StudioIcon;
const ChevronRight = StudioIcon;
const CircleDollarSign = StudioIcon;
const ClipboardList = StudioIcon;
const Copy = StudioIcon;
const Download = StudioIcon;
const Eye = StudioIcon;
const FileDown = StudioIcon;
const FileText = StudioIcon;
const FolderKanban = StudioIcon;
const Home = StudioIcon;
const IndianRupee = StudioIcon;
const Menu = StudioIcon;
const Pencil = StudioIcon;
const Plus = StudioIcon;
const Printer = StudioIcon;
const ReceiptIndianRupee = StudioIcon;
const RotateCcw = StudioIcon;
const Save = StudioIcon;
const Search = StudioIcon;
const Settings = StudioIcon;
const Share2 = StudioIcon;
const ShoppingBag = StudioIcon;
const Trash2 = StudioIcon;
const Upload = StudioIcon;
const WalletCards = StudioIcon;
const X = StudioIcon;

const STORAGE_KEYS = [
  'clients',
  'services',
  'quotations',
  'invoices',
  'payments',
  'projects',
  'expenses',
  'companySettings',
  'activities'
];

const today = () => new Date().toISOString().slice(0, 10);
const monthStart = () => new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10);
const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const money = (value) => `₹${Number(value || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
const percent = (value) => `${Number(value || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}%`;
const formatNumber = (value) => Number(value || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });
const formatDate = (value) => {
  const match = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  return match ? `${match[3]}-${match[2]}-${match[1]}` : value || '-';
};
const formatDateTime = (value) => {
  if (!value) return '-';
  const date = new Date(value);
  return `${formatDate(date.toISOString().slice(0, 10))} ${date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
};
const API_BASE = window.REACH_API_BASE || (window.location.protocol === 'file:' ? 'http://localhost:3000' : window.location.origin);

async function apiRequest(path, { method = 'GET', token, body } = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}

const emptySettings = {
  companyName: 'REACH Design',
  logo: DEFAULT_LOGO,
  phone: '',
  email: '',
  address: '',
  gstNumber: '',
  bankDetails: '',
  upiId: '',
  invoicePrefix: 'INV',
  quotationPrefix: 'QT',
  terms: 'Payment due as per agreed terms. Goods once printed cannot be returned after approval.'
};

const serviceSeed = [
  ['Logo Design', 'Branding', 'Custom logo concept and final artwork', '998391', 'Project', 12000, 18, 'Design'],
  ['Brand Identity', 'Branding', 'Visual identity system and brand usage guide', '998391', 'Project', 35000, 18, 'Design'],
  ['Website Design', 'Website', 'Responsive website UI design', '998314', 'Page', 6000, 18, 'Website'],
  ['Website Development', 'Website', 'Frontend website development', '998314', 'Page', 8500, 18, 'Website'],
  ['Brochure Design', 'Design', 'Brochure layout design', '998391', 'Page', 1800, 18, 'Design'],
  ['Catalogue Design', 'Design', 'Catalogue design and print-ready file', '998391', 'Page', 1500, 18, 'Design'],
  ['Flex Printing', 'Printing', 'Large format flex print', '491110', 'Sq.ft', 35, 18, 'Printing'],
  ['Vinyl Printing', 'Printing', 'Vinyl print per square foot', '391990', 'Sq.ft', 95, 18, 'Printing'],
  ['Mounting', 'Installation', 'Board mounting service', '998719', 'Sq.ft', 30, 18, 'Installation'],
  ['Pasting', 'Installation', 'On-site pasting service', '998719', 'Sq.ft', 20, 18, 'Installation'],
  ['Visiting Cards', 'Stationery', 'Business card printing', '491110', 'Box', 850, 18, 'Printing'],
  ['Letterheads', 'Stationery', 'Letterhead printing', '491110', 'Set', 1200, 18, 'Printing'],
  ['Social Media Creative', 'Creative Design', 'Social media post creative design', '998391', 'Creative', 2000, 18, 'Design'],
  ['Mainline Creative', 'Creative Design', 'Mainline advertising creative design', '998391', 'Creative', 10000, 18, 'Design'],
  ['Paid Media Creative', 'Creative Design', 'Paid media advertising creative design', '998391', 'Creative', 7000, 18, 'Design']
].map(([name, category, description, hsn, unit, rate, gst, type]) => ({
  id: uid(),
  name,
  category,
  description,
  hsn,
  unit,
  rate,
  gst,
  type
}));

const navItems = [
  ['dashboard', 'Dashboard', Home],
  ['clients', 'Clients', Building2],
  ['services', 'Services', BriefcaseBusiness],
  ['quotations', 'Quotations', FileText],
  ['invoices', 'Invoices', ReceiptIndianRupee],
  ['payments', 'Payments', WalletCards],
  ['projects', 'Projects', FolderKanban],
  ['calculator', 'Print Calculator', Calculator],
  ['expenses', 'Expenses', ShoppingBag],
  ['reports', 'Reports', BarChart3],
  ['export', 'Export', FileDown],
  ['settings', 'Settings', Settings]
];

const fieldLabels = {
  name: 'Client Name',
  company: 'Company Name',
  mobile: 'Mobile',
  email: 'Email',
  gst: 'GST Number',
  billingAddress: 'Billing Address',
  shippingAddress: 'Shipping Address',
  clientId: 'Client',
  city: 'City',
  state: 'State',
  pin: 'PIN Code',
  notes: 'Notes',
  category: 'Category',
  description: 'Description',
  hsn: 'HSN/SAC Code',
  unit: 'Unit',
  rate: 'Default Rate',
  type: 'Type',
  vendorName: 'Vendor Name',
  amount: 'Amount',
  billNumber: 'Bill Number',
  paymentMode: 'Payment Mode',
  projectName: 'Project Name',
  projectType: 'Project Type',
  startDate: 'Start Date',
  deadline: 'Deadline',
  assignedTo: 'Assigned To',
  projectValue: 'Project Value',
  advanceReceived: 'Advance Received',
  transactionId: 'Transaction ID'
};

function splitAddress(address) {
  const parts = String(address || '').split(',').map((part) => part.trim()).filter(Boolean);
  if (parts.length < 2) return [String(address || '')];
  const midpoint = Math.ceil(parts.join(', ').length / 2);
  let length = 0;
  let splitAt = 1;
  for (let index = 0; index < parts.length - 1; index += 1) {
    length += parts[index].length + (index ? 2 : 0);
    splitAt = index + 1;
    if (length >= midpoint) break;
  }
  return [parts.slice(0, splitAt).join(', '), parts.slice(splitAt).join(', ')];
}

function lineTotals(line) {
  const qty = Number(line.qty || 0);
  const rate = Number(line.rate || 0);
  const discount = Number(line.discount || 0);
  const gst = Number(line.gst || 0);
  const base = qty * rate;
  const taxable = Math.max(base - discount, 0);
  const gstAmount = taxable * gst / 100;
  return { base, taxable, gstAmount, total: taxable + gstAmount };
}

function documentTotals(items = []) {
  return items.reduce((acc, item) => {
    const total = lineTotals(item);
    acc.subtotal += total.taxable;
    acc.gst += total.gstAmount;
    acc.discount += Number(item.discount || 0);
    acc.grandTotal += total.total;
    return acc;
  }, { subtotal: 0, gst: 0, discount: 0, grandTotal: 0 });
}

function download(filename, text, type = 'text/plain;charset=utf-8') {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function toCsv(rows) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const esc = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  return [headers.map(esc).join(','), ...rows.map((row) => headers.map((header) => esc(row[header])).join(','))].join('\n');
}

function shareText(text, toast) {
  if (navigator.share) {
    navigator.share({ text }).catch(() => navigator.clipboard?.writeText(text));
    toast('Share sheet opened');
  } else {
    navigator.clipboard?.writeText(text);
    toast('Share text copied');
  }
}

function App() {
  const [auth, setAuth] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem('reachInvoiceAuth') || 'null');
    } catch {
      return null;
    }
  });
  const [active, setActive] = React.useState('dashboard');
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [toast, setToast] = React.useState('');
  const [hydrated, setHydrated] = React.useState(false);
  const [syncPaused, setSyncPaused] = React.useState(true);
  const syncTimers = React.useRef({});
  const [clients, setClients] = React.useState([]);
  const [services, setServices] = React.useState(serviceSeed);
  const [quotations, setQuotations] = React.useState([]);
  const [invoices, setInvoices] = React.useState([]);
  const [payments, setPayments] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [expenses, setExpenses] = React.useState([]);
  const [settings, setSettings] = React.useState(emptySettings);
  const [activities, setActivities] = React.useState([]);

  const applyCloudState = (state = {}) => {
    setSyncPaused(true);
    setClients(state.clients || []);
    setServices((state.services && state.services.length) ? state.services : serviceSeed);
    setQuotations(state.quotations || []);
    setInvoices(state.invoices || []);
    setPayments(state.payments || []);
    setProjects(state.projects || []);
    setExpenses(state.expenses || []);
    setSettings({ ...emptySettings, ...(state.companySettings || {}) });
    setActivities(state.activities || []);
    window.setTimeout(() => {
      setHydrated(true);
      setSyncPaused(false);
    }, 0);
  };

  const saveAuth = (nextAuth) => {
    setAuth(nextAuth);
    if (nextAuth) localStorage.setItem('reachInvoiceAuth', JSON.stringify(nextAuth));
    else localStorage.removeItem('reachInvoiceAuth');
  };

  React.useEffect(() => {
    if (!hydrated) return;
    setInvoices((items) => items.map((item) => item.id ? item : { ...item, id: uid() }));
    setQuotations((items) => items.map((item) => item.id ? item : { ...item, id: uid() }));
    setSettings((current) => ({
      ...current,
      companyName: !current.companyName || current.companyName === 'Your Creative Studio' ? 'REACH Design' : current.companyName,
      logo: current.logo || DEFAULT_LOGO
    }));
    const requested = serviceSeed.filter((service) => ['Social Media Creative', 'Mainline Creative', 'Paid Media Creative'].includes(service.name));
    setServices((items) => [
      ...items,
      ...requested.filter((service) => !items.some((item) => item.name?.toLowerCase() === service.name.toLowerCase()))
    ]);
  }, [hydrated]);

  const data = { clients, services, quotations, invoices, payments, projects, expenses, settings, activities };
  const setters = { setClients, setServices, setQuotations, setInvoices, setPayments, setProjects, setExpenses, setSettings, setActivities };

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => setToast(''), 2400);
  };

  const loadCloudState = React.useCallback(() => {
    if (!auth?.token) return Promise.resolve();
    return apiRequest('/api/app-state', { token: auth.token }).then(applyCloudState);
  }, [auth?.token]);

  React.useEffect(() => {
    if (!auth?.token) return;
    setHydrated(false);
    setSyncPaused(true);
    loadCloudState().catch((error) => {
      notify(error.message === 'Unauthorized' ? 'Please login again' : error.message);
      if (error.message === 'Unauthorized') saveAuth(null);
    });
  }, [auth?.token, loadCloudState]);

  React.useEffect(() => {
    if (!auth?.token) return;
    const interval = window.setInterval(() => {
      if (!syncPaused) loadCloudState().catch(() => {});
    }, 30000);
    const onFocus = () => {
      if (!syncPaused) loadCloudState().catch(() => {});
    };
    window.addEventListener('focus', onFocus);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, [auth?.token, syncPaused, loadCloudState]);

  const queueSync = (key, value) => {
    if (!auth?.token || !hydrated || syncPaused) return;
    window.clearTimeout(syncTimers.current[key]);
    syncTimers.current[key] = window.setTimeout(() => {
      apiRequest(`/api/app-state/${key}`, { method: 'PUT', token: auth.token, body: { data: value } })
        .catch((error) => notify(`Cloud save failed: ${error.message}`));
    }, 450);
  };

  React.useEffect(() => queueSync('clients', clients), [clients]);
  React.useEffect(() => queueSync('services', services), [services]);
  React.useEffect(() => queueSync('quotations', quotations), [quotations]);
  React.useEffect(() => queueSync('invoices', invoices), [invoices]);
  React.useEffect(() => queueSync('payments', payments), [payments]);
  React.useEffect(() => queueSync('projects', projects), [projects]);
  React.useEffect(() => queueSync('expenses', expenses), [expenses]);
  React.useEffect(() => queueSync('companySettings', settings), [settings]);
  React.useEffect(() => queueSync('activities', activities), [activities]);

  const addActivity = (text) => setActivities((items) => [{ id: uid(), date: new Date().toISOString(), text }, ...items].slice(0, 80));

  const navigate = (id) => {
    setActive(id);
    setMenuOpen(false);
  };

  const resetData = () => {
    if (!confirm('Delete all cloud data for this company?')) return;
    setClients([]);
    setServices(serviceSeed);
    setQuotations([]);
    setInvoices([]);
    setPayments([]);
    setProjects([]);
    setExpenses([]);
    setSettings(emptySettings);
    setActivities([]);
    apiRequest('/api/app-state/reset', { method: 'POST', token: auth.token, body: {} }).catch((error) => notify(error.message));
    notify('Cloud data reset');
  };

  const importCloudBackup = async (backup) => {
    await apiRequest('/api/app-state/import', { method: 'POST', token: auth.token, body: backup });
    applyCloudState(backup);
  };

  const logout = () => {
    saveAuth(null);
    setHydrated(false);
    setSyncPaused(true);
  };

  if (!auth?.token) {
    return <AuthScreen onAuth={saveAuth} />;
  }

  if (!hydrated) {
    return <div className="loading-screen">Loading REACH INVOICE cloud data...</div>;
  }

  const context = { data, setters, notify, addActivity, navigate, importCloudBackup };
  const screens = {
    dashboard: <Dashboard ctx={context} />,
    clients: <Clients ctx={context} />,
    services: <Services ctx={context} />,
    quotations: <Quotations ctx={context} />,
    invoices: <Invoices ctx={context} />,
    payments: <Payments ctx={context} />,
    projects: <Projects ctx={context} />,
    calculator: <PrintCalculator ctx={context} />,
    expenses: <Expenses ctx={context} />,
    reports: <Reports ctx={context} />,
    export: <ExportImport ctx={context} resetData={resetData} />,
    settings: <CompanySettings ctx={context} />
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-lockup">
            <img src={DEFAULT_LOGO} alt="Reach Design" />
            <span>INVOICE</span>
          </div>
        </div>
        <nav>
          {navItems.map(([id, label]) => (
            <button className={active === id ? 'active' : ''} key={id} onClick={() => navigate(id)}>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>
      <main>
        <header className="topbar">
          <button className="mobile-only" onClick={() => setMenuOpen(true)}>Menu</button>
          <div className="topbar-title">
            <h1>{navItems.find(([id]) => id === active)?.[1]}</h1>
            <p>{formatDate(today())}</p>
          </div>
          <div className="topbar-actions">
            <button className="ghost topbar-action" onClick={() => navigate('settings')}>
              <i className="fa-solid fa-building" />
              <span>Company</span>
            </button>
            <button className="ghost topbar-action" onClick={logout}>
              <i className="fa-solid fa-right-from-bracket" />
              <span>Logout</span>
            </button>
          </div>
        </header>
        {menuOpen && <button className="scrim" onClick={() => setMenuOpen(false)} aria-label="Close menu" />}
        {screens[active]}
      </main>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function AuthScreen({ onAuth }) {
  const [mode, setMode] = React.useState('login');
  const [form, setForm] = React.useState({ email: '', password: '', companyName: 'REACH Design' });
  const [message, setMessage] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const isRegister = mode === 'register';
  const isForgot = mode === 'forgot';
  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      if (isForgot) {
        await apiRequest('/api/auth/forgot-password', { method: 'POST', body: { email: form.email } });
        setMessage('Password reset instructions sent if the email exists.');
      } else {
        const result = await apiRequest(isRegister ? '/api/auth/register' : '/api/auth/login', {
          method: 'POST',
          body: {
            email: form.email,
            password: form.password,
            companyName: form.companyName
          }
        });
        onAuth(result);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <img src={DEFAULT_LOGO} alt="Reach Design" />
        <span>INVOICE</span>
        <h1>{isRegister ? 'Create cloud account' : isForgot ? 'Reset password' : 'Login to billing'}</h1>
        <p>Your invoices, clients, payments and company settings will sync online after login.</p>
        <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        {!isForgot && <label>Password<input type="password" required minLength="8" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>}
        {isRegister && <label>Company Name<input value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} /></label>}
        {message && <div className="auth-message">{message}</div>}
        <button disabled={busy}>{busy ? 'Please wait...' : isRegister ? 'Create Account' : isForgot ? 'Send Reset Link' : 'Login'}</button>
        <div className="auth-links">
          <button type="button" className="ghost" onClick={() => setMode(isRegister ? 'login' : 'register')}>{isRegister ? 'I already have an account' : 'Create new account'}</button>
          <button type="button" className="ghost" onClick={() => setMode(isForgot ? 'login' : 'forgot')}>{isForgot ? 'Back to login' : 'Forgot password'}</button>
        </div>
      </form>
    </main>
  );
}

function Dashboard({ ctx }) {
  const { data, navigate } = ctx;
  const [selectedStat, setSelectedStat] = React.useState(null);
  const completed = data.projects.filter((item) => item.status === 'Completed').length;
  const activeProjects = data.projects.filter((item) => !['Completed', 'Cancelled'].includes(item.status)).length;
  const invoiceRevenue = data.invoices.reduce((sum, item) => sum + Number(item.grandTotal || 0), 0);
  const paid = data.invoices.reduce((sum, item) => sum + Number(item.paidAmount || 0), 0);
  const pending = data.invoices.reduce((sum, item) => sum + Math.max(Number(item.grandTotal || 0) - Number(item.paidAmount || 0), 0), 0);
  const collectionTotal = paid + pending;
  const paidPercent = collectionTotal ? Math.round((paid / collectionTotal) * 100) : 0;
  const paidArc = `${paidPercent} ${100 - paidPercent}`;
  const monthSales = data.invoices.filter((item) => item.date >= monthStart()).reduce((sum, item) => sum + Number(item.grandTotal || 0), 0);
  const clientIncome = data.clients.map((client) => {
    const invoices = data.invoices.filter((invoice) => invoice.clientId === client.id);
    const billed = invoices.reduce((sum, invoice) => sum + Number(invoice.grandTotal || 0), 0);
    const received = invoices.reduce((sum, invoice) => sum + Number(invoice.paidAmount || 0), 0);
    return { ...client, billed, received, outstanding: Math.max(billed - received, 0), invoiceCount: invoices.length };
  }).filter((client) => client.billed > 0).sort((a, b) => b.billed - a.billed);
  const maxClientIncome = Math.max(1, ...clientIncome.map((client) => client.billed));
  const stats = [
    ['revenue', 'Total Revenue', money(invoiceRevenue), 'fa-indian-rupee-sign'],
    ['pending', 'Pending Payments', money(pending), 'fa-clock'],
    ['clients', 'Total Clients', data.clients.length, 'fa-users'],
    ['activeProjects', 'Active Projects', activeProjects, 'fa-briefcase'],
    ['completedProjects', 'Completed Projects', completed, 'fa-circle-check'],
    ['monthSales', 'This Month Sales', money(monthSales), 'fa-chart-line'],
    ['unpaidInvoices', 'Unpaid Invoices', data.invoices.filter((item) => Number(item.balanceAmount || 0) > 0).length, 'fa-file-invoice-dollar'],
    ['customReport', 'Custom Report', 'Build Report', 'fa-calendar-days']
  ];
  return (
    <section className="page">
      <div className="stat-grid">
        {stats.map(([id, label, value, icon]) => (
          <button className="stat stat-card" key={id} onClick={() => setSelectedStat(id)}>
            <i aria-hidden="true" className={`fa-solid ${icon}`} />
            <span>{label}</span>
            <strong>{value}</strong>
            <small>View details</small>
          </button>
        ))}
      </div>
      <div className="quickbar">
        <button onClick={() => navigate('quotations')}>Create Quotation</button>
        <button onClick={() => navigate('invoices')}>Create Invoice</button>
        <button onClick={() => navigate('clients')}>Add Client</button>
        <button onClick={() => navigate('projects')}>Add Project</button>
        <button onClick={() => navigate('export')}>Export Data</button>
      </div>
      <section className="revenue-chart">
        <div className="chart-copy">
          <span className="eyebrow">Invoice Collection</span>
          <h2>Payment Overview</h2>
          <p>See how much invoiced revenue has been received and how much is still outstanding.</p>
          <div className="chart-legend">
            <div><i className="legend-paid" /><span>Received<strong>{money(paid)}</strong></span></div>
            <div><i className="legend-pending" /><span>Outstanding<strong>{money(pending)}</strong></span></div>
          </div>
        </div>
        <div className="donut-wrap" aria-label={`${paidPercent}% of invoiced revenue received`}>
          <svg className="donut-chart" viewBox="0 0 42 42" role="img">
            <circle className="donut-base" cx="21" cy="21" r="15.9155" />
            <circle className="donut-paid" cx="21" cy="21" r="15.9155" strokeDasharray={paidArc} strokeDashoffset="25" />
          </svg>
          <div className="donut-label"><strong>{paidPercent}%</strong><span>received</span></div>
        </div>
      </section>
      <div className="two-col">
        <Panel title="Income by Client">
          <div className="client-income-head">
            <span><i className="income-received" />Received</span>
            <span><i className="income-outstanding" />Outstanding</span>
          </div>
          <div className="client-income-chart">
            {clientIncome.slice(0, 7).map((client, index) => {
              const receivedPercent = client.billed ? (client.received / client.billed) * 100 : 0;
              return (
                <div className="client-income-row" key={client.id}>
                  <div className="client-income-label"><span><b>{index + 1}</b>{client.name}</span><small>{client.invoiceCount} invoice{client.invoiceCount === 1 ? '' : 's'}</small></div>
                  <div className="client-income-value"><strong>{money(client.billed)}</strong><small>{money(client.received)} received</small></div>
                  <div className="client-income-track">
                    <div className="client-income-bar" style={{ width: `${Math.max((client.billed / maxClientIncome) * 100, 4)}%` }}>
                      <span className="income-paid-part" style={{ width: `${receivedPercent}%` }} />
                      <span className="income-due-part" style={{ width: `${100 - receivedPercent}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
            {!clientIncome.length && <Empty text="Client income will appear after invoices are created." />}
          </div>
        </Panel>
        <Panel title="Pending Invoices">
          <div className="mini-list">
            {data.invoices.filter((item) => Number(item.balanceAmount || 0) > 0).slice(0, 8).map((invoice) => (
              <div key={invoice.id}>
                <span>{invoice.number}</span>
                <strong>{money(invoice.balanceAmount)}</strong>
              </div>
            ))}
            {!data.invoices.some((item) => Number(item.balanceAmount || 0) > 0) && <Empty text="No unpaid invoices." />}
          </div>
        </Panel>
      </div>
      <div className="dashboard-activity">
        <Panel title="Recent Activities">
          <div className="activity-list">
            {data.activities.length ? data.activities.slice(0, 10).map((item) => (
              <div key={item.id}>
                <span>{formatDateTime(item.date)}</span>
                <strong>{item.text}</strong>
              </div>
            )) : <Empty text="No activities yet. Start by adding a client or quotation." />}
          </div>
        </Panel>
      </div>
      {selectedStat && (
        <Modal title={stats.find(([id]) => id === selectedStat)?.[1] || 'Dashboard Details'} onClose={() => setSelectedStat(null)} wide>
          <DashboardStatPreview type={selectedStat} data={data} invoiceRevenue={invoiceRevenue} paid={paid} pending={pending} monthSales={monthSales} />
        </Modal>
      )}
    </section>
  );
}

function DashboardStatPreview({ type, data, invoiceRevenue, paid, pending, monthSales }) {
  if (type === 'customReport') return <DashboardCustomReport data={data} />;
  const unpaid = data.invoices.filter((item) => Number(item.balanceAmount || 0) > 0);
  const active = data.projects.filter((item) => !['Completed', 'Cancelled'].includes(item.status));
  const completed = data.projects.filter((item) => item.status === 'Completed');
  const monthly = data.invoices.filter((item) => item.date >= monthStart());
  const client = (id) => data.clients.find((item) => item.id === id)?.name || 'No client';

  if (type === 'revenue') return (
    <div className="dashboard-preview">
      <div className="preview-summary"><span>Total invoiced<strong>{money(invoiceRevenue)}</strong></span><span>Received<strong>{money(paid)}</strong></span><span>Outstanding<strong>{money(pending)}</strong></span></div>
      <PreviewRows rows={data.invoices} empty="No invoices yet." render={(invoice) => <><span>{invoice.number}<small>{client(invoice.clientId)}</small></span><strong>{money(invoice.grandTotal)}</strong></>} />
    </div>
  );
  if (type === 'pending' || type === 'unpaidInvoices') return (
    <div className="dashboard-preview">
      <div className="preview-summary"><span>Outstanding total<strong>{money(pending)}</strong></span><span>Unpaid invoices<strong>{unpaid.length}</strong></span></div>
      <PreviewRows rows={unpaid} empty="No pending payments." render={(invoice) => <><span>{invoice.number}<small>{client(invoice.clientId)} · Due {formatDate(invoice.dueDate)}</small></span><strong>{money(invoice.balanceAmount)}</strong></>} />
    </div>
  );
  if (type === 'clients') return (
    <div className="dashboard-preview">
      <div className="preview-summary"><span>Total clients<strong>{data.clients.length}</strong></span></div>
      <PreviewRows rows={data.clients} empty="No clients yet." render={(item) => <><span>{item.name}<small>{item.company || item.email || 'No company details'}</small></span><strong>{data.invoices.filter((invoice) => invoice.clientId === item.id).length} invoices</strong></>} />
    </div>
  );
  if (type === 'activeProjects' || type === 'completedProjects') {
    const rows = type === 'activeProjects' ? active : completed;
    return <div className="dashboard-preview"><div className="preview-summary"><span>{type === 'activeProjects' ? 'Active projects' : 'Completed projects'}<strong>{rows.length}</strong></span></div><PreviewRows rows={rows} empty="No projects in this category." render={(project) => <><span>{project.projectName}<small>{client(project.clientId)} · {project.status}</small></span><strong>{money(project.projectValue)}</strong></>} /></div>;
  }
  return (
    <div className="dashboard-preview">
      <div className="preview-summary"><span>This month sales<strong>{money(monthSales)}</strong></span><span>Invoices created<strong>{monthly.length}</strong></span></div>
      <PreviewRows rows={monthly} empty="No invoices this month." render={(invoice) => <><span>{invoice.number}<small>{client(invoice.clientId)} · {formatDate(invoice.date)}</small></span><strong>{money(invoice.grandTotal)}</strong></>} />
    </div>
  );
}

function DashboardCustomReport({ data }) {
  const currentMonth = today().slice(0, 7);
  const currentYear = today().slice(0, 4);
  const [mode, setMode] = React.useState('month');
  const [month, setMonth] = React.useState(currentMonth);
  const [year, setYear] = React.useState(currentYear);
  const [from, setFrom] = React.useState(`${currentYear}-01-01`);
  const [to, setTo] = React.useState(today());
  const inRange = (date) => {
    if (!date) return false;
    if (mode === 'month') return date.startsWith(month);
    if (mode === 'year') return date.startsWith(year);
    return (!from || date >= from) && (!to || date <= to);
  };
  const invoices = data.invoices.filter((item) => inRange(item.date));
  const sales = invoices.reduce((sum, item) => sum + Number(item.grandTotal || 0), 0);
  const received = invoices.reduce((sum, item) => sum + Number(item.paidAmount || 0), 0);
  const expenses = data.expenses.filter((item) => inRange(item.date)).reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const outstanding = invoices.reduce((sum, item) => sum + Number(item.balanceAmount || 0), 0);
  const netCash = received - expenses;
  const client = (id) => data.clients.find((item) => item.id === id)?.name || 'No client';
  const label = mode === 'month'
    ? month ? new Date(`${month}-01T00:00:00`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'Select a month'
    : mode === 'year' ? year : `${from ? formatDate(from) : 'Start'} to ${to ? formatDate(to) : 'Today'}`;

  return (
    <div className="custom-report">
      <div className="report-modes">
        <button className={mode === 'month' ? 'active' : ''} onClick={() => setMode('month')}>Month</button>
        <button className={mode === 'year' ? 'active' : ''} onClick={() => setMode('year')}>Year</button>
        <button className={mode === 'custom' ? 'active' : ''} onClick={() => setMode('custom')}>Custom Dates</button>
      </div>
      <div className="report-period">
        {mode === 'month' && <Field label="Select Month" type="month" value={month} onChange={setMonth} />}
        {mode === 'year' && <Field label="Enter Year" type="number" value={year} onChange={setYear} />}
        {mode === 'custom' && <><ModernDateField label="From Date" value={from} onChange={setFrom} /><ModernDateField label="To Date" value={to} onChange={setTo} /></>}
      </div>
      <div className="report-heading"><span>Report Period</span><strong>{label}</strong></div>
      <div className="report-metrics">
        <span>Total Sales<strong>{money(sales)}</strong></span>
        <span>Payments Received<strong>{money(received)}</strong></span>
        <span>Outstanding<strong>{money(outstanding)}</strong></span>
        <span>Expenses<strong>{money(expenses)}</strong></span>
        <span>Net Cash Flow<strong className={netCash < 0 ? 'negative' : ''}>{money(netCash)}</strong></span>
        <span>Invoices<strong>{invoices.length}</strong></span>
      </div>
      <PreviewRows rows={invoices} empty="No invoices found for this period." render={(invoice) => <><span>{invoice.number}<small>{client(invoice.clientId)} · {formatDate(invoice.date)}</small></span><strong>{money(invoice.grandTotal)}</strong></>} />
    </div>
  );
}

function ModernDateField({ label, value, onChange }) {
  const selected = value ? new Date(`${value}T00:00:00`) : new Date();
  const [open, setOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState(() => new Date(selected.getFullYear(), selected.getMonth(), 1));
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();
  const cells = Array.from({ length: 42 }, (_, index) => {
    const day = index - firstDay + 1;
    if (day < 1) return new Date(year, month - 1, previousMonthDays + day);
    if (day > daysInMonth) return new Date(year, month + 1, day - daysInMonth);
    return new Date(year, month, day);
  });
  const toValue = (date) => {
    const pad = (number) => String(number).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  };
  const choose = (date) => {
    onChange(toValue(date));
    setViewDate(new Date(date.getFullYear(), date.getMonth(), 1));
    setOpen(false);
  };
  const todayValue = toValue(new Date());
  return (
    <label className={`field modern-date-field ${label ? '' : 'compact-date'}`}>
      {label && <span>{label}</span>}
      <button className="date-trigger" type="button" onClick={() => setOpen((current) => !current)}>
        <span>{value ? formatDate(value) : 'Select date'}</span>
        <i aria-hidden="true" className="fa-solid fa-calendar-days" />
      </button>
      {open && (
        <div className="modern-calendar">
          <div className="calendar-head">
            <div><strong>{viewDate.toLocaleDateString('en-IN', { month: 'long' })}</strong><span>{year}</span></div>
            <div>
              <button aria-label="Previous month" type="button" onClick={() => setViewDate(new Date(year, month - 1, 1))}><i className="fa-solid fa-chevron-left" /></button>
              <button aria-label="Next month" type="button" onClick={() => setViewDate(new Date(year, month + 1, 1))}><i className="fa-solid fa-chevron-right" /></button>
            </div>
          </div>
          <div className="calendar-weekdays">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day}>{day.slice(0, 1)}</span>)}</div>
          <div className="calendar-days">
            {cells.map((date) => {
              const dateValue = toValue(date);
              return <button className={`${date.getMonth() !== month ? 'muted' : ''} ${dateValue === value ? 'selected' : ''} ${dateValue === todayValue ? 'today' : ''}`} key={dateValue} type="button" onClick={() => choose(date)}>{date.getDate()}</button>;
            })}
          </div>
          <div className="calendar-foot">
            <button type="button" onClick={() => { onChange(''); setOpen(false); }}>Clear</button>
            <button type="button" onClick={() => choose(new Date())}>Today</button>
          </div>
        </div>
      )}
    </label>
  );
}

function ModernMonthField({ label, value, onChange }) {
  const selectedYear = Number(String(value || today()).slice(0, 4));
  const [open, setOpen] = React.useState(false);
  const [year, setYear] = React.useState(selectedYear);
  const months = Array.from({ length: 12 }, (_, index) => new Date(2000, index, 1).toLocaleDateString('en-IN', { month: 'short' }));
  const choose = (index) => {
    onChange(`${year}-${String(index + 1).padStart(2, '0')}`);
    setOpen(false);
  };
  const selectedLabel = value ? new Date(`${value}-01T00:00:00`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'Select month';
  return (
    <label className="field modern-date-field">
      <span>{label}</span>
      <button className="date-trigger" type="button" onClick={() => setOpen((current) => !current)}>
        <span>{selectedLabel}</span><i aria-hidden="true" className="fa-solid fa-calendar-days" />
      </button>
      {open && (
        <div className="modern-calendar month-calendar">
          <div className="calendar-head">
            <div><strong>{year}</strong></div>
            <div>
              <button aria-label="Previous year" type="button" onClick={() => setYear((current) => current - 1)}><i className="fa-solid fa-chevron-left" /></button>
              <button aria-label="Next year" type="button" onClick={() => setYear((current) => current + 1)}><i className="fa-solid fa-chevron-right" /></button>
            </div>
          </div>
          <div className="month-grid">
            {months.map((month, index) => <button className={value === `${year}-${String(index + 1).padStart(2, '0')}` ? 'selected' : ''} key={month} type="button" onClick={() => choose(index)}>{month}</button>)}
          </div>
        </div>
      )}
    </label>
  );
}

function PreviewRows({ rows, empty, render }) {
  if (!rows.length) return <Empty text={empty} />;
  return <div className="preview-rows">{rows.slice(0, 8).map((row) => <div key={row.id}>{render(row)}</div>)}</div>;
}

function Clients({ ctx }) {
  const { data, setters, notify, addActivity } = ctx;
  const fields = [
    ['name', 'text', true], ['company', 'text'], ['mobile', 'tel'], ['email', 'email'], ['gst', 'text'],
    ['billingAddress', 'textarea'], ['shippingAddress', 'textarea'], ['city', 'text'], ['state', 'text'], ['pin', 'text'], ['notes', 'textarea']
  ];
  const save = (record) => {
    upsert(setters.setClients, record);
    notify(record._editing ? 'Client updated' : 'Client added');
    addActivity(`${record._editing ? 'Updated' : 'Added'} client ${record.name}`);
  };
  return (
    <CrudSection
      title="Clients"
      singular="Client"
      rows={data.clients}
      columns={[
        ['name', 'Client'], ['company', 'Company'], ['mobile', 'Mobile'], ['email', 'Email'], ['city', 'City']
      ]}
      searchKeys={['name', 'company', 'mobile', 'email', 'city']}
      getStatus={(row) => row.state}
      fields={fields}
      onSave={save}
      onDelete={(id) => remove(setters.setClients, id, notify, 'Client deleted')}
      detail={(client) => <ClientDetail client={client} data={data} />}
    />
  );
}

function ClientDetail({ client, data }) {
  const clientQuotations = data.quotations.filter((item) => item.clientId === client.id);
  const clientInvoices = data.invoices.filter((item) => item.clientId === client.id);
  const clientPayments = data.payments.filter((item) => item.clientId === client.id);
  const clientProjects = data.projects.filter((item) => item.clientId === client.id);
  return (
    <div className="detail-grid">
      <Info label="GST" value={client.gst} />
      <Info label="Billing Address" value={client.billingAddress} />
      <Info label="Shipping Address" value={client.shippingAddress} />
      <Info label="Notes" value={client.notes} />
      <History title="Quotations" rows={clientQuotations} />
      <History title="Invoices" rows={clientInvoices} />
      <History title="Projects" rows={clientProjects} nameKey="projectName" />
      <History title="Payments" rows={clientPayments} amountKey="amount" />
    </div>
  );
}

function Services({ ctx }) {
  const { data, setters, notify, addActivity } = ctx;
  const fields = [
    ['name', 'text', true, null, 'Service Name'], ['category', 'text', true, null, 'Service Category'],
    ['description', 'textarea', false, null, 'Description'], ['hsn', 'text', false, null, 'HSN/SAC Code'],
    ['unit', 'text', true, null, 'Billing Unit'], ['rate', 'number', true, null, 'Rate (Rs.)'],
    ['gst', 'number', true, null, 'GST (%)'],
    ['type', 'select', true, ['Design', 'Printing', 'Website', 'Installation', 'Other'], 'Service Type']
  ];
  return (
    <CrudSection
      title="Services / Items"
      singular="Service"
      rows={data.services}
      columns={[
        ['name', 'Service'], ['category', 'Category'], ['type', 'Type'], ['unit', 'Unit'], ['rate', 'Rate', money], ['gst', 'GST', percent]
      ]}
      searchKeys={['name', 'category', 'type', 'description']}
      getStatus={(row) => row.type}
      fields={fields}
      onSave={(record) => {
        upsert(setters.setServices, record);
        notify(record._editing ? 'Service updated' : 'Service added');
        addActivity(`${record._editing ? 'Updated' : 'Added'} service ${record.name}`);
      }}
      onDelete={(id) => remove(setters.setServices, id, notify, 'Service deleted')}
      detail={(row) => <div className="detail-grid"><Info label="Description" value={row.description} /><Info label="HSN/SAC" value={row.hsn} /></div>}
    />
  );
}

function Quotations({ ctx }) {
  return <Documents ctx={ctx} kind="quotation" />;
}

function Invoices({ ctx }) {
  return <Documents ctx={ctx} kind="invoice" />;
}

function Documents({ ctx, kind }) {
  const { data, setters, notify, addActivity } = ctx;
  const isInvoice = kind === 'invoice';
  const rows = isInvoice ? data.invoices : data.quotations;
  const setRows = isInvoice ? setters.setInvoices : setters.setQuotations;
  const [modal, setModal] = React.useState(null);
  const [view, setView] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [date, setDate] = React.useState('');
  const clientName = (id) => data.clients.find((item) => item.id === id)?.name || 'No client';
  const filtered = rows.filter((row) => {
    const hay = `${row.number} ${clientName(row.clientId)} ${row.status}`.toLowerCase();
    return hay.includes(search.toLowerCase()) && (!status || row.status === status) && (!date || row.date === date);
  }).sort((a, b) => isInvoice
    ? invoiceSequence(b.number) - invoiceSequence(a.number) || String(b.number).localeCompare(String(a.number), undefined, { numeric: true })
    : 0);
  const statuses = isInvoice
    ? ['Draft', 'Sent', 'Partially Paid', 'Paid', 'Overdue', 'Cancelled']
    : ['Draft', 'Sent', 'Approved', 'Rejected', 'Converted to Invoice'];

  const saveDoc = (doc) => {
    const totals = documentTotals(doc.items);
    const paidAmount = isInvoice ? Number(doc.paidAmount || 0) : 0;
    const next = { ...doc, ...totals, paidAmount, balanceAmount: Math.max(totals.grandTotal - paidAmount, 0) };
    upsert(setRows, next);
    notify(`${isInvoice ? 'Invoice' : 'Quotation'} saved`);
    addActivity(`Saved ${isInvoice ? 'invoice' : 'quotation'} ${next.number}`);
    setModal(null);
  };

  const convertToInvoice = (quote) => {
    const number = nextNumber(data.invoices, data.settings.invoicePrefix || 'INV');
    const invoice = {
      ...quote,
      id: uid(),
      number,
      date: today(),
      dueDate: today(),
      status: 'Draft',
      paidAmount: 0,
      balanceAmount: quote.grandTotal,
      sourceQuotationId: quote.id
    };
    setters.setInvoices((items) => [invoice, ...items]);
    setters.setQuotations((items) => items.map((item) => item.id === quote.id ? { ...item, status: 'Converted to Invoice' } : item));
    notify('Quotation converted to invoice');
    addActivity(`Converted quotation ${quote.number} to invoice ${number}`);
  };

  const duplicateQuote = (quote) => {
    const copy = { ...quote, id: uid(), number: nextNumber(rows, data.settings.quotationPrefix || 'QT'), status: 'Draft', date: today() };
    setRows((items) => [copy, ...items]);
    notify('Quotation duplicated');
  };

  return (
    <section className="page">
      <Toolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        statuses={statuses}
        date={date}
        setDate={setDate}
        actionLabel={`Create ${isInvoice ? 'Invoice' : 'Quotation'}`}
        onAction={() => setModal({
          id: uid(),
          number: nextNumber(rows, isInvoice ? data.settings.invoicePrefix || 'INV' : data.settings.quotationPrefix || 'QT'),
          date: today(),
          dueDate: today(),
          validTill: today(),
          clientId: data.clients[0]?.id || '',
          status: 'Draft',
          terms: data.settings.terms,
          notes: '',
          items: [blankLine(data.services[0])],
          paidAmount: 0
        })}
      />
      <div className="table-wrap">
        <table>
          <thead><tr><th>Number</th><th>Date</th><th>Client</th><th>Status</th><th>Total</th>{isInvoice && <th>Balance</th>}<th>Actions</th></tr></thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id}>
                <td><strong>{row.number}</strong></td>
                <td>{formatDate(row.date)}</td>
                <td>{clientName(row.clientId)}</td>
                <td><Badge text={row.status} /></td>
                <td>{money(row.grandTotal)}</td>
                {isInvoice && <td>{money(row.balanceAmount)}</td>}
                <td className="actions">
                  <button onClick={() => setView(row)}>View</button>
                  <button onClick={() => setModal({ ...row, _editing: true })}>Edit</button>
                  {!isInvoice && <button onClick={() => duplicateQuote(row)}>Duplicate</button>}
                  {!isInvoice && <button onClick={() => convertToInvoice(row)}>Make Invoice</button>}
                  <button onClick={() => printDocument(row, data, isInvoice ? 'Invoice' : 'Quotation')}>Print</button>
                  <button onClick={() => shareText(`${isInvoice ? 'Invoice' : 'Quotation'} ${row.number} for ${clientName(row.clientId)}: ${money(row.grandTotal)}`, notify)}>Share</button>
                  <button className="danger" onClick={() => remove(setRows, row.id, notify, `${isInvoice ? 'Invoice' : 'Quotation'} deleted`)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && <Empty text={`No ${isInvoice ? 'invoices' : 'quotations'} found.`} />}
      </div>
      {modal && <DocumentModal isInvoice={isInvoice} doc={modal} setDoc={setModal} data={data} onClose={() => setModal(null)} onSave={saveDoc} />}
      {view && <Modal title={`${isInvoice ? 'Invoice' : 'Quotation'} ${view.number}`} onClose={() => setView(null)} wide>
        <DocumentPreview doc={view} data={data} kind={isInvoice ? 'Invoice' : 'Quotation'} />
      </Modal>}
    </section>
  );
}

function DocumentModal({ isInvoice, doc, setDoc, data, onClose, onSave }) {
  const updateLine = (id, patch) => {
    setDoc((current) => ({
      ...current,
      items: current.items.map((item) => item.id === id ? { ...item, ...patch } : item)
    }));
  };
  const totals = documentTotals(doc.items);
  const balance = Math.max(totals.grandTotal - Number(doc.paidAmount || 0), 0);
  return (
    <Modal title={`${doc._editing ? 'Edit' : 'Create'} ${isInvoice ? 'Invoice' : 'Quotation'}`} onClose={onClose} wide>
      <div className="form-grid">
        <Field label={isInvoice && doc._editing ? 'Invoice Number (Fixed)' : 'Number'} value={doc.number} onChange={(v) => setDoc({ ...doc, number: v })} readOnly={isInvoice && doc._editing} required />
        <Field label="Date" type="date" value={doc.date} onChange={(v) => setDoc({ ...doc, date: v })} required />
        <Field label={isInvoice ? 'Due Date' : 'Valid Till'} type="date" value={isInvoice ? doc.dueDate : doc.validTill} onChange={(v) => setDoc({ ...doc, [isInvoice ? 'dueDate' : 'validTill']: v })} />
        <Field label="Client" type="select" value={doc.clientId} options={data.clients.map((item) => [item.id, item.name])} onChange={(v) => setDoc({ ...doc, clientId: v })} required />
        <Field label="Status" type="select" value={doc.status} options={(isInvoice ? ['Draft', 'Sent', 'Partially Paid', 'Paid', 'Overdue', 'Cancelled'] : ['Draft', 'Sent', 'Approved', 'Rejected', 'Converted to Invoice']).map((v) => [v, v])} onChange={(v) => setDoc({ ...doc, status: v })} />
        {isInvoice && <Field label="Amount Already Received (Rs.)" help="Enter 0 if the client has not paid yet." placeholder="Example: 500" type="number" value={doc.paidAmount} onChange={(v) => setDoc({ ...doc, paidAmount: v })} />}
      </div>
      <div className="line-editor">
        <div className="line-head">
          <div><strong>Services & Charges</strong><small>Rate x quantity, minus discount, plus GST</small></div>
          <button onClick={() => setDoc({ ...doc, items: [...doc.items, blankLine(data.services[0])] })}>Add Item</button>
        </div>
        {doc.items.map((line) => (
          <div className="line-row" key={line.id}>
            <label className="line-field"><span>Service</span><select value={line.serviceId} onChange={(e) => {
                const service = data.services.find((item) => item.id === e.target.value);
                updateLine(line.id, blankLine(service, line.id));
              }}>
                {data.services.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}
              </select></label>
            <label className="line-field"><span>Description</span><input value={line.description} onChange={(e) => updateLine(line.id, { description: e.target.value })} placeholder="Work details" /></label>
            <label className="line-field"><span>Quantity</span><input min="0" step="1" type="number" value={line.qty} onChange={(e) => updateLine(line.id, { qty: e.target.value })} placeholder="1" /></label>
            <label className="line-field"><span>Rate (Rs.)</span><input min="0" type="number" value={line.rate} onChange={(e) => updateLine(line.id, { rate: e.target.value })} placeholder="1800" /></label>
            <label className="line-field"><span>Discount (Rs.)</span><input min="0" type="number" value={line.discount} onChange={(e) => updateLine(line.id, { discount: e.target.value })} placeholder="0" /></label>
            <label className="line-field"><span>GST (%)</span><input min="0" max="100" type="number" value={line.gst} onChange={(e) => updateLine(line.id, { gst: e.target.value })} placeholder="18" /></label>
            <div className="line-total"><span>Item Total</span><strong>{money(lineTotals(line).total)}</strong></div>
            <button className="line-remove danger" onClick={() => setDoc({ ...doc, items: doc.items.filter((item) => item.id !== line.id) })}>Remove</button>
          </div>
        ))}
      </div>
      <div className="form-grid">
        <Field label="Terms" type="textarea" value={doc.terms} onChange={(v) => setDoc({ ...doc, terms: v })} />
        <Field label="Notes" type="textarea" value={doc.notes} onChange={(v) => setDoc({ ...doc, notes: v })} />
      </div>
      <div className="totals">
        <span>Subtotal <strong>{money(totals.subtotal)}</strong></span>
        <span>Discount <strong>{money(totals.discount)}</strong></span>
        <span>GST <strong>{money(totals.gst)}</strong></span>
        <span>Grand Total <strong>{money(totals.grandTotal)}</strong></span>
        {isInvoice && <span>Balance <strong>{money(balance)}</strong></span>}
      </div>
      <div className="modal-actions">
        <button className="ghost" onClick={onClose}>Cancel</button>
        <button onClick={() => onSave(doc)}>Save</button>
      </div>
    </Modal>
  );
}

function Payments({ ctx }) {
  const { data, setters, notify, addActivity } = ctx;
  const [modal, setModal] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const invoices = data.invoices;
  const savePayment = (payment) => {
    const invoice = invoices.find((item) => item.id === payment.invoiceId);
    const next = { ...payment, clientId: invoice?.clientId || payment.clientId, invoiceNumber: invoice?.number || payment.invoiceNumber };
    const nextPayments = data.payments.some((item) => item.id === next.id)
      ? data.payments.map((item) => item.id === next.id ? next : item)
      : [next, ...data.payments];
    setters.setPayments(nextPayments);
    setters.setInvoices((items) => recalculateInvoiceBalances(items, nextPayments));
    notify('Payment recorded');
    addActivity(`Recorded payment ${money(next.amount)} for ${next.invoiceNumber}`);
    setModal(null);
  };
  const filtered = data.payments.filter((row) => `${row.invoiceNumber} ${clientName(row.clientId, data)} ${row.paymentMode}`.toLowerCase().includes(search.toLowerCase()));
  return (
    <section className="page">
      <Toolbar search={search} setSearch={setSearch} actionLabel="Record Payment" onAction={() => setModal({ id: uid(), date: today(), invoiceId: invoices[0]?.id || '', amount: '', paymentMode: 'UPI', transactionId: '', notes: '' })} />
      <div className="summary-strip">
        <strong>Paid {money(data.invoices.reduce((s, i) => s + Number(i.paidAmount || 0), 0))}</strong>
        <strong>Pending {money(data.invoices.reduce((s, i) => s + Number(i.balanceAmount || 0), 0))}</strong>
        <strong>Overdue {data.invoices.filter((i) => i.dueDate < today() && Number(i.balanceAmount || 0) > 0).length}</strong>
      </div>
      <DataTable
        rows={filtered}
        columns={[
          ['date', 'Date'], ['invoiceNumber', 'Invoice'], ['clientId', 'Client', (v) => clientName(v, data)], ['amount', 'Amount', money], ['paymentMode', 'Mode'], ['transactionId', 'Transaction ID']
        ]}
        actions={(row) => <>
          <button onClick={() => printReceipt(row, data)}>Print</button>
          <button onClick={() => setModal({ ...row, _editing: true })}>Edit</button>
          <button onClick={() => {
            if (!confirm('Delete this payment?')) return;
            const nextPayments = data.payments.filter((item) => item.id !== row.id);
            setters.setPayments(nextPayments);
            setters.setInvoices((items) => recalculateInvoiceBalances(items, nextPayments));
            notify('Payment deleted');
          }} className="danger">Delete</button>
        </>}
      />
      {modal && <PaymentModal payment={modal} setPayment={setModal} invoices={invoices} data={data} onSave={savePayment} onClose={() => setModal(null)} />}
    </section>
  );
}

function PaymentModal({ payment, setPayment, invoices, data, onSave, onClose }) {
  return (
    <Modal title="Record Payment" onClose={onClose}>
      <div className="form-grid single">
        <Field label="Payment Date" type="date" value={payment.date} onChange={(v) => setPayment({ ...payment, date: v })} required />
        <Field label="Invoice Number" type="select" value={payment.invoiceId} options={invoices.map((item) => [item.id, `${item.number} - ${clientName(item.clientId, data)} - ${money(item.balanceAmount)}`])} onChange={(v) => setPayment({ ...payment, invoiceId: v })} required />
        <Field label="Amount" type="number" value={payment.amount} onChange={(v) => setPayment({ ...payment, amount: v })} required />
        <Field label="Payment Mode" type="select" value={payment.paymentMode} options={['Cash', 'UPI', 'Bank Transfer', 'Cheque', 'Online', 'Other'].map((v) => [v, v])} onChange={(v) => setPayment({ ...payment, paymentMode: v })} />
        <Field label="Transaction ID" value={payment.transactionId} onChange={(v) => setPayment({ ...payment, transactionId: v })} />
        <Field label="Notes" type="textarea" value={payment.notes} onChange={(v) => setPayment({ ...payment, notes: v })} />
      </div>
      <div className="modal-actions"><button className="ghost" onClick={onClose}>Cancel</button><button onClick={() => onSave(payment)}>Save</button></div>
    </Modal>
  );
}

function Projects({ ctx }) {
  const { data, setters, notify, addActivity } = ctx;
  const [modal, setModal] = React.useState(null);
  const fields = [
    ['projectName', 'text', true], ['clientId', 'client', true], ['projectType', 'text'], ['startDate', 'date'], ['deadline', 'date'],
    ['status', 'select', true, ['Lead', 'Quotation Sent', 'Approved', 'In Design', 'Client Review', 'Printing', 'Installation', 'Completed', 'On Hold', 'Cancelled']],
    ['assignedTo', 'text'], ['projectValue', 'number'], ['advanceReceived', 'number'], ['notes', 'textarea']
  ];
  return (
    <CrudSection
      title="Projects / Jobs"
      singular="Project"
      rows={data.projects.map((item) => ({ ...item, balance: Number(item.projectValue || 0) - Number(item.advanceReceived || 0) }))}
      columns={[
        ['projectName', 'Project'], ['clientId', 'Client', (v) => clientName(v, data)], ['status', 'Status', (v) => <Badge text={v} />], ['deadline', 'Deadline'], ['projectValue', 'Value', money], ['balance', 'Balance', money]
      ]}
      searchKeys={['projectName', 'projectType', 'status', 'assignedTo']}
      getStatus={(row) => row.status}
      fields={fields}
      clients={data.clients}
      onSave={(record) => {
        upsert(setters.setProjects, { ...record, tasks: record.tasks || [] });
        notify('Project saved');
        addActivity(`Saved project ${record.projectName}`);
      }}
      onDelete={(id) => remove(setters.setProjects, id, notify, 'Project deleted')}
      detail={(row) => <ProjectDetail row={row} data={data} onEdit={() => setModal(row)} />}
      externalModal={modal}
      setExternalModal={setModal}
      customForm={(record, setRecord, onClose, onSave) => <ProjectForm data={data} record={record} setRecord={setRecord} onClose={onClose} onSave={onSave} fields={fields} />}
    />
  );
}

function ProjectForm({ data, record, setRecord, onClose, onSave, fields }) {
  const [taskText, setTaskText] = React.useState('');
  const tasks = record.tasks || [];
  return (
    <Modal title="Project" onClose={onClose} wide>
      <div className="form-grid">
        {fields.map(([key, type, required, options]) => (
          <Field
            key={key}
            label={fieldLabels[key] || key}
            type={type === 'client' ? 'select' : type}
            required={required}
            options={type === 'client' ? data.clients.map((item) => [item.id, item.name]) : options?.map((v) => [v, v])}
            value={record[key] || ''}
            onChange={(v) => setRecord({ ...record, [key]: v })}
          />
        ))}
      </div>
      <Panel title="Tasks">
        <div className="task-add">
          <input value={taskText} onChange={(e) => setTaskText(e.target.value)} placeholder="Add project task" />
          <button onClick={() => {
            if (!taskText.trim()) return;
            setRecord({ ...record, tasks: [...tasks, { id: uid(), text: taskText.trim(), done: false }] });
            setTaskText('');
          }}>Add Task</button>
        </div>
        <div className="task-list">
          {tasks.map((task) => (
            <label key={task.id}>
              <input type="checkbox" checked={task.done} onChange={(e) => setRecord({ ...record, tasks: tasks.map((item) => item.id === task.id ? { ...item, done: e.target.checked } : item) })} />
              <span>{task.text}</span>
              <button className="danger" onClick={() => setRecord({ ...record, tasks: tasks.filter((item) => item.id !== task.id) })}>Remove</button>
            </label>
          ))}
          {!tasks.length && <Empty text="No tasks added." />}
        </div>
      </Panel>
      <div className="modal-actions"><button className="ghost" onClick={onClose}>Cancel</button><button onClick={() => onSave(record)}>Save</button></div>
    </Modal>
  );
}

function ProjectDetail({ row, data }) {
  const invoice = data.invoices.find((item) => item.clientId === row.clientId);
  return (
    <div className="detail-grid">
      <Info label="Payment Status" value={Number(row.balance || 0) <= 0 ? 'Received' : `Pending ${money(row.balance)}`} />
      <Info label="Invoice Status" value={invoice?.status || 'No invoice'} />
      <Info label="Client Approval" value={['Approved', 'In Design', 'Client Review', 'Printing', 'Installation', 'Completed'].includes(row.status) ? 'Approved / In progress' : row.status} />
      <Info label="Notes" value={row.notes} />
      <div className="wide-field">
        <strong>Tasks</strong>
        {(row.tasks || []).length ? row.tasks.map((task) => <p key={task.id}>{task.done ? 'Done' : 'Open'} - {task.text}</p>) : <p>No tasks.</p>}
      </div>
    </div>
  );
}

function PrintCalculator({ ctx }) {
  const { data, setters, notify, addActivity, navigate } = ctx;
  const [calc, setCalc] = React.useState({ width: '', height: '', unit: 'feet', qty: 1, rate: '', material: 'Flex', printingType: 'Eco Solvent', mounting: 0, transport: 0, gst: 18 });
  const [clientId, setClientId] = React.useState(data.clients[0]?.id || '');
  const widthFeet = calc.unit === 'inch' ? Number(calc.width || 0) / 12 : Number(calc.width || 0);
  const heightFeet = calc.unit === 'inch' ? Number(calc.height || 0) / 12 : Number(calc.height || 0);
  const sqft = widthFeet * heightFeet * Number(calc.qty || 0);
  const base = sqft * Number(calc.rate || 0);
  const extra = Number(calc.mounting || 0) + Number(calc.transport || 0);
  const gstAmount = (base + extra) * Number(calc.gst || 0) / 100;
  const final = base + extra + gstAmount;
  const taxableTotal = base + extra;
  const canCreateQuotation = clientId && sqft > 0 && taxableTotal > 0;
  const createQuotation = () => {
    if (!canCreateQuotation) {
      notify('Please select client, size, quantity and rate first');
      return;
    }
    const printDescription = [
      `${formatNumber(widthFeet)} ft x ${formatNumber(heightFeet)} ft`,
      `Quantity: ${formatNumber(calc.qty)}`,
      calc.printingType
    ].filter(Boolean).join(' | ');
    const items = [{
      id: uid(),
      serviceId: '',
      name: `Printing Job - ${calc.material}`,
      description: printDescription,
      qty: sqft,
      rate: Number(calc.rate || 0),
      discount: 0,
      gst: Number(calc.gst || 0)
    }];
    if (Number(calc.mounting || 0) > 0) {
      items.push({
        id: uid(),
        serviceId: '',
        name: 'Mounting / Pasting Charges',
        description: calc.material,
        qty: 1,
        rate: Number(calc.mounting || 0),
        discount: 0,
        gst: Number(calc.gst || 0)
      });
    }
    if (Number(calc.transport || 0) > 0) {
      items.push({
        id: uid(),
        serviceId: '',
        name: 'Transport Charges',
        description: 'Delivery / logistics for printing job',
        qty: 1,
        rate: Number(calc.transport || 0),
        discount: 0,
        gst: Number(calc.gst || 0)
      });
    }
    const totals = documentTotals(items);
    const quotation = {
      id: uid(),
      number: nextNumber(data.quotations, data.settings.quotationPrefix || 'QT'),
      date: today(),
      validTill: today(),
      clientId,
      status: 'Draft',
      terms: data.settings.terms,
      notes: 'Created from Print Calculator',
      items,
      ...totals
    };
    setters.setQuotations((items) => [quotation, ...items]);
    notify(`Quotation ${quotation.number} created`);
    addActivity(`Created quotation ${quotation.number} from print calculator`);
    navigate('quotations');
  };
  return (
    <section className="page">
      <Panel title="Printing Job Calculator">
        <div className="form-grid">
          {[
            ['width', 'Width', 'number'], ['height', 'Height', 'number'], ['qty', 'Quantity', 'number'], ['rate', 'Rate per sq.ft.', 'number'],
            ['material', 'Material', 'text'], ['printingType', 'Printing Type', 'text'], ['mounting', 'Mounting/Pasting Charges', 'number'], ['transport', 'Transport Charges', 'number'], ['gst', 'GST %', 'number']
          ].map(([key, label, type]) => <Field key={key} label={label} type={type} value={calc[key]} onChange={(v) => setCalc({ ...calc, [key]: v })} />)}
          <Field label="Unit" type="select" value={calc.unit} options={[['feet', 'Feet'], ['inch', 'Inch']]} onChange={(v) => setCalc({ ...calc, unit: v })} />
          <Field label="Quotation Client" type="select" value={clientId} options={data.clients.map((item) => [item.id, item.name])} onChange={setClientId} />
        </div>
        <div className="stat-grid calculator-results">
          <article className="stat"><span>Square Feet</span><strong>{sqft.toFixed(2)}</strong></article>
          <article className="stat"><span>Base Amount</span><strong>{money(base)}</strong></article>
          <article className="stat"><span>Extra Charges</span><strong>{money(extra)}</strong></article>
          <article className="stat"><span>GST Amount</span><strong>{money(gstAmount)}</strong></article>
          <article className="stat"><span>Final Amount</span><strong>{money(final)}</strong></article>
        </div>
        <div className="calculator-actions">
          <div>
            <strong>Ready for quotation</strong>
            <p>The quotation will carry this print size, material, extra charges, GST and final amount.</p>
          </div>
          <button onClick={createQuotation} disabled={!canCreateQuotation}>
            <i className="fa-solid fa-file-lines" /> Create Quotation from This
          </button>
        </div>
      </Panel>
    </section>
  );
}

function Expenses({ ctx }) {
  const { data, setters, notify, addActivity } = ctx;
  const fields = [
    ['date', 'date', true], ['vendorName', 'text', true],
    ['category', 'select', true, ['Printing Vendor', 'Material Purchase', 'Freelancer Payment', 'Hosting/Domain', 'Office Expense', 'Travel', 'Software Subscription', 'Other']],
    ['description', 'textarea'], ['amount', 'number', true], ['gst', 'number'], ['paymentMode', 'select', false, ['Cash', 'UPI', 'Bank Transfer', 'Cheque', 'Online', 'Other']], ['billNumber', 'text'], ['notes', 'textarea']
  ];
  return (
    <CrudSection
      title="Expenses / Vendor Purchases"
      singular="Expense"
      rows={data.expenses}
      columns={[
        ['date', 'Date'], ['vendorName', 'Vendor'], ['category', 'Category'], ['amount', 'Amount', money], ['gst', 'GST', percent], ['paymentMode', 'Mode']
      ]}
      searchKeys={['vendorName', 'category', 'description', 'billNumber']}
      getStatus={(row) => row.category}
      fields={fields}
      onSave={(record) => {
        upsert(setters.setExpenses, record);
        notify('Expense saved');
        addActivity(`Saved expense ${record.vendorName} ${money(record.amount)}`);
      }}
      onDelete={(id) => remove(setters.setExpenses, id, notify, 'Expense deleted')}
      detail={(row) => <div className="detail-grid"><Info label="Description" value={row.description} /><Info label="Bill Number" value={row.billNumber} /><Info label="Notes" value={row.notes} /></div>}
    />
  );
}

function Reports({ ctx }) {
  const { data } = ctx;
  const [filters, setFilters] = React.useState({ from: '', to: '', clientId: '', status: '', payment: '', category: '' });
  const inRange = (date) => (!filters.from || date >= filters.from) && (!filters.to || date <= filters.to);
  const invoices = data.invoices.filter((item) => inRange(item.date) && (!filters.clientId || item.clientId === filters.clientId) && (!filters.status || item.status === filters.status));
  const expenses = data.expenses.filter((item) => inRange(item.date) && (!filters.category || item.category === filters.category));
  const sales = invoices.reduce((s, i) => s + Number(i.grandTotal || 0), 0);
  const expenseTotal = expenses.reduce((s, i) => s + Number(i.amount || 0), 0);
  const pending = invoices.reduce((s, i) => s + Number(i.balanceAmount || 0), 0);
  const gstSales = invoices.reduce((s, i) => s + Number(i.gst || 0), 0);
  const gstExpense = expenses.reduce((s, i) => s + Number(i.amount || 0) * Number(i.gst || 0) / 100, 0);
  const clientRevenue = data.clients.map((client) => ({
    client: client.name,
    revenue: invoices.filter((invoice) => invoice.clientId === client.id).reduce((s, i) => s + Number(i.grandTotal || 0), 0)
  })).filter((row) => row.revenue > 0);
  const monthly = invoices.reduce((acc, invoice) => {
    const key = invoice.date?.slice(0, 7) || 'No date';
    acc[key] = (acc[key] || 0) + Number(invoice.grandTotal || 0);
    return acc;
  }, {});
  return (
    <section className="page">
      <Panel title="Report Filters">
        <div className="form-grid">
          <Field label="Date From" type="date" value={filters.from} onChange={(v) => setFilters({ ...filters, from: v })} />
          <Field label="Date To" type="date" value={filters.to} onChange={(v) => setFilters({ ...filters, to: v })} />
          <Field label="Client" type="select" value={filters.clientId} options={[['', 'All Clients'], ...data.clients.map((c) => [c.id, c.name])]} onChange={(v) => setFilters({ ...filters, clientId: v })} />
          <Field label="Status" value={filters.status} onChange={(v) => setFilters({ ...filters, status: v })} />
          <Field label="Payment Status" type="select" value={filters.payment} options={[['', 'All'], ['Paid', 'Paid'], ['Pending', 'Pending']]} onChange={(v) => setFilters({ ...filters, payment: v })} />
          <Field label="Service Category" value={filters.category} onChange={(v) => setFilters({ ...filters, category: v })} />
        </div>
      </Panel>
      <div className="stat-grid">
        <article className="stat"><span>Sales Report</span><strong>{money(sales)}</strong></article>
        <article className="stat"><span>Pending Payment</span><strong>{money(pending)}</strong></article>
        <article className="stat"><span>Expense Report</span><strong>{money(expenseTotal)}</strong></article>
        <article className="stat"><span>Profit Estimate</span><strong>{money(sales - expenseTotal)}</strong></article>
        <article className="stat"><span>GST Summary</span><strong>{money(gstSales - gstExpense)}</strong></article>
        <article className="stat"><span>Project Status</span><strong>{data.projects.length} jobs</strong></article>
      </div>
      <div className="two-col">
        <Panel title="Client-wise Revenue">
          <DataTable rows={clientRevenue} columns={[['client', 'Client'], ['revenue', 'Revenue', money]]} />
        </Panel>
        <Panel title="Monthly Revenue">
          <DataTable rows={Object.entries(monthly).map(([month, revenue]) => ({ month, revenue }))} columns={[['month', 'Month'], ['revenue', 'Revenue', money]]} />
        </Panel>
      </div>
    </section>
  );
}

function ExportImport({ ctx, resetData }) {
  const { data, notify, importCloudBackup } = ctx;
  const exportRows = (key, rows) => download(`${key}.csv`, toCsv(flattenRows(rows)), 'text/csv;charset=utf-8');
  const exportAll = () => STORAGE_KEYS.filter((key) => key !== 'companySettings' && key !== 'activities').forEach((key) => exportRows(key, data[key]));
  const backup = () => download('creative-studio-backup.json', JSON.stringify({
    clients: data.clients, services: data.services, quotations: data.quotations, invoices: data.invoices, payments: data.payments, projects: data.projects, expenses: data.expenses, companySettings: data.settings, activities: data.activities
  }, null, 2), 'application/json');
  const importBackup = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        importCloudBackup(parsed)
          .then(() => notify('Backup imported to cloud'))
          .catch((error) => notify(error.message));
      } catch {
        notify('Could not import backup');
      }
    };
    reader.readAsText(file);
  };
  const exports = [
    ['Clients', 'clients', data.clients],
    ['Services', 'services', data.services],
    ['Quotations', 'quotations', data.quotations],
    ['Invoices', 'invoices', data.invoices],
    ['Payments', 'payments', data.payments],
    ['Projects', 'projects', data.projects],
    ['Expenses', 'expenses', data.expenses]
  ];
  return (
    <section className="page">
      <div className="export-grid">
        {exports.map(([label, key, rows]) => <button key={key} onClick={() => exportRows(key, rows)}>Export {label} CSV</button>)}
        <button onClick={exportAll}>Export All Data CSV</button>
        <button onClick={backup}>Export Backup JSON</button>
        <label className="upload-btn">Import Backup JSON<input type="file" accept="application/json" onChange={(e) => importBackup(e.target.files[0])} /></label>
        <button className="danger" onClick={resetData}>Reset Cloud Data</button>
      </div>
    </section>
  );
}

function CompanySettings({ ctx }) {
  const { data, setters, notify } = ctx;
  const [form, setForm] = React.useState(data.settings);
  React.useEffect(() => setForm(data.settings), [data.settings]);
  const fields = [
    ['companyName', 'Company Name'], ['phone', 'Phone'], ['email', 'Email'], ['address', 'Address', 'textarea'], ['gstNumber', 'GST Number'],
    ['bankDetails', 'Bank Details', 'textarea'], ['upiId', 'UPI ID'], ['invoicePrefix', 'Invoice Prefix'], ['quotationPrefix', 'Quotation Prefix'], ['terms', 'Default Terms and Conditions', 'textarea']
  ];
  const uploadLogo = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, logo: reader.result }));
    reader.readAsDataURL(file);
  };
  return (
    <section className="page">
      <Panel title="Company Settings">
        <div className="settings-layout">
          <div className="logo-uploader">
            <img src={form.logo || DEFAULT_LOGO} alt="Company logo" />
            <label>Upload Logo<input type="file" accept="image/*" onChange={(e) => uploadLogo(e.target.files[0])} /></label>
          </div>
          <div className="form-grid">
            {fields.map(([key, label, type]) => <Field key={key} label={label} type={type || 'text'} value={form[key]} onChange={(v) => setForm({ ...form, [key]: v })} />)}
          </div>
        </div>
        <div className="modal-actions"><button onClick={() => { setters.setSettings(form); notify('Company settings saved'); }}>Save Settings</button></div>
      </Panel>
    </section>
  );
}

function CrudSection({ title, singular, rows, columns, searchKeys, getStatus, fields, clients = [], onSave, onDelete, detail, externalModal, setExternalModal, customForm }) {
  const [modal, setModal] = React.useState(null);
  const [view, setView] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState('');
  const activeModal = externalModal || modal;
  const setActiveModal = setExternalModal || setModal;
  const statuses = [...new Set(rows.map(getStatus).filter(Boolean))];
  const filtered = rows.filter((row) => {
    const hay = searchKeys.map((key) => row[key]).join(' ').toLowerCase();
    return hay.includes(search.toLowerCase()) && (!status || getStatus(row) === status);
  });
  const blank = fields.reduce((acc, [key]) => ({ ...acc, [key]: key === 'date' || key === 'startDate' ? today() : '' }), { id: uid() });
  return (
    <section className="page">
      <Toolbar search={search} setSearch={setSearch} status={status} setStatus={setStatus} statuses={statuses} actionLabel={`Add ${singular}`} onAction={() => setActiveModal(blank)} />
      <DataTable
        rows={filtered}
        columns={columns}
        actions={(row) => <>
          <button onClick={() => setView(row)}>View</button>
          <button onClick={() => setActiveModal({ ...row, _editing: true })}>Edit</button>
          <button className="danger" onClick={() => onDelete(row.id)}>Delete</button>
        </>}
      />
      {!filtered.length && <Empty text={`No ${title.toLowerCase()} found.`} />}
      {activeModal && (customForm
        ? customForm(activeModal, setActiveModal, () => setActiveModal(null), (record) => { if (validate(record, fields)) { onSave(record); setActiveModal(null); } })
        : <RecordModal title={`${activeModal._editing ? 'Edit' : 'Add'} ${singular}`} record={activeModal} setRecord={setActiveModal} fields={fields} clients={clients} onClose={() => setActiveModal(null)} onSave={() => { if (validate(activeModal, fields)) { onSave(activeModal); setActiveModal(null); } }} />
      )}
      {view && <Modal title={`${singular} Details`} onClose={() => setView(null)} wide>
        <DataSummary row={view} columns={columns} />
        {detail?.(view)}
      </Modal>}
    </section>
  );
}

function RecordModal({ title, record, setRecord, fields, clients, onClose, onSave }) {
  return (
    <Modal title={title} onClose={onClose}>
      <div className="form-grid single">
        {fields.map(([key, type, required, options, customLabel]) => (
          <Field key={key} label={customLabel || fieldLabels[key] || key} type={type === 'client' ? 'select' : type} required={required} options={type === 'client' ? clients.map((item) => [item.id, item.name]) : options?.map((item) => [item, item])} value={record[key] || ''} onChange={(v) => setRecord({ ...record, [key]: v })} />
        ))}
      </div>
      <div className="modal-actions"><button className="ghost" onClick={onClose}>Cancel</button><button onClick={onSave}>Save</button></div>
    </Modal>
  );
}

function Toolbar({ search, setSearch, status, setStatus, statuses = [], date, setDate, actionLabel, onAction }) {
  return (
    <div className="toolbar">
      <label className="search"><input value={search || ''} onChange={(e) => setSearch(e.target.value)} placeholder="Search" /></label>
      {setStatus && <select value={status || ''} onChange={(e) => setStatus(e.target.value)}><option value="">All statuses</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select>}
      {setDate && <ModernDateField value={date || ''} onChange={setDate} />}
      {onAction && <button onClick={onAction}>{actionLabel}</button>}
    </div>
  );
}

function DataTable({ rows, columns, actions }) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{columns.map(([, label]) => <th key={label}>{label}</th>)}{actions && <th>Actions</th>}</tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id || JSON.stringify(row)}>
              {columns.map(([key, , format]) => <td key={key}>{format ? format(row[key], row) : displayCellValue(key, row[key])}</td>)}
              {actions && <td className="actions">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      {!rows.length && <Empty text="No records to show." />}
    </div>
  );
}

function Field({ label, type = 'text', value, onChange, options = [], required, help, placeholder, readOnly }) {
  if (type === 'date') {
    return <ModernDateField label={`${label}${required ? ' *' : ''}`} value={value || ''} onChange={onChange} />;
  }
  if (type === 'month') {
    return <ModernMonthField label={`${label}${required ? ' *' : ''}`} value={value || ''} onChange={onChange} />;
  }
  return (
    <label className="field">
      <span>{label}{required ? ' *' : ''}</span>
      {type === 'textarea' ? <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} />
        : type === 'select' ? <select value={value || ''} onChange={(e) => onChange(e.target.value)}>{options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
        : <input placeholder={placeholder} readOnly={readOnly} type={type} value={value || ''} onChange={(e) => onChange(e.target.value)} />}
      {help && <small className="field-help">{help}</small>}
    </label>
  );
}

function Modal({ title, children, onClose, wide }) {
  return (
    <div className="modal-backdrop">
      <div className={`modal ${wide ? 'wide' : ''}`}>
        <div className="modal-head"><h2>{title}</h2><button className="ghost" onClick={onClose}>Close</button></div>
        {children}
      </div>
    </div>
  );
}

function Panel({ title, children }) {
  return <section className="panel"><h2>{title}</h2>{children}</section>;
}

function Empty({ text }) {
  return <div className="empty">{text}</div>;
}

function Badge({ text }) {
  return <span className={`badge ${String(text || '').toLowerCase().replaceAll(' ', '-')}`}>{text || 'Open'}</span>;
}

function Info({ label, value }) {
  return <div className="info"><span>{label}</span><strong>{value || '-'}</strong></div>;
}

function History({ title, rows, nameKey = 'number', amountKey = 'grandTotal' }) {
  return <div className="wide-field"><strong>{title}</strong>{rows.length ? rows.map((row) => <p key={row.id}>{row[nameKey] || row.invoiceNumber || formatDate(row.date)} {row.date && (row[nameKey] || row.invoiceNumber) ? `- ${formatDate(row.date)}` : ''} {amountKey && row[amountKey] ? `- ${money(row[amountKey])}` : ''}</p>) : <p>No records.</p>}</div>;
}

function DataSummary({ row, columns }) {
  return <div className="detail-grid">{columns.map(([key, label, format]) => <Info key={key} label={label} value={format ? format(row[key], row) : displayCellValue(key, row[key])} />)}</div>;
}

function upsert(setter, record) {
  const clean = { ...record };
  delete clean._editing;
  setter((items) => items.some((item) => item.id === clean.id) ? items.map((item) => item.id === clean.id ? clean : item) : [clean, ...items]);
}

function remove(setter, id, notify, message) {
  if (!confirm('Delete this record?')) return;
  setter((items) => items.filter((item) => item.id !== id));
  notify(message);
}

function validate(record, fields) {
  const missing = fields.filter(([, , required]) => required).some(([key]) => !record[key]);
  if (missing) {
    alert('Please complete required fields.');
    return false;
  }
  return true;
}

function blankLine(service, id = uid()) {
  return {
    id,
    serviceId: service?.id || '',
    name: service?.name || '',
    description: service?.description || '',
    qty: 1,
    rate: service?.rate || 0,
    discount: 0,
    gst: service?.gst || 18
  };
}

function nextNumber(rows, prefix) {
  const next = Math.max(0, ...rows.map((row) => invoiceSequence(row.number))) + 1;
  return `${prefix}-${String(next).padStart(4, '0')}`;
}

function invoiceSequence(number) {
  const match = String(number || '').match(/(\d+)(?!.*\d)/);
  return match ? Number(match[1]) : 0;
}

function displayCellValue(key, value) {
  return ['date', 'dueDate', 'validTill', 'startDate', 'deadline'].includes(key) ? formatDate(value) : value;
}

function clientName(id, data) {
  return data.clients.find((item) => item.id === id)?.name || 'No client';
}

function flattenRows(rows) {
  return rows.map((row) => Object.fromEntries(Object.entries(row).map(([key, value]) => [key, Array.isArray(value) || typeof value === 'object' ? JSON.stringify(value) : value])));
}

function recalculateInvoiceBalances(invoices, payments) {
  return invoices.map((invoice) => {
    const paidAmount = payments
      .filter((payment) => payment.invoiceId === invoice.id)
      .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
    const balanceAmount = Math.max(Number(invoice.grandTotal || 0) - paidAmount, 0);
    let status = invoice.status;
    if (!['Cancelled', 'Draft'].includes(status)) {
      status = balanceAmount <= 0 ? 'Paid' : paidAmount > 0 ? 'Partially Paid' : status;
    } else if (paidAmount > 0) {
      status = balanceAmount <= 0 ? 'Paid' : 'Partially Paid';
    }
    return { ...invoice, paidAmount, balanceAmount, status };
  });
}

function DocumentPreview({ doc, data, kind }) {
  const client = data.clients.find((item) => item.id === doc.clientId) || {};
  return (
    <div className="print-sheet">
      <div className="print-head">
        <div className="logo-box"><img src={data.settings.logo || DEFAULT_LOGO} alt="Reach Design" /></div>
        <div className="company-details">
          <h2>{data.settings.companyName}</h2>
          <p className="company-address">{splitAddress(data.settings.address).map((line) => <span key={line}>{line}</span>)}</p>
          <div className="company-contact">
            {data.settings.phone && <span><i className="fa-solid fa-phone" /><b>Phone</b><em>{data.settings.phone}</em></span>}
            {data.settings.email && <span><i className="fa-solid fa-envelope" /><b>Email</b><em>{data.settings.email}</em></span>}
            <span><i className="fa-solid fa-file-invoice" /><b>GSTIN</b><em>{data.settings.gstNumber || 'Not provided'}</em></span>
          </div>
        </div>
      </div>
      <div className="invoice-divider" />
      <div className="print-meta">
        <div><strong>Client Details</strong><p>{client.name}</p><p>{client.company}</p><p>{client.billingAddress}</p><p>GST: {client.gst || '-'}</p></div>
        <div><strong>{kind} Details</strong><p>No: {doc.number}</p><p>Date: {formatDate(doc.date)}</p><p>Status: {doc.status}</p></div>
      </div>
      <table className="print-table"><thead><tr><th>Item</th><th>Qty</th><th>Rate</th><th>Discount</th><th>GST</th><th>Total</th></tr></thead><tbody>{doc.items.map((line) => <tr key={line.id}><td>{line.name || line.description}<small>{line.description}</small></td><td>{line.qty}</td><td>{money(line.rate)}</td><td>{money(line.discount)}</td><td>{percent(line.gst)}</td><td>{money(lineTotals(line).total)}</td></tr>)}</tbody></table>
      <div className="print-total"><p>Subtotal: {money(doc.subtotal)}</p><p>GST: {money(doc.gst)}</p><p>Discount: {money(doc.discount)}</p><strong>Grand Total: {money(doc.grandTotal)}</strong></div>
      <div className="print-meta"><div><strong>Terms</strong><p>{doc.terms}</p><p>{doc.notes}</p></div><div className="signature">Authorized Signature</div></div>
    </div>
  );
}

function printDocument(doc, data, kind) {
  const win = window.open('', '_blank');
  const icons = new URL('./src/vendor/fontawesome/css/all.min.css', window.location.href).href;
  win.document.write(`<!doctype html><html><head><title>${kind} ${doc.number}</title><link rel="stylesheet" href="${icons}"><style>${printCss()}</style></head><body>${renderPrintHtml(doc, data, kind)}</body></html>`);
  win.document.close();
  printWindowWhenReady(win);
}

function printReceipt(payment, data) {
  const client = data.clients.find((item) => item.id === payment.clientId) || {};
  const win = window.open('', '_blank');
  win.document.write(`<!doctype html><html><head><title>Receipt ${payment.invoiceNumber}</title><style>${printCss()}</style></head><body><div class="sheet"><h1>Payment Receipt</h1><p><b>${data.settings.companyName}</b></p><p>${data.settings.address}</p><hr/><p>Client: ${client.name || '-'}</p><p>Invoice: ${payment.invoiceNumber}</p><p>Date: ${formatDate(payment.date)}</p><p>Mode: ${payment.paymentMode}</p><h2>Amount: ${money(payment.amount)}</h2><p>Transaction ID: ${payment.transactionId || '-'}</p><div class="signature">Authorized Signature</div></div></body></html>`);
  win.document.close();
  printWindowWhenReady(win);
}

function printWindowWhenReady(win) {
  const images = Array.from(win.document.images);
  const ready = images.map((image) => image.complete && image.naturalWidth
    ? Promise.resolve()
    : new Promise((resolve) => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', resolve, { once: true });
    }));
  Promise.race([
    Promise.all([Promise.all(ready), win.document.fonts?.ready || Promise.resolve()]),
    new Promise((resolve) => win.setTimeout(resolve, 1800))
  ]).then(() => {
    win.setTimeout(() => {
      win.focus();
      win.print();
    }, 350);
  });
}

function renderPrintHtml(doc, data, kind) {
  const client = data.clients.find((item) => item.id === doc.clientId) || {};
  const address = splitAddress(data.settings.address).map((line) => `<span>${line}</span>`).join('');
  return `<div class="sheet">
    <div class="head"><div class="logo"><img src="${data.settings.logo || DEFAULT_LOGO}" alt="Reach Design"/></div><div class="company"><h1>${data.settings.companyName || 'REACH Design'}</h1><p class="address">${address}</p><div class="contact">${data.settings.phone ? `<span><i class="fa-solid fa-phone"></i><b>Phone</b><em>${data.settings.phone}</em></span>` : ''}${data.settings.email ? `<span><i class="fa-solid fa-envelope"></i><b>Email</b><em>${data.settings.email}</em></span>` : ''}<span><i class="fa-solid fa-file-invoice"></i><b>GSTIN</b><em>${data.settings.gstNumber || 'Not provided'}</em></span></div></div></div>
    <div class="invoice-divider"></div>
    <div class="meta"><div><b>Client Details</b><p>${client.name || ''}</p><p>${client.company || ''}</p><p>${client.billingAddress || ''}</p><p>GST: ${client.gst || '-'}</p></div><div><b>${kind} Details</b><p>No: ${doc.number}</p><p>Date: ${formatDate(doc.date)}</p><p>Status: ${doc.status}</p></div></div>
    <table><thead><tr><th>Item</th><th>Qty</th><th>Rate</th><th>Discount</th><th>GST</th><th>Total</th></tr></thead><tbody>${doc.items.map((line) => `<tr><td>${line.name || ''}<br/><small>${line.description || ''}</small></td><td>${line.qty}</td><td>${money(line.rate)}</td><td>${money(line.discount)}</td><td>${percent(line.gst)}</td><td>${money(lineTotals(line).total)}</td></tr>`).join('')}</tbody></table>
    <div class="total"><p>Subtotal: ${money(doc.subtotal)}</p><p>GST: ${money(doc.gst)}</p><p>Discount: ${money(doc.discount)}</p><h2>Grand Total: ${money(doc.grandTotal)}</h2></div>
    <div class="meta"><div><b>Terms</b><p>${doc.terms || ''}</p><p>${doc.notes || ''}</p></div><div class="signature">Authorized Signature</div></div>
  </div>`;
}

function printCss() {
  return 'body{margin:0;font-family:"Google Sans","Product Sans",Inter,Arial,sans-serif;color:#202124}.sheet{max-width:980px;margin:auto;padding:34px 46px}.head{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:70px;padding:6px 8px 28px}.invoice-divider{position:relative;z-index:5;clear:both;width:100%;height:0;margin:8px 0 40px;border-top:2px solid #efb900}.logo{width:220px;height:130px;display:grid;place-items:center;justify-self:start}.logo img{display:block;width:100%;height:100%;object-fit:contain}.company{width:330px;max-width:100%;justify-self:end}.company h1{margin:0 0 12px;font-size:30px;letter-spacing:0}.company p{margin:0;color:#5f6368}.address{display:grid;gap:3px;line-height:1.45;font-size:12px}.contact{display:grid;gap:8px;margin-top:14px}.contact span{display:grid;grid-template-columns:14px 42px minmax(0,1fr);align-items:center;gap:7px;font-size:11px}.contact i{color:#9b7600;font-size:9px;text-align:center}.contact b{color:#8a6800;font-size:8px;text-transform:uppercase;letter-spacing:.7px}.contact em{min-width:0;color:#303438;font-style:normal;overflow-wrap:anywhere}.meta{display:flex;justify-content:space-between;gap:40px;margin:0 8px 38px}.meta>div:last-child{min-width:210px;text-align:right}.meta b{font-size:15px}.meta p{margin:6px 0;color:#5f6368;font-size:13px}.meta:last-of-type{align-items:flex-end;margin-top:20px}table{width:calc(100% - 16px);margin:0 8px;border-collapse:collapse}th,td{padding:12px 10px;text-align:left;border-bottom:1px solid #dfe2e5}th{background:#fff;color:#5f6368;font-size:9px;text-transform:uppercase}td{font-size:13px}td small{display:block;margin-top:3px}.total{text-align:right;margin:18px 8px 14px}.total p{margin:9px 0;font-size:13px}.total h2{margin:16px 0 0;font-size:21px}.signature{border-top:2px solid #222;align-self:flex-end;padding-top:10px;min-width:200px;text-align:center;font-size:12px}@media print{button{display:none}.sheet{padding:24px 38px}}';
}

createRoot(document.getElementById('root')).render(<App />);
