import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function SaveButton({ scheme }: any) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    checkSaved();
  }, []);

  const checkSaved = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("saved_schemes")
      .select("*")
      .eq("user_id", user.id)
      .eq("scheme_id", scheme.id);

    if (data && data.length > 0) setSaved(true);
  };

  const toggleSave = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Login first!");
      return;
    }

    if (saved) {
      await supabase
        .from("saved_schemes")
        .delete()
        .eq("user_id", user.id)
        .eq("scheme_id", scheme.id);

      setSaved(false);
    } else {
      await supabase.from("saved_schemes").insert([
        {
          user_id: user.id,
          scheme_id: scheme.id,
          scheme_name: scheme.name,
        },
      ]);

      setSaved(true);
    }
  };

  return (
    <button
      onClick={toggleSave}
      className={`px-3 py-1 rounded text-white ${
        saved ? "bg-green-600" : "bg-gray-500"
      }`}
    >
      {saved ? "Saved ❤️" : "Save 🤍"}
    </button>
  );
}