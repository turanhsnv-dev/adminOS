import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "../layouts/dashboard-layout";
import { LoadingSpinner } from "../components/ui/loading-spinner/loading-spinner";

const DashboardHome = lazy(() => import("../features/dashboard/dashboard-page").then(m => ({ default: m.DashboardHome })));
const LoginPage = lazy(() => import("../features/auth/login-page").then(m => ({ default: m.LoginPage })));
const SliderPage = lazy(() => import("../features/home/slider/slider-page").then(m => ({ default: m.SliderPage })));
const PartnersPage = lazy(() => import("../features/home/partners/partners-page").then(m => ({ default: m.PartnersPage })));
const AboutPage = lazy(() => import("../features/home/about/about-page").then(m => ({ default: m.AboutPage })));
const ProductList = lazy(() => import("../features/products/product-list/product-list").then(m => ({ default: m.ProductList })));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><LoadingSpinner /></div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="home/slider" element={<SliderPage />} />
          <Route path="home/partners" element={<PartnersPage />} />
          <Route path="home/about" element={<AboutPage />} />
          <Route path="products" element={<ProductList />} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};