import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../../../components/ui/button/button";
import { DeleteModal } from "../../../components/ui/delete-modal/delete-modal";
import { SliderFormModal, type SliderData } from "./components/slider-form-modal";
import { SliderTable } from "./components/slider-table";

const initialData: SliderData[] = [
  { id: 1, image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=150&q=80", alt: { az: "Qızıləhməd alması", en: "Gizil Ahmed apple", ru: "Яблоко Гызылахмед" }, status: "active" },
  { id: 2, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&q=80", alt: { az: "Tərəvəzlər", en: "Vegetables", ru: "Овощи" }, status: "active" },
];

export const SliderPage = () => {
  const [data, setData] = useState<SliderData[]>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SliderData | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // --- ACTIONS (MƏNTİQ) ---

  // Yeni yaratma
  const handleCreate = () => {
    setEditingItem(null); 
    setFormModalOpen(true);
  };

  // Redaktə etmə
  const handleEdit = (item: SliderData) => {
    setEditingItem(item); 
    setFormModalOpen(true);
  };

  // Silmə
  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  // API Save (Simulyasiya)
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

  // API Delete (Simulyasiya)
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Sliderlər
          </h1>
          <p className="text-muted-foreground mt-1">
            Ana səhifənin sliderlərini idarə edin.
          </p>
        </div>
        <Button 
           onClick={handleCreate} 
           className="dark:bg-neon dark:text-black hover:scale-105 transition-all shadow-lg shadow-primary/20 dark:shadow-neon/20"
        >
           <Plus className="w-4 h-4 mr-2" /> Yeni Slider
        </Button>
      </div>

      <SliderTable 
        data={data} 
        onEdit={handleEdit} 
        onDelete={handleDeleteClick} 
      />

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