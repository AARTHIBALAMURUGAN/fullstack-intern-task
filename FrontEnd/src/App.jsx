
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Templates from "./pages/Templetes";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />

        <Routes>
          <Route path="/" element={<Navigate to="/templates" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/templates" element={<Templates />} />
            <Route path="/favorites" element={<Favorites />} />
          </Route>

          <Route path="*" element={<Navigate to="/templates" replace />} />
        </Routes>

        <footer className="mt-12 border-t bg-white px-4 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} TemplateStore
        </footer>
      </div>
    </BrowserRouter>
  );
}
