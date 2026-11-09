
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Receipt,
  FileText,
  Settings,
  Search,
  Bell,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  ShieldCheck,
  Download,
  Menu,
  X,
  MoreHorizontal,
  CircleHelp,
} from "lucide-react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  NavLink,
  useLocation,
  Link,
  Outlet,
} from "react-router-dom";

import { useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Payments from "./pages/Payments";
import Modal from "./components/Modal";
import Toast from "./components/Toast";
import Loading from "./components/Loading";
import Table from "./components/Table";

const navItems = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Customers", path: "/dashboard/customers", icon: Users },
  { name: "Plans & Pricing", path: "/dashboard/plans", icon: CreditCard },
  { name: "Subscriptions", path: "/dashboard/subscriptions", icon: Receipt },
  { name: "Invoices", path: "/dashboard/invoices", icon: FileText },
  { name: "Payments", path: "/dashboard/payments", icon: Wallet },
];

const managementItems = [
  { name: "Ledger & Security", path: "/dashboard/security", icon: ShieldCheck },
  { name: "Team Members", path: "/dashboard/team", icon: Users },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

const invoices = [
  {
    id: "INV-0024",
    customer: "Acme Corporation",
    date: "Nov 06, 2026",
    amount: "$2,450.00",
    status: "Paid",
  },
  {
    id: "INV-0023",
    customer: "Vertex Solutions",
    date: "Nov 05, 2026",
    amount: "$1,280.00",
    status: "Pending",
  },
  {
    id: "INV-0022",
    customer: "Nova Technologies",
    date: "Nov 04, 2026",
    amount: "$3,600.00",
    status: "Paid",
  },
  {
    id: "INV-0021",
    customer: "Bright Labs",
    date: "Nov 03, 2026",
    amount: "$890.00",
    status: "Overdue",
  },
];

function DashboardLayout() {
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);

  const currentItem = [...navItems, ...managementItems].find(
    (item) => item.path === location.pathname
  );

  const currentPage = currentItem?.name || "Overview";

  const renderNavigation = (items: typeof navItems) =>
    items.map((item) => {
      const Icon = item.icon;

      return (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/dashboard"}
          onClick={() => setMobileMenu(false)}
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition ${
              isActive
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-500 hover:bg-slate-50"
            }`
          }
        >
          <Icon size={19} />
          {item.name}
        </NavLink>
      );
    });

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-800 md:flex">

      <aside className="hidden md:flex w-64 min-h-screen bg-white border-r border-slate-200 flex-col fixed left-0 top-0 z-20">

        <div className="px-7 py-7 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <ShieldCheck size={23} />
          </div>

          <div>
            <h1 className="font-bold text-xl tracking-tight">
              LedgerGuard
            </h1>
            <p className="text-xs text-slate-400">
              Billing Platform
            </p>
          </div>
        </div>

        <div className="px-5 mt-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Workspace
          </p>

          {renderNavigation(navItems)}

          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-9 mb-4">
            Management
          </p>

          {renderNavigation(managementItems)}
        </div>

        <div className="mt-auto p-5">
          <div className="bg-indigo-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm">
              <ShieldCheck size={17} />
              Secure Workspace
            </div>

            <p className="text-xs text-slate-500 mt-2 leading-5">
              Tenant isolation implementation and verification pending.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              AC
            </div>

            <div>
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs text-slate-400">
                admin@acme.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 md:ml-64 min-w-0">

        <header className="h-20 bg-white border-b border-slate-200 px-5 md:px-9 flex items-center justify-between sticky top-0 z-10">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden p-2 text-slate-500"
              aria-label="Toggle navigation"
            >
              {mobileMenu ? <X /> : <Menu />}
            </button>

            <div>
              <h2 className="text-lg font-bold">{currentPage}</h2>
              <p className="text-xs text-slate-400 hidden sm:block">
                Welcome back! Manage your billing workspace.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-500">
              <Search size={16} />
              Search
            </button>

            <button className="relative p-2.5 border border-slate-200 rounded-xl text-slate-500">
              <Bell size={19} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              AC
            </div>
          </div>
        </header>

        {mobileMenu && (
          <div className="md:hidden bg-white border-b border-slate-200 p-5">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-3">
              Workspace
            </p>

            {renderNavigation(navItems)}

            <p className="text-xs font-semibold text-slate-400 uppercase mt-6 mb-3">
              Management
            </p>

            {renderNavigation(managementItems)}
          </div>
        )}

        <Outlet />

      </main>
    </div>
  );
}

function Overview() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$48,290",
      change: "+12.8%",
      icon: Wallet,
      positive: true,
    },
    {
      title: "Active Subscriptions",
      value: "1,284",
      change: "+8.2%",
      icon: CreditCard,
      positive: true,
    },
    {
      title: "Total Customers",
      value: "856",
      change: "+5.4%",
      icon: Users,
      positive: true,
    },
    {
      title: "Pending Invoices",
      value: "24",
      change: "-2.1%",
      icon: Receipt,
      positive: false,
    },
  ];

  return (
    <div className="p-5 md:p-9 max-w-[1500px] mx-auto">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Dashboard
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Track your business performance and revenue.
          </p>
        </div>

        <Link
          to="/dashboard/invoices"
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 py-3 text-sm font-semibold flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Create Invoice
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Icon size={20} />
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-5">
                {card.value}
              </h3>

              <div className="flex items-center gap-1 mt-2 text-xs">
                {card.positive ? (
                  <ArrowUpRight size={15} className="text-emerald-600" />
                ) : (
                  <ArrowDownRight size={15} className="text-red-500" />
                )}

                <span className={card.positive ? "text-emerald-600 font-semibold" : "text-red-500 font-semibold"}>
                  {card.change}
                </span>

                <span className="text-slate-400">
                  vs last month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-7">

        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">
                Revenue Overview
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Monthly revenue performance
              </p>
            </div>

            <select className="border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none">
              <option>Last 7 months</option>
              <option>Last 30 days</option>
            </select>
          </div>

          <div className="flex items-end justify-between h-52 gap-3 mt-8 px-2">
            {[45, 65, 50, 80, 60, 90, 72].map((height, i) => (
              <div
                key={i}
                className="flex-1 h-full flex flex-col justify-end items-center gap-3"
              >
                <div
                  className="w-full max-w-12 rounded-t-lg bg-indigo-500 hover:bg-indigo-700 transition"
                  style={{ height: `${height}%` }}
                />

                <span className="text-xs text-slate-400">
                  {["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Security Status</h3>
            <ShieldCheck size={23} />
          </div>

          <div className="mt-9">
            <p className="text-indigo-200 text-sm">
              Workspace protection
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Preview
            </h2>

            <p className="text-xs text-indigo-200 mt-2">
              Backend security verification pending.
            </p>
          </div>

          <div className="mt-8 pt-5 border-t border-indigo-400/40 flex items-center justify-between text-sm">
            <span>Tenant isolation</span>
            <span className="font-semibold">UI Preview</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mt-7">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-lg">
              Recent Invoices
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Latest billing transactions
            </p>
          </div>

          <Link
            to="/dashboard/invoices"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="text-xs text-slate-400 border-b border-slate-100">
                <th className="pb-4 font-medium">Invoice</th>
                <th className="pb-4 font-medium">Customer</th>
                <th className="pb-4 font-medium">Date</th>
                <th className="pb-4 font-medium">Amount</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-slate-50 text-sm"
                >
                  <td className="py-4 font-semibold text-indigo-600">
                    {invoice.id}
                  </td>

                  <td className="py-4 font-medium">
                    {invoice.customer}
                  </td>

                  <td className="py-4 text-slate-500">
                    {invoice.date}
                  </td>

                  <td className="py-4 font-semibold">
                    {invoice.amount}
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        invoice.status === "Paid"
                          ? "bg-emerald-50 text-emerald-600"
                          : invoice.status === "Pending"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>

                  <td className="py-4">
                    <button className="text-slate-400 hover:text-indigo-600">
                      <MoreHorizontal size={19} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ManagementPage({ title, description }: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-5 md:p-9 max-w-[1500px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            {description}
          </p>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 py-3 text-sm font-semibold flex items-center justify-center gap-2">
          <Plus size={18} />
          Add New
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 shadow-sm">
        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-5">
          <LayoutDashboard size={28} />
        </div>

        <h3 className="text-xl font-bold text-slate-800">
          {title} Management
        </h3>

        <p className="text-sm text-slate-500 mt-3 max-w-lg leading-6">
          This page is connected to the LedgerGuard dashboard navigation.
          Its actual features and backend integration will be implemented next.
        </p>

        <div className="mt-7 p-4 rounded-xl bg-indigo-50 text-indigo-700 text-sm">
          Page navigation is working successfully.
          Feature implementation is pending.
        </div>
      </div>
    </div>
  );
}


function Customers() {
  type Customer = {
    id: number;
    name: string;
    email: string;
    company: string;
    status: string;
  };

  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: "John Smith", email: "john@acme.com", company: "Acme Corporation", status: "Active" },
    { id: 2, name: "Sarah Wilson", email: "sarah@vertex.com", company: "Vertex Solutions", status: "Active" },
    { id: 3, name: "Michael Brown", email: "michael@nova.com", company: "Nova Technologies", status: "Active" },
    { id: 4, name: "Emily Davis", email: "emily@bright.com", company: "Bright Labs", status: "Inactive" },
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingId !== null) {
      setCustomers((previous) =>
        previous.map((customer) =>
          customer.id === editingId
            ? { ...customer, name, email, company }
            : customer
        )
      );
    } else {
      setCustomers((previous) => [
        ...previous,
        {
          id: Date.now(),
          name,
          email,
          company,
          status: "Active",
        },
      ]);
    }

    resetForm();
  };

  const handleEdit = (customer: Customer) => {
    setEditingId(customer.id);
    setName(customer.name);
    setEmail(customer.email);
    setCompany(customer.company);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers((previous) =>
        previous.filter((customer) => customer.id !== id)
      );
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    `${customer.name} ${customer.email} ${customer.company}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-5 md:p-9 max-w-[1500px] mx-auto">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold">Customers</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage and organize your business customers.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-7">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">Total Customers</p>
          <h3 className="text-3xl font-bold mt-3">{customers.length}</h3>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">Active Customers</p>
          <h3 className="text-3xl font-bold mt-3">
            {customers.filter((c) => c.status === "Active").length}
          </h3>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">Inactive Customers</p>
          <h3 className="text-3xl font-bold mt-3">
            {customers.filter((c) => c.status === "Inactive").length}
          </h3>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 md:p-6">

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div>
            <h3 className="font-bold text-lg">All Customers</h3>
            <p className="text-xs text-slate-400 mt-1">
              View and manage your customers.
            </p>
          </div>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-72 pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-400">
                <th className="pb-4">Customer</th>
                <th className="pb-4">Company</th>
                <th className="pb-4">Email</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-slate-50 text-sm">
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                        {customer.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold">{customer.name}</span>
                    </div>
                  </td>

                  <td className="py-5">{customer.company}</td>
                  <td className="py-5 text-slate-500">{customer.email}</td>

                  <td className="py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      customer.status === "Active"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {customer.status}
                    </span>
                  </td>

                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(customer)}
                        className="text-indigo-600 font-semibold hover:text-indigo-800"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="text-red-500 font-semibold hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-400">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl">

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">
                {editingId !== null ? "Edit Customer" : "Add New Customer"}
              </h3>

              <button onClick={resetForm} className="text-slate-400 hover:text-red-500">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Customer Name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter customer name"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@company.com"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Company Name
                </label>
                <input
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Enter company name"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 border border-slate-200 rounded-xl py-3 font-semibold text-slate-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-semibold"
                >
                  {editingId !== null ? "Save Changes" : "Add Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


function Plans() {
  type Plan = {
    id: number;
    name: string;
    monthly: number;
    yearly: number;
    features: string;
    status: string;
  };

  const [plans, setPlans] = useState<Plan[]>([
    {
      id: 1,
      name: "Starter",
      monthly: 19,
      yearly: 190,
      features: "Basic billing, 5 team members",
      status: "Active",
    },
    {
      id: 2,
      name: "Professional",
      monthly: 49,
      yearly: 490,
      features: "Advanced analytics, 20 team members",
      status: "Active",
    },
    {
      id: 3,
      name: "Enterprise",
      monthly: 99,
      yearly: 990,
      features: "Unlimited members, Priority support",
      status: "Active",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [monthly, setMonthly] = useState("");
  const [yearly, setYearly] = useState("");
  const [features, setFeatures] = useState("");

  const resetForm = () => {
    setName("");
    setMonthly("");
    setYearly("");
    setFeatures("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const monthlyPrice = Number(monthly);
    const yearlyPrice = Number(yearly);

    if (
      !name.trim() ||
      !Number.isFinite(monthlyPrice) ||
      !Number.isFinite(yearlyPrice) ||
      monthlyPrice < 0 ||
      yearlyPrice < 0
    ) {
      return;
    }

    if (editingId !== null) {
      setPlans((previous) =>
        previous.map((plan) =>
          plan.id === editingId
            ? { ...plan, name, monthly: monthlyPrice, yearly: yearlyPrice, features }
            : plan
        )
      );
    } else {
      setPlans((previous) => [
        ...previous,
        {
          id: Date.now(),
          name,
          monthly: monthlyPrice,
          yearly: yearlyPrice,
          features,
          status: "Active",
        },
      ]);
    }

    resetForm();
  };

  const handleEdit = (plan: Plan) => {
    setEditingId(plan.id);
    setName(plan.name);
    setMonthly(String(plan.monthly));
    setYearly(String(plan.yearly));
    setFeatures(plan.features);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setPlans((previous) => previous.filter((plan) => plan.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    setPlans((previous) =>
      previous.map((plan) =>
        plan.id === id
          ? {
              ...plan,
              status: plan.status === "Active" ? "Inactive" : "Active",
            }
          : plan
      )
    );
  };

  return (
    <div className="p-5 md:p-9 max-w-[1500px] mx-auto">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold">Plans & Pricing</h2>
          <p className="text-sm text-slate-500 mt-1">
            Create and manage your subscription pricing plans.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Create New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">Total Plans</p>
          <h3 className="text-3xl font-bold mt-3">{plans.length}</h3>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">Active Plans</p>
          <h3 className="text-3xl font-bold mt-3">
            {plans.filter((p) => p.status === "Active").length}
          </h3>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">Inactive Plans</p>
          <h3 className="text-3xl font-bold mt-3">
            {plans.filter((p) => p.status === "Inactive").length}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-indigo-600">
                SUBSCRIPTION PLAN
              </span>

              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                plan.status === "Active"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-slate-100 text-slate-500"
              }`}>
                {plan.status}
              </span>
            </div>

            <h3 className="text-2xl font-bold mt-6">{plan.name}</h3>

            <div className="mt-5">
              <p className="text-sm text-slate-500">Monthly Price</p>
              <h2 className="text-3xl font-bold mt-1">
                ${plan.monthly}
                <span className="text-sm text-slate-400 font-normal">
                  /month
                </span>
              </h2>
            </div>

            <div className="mt-5 p-4 bg-indigo-50 rounded-xl">
              <p className="text-sm text-indigo-700">Yearly Price</p>
              <h3 className="text-xl font-bold text-indigo-800 mt-1">
                ${plan.yearly}/year
              </h3>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-700">
                Plan Features
              </p>
              <p className="text-sm text-slate-500 mt-2 leading-6">
                {plan.features || "No features added yet."}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-7 pt-5 border-t border-slate-100">
              <button
                onClick={() => handleEdit(plan)}
                className="py-2 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-semibold hover:bg-indigo-100"
              >
                Edit
              </button>

              <button
                onClick={() => toggleStatus(plan.id)}
                className="py-2 rounded-lg bg-amber-50 text-amber-700 text-sm font-semibold hover:bg-amber-100"
              >
                {plan.status === "Active" ? "Disable" : "Enable"}
              </button>

              <button
                onClick={() => handleDelete(plan.id)}
                className="py-2 rounded-lg bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {plans.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 mt-6">
          <CreditCard size={40} className="mx-auto text-slate-300" />
          <h3 className="font-bold text-lg mt-4">No Plans Available</h3>
          <p className="text-sm text-slate-500 mt-2">
            Create your first subscription plan.
          </p>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl">

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">
                {editingId !== null ? "Edit Plan" : "Create New Plan"}
              </h3>

              <button onClick={resetForm} className="text-slate-400 hover:text-red-500">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Plan Name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Premium Plan"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Monthly Price ($)
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={monthly}
                    onChange={(e) => setMonthly(e.target.value)}
                    placeholder="49"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Yearly Price ($)
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={yearly}
                    onChange={(e) => setYearly(e.target.value)}
                    placeholder="490"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Plan Features
                </label>
                <textarea
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="Enter plan features..."
                  rows={3}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 border border-slate-200 rounded-xl py-3 font-semibold text-slate-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-semibold"
                >
                  {editingId !== null ? "Save Changes" : "Create Plan"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}



function Subscriptions() {
  type Subscription = {
    id: number;
    customer: string;
    plan: string;
    billing: string;
    amount: number;
    status: string;
    date: string;
  };

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { id: 1, customer: "John Smith", plan: "Professional", billing: "Monthly", amount: 49, status: "Active", date: "Nov 01, 2026" },
    { id: 2, customer: "Sarah Wilson", plan: "Enterprise", billing: "Yearly", amount: 990, status: "Active", date: "Nov 02, 2026" },
    { id: 3, customer: "Michael Brown", plan: "Starter", billing: "Monthly", amount: 19, status: "Active", date: "Nov 03, 2026" },
    { id: 4, customer: "Emily Davis", plan: "Professional", billing: "Yearly", amount: 490, status: "Cancelled", date: "Nov 04, 2026" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [customer, setCustomer] = useState("John Smith");
  const [plan, setPlan] = useState("Professional");
  const [billing, setBilling] = useState("Monthly");
  const [search, setSearch] = useState("");

  const customers = [
    "John Smith",
    "Sarah Wilson",
    "Michael Brown",
    "Emily Davis",
  ];

  const planOptions = [
    { name: "Starter", monthly: 19, yearly: 190 },
    { name: "Professional", monthly: 49, yearly: 490 },
    { name: "Enterprise", monthly: 99, yearly: 990 },
  ];

  const selectedPlan = planOptions.find((p) => p.name === plan);

  const amount =
    billing === "Monthly"
      ? selectedPlan?.monthly ?? 0
      : selectedPlan?.yearly ?? 0;

  const resetForm = () => {
    setCustomer("John Smith");
    setPlan("Professional");
    setBilling("Monthly");
    setEditingId(null);
    setShowForm(false);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSubscription = {
  id: editingId ?? Date.now(),
  customer,
  plan,
  billing,
  amount,
  status: "Active",
  date:
    editingId !== null
      ? subscriptions.find((s) => s.id === editingId)?.date ?? "Nov 06, 2026"
      : "Nov 06, 2026",
};

    if (editingId !== null) {
      setSubscriptions((previous) =>
        previous.map((s) =>
          s.id === editingId
            ? { ...newSubscription, status: s.status }
            : s
        )
      );
    } else {
      setSubscriptions((previous) => [
        newSubscription,
        ...previous,
      ]);
    }

    resetForm();
  };

  const handleEdit = (subscription: Subscription) => {
    setEditingId(subscription.id);
    setCustomer(subscription.customer);
    setPlan(subscription.plan);
    setBilling(subscription.billing);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this subscription?")) {
      setSubscriptions((previous) =>
        previous.filter((s) => s.id !== id)
      );
    }
  };

  const toggleStatus = (id: number) => {
    setSubscriptions((previous) =>
      previous.map((s) =>
        s.id === id
          ? {
              ...s,
              status: s.status === "Active" ? "Cancelled" : "Active",
            }
          : s
      )
    );
  };

  const filteredSubscriptions = subscriptions.filter((s) =>
    `${s.customer} ${s.plan} ${s.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-5 md:p-9 max-w-[1500px] mx-auto">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold">Subscriptions</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage customer subscriptions and billing cycles.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Create Subscription
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-7">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">Total Subscriptions</p>
          <h3 className="text-3xl font-bold mt-3">
            {subscriptions.length}
          </h3>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">Active Subscriptions</p>
          <h3 className="text-3xl font-bold mt-3">
            {subscriptions.filter((s) => s.status === "Active").length}
          </h3>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">Cancelled Subscriptions</p>
          <h3 className="text-3xl font-bold mt-3">
            {subscriptions.filter((s) => s.status === "Cancelled").length}
          </h3>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div>
            <h3 className="font-bold text-lg">All Subscriptions</h3>
            <p className="text-xs text-slate-400 mt-1">
              Monitor your customer billing activity.
            </p>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subscriptions..."
            className="w-full sm:w-72 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-400">
                <th className="pb-4">Customer</th>
                <th className="pb-4">Plan</th>
                <th className="pb-4">Billing Cycle</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSubscriptions.map((s) => (
                <tr key={s.id} className="border-b border-slate-50 text-sm">
                  <td className="py-5 font-semibold">{s.customer}</td>

                  <td className="py-5">
                    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-xs font-semibold">
                      {s.plan}
                    </span>
                  </td>

                  <td className="py-5 text-slate-500">{s.billing}</td>

                  <td className="py-5 font-bold">${s.amount}</td>

                  <td className="py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      s.status === "Active"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-500"
                    }`}>
                      {s.status}
                    </span>
                  </td>

                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(s)}
                        className="text-indigo-600 font-semibold"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => toggleStatus(s.id)}
                        className="text-amber-600 font-semibold"
                      >
                        {s.status === "Active" ? "Cancel" : "Activate"}
                      </button>

                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-red-500 font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredSubscriptions.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    No subscriptions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl">

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">
                {editingId !== null ? "Edit Subscription" : "Create Subscription"}
              </h3>

              <button onClick={resetForm}>
                <X size={22} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Select Customer
                </label>

                <select
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none"
                >
                  {customers.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Select Plan
                </label>

                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none"
                >
                  {planOptions.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Billing Cycle
                </label>

                <select
                  value={billing}
                  onChange={(e) => setBilling(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>

              <div className="bg-indigo-50 p-4 rounded-xl">
                <p className="text-sm text-indigo-600">Subscription Amount</p>
                <h3 className="text-2xl font-bold text-indigo-800 mt-1">
                  ${amount}
                  <span className="text-sm font-normal">
                    /{billing === "Monthly" ? "month" : "year"}
                  </span>
                </h3>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 border border-slate-200 rounded-xl py-3 font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-semibold"
                >
                  {editingId !== null ? "Save Changes" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Invoices() {
  type Invoice = {
    id: number;
    invoiceNo: string;
    customer: string;
    amount: number;
    issueDate: string;
    dueDate: string;
    status: "Paid" | "Pending";
  };

  const customers = ["Acme Corporation", "Tech Solutions", "Global Services", "Digital Agency"];

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 1,
      invoiceNo: "INV-1001",
      customer: "Acme Corporation",
      amount: 25000,
      issueDate: "2026-11-01",
      dueDate: "2026-11-15",
      status: "Paid",
    },
    {
      id: 2,
      invoiceNo: "INV-1002",
      customer: "Tech Solutions",
      amount: 18000,
      issueDate: "2026-11-02",
      dueDate: "2026-11-10",
      status: "Pending",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [customer, setCustomer] = useState(customers[0]);
  const [amount, setAmount] = useState("");
  const [issueDate, setIssueDate] = useState("2026-11-06");
  const [dueDate, setDueDate] = useState("2026-11-15");
  const [status, setStatus] = useState<"Paid" | "Pending">("Pending");

  const getInvoiceStatus = (invoice: Invoice) => {
    if (invoice.status === "Paid") return "Paid";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(invoice.dueDate + "T00:00:00");

    return due < today ? "Overdue" : "Pending";
  };

  const resetForm = () => {
    setCustomer(customers[0]);
    setAmount("");
    setIssueDate(new Date().toISOString().slice(0, 10));
    setDueDate("2026-11-15");
    setStatus("Pending");
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!customer || Number(amount) <= 0 || !dueDate || !issueDate) {
      alert("Please enter valid invoice details.");
      return;
    }

    if (dueDate < issueDate) {
      alert("Due date cannot be earlier than issue date.");
      return;
    }

    if (editingId !== null) {
      setInvoices((previous) =>
        previous.map((invoice) =>
          invoice.id === editingId
            ? {
                ...invoice,
                customer,
                amount: Number(amount),
                issueDate,
                dueDate,
                status,
              }
            : invoice
        )
      );
    } else {
      const nextNumber =
        Math.max(1000, ...invoices.map((invoice) => Number(invoice.invoiceNo.replace("INV-", "")))) + 1;

      const newInvoice: Invoice = {
        id: Date.now(),
        invoiceNo: `INV-${nextNumber}`,
        customer,
        amount: Number(amount),
        issueDate,
        dueDate,
        status,
      };

      setInvoices((previous) => [newInvoice, ...previous]);
    }

    resetForm();
  };

  const handleEdit = (invoice: Invoice) => {
    setEditingId(invoice.id);
    setCustomer(invoice.customer);
    setAmount(String(invoice.amount));
    setIssueDate(invoice.issueDate);
    setDueDate(invoice.dueDate);
    setStatus(invoice.status);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      setInvoices((previous) => previous.filter((invoice) => invoice.id !== id));
    }
  };

  const handlePrint = (invoice: Invoice) => {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Please allow pop-ups to print the invoice.");
      return;
    }

    const safe = (value: string) =>
      value.replace(/[&<>"']/g, (character) => {
        const entities: Record<string, string> = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        };
        return entities[character];
      });

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${safe(invoice.invoiceNo)}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 45px; color: #222; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #4f46e5; padding-bottom: 20px; }
            h1 { color: #4f46e5; margin: 0; }
            .details { margin-top: 35px; line-height: 2; }
            table { width: 100%; border-collapse: collapse; margin-top: 35px; }
            th, td { padding: 15px; border: 1px solid #ddd; text-align: left; }
            th { background: #f3f4f6; }
            .total { text-align: right; margin-top: 25px; font-size: 22px; font-weight: bold; }
            .footer { margin-top: 60px; color: #777; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <div><h1>LedgerGuard</h1><p>Professional Billing & Invoicing</p></div>
            <div><h2>INVOICE</h2><p>${safe(invoice.invoiceNo)}</p></div>
          </div>
          <div class="details">
            <strong>Bill To:</strong> ${safe(invoice.customer)}<br/>
            <strong>Issue Date:</strong> ${safe(invoice.issueDate)}<br/>
            <strong>Due Date:</strong> ${safe(invoice.dueDate)}<br/>
            <strong>Status:</strong> ${getInvoiceStatus(invoice)}
          </div>
          <table>
            <tr><th>Description</th><th>Amount</th></tr>
            <tr><td>Billing Services</td><td>₹${invoice.amount.toLocaleString("en-IN")}</td></tr>
          </table>
          <div class="total">Total: ₹${invoice.amount.toLocaleString("en-IN")}</div>
          <div class="footer">Thank you for your business!<br/>Generated by LedgerGuard</div>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(search.toLowerCase())
  );

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingCount = invoices.filter(
    (invoice) => getInvoiceStatus(invoice) === "Pending"
  ).length;
  const overdueCount = invoices.filter(
    (invoice) => getInvoiceStatus(invoice) === "Overdue"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
          <p className="mt-1 text-sm text-slate-500">
            Create, view and manage customer invoices.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setCustomer(customers[0]);
            setAmount("");
            setIssueDate(new Date().toISOString().slice(0, 10));
            setDueDate("2026-11-15");
            setStatus("Pending");
            setShowForm(true);
          }}
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          + Create Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total Invoices</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">{invoices.length}</h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total Amount</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            ₹{totalAmount.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Paid Amount</p>
          <h2 className="mt-2 text-2xl font-bold text-emerald-600">
            ₹{paidAmount.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Pending / Overdue</p>
          <h2 className="mt-2 text-2xl font-bold text-amber-600">
            {pendingCount} / {overdueCount}
          </h2>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-900">All Invoices</h2>

          <input
            type="text"
            placeholder="Search invoice or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 sm:w-72"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                <th className="px-4 py-3">Invoice</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredInvoices.map((invoice) => {
                const invoiceStatus = getInvoiceStatus(invoice);

                return (
                  <tr key={invoice.id} className="border-b border-slate-100 text-sm">
                    <td className="px-4 py-4 font-semibold text-indigo-600">
                      {invoice.invoiceNo}
                    </td>
                    <td className="px-4 py-4 text-slate-700">{invoice.customer}</td>
                    <td className="px-4 py-4 font-semibold text-slate-900">
                      ₹{invoice.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-4 text-slate-600">{invoice.dueDate}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          invoiceStatus === "Paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : invoiceStatus === "Overdue"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {invoiceStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(invoice)}
                          className="font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handlePrint(invoice)}
                          className="font-medium text-emerald-600 hover:text-emerald-800"
                        >
                          Print
                        </button>
                        <button
                          onClick={() => handleDelete(invoice.id)}
                          className="font-medium text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <div className="my-8 w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {editingId !== null ? "Edit Invoice" : "Create Invoice"}
              </h2>
              <button
                onClick={resetForm}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Customer
                </label>
                <select
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                >
                  {customers.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Invoice Amount (₹)
                </label>
                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    min={issueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Payment Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "Paid" | "Pending")}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  {editingId !== null ? "Update Invoice" : "Create Invoice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Security() {
  return (
    <ManagementPage
      title="Ledger & Security"
      description="Monitor ledger records and workspace security."
    />
  );
}

function Team() {
  return (
    <ManagementPage
      title="Team Members"
      description="Manage workspace members and their access."
    />
  );
}

function SettingsPage() {
  return (
    <ManagementPage
      title="Settings"
      description="Manage your workspace preferences and settings."
    />
  );
}
function ModalTest() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-xl font-bold mb-5">
          Modal Component Testing
        </h2>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white px-5 py-3 rounded-lg"
        >
          Open Modal
        </button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal Test Successful!"
        >
          <p className="text-slate-600">
            Congratulations! Your Modal Component is working.
          </p>
        </Modal>
      </div>
    </div>
  );
}



function ToastTest() {
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-xl font-bold mb-5">
          Toast Component Testing
        </h2>

        <button
          onClick={() => setShowToast(true)}
          className="bg-green-600 text-white px-5 py-3 rounded-lg"
        >
          Show Toast
        </button>

        {showToast && (
          <Toast
            type="success"
            message="Toast Component is working successfully!"
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </div>
  );
}
function LoadingTest() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-xl font-bold mb-5">
          Loading Component Testing
        </h2>

        <Loading text="Please wait, loading..." />
      </div>
    </div>
  );
}
function TableTest() {
  const columns = [
    { key: "name", header: "Customer Name" },
    { key: "email", header: "Email" },
    { key: "status", header: "Status" },
  ] as const;

  const data = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Amit Kumar",
      email: "amit@gmail.com",
      status: "Active",
    },
    {
      id: 3,
      name: "Priya Singh",
      email: "priya@gmail.com",
      status: "Inactive",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">
          Table Component Testing
        </h2>

        <Table
          columns={[...columns]}
          data={data}
          rowKey="id"
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/table-test" element={<TableTest />} />
        <Route path="/loading-test" element={<LoadingTest />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/modal-test" element={<ModalTest />} />
        <Route path="/toast-test" element={<ToastTest />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="customers" element={<Customers />} />
          <Route path="plans" element={<Plans />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="payments" element={<Payments />} />
          <Route path="security" element={<Security />} />
          <Route path="team" element={<Team />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
