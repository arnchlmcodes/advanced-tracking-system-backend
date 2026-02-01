import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/common/navbar";
import Button from "../components/common/button";

export default function Purchase() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  // Simple countdown timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          
          {/* ⏳ Reservation Header */}
          <div className="bg-slate-900 p-8 text-center text-white relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-indigo-500 rounded-b-full" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-2">
              Security Lock Active
            </p>
            <h1 className="text-3xl font-black tracking-tight mb-4">Item Reserved</h1>
            
            {/* Countdown Display */}
            <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-2 rounded-2xl backdrop-blur-md border border-white/10">
              <span className="text-xl">⏱️</span>
              <span className="text-2xl font-mono font-bold text-indigo-300">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <div className="p-10 space-y-8">
            {/* 📋 Order Summary */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Order Summary</h2>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600 font-medium">Asset Reference</span>
                <span className="text-slate-900 font-bold">#{id}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600 font-medium">Item Name</span>
                <span className="text-slate-900 font-bold text-right">MacBook Pro 16"</span>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200 flex justify-between items-center">
                <span className="text-slate-900 font-black">Total Amount</span>
                <span className="text-2xl font-black text-indigo-600">₹12,000</span>
              </div>
            </div>

            {/* 💡 Information Note */}
            <p className="text-sm text-slate-500 text-center px-4">
              By confirming, the purchase amount will be debited from your 
              <strong> Campus Wallet</strong> and ownership will be instantly 
              assigned to your student ID.
            </p>

            {/* 🔘 Action Buttons */}
            <div className="space-y-4">
              <Button
                className="w-full py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
                onClick={() => {
                  alert("Ownership Transferred Successfully!");
                  navigate("/admin"); // Redirecting back to dashboard or success page
                }}
              >
                Confirm & Pay
              </Button>
              
              <button
                onClick={() => navigate("/marketplace")}
                className="w-full text-slate-400 hover:text-red-500 font-bold text-sm transition-colors py-2"
              >
                Cancel Transaction
              </button>
            </div>
          </div>

          {/* 🔒 Footer Security Footer */}
          <div className="bg-slate-50 py-4 border-t border-slate-100 flex justify-center items-center gap-2">
             <span className="text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
               Encrypted Campus Payment Gateway
             </span>
          </div>
        </div>
      </div>
    </div>
  );
}