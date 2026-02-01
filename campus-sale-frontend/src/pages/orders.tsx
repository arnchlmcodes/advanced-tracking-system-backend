import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/navbar";
import Sidebar from "../components/admin/sidebar";
import Badge from "../components/common/bagde";

const ordersData = [
  {
    id: "ORD-1001",
    item: "Laptop",
    buyer: "Rahul Sharma",
    date: "2025-01-12",
    amount: "₹45,000",
    status: "COMPLETED",
  },
  {
    id: "ORD-1002",
    item: "Wallet",
    buyer: "Ananya Singh",
    date: "2025-01-14",
    amount: "₹1,200",
    status: "PENDING",
  },
  {
    id: "ORD-1003",
    item: "Smart Watch",
    buyer: "Arjun Mehta",
    date: "2025-01-16",
    amount: "₹9,999",
    status: "CANCELLED",
  },
];

export default function Orders() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <div className="p-8 lg:p-12 overflow-y-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-black">Orders</h1>
            <p className="text-slate-500 mt-1">
              Track and manage completed and pending orders
            </p>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-8 py-4">Order ID</th>
                  <th className="px-8 py-4">Item</th>
                  <th className="px-8 py-4">Buyer</th>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Amount</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {ordersData.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="px-8 py-4 font-mono text-indigo-600">
                      {order.id}
                    </td>
                    <td className="px-8 py-4 font-bold">
                      {order.item}
                    </td>
                    <td className="px-8 py-4">
                      {order.buyer}
                    </td>
                    <td className="px-8 py-4">
                      {order.date}
                    </td>
                    <td className="px-8 py-4 font-semibold">
                      {order.amount}
                    </td>
                    <td className="px-8 py-4">
                      <Badge
                        text={order.status}
                        status={
                          order.status === "COMPLETED"
                            ? "approved"
                            : order.status === "PENDING"
                            ? "pending"
                            : "blocked"
                        }
                      />
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                        className="text-sm font-bold text-indigo-600"
                      >
                        View
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
