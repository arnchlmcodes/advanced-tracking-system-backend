/*import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/common/navbar";
import Button from "../components/common/button";
import Badge from "../components/common/bagde";
import { useRole } from "../context/RoleContext"; 
import AuditLifecycle from "../components/admin/Auditlifecycle";

export default function AdminReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useRole(); 
  
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [sold, setSold] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">*/
      
      {/* 🌑 Sidebar - Global Navigation */}
      /*<aside className={`${isSidebarOpen ? "w-72" : "w-20"} bg-[#06161a] text-slate-400 transition-all duration-300 flex flex-col border-r border-white/5`}>
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <div className={`flex items-center gap-3 text-white transition-all ${!isSidebarOpen && "scale-0 hidden"}`}>
            <div className="w-8 h-8 bg-[#bbf7d0] rounded flex items-center justify-center">
               <span className="text-slate-900 font-bold">📦</span>
            </div>
            <span className="font-bold text-xl tracking-tight uppercase">System</span>
          </div>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-white/10 rounded">
            {isSidebarOpen ? "❮" : "❯"}
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">*/
            {/* ⬅️ Back to Dashboard Link in Sidebar */}
           /* <div 
              onClick={() => navigate("/admin")} 
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 text-slate-400 hover:text-indigo-400 transition-all cursor-pointer"
            >
                <span className="text-lg">⬅️</span> {isSidebarOpen && <span className="text-sm font-medium">Back to Dashboard</span>}
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-lg bg-white/10 text-white cursor-pointer shadow-lg shadow-black/20">
                <span>🔍</span> {isSidebarOpen && <span className="text-sm font-medium">Review Detail</span>}
            </div>
        </nav>
      </aside>*/

      {/* 🖥️ Main Dashboard Content */}
     /* <main className="flex-1 flex flex-col min-w-0">
        <Navbar />*/

        {/* 🏷️ Sub-Header with Actionable Back Button */}
        /*<div className="px-8 lg:px-12 pt-8 flex items-center justify-between">
            <button 
              onClick={() => navigate("/admin")}
              className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-all font-semibold text-sm"
            >
              <span className="bg-white p-2 rounded-full shadow-sm group-hover:shadow-md transition-all">❮</span>
              Back to Dashboard
            </button>
            
            <div className="text-right">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Currently Reviewing</span>
                <span className="text-sm font-mono font-bold text-slate-900">ASSET_ID: #{id}</span>
            </div>
        </div>

        <div className="p-8 lg:p-12 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">*/
            
            {/* 📸 Left: Asset Preview & Timeline */}
            /*<div className="lg:col-span-5 space-y-8">
              <div className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-slate-200">
                <div className="relative overflow-hidden rounded-[1.8rem]">
                  <img
                    src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800"
                    alt="Asset"
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute top-4 left-4 scale-110">
                    <Badge
                      text={sold ? "RELEASED" : "UNDER REVIEW"}
                      status={sold ? "approved" : "pending"}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Internal History</h3>
                <AuditLifecycle />
              </div>
            </div>*/

            {/* 📝 Right: Role-Based Controls */}
           /* <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-200 relative overflow-hidden">
                <div className="relative z-10">
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Laptop (MacBook Pro)</h1>
                  <p className="text-indigo-600 font-bold text-sm bg-indigo-50 inline-block px-4 py-1.5 rounded-full mb-10">Electronics / Assets</p>*/

                  {/* Shared Info Grid */}
                  /*<div className="grid grid-cols-2 gap-8 mb-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Valuation</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                        <input
                          type="number"
                          defaultValue={12000}
                          disabled={role !== "admin" || sold}
                          className="w-full pl-10 pr-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-black text-xl text-slate-900 disabled:text-slate-500 transition-all outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Lifecycle</label>
                      <div className={`px-5 py-4 rounded-2xl font-bold text-center text-sm border ${sold ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-blue-50 text-blue-600 border-blue-100"}`}>
                        {sold ? "Released for Sale" : "Sale Eligible"}
                      </div>
                    </div>
                  </div>*/

                  {/* 🛡️ Role-Based Actions */}
                  /*{role === "admin" ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      {!sold ? (
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Internal Audit Remarks</label>
                            <textarea
                              placeholder="Add notes for the audit trail..."
                              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 h-32 resize-none focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                            />
                          </div>
                          <div className="flex gap-4">
                            <Button className="flex-1 py-5 rounded-2xl bg-indigo-600 text-white font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700" onClick={() => setSold(true)}>
                              Approve Release
                            </Button>
                            <Button variant="danger" className="flex-1 py-5 rounded-2xl font-bold">
                              Exclude Item
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-[2rem] text-center space-y-3">
                          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-2 text-xl shadow-lg shadow-emerald-200">✓</div>
                          <h3 className="text-xl font-bold text-emerald-800">Transaction Finalized</h3>
                          <p className="text-emerald-600 text-sm max-w-xs mx-auto">This asset has been officially released and logged in the system records.</p>
                          <button 
                            onClick={() => navigate("/admin")}
                            className="text-emerald-700 font-bold text-xs underline mt-4 hover:text-emerald-900"
                          >
                            Return to main dashboard
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] border-dashed text-center space-y-4">
                      <div className="text-3xl grayscale opacity-50">🛡️</div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-800 tracking-tight">Read-Only Access</h4>
                        <p className="text-xs text-slate-500 leading-relaxed px-10">
                          You are currently viewing this asset as a <strong>User</strong>. Actions are restricted.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>*/

              {/* System Note */}
              /*<div className="bg-[#0f172a] text-white p-6 rounded-2xl flex items-start gap-4 shadow-xl">
                <span className="text-indigo-400 font-bold">i</span>
                <p className="text-[11px] leading-relaxed opacity-80 uppercase tracking-widest font-medium">
                  Confidential Property: All status changes are logged against the current session ({role.toUpperCase()}) and are non-reversible once the blockchain audit confirms the release.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}*/
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/common/navbar";
import Button from "../components/common/button";
import Badge from "../components/common/bagde";
import { useRole } from "../context/RoleContext"; 
import AuditLifecycle from "../components/admin/Auditlifecycle";

