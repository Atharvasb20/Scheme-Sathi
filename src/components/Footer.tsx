import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-emerald-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-extrabold text-sm">S</span>
              </div>
              <span className="text-xl font-extrabold text-white">Scheme Sathi</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              India's first AI-powered dedicated portal for discovering and applying to government schemes tailored precisely to your profile.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-indigo-400 transition">Home</Link></li>
              <li><Link to="/schemes" className="hover:text-indigo-400 transition">Browse Schemes</Link></li>
              <li><Link to="/recommendations" className="hover:text-indigo-400 transition">AI Recommender</Link></li>
              <li><Link to="/login" className="hover:text-indigo-400 transition">Login / Sign-up</Link></li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-white font-bold mb-6">Popular Categories</h4>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-indigo-400 cursor-pointer transition">Agriculture & Farming</li>
              <li className="hover:text-indigo-400 cursor-pointer transition">Education & Scholarships</li>
              <li className="hover:text-indigo-400 cursor-pointer transition">Healthcare & Wellness</li>
              <li className="hover:text-indigo-400 cursor-pointer transition">MSME & Business Loans</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <p className="text-sm mb-4">Official Helpdesk:</p>
            <p className="text-white font-bold text-lg mb-2">support@schemesathi.in</p>
            <p className="text-xs text-slate-500">Working Hours: 10 AM - 6 PM IST</p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © 2026 Scheme Sathi. An independent initiative to bridge the gap between citizens and welfare.
          </p>
          <div className="flex gap-6">
            <span className="text-xs hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span className="text-xs hover:text-white cursor-pointer transition">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
