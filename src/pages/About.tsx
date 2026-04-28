import { motion } from "framer-motion";
import signatureImg from "../assets/signature.jpg";

export default function About() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col items-center pt-24 pb-20 px-6">
      
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/30 blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto z-10 w-full text-center">
        {/* Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 rounded-full bg-emerald-100/50 text-emerald-600 text-sm font-bold tracking-wide mb-8 border border-emerald-200"
        >
          About Us
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-black text-[#1a2b4b] mb-4 tracking-tighter leading-[1.1]"
        >
          Bridging the Gap Between <br />
          <span className="text-emerald-500">Citizens and Government</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed mb-20 font-medium"
        >
          We are on a mission to democratize access to government welfare schemes through intelligent 
          technology, ensuring no eligible citizen misses out on benefits they deserve.
        </motion.p>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-black text-[#1a2b4b] mb-6">Our Mission</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-slate-600 leading-relaxed font-medium space-y-6 px-1"
          >
            <p>
              At Scheme Sathi, our mission is to empower every individual by simplifying the complex landscape 
              of government welfare. We believe that everyone deserves equal access to the support systems 
              created for their well-being, and technology is the ultimate tool to bridge that information gap.
            </p>
            <p>
              By leveraging AI-driven matching and a meticulously curated real-world database, we provide 
              personalized guidance that transforms lives—one scheme at a time.
            </p>
          </motion.div>
        </div>

        {/* Footer Signature Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col items-center border-t border-slate-100 pt-16 mt-12"
        >
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">Atharva Biwalkar</h3>
          <p className="text-slate-500 font-medium text-lg mt-1 mb-6">Founder & CEO, Scheme Sathi</p>
          <div className="max-w-[180px]">
             <img src={signatureImg} alt="Atharva's Signature" className="w-full h-auto object-contain mix-blend-multiply opacity-90 grayscale contrast-125" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
