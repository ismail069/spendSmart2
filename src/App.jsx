import { useEffect, useMemo, useState } from "react";

const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Health",
  "Entertainment",
  "Education",
  "Other",
];

const PAYMENT_METHODS = [
  "Cash",
  "Debit Card",
  "Credit Card",
  "E-Wallet",
  "Bank Transfer",
];

const CATEGORY_COLORS = {
  Food: "#f97316",
  Transport: "#06b6d4",
  Shopping: "#ec4899",
  Bills: "#8b5cf6",
  Health: "#10b981",
  Entertainment: "#f59e0b",
  Education: "#3b82f6",
  Other: "#64748b",
};

const CATEGORY_ICONS = {
  Food: "🍜",
  Transport: "🚕",
  Shopping: "🛍️",
  Bills: "🧾",
  Health: "✚",
  Entertainment: "🎬",
  Education: "📚",
  Other: "•••",
};

const STORAGE_KEYS = {
  expenses: "spendsmart.expenses",
  budget: "spendsmart.budget",
  language: "spendsmart.language",
  theme: "spendsmart.theme",
};

const copy = {
  en: {
    greeting: "Good to see you",
    subtitle: "Here’s where your money went.",
    addExpense: "Add expense",
    editExpense: "Edit expense",
    today: "Spent today",
    month: "This month",
    topCategory: "Top category",
    transactions: "Transactions",
    monthlyBudget: "Monthly budget",
    budgetLeft: "left to spend",
    used: "used",
    setBudget: "Set budget",
    editBudget: "Edit budget",
    budgetAlmost: "You’re close to your monthly limit.",
    budgetExceeded: "Budget exceeded",
    overBy: "over budget",
    recentExpenses: "Recent expenses",
    viewAll: "View all",
    hide: "Show less",
    filters: "Filters",
    search: "Search expenses...",
    allCategories: "All categories",
    allPayments: "All payment methods",
    allDates: "All dates",
    clearFilters: "Clear filters",
    noExpenses: "No expenses yet",
    noExpensesBody: "Add your first expense and start seeing where your money goes.",
    noResults: "No matching expenses",
    noResultsBody: "Try changing your search or filters.",
    monthlySummary: "Spending by category",
    dailyAverage: "Daily average",
    noSpending: "No spending recorded this month.",
    amount: "Amount",
    category: "Category",
    description: "Description or note",
    descriptionPlaceholder: "e.g. Lunch with friends",
    date: "Date",
    paymentMethod: "Payment method",
    saveExpense: "Save expense",
    updateExpense: "Update expense",
    cancel: "Cancel",
    required: "This field is required.",
    amountError: "Enter an amount greater than zero.",
    futureDateError: "Date cannot be in the future.",
    deleteTitle: "Delete this expense?",
    deleteBody: "This action cannot be undone.",
    delete: "Delete",
    budgetTitle: "Set monthly budget",
    budgetPlaceholder: "Enter your monthly limit",
    saveBudget: "Save budget",
    exportCsv: "Export CSV",
    resetData: "Reset data",
    resetTitle: "Reset all data?",
    resetBody: "This permanently deletes every expense and your monthly budget.",
    confirmReset: "Yes, reset",
    language: "Language",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    menu: "Menu",
    moreActions: "More actions",
    currency: "IDR",
    expenseAdded: "Expense added",
    expenseUpdated: "Expense updated",
    expenseDeleted: "Expense deleted",
    budgetSaved: "Budget saved",
    dataReset: "All data reset",
    csvEmpty: "Add an expense before exporting.",
    of: "of",
    uncategorized: "No spending yet",
  },
  id: {
    greeting: "Senang bertemu lagi",
    subtitle: "Lihat ke mana uangmu pergi.",
    addExpense: "Tambah pengeluaran",
    editExpense: "Ubah pengeluaran",
    today: "Keluar hari ini",
    month: "Bulan ini",
    topCategory: "Kategori terbesar",
    transactions: "Transaksi",
    monthlyBudget: "Anggaran bulanan",
    budgetLeft: "tersisa",
    used: "terpakai",
    setBudget: "Atur anggaran",
    editBudget: "Ubah anggaran",
    budgetAlmost: "Kamu hampir mencapai batas bulanan.",
    budgetExceeded: "Anggaran terlampaui",
    overBy: "melebihi anggaran",
    recentExpenses: "Pengeluaran terbaru",
    viewAll: "Lihat semua",
    hide: "Tampilkan sedikit",
    filters: "Filter",
    search: "Cari pengeluaran...",
    allCategories: "Semua kategori",
    allPayments: "Semua metode",
    allDates: "Semua tanggal",
    clearFilters: "Hapus filter",
    noExpenses: "Belum ada pengeluaran",
    noExpensesBody: "Tambahkan pengeluaran pertama dan mulai pantau uangmu.",
    noResults: "Pengeluaran tidak ditemukan",
    noResultsBody: "Coba ubah pencarian atau filter.",
    monthlySummary: "Pengeluaran per kategori",
    dailyAverage: "Rata-rata harian",
    noSpending: "Belum ada pengeluaran bulan ini.",
    amount: "Jumlah",
    category: "Kategori",
    description: "Deskripsi atau catatan",
    descriptionPlaceholder: "mis. Makan siang bersama teman",
    date: "Tanggal",
    paymentMethod: "Metode pembayaran",
    saveExpense: "Simpan pengeluaran",
    updateExpense: "Perbarui pengeluaran",
    cancel: "Batal",
    required: "Kolom ini wajib diisi.",
    amountError: "Masukkan jumlah lebih dari nol.",
    futureDateError: "Tanggal tidak boleh di masa depan.",
    deleteTitle: "Hapus pengeluaran ini?",
    deleteBody: "Tindakan ini tidak dapat dibatalkan.",
    delete: "Hapus",
    budgetTitle: "Atur anggaran bulanan",
    budgetPlaceholder: "Masukkan batas bulanan",
    saveBudget: "Simpan anggaran",
    exportCsv: "Ekspor CSV",
    resetData: "Hapus semua data",
    resetTitle: "Hapus semua data?",
    resetBody: "Semua pengeluaran dan anggaran bulanan akan dihapus permanen.",
    confirmReset: "Ya, hapus",
    language: "Bahasa",
    darkMode: "Mode gelap",
    lightMode: "Mode terang",
    menu: "Menu",
    moreActions: "Tindakan lainnya",
    currency: "IDR",
    expenseAdded: "Pengeluaran ditambahkan",
    expenseUpdated: "Pengeluaran diperbarui",
    expenseDeleted: "Pengeluaran dihapus",
    budgetSaved: "Anggaran disimpan",
    dataReset: "Semua data dihapus",
    csvEmpty: "Tambahkan pengeluaran sebelum mengekspor.",
    of: "dari",
    uncategorized: "Belum ada pengeluaran",
  },
};

