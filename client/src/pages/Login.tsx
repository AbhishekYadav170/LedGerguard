
import { useState, type FormEvent } from "react";
import { tokenStorage } from "../api";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    // Dummy authentication for frontend testing
    try {
      tokenStorage.setToken("dummy-ledgerguard-token");

      setMessage("Login successful! Redirecting...");

      navigate("/dashboard");
    } catch {
      setMessage("Unable to save login session. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-6xl min-h-[680px] bg-white rounded-3xl shadow-2xl shadow-slate-200/70 overflow-hidden grid md:grid-cols-2">

        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-indigo-950 via-indigo-800 to-violet-800 text-white p-10 lg:p-14 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-violet-400/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center">
                <ShieldCheck size={25} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                LedgerGuard<span className="text-indigo-300">.</span>
              </h1>
            </div>
            <p className="text-indigo-200 text-sm mt-3 ml-14">
              Intelligent Billing & Financial Security
            </p>
          </div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-8">
              <Sparkles size={32} className="text-indigo-200" />
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Your finances.
              <br />
              Your control.
              <br />
              Your security.
            </h2>

            <p className="text-indigo-200 mt-6 leading-7 max-w-md">
              Manage subscriptions, invoices and financial operations
              through one intelligent billing workspace.
            </p>

            <div className="mt-9 space-y-4">
              {[
                "Centralized billing management",
                "Organized subscription tracking",
                "Designed for secure financial workflows",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-indigo-100">
                  <CheckCircle2 size={18} className="text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-indigo-300 text-xs">
            © 2026 LedgerGuard. All rights reserved.
          </p>
        </div>

        <div className="p-7 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="md:hidden mb-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <ShieldCheck size={23} />
            </div>
            <h1 className="text-2xl font-bold text-indigo-950">
              LedgerGuard.
            </h1>
          </div>

          <div className="max-w-md w-full mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide mb-5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              WELCOME BACK
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Sign in to your account
            </h2>

            <p className="text-slate-500 mt-3 mb-9 leading-6">
              Enter your credentials to access your billing workspace.
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      setMessage("Password recovery will be added later.")
                    }
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <Lock size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
                Remember me
              </label>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
              >
                Sign In
                <ArrowRight size={19} />
              </button>

              {message && (
                <p
                  role="status"
                  className="text-sm text-indigo-700 bg-indigo-50 border border-indigo-100 p-3.5 rounded-xl"
                >
                  {message}
                </p>
              )}
            </form>

            <p className="text-center text-sm text-slate-500 mt-8">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Create account
              </Link>
            </p>

            <div className="flex items-center justify-center gap-2 mt-10 text-xs text-slate-400">
              <ShieldCheck size={15} />
              Billing workspace · Backend security integration pending
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
