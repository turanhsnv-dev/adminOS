import { 
     Users, 
     DollarSign, 
     ShoppingBag, 
     Activity 
   } from "lucide-react";
   import { 
     AreaChart, 
     Area, 
     XAxis, 
     YAxis, 
     CartesianGrid, 
     Tooltip, 
     ResponsiveContainer 
   } from "recharts";
   import { StatsCard } from "../../components/dashboard/stats-card";
   
   // Qrafik üçün nümunə data
   const data = [
     { name: 'Yan', satish: 4000 },
     { name: 'Fev', satish: 3000 },
     { name: 'Mar', satish: 2000 },
     { name: 'Apr', satish: 2780 },
     { name: 'May', satish: 1890 },
     { name: 'İyun', satish: 2390 },
     { name: 'İyul', satish: 3490 },
     { name: 'Avq', satish: 4200 },
   ];
   
   export const DashboardHome = () => {
     return (
       <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
         
         {/* 1. BAŞLIQ */}
         <div>
           <h1 className="text-2xl font-bold tracking-tight">Ana Panel</h1>
           <p className="text-muted-foreground">Günlük statistikaya xoş gəldiniz.</p>
         </div>
   
         {/* 2. STATİSTİKA KARTLARI (GRID) */}
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
           <StatsCard 
              title="Ümumi Gəlir" 
              value="₼ 45,231.89" 
              trend="20.1%" 
              trendUp={true} 
              icon={DollarSign} 
           />
           <StatsCard 
              title="Abunəçilər" 
              value="+2350" 
              trend="180.1%" 
              trendUp={true} 
              icon={Users} 
           />
           <StatsCard 
              title="Satışlar" 
              value="+12,234" 
              trend="19%" 
              trendUp={true} 
              icon={ShoppingBag} 
           />
           <StatsCard 
              title="Aktivlik" 
              value="+573" 
              trend="201" 
              trendUp={false} // Azalma nümunəsi
              icon={Activity} 
           />
         </div>
   
         {/* 3. BÖYÜK QRAFİK (NEON AREA CHART) */}
         <div className="grid gap-6 md:grid-cols-7">
           
           {/* Sol tərəf: Qrafik (Daha geniş - 4 sütun) */}
           <div className="md:col-span-4 rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-card/40 backdrop-blur-md p-6 shadow-sm">
             <div className="mb-4">
               <h3 className="font-semibold text-lg">Gəlir Analizi</h3>
               <p className="text-sm text-muted-foreground">Son 8 ayın göstəriciləri</p>
             </div>
             
             <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={data}>
                   <defs>
                     <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                       {/* Dark modda Neon, Light modda Yaşıl gradient */}
                       <stop offset="5%" stopColor="var(--neon, #00A94F)" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="var(--neon, #00A94F)" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.2)" />
                   <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fill: 'gray', fontSize: 12}} 
                       dy={10}
                   />
                   <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fill: 'gray', fontSize: 12}} 
                       tickFormatter={(value) => `₼${value}`}
                   />
                   <Tooltip 
                       contentStyle={{ borderRadius: '12px', border: 'none', background: 'rgba(0,0,0,0.8)', color: '#fff' }}
                   />
                   <Area 
                       type="monotone" 
                       dataKey="satish" 
                       stroke="var(--neon, #00A94F)" // Xəttin rəngi
                       strokeWidth={3}
                       fillOpacity={1} 
                       fill="url(#colorSales)" 
                   />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
           </div>
   
           {/* Sağ tərəf: Son Satışlar (Nümunə - 3 sütun) */}
           <div className="md:col-span-3 rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-card/40 backdrop-blur-md p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Son Satışlar</h3>
              <div className="space-y-4">
                 {[1, 2, 3, 4, 5].map((_, i) => (
                     <div key={i} className="flex items-center justify-between p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                         <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                 <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="user" />
                             </div>
                             <div>
                                 <p className="text-sm font-medium">İstifadəçi {i + 1}</p>
                                 <p className="text-xs text-muted-foreground">admin@bineagro.com</p>
                             </div>
                         </div>
                         <div className="text-right">
                             <p className="text-sm font-bold text-primary dark:text-neon">+₼250.00</p>
                             <p className="text-xs text-muted-foreground">İndi</p>
                         </div>
                     </div>
                 ))}
              </div>
           </div>
   
         </div>
       </div>
     );
   };