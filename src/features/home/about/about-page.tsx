import { useState } from "react";
import { 
  Save, 
  Upload, 
  Globe, 
  Type, 
  FileText,
  ImageIcon
} from "lucide-react";
import { Button } from "../../../components/ui/button/button";
import { Input } from "../../../components/ui/input/input";
import { cn } from "../../../lib/utils";

type Language = "az" | "en" | "ru";

export const AboutPage = () => {
  const [activeLang, setActiveLang] = useState<Language>("az");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&q=80",
    az: { title: "BineAgro Haqqında", content: "Biz kənd təsərrüfatı sahəsində 10 illik təcrübəyə malikik..." },
    en: { title: "About BineAgro", content: "We have 10 years of experience in agriculture..." },
    ru: { title: "О BineAgro", content: "У нас 10-летний опыт работы в сельском хозяйстве..." },
  });

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 w-full h-[calc(100vh-140px)] flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Haqqımızda Bölməsi
          </h1>
          <p className="text-muted-foreground mt-1">Ana səhifədəki "Biz kimik" mətnini və şəkli idarə edin.</p>
        </div>
        
        <Button 
            onClick={handleSave} 
            isLoading={isLoading}
            className="dark:bg-neon dark:text-black dark:hover:bg-neon/90 rounded-xl px-6 shadow-lg shadow-primary/20 dark:shadow-neon/20 transition-all active:scale-95"
        >
           <Save className="w-4 h-4 mr-2" />
           Yadda Saxla
        </Button>
      </div>

      {/* GRID: items-stretch (Hər iki tərəf eyni boyda olsun) */}
      <div className="grid gap-8 lg:grid-cols-2 flex-1 min-h-0">
          
          {/* --- SOL TƏRƏF: ŞƏKİL --- */}
          <div className="h-[600px]">
              <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-5 shadow-sm h-full flex flex-col relative overflow-hidden group">
                  
                  {/* Başlıq */}
                  <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg shrink-0">
                      <ImageIcon className="w-5 h-5 text-primary dark:text-neon" />
                      Qapaq Şəkli
                  </h3>
                  
                  {/* Şəkil Sahəsi - Flex-1 (Bütün yeri tutsun) */}
                  <div className="relative w-full flex-1 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-muted shadow-md cursor-pointer">
                      <img src={formData.image} alt="About" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-[2px] z-10">
                          <Upload className="w-10 h-10 text-white mb-2" />
                          <p className="text-white font-medium text-lg">Şəkli Dəyiş</p>
                          <p className="text-white/70 text-sm">Klikləyərək yükləyin</p>
                      </div>

                      {/* INPUT FILE - Bütün şəkli və qutunu əhatə edir */}
                      <input 
                        type="file" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                        title="Şəkil seçmək üçün klikləyin"
                      />
                  </div>

                  {/* Alt Məlumat */}
                  <p className="text-xs text-muted-foreground text-center mt-4 shrink-0">
                      PNG, JPG və ya WebP formatı. Maksimum 5MB.
                  </p>
              </div>
          </div>

          {/* --- SAĞ TƏRƏF: MƏTN --- */}
          <div className="h-[600px]">
              <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-6 shadow-sm h-full flex flex-col">
                  
                  {/* Dil Tabları */}
                  <div className="flex items-center gap-2 mb-6 p-1.5 bg-black/5 dark:bg-zinc-950/50 rounded-xl w-full border border-black/5 dark:border-white/5 shrink-0">
                      {(["az", "en", "ru"] as Language[]).map((lang) => (
                          <button
                              key={lang}
                              onClick={() => setActiveLang(lang)}
                              className={cn(
                                  "flex-1 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 uppercase flex items-center justify-center gap-2",
                                  activeLang === lang 
                                      ? "bg-white dark:bg-zinc-800 text-foreground shadow-sm scale-100 font-bold" 
                                      : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 scale-95"
                              )}
                          >
                              <Globe className="w-3.5 h-3.5" />
                              {lang}
                          </button>
                      ))}
                  </div>

                  {/* Form */}
                  <div className="space-y-5 flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300" key={activeLang}>
                      
                      {/* Başlıq (Sabit) */}
                      <div className="space-y-2.5 shrink-0">
                          <label className="text-sm font-medium flex items-center gap-2 text-foreground">
                              <Type className="w-4 h-4 text-primary dark:text-neon" />
                              Başlıq ({activeLang.toUpperCase()})
                          </label>
                          <Input 
                              value={formData[activeLang].title}
                              onChange={(e) => setFormData({
                                  ...formData, 
                                  [activeLang]: { ...formData[activeLang], title: e.target.value }
                              })}
                              className="bg-white/50 dark:bg-zinc-950/50 h-12 text-lg font-medium"
                          />
                      </div>

                      {/* Məzmun - FLEX-1 (Bu hissə uzanacaq) */}
                      <div className="space-y-2.5 flex-1 flex flex-col">
                          <label className="text-sm font-medium flex items-center gap-2 text-foreground">
                              <FileText className="w-4 h-4 text-primary dark:text-neon" />
                              Məzmun ({activeLang.toUpperCase()})
                          </label>
                          <textarea 
                              value={formData[activeLang].content}
                              onChange={(e) => setFormData({
                                  ...formData, 
                                  [activeLang]: { ...formData[activeLang], content: e.target.value }
                              })}
                              className={cn(
                                  "flex-1 w-full rounded-xl border border-input bg-white/50 dark:bg-zinc-950/50 px-4 py-3 text-base shadow-sm transition-all placeholder:text-muted-foreground resize-none",
                                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
                              )}
                          />
                      </div>

                  </div>
              </div>
          </div>
      
      </div>
    </div>
  );
};