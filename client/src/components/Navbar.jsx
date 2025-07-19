// client/src/components/Navbar.jsx
// client/src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MediBridge
        </Link>
        <div className="space-x-6">
          <Link to="/patient" className="text-gray-600 hover:text-blue-600 font-medium transition">
            Patient
          </Link>
          <Link to="/doctor" className="text-gray-600 hover:text-blue-600 font-medium transition">
            Doctor
          </Link>
          <Link
            to="/logout"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 font-medium transition"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


