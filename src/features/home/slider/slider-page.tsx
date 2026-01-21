import { useState } from "react";
import { Plus, Pencil, Trash2, Type } from "lucide-react";
import { Button } from "../../../components/ui/button/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../../../components/ui/table/table";
import { cn } from "../../../lib/utils";

// Bizim yaratdığımız yeni komponentlər:
import { DeleteModal } from "../../../components/ui/delete-modal/delete-modal";
import { SliderFormModal, type SliderData } from "./components/slider-form-modal";

const initialData: SliderData[] = [
  { id: 1, image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=150&q=80", alt: { az: "Alma Kampaniyası", en: "Apple Campaign", ru: "Яблочная кампания" }, status: "active" },
  { id: 2, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&q=80", alt: { az: "Tərəvəzlər", en: "Vegetables", ru: "Овощи" }, status: "active" },
];

export const SliderPage = () => {
  const [data, setData] = useState<SliderData[]>(initialData);
  const [isSaving, setIsSaving] = useState(false);

  // Modalların idarəsi (Sadece açıq/bağlı və seçilən item)
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SliderData | null>(null);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // --- ACTIONS ---

  const handleCreate = () => {
    setEditingItem(null); // Yeni əlavə edirik
    setFormModalOpen(true);
  };

  const handleEdit = (item: SliderData) => {
    setEditingItem(item); // Mövcud olanı redaktə edirik
    setFormModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  // --- API LOGIC (Simulyasiya) ---

  const onSave = (formData: { image: string; alt: { az: string; en: string; ru: string } }) => {
    setIsSaving(true);
    setTimeout(() => {
      if (editingItem) {
        // Update
        setData(data.map(item => item.id === editingItem.id ? { ...item, ...formData } : item));
      } else {
        // Create
        setData([{ id: Date.now(), status: "active", ...formData }, ...data]);
      }
      setIsSaving(false);
      setFormModalOpen(false);
    }, 1000);
  };

  const onConfirmDelete = () => {
    if (!deleteId) return;
    setIsSaving(true);
    setTimeout(() => {
      setData(data.filter(item => item.id !== deleteId));
      setIsSaving(false);
      setDeleteModalOpen(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Sliderlər</h1>
          <p className="text-muted-foreground mt-1">Ana səhifənin sliderlərini idarə edin.</p>
        </div>
        <Button onClick={handleCreate} className="dark:bg-neon dark:text-black hover:scale-105 transition-all">
           <Plus className="w-4 h-4 mr-2" /> Yeni Slider
        </Button>
      </div>

      {/* TABLE (Bu hissə qısa olduğu üçün burada qala bilər) */}
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
              <TableRow key={item.id}>
                <TableCell>
                   <img src={item.image} className="w-24 h-14 object-cover rounded-lg shadow-sm border border-border" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 font-medium">
                     <Type className="w-4 h-4 text-primary" /> {item.alt.az}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className={cn("px-2 py-1 rounded-full text-[10px] font-bold uppercase", item.status === "active" ? "bg-green-500/10 text-green-600" : "bg-zinc-500/10 text-zinc-500")}>
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleEdit(item)} className="p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all">
                       <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteClick(item.id)} className="p-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-all">
                       <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <SliderFormModal 
         isOpen={formModalOpen} 
         onClose={() => setFormModalOpen(false)} 
         onSave={onSave} 
         initialData={editingItem} 
         isSaving={isSaving} 
      />

      <DeleteModal 
         isOpen={deleteModalOpen} 
         onClose={() => setDeleteModalOpen(false)} 
         onConfirm={onConfirmDelete} 
         isLoading={isSaving}
         description="Bu slider həmişəlik silinəcək."
      />
    </div>
  );
};