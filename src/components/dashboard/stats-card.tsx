import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean; // Artım yoxsa azalma?
  icon: LucideIcon;
}

export const StatsCard = ({ title, value, trend, trendUp, icon: Icon }: StatsCardProps) => {
  return (
    <div className={cn(
      "p-6 rounded-2xl transition-all duration-300 group",
      // GLASS EFFECT & BORDER
      "bg-white/60 dark:bg-card/10 backdrop-blur-md",
      "border border-black/5 dark:border-white/5",
      "shadow-sm hover:shadow-md dark:shadow-black/20"
    )}>
      <div className="flex items-center justify-between mb-4">
        {/* İkon Qutusu */}
        <div className={cn(
          "p-3 rounded-xl transition-colors",
          "bg-primary/10 text-primary",
          "dark:bg-neon/10 dark:text-neon" // Neon Dark Mode
        )}>
          <Icon size={22} />
        </div>
        
        {/* Trend (Faiz göstəricisi) */}
        <div className={cn(
          "flex items-center text-xs font-bold px-2.5 py-1 rounded-full",
          trendUp 
            ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" 
            : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
        )}>
          {trendUp ? "+" : ""}{trend}
        </div>
      </div>

      {/* Rəqəmlər */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <h2 className="text-2xl font-bold text-foreground mt-1 group-hover:scale-[1.02] transition-transform origin-left">
            {value}
        </h2>
      </div>
    </div>
  );
};