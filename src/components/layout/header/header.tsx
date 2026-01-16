import { Moon, Sun, Bell, Search } from "lucide-react";
import { cn } from "../../../lib/utils";

export const Header = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    // HEADER KONTEYNERİ:
    // 1. sticky top-4: Səhifəni scroll edəndə yuxarıda yapışıb qalacaq (Sidebar kimi)
    // 2. mx-6: Kənarlardan sidebar qədər boşluq
    // 3. Glassmorphism: Sidebar ilə eyni arxa plan və blur
    <header className={cn(
      "sticky top-4 z-30 mx-6 mb-8 px-4 h-16 flex items-center justify-between transition-all duration-300",
      "rounded-2xl",
      "bg-card/80 dark:bg-[#09090b]/80 backdrop-blur-xl",
      "shadow-sm shadow-black/5 dark:shadow-black/20", // Yüngül kölgə
      "border border-black/5 dark:border-white/5"      // İncə çərçivə
    )}>
      
      {/* SOL TƏRƏF: Search Bar */}
      {/* Inputun borderini sildim, headerin özü onsuz da çərçivədir. Sadəlik. */}
      <div className="flex items-center gap-3 px-3 py-2 rounded-xl w-full max-w-md transition-all group">
         <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary dark:group-focus-within:text-neon transition-colors" />
         <input 
            type="text" 
            placeholder="Axtarış..." 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground/70 text-foreground"
         />
      </div>

      {/* SAĞ TƏRƏF: Düymələr */}
      <div className="flex items-center gap-2">
        
        {/* Bildiriş */}
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

        {/* Theme Toggle */}
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
        
        {/* Divider (Ayırıcı xətt) */}
        <div className="h-6 w-px bg-border mx-2"></div>

        {/* Profil (Sadə və Şıq) */}
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