const categoryNames = {
  en: Object.fromEntries(CATEGORIES.map((item) => [item, item])),
  id: {
    Food: "Makanan",
    Transport: "Transportasi",
    Shopping: "Belanja",
    Bills: "Tagihan",
    Health: "Kesehatan",
    Entertainment: "Hiburan",
    Education: "Pendidikan",
    Other: "Lainnya",
  },
};

const paymentNames = {
  en: Object.fromEntries(PAYMENT_METHODS.map((item) => [item, item])),
  id: {
    Cash: "Tunai",
    "Debit Card": "Kartu Debit",
    "Credit Card": "Kartu Kredit",
    "E-Wallet": "Dompet Digital",
    "Bank Transfer": "Transfer Bank",
  },
};

function loadStored(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored === null ? fallback : JSON.parse(stored);
  } catch {
    return fallback;
  }
}

function saveStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The app remains usable if storage is blocked by the browser.
  }
}

function localDateString(date = new Date()) {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function formatMoney(value, language, compact = false) {
  return new Intl.NumberFormat(language === "id" ? "id-ID" : "en-US", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
    notation: compact && Math.abs(value) >= 1_000_000 ? "compact" : "standard",
  }).format(value);
}

function formatDate(value, language) {
  return new Intl.DateTimeFormat(language === "id" ? "id-ID" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function Icon({ name, size = 20 }) {
  const paths = {
    plus: <path d="M12 5v14M5 12h14" />,
    wallet: <path d="M20 7V6a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v8a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V7m14 7h.01" />,
    calendar: <path d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z" />,
    trend: <path d="m3 17 6-6 4 4 8-8m-5 0h5v5" />,
    receipt: <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Zm3 5h6m-6 4h6" />,
    search: <path d="m21 21-4.3-4.3m2.3-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />,
    filter: <path d="M4 6h16M7 12h10m-7 6h4" />,
    edit: <path d="m4 20 4.5-1 10-10-3.5-3.5-10 10L4 20Zm9-12 3.5 3.5M14 4.5l2-2 3.5 3.5-2 2" />,
    trash: <path d="M4 7h16m-10 4v6m4-6v6M9 4h6l1 3H8l1-3Zm-3 3 1 14h10l1-14" />,
    moon: <path d="M20 15.5A8 8 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    download: <path d="M12 3v12m-5-5 5 5 5-5M5 21h14" />,
    more: <path d="M5 12h.01M12 12h.01M19 12h.01" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    check: <path d="m5 12 4 4L19 6" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Header({ language, setLanguage, theme, setTheme, openForm, openMenu, t }) {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-mark"><Icon name="wallet" size={22} /></div>
        <span>Spend<span>Smart</span></span>
      </div>
      <nav className="header-actions">
        <button
          className="icon-button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title={theme === "dark" ? t.lightMode : t.darkMode}
          aria-label={theme === "dark" ? t.lightMode : t.darkMode}
        >
          <Icon name={theme === "dark" ? "sun" : "moon"} />
        </button>
        <div className="language-toggle" aria-label={t.language}>
          <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
          <button className={language === "id" ? "active" : ""} onClick={() => setLanguage("id")}>ID</button>
        </div>
        <button className="button primary desktop-add" onClick={openForm}>
          <Icon name="plus" size={18} /> {t.addExpense}
        </button>
        <button className="icon-button menu-button" onClick={openMenu} aria-label={t.moreActions}>
          <Icon name="more" />
        </button>
      </nav>
    </header>
  );
}

function DashboardCard({ icon, label, value, detail, tone = "blue" }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon name={icon} /></div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        {detail && <small>{detail}</small>}
      </div>
    </article>
  );
}

function BudgetSummary({ budget, spent, language, onEdit, t }) {
  const percent = budget > 0 ? (spent / budget) * 100 : 0;
  const remaining = budget - spent;
  const status = percent >= 100 ? "exceeded" : percent >= 80 ? "warning" : "normal";

  if (!budget) {
    return (
      <section className="budget-card budget-empty">
        <div className="budget-art"><Icon name="wallet" size={28} /></div>
        <div>
          <p className="eyebrow">{t.monthlyBudget}</p>
          <h3>{t.setBudget}</h3>
        </div>
        <button className="button secondary" onClick={onEdit}>{t.setBudget}</button>
      </section>
    );
  }

  return (
    <section className={`budget-card ${status}`}>
      <div className="budget-heading">
        <div>
          <p className="eyebrow">{t.monthlyBudget}</p>
          <h3>
            {remaining >= 0 ? formatMoney(remaining, language) : formatMoney(Math.abs(remaining), language)}
            <span>{remaining >= 0 ? t.budgetLeft : t.overBy}</span>
          </h3>
        </div>
        <button className="text-button" onClick={onEdit}>{t.editBudget}</button>
      </div>
      <div className="budget-track">
        <span style={{ width: `${Math.min(percent, 100)}%` }} />
      </div>
      <div className="budget-meta">
        <span>{formatMoney(spent, language)} {t.of} {formatMoney(budget, language)}</span>
        <strong>{Math.round(percent)}% {t.used}</strong>
      </div>
      {status !== "normal" && (
        <div className="budget-warning">
          <span>!</span>
          {status === "exceeded" ? t.budgetExceeded : t.budgetAlmost}
        </div>
      )}
    </section>
  );
}

function FilterBar({ filters, setFilters, language, t }) {
  const active = filters.search || filters.category || filters.payment || filters.date;
  const set = (key, value) => setFilters((current) => ({ ...current, [key]: value }));

  return (
    <div className="filter-bar">
      <label className="search-field">
        <Icon name="search" size={18} />
        <input
          value={filters.search}
          onChange={(event) => set("search", event.target.value)}
          placeholder={t.search}
        />
      </label>
      <div className="filter-selects">
        <label className="select-wrap">
          <select value={filters.category} onChange={(event) => set("category", event.target.value)}>
            <option value="">{t.allCategories}</option>
            {CATEGORIES.map((item) => <option key={item} value={item}>{categoryNames[language][item]}</option>)}
          </select>
        </label>
        <label className="select-wrap">
          <select value={filters.payment} onChange={(event) => set("payment", event.target.value)}>
            <option value="">{t.allPayments}</option>
            {PAYMENT_METHODS.map((item) => <option key={item} value={item}>{paymentNames[language][item]}</option>)}
          </select>
        </label>
        <label className="date-filter">
          <Icon name="calendar" size={17} />
          <input type="date" value={filters.date} onChange={(event) => set("date", event.target.value)} aria-label={t.date} />
        </label>
      </div>
      {active && (
        <button
          className="clear-button"
          onClick={() => setFilters({ search: "", category: "", payment: "", date: "" })}
        >
          <Icon name="close" size={15} /> {t.clearFilters}
        </button>
      )}
    </div>
  );
}

function ExpenseItem({ expense, language, onEdit, onDelete, t }) {
  return (
    <article className="expense-item">
      <div className="category-icon" style={{ "--category-color": CATEGORY_COLORS[expense.category] }}>
        {CATEGORY_ICONS[expense.category]}
      </div>
      <div className="expense-main">
        <div className="expense-title-row">
          <h4>{expense.description}</h4>
          <strong>-{formatMoney(expense.amount, language)}</strong>
        </div>
        <div className="expense-meta">
          <span className="category-badge" style={{ "--category-color": CATEGORY_COLORS[expense.category] }}>
            {categoryNames[language][expense.category]}
          </span>
          <span>{paymentNames[language][expense.payment]}</span>
          <span className="dot">•</span>
          <span>{formatDate(expense.date, language)}</span>
        </div>
      </div>
      <div className="item-actions">
        <button onClick={() => onEdit(expense)} aria-label={t.editExpense}><Icon name="edit" size={17} /></button>
        <button className="danger-icon" onClick={() => onDelete(expense)} aria-label={t.delete}><Icon name="trash" size={17} /></button>
      </div>
    </article>
  );
}

function EmptyState({ filtered, onAdd, t }) {
  return (
    <div className="empty-state">
      <div className="empty-icon"><Icon name={filtered ? "search" : "receipt"} size={30} /></div>
      <h3>{filtered ? t.noResults : t.noExpenses}</h3>
      <p>{filtered ? t.noResultsBody : t.noExpensesBody}</p>
      {!filtered && <button className="button primary" onClick={onAdd}><Icon name="plus" size={17} /> {t.addExpense}</button>}
    </div>
  );
}

function ExpenseList({ expenses, language, onEdit, onDelete, onAdd, filtered, t }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? expenses : expenses.slice(0, 5);

  return (
    <section className="panel expense-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t.transactions}</p>
          <h2>{t.recentExpenses}</h2>
        </div>
        {expenses.length > 5 && (
          <button className="text-button" onClick={() => setExpanded(!expanded)}>
            {expanded ? t.hide : t.viewAll} <Icon name="chevron" size={16} />
          </button>
        )}
      </div>
      {expenses.length ? (
        <div className="expense-list">
          {visible.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              language={language}
              onEdit={onEdit}
              onDelete={onDelete}
              t={t}
            />
          ))}
        </div>
      ) : <EmptyState filtered={filtered} onAdd={onAdd} t={t} />}
    </section>
  );
}

