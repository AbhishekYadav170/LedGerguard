
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Building2,
  Mail,
  User,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const strength =
    password.length === 0 ? 0 :
    password.length < 8 ? 1 :
    password.length < 12 ? 2 :
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password) ? 4 : 3;

const handleSignup = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setMessage("");

  if (!name.trim() || !company.trim() || !email.trim()) {
    setMessage("Please fill in all required fields.");
    return;
  }

  if (password.length < 8) {
    setMessage("Password must contain at least 8 characters.");
    return;
  }

  if (password !== confirmPassword) {
    setMessage("Passwords do not match.");
    return;
  }

  if (!agree) {
    setMessage("Please accept the Terms and Conditions.");
    return;
  }

  // Dummy signup successful
  navigate("/login", {
    state: {
      signupSuccess: true,
      email: email,
    },
  });
};

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50";

  return (
    <div className="min-h-screen bg-[#f5f7ff] flex items-center justify-center p-4 sm:p-6">

      <div className="w-full max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-indigo-100/70 grid lg:grid-cols-2">

        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-950 p-12 text-white relative overflow-hidden">

          <div className="absolute w-80 h-80 rounded-full border border-white/10 -top-28 -right-28" />
          <div className="absolute w-64 h-64 rounded-full border border-white/10 bottom-10 -left-32" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
              <ShieldCheck size={25} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                LedgerGuard<span className="text-indigo-300">.</span>
              </h1>
              <p className="text-xs text-indigo-200">
                Intelligent Billing Platform
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-indigo-100 mb-8">
              <Sparkles size={14} />
              Smart financial operations
            </div>

            <h2 className="text-5xl font-bold leading-tight tracking-tight">
              Build your
              <br />
              business with
              <br />
              confidence.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-indigo-200">
              Bring your billing, subscriptions and financial
              operations together in one organized workspace.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Organized company workspace",
                "Centralized billing management",
                "Transparent transaction records",
                "Security-focused architecture",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-indigo-100">
                  <CheckCircle2 size={18} className="text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-xs text-indigo-300">
            © 2026 LedgerGuard. All rights reserved.
          </p>
        </div>

        <div className="p-6 sm:p-10 lg:p-14 flex items-center">
          <div className="w-full max-w-md mx-auto">

            <div className="lg:hidden flex items-center gap-3 mb-9">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                <ShieldCheck size={23} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">
                LedgerGuard.
              </h1>
            </div>

            <p className="text-xs font-bold tracking-[0.2em] text-indigo-600 mb-3">
              GET STARTED
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Create your account
            </h2>

            <p className="text-sm text-slate-500 mt-3 mb-8">
              Start managing your business finances smarter.
            </p>

            <form onSubmit={handleSignup} className="space-y-5">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Your company name"
                    autoComplete="organization"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Work Email
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    minLength={8}
                    className={inputClass + " pr-12"}
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

                <div className="mt-3">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full ${
                          strength >= level
                            ? "bg-indigo-500"
                            : "bg-slate-100"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    {strength === 0 ? "Password strength" :
                     strength === 1 ? "Too short" :
                     strength === 2 ? "Fair password" :
                     strength === 3 ? "Good password" : "Strong password"}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <label className="flex items-start gap-2.5 text-xs leading-5 text-slate-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-1 accent-indigo-600"
                />
                <span>
                  I agree to the Terms and Conditions and Privacy Policy.
                </span>
              </label>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:-translate-y-0.5"
              >
                Create Account
                <ArrowRight size={18} />
              </button>

              {message && (
                <p
                  role="status"
                  className="rounded-xl bg-indigo-50 border border-indigo-100 p-3 text-sm text-indigo-700"
                >
                  {message}
                </p>
              )}

            </form>

            <p className="text-center text-sm text-slate-500 mt-8">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-indigo-600 hover:text-indigo-800"
              >
                Sign in
              </Link>
            </p>

            <div className="flex justify-center items-center gap-2 mt-8 text-xs text-slate-400">
              <ShieldCheck size={15} />
              Secure workspace registration
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
