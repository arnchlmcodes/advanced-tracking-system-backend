/*import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  // 🔐 mock role switch
  const [role, setRole] = useState<"admin" | "user">("user");

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">
        Campus Lost & Sale System
      </h1>

      <div className="flex items-center gap-6">
        {role === "admin" && (
          <Link
            to="/admin"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Admin Dashboard
          </Link>
        )}

        <Link
          to="/marketplace"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Marketplace
        </Link>*/

        {/* Role switch button */}
        /*<button
          onClick={() =>
            setRole(role === "user" ? "admin" : "user")
          }
          className="px-3 py-1 border rounded text-sm"
        >
          Switch to {role === "user" ? "ADMIN" : "USER"}
        </button>

        <span className="text-gray-500 text-sm">
          Role: <strong>{role.toUpperCase()}</strong>
        </span>
      </div>
    </nav>
  );
}*/
/*import { Link } from "react-router-dom";
import { useRole } from "../../context/RoleContext";

export default function Navbar() {
  const { role, toggleRole } = useRole();

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">
        Campus Lost & Sale System
      </h1>

      <div className="flex items-center gap-6">
        {role === "admin" && (
          <Link to="/admin" className="font-medium">
            Admin Dashboard
          </Link>
        )}

        <Link to="/marketplace" className="font-medium">
          Marketplace
        </Link>

        <button
          onClick={toggleRole}
          className="px-3 py-1 border rounded text-sm"
        >
          Switch to {role === "admin" ? "USER" : "ADMIN"}
        </button>

        <span className="text-gray-500 text-sm">
          Role: <strong>{role.toUpperCase()}</strong>
        </span>
      </div>
    </nav>
  );
}*/

import { Link, useLocation } from "react-router-dom";
import { useRole } from "../../context/RoleContext";

export default function Navbar() {
  const { role, toggleRole } = useRole();
  const location = useLocation();

  // Determine breadcrumb based on path
  const isReviewPage = location.pathname.includes("review");

  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center">
      {/* 🧭 Breadcrumbs / Current Location */}
      <div className="flex items-center gap-2 text-sm">
        <Link to="/admin" className="text-slate-400 hover:text-indigo-600 transition-colors">
          Admin
        </Link>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-slate-800">
          {isReviewPage ? "Asset Review" : "Dashboard"}
        </span>
      </div>

      {/* ⚡ Global Actions */}
      <div className="flex items-center gap-6">
        <Link 
          to="/marketplace" 
          className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          Marketplace
        </Link>

        {/* 🔄 Role Switcher - Styled as a Premium Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={toggleRole}
            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
              role === "admin" 
                ? "bg-white text-indigo-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            ADMIN
          </button>
          <button
            onClick={toggleRole}
            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
              role === "user" 
                ? "bg-white text-indigo-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            USER
          </button>
        </div>

        {/* 👤 Profile Indicator */}
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900 leading-none capitalize">{role}</p>
            <p className="text-[10px] text-slate-400 font-medium mt-1">System Staff</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-sm">
            {role[0].toUpperCase()}
          </div>
        </div>
      </div>
    </nav>
  );
}

