import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button/button";
import { Input } from "../../components/ui/input/input";
import { Mail, Lock, Command, Moon, Sun } from "lucide-react";
import { cn } from "../../lib/utils";

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground relative overflow-hidden transition-colors duration-300 selection:bg-neon/30">
      
      {/* --- ARXA PLAN EFFEKTLƏRİ (NEON TOXUNUŞLAR) --- */}
      
      {/* 1. Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 dark:to-neon/5 pointer-events-none"></div>

      {/* 2. Nöqtələr (Dot Pattern) - Dark modda Neon rəngdə */}
      <div className="absolute inset-0 h-full w-full 
        bg-[radial-gradient(#000000_1px,transparent_1px)] 
        dark:bg-[radial-gradient(#06b6d4_1px,transparent_1px)] 
        [background-size:20px_20px] 
        opacity-[0.05] dark:opacity-[0.1] pointer-events-none">
      </div>

      {/* 3. Spotlight Effekti - Dark modda Mavi/Neon Duman */}
      <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-primary/20 dark:bg-neon/20 blur-[150px] opacity-20 dark:opacity-20 pointer-events-none"></div>


      {/* --- UI ELEMENTLƏRİ --- */}

      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme} 
        className="absolute top-6 right-6 p-2.5 rounded-xl bg-background/50 hover:bg-accent border border-border/50 backdrop-blur-sm transition-all shadow-sm z-50 group"
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all text-orange-500 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute top-2.5 left-2.5 h-5 w-5 rotate-90 scale-0 transition-all text-blue-400 dark:rotate-0 dark:scale-100 dark:text-neon dark:drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
      </button>
      
      {/* Login Kartı */}
      <div className="w-full max-w-[420px] px-4 relative z-10">
        <div className={cn(
            "backdrop-blur-xl shadow-2xl rounded-2xl p-8 md:p-10 transition-all duration-300",
            // Light Mode: Sadə ağ kart
            "bg-white/70 border border-black/5 shadow-black/5",
            // Dark Mode: Tünd, Neon haşiyəli kart
            "dark:bg-[#09090b]/60 dark:border dark:border-neon/20 dark:shadow-neon/5"
        )}>
          
          {/* Logo */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-inner transition-all duration-300",
                // Light: Yaşıl
                "bg-primary/10 text-primary ring-1 ring-primary/20",
                // Dark: Neon Mavi + Glow
                "dark:bg-neon/10 dark:text-neon dark:ring-neon/30 dark:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            )}>
               <Command className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-white">Xoş Gəldiniz</h1>
            <p className="text-sm text-muted-foreground mt-2">AdminOS idarəetmə mərkəzi</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input 
              label="Email ünvanı" 
              type="email" 
              placeholder="admin@bineagro.com" 
              icon={<Mail className="w-4 h-4" />}
              // Dark modda inputa Neon focus veririk
              className="dark:focus:border-neon/50 dark:focus:ring-neon/20 transition-all"
            />
            
            <div className="space-y-1">
                <Input 
                  label="Şifrə" 
                  type="password" 
                  placeholder="••••••••" 
                  icon={<Lock className="w-4 h-4" />}
                  className="dark:focus:border-neon/50 dark:focus:ring-neon/20 transition-all"
                />
                <div className="flex justify-end pt-1">
                    <a href="#" className="text-xs font-medium text-muted-foreground hover:text-primary dark:hover:text-neon transition-colors">
                        Şifrəni unutmusunuz?
                    </a>
                </div>
            </div>

            <Button 
                type="submit" 
                className={cn(
                    "w-full h-11 text-base transition-all duration-300",
                    // Light Mode
                    "shadow-lg shadow-primary/20",
                    // Dark Mode: Neon Arxa plan və Qara yazı (Contrast üçün)
                    "dark:bg-neon dark:text-black dark:hover:bg-neon/90 dark:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                )} 
                isLoading={isLoading}
            >
              Sistemə Daxil Ol
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Qeydiyyatdan keçmək üçün <a href="#" className="font-medium text-primary hover:underline underline-offset-4 dark:text-neon">inzibatçı</a> ilə əlaqə saxlayın.
          </p>
        </div>
      </div>
    </div>
  );
};