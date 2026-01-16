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
        // KÖLGƏ AZALDILDI: Artıq shadow-2xl yox, daha yüngül shadow-xl və opacity azaldıldı
        "shadow-xl shadow-black/5 dark:shadow-black/20",
        "bg-card/80 dark:bg-[#09090b]/80 backdrop-blur-xl",
        "border border-black/5 dark:border-white/5", // Border rəngi də yumşaldıldı
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* 1. LOGO */}
      <div className={cn(
        "h-20 flex items-center relative",
        isOpen ? "justify-start px-6" : "justify-center"
      )}>
        <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-foreground">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary dark:text-neon dark:bg-neon/10 flex items-center justify-center shadow-sm shrink-0 transition-all">
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
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background border border-border/50 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary dark:hover:text-neon transition-all shadow-sm z-50"
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
              "flex items-center py-3 rounded-xl transition-all duration-200 group relative",
              isOpen ? "px-4 gap-3 justify-start" : "px-0 justify-center",
              
              // CRITICAL FIX: "Oynama" olmaması üçün həmişə border var, sadəcə transparentdir
              "border border-transparent",

              // --- İNAKTİV HAL ---
              !isActive && [
                  "text-muted-foreground cursor-pointer",
                  "hover:text-foreground hover:bg-accent/50",
                  "dark:hover:text-neon dark:hover:bg-neon/5" // Hover kölgəsi azaldıldı
              ],
              
              // --- AKTİV HAL ---
              isActive && [
                  "cursor-default font-medium",
                  
                  // LIGHT MODE: 
                  "bg-primary text-white shadow-sm shadow-primary/20", // Shadow-md -> Shadow-sm oldu
                  
                  // DARK MODE (Neon): 
                  "dark:bg-transparent dark:text-neon", 
                  "dark:border-neon/30", // Border rəngi daha soft oldu
                  "dark:shadow-[inset_0_0_10px_-5px_rgba(6,182,212,0.2)]", // İç parıltı azaldıldı
                  // Drop-shadow tam silindi ki, çox göz yormasın
              ]
            )}
          >
            {({ isActive }) => (
                <>
                    <item.icon className={cn(
                        "w-5 h-5 shrink-0 transition-all duration-300", 
                        isActive 
                            ? "text-white dark:text-neon" // Drop-shadow silindi, təmiz neon rəng qaldı
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
            "flex items-center w-full py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all border border-transparent",
            isOpen ? "px-4 gap-3 justify-start" : "px-0 justify-center"
        )}>
           <LogOut className="w-5 h-5 shrink-0" />
           {isOpen && <span className="font-medium whitespace-nowrap">Çıxış</span>}
        </button>
      </div>
    </aside>
  );
};