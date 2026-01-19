import { useState } from "react";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  EyeOff,
  Image as ImageIcon,
  Type
} from "lucide-react";
import { Button } from "../../../components/ui/button/button";
import { cn } from "../../../lib/utils";

interface Partner {
  id: number;
  logo: string;
  alt: string;
  status: "active" | "inactive";
}

// Dummy Data (Loqolar)
const initialData: Partner[] = [
  { id: 1, logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", alt: "Amazon AWS Cloud", status: "active" },
  { id: 2, logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", alt: "Google Analytics Partner", status: "active" },
  { id: 3, logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", alt: "Microsoft Azure", status: "inactive" },
];

export const PartnersPage = () => {
  const [data] = useState<Partner[]>(initialData);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Tərəfdaşlar
          </h1>
          <p className="text-muted-foreground mt-1">Ana səhifədə görünən partnyor şirkətlərin loqoları.</p>
        </div>
        
        <div className="flex items-center gap-3">
           

            <Button className="dark:bg-neon dark:text-black dark:hover:bg-neon/90 rounded-xl px-6 shadow-lg shadow-primary/20 dark:shadow-neon/20 transition-all hover:scale-105 active:scale-95">
               <Plus className="w-4 h-4 mr-2" />
               Yeni Tərəfdaş
            </Button>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl shadow-xl shadow-black/5 overflow-hidden">
        <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left">
            
            <thead className="text-xs font-medium text-muted-foreground uppercase border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
                <tr>
                <th className="px-6 py-5 tracking-wider">Loqo</th>
                <th className="px-6 py-5 tracking-wider w-full">Alternativ Mətn (Alt)</th>
                <th className="px-6 py-5 tracking-wider whitespace-nowrap">Status</th>
                <th className="px-6 py-5 tracking-wider text-right">Əməliyyatlar</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {data.map((item) => (
                <tr key={item.id} className="group hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200">
                    
                    {/* 1. Loqo (Fərqli style: Ağ fon veririk ki, PNG loqolar görünsün) */}
                    <td className="px-6 py-4">
                       <div className="w-24 h-16 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 shadow-sm relative group-hover:scale-105 transition-transform duration-300 bg-white flex items-center justify-center p-2">
                          {item.logo ? (
                             <img src={item.logo} alt={item.alt} className="max-w-full max-h-full object-contain" />
                          ) : (
                             <ImageIcon className="w-6 h-6 text-muted-foreground" />
                          )}
                       </div>
                    </td>

                    {/* 2. Məzmun (Alt Text) */}
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                             <div className="p-2 rounded-lg bg-primary/5 text-primary dark:text-neon dark:bg-neon/10 shrink-0 border border-primary/10 dark:border-neon/10">
                                <Type className="w-4 h-4" />
                             </div>
                             <span className="font-medium text-foreground text-sm line-clamp-2">
                                {item.alt}
                             </span>
                        </div>
                    </td>

                    {/* 3. Status */}
                    <td className="px-6 py-4">
                        <div className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                            item.status === "active"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                : "bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/20"
                        )}>
                            <span className={cn(
                                "w-1.5 h-1.5 rounded-full animate-pulse",
                                item.status === "active" ? "bg-emerald-500" : "bg-zinc-400"
                            )}></span>
                            {item.status === "active" ? "Aktiv" : "Passiv"}
                        </div>
                    </td>

                    {/* 4. Əməliyyatlar */}
                    <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                            <button 
                                className={cn(
                                    "p-2 rounded-lg border transition-all duration-200",
                                    item.status === "active"
                                        ? "text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20"
                                        : "text-zinc-500 border-zinc-200 bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                                )}
                                title={item.status === "active" ? "Gizlət" : "Yayımla"}
                            >
                                {item.status === "active" ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                            <button className="p-2 rounded-lg text-blue-600 border border-blue-200 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all duration-200">
                                <Pencil className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg text-red-600 border border-red-200 bg-red-50 dark:text-red-400 dark:bg-red-500/10 dark:border-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all duration-200">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </td>

                </tr>
                ))}
            </tbody>
            </table>

            {data.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mb-3 opacity-20" />
                    <p>Hələ heç bir tərəfdaş yoxdur.</p>
                </div>
            )}
        </div>
      </div>

    </div>
  );
};