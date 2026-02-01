
/*import { useState } from "react";
import StatCard from "../components/admin/statcard";
import SaleEligibleTable from "../components/admin/SaleEligibleTable";

const mockItems = [
  { id: 1, name: "Laptop", category: "Electronics", daysUnclaimed: 65, status: "pending" as const },
  { id: 2, name: "Wallet", category: "Personal", daysUnclaimed: 70, status: "approved" as const },
  { id: 3, name: "ID Card", category: "Restricted", daysUnclaimed: 90, status: "blocked" as const },
];

export default function AdminDashboard() {
  // 🔑 Missing Role State: "admin" or "user"
  const [userRole, setUserRole] = useState<"admin" | "user">("admin");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">*/
      
      {/* 🌑 Sidebar */}
      /*<aside className={`${isSidebarOpen ? "w-72" : "w-20"} bg-[#06161a] text-slate-400 transition-all duration-300 flex flex-col border-r border-white/5`}>
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <div className={`flex items-center gap-3 text-white transition-all ${!isSidebarOpen && "scale-0 hidden"}`}>
            <div className="w-8 h-8 bg-[#bbf7d0] rounded flex items-center justify-center">
               <span className="text-slate-900 font-bold">📦</span>
            </div>
            <span className="font-bold text-xl tracking-tight uppercase">System</span>
          </div>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-white/10 rounded text-slate-400">
            {isSidebarOpen ? "❮" : "❯"}
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavItem icon="📊" label="Dashboard" isOpen={isSidebarOpen} active />*/
          
          {/* 🛡️ Conditional Sidebar Items: Only show to Admin */}
         /* {userRole === "admin" && (
            <>
              <div onClick={() => toggleMenu('Inventory')} className="cursor-pointer">
                 <NavItem icon="📦" label="Inventory" isOpen={isSidebarOpen} hasSubmenu isExpanded={openMenus['Inventory']} />
              </div>
              {isSidebarOpen && openMenus['Inventory'] && (
                <div className="ml-10 mt-1 space-y-2 text-sm text-slate-500">
                  <p className="hover:text-white cursor-pointer">All Items</p>
                  <p className="hover:text-white cursor-pointer">Categories</p>
                </div>
              )}
              <NavItem icon="📈" label="Reports & analytics" isOpen={isSidebarOpen} />
              <NavItem icon="🛡️" label="Security" isOpen={isSidebarOpen} />
            </>
          )}

          <NavItem icon="📄" label="Orders" isOpen={isSidebarOpen} />
          <NavItem icon="👥" label="Clients" isOpen={isSidebarOpen} />
          <NavItem icon="⚙️" label="Preferences" isOpen={isSidebarOpen} />
        </nav>*/

        {/* Role Switcher (For demo purposes so you can see the change) */}
        /*<div className="p-4 bg-white/5 m-4 rounded-xl">
            <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">Switch Role</p>
            <div className="flex gap-2">
                <button onClick={() => setUserRole("admin")} className={`px-2 py-1 text-[10px] rounded ${userRole === "admin" ? "bg-emerald-500 text-white" : "bg-slate-800"}`}>Admin</button>
                <button onClick={() => setUserRole("user")} className={`px-2 py-1 text-[10px] rounded ${userRole === "user" ? "bg-emerald-500 text-white" : "bg-slate-800"}`}>User</button>
            </div>
        </div>
      </aside>*/

      {/* 🖥️ Main Dashboard */}
      /*<main className="flex-1 overflow-y-auto">
        <header className="px-10 py-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500">Logged in as: <span className="capitalize font-bold text-indigo-600">{userRole}</span></p>
          </div>*/
          
          {/* 🛡️ Conditional Button: Only Admin can add items */}
         /* {userRole === "admin" && (
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
              Add Item +
            </button>
          )}
        </header>

        <div className="px-10 pb-12 space-y-12">
          
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="UNCLAIMED ITEMS" value={12} icon="📦" color="indigo" />
            <StatCard title="SALE ELIGIBLE" value={5} icon="✨" color="green" />*/
            {/* 🛡️ Sensitive Stats: Only for Admin */}
            /*{userRole === "admin" ? (
              <>
                <StatCard title="PENDING REVIEW" value={3} icon="⏳" color="yellow" />
                <StatCard title="BLOCKED ITEMS" value={2} icon="🛡️" color="red" />
              </>
            ) : (
                <div className="lg:col-span-2 p-6 bg-slate-200/50 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm italic">
                    Additional stats restricted to Admin role.
                </div>
            )}
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex border-b border-slate-100 bg-slate-50/50">
              <button className="px-6 py-4 text-sm font-bold text-slate-900 border-b-2 border-slate-900">Recent clients</button>
              <button className="px-6 py-4 text-sm font-medium text-slate-400 hover:text-slate-600">Order activity</button>
            </div>
            <div className="p-2">
              <SaleEligibleTable items={mockItems} />
            </div>
          </section>

          <footer className="pt-4">
            <h3 className="text-lg font-bold text-slate-800">Fleet status</h3>
          </footer>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, isOpen, active = false, hasSubmenu = false, isExpanded = false }: any) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg transition-colors group cursor-pointer
      ${active ? "bg-white/10 text-white" : "hover:bg-white/5 text-slate-400 hover:text-white"}`}>
      <div className="flex items-center gap-4">
        <span className="text-lg">{icon}</span>
        {isOpen && <span className="text-sm font-medium whitespace-nowrap">{label}</span>}
      </div>
      {isOpen && hasSubmenu && (
        <span className={`text-[10px] transition-transform ${isExpanded ? "rotate-90" : ""}`}>▶</span>
      )}
    </div>
  );
}*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/admin/statcard";
import SaleEligibleTable from "../components/admin/SaleEligibleTable";

const mockItems = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    daysUnclaimed: 65,
    status: "pending" as const,
  },
  {
    id: 2,
    name: "Wallet",
    category: "Personal",
    daysUnclaimed: 70,
    status: "approved" as const,
  },
  {
    id: 3,
    name: "ID Card",
    category: "Restricted",
    daysUnclaimed: 90,
    status: "blocked" as const,
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Demo-only role toggle (later replaced by RoleContext / backend)
  const [userRole, setUserRole] = useState<"admin" | "user">("admin");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* 🌑 SIDEBAR */}
      <aside
        className={`${
          isSidebarOpen ? "w-72" : "w-20"
        } bg-[#06161a] text-slate-400 transition-all duration-300 flex flex-col border-r border-white/5`}
      >
        {/* Brand */}
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <div
            className={`flex items-center gap-3 text-white ${
              !isSidebarOpen && "hidden"
            }`}
          >
            <div className="w-8 h-8 bg-[#bbf7d0] rounded flex items-center justify-center">
              <span className="text-slate-900 font-bold">📦</span>
            </div>
            <span className="font-bold text-xl tracking-tight uppercase">
              System
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-white/10 rounded text-slate-400"
          >
            {isSidebarOpen ? "❮" : "❯"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavItem
            icon="📊"
            label="Dashboard"
            isOpen={isSidebarOpen}
            active
          />

          {/* ADMIN ONLY */}
          {userRole === "admin" && (
            <>
              <div
                onClick={() => navigate("/admin/inventory")}
                className="cursor-pointer"
              >
                <NavItem
                  icon="📦"
                  label="Inventory"
                  isOpen={isSidebarOpen}
                />
              </div>

              <div
  onClick={() => navigate("/admin/reports")}
  className="cursor-pointer"
>
  <NavItem
    icon="📈"
    label="Reports & Analytics"
    isOpen={isSidebarOpen}
  />
</div>
              <NavItem
                icon="🛡️"
                label="Security"
                isOpen={isSidebarOpen}
              />
            </>
          )}

          <div
  onClick={() => navigate("/admin/orders")}
  className="cursor-pointer"
>
  <NavItem icon="📄" label="Orders" isOpen={isSidebarOpen} />
</div>
          <div
  onClick={() => navigate("/admin/clients")}
  className="cursor-pointer"
>
  <NavItem icon="👥" label="Clients" isOpen={isSidebarOpen} />
</div>
         <div
  onClick={() => navigate("/admin/preserences")}
  className="cursor-pointer"
>
  <NavItem icon="⚙️" label="Preferences" isOpen={isSidebarOpen} />
</div>
        </nav>

        {/* Role Switcher (Demo only) */}
        <div className="p-4 bg-white/5 m-4 rounded-xl">
          <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">
            Switch Role
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setUserRole("admin")}
              className={`px-2 py-1 text-[10px] rounded ${
                userRole === "admin"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-800"
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setUserRole("user")}
              className={`px-2 py-1 text-[10px] rounded ${
                userRole === "user"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-800"
              }`}
            >
              User
            </button>
          </div>
        </div>
      </aside>

      {/* 🖥️ MAIN DASHBOARD */}
      <main className="flex-1 overflow-y-auto">
        <header className="px-10 py-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Logged in as:{" "}
              <span className="capitalize font-bold text-indigo-600">
                {userRole}
              </span>
            </p>
          </div>

          {userRole === "admin" && (
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
              Add Item +
            </button>
          )}
        </header>

        <div className="px-10 pb-12 space-y-12">
          {/* STATS */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="UNCLAIMED ITEMS" value={12} icon="📦" color="indigo" />
            <StatCard title="SALE ELIGIBLE" value={5} icon="✨" color="green" />

            {userRole === "admin" ? (
              <>
                <StatCard title="PENDING REVIEW" value={3} icon="⏳" color="yellow" />
                <StatCard title="BLOCKED ITEMS" value={2} icon="🛡️" color="red" />
              </>
            ) : (
              <div className="lg:col-span-2 p-6 bg-slate-200/50 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm italic">
                Additional stats restricted to Admin role.
              </div>
            )}
          </section>

          {/* TABLE */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-2">
              <SaleEligibleTable items={mockItems} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* Sidebar Item */
function NavItem({
  icon,
  label,
  isOpen,
  active = false,
}: {
  icon: string;
  label: string;
  isOpen: boolean;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 p-3 rounded-lg transition-colors cursor-pointer
        ${
          active
            ? "bg-white/10 text-white"
            : "hover:bg-white/5 text-slate-400 hover:text-white"
        }`}
    >
      <span className="text-lg">{icon}</span>
      {isOpen && (
        <span className="text-sm font-medium whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}
