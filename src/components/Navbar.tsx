import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logoImg from "../assets/generated_logo.png";

// Simple auth context using localStorage
export function isLoggedIn(): boolean {
  return localStorage.getItem("sathi_user") !== null;
}

export function getUser(): { name: string; email: string } | null {
  const u = localStorage.getItem("sathi_user");
  return u ? JSON.parse(u) : null;
}

export function logout() {
  localStorage.removeItem("sathi_user");
}

export default function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl shadow-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ rotate: 5, scale: 1.05 }}
            className="flex items-center justify-center p-1"
          >
            <img src={logoImg} alt="Scheme Sathi Logo" className="h-12 w-auto object-contain rounded-lg" />
          </motion.div>
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-emerald-500 transition-all duration-500"
          >
            Scheme Sathi
          </motion.span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition">Home</Link>
          <Link to="/about" className="text-slate-600 hover:text-indigo-600 font-medium transition">About</Link>
          <Link to="/schemes" className="text-slate-600 hover:text-indigo-600 font-medium transition">Schemes</Link>
          <Link to="/recommendations" className="text-slate-600 hover:text-indigo-600 font-medium transition">Recommendations</Link>
        </div>

        {/* Auth */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-slate-700 font-medium hidden md:block">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-slate-500 hover:text-red-500 font-medium transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium transition">Login</Link>
              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-full text-sm transition shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}