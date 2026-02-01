import { useState } from "react";
import Navbar from "../components/common/navbar";
import Sidebar from "../components/admin/sidebar";

export default function Preferences() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [settings, setSettings] = useState({
    notifications: true,
    autoApprove: false,
    darkMode: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <div className="p-8 lg:p-12 overflow-y-auto space-y-10">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-black">Preferences</h1>
            <p className="text-slate-500 mt-1">
              Manage system behavior and admin settings
            </p>
          </div>

          {/* General Settings */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 space-y-6">
            <h2 className="text-xl font-bold">General</h2>

            <ToggleRow
              label="Enable Notifications"
              description="Receive alerts for important system actions"
              checked={settings.notifications}
              onChange={() => handleToggle("notifications")}
            />

            <ToggleRow
              label="Auto-approve Sale Eligible Items"
              description="Automatically approve items after review period"
              checked={settings.autoApprove}
              onChange={() => handleToggle("autoApprove")}
            />

            <ToggleRow
              label="Dark Mode (Admin)"
              description="Enable dark theme for admin panel"
              checked={settings.darkMode}
              onChange={() => handleToggle("darkMode")}
            />
          </section>

          {/* Security Settings */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 space-y-6">
            <h2 className="text-xl font-bold">Security</h2>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Change Admin Password</p>
                <p className="text-sm text-slate-500">
                  Update your admin account password
                </p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold">
                Change
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Two-Factor Authentication</p>
                <p className="text-sm text-slate-500">
                  Add extra security to admin login
                </p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-slate-200 text-sm font-bold">
                Configure
              </button>
            </div>
          </section>

          {/* Save */}
          <div className="flex justify-end">
            <button className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition">
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

/* Toggle Component */
function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>

      <button
        onClick={onChange}
        className={`w-14 h-8 flex items-center rounded-full p-1 transition ${
          checked ? "bg-emerald-500" : "bg-slate-300"
        }`}
      >
        <span
          className={`bg-white w-6 h-6 rounded-full shadow transform transition ${
            checked ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  );
}
