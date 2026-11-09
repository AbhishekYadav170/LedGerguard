
import { useState } from "react";
import {
  Wallet,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Plus,
  X,
  Download,
  RotateCcw,
} from "lucide-react";

type Payment = {
  id: number;
  transactionId: string;
  customer: string;
  invoice: string;
  amount: number;
  method: string;
  date: string;
  status: "Successful" | "Pending" | "Failed" | "Refunded";
};

const initialPayments: Payment[] = [
  {
    id: 1,
    transactionId: "TXN-1001",
    customer: "Acme Corporation",
    invoice: "INV-1001",
    amount: 25000,
    method: "UPI",
    date: "2026-11-06",
    status: "Successful",
  },
  {
    id: 2,
    transactionId: "TXN-1002",
    customer: "Tech Solutions",
    invoice: "INV-1002",
    amount: 18000,
    method: "Credit Card",
    date: "2026-11-05",
    status: "Pending",
  },
  {
    id: 3,
    transactionId: "TXN-1003",
    customer: "Global Services",
    invoice: "INV-1003",
    amount: 12000,
    method: "Net Banking",
    date: "2026-11-04",
    status: "Failed",
  },
  {
    id: 4,
    transactionId: "TXN-1004",
    customer: "Digital Agency",
    invoice: "INV-1004",
    amount: 8500,
    method: "UPI",
    date: "2026-11-03",
    status: "Refunded",
  },
];

const formatAmount = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;

function Payments() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [customer, setCustomer] = useState("");
  const [invoice, setInvoice] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("UPI");
  const [status, setStatus] = useState<
    Payment["status"]
  >("Successful");

  const resetForm = () => {
    setCustomer("");
    setInvoice("");
    setAmount("");
    setMethod("UPI");
    setStatus("Successful");
    setShowForm(false);
  };

  const handleAddPayment = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const paymentAmount = Number(amount);

    if (!customer.trim() || !invoice.trim() || paymentAmount <= 0) {
      alert("Please enter valid payment details.");
      return;
    }

    const newPayment: Payment = {
      id: Date.now(),
      transactionId: `TXN-${Date.now().toString().slice(-6)}`,
      customer,
      invoice,
      amount: paymentAmount,
      method,
      date: new Date().toISOString().slice(0, 10),
      status,
    };

    setPayments((previous) => [newPayment, ...previous]);
    resetForm();
  };

  const updateStatus = (
    id: number,
    newStatus: Payment["status"]
  ) => {
    setPayments((previous) =>
      previous.map((payment) =>
        payment.id === id
          ? { ...payment, status: newStatus }
          : payment
      )
    );
  };

  const deletePayment = (id: number) => {
    if (window.confirm("Delete this payment record?")) {
      setPayments((previous) =>
        previous.filter((payment) => payment.id !== id)
      );
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = [
      payment.transactionId,
      payment.customer,
      payment.invoice,
      payment.method,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || payment.status === filter;

    return matchesSearch && matchesFilter;
  });

  const successful = payments.filter(
    (p) => p.status === "Successful"
  );

  const pending = payments.filter(
    (p) => p.status === "Pending"
  );

  const failed = payments.filter(
    (p) => p.status === "Failed"
  );

  const totalAmount = successful.reduce(
    (sum, p) => sum + p.amount,
    0
  );

  const stats = [
    {
      title: "Total Payments",
      value: payments.length.toString(),
      icon: Wallet,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Successful Payments",
      value: successful.length.toString(),
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Pending Payments",
      value: pending.length.toString(),
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Failed Payments",
      value: failed.length.toString(),
      icon: XCircle,
      color: "bg-red-50 text-red-600",
    },
  ];

  const exportCSV = () => {
    const headers = [
      "Transaction ID",
      "Customer",
      "Invoice",
      "Amount",
      "Method",
      "Date",
      "Status",
    ];

    const rows = payments.map((p) => [
      p.transactionId,
      p.customer,
      p.invoice,
      p.amount,
      p.method,
      p.date,
      p.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ledgerguard-payments.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const statusStyle = (value: Payment["status"]) => {
    switch (value) {
      case "Successful":
        return "bg-emerald-50 text-emerald-700";
      case "Pending":
        return "bg-amber-50 text-amber-700";
      case "Failed":
        return "bg-red-50 text-red-700";
      case "Refunded":
        return "bg-purple-50 text-purple-700";
    }
  };

  return (
    <div className="p-5 md:p-9 max-w-[1500px] mx-auto">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Payments
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track transactions, payment methods and refunds.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={exportCSV}
            className="border border-slate-200 bg-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50"
          >
            <Download size={17} />
            Export CSV
          </button>

          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2"
          >
            <Plus size={18} />
            Add Payment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon size={20} />
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-5">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-7 shadow-sm">
        <p className="text-sm text-slate-500">
          Successful Payment Amount
        </p>

        <h2 className="text-3xl font-bold text-emerald-600 mt-2">
          {formatAmount(totalAmount)}
        </h2>

        <p className="text-xs text-slate-400 mt-2">
          Total amount from successful demo transactions
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-bold text-lg">
              Transaction History
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              View and manage all payment transactions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search transactions..."
                className="w-full sm:w-64 pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500"
            >
              <option value="All">All Status</option>
              <option value="Successful">Successful</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-400">
                <th className="pb-4">Transaction ID</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Invoice</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Method</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-slate-50 text-sm"
                >
                  <td className="py-5 font-semibold text-indigo-600">
                    {payment.transactionId}
                  </td>

                  <td className="py-5 font-medium">
                    {payment.customer}
                  </td>

                  <td className="py-5 text-slate-500">
                    {payment.invoice}
                  </td>

                  <td className="py-5 font-bold">
                    {formatAmount(payment.amount)}
                  </td>

                  <td className="py-5 text-slate-600">
                    {payment.method}
                  </td>

                  <td className="py-5 text-slate-500">
                    {payment.date}
                  </td>

                  <td className="py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>

                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      {payment.status === "Successful" && (
                        <button
                          onClick={() => updateStatus(payment.id, "Refunded")}
                          title="Mark as refunded"
                          className="text-amber-600 hover:text-amber-800"
                        >
                          <RotateCcw size={17} />
                        </button>
                      )}

                      {payment.status === "Pending" && (
                        <button
                          onClick={() => updateStatus(payment.id, "Successful")}
                          className="text-emerald-600 font-semibold"
                        >
                          Approve
                        </button>
                      )}

                      <button
                        onClick={() => deletePayment(payment.id)}
                        className="text-red-500 font-semibold hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredPayments.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="py-12 text-center text-slate-400"
                  >
                    No payment transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl my-8">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                Add New Payment
              </h2>

              <button
                onClick={resetForm}
                className="text-slate-400 hover:text-red-500"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleAddPayment} className="space-y-5">

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Customer Name
                </label>
                <input
                  required
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="Enter customer name"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Invoice Number
                </label>
                <input
                  required
                  value={invoice}
                  onChange={(e) => setInvoice(e.target.value)}
                  placeholder="e.g. INV-1005"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Payment Amount (₹)
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Payment Method
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none"
                >
                  <option value="UPI">UPI</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Net Banking">Net Banking</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Payment Status
                </label>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as Payment["status"])
                  }
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none"
                >
                  <option value="Successful">Successful</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
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
                  Save Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;
