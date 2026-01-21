// src/components/layout/header/header.tsx

import { useLocation, Link } from "react-router-dom";
import { Moon, Sun, Bell, ChevronRight, Home, Menu } from "lucide-react"; // Menu əlavə olundu
import { cn } from "../../../lib/utils";

// Interface əlavə edirik
interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: HeaderProps) => { // Props qəbul edilir
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const pathMap: Record<string, string> = {
    "dashboard": "Ana Panel",
    "home": "Əsas Səhifə",
    "products": "Məhsullar",
    "slider": "Slider",
    "partners": "Tərəfdaşlar",
    "about": "Haqqımızda",
    "news": "Xəbərlər",
    "blogs": "Bloqlar",
    "settings": "Ayarlar",
    "users": "İstifadəçilər",
    "store": "Mağaza"
  };

  return (
    <header className={cn(
      "sticky top-4 z-30 mx-4 md:mx-6 mb-8 px-4 h-16 flex items-center justify-between", // mx-4 mobildə kənarları azaltdıq
      "rounded-2xl",
      "bg-card/80 dark:bg-[#09090b]/80 backdrop-blur-xl",
      "shadow-sm shadow-black/5 dark:shadow-black/20",
      "border border-black/5 dark:border-white/5"
    )}>
      
      <div className="flex items-center gap-2 text-sm font-medium">
         {/* HAMBURGER MENU - Yalnız Mobile-da görünür (md:hidden) */}
         <button 
            onClick={toggleSidebar}
            className="md:hidden p-2 -ml-2 mr-2 text-muted-foreground hover:text-foreground active:scale-95 transition-transform"
         >
            <Menu className="w-6 h-6" />
         </button>

         <Link 
            to="/dashboard" 
            className="p-1.5 rounded-lg bg-primary/5 text-primary dark:text-neon dark:bg-neon/10 hover:bg-primary/10 dark:hover:bg-neon/20 transition-colors hidden sm:block" // sm:block etdik ki, çox kiçik ekranda yer tutmasın
         >
            <Home className="w-4 h-4" />
         </Link>

         {/* Breadcrumbs - Mobildə uzun olarsa gizlətmək olar, amma hələlik qalsın */}
         <div className="flex items-center text-muted-foreground overflow-hidden whitespace-nowrap mask-linear-fade">
            {pathSegments.map((segment, index) => {
              const isLast = index === pathSegments.length - 1;
              const name = pathMap[segment] || segment;
              const to = `/${pathSegments.slice(0, index + 1).join("/")}`;
              
              // Mobildə yalnız sonuncunu göstərmək üçün sinifləri tənzimləyə bilərik,
              // amma sadəlik üçün hələlik olduğu kimi saxlayırıq.
              return (
                <div key={index} className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1 opacity-50" />
                  {isLast ? (
                     <span className="text-foreground font-semibold capitalize cursor-default">
                        {name}
                     </span>
                  ) : (
                     <Link 
                        to={to} 
                        className="hover:text-foreground hover:underline underline-offset-4 transition-all capitalize hidden sm:block"
                     >
                        {name}
                     </Link>
                  )}
                </div>
              );
            })}
         </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Digər düymələr eyni qalır... */}
        <button className={cn(
            "w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 border border-transparent",
            "text-muted-foreground hover:text-foreground",
            "hover:bg-accent/50 dark:hover:bg-neon/10 dark:hover:text-neon dark:hover:border-neon/20"
        )}>
            <div className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-card"></span>
            </div>
        </button>
        <button 
          onClick={toggleTheme} 
          className={cn(
            "w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 border border-transparent relative overflow-hidden",
            "text-foreground hover:bg-accent/50",
            "dark:hover:bg-neon/10 dark:hover:border-neon/20"
          )}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-neon drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
        </button>
        
        {/* User Profile - Mobildə sadələşdirmək olar */}
        <div className="h-6 w-px bg-border mx-2 hidden sm:block"></div>
        <button className={cn(
            "flex items-center gap-3 pl-1 pr-3 py-1 rounded-xl border border-transparent transition-all",
            "hover:bg-accent/50 dark:hover:bg-neon/5 dark:hover:border-neon/20"
        )}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-purple-500 p-[1px]">
                 <div className="w-full h-full rounded-lg bg-card flex items-center justify-center overflow-hidden">
                    <img src="https://github.com/shadcn.png" alt="User" className="w-full h-full object-cover" />
                 </div>
            </div>
            <div className="hidden md:flex flex-col items-start text-xs">
                <span className="font-medium text-foreground">Admin</span>
                <span className="text-muted-foreground">Turan</span>
            </div>
        </button>
      </div>
    </header>
  );
};