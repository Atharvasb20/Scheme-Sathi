import { useState, useEffect } from "react";

interface Scheme {
  name: string;
  category: string;
  income_limit: string;
  occupation: string;
  state: string;
  benefit: string;
  tags?: string;
  url?: string;
}

const CATEGORY_ICONS: Record<string, string> = {
  "Agriculture": "🌾",
  "Health": "🏥",
  "Education": "🎓",
  "Housing": "🏠",
  "Finance": "💰",
  "Employment": "💼",
  "Women": "👩",
  "MSME": "🏭",
  "Rural": "🌿",
  "Sanitation": "♻️",
  "Transport": "🚌",
  "Social": "🤝",
  "Defence": "🛡️",
  "Digital": "💻",
  "default": "📋",
};

function getCategoryIcon(category: string): string {
  const lower = category.toLowerCase();
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (lower.includes(key.toLowerCase())) return icon;
  }
  return CATEGORY_ICONS["default"];
}

const GRADIENT_CLASSES = [
  "from-indigo-500 to-purple-500",
  "from-emerald-500 to-teal-500",
  "from-orange-400 to-rose-400",
  "from-cyan-500 to-blue-500",
  "from-amber-400 to-orange-400",
  "from-pink-500 to-rose-500",
  "from-violet-500 to-indigo-500",
  "from-green-500 to-emerald-400",
];

function SchemeModal({ scheme, onClose }: { scheme: Scheme; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-emerald-500 p-8 rounded-t-3xl">
          <div className="text-4xl mb-3">{getCategoryIcon(scheme.category)}</div>
          <h2 className="text-2xl font-extrabold text-white leading-snug">{scheme.name}</h2>
          <span className="inline-block mt-2 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            {scheme.category}
          </span>
        </div>

        <div className="p-8 space-y-5">
          {/* Benefit */}
          <div className="bg-slate-50 rounded-2xl p-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              About this Scheme
            </h4>
            <p className="text-slate-700 leading-relaxed">{scheme.benefit}</p>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-50 rounded-2xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-1">Target Group</h4>
              <p className="text-slate-800 font-semibold">{scheme.occupation || "All Eligible"}</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-1">Applicable In</h4>
              <p className="text-slate-800 font-semibold">{scheme.state || "All India"}</p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-1">Income Limit</h4>
              <p className="text-slate-800 font-semibold">{scheme.income_limit || "Refer to portal"}</p>
            </div>
            <div className="bg-rose-50 rounded-2xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-1">Ministry / Department</h4>
              <p className="text-slate-800 font-semibold text-sm">{scheme.category}</p>
            </div>
          </div>

          {/* Tags */}
          {scheme.tags && (
            <div className="flex flex-wrap gap-2">
              {scheme.tags.split(",").filter(Boolean).map((tag, i) => (
                <span key={i} className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <a
              href={scheme.url || `https://www.google.com/search?q=${encodeURIComponent(scheme.name + " India apply official")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-gradient-to-r from-indigo-600 to-emerald-500 hover:opacity-90 text-white font-bold py-3.5 rounded-xl transition"
            >
              Apply / Learn More →
            </a>
            <button
              onClick={onClose}
              className="px-6 border border-slate-200 text-slate-600 font-bold py-3.5 rounded-xl hover:bg-slate-50 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Schemes() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedOccupation, setSelectedOccupation] = useState("All");
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/schemes")
      .then((r) => r.json())
      .then((data) => { setSchemes(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(schemes.map((s) => s.category).filter(Boolean))).sort()];
  const occupations = ["All", ...Array.from(new Set(
    schemes.flatMap((s) => (s.occupation || "All Eligible").split(",").map((o) => o.trim())).filter(Boolean)
  )).sort()];

  const filtered = schemes.filter((s) => {
    const text = (s.name + " " + s.benefit + " " + s.category).toLowerCase();
    const matchSearch = !search || text.includes(search.toLowerCase());
    const matchCat = selectedCategory === "All" || s.category === selectedCategory;
    const matchOcc = selectedOccupation === "All" || (s.occupation || "").toLowerCase().includes(selectedOccupation.toLowerCase()) || (s.occupation || "").toLowerCase().includes("all eligible");
    return matchSearch && matchCat && matchOcc;
  });

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/30 blur-3xl -z-10" />

      {/* Hero Banner */}
      <div className="pt-24 pb-12 px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 tracking-tight">
          Government Schemes Hub
        </h1>
        <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10">
          Browse verified real government schemes from official sources. Find yours today.
        </p>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search schemes, ministries, or benefits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-6 pr-14 py-5 rounded-full text-slate-700 bg-white shadow-xl shadow-slate-200/50 border border-slate-100 outline-none text-lg transition focus:ring-2 focus:ring-indigo-500"
          />
          <svg className="absolute right-6 top-5 w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
        {/* Filters Row */}
        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-slate-200 bg-white px-4 py-3 rounded-xl text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {categories.slice(0, 20).map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Occupation</label>
            <select
              value={selectedOccupation}
              onChange={(e) => setSelectedOccupation(e.target.value)}
              className="w-full border border-slate-200 bg-white px-4 py-3 rounded-xl text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {occupations.slice(0, 20).map((o, i) => <option key={i} value={o}>{o}</option>)}
            </select>
          </div>

          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Search Status</label>
            <div className="bg-indigo-50 px-4 py-3 rounded-xl text-indigo-700 font-bold text-center">
              Active Filters
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-24 text-slate-400 text-xl">Loading schemes...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((scheme, i) => (
              <div
                key={i}
                className="group bg-white rounded-[2rem] shadow-sm hover:shadow-md border border-slate-100 overflow-hidden flex flex-col transition duration-300 hover:-translate-y-1"
              >
                {/* Card top gradient strip */}
                <div className={`h-2 bg-gradient-to-r ${GRADIENT_CLASSES[i % GRADIENT_CLASSES.length]}`} />

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="text-3xl">{getCategoryIcon(scheme.category)}</div>
                    <div>
                      <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">
                        {scheme.category.substring(0, 28)}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug group-hover:text-indigo-600 transition">
                    {scheme.name}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-grow">
                    {scheme.benefit}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="text-xs text-slate-500 font-medium">
                        {scheme.state === "All India" ? "National" : scheme.state}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedScheme(scheme)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full py-24 text-center text-slate-400">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-xl font-semibold">No schemes found for your search.</p>
                <p className="text-sm mt-2">Try clearing the filters or searching with different keywords.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedScheme && (
        <SchemeModal scheme={selectedScheme} onClose={() => setSelectedScheme(null)} />
      )}
    </div>
  );
}