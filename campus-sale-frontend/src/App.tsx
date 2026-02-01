/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App*/
/*import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AdminReview from "./pages/AdminReview";
import Marketplace from "./pages/Marketplace";
import Purchase from "./pages/Purchase";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/review" element={<AdminReview />} />
        <Route path="/purchase" element={<Purchase />} />
      </Routes>
    </BrowserRouter>
  );
}*/
/*import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AdminReview from "./pages/AdminReview";
import Marketplace from "./pages/Marketplace";
import ItemDetails from "./pages/ItemDetails";
import Purchase from "./pages/Purchase";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/review/:id" element={<AdminReview />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/purchase/:id" element={<Purchase />} />
      </Routes>
    </BrowserRouter>
  );
}*/
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Inventory from "./pages/inventory";
import AdminReview from "./pages/AdminReview";
import Marketplace from "./pages/Marketplace";
import ItemDetails from "./pages/ItemDetails";
import Purchase from "./pages/Purchase";
import ReportsAnalytics from "./pages/reportanalytics";
import Orders from "./pages/orders";
import Clients from "./pages/clients";
import Preferences from "./pages/preserences";





export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/admin" />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/inventory" element={<Inventory />} />
        <Route path="/admin/review/:id" element={<AdminReview />} />
        <Route path="/admin/reports" element={<ReportsAnalytics />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/clients" element={<Clients />} />
        <Route path="/admin/preserences" element={<Preferences />} />





        {/* USER / MARKETPLACE */}
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/purchase/:id" element={<Purchase />} />

      </Routes>
    </BrowserRouter>
  );
}






