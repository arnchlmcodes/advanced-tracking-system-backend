import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/common/navbar";
import Badge from "../components/common/bagde";
import Button from "../components/common/button";

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* 🔙 Sophisticated Back Button */}
        <button
          onClick={() => navigate("/marketplace")}
          className="group mb-8 flex items-center gap-3 text-slate-500 hover:text-indigo-600 transition-all font-bold text-sm"
        >
          <span className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
            ❮
          </span>
          Back to Marketplace
        </button>

        <div className="bg-white rounded-[3rem] p-8 lg:p-16 shadow-sm border border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* 📸 High-Contrast Image Showcase */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-cover"
                alt="Product"
              />
              <div className="absolute top-6 left-6 scale-125 origin-top-left">
                <Badge text="VERIFIED SALE" status="approved" />
              </div>
            </div>
            
            {/* Gallery Thumbnails (Static Placeholder) */}
            <div className="grid grid-cols-4 gap-4">
               {[1,2,3].map((i) => (
                 <div key={i} className="aspect-square rounded-2xl bg-slate-100 border border-slate-200 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
               ))}
            </div>
          </div>

          {/* 📝 Product Info & Actions */}
          <div className="flex flex-col h-full py-4">
            <div className="mb-10">
              <p className="text-xs font-black text-indigo-500 uppercase tracking-[0.2em] mb-3">
                Asset ID: #{id}
              </p>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">
                MacBook Pro 16"
              </h1>
              <div className="flex items-center gap-4">
                 <p className="text-3xl font-black text-slate-900">₹12,000</p>
                 <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100">
                    Excellent Condition
                 </span>
              </div>
            </div>

            <div className="space-y-6 text-slate-600 leading-relaxed mb-10">
              <p>
                This high-performance laptop was processed through the <strong>Campus Unclaimed Assets Protocol</strong>. 
                It has been data-wiped and physically inspected by the security team.
              </p>
              
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-indigo-500 font-bold">✓</span> Battery Health: 92%
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-500 font-bold">✓</span> Original Charger Included
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-500 font-bold">✓</span> Screen: No Scratches
                </li>
              </ul>
            </div>

            {/* 🛡️ Buyer Protection Card */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 mb-10">
              <div className="flex gap-4">
                <span className="text-2xl text-indigo-600">🛡️</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Campus Verified Ownership</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Upon purchase, the system will automatically transfer the asset ownership record to your University ID.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <Button
                className="w-full py-5 rounded-[1.5rem] bg-slate-900 hover:bg-indigo-600 text-white font-black text-lg transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
                onClick={() => navigate(`/purchase/${id}`)}
              >
                Secure Purchase
              </Button>
              <p className="text-center text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-widest">
                Payment processed via Campus Wallet / UPI
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}