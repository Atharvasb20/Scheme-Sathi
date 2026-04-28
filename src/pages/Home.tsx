import { Link } from "react-router-dom";
import heroImg from "../assets/generated_hero.png";
import { motion } from "framer-motion";

export default function Home() {
  const brandName = "Scheme Sathi";

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col justify-between">
      
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/30 blur-3xl -z-10" />

      {/* Main Hero Section */}
      <section className="relative pt-20 px-6 md:px-20 z-10 flex-grow flex flex-col">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 w-full flex-grow">
          
          {/* Left Column (Headline/Buttons) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2 text-center lg:text-left flex flex-col justify-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center justify-center lg:justify-start gap-2 px-5 py-2 bg-indigo-50 text-indigo-700 font-bold text-[10px] uppercase tracking-[0.2em] rounded-full mb-8 border border-indigo-100 shadow-sm self-center lg:self-start"
            >
              IN AI-POWERED WELFARE PORTAL
            </motion.div>

            <h1 className="text-6xl md:text-[5.5rem] font-black leading-[1.05] tracking-[-0.04em] mb-6 flex flex-col items-center lg:items-start text-left w-full">
              <div className="flex gap-x-4">
                {brandName.split(" ").map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + (wordIndex * 0.15), type: "spring", stiffness: 150 }}
                    className="inline-block hover:text-orange-500 transition-colors duration-300 cursor-default"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="block text-[2.5rem] md:text-5xl mt-3 font-bold text-slate-400 tracking-tight"
              >
                <span className="hover:text-white hover:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-all duration-300 cursor-default">
                  Discover Schemes
                </span>
                <br className="hidden md:block" /> 
                <span className="text-[#059669] italic hover:text-green-400 hover:drop-shadow-[0_0_12px_rgba(16,185,129,0.8)] transition-all duration-300 cursor-default">
                  Tailored For You
                </span>
              </motion.span>
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-6 text-[1.1rem] text-slate-500 max-w-xl leading-relaxed font-medium mx-auto lg:mx-0"
            >
              Experience the future of citizen-centric welfare. Our intelligent AI engine matches your profile with 
               <span className="text-slate-800 font-bold px-1">hundreds of verified schemes</span> in seconds. No more tedious searching.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <Link to="/recommendations">
                <button className="bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-[1.5rem] font-bold text-lg shadow-xl shadow-slate-900/20 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1">
                  Scan Eligibility ⚡
                </button>
              </Link>
              <Link to="/schemes">
                <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold text-lg rounded-[1.5rem] hover:bg-slate-50 transition-all duration-300">
                  Registry Hub
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column (Large Illustration) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="w-full lg:w-1/2 relative flex justify-center items-center mix-blend-multiply"
          >
             <img 
              src={heroImg} 
              alt="Scheme Sathi Diverse Citizens" 
              className="w-full max-w-[800px] h-auto object-contain mix-blend-multiply drop-shadow-xl filter brightness-[1.02] contrast-[1.05]" 
            />
          </motion.div>

        </div>

        {/* Bottom Row (Categories/Text) perfectly matching the prompt instruction */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="w-full max-w-5xl mx-auto mt-20 mb-12 flex flex-col items-center"
        >
          {/* Labeled Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 w-full px-4 mb-10">
            <div className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl mb-4 text-amber-600">🚜</div>
              <span className="font-bold text-slate-800 text-lg">Farmer</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl mb-4 text-indigo-600">🎓</div>
              <span className="font-bold text-slate-800 text-lg">Student</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl mb-4 text-emerald-600">📊</div>
              <span className="font-bold text-slate-800 text-lg">Business</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-4 text-blue-600">👔</div>
              <span className="font-bold text-slate-800 text-lg">Employee</span>
            </div>
          </div>

          {/* Bottom Centered Bold Text */}
          <div className="text-center px-4">
            <h3 className="text-sm md:text-base font-bold text-slate-400 tracking-wider">
              SOME GOVERNMENT WELFARE & SCHEMES - Empowering Citizens, Transforming Lives through Digital Governance
            </h3>
          </div>
        </motion.div>
      </section>

    </div>
  );
}