import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  Store, 
  LogOut, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { cn } from "../../../lib/utils";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  
  const menuItems = [
    { title: "Ana Panel", url: "/dashboard", icon: LayoutDashboard },
    { title: "Məhsullar", url: "/dashboard/products", icon: ShoppingBag },
    { title: "İstifadəçilər", url: "/dashboard/users", icon: Users },
    { title: "Mağaza", url: "/dashboard/store", icon: Store },
    { title: "Ayarlar", url: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-4 top-4 bottom-4 z-40 rounded-2xl transition-all duration-300 flex flex-col",
        "shadow-2xl shadow-black/10 dark:shadow-black/40",
        "bg-card/80 dark:bg-[#09090b]/80 backdrop-blur-xl",
        "border border-black/5 dark:border-white/10",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* 1. LOGO */}
      <div className={cn(
        "h-20 flex items-center relative",
        isOpen ? "justify-start px-6" : "justify-center"
      )}>
        <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-foreground">
          {/* Logo qutusu: Dark modda Neon çərçivə və parıltı */}
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary dark:text-neon dark:bg-neon/10 dark:shadow-[0_0_10px_rgba(6,182,212,0.4)] flex items-center justify-center shadow-sm shrink-0 transition-all">
            AO
          </div>
          {isOpen && (
             <span className="animate-in fade-in duration-300 whitespace-nowrap dark:text-white">
                AdminOS
             </span>
          )}
        </div>

        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background border border-border/50 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary dark:hover:text-neon hover:border-primary dark:hover:border-neon transition-all shadow-sm z-50"
        >
          {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* 2. MENYU */}
      <div className="flex-1 py-4 px-3 space-y-2 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/dashboard"}
            className={({ isActive }) => cn(
              "flex items-center py-3 rounded-xl transition-all duration-300 group relative",
              isOpen ? "px-4 gap-3 justify-start" : "px-0 justify-center",

              // --- İNAKTİV HAL ---
              !isActive && [
                  "text-muted-foreground cursor-pointer",
                  "hover:text-foreground hover:bg-accent/50",
                  // Dark modda hover edəndə neon rəng gəlsin
                  "dark:hover:text-neon dark:hover:bg-neon/10"
              ],
              
              // --- AKTİV HAL (NEON SEHRI BURADADIR) ---
              isActive && [
                  "cursor-default font-medium",
                  
                  // LIGHT MODE: Standart bütöv yaşıl rəng
                  "bg-primary text-white shadow-md shadow-primary/25",
                  
                  // DARK MODE: Şəffaf fon + Neon Parıltı + Neon Yazı 🔥
                  "dark:bg-transparent dark:text-neon", // Arxa planı silirik
                  "dark:border dark:border-neon/50", // İncə çərçivə
                  "dark:shadow-[inset_0_0_15px_-5px_rgba(6,182,212,0.3)]", // İçəriyə doğru parıltı
                  "dark:drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" // Kənara doğru parıltı
              ]
            )}
          >
            {({ isActive }) => (
                <>
                    <item.icon className={cn(
                        "w-5 h-5 shrink-0 transition-all duration-300", 
                        
                        // İKON RƏNGLƏRİ:
                        // Light Active: Ağ
                        // Dark Active: Neon + Parıltı (Glow)
                        isActive 
                            ? "text-white dark:text-neon dark:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" 
                            : "group-hover:text-primary dark:group-hover:text-neon"
                    )} />
                    
                    {isOpen && (
                        <span className="animate-in fade-in slide-in-from-left-2 duration-300 whitespace-nowrap overflow-hidden">
                            {item.title}
                        </span>
                    )}

                    {!isOpen && (
                        <div className="absolute left-full ml-4 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-border">
                            {item.title}
                        </div>
                    )}
                </>
            )}
          </NavLink>
        ))}
      </div>

      {/* 3. FOOTER */}
      <div className="p-4 mb-2 border-t border-border/5">
        <button className={cn(
            "flex items-center w-full py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all",
            isOpen ? "px-4 gap-3 justify-start" : "px-0 justify-center"
        )}>
           <LogOut className="w-5 h-5 shrink-0" />
           {isOpen && <span className="font-medium whitespace-nowrap">Çıxış</span>}
        </button>
      </div>
    </aside>
  );
};