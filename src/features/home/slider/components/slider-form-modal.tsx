/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Modal } from "../../../../components/ui/modal/modal";
import { Input } from "../../../../components/ui/input/input";
import { Button } from "../../../../components/ui/button/button";
import { ImageUploader } from "../../../../components/ui/image-uploader/image-uploader";
import { cn } from "../../../../lib/utils";

// Tip eynidir, təkrar istifadə edirik
export interface SliderData {
  id: number;
  image: string;
  alt: { az: string; en: string; ru: string };
  status: "active" | "inactive";
}

interface SliderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { image: string; alt: { az: string; en: string; ru: string } }) => void;
  initialData?: SliderData | null; // Edit üçün varsa gəlir
  isSaving: boolean;
}

type Language = "az" | "en" | "ru";

export const SliderFormModal = ({ isOpen, onClose, onSave, initialData, isSaving }: SliderFormModalProps) => {
  // State-lər bu komponentin içində qaldı! Əsas səhifəni yormur.
  const [activeLang, setActiveLang] = useState<Language>("az");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [altText, setAltText] = useState({ az: "", en: "", ru: "" });

  // Modal açılanda və ya initialData dəyişəndə formanı doldur.
  // Bu effect, yalnız modal açıldığında lokal form state'ini props-lardan senkronize etmək
  // üçün istifadə olunur, bu komponent üçün şüurlu bir dizayndır.
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setPreviewUrl(initialData.image);
        setAltText(initialData.alt);
      } else {
        // Yeni əlavə edilirsə təmizlə
        setPreviewUrl(null);
        setAltText({ az: "", en: "", ru: "" });
      }
      setActiveLang("az");
    }
  }, [isOpen, initialData]);

  const handleSaveClick = () => {
    if (previewUrl && altText.az) {
      onSave({ image: previewUrl, alt: altText });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Slideri Yenilə" : "Yeni Slider Əlavə Et"}
    >
      <div className="space-y-6">
        
        {/* Şəkil Yükləmə Komponenti */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Slider Görseli</label>
          <ImageUploader 
             previewUrl={previewUrl} 
             onFileSelect={(file) => setPreviewUrl(URL.createObjectURL(file))} 
          />
        </div>

        {/* Çok Dilli Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Alternativ Mətn</label>
            <div className="flex bg-muted p-1 rounded-lg">
              {(["az", "en", "ru"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={cn(
                    "px-3 py-1 text-xs font-bold uppercase rounded-md transition-all",
                    activeLang === lang
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
             <Input
                value={altText[activeLang]}
                onChange={(e) => setAltText({ ...altText, [activeLang]: e.target.value })}
                placeholder={`Başlıq (${activeLang.toUpperCase()})`}
                className="pr-10"
             />
             <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none uppercase text-xs font-bold opacity-50">
                 {activeLang}
             </div>
          </div>
        </div>

        {/* Düymələr */}
        <div className="flex items-center gap-3 pt-2">
          <Button variant="outline" className="w-full" onClick={onClose} disabled={isSaving}>
            Ləğv et
          </Button>
          <Button
            className="w-full dark:bg-neon dark:text-black dark:hover:bg-neon/90"
            onClick={handleSaveClick}
            disabled={!previewUrl || !altText.az || isSaving}
            isLoading={isSaving}
          >
            {isSaving ? "Yadda saxlanılır..." : initialData ? "Yenilə" : "Yadda Saxla"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};