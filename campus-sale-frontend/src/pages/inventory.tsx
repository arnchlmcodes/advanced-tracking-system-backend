import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/navbar";
import Badge from "../components/common/bagde";
import Sidebar from "../components/admin/sidebar";

const inventoryData = [
  { id: "ASSET-001", item: "Laptop", category: "Electronics", days: 65, status: "PENDING" },
  { id: "ASSET-002", item: "Wallet", category: "Personal", days: 70, status: "APPROVED" },
  { id: "ASSET-003", item: "ID Card", category: "Restricted", days: 90, status: "BLOCKED" },
  { id: "ASSET-004", item: "Smart Watch", category: "Electronics", days: 12, status: "PENDING" },
  { id: "ASSET-005", item: "Backpack", category: "Personal", days: 45, status: "APPROVED" },
];

export default function Inventory() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <div className="p-8 lg:p-12 overflow-y-auto">
          <h1 className="text-4xl font-black mb-6">
            System Inventory
          </h1>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-8 py-4">Asset ID</th>
                  <th className="px-8 py-4">Item</th>
                  <th className="px-8 py-4">Category</th>
                  <th className="px-8 py-4">Days</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {inventoryData.map(item => (
                  <tr key={item.id} className="border-t">
                    <td className="px-8 py-4 font-mono text-indigo-600">
                      {item.id}
                    </td>
                    <td className="px-8 py-4 font-bold">
                      {item.item}
                    </td>
                    <td className="px-8 py-4">
                      {item.category}
                    </td>
                    <td className="px-8 py-4">
                      {item.days} days
                    </td>
                    <td className="px-8 py-4">
                      <Badge
                        text={item.status}
                        status={
                          item.status === "APPROVED"
                            ? "approved"
                            : item.status === "PENDING"
                            ? "pending"
                            : "blocked"
                        }
                      />
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button
                        onClick={() => navigate(`/admin/review/${item.id}`)}
                        className="text-sm font-bold text-indigo-600"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}
