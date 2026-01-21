// src/layouts/dashboard-layout.tsx

import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom"; // useLocation əlavə etdik
import { Sidebar } from "../components/layout/sidebar/sidebar";
import { Header } from "../components/layout/header/header";
import { cn } from "../lib/utils";

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  // Mobile-da yeni səhifəyə keçəndə sidebar avtomatik bağlansın
  useEffect(() => {
    // Avoid direct setState on render: use a microtask to batch update
    if (window.innerWidth < 768) {
      Promise.resolve().then(() => setIsSidebarOpen(false));
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans selection:bg-primary/20 relative isolate">
      
      {/* Background Effects (Eyni qalır) */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5 pointer-events-none -z-50"></div>
      <div className="fixed top-0 left-0 right-0 h-[500px] w-full bg-primary/20 blur-[150px] opacity-20 dark:opacity-10 pointer-events-none -z-50"></div>

      {/* Sidebar Component */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      {/* MAIN CONTENT AREA */}
      <div 
        className={cn(
          "flex-1 flex flex-col min-h-screen relative transition-all duration-300 ease-in-out",
          // DƏYİŞİKLİK BURADADIR:
          // Mobildə margin həmişə 0-dır (ml-0).
          // Desktopda (md:) margin sidebarın açıq/bağlı olmasına görə dəyişir.
          "ml-0", 
          isSidebarOpen ? "md:ml-[280px]" : "md:ml-28"
        )}
      >
        {/* Header-ə toggle funksiyasını göndəririk */}
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 px-4 md:px-6 pb-6 pt-2 md:pt-8 relative z-10 overflow-x-hidden">
             <Outlet />
        </main>

        <footer className="py-6 px-6 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-muted-foreground/60 relative z-10 gap-4">
             <div className="flex items-center gap-1 hover:text-foreground transition-colors cursor-default">
                <span>© 2026 AdminOS</span>
                <span className="w-1 h-1 rounded-full bg-primary dark:bg-neon"></span>
                <span>v1.0.2</span>
             </div>

             <div className="flex gap-4">
                <a href="#" className="hover:text-primary dark:hover:text-neon transition-colors">Dəstək</a>
                <a href="#" className="hover:text-primary dark:hover:text-neon transition-colors">Sənədlər</a>
             </div>
        </footer>
      </div>

    </div>
  );
};