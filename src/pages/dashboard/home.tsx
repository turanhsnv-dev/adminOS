import {
  Eye,
  ShoppingBag,
  FileText,
  Image as ImageIcon, // Qalereya ikonu
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StatsCard } from "../../components/dashboard/stats-card";
import { cn } from "../../lib/utils";

// Qrafik üçün data (Ziyarətçi Sayı)
const data = [
  { name: "Yan", baxis: 2400 },
  { name: "Fev", baxis: 1398 },
  { name: "Mar", baxis: 9800 },
  { name: "Apr", baxis: 3908 },
  { name: "May", baxis: 4800 },
  { name: "İyun", baxis: 3800 },
  { name: "İyul", baxis: 4300 },
  { name: "Avq", baxis: 5500 },
];

// Ən Çox Baxılanlar Datası (Yeni)
const topContent = [
  {
    title: "Quba Alması (Qızıləhməd)",
    category: "Məhsul",
    views: 1240,
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=150&q=80",
  },
  {
    title: "Yeni İstixana Layihəsi",
    category: "Xəbər",
    views: 890,
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=150&q=80",
  },
  {
    title: "Orqanik Gübrələr",
    category: "Məhsul",
    views: 750,
    image:
      "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=150&q=80",
  },
  {
    title: "Kənd Təsərrüfatı Sərgisi",
    category: "Bloq",
    views: 620,
    image:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=150&q=80",
  },
  {
    title: "Zirə Pomidoru",
    category: "Məhsul",
    views: 580,
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&q=80",
  },
];

export const DashboardHome = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. BAŞLIQ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            BineAgro İdarəetmə Paneli
          </h1>
          <p className="text-muted-foreground">
            Saytın performansı və ən çox maraq görən məzmunlar.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground bg-white/50 dark:bg-white/5 px-3 py-1 rounded-lg border border-black/5 dark:border-white/5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Server: Stabil
        </div>
      </div>

      {/* 2. STATİSTİKA KARTLARI */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Aktiv Məhsullar"
          value="124"
          trend="12 Yeni"
          trendUp={true}
          icon={ShoppingBag}
        />

        <StatsCard
          title="Aylıq Ziyarətçi"
          value="45.2K"
          trend="18% Artım"
          trendUp={true}
          icon={Eye}
        />

        <StatsCard
          title="Xəbər və Bloq"
          value="38"
          trend="2 Bu həftə"
          trendUp={true}
          icon={FileText}
        />

        {/* YENİ KART: Qalereya/Media */}
        <StatsCard
          title="Media Bazası"
          value="1,042" // Şəkil + Video sayı
          trend="+45 Fayl"
          trendUp={true}
          icon={ImageIcon}
        />
      </div>

      {/* 3. QRAFİK və POPULYAR MƏZMUNLAR */}
      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4 rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md p-6 shadow-sm flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Trafik Analizi</h3>
              <p className="text-sm text-muted-foreground">
                Sayta giriş dinamikası
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary dark:bg-neon/10 dark:text-neon cursor-pointer">
                Aylıq
              </span>
              <span className="text-xs px-2 py-1 rounded-md text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                İllik
              </span>
            </div>
          </div>

          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--neon, #06b6d4)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--neon, #06b6d4)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(128,128,128,0.1)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "gray", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "gray", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    background: "rgba(0,0,0,0.8)",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="baxis"
                  stroke="var(--neon, #06b6d4)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="md:col-span-3 rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg">Trend Məzmunlar</h3>
              <p className="text-xs text-muted-foreground">
                Ən çox kliklənən səhifələr
              </p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
          </div>

          <div className="space-y-4 overflow-y-auto pr-1 custom-scrollbar">
            {topContent.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group cursor-pointer"
              >
                {/* Şəkil */}
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-black/5 dark:border-white/10 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Məlumat */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate group-hover:text-primary dark:group-hover:text-neon transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-md font-medium",
                        item.category === "Məhsul" &&
                          "bg-orange-500/10 text-orange-600 dark:text-orange-400",
                        item.category === "Xəbər" &&
                          "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                        item.category === "Bloq" &&
                          "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                      )}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Baxış Sayı */}
                <div className="text-right shrink-0">
                  <span className="block text-sm font-bold text-foreground">
                    {item.views}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    baxış
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Alt düymə */}
          <button className="mt-auto w-full py-2 text-xs font-medium text-muted-foreground hover:text-primary dark:hover:text-neon border-t border-dashed border-border pt-4 transition-colors">
            Tam statistikaya bax
          </button>
        </div>
      </div>
    </div>
  );
};
