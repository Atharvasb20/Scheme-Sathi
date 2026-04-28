import { useState } from "react";
import { getRecommendations } from "../services/api";

interface FormData {
  age: string;
  gender: string;
  marital: string;
  children: string;
  occupation: string;
  income: string;
  education: string;
  state: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Recommendations() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [selectedScheme, setSelectedScheme] = useState<any>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState<FormData>({
    age: "",
    gender: "",
    marital: "",
    children: "",
    occupation: "",
    income: "",
    education: "",
    state: "",
  });

  const validateStep1 = () => {
    const e: FormErrors = {};
    if (!form.age || Number(form.age) < 1 || Number(form.age) > 120)
      e.age = "Please enter a valid age (1–120).";
    if (!form.gender) e.gender = "Please select your gender.";
    if (!form.marital) e.marital = "Please select marital status.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: FormErrors = {};
    if (!form.occupation) e.occupation = "Please select your occupation.";
    if (!form.income) e.income = "Please select your income range.";
    if (!form.education) e.education = "Please select your education level.";
    if (!form.state) e.state = "Please select your state.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setErrors({});
    setStep(step + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await getRecommendations(form);
      setResults(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
    setStep(4);
  };

  const inputClass = (field: string) =>
    `w-full border ${errors[field] ? "border-red-400 bg-red-50" : "border-slate-200"} p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition`;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden py-16 px-6 md:px-12 flex justify-center">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/30 blur-3xl -z-10" />
      
      <div className="w-full max-w-5xl relative z-10">

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
            AI Scheme Recommender
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Tell us about yourself and our AI engine will instantly match you to the most relevant government schemes.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg shadow-sm transition-all duration-300 ${
                step >= s ? "bg-indigo-600 text-white shadow-indigo-300" : "bg-white text-slate-400 border border-slate-200"
              }`}>{s}</div>
              {s !== 3 && <div className={`w-16 md:w-24 h-1 mx-2 rounded ${step > s ? "bg-indigo-600" : "bg-slate-200"}`}></div>}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm hover:shadow-md p-8 md:p-12 mb-10 border border-slate-100 transition-shadow duration-300">

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-8 border-b pb-4">Personal Demographics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Age <span className="text-red-500">*</span></label>
                  <input type="number" placeholder="e.g. 28" className={inputClass("age")}
                    value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
                  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Gender <span className="text-red-500">*</span></label>
                  <select className={inputClass("gender")} value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Marital Status <span className="text-red-500">*</span></label>
                  <select className={inputClass("marital")} value={form.marital}
                    onChange={(e) => setForm({ ...form, marital: e.target.value })}>
                    <option value="">Select status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                  {errors.marital && <p className="text-red-500 text-xs mt-1">{errors.marital}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Children / Dependents</label>
                  <select className={inputClass("children")} value={form.children}
                    onChange={(e) => setForm({ ...form, children: e.target.value })}>
                    <option value="">Select</option>
                    <option value="0">None</option>
                    <option value="1">1 or 2</option>
                    <option value="3+">3 or more</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-10">
                <button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-full shadow-lg transition">
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-8 border-b pb-4">Professional & Location Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Occupation <span className="text-red-500">*</span></label>
                  <select className={inputClass("occupation")} value={form.occupation}
                    onChange={(e) => setForm({ ...form, occupation: e.target.value })}>
                    <option value="">Select occupation</option>
                    <option value="Farmer / Agriculture">Farmer / Agriculture</option>
                    <option value="Student">Student</option>
                    <option value="Business / Entrepreneur">Business / Entrepreneur</option>
                    <option value="Salaried Employee">Salaried Employee</option>
                    <option value="Unemployed">Unemployed</option>
                  </select>
                  {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Annual Income <span className="text-red-500">*</span></label>
                  <select className={inputClass("income")} value={form.income}
                    onChange={(e) => setForm({ ...form, income: e.target.value })}>
                    <option value="">Select income range</option>
                    <option value="0-50000">Below ₹50,000</option>
                    <option value="50000-200000">₹50,000 – ₹2,00,000</option>
                    <option value="200000-800000">₹2,00,000 – ₹8,00,000</option>
                    <option value="800000+">Above ₹8,00,000</option>
                  </select>
                  {errors.income && <p className="text-red-500 text-xs mt-1">{errors.income}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Education Level <span className="text-red-500">*</span></label>
                  <select className={inputClass("education")} value={form.education}
                    onChange={(e) => setForm({ ...form, education: e.target.value })}>
                    <option value="">Select qualification</option>
                    <option value="10th">10th Grade / Below</option>
                    <option value="12th">12th Grade</option>
                    <option value="Graduate">Graduate / Degree</option>
                    <option value="Post-Graduate">Post-Graduate / PhD</option>
                  </select>
                  {errors.education && <p className="text-red-500 text-xs mt-1">{errors.education}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">State of Residence <span className="text-red-500">*</span></label>
                  <select className={inputClass("state")} value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}>
                    <option value="">Select state</option>
                    <option value="All India">Central (All India)</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar">Andaman and Nicobar</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                    <option value="Daman and Diu">Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                  </select>
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
              </div>
              <div className="flex justify-between mt-10">
                <button onClick={handleBack} className="text-slate-500 font-bold px-8 py-4 rounded-full hover:bg-slate-100 transition">
                  ← Back
                </button>
                <button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-full shadow-lg transition">
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="text-center py-10">
              <div className="bg-indigo-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Ready to Find Your Schemes!</h2>
              <p className="text-slate-500 max-w-md mx-auto mb-3">
                Profile: <strong>{form.occupation}</strong> · {form.education} · {form.state}
              </p>
              <p className="text-slate-400 text-sm mb-10">
                Our AI will scan all active government schemes and rank them by eligibility match.
              </p>
              <div className="flex justify-center gap-4">
                <button onClick={handleBack} className="text-slate-500 font-bold px-8 py-4 rounded-full hover:bg-slate-100 transition">
                  Edit Details
                </button>
                <button disabled={loading} onClick={handleSubmit}
                  className="bg-gradient-to-r from-indigo-600 to-emerald-500 hover:scale-105 transform text-white font-bold px-10 py-4 rounded-full shadow-xl shadow-indigo-200 transition">
                  {loading ? "Analyzing..." : "Scan My Eligibility ⚡"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RESULTS */}
        {step === 4 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-800">Your Top AI Matches</h2>
                <p className="text-slate-400 mt-1">Based on your unique profile and current eligibility criteria.</p>
              </div>
              <button onClick={() => { setStep(1); setResults([]); setForm({ age: "", gender: "", marital: "", children: "", occupation: "", income: "", education: "", state: "" }); }}
                className="text-indigo-600 font-semibold border border-indigo-200 px-5 py-2 rounded-full hover:bg-indigo-50 transition">
                Recalculate
              </button>
            </div>

            <div className="space-y-5">
              {results.slice(0, 10).map((scheme: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden group transition">
                  {/* Left color bar based on match */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl ${scheme.match >= 80 ? "bg-emerald-500" : scheme.match >= 60 ? "bg-yellow-400" : scheme.match >= 40 ? "bg-indigo-400" : "bg-slate-300"}`}></div>

                  <div className="flex-grow pl-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        {(scheme.category || "").substring(0, 35)}
                      </span>
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        {scheme.state === "All India" ? "National" : scheme.state}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{scheme.name}</h3>
                    <p className="text-slate-500 leading-relaxed line-clamp-3">{scheme.benefit}</p>
                  </div>

                  <div className="flex flex-col items-center justify-center min-w-[140px] bg-slate-50 rounded-xl p-5 shrink-0">
                    <div className={`text-4xl font-extrabold mb-1 ${scheme.match >= 80 ? "text-emerald-600" : scheme.match >= 60 ? "text-yellow-500" : "text-indigo-600"}`}>
                      {scheme.match}%
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-4">Match</div>
                    <button
                      onClick={() => setSelectedScheme(scheme)}
                      className="w-full bg-slate-800 hover:bg-indigo-600 text-white text-sm font-bold py-2.5 rounded-xl transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SCHEME DETAIL MODAL */}
      {selectedScheme && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedScheme(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {selectedScheme.category}
                </span>
              </div>
              <button onClick={() => setSelectedScheme(null)} className="text-slate-400 hover:text-slate-700 text-2xl font-light">✕</button>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-800 mb-4">{selectedScheme.name}</h2>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${selectedScheme.match >= 80 ? "bg-emerald-50 text-emerald-700" : selectedScheme.match >= 60 ? "bg-yellow-50 text-yellow-700" : "bg-indigo-50 text-indigo-700"}`}>
              <span className="text-2xl font-extrabold">{selectedScheme.match}%</span>
              <span className="font-semibold text-sm">Eligibility Match</span>
            </div>

            <div className="space-y-5">
              <div className="bg-slate-50 rounded-2xl p-5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Benefits</h4>
                <p className="text-slate-700 leading-relaxed">{selectedScheme.benefit}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-2xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Target</h4>
                  <p className="text-slate-700 font-semibold">{selectedScheme.occupation}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Applicable In</h4>
                  <p className="text-slate-700 font-semibold">{selectedScheme.state}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Income Limit</h4>
                  <p className="text-slate-700 font-semibold">{selectedScheme.income_limit}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Ministry</h4>
                  <p className="text-slate-700 font-semibold">{selectedScheme.category}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={selectedScheme.url || `https://www.google.com/search?q=${encodeURIComponent(selectedScheme.name + " government scheme apply")}`}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition">
                {selectedScheme.url ? "Apply on Official Portal" : "Search & Apply Online"}
              </a>
              <button onClick={() => setSelectedScheme(null)}
                className="px-6 border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}