export default function AdminReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useRole(); 
  
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [sold, setSold] = useState(false);
  const [status, setStatus] = useState("eligible");

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      
      {/* 🌑 Sidebar - Global Navigation */}
      <aside className={`${isSidebarOpen ? "w-72" : "w-20"} bg-[#06161a] text-slate-400 transition-all duration-300 flex flex-col border-r border-white/5`}>
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <div className={`flex items-center gap-3 text-white transition-all ${!isSidebarOpen && "scale-0 hidden"}`}>
            <div className="w-8 h-8 bg-[#bbf7d0] rounded flex items-center justify-center">
                <span className="text-slate-900 font-bold">📦</span>
            </div>
            <span className="font-bold text-xl tracking-tight uppercase">System</span>
          </div>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-white/10 rounded">
            {isSidebarOpen ? "❮" : "❯"}
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            <div 
              onClick={() => navigate("/admin")} 
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 text-slate-400 hover:text-indigo-400 transition-all cursor-pointer"
            >
                <span className="text-lg">⬅️</span> {isSidebarOpen && <span className="text-sm font-medium">Back to Dashboard</span>}
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-white/10 text-white cursor-pointer shadow-lg shadow-black/20">
                <span>🔍</span> {isSidebarOpen && <span className="text-sm font-medium">Review Detail</span>}
            </div>
        </nav>
      </aside>

      {/* 🖥️ Main Dashboard Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <Navbar />

        {/* 🏷️ Sub-Header */}
        <div className="px-8 lg:px-12 pt-8 flex items-center justify-between">
            <button 
              onClick={() => navigate("/admin")}
              className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-all font-semibold text-sm"
            >
              <span className="bg-white p-2 rounded-full shadow-sm group-hover:shadow-md transition-all">❮</span>
              Back to Dashboard
            </button>
            
            <div className="text-right">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Currently Reviewing</span>
                <span className="text-sm font-mono font-bold text-slate-900">ASSET_ID: #{id}</span>
            </div>
        </div>

        <div className="p-8 lg:p-12 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* 📸 Left: Asset Preview & Timeline */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-slate-200">
                <div className="relative overflow-hidden rounded-[1.8rem]">
                  <img
                    src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800"
                    alt="Asset"
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute top-4 left-4 scale-110">
                    <Badge
                      text={sold ? "RELEASED" : status.toUpperCase().replace("-", " ")}
                      status={sold ? "approved" : "pending"}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Internal History</h3>
                <AuditLifecycle />
              </div>
            </div>

            {/* 📝 Right: Asset Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-200 relative overflow-hidden">
                <div className="relative z-10">
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Laptop (MacBook Pro)</h1>
                  <p className="text-indigo-600 font-bold text-sm bg-indigo-50 inline-block px-4 py-1.5 rounded-full mb-10">Category: Electronics / Assets</p>

                  {/* 📊 Shared Info Grid (Matched to Image) */}
                  <div className="grid grid-cols-2 gap-8 mb-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valuation (₹)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                        <input
                          type="number"
                          defaultValue={12000}
                          disabled={role !== "admin" || sold}
                          className="w-full pl-10 pr-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-black text-xl text-slate-900 disabled:opacity-60 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Status</label>
                      <div className="relative">
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          disabled={role !== "admin" || sold}
                          className={`w-full px-5 py-4 rounded-2xl font-bold text-sm border appearance-none outline-none transition-all ${
                            sold 
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                              : "bg-emerald-50/30 text-emerald-600 border-emerald-100/50 focus:border-emerald-400"
                          }`}
                        >
                          <option value="eligible">Sale Eligible</option>
                          <option value="pending">Pending Audit</option>
                          <option value="blocked">Blocked / Restricted</option>
                        </select>
                        {!sold && (
                          <div className="absolute right-12 top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                        )}
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-600">
                          {sold ? "✓" : "▼"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 🛡️ Role-Based Actions */}
                  {role === "admin" ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      {!sold ? (
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Internal Remarks</label>
                            <textarea
                              placeholder="Notes for the final audit logs..."
                              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 h-32 resize-none focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                            />
                          </div>
                          <div className="flex gap-4">
                            <Button className="flex-1 py-5 rounded-2xl bg-indigo-600 text-white font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95" onClick={() => setSold(true)}>
                              Approve Release
                            </Button>
                            <Button variant="danger" className="flex-1 py-5 rounded-2xl font-bold transition-all active:scale-95">
                              Exclude Item
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-[2rem] text-center space-y-3">
                          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-2 text-xl shadow-lg shadow-emerald-200">✓</div>
                          <h3 className="text-xl font-bold text-emerald-800">Transaction Finalized</h3>
                          <p className="text-emerald-600 text-sm max-w-xs mx-auto">Asset status updated to public marketplace.</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] border-dashed text-center space-y-4">
                      <div className="text-3xl grayscale opacity-50">🛡️</div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-800 tracking-tight">Read-Only Access</h4>
                        <p className="text-xs text-slate-500 leading-relaxed px-10">
                          Viewing as <strong>Student</strong>. Admin-level release controls are locked for security purposes.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ⚠️ Warning Note (Matched to Image) */}
              <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex items-start gap-4 shadow-sm">
                <span className="text-amber-600 text-xl">⚠️</span>
                <p className="text-[12px] leading-relaxed text-amber-900 font-medium">
                  <strong>Note:</strong> Once approved, the item will be listed on the public sale board. Ensure the valuation matches current market trends for <strong>Electronics</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}