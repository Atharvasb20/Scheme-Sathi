import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow bg-white">
      <h1 className="text-xl font-bold text-green-600">Scheme Sathi</h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/schemes">Schemes</Link>
        <Link to="/recommendations">Recommendations</Link>
        <Link to="/saved">Saved</Link>
      </div>

      <Link
        to="/login"
        className="bg-green-600 text-white px-4 py-1 rounded"
      >
        Login
      </Link>
    </nav>
  );
}