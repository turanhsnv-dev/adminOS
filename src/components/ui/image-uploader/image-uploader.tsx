import React, { useRef } from "react";
import { Upload, Pencil } from "lucide-react";
import { cn } from "../../../lib/utils"; 

interface ImageUploaderProps {
  previewUrl: string | null;
  onFileSelect: (file: File) => void;
  className?: string;
}

export const ImageUploader = ({ previewUrl, onFileSelect, className }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className={cn(
        "relative w-full h-48 rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group overflow-hidden",
        previewUrl
          ? "border-primary/50 bg-background"
          : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-neon/5 dark:hover:border-neon/30",
        className
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
            <p className="text-white font-medium flex items-center gap-2">
              <Pencil className="w-4 h-4" /> Dəyişdir
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="p-3 rounded-full bg-muted group-hover:bg-background transition-colors shadow-sm">
            <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary dark:group-hover:text-neon" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Yükləmək üçün klikləyin</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG və ya WebP</p>
          </div>
        </>
      )}
    </div>
  );
};