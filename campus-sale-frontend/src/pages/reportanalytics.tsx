import { useState } from "react";
import Navbar from "../components/common/navbar";
import Sidebar from "../components/admin/sidebar";

export default function ReportsAnalytics() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <div className="p-8 lg:p-12 space-y-10 overflow-y-auto">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-black">
              Reports & Analytics
            </h1>
            <p className="text-slate-500 mt-1">
              System insights, trends, and performance metrics
            </p>
          </div>

          {/* KPI Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Stat title="Total Items" value="124" />
            <Stat title="Sale Eligible" value="38" />
            <Stat title="Blocked Items" value="12" />
            <Stat title="Avg Days Unclaimed" value="54" />
          </section>

          {/* Charts (UI placeholders) */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card title="Items by Category">
              <PlaceholderChart />
            </Card>

            <Card title="Item Status Distribution">
              <PlaceholderChart />
            </Card>
          </section>

          {/* Activity Log */}
          <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b font-bold">
              Recent System Activity
            </div>

            <ul className="divide-y">
              <li className="p-6 text-sm">
                📦 Laptop marked <b>Sale Eligible</b>
              </li>
              <li className="p-6 text-sm">
                🛡️ ID Card <b>Blocked</b> by Admin
              </li>
              <li className="p-6 text-sm">
                ✨ Wallet approved for resale
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

/* Small Components */

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200">
      <p className="text-xs uppercase text-slate-500 font-bold">
        {title}
      </p>
      <p className="text-3xl font-black mt-2">
        {value}
      </p>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200">
      <h3 className="font-bold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function PlaceholderChart() {
  return (
    <div className="h-56 flex items-center justify-center bg-slate-100 rounded-xl text-slate-400 text-sm italic">
      Chart will be rendered here
    </div>
  );
}