function MonthlySummary({ categoryTotals, monthTotal, dailyAverage, language, t }) {
  const items = Object.entries(categoryTotals)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1]);

  const gradient = items.length
    ? `conic-gradient(${items.reduce((parts, [category, value], index) => {
        const before = items.slice(0, index).reduce((sum, [, amount]) => sum + amount, 0);
        const start = (before / monthTotal) * 100;
        const end = ((before + value) / monthTotal) * 100;
        return [...parts, `${CATEGORY_COLORS[category]} ${start}% ${end}%`];
      }, []).join(", ")})`
    : "conic-gradient(var(--surface-muted) 0 100%)";

  return (
    <section className="panel summary-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t.monthlyBudget}</p>
          <h2>{t.monthlySummary}</h2>
        </div>
        <div className="average-pill">
          <span>{t.dailyAverage}</span>
          <strong>{formatMoney(dailyAverage, language, true)}</strong>
        </div>
      </div>
      {items.length ? (
        <div className="summary-content">
          <div className="donut" style={{ background: gradient }}>
            <div>
              <span>{t.month}</span>
              <strong>{formatMoney(monthTotal, language, true)}</strong>
            </div>
          </div>
          <div className="summary-legend">
            {items.map(([category, value]) => (
              <div className="legend-row" key={category}>
                <span className="legend-color" style={{ background: CATEGORY_COLORS[category] }} />
                <span>{categoryNames[language][category]}</span>
                <strong>{formatMoney(value, language, true)}</strong>
                <small>{Math.round((value / monthTotal) * 100)}%</small>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="summary-empty">
          <div className="donut empty"><div><strong>0</strong></div></div>
          <p>{t.noSpending}</p>
        </div>
      )}
    </section>
  );
}

function Modal({ title, onClose, children, className = "" }) {
  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("modal-open");
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className={`modal ${className}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-heading">
          <h2>{title}</h2>
          <button className="icon-button" onClick={onClose}><Icon name="close" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ExpenseForm({ expense, onSave, onClose, language, t }) {
  const [form, setForm] = useState({
    amount: expense?.amount ?? "",
    category: expense?.category ?? "",
    description: expense?.description ?? "",
    date: expense?.date ?? localDateString(),
    payment: expense?.payment ?? "",
  });
  const [errors, setErrors] = useState({});
  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.amount || Number(form.amount) <= 0) nextErrors.amount = t.amountError;
    if (!form.category) nextErrors.category = t.required;
    if (!form.description.trim()) nextErrors.description = t.required;
    if (!form.date) nextErrors.date = t.required;
    else if (form.date > localDateString()) nextErrors.date = t.futureDateError;
    if (!form.payment) nextErrors.payment = t.required;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    onSave({
      ...expense,
      ...form,
      amount: Number(form.amount),
      description: form.description.trim(),
      id: expense?.id ?? crypto.randomUUID(),
      createdAt: expense?.createdAt ?? new Date().toISOString(),
    });
  };

  return (
    <Modal title={expense ? t.editExpense : t.addExpense} onClose={onClose} className="form-modal">
      <form className="expense-form" onSubmit={submit} noValidate>
        <label className={errors.amount ? "field error" : "field"}>
          <span>{t.amount}</span>
          <div className="money-input">
            <b>Rp</b>
            <input
              type="number"
              min="0"
              step="1000"
              inputMode="numeric"
              value={form.amount}
              onChange={(event) => update("amount", event.target.value)}
              placeholder="0"
              autoFocus
            />
          </div>
          {errors.amount && <small>{errors.amount}</small>}
        </label>
        <label className={errors.description ? "field error" : "field"}>
          <span>{t.description}</span>
          <input value={form.description} onChange={(event) => update("description", event.target.value)} placeholder={t.descriptionPlaceholder} />
          {errors.description && <small>{errors.description}</small>}
        </label>
        <div className="form-grid">
          <label className={errors.category ? "field error" : "field"}>
            <span>{t.category}</span>
            <select value={form.category} onChange={(event) => update("category", event.target.value)}>
              <option value="">—</option>
              {CATEGORIES.map((item) => <option key={item} value={item}>{categoryNames[language][item]}</option>)}
            </select>
            {errors.category && <small>{errors.category}</small>}
          </label>
          <label className={errors.payment ? "field error" : "field"}>
            <span>{t.paymentMethod}</span>
            <select value={form.payment} onChange={(event) => update("payment", event.target.value)}>
              <option value="">—</option>
              {PAYMENT_METHODS.map((item) => <option key={item} value={item}>{paymentNames[language][item]}</option>)}
            </select>
            {errors.payment && <small>{errors.payment}</small>}
          </label>
        </div>
        <label className={errors.date ? "field error" : "field"}>
          <span>{t.date}</span>
          <input type="date" max={localDateString()} value={form.date} onChange={(event) => update("date", event.target.value)} />
          {errors.date && <small>{errors.date}</small>}
        </label>
        <div className="modal-actions">
          <button type="button" className="button secondary" onClick={onClose}>{t.cancel}</button>
          <button type="submit" className="button primary">{expense ? t.updateExpense : t.saveExpense}</button>
        </div>
      </form>
    </Modal>
  );
}

function ConfirmDialog({ title, body, confirmText, onConfirm, onClose, destructive = true, t }) {
  return (
    <Modal title={title} onClose={onClose} className="confirm-modal">
      <p className="confirm-copy">{body}</p>
      <div className="modal-actions">
        <button className="button secondary" onClick={onClose}>{t.cancel}</button>
        <button className={`button ${destructive ? "danger" : "primary"}`} onClick={onConfirm}>{confirmText}</button>
      </div>
    </Modal>
  );
}

function BudgetDialog({ budget, onSave, onClose, t }) {
  const [value, setValue] = useState(budget || "");
  const [error, setError] = useState("");
  const submit = (event) => {
    event.preventDefault();
    if (!value || Number(value) <= 0) {
      setError(t.amountError);
      return;
    }
    onSave(Number(value));
  };
  return (
    <Modal title={t.budgetTitle} onClose={onClose} className="confirm-modal">
      <form onSubmit={submit}>
        <label className={error ? "field error" : "field"}>
          <span>{t.monthlyBudget}</span>
          <div className="money-input">
            <b>Rp</b>
            <input type="number" min="0" step="100000" inputMode="numeric" value={value} onChange={(event) => { setValue(event.target.value); setError(""); }} placeholder={t.budgetPlaceholder} autoFocus />
          </div>
          {error && <small>{error}</small>}
        </label>
        <div className="modal-actions">
          <button type="button" className="button secondary" onClick={onClose}>{t.cancel}</button>
          <button className="button primary" type="submit">{t.saveBudget}</button>
        </div>
      </form>
    </Modal>
  );
}

function ActionMenu({ onExport, onReset, onClose, t }) {
  return (
    <>
      <div className="menu-scrim" onClick={onClose} />
      <div className="action-menu">
        <button onClick={() => { onExport(); onClose(); }}><Icon name="download" size={18} /> {t.exportCsv}</button>
        <button className="danger-text" onClick={() => { onReset(); onClose(); }}><Icon name="trash" size={18} /> {t.resetData}</button>
      </div>
    </>
  );
}

function Toast({ message }) {
  return <div className="toast"><Icon name="check" size={17} /> {message}</div>;
}

export default function App() {
  const [expenses, setExpenses] = useState(() => loadStored(STORAGE_KEYS.expenses, []));
  const [budget, setBudget] = useState(() => loadStored(STORAGE_KEYS.budget, 0));
  const [language, setLanguage] = useState(() => loadStored(STORAGE_KEYS.language, "en"));
  const [theme, setTheme] = useState(() => loadStored(STORAGE_KEYS.theme, "light"));
  const [filters, setFilters] = useState({ search: "", category: "", payment: "", date: "" });
  const [editingExpense, setEditingExpense] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showBudget, setShowBudget] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showReset, setShowReset] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [toast, setToast] = useState("");
  const t = copy[language];

  useEffect(() => saveStored(STORAGE_KEYS.expenses, expenses), [expenses]);
  useEffect(() => saveStored(STORAGE_KEYS.budget, budget), [budget]);
  useEffect(() => saveStored(STORAGE_KEYS.language, language), [language]);
  useEffect(() => saveStored(STORAGE_KEYS.theme, theme), [theme]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = language;
  }, [theme, language]);
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  const stats = useMemo(() => {
    const today = localDateString();
    const monthKey = today.slice(0, 7);
    const thisMonth = expenses.filter((item) => item.date.startsWith(monthKey));
    const todayTotal = expenses.filter((item) => item.date === today).reduce((sum, item) => sum + item.amount, 0);
    const monthTotal = thisMonth.reduce((sum, item) => sum + item.amount, 0);
    const categoryTotals = Object.fromEntries(CATEGORIES.map((category) => [
      category,
      thisMonth.filter((item) => item.category === category).reduce((sum, item) => sum + item.amount, 0),
    ]));
    const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
    const dayOfMonth = new Date().getDate();
    return {
      todayTotal,
      monthTotal,
      categoryTotals,
      topCategory: topCategory?.[1] > 0 ? topCategory[0] : null,
      dailyAverage: monthTotal / dayOfMonth,
      monthCount: thisMonth.length,
    };
  }, [expenses]);

  const filteredExpenses = useMemo(() => expenses
    .filter((item) => !filters.search || item.description.toLowerCase().includes(filters.search.toLowerCase()))
    .filter((item) => !filters.category || item.category === filters.category)
    .filter((item) => !filters.payment || item.payment === filters.payment)
    .filter((item) => !filters.date || item.date === filters.date)
    .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt)), [expenses, filters]);

  const notify = (message) => setToast(message);
  const saveExpense = (expense) => {
    if (editingExpense) {
      setExpenses((current) => current.map((item) => item.id === expense.id ? expense : item));
      notify(t.expenseUpdated);
    } else {
      setExpenses((current) => [expense, ...current]);
      notify(t.expenseAdded);
    }
    setShowForm(false);
    setEditingExpense(null);
  };
  const closeForm = () => {
    setShowForm(false);
    setEditingExpense(null);
  };
  const editExpense = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };
  const deleteExpense = () => {
    setExpenses((current) => current.filter((item) => item.id !== deleteTarget.id));
    setDeleteTarget(null);
    notify(t.expenseDeleted);
  };
  const saveBudget = (value) => {
    setBudget(value);
    setShowBudget(false);
    notify(t.budgetSaved);
  };
  const resetData = () => {
    setExpenses([]);
    setBudget(0);
    setFilters({ search: "", category: "", payment: "", date: "" });
    setShowReset(false);
    notify(t.dataReset);
  };
  const exportCsv = () => {
    if (!expenses.length) {
      notify(t.csvEmpty);
      return;
    }
    const escape = (value) => `"${String(value).replaceAll('"', '""')}"`;
    const rows = [
      ["Date", "Description", "Category", "Payment Method", "Amount"],
      ...expenses.map((item) => [item.date, item.description, item.category, item.payment, item.amount]),
    ];
    const csv = rows.map((row) => row.map(escape).join(",")).join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `spendsmart-${localDateString()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-shell">
      <Header
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        openForm={() => setShowForm(true)}
        openMenu={() => setShowMenu((value) => !value)}
        t={t}
      />
      <main>
        <section className="hero">
          <div>
            <p className="eyebrow">{new Intl.DateTimeFormat(language === "id" ? "id-ID" : "en-US", { weekday: "long", day: "numeric", month: "long" }).format(new Date())}</p>
            <h1>{t.greeting}<span>.</span></h1>
            <p>{t.subtitle}</p>
          </div>
          <div className="hero-actions">
            <button className="button secondary" onClick={exportCsv}><Icon name="download" size={18} /> {t.exportCsv}</button>
            <button className="button primary" onClick={() => setShowForm(true)}><Icon name="plus" size={18} /> {t.addExpense}</button>
          </div>
        </section>

        <section className="stats-grid">
          <DashboardCard icon="wallet" label={t.today} value={formatMoney(stats.todayTotal, language, true)} tone="blue" />
          <DashboardCard icon="calendar" label={t.month} value={formatMoney(stats.monthTotal, language, true)} tone="purple" />
          <DashboardCard icon="trend" label={t.topCategory} value={stats.topCategory ? categoryNames[language][stats.topCategory] : t.uncategorized} detail={stats.topCategory ? formatMoney(stats.categoryTotals[stats.topCategory], language, true) : ""} tone="orange" />
          <DashboardCard icon="receipt" label={t.transactions} value={stats.monthCount.toLocaleString(language === "id" ? "id-ID" : "en-US")} tone="green" />
        </section>

        <BudgetSummary budget={budget} spent={stats.monthTotal} language={language} onEdit={() => setShowBudget(true)} t={t} />
        <FilterBar filters={filters} setFilters={setFilters} language={language} t={t} />

        <div className="content-grid">
          <ExpenseList
            expenses={filteredExpenses}
            language={language}
            onEdit={editExpense}
            onDelete={setDeleteTarget}
            onAdd={() => setShowForm(true)}
            filtered={Boolean(filters.search || filters.category || filters.payment || filters.date)}
            t={t}
          />
          <MonthlySummary
            categoryTotals={stats.categoryTotals}
            monthTotal={stats.monthTotal}
            dailyAverage={stats.dailyAverage}
            language={language}
            t={t}
          />
        </div>
      </main>

      <button className="floating-add" onClick={() => setShowForm(true)} aria-label={t.addExpense}><Icon name="plus" size={25} /></button>

      {showForm && <ExpenseForm expense={editingExpense} onSave={saveExpense} onClose={closeForm} language={language} t={t} />}
      {showBudget && <BudgetDialog budget={budget} onSave={saveBudget} onClose={() => setShowBudget(false)} t={t} />}
      {deleteTarget && <ConfirmDialog title={t.deleteTitle} body={t.deleteBody} confirmText={t.delete} onConfirm={deleteExpense} onClose={() => setDeleteTarget(null)} t={t} />}
      {showReset && <ConfirmDialog title={t.resetTitle} body={t.resetBody} confirmText={t.confirmReset} onConfirm={resetData} onClose={() => setShowReset(false)} t={t} />}
      {showMenu && <ActionMenu onExport={exportCsv} onReset={() => setShowReset(true)} onClose={() => setShowMenu(false)} t={t} />}
      {toast && <Toast message={toast} />}
    </div>
  );
}
