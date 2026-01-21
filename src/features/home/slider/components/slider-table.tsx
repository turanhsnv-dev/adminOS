import { Pencil, Trash2, Type, Image as ImageIcon } from "lucide-react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "../../../../components/ui/table/table";
import { cn } from "../../../../lib/utils";
import type { SliderData } from "./slider-form-modal"; // Tipi buradan götürürük

interface SliderTableProps {
  data: SliderData[];
  onEdit: (item: SliderData) => void;
  onDelete: (id: number) => void;
}

export const SliderTable = ({ data, onEdit, onDelete }: SliderTableProps) => {
  return (
    <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/80 dark:bg-zinc-900/95 backdrop-blur-xl shadow-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Görüntü</TableHead>
            <TableHead>Başlıq (AZ)</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Əməliyyatlar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="group">
              
              {/* Şəkil */}
              <TableCell>
                <div className="w-24 h-14 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 shadow-sm relative group-hover:scale-105 transition-transform duration-300">
                  {item.image ? (
                    <img src={item.image} alt={item.alt.az} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                       <ImageIcon className="w-6 h-6 text-muted-foreground opacity-50" />
                    </div>
                  )}
                </div>
              </TableCell>

              {/* Mətn */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/5 text-primary dark:text-neon dark:bg-neon/10 shrink-0 border border-primary/10 dark:border-neon/10">
                    <Type className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-foreground text-sm line-clamp-2">
                    {item.alt.az}
                  </span>
                </div>
              </TableCell>

              {/* Status */}
              <TableCell className="text-center">
                <div className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border transition-colors",
                    item.status === "active" 
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" 
                        : "bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/20"
                )}>
                  <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", item.status === "active" ? "bg-emerald-500" : "bg-zinc-400")}></span>
                  {item.status === "active" ? "Aktiv" : "Deaktiv"}
                </div>
              </TableCell>

              {/* Düymələr */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <button 
                    onClick={() => onEdit(item)} 
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-all dark:text-blue-400 dark:bg-blue-500/10 dark:border-blue-500/20 dark:hover:bg-blue-500/20"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onDelete(item.id)} 
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 transition-all dark:text-red-400 dark:bg-red-500/10 dark:border-red-500/20 dark:hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Əgər data yoxdursa boş mesajı */}
      {data.length === 0 && (
         <div className="p-8 text-center text-muted-foreground">
             Hələ heç bir slider yoxdur.
         </div>
      )}
    </div>
  );
};