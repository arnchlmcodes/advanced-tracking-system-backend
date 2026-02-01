import { useState } from "react";
import Navbar from "../components/common/navbar";
import Sidebar from "../components/admin/sidebar";
import Badge from "../components/common/bagde";

const clientsData = [
  {
    id: "CL-001",
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "+91 98765 43210",
    totalOrders: 5,
    status: "ACTIVE",
  },
  {
    id: "CL-002",
    name: "Ananya Singh",
    email: "ananya.singh@gmail.com",
    phone: "+91 99887 66554",
    totalOrders: 2,
    status: "ACTIVE",
  },
  {
    id: "CL-003",
    name: "Arjun Mehta",
    email: "arjun.mehta@gmail.com",
    phone: "+91 91234 56789",
    totalOrders: 0,
    status: "BLOCKED",
  },
];

export default function Clients() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

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
            <h1 className="text-4xl font-black">Clients</h1>
            <p className="text-slate-500 mt-1">
              Manage registered users and buyers
            </p>
          </div>

          {/* Clients Table */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-8 py-4">Client ID</th>
                  <th className="px-8 py-4">Name</th>
                  <th className="px-8 py-4">Email</th>
                  <th className="px-8 py-4">Phone</th>
                  <th className="px-8 py-4">Orders</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {clientsData.map((client) => (
                  <tr key={client.id} className="border-t">
                    <td className="px-8 py-4 font-mono text-indigo-600">
                      {client.id}
                    </td>
                    <td className="px-8 py-4 font-bold">
                      {client.name}
                    </td>
                    <td className="px-8 py-4">
                      {client.email}
                    </td>
                    <td className="px-8 py-4">
                      {client.phone}
                    </td>
                    <td className="px-8 py-4 font-semibold">
                      {client.totalOrders}
                    </td>
                    <td className="px-8 py-4">
                      <Badge
                        text={client.status}
                        status={
                          client.status === "ACTIVE"
                            ? "approved"
                            : "blocked"
                        }
                      />
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button className="text-sm font-bold text-indigo-600">
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
