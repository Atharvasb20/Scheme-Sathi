import { useLocation, useNavigate } from "react-router-dom";

export default function SchemeDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const scheme = location.state;

  if (!scheme) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold">No Scheme Data</h1>
        <button
          onClick={() => navigate("/recommendations")}
          className="mt-4 text-green-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-green-700 mb-4">
          {scheme.name}
        </h1>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          {scheme.category}
        </span>

        <div className="mt-6 space-y-4 text-gray-700">

          <p>
            <strong>💰 Benefits:</strong> {scheme.benefits}
          </p>

          <p>
            <strong>✅ Eligibility:</strong> {scheme.eligibility}
          </p>

          <p>
            <strong>📍 State:</strong> {scheme.state}
          </p>

          <p>
            <strong>💼 Income Limit:</strong> ₹{scheme.incomeLimit}
          </p>

        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          ← Back
        </button>

      </div>
    </div>
  );
}