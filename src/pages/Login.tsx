import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logoImg from "../assets/generated_logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    if (isRegister && !name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    // Simulate auth (localStorage-based)
    setTimeout(() => {
      if (isRegister) {
        const users = JSON.parse(localStorage.getItem("sathi_users") || "[]");
        if (users.find((u: any) => u.email === email)) {
          setError("An account with this email already exists.");
          setLoading(false);
          return;
        }
        users.push({ name, email, password });
        localStorage.setItem("sathi_users", JSON.stringify(users));
        localStorage.setItem("sathi_user", JSON.stringify({ name, email }));
        navigate("/");
      } else {
        const users = JSON.parse(localStorage.getItem("sathi_users") || "[]");
        const user = users.find((u: any) => u.email === email && u.password === password);
        if (!user) {
          setError("Invalid email or password.");
          setLoading(false);
          return;
        }
        localStorage.setItem("sathi_user", JSON.stringify({ name: user.name, email }));
        navigate("/");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden px-4">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/30 blur-3xl -z-10" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 justify-center group">
            <div className="flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
              <img src={logoImg} alt="Scheme Sathi Logo" className="h-14 w-auto object-contain rounded-xl" />
            </div>
            <span className="text-3xl font-black text-slate-800">
              Scheme Sathi
            </span>
          </Link>
          <p className="mt-3 text-slate-500">
            {isRegister ? "Create your account to get started" : "Welcome back! Sign in to continue"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[2rem] shadow-sm hover:shadow-md transition-shadow duration-300 p-8 md:p-10 border border-slate-100">
          <h2 className="text-2xl font-extrabold text-slate-800 mb-6">
            {isRegister ? "Create Account" : "Sign In"}
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">Password</label>
              <input
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-emerald-500 hover:opacity-90 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-indigo-200 mt-2"
            >
              {loading ? "Please wait..." : isRegister ? "Create Account" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-slate-500 mt-6 text-sm">
            {isRegister ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => { setIsRegister(!isRegister); setError(""); }}
              className="text-indigo-600 font-semibold hover:underline"
            >
              {isRegister ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}