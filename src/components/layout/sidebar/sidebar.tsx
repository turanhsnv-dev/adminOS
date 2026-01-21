// src/components/layout/sidebar/sidebar.tsx
// (Importlar eynidir, sadəcə X ikonu əlavə edirik)
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  // ...digər ikonlar
  LayoutDashboard, ShoppingBag, Settings, LogOut, ChevronLeft, ChevronRight, ChevronDown, Image, FileText, LayoutTemplate,
  X // <--- BAĞLAMAQ ÜÇÜN İKON
} from "lucide-react";
import { cn } from "../../../lib/utils";
import type { LucideIcon } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// ... MenuItems eyni qalır ...
// (Burada yer tutmasın deyə təkrar yazmıram, yuxarıdakı kodun eynisidir)

type MenuItem = {
    title: string;
    icon: LucideIcon;
    url?: string;
    submenu?: { title: string; url: string }[];
  };
  
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Menyular eyni qalır...
  const menuItems: MenuItem[] = [
      { title: "Ana Panel", url: "/dashboard", icon: LayoutDashboard },
      { title: "Əsas Səhifə", icon: LayoutTemplate, submenu: [
          { title: "Slider (Hero)", url: "/dashboard/home/slider" },
          { title: "Tərəfdaşlar", url: "/dashboard/home/partners" },
          { title: "Haqqımızda", url: "/dashboard/home/about" },
        ]
      },
      { title: "Məhsullar", icon: ShoppingBag, submenu: [
          { title: "Məhsul Siyahısı", url: "/dashboard/products" },
        ]
      },
      { title: "Media Mərkəzi", icon: FileText, submenu: [
          { title: "Xəbərlər", url: "/dashboard/news" },
          { title: "Bloqlar", url: "/dashboard/blogs" },
        ]
      },
      { title: "Qalereya", icon: Image, submenu: [
          { title: "Şəkillər", url: "/dashboard/gallery/photos" },
          { title: "Videolar", url: "/dashboard/gallery/videos" },
        ]
      },
      { title: "Parametrlər", icon: Settings, submenu: [
          { title: "Ümumi Ayarlar", url: "/dashboard/settings/general" },
          { title: "Əlaqə Məlumatları", url: "/dashboard/settings/contact" },
          { title: "Sosial Media", url: "/dashboard/settings/social" },
          { title: "Adminlər", url: "/dashboard/settings/admins" },
        ]
      },
    ];

  const handleMenuClick = (title: string) => {
    // Mobildə sub-menu açanda sidebar bağlanmasın
    // Amma Desktopda sidebar bağlıdırsa açılsın
    if (!isOpen && window.innerWidth > 768) toggleSidebar(); 
    setOpenMenu(openMenu === title ? null : title);
  };

  return (
    <>
      {/* MOBILE BACKDROP (Qara fon) */}
      {/* Yalnız mobildə (md:hidden) və sidebar açıqsa görünür */}
      <div 
        onClick={toggleSidebar}
        className={cn(
            "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden",
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      <aside 
        className={cn(
          // ÜMUMİ STİLLƏR
          "fixed top-0 bottom-0 z-50 flex flex-col transition-all duration-300 ease-in-out",
          "bg-white/90 dark:bg-zinc-900/95 backdrop-blur-xl border-r border-black/5 dark:border-white/10",
          "md:top-4 md:bottom-4 md:left-4 md:rounded-2xl md:border", // Desktop üçün border və radius
          
          // MOBILE LOGIC (Əsas dəyişiklik buradadır)
          // Mobildə: Sol tərəfdə gizlənir (-translate-x-full), açılanda (translate-x-0) olur.
          // Desktopda (md:): Translate həmişə 0-dır, eni dəyişir.
          "w-[280px] md:w-auto", // Mobildə sabit genişlik
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          
          // DESKTOP WIDTH
          isOpen ? "md:w-64" : "md:w-20"
        )}
      >
        <div className={cn(
          "h-16 md:h-20 flex items-center relative shrink-0", // Header hündürlüyü
          isOpen ? "justify-between px-6" : "justify-center"
        )}>
          {/* LOGO */}
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-foreground">
            <div className="w-10 h-10 flex items-center justify-center shrink-0 transition-all hover:scale-105 cursor-pointer">
               <img 
                 src="https://cdn-icons-png.flaticon.com/512/1598/1598196.png" 
                 alt="Binə Aqro Logo" 
                 className="w-full h-full object-contain drop-shadow-md"
               />
            </div>
            {/* Desktopda açıqsa və ya Mobildə (həmişə açıq görünür çünki slide olur) */}
            <span className={cn(
                "whitespace-nowrap dark:text-white font-bold text-lg transition-opacity duration-300",
                !isOpen && "md:hidden" // Desktopda bağlı olanda gizlət
            )}>
               Binə Aqro
            </span>
          </div>

          {/* CLOSE BUTTON (Mobile) */}
          <button onClick={toggleSidebar} className="md:hidden text-muted-foreground hover:text-foreground">
             <X size={24} />
          </button>

          {/* TOGGLE BUTTON (Desktop) */}
          <button 
            onClick={toggleSidebar}
            className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background dark:bg-zinc-800 border border-border/50 rounded-full items-center justify-center text-muted-foreground hover:text-primary dark:hover:text-neon transition-all shadow-sm z-50"
          >
            {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>

        {/* Scrollable Menu */}
        <div className="flex-1 py-4 px-3 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
           {/* MENU ITEMS LOOP - (Bura əvvəlki koddakı kimi qalır, məntiq dəyişmir) */}
           {menuItems.map((item) => {
              const isActive = item.url ? location.pathname === item.url : false;
              const isSubActive = item.submenu?.some(sub => location.pathname === sub.url);
              
              // Mobildə həmişə "Open" rejimində kimi görünür, Desktopda isə isOpen yoxlanır

              return (
                <div key={item.title}>
                  <div
                    onClick={() => item.submenu ? handleMenuClick(item.title) : null}
                    className={cn(
                      "flex items-center py-3 rounded-xl transition-all duration-200 group relative select-none cursor-pointer",
                      // Padding logic: Mobildə həmişə px-4, Desktopda isOpen-ə görə
                      isOpen ? "px-4 gap-3 justify-start" : "md:px-0 md:justify-center px-4 gap-3 justify-start", 
                      (isActive || isSubActive)
                        ? "bg-primary text-white shadow-sm dark:bg-transparent dark:text-neon dark:border-neon/30 dark:shadow-[inset_0_0_10px_-5px_rgba(6,182,212,0.2)]"
                        : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 dark:hover:text-neon"
                    )}
                  >
                     {/* ... Link və Icon məntiqi əvvəlki koddakı kimi ... */}
                     {item.url && <NavLink to={item.url} className="absolute inset-0" />}
                     <item.icon className={cn("w-5 h-5 shrink-0 transition-all", (isActive || isSubActive) ? "text-white dark:text-neon" : "group-hover:text-primary dark:group-hover:text-neon")} />
                     
                     {/* Text: Desktopda bağlı olanda gizlənir, Mobildə həmişə görünür (çünki sidebar bütöv gəlir) */}
                     <span className={cn(
                         "flex-1 whitespace-nowrap overflow-hidden text-sm font-medium transition-all",
                         !isOpen && "md:hidden" 
                     )}>
                        {item.title}
                     </span>
                     
                     {/* Chevron */}
                     {item.submenu && (
                        <ChevronDown className={cn(
                            "w-4 h-4 transition-transform duration-300",
                            (openMenu === item.title) && "rotate-180",
                            !isOpen && "md:hidden"
                        )} />
                     )}
                  </div>

                  {/* SUBMENU LOGIC */}
                  {item.submenu && (openMenu === item.title || isSubActive) && (isOpen || window.innerWidth < 768) && (
                      <div className={cn("mt-1 ml-4 pl-4 border-l border-border space-y-1", !isOpen && "md:hidden")}>
                          {item.submenu.map((sub) => (
                              <NavLink key={sub.url} to={sub.url} className={({ isActive }) => cn("block py-2 px-3 rounded-lg text-sm transition-all", isActive ? "text-primary font-medium bg-primary/10 dark:text-neon dark:bg-neon/10" : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5")}>
                                  {sub.title}
                              </NavLink>
                          ))}
                      </div>
                  )}
                </div>
              );
           })}
        </div>

        {/* LOGOUT BUTTON */}
        <div className="p-4 mb-2 md:mb-0 border-t border-border/5">
            <button className={cn(
                "flex items-center w-full py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all",
                isOpen ? "px-4 gap-3 justify-start" : "md:px-0 md:justify-center px-4 gap-3 justify-start"
            )}>
               <LogOut className="w-5 h-5 shrink-0" />
               <span className={cn("font-medium whitespace-nowrap", !isOpen && "md:hidden")}>Çıxış</span>
            </button>
        </div>
      </aside>
    </>
  );
};