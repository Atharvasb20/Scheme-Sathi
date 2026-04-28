require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");

// ✅ Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

let supabase = null;
let useLocalFallback = false;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("your_supabase")) {
    console.warn("⚠️ Supabase credentials missing. Falling back to local schemes.json.");
    useLocalFallback = true;
} else {
    try {
        supabase = createClient(supabaseUrl, supabaseKey);
    } catch (err) {
        console.error("❌ Failed to initialize Supabase:", err.message);
        useLocalFallback = true;
    }
}

const schemesLocal = useLocalFallback ? require("./schemes.json") : [];

const app = express();

app.use(cors());
app.use(express.json());

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send(`Backend working ✅ ${useLocalFallback ? "(Local Mode)" : "(Supabase Mode)"}`);
});

// ✅ GET ALL SCHEMES (From Supabase or Local)
app.get("/schemes", async (req, res) => {
  try {
    if (useLocalFallback) {
        return res.json(schemesLocal);
    }
    const { data, error } = await supabase.from("schemes").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Fetch Error:", err.message);
    res.status(500).json({ error: "Failed to fetch schemes." });
  }
});

// ✅ MAIN API - ADVANCED ML RECOMMENDATION
app.post("/recommend", async (req, res) => {
  try {
    const userProfile = req.body; 

    // 1. Fetch current schemes (Supabase or Local Fallback)
    let schemes;
    if (useLocalFallback) {
        schemes = schemesLocal;
    } else {
        const { data, error } = await supabase.from("schemes").select("*");
        if (error) throw error;
        schemes = data;
    }

    const mlUrl = (process.env.ML_SERVICE_URL || "http://127.0.0.1:8000") + "/predict";
    console.log("Calling ML Service at:", mlUrl);
    
    const mlResponse = await axios.post(mlUrl, {
      ...userProfile,
      schemes: schemes 
    });

    const scores = mlResponse.data.scores; 

    // 3. MAP SCORES + ENFORCE FILTERS 
    let result = schemes.map((s, index) => ({
      ...s,
      match: Math.round(scores[index]) 
    }));

    result = result.filter(s => s.match > 0);

    if (userProfile.state && userProfile.state !== "All India") {
        result = result.filter(s => 
            s.state === "All India" || 
            s.state === "India" ||
            s.state.toLowerCase() === userProfile.state.toLowerCase()
        );
    }


    result.sort((a, b) => b.match - a.match);
    res.json(result);

  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ error: "ML microservice error or database issue." });
  }
});

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});