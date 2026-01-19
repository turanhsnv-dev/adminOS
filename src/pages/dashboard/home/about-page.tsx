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

// Dil seçimləri
type Language = "az" | "en" | "ru";

export const AboutPage = () => {
  const [activeLang, setActiveLang] = useState<Language>("az");
  const [isLoading, setIsLoading] = useState(false);

  // Demo Data (Formanın içi dolu gəlsin deyə)
  const [formData, setFormData] = useState({
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&q=80",
    az: { title: "BineAgro Haqqında", content: "Biz kənd təsərrüfatı sahəsində 10 illik təcrübəyə malikik..." },
    en: { title: "About BineAgro", content: "We have 10 years of experience in agriculture..." },
    ru: { title: "О BineAgro", content: "У нас 10-летний опыт работы в сельском хозяйстве..." },
  });

  const handleSave = () => {
    setIsLoading(true);
    // Simulyasiya: API sorğusu gedir...
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
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

      <div className="grid gap-8 lg:grid-cols-3">
          
          {/* SOL TƏRƏF: Şəkil Yükləmə */}
          <div className="lg:col-span-1 space-y-4">
              <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-5 shadow-sm">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-primary dark:text-neon" />
                      Qapaq Şəkli
                  </h3>
                  
                  {/* Şəkil Preview */}
                  <div className="aspect-video w-full rounded-xl overflow-hidden border border-black/10 dark:border-white/10 relative group mb-4 bg-muted">
                      <img src={formData.image} alt="About" className="w-full h-full object-cover" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-xs font-medium">Dəyişmək üçün klikləyin</p>
                      </div>
                  </div>

                  {/* Upload Button */}
                  <div className="relative">
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <Button variant="outline" className="w-full border-dashed border-2">
                        <Upload className="w-4 h-4 mr-2" />
                        Yeni Şəkil Seç
                    </Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center mt-2">
                      PNG, JPG və ya WebP. Maksimum 2MB.
                  </p>
              </div>
          </div>

          {/* SAĞ TƏRƏF: Mətn və Dillər */}
          <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-6 shadow-sm">
                  
                  {/* DİL TABLARI */}
                  <div className="flex items-center gap-2 mb-6 p-1 bg-black/5 dark:bg-white/5 rounded-xl w-fit">
                      {(["az", "en", "ru"] as Language[]).map((lang) => (
                          <button
                              key={lang}
                              onClick={() => setActiveLang(lang)}
                              className={cn(
                                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 uppercase flex items-center gap-2",
                                  activeLang === lang 
                                      ? "bg-white dark:bg-zinc-800 text-foreground shadow-sm scale-100" 
                                      : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 scale-95"
                              )}
                          >
                              <Globe className="w-3 h-3" />
                              {lang}
                          </button>
                      ))}
                  </div>

                  {/* FORM INPUTLARI */}
                  <div className="space-y-4 animate-in fade-in slide-in-from-left-2 duration-300" key={activeLang}>
                      
                      {/* Başlıq Input */}
                      <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                              <Type className="w-4 h-4" />
                              Başlıq ({activeLang.toUpperCase()})
                          </label>
                          <Input 
                              value={formData[activeLang].title}
                              onChange={(e) => setFormData({
                                  ...formData, 
                                  [activeLang]: { ...formData[activeLang], title: e.target.value }
                              })}
                              className="bg-white/50 dark:bg-zinc-900/50"
                          />
                      </div>

                      {/* Məzmun Textarea */}
                      <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                              <FileText className="w-4 h-4" />
                              Məzmun ({activeLang.toUpperCase()})
                          </label>
                          <textarea 
                              rows={6}
                              value={formData[activeLang].content}
                              onChange={(e) => setFormData({
                                  ...formData, 
                                  [activeLang]: { ...formData[activeLang], content: e.target.value }
                              })}
                              className={cn(
                                  "flex w-full rounded-xl border border-input bg-white/50 dark:bg-zinc-900/50 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground",
                                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring"
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