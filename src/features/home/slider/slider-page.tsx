import { useState, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Type,
  Upload,
  AlertTriangle // Uyarı ikonu eklendi
} from "lucide-react";
import { Button } from "../../../components/ui/button/button";
import { Input } from "../../../components/ui/input/input";
import { Modal } from "../../../components/ui/modal/modal";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "../../../components/ui/table/table";
import { cn } from "../../../lib/utils";

interface Slider {
  id: number;
  image: string;
  alt: string;
  status: "active" | "inactive";
}

const initialData: Slider[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=150&q=80",
    alt: "Qızıləhməd alması kampaniya banneri",
    status: "active",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&q=80",
    alt: "Mövsümi tərəvəzlər ümumi görüntü",
    status: "active",
  },
];

export const SliderPage = () => {
  const [data, setData] = useState<Slider[]>(initialData);
  
  // --- STATE YÖNETİMİ ---
  // 1. Form Modalı için
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [altText, setAltText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 2. Silme Modalı için (YENİ)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [isSaving, setIsSaving] = useState(false); // Yükleniyor durumu

  // Dosya Seçme
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // --- DÜZENLEME (Edit) ---
  const handleEdit = (item: Slider) => {
      setEditingId(item.id);
      setPreviewUrl(item.image);
      setAltText(item.alt);
      setIsFormModalOpen(true);
  };

  // --- SİLME BUTONUNA BASINCA (Onay Modalı Aç) ---
  const onDeleteClick = (id: number) => {
      setDeleteId(id);            // Hangi ID silinecek?
      setIsDeleteModalOpen(true); // Modalı aç
  };

  // --- SİLME İŞLEMİNİ GERÇEKLEŞTİR (Action) ---
  const confirmDelete = () => {
      if (!deleteId) return;
      
      setIsSaving(true); // Butonu loading yap
      
      setTimeout(() => {
          setData(data.filter((item) => item.id !== deleteId));
          setIsSaving(false);
          setIsDeleteModalOpen(false); // Modalı kapat
          setDeleteId(null);
      }, 1000); // 1 saniye bekle (gerçekçilik için)
  };

  // --- KAYDETME ---
  const handleSave = () => {
    if (!previewUrl || !altText) return;
    setIsSaving(true);
    setTimeout(() => {
        if (editingId) {
            setData(data.map(item => item.id === editingId ? { ...item, image: previewUrl, alt: altText } : item));
        } else {
            const newSlider: Slider = { id: Date.now(), image: previewUrl, alt: altText, status: "active" };
            setData([newSlider, ...data]);
        }
        setIsSaving(false);
        closeFormModal();
    }, 1000);
  };

  // Form Modalını Kapat ve Temizle
  const closeFormModal = () => {
      setIsFormModalOpen(false);
      setTimeout(() => {
          setPreviewUrl(null);
          setAltText("");
          setEditingId(null);
      }, 300);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Sliderlər
          </h1>
          <p className="text-muted-foreground mt-1">
            Ana səhifənin sliderlərini buradan idarə edin.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setIsFormModalOpen(true)}
            className="dark:bg-neon dark:text-black dark:hover:bg-neon/90 rounded-xl px-6 shadow-lg shadow-primary/20 dark:shadow-neon/20 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4 mr-2" />
            Yeni Slider
          </Button>
        </div>
      </div>

      {/* TABLO */}
      <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/80 dark:bg-zinc-900/95 backdrop-blur-xl shadow-xl shadow-black/5 overflow-hidden">
        <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Görüntü</TableHead>
                <TableHead>Alternativ Mətn (Alt)</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell>
                    <div className="w-24 h-14 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 shadow-sm relative group-hover:scale-105 transition-transform duration-300">
                      <img src={item.image} alt={item.alt} className="w-full h-full object-cover" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/5 text-primary dark:text-neon dark:bg-neon/10 shrink-0 border border-primary/10 dark:border-neon/10">
                        <Type className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-foreground text-sm line-clamp-2">{item.alt}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border transition-colors",
                        item.status === "active" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" : "bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/20"
                    )}>
                      <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", item.status === "active" ? "bg-emerald-500" : "bg-zinc-400")}></span>
                      {item.status === "active" ? "Aktiv" : "Deaktiv"}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        <button 
                            onClick={() => handleEdit(item)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-all dark:text-blue-400 dark:bg-blue-500/10 dark:border-blue-500/20 dark:hover:bg-blue-500/20"
                        >
                             <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => onDeleteClick(item.id)} // Burayı değiştirdik
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
      </div>

      {/* --- 1. FORM MODALI (Ekle/Düzenle) --- */}
      <Modal 
        isOpen={isFormModalOpen} 
        onClose={closeFormModal} 
        title={editingId ? "Slideri Yenilə" : "Yeni Slider Əlavə Et"} 
      >
          <div className="space-y-6">
              <div className="space-y-2">
                  <label className="text-sm font-medium">Slider Görseli</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                        "relative w-full h-48 rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group overflow-hidden",
                        previewUrl 
                            ? "border-primary/50 bg-background" 
                            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-neon/5 dark:hover:border-neon/30"
                    )}
                  >
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                      {previewUrl ? (
                          <>
                             <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                 <p className="text-white font-medium flex items-center gap-2"><Pencil className="w-4 h-4" /> Dəyişdir</p>
                             </div>
                          </>
                      ) : (
                          <>
                             <div className="p-3 rounded-full bg-muted group-hover:bg-background transition-colors shadow-sm">
                                <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary dark:group-hover:text-neon" />
                             </div>
                             <div className="text-center">
                                <p className="text-sm font-medium text-foreground">Yükləmək üçün klikləyin</p>
                                <p className="text-xs text-muted-foreground mt-1">PNG, JPG veya WebP (Max 5MB)</p>
                             </div>
                          </>
                      )}
                  </div>
              </div>
              <Input label="Alternativ Mətn" placeholder="Örn: Kampaniya" value={altText} onChange={(e) => setAltText(e.target.value)} />
              <div className="flex items-center gap-3 pt-2">
                  <Button variant="outline" className="w-full" onClick={closeFormModal} disabled={isSaving}>Ləğv et</Button>
                  <Button className="w-full dark:bg-neon dark:text-black dark:hover:bg-neon/90" onClick={handleSave} disabled={!previewUrl || !altText || isSaving} isLoading={isSaving}>
                      {isSaving ? "Yadda saxlanılır..." : (editingId ? "Yenilə" : "Yadda Saxla")}
                  </Button>
              </div>
          </div>
      </Modal>

      {/* --- 2. SİLME ONAY MODALI (PREMIUM) --- */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Silmək istədiyinizə əminsiniz?"
      >
         <div className="flex flex-col items-center text-center space-y-4 pt-2">
             
             {/* Animasyonlu İkon Kutusu */}
             <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center mb-2 animate-pulse">
                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
             </div>

             {/* Açıklama */}
             <div>
                <h4 className="text-lg font-semibold text-foreground">Bu slider silinəcək!</h4>
                <p className="text-sm text-muted-foreground mt-1 max-w-[280px] mx-auto">
                    Bu əməliyyat geri qaytarıla bilməz. Davam etmək istədiyinizə əminsiniz?
                </p>
             </div>

             {/* Butonlar */}
             <div className="flex items-center gap-3 w-full pt-4">
                 <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setIsDeleteModalOpen(false)}
                    disabled={isSaving}
                 >
                    Ləğv et
                 </Button>
                 <Button 
                    className="w-full bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700 shadow-lg shadow-red-500/20" 
                    onClick={confirmDelete}
                    isLoading={isSaving}
                 >
                    Bəli, Sil
                 </Button>
             </div>
         </div>
      </Modal>

    </div>
  );
};