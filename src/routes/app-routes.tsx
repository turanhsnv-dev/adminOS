import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoadingSpinner } from "../components/ui/loading-spinner/loading-spinner";

// --- LAZY IMPORTS (Performans üçün) ---
// Bizim komponentlər "export const" olduğu üçün, onları belə import edirik:

const LoginPage = lazy(() => 
  import("../features/auth/login-page").then(module => ({ default: module.LoginPage }))
);

const SliderPage = lazy(() => 
  import("../pages/dashboard/home/slider-page").then(module => ({ default: module.SliderPage }))
);
const PartnersPage = lazy(() => 
  import("../pages/dashboard/home/partners-page").then(module => ({ default: module.PartnersPage }))
);
const ProductList = lazy(() => 
  import("../pages/dashboard/products/product-list").then(module => ({ default: module.ProductList }))
);
const DashboardLayout = lazy(() => 
  import("../layouts/dashboard-layout").then(module => ({ default: module.DashboardLayout }))
);
const AboutPage = lazy(() => 
  import("../pages/dashboard/home/about-page").then(module => ({ default: module.AboutPage }))
);

const DashboardHome = lazy(() => 
  import("../pages/dashboard/home").then(module => ({ default: module.DashboardHome }))
);

export const AppRoutes = () => {
  return (
    // Suspense: Səhifə yüklənənə qədər Spinner fırlanır
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Kök səhifə Loginə yönləndirir */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        
        {/* Login Səhifəsi */}
        <Route path="/auth/login" element={<LoginPage />} />

        {/* Dashboard Layout (Sidebar + Header + Footer) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          
          {/* ƏSAS SƏHİFƏ (Dashboard Home - Kartlar və Qrafik) */}
          <Route index element={<DashboardHome />} />
          
          {/* Digər səhifələr (Hələlik boşdur) */}
          <Route path="products" element={<ProductList />} />
          <Route path="users" element={<div className="p-4">İstifadəçilər (Tezliklə)</div>} />
          <Route path="store" element={<div className="p-4">Mağaza (Tezliklə)</div>} />
          <Route path="settings" element={<div className="p-4">Ayarlar (Tezliklə)</div>} />
          <Route path="home/slider" element={<SliderPage />} />
          <Route path="home/partners" element={<PartnersPage />} />
          <Route path="home/about" element={<AboutPage />} />
        </Route>

        {/* 404 - Tapılmadı */}
        <Route path="*" element={
            <div className="h-screen flex items-center justify-center text-xl font-bold text-muted-foreground">
                404 - Səhifə Tapılmadı
            </div>
        } />
      </Routes>
    </Suspense>
  );
};