import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/layout/sidebar/sidebar";
import { Header } from "../components/layout/header/header";
import { cn } from "../lib/utils";

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans selection:bg-primary/20 relative isolate">
      <div className="fixed inset-0 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5 pointer-events-none -z-50"></div>
      <div className="fixed top-0 left-0 right-0 h-[500px] w-full bg-primary/20 blur-[150px] opacity-20 dark:opacity-10 pointer-events-none -z-50"></div>
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      <div 
        className={cn(
          "flex-1 flex flex-col min-h-screen relative",
          "transition-[margin-left] duration-300 ease-in-out", 
          isSidebarOpen ? "ml-[280px]" : "ml-28"
        )}
      >
        <Header />
        <main className="flex-1 px-6 pb-6 pt-8 relative z-10">
             <Outlet />
        </main>
        <footer className="py-6 px-6 flex items-center justify-between text-xs font-medium text-muted-foreground/60 relative z-10">
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