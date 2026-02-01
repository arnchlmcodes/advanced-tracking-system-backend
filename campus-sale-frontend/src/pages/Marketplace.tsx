import Navbar from "../components/common/navbar";
import Badge from "../components/common/bagde";
import Button from "../components/common/button";
import { useNavigate } from "react-router-dom";

const saleItems = [
  {
    id: 1,
    name: "MacBook Pro 16\"",
    category: "Electronics",
    price: 12000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Tactical Backpack",
    category: "Travel",
    price: 800,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "Sony WH-1000XM4",
    category: "Audio",
    price: 1500,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
  },
];

export default function Marketplace() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        {/* 🏷️ Hero Section */}
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">
                Campus <span className="text-indigo-600">Marketplace</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-xl font-medium leading-relaxed">
                Discover pre-verified, unclaimed assets approved for campus-wide release. 
                Transparent pricing, direct ownership transfer.
              </p>
            </div>
            
            {/* 🔍 Search / Filter Placeholder */}
            <div className="flex gap-3">
               <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm text-slate-400 text-sm flex items-center gap-3 w-64">
                 <span>🔍</span> Search items...
               </div>
            </div>
          </div>
        </header>

        {/* 📦 Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {saleItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden m-4 rounded-[2rem]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <Badge text="VERIFIED" status="approved" />
                </div>
                {/* Glassmorphism Price Tag */}
                <div className="absolute bottom-4 left-4 backdrop-blur-md bg-white/70 px-4 py-2 rounded-2xl border border-white/20">
                   <p className="text-indigo-900 font-black">₹{item.price.toLocaleString()}</p>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 pt-2 flex-1 flex flex-col">
                <div className="mb-6">
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">
                    {item.category}
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                    {item.name}
                  </h2>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div>
                     <p className="text-xs text-slate-400 font-medium">Starting from</p>
                     <p className="text-xl font-black text-slate-900">₹{item.price}</p>
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/item/${item.id}`)}
                    className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 active:scale-95"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* ℹ️ Marketplace Footer Note */}
        <footer className="mt-20 p-10 bg-indigo-50 rounded-[3rem] border border-indigo-100 flex flex-col md:flex-row items-center gap-8">
           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">
             🛡️
           </div>
           <div>
             <h3 className="text-lg font-bold text-indigo-900 mb-1">Secure Campus Transfers</h3>
             <p className="text-sm text-indigo-700/70 max-w-2xl leading-relaxed">
               All items listed here have completed the 90-day unclaimed period and passed a physical security audit. 
               Purchases are final and ownership records are updated automatically in the campus database.
             </p>
           </div>
        </footer>
      </main>
    </div>
  );
}