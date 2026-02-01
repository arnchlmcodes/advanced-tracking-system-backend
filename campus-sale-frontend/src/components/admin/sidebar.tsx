import { useNavigate, useLocation } from "react-router-dom";
import { useRole } from "../../context/RoleContext";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useRole();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: "📊" },
    { name: "Inventory", path: "/inventory", icon: "📦" },
    { name: "Reports & Analytics", path: "/reports", icon: "📈" },
    { name: "Security", path: "/security", icon: "🛡️" },
    { name: "Orders", path: "/orders", icon: "🛍️" },
    { name: "Clients", path: "/clients", icon: "👥" },
    { name: "Preferences", path: "/preferences", icon: "⚙️" },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-72" : "w-20"
      } bg-[#06161a] text-slate-400 transition-all duration-300 flex flex-col border-r border-white/5 min-h-screen`}
    >
      {/* Brand Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/5">
        <div
          className={`flex items-center gap-3 text-white transition-all ${
            !isOpen && "hidden"
          }`}
        >
          <div className="w-8 h-8 bg-[#bbf7d0] rounded flex items-center justify-center">
            <span className="text-slate-900 font-bold">📦</span>
          </div>
          <span className="font-bold text-xl tracking-tight uppercase font-mono">
            System
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-white/10 rounded text-white"
        >
          {isOpen ? "❮" : "❯"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all group ${
              location.pathname === item.path
                ? "bg-white/10 text-white shadow-lg shadow-black/20"
                : "hover:bg-white/5 hover:text-indigo-400"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && (
              <span className="text-sm font-semibold whitespace-nowrap">
                {item.name}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/5">
        <div
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 cursor-pointer transition-all"
        >
          <span className="text-xl">🚪</span>
          {isOpen && <span className="text-sm font-bold">Logout</span>}
        </div>
      </div>
    </aside>
  );
}
