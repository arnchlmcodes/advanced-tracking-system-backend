import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import Button from "../components/common/button";

export default function Login() {
  const { login } = useRole();
  const navigate = useNavigate();

  const handleLogin = (role: "admin" | "user") => {
    login(role);
    // Both redirect to admin dashboard, but context will hide/show features
    navigate("/admin"); 
  };

  return (
    <div className="min-h-screen bg-[#06161a] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 🛡️ Admin Portal Card */}
        <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-xl hover:bg-white/10 transition-all group">
          <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-indigo-500/20">
            🔐
          </div>
          <h2 className="text-3xl font-black text-white mb-2">Staff Portal</h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Authorized access for system administrators to manage assets, audits, and sales.
          </p>
          <Button 
            className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
            onClick={() => handleLogin("admin")}
          >
            Login as Admin
          </Button>
        </div>

        {/* 👥 User Portal Card */}
        <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-xl hover:bg-white/10 transition-all group">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-emerald-500/20">
            🎓
          </div>
          <h2 className="text-3xl font-black text-white mb-2">Student Portal</h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            View unclaimed assets, track your items, and browse the campus marketplace.
          </p>
          <Button 
            className="w-full py-4 rounded-2xl bg-white text-slate-900 font-bold hover:bg-slate-200"
            onClick={() => handleLogin("user")}
          >
            Login as Student
          </Button>
        </div>

      </div>

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}