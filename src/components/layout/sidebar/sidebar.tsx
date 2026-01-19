import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Image,
  FileText,
  LayoutTemplate
} from "lucide-react";
import { cn } from "../../../lib/utils";
import type { LucideIcon } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

type MenuItem = {
  title: string;
  icon: LucideIcon;
  url?: string;
  submenu?: { title: string; url: string }[];
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    { 
      title: "Ana Panel", 
      url: "/dashboard", 
      icon: LayoutDashboard 
    },
    { 
      title: "Əsas Səhifə", 
      icon: LayoutTemplate, 
      submenu: [
        { title: "Slider (Hero)", url: "/dashboard/home/slider" },
        { title: "Tərəfdaşlar", url: "/dashboard/home/partners" },
        { title: "Haqqımızda", url: "/dashboard/home/about" },
      ]
    },
    { 
      title: "Məhsullar", 
      icon: ShoppingBag,
      submenu: [
        { title: "Məhsul Siyahısı", url: "/dashboard/products" },
        { title: "Kateqoriyalar", url: "/dashboard/products/categories" },
      ]
    },
    { 
      title: "Media Mərkəzi", 
      icon: FileText,
      submenu: [
        { title: "Xəbərlər", url: "/dashboard/news" },
        { title: "Bloqlar", url: "/dashboard/blogs" },
      ]
    },
    { 
      title: "Qalereya", 
      icon: Image,
      submenu: [
        { title: "Şəkillər", url: "/dashboard/gallery/photos" },
        { title: "Videolar", url: "/dashboard/gallery/videos" },
      ]
    },
    { 
      title: "Parametrlər", 
      icon: Settings,
      submenu: [
        { title: "Ümumi Ayarlar", url: "/dashboard/settings/general" },
        { title: "Əlaqə Məlumatları", url: "/dashboard/settings/contact" },
        { title: "Sosial Media", url: "/dashboard/settings/social" },
        { title: "Adminlər", url: "/dashboard/settings/admins" },
      ]
    },
  ];

  const handleMenuClick = (title: string) => {
    if (!isOpen) toggleSidebar(); 
    setOpenMenu(openMenu === title ? null : title);
  };

  return (
    <aside 
      className={cn(
        "fixed left-4 top-4 bottom-4 z-40 rounded-2xl flex flex-col",
        // DƏYİŞİKLİK: Transition kodları silindi.
        "shadow-xl shadow-black/5 dark:shadow-black/20",
        "border border-black/5 dark:border-white/10",
        "bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl", 
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* 1. LOGO */}
      <div className={cn(
        "h-20 flex items-center relative",
        isOpen ? "justify-start px-6" : "justify-center"
      )}>
        <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-foreground">
          
          <div className="w-10 h-10 flex items-center justify-center shrink-0 transition-all hover:scale-105 cursor-pointer">
             <img 
               src="https://cdn-icons-png.flaticon.com/512/1598/1598196.png" 
               alt="Binə Aqro Logo" 
               className="w-full h-full object-contain drop-shadow-md"
             />
          </div>

          {isOpen && (
             <span className="whitespace-nowrap dark:text-white font-bold text-lg">
                Binə Aqro
             </span>
          )}
        </div>

        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background dark:bg-zinc-800 border border-border/50 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary dark:hover:text-neon transition-all shadow-sm z-50"
        >
          {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* 2. MENYU */}
      <div className="flex-1 py-4 px-3 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = item.url ? location.pathname === item.url : false;
          const isSubActive = item.submenu?.some(sub => location.pathname === sub.url);
          
          return (
            <div key={item.title}>
              <div
                onClick={() => item.submenu ? handleMenuClick(item.title) : null}
                className={cn(
                  "flex items-center py-3 rounded-xl transition-all duration-200 group relative select-none",
                  isOpen ? "px-4 gap-3 justify-start" : "px-0 justify-center",
                  "border border-transparent",
                  !item.submenu ? "cursor-pointer" : "cursor-pointer",
                  (isActive || isSubActive)
                    ? [
                       "bg-primary text-white shadow-sm",
                       "dark:bg-transparent dark:text-neon dark:border-neon/30 dark:shadow-[inset_0_0_10px_-5px_rgba(6,182,212,0.2)]"
                      ]
                    : [
                       "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 dark:hover:text-neon"
                      ]
                )}
              >
                {item.url ? (
                    <NavLink to={item.url} className="absolute inset-0" />
                ) : null}

                <item.icon className={cn(
                    "w-5 h-5 shrink-0 transition-all duration-300", 
                    (isActive || isSubActive) ? "text-white dark:text-neon" : "group-hover:text-primary dark:group-hover:text-neon"
                )} />
                
                {isOpen && (
                    <>
                        <span className="flex-1 whitespace-nowrap overflow-hidden text-sm font-medium">
                            {item.title}
                        </span>
                        {item.submenu && (
                            <ChevronDown className={cn(
                                "w-4 h-4 transition-transform duration-300",
                                (openMenu === item.title) && "rotate-180"
                            )} />
                        )}
                    </>
                )}
              </div>

              {isOpen && item.submenu && (openMenu === item.title || isSubActive) && (
                  <div className="mt-1 ml-4 pl-4 border-l border-border space-y-1">
                      {item.submenu.map((sub) => (
                          <NavLink
                            key={sub.url}
                            to={sub.url}
                            className={({ isActive }) => cn(
                                "block py-2 px-3 rounded-lg text-sm transition-all",
                                isActive 
                                    ? "text-primary font-medium bg-primary/10 dark:text-neon dark:bg-neon/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                            )}
                          >
                              {sub.title}
                          </NavLink>
                      ))}
                  </div>
              )}
            </div>
          );
        })}
      </div>

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