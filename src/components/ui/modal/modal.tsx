import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom"; // Portal için gerekli import
import { X } from "lucide-react";
import { cn } from "../../../lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  // Modal açıkken dışarı tıklama ve scroll kilitleme
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      // Body scroll'u kilitle
      document.body.style.overflow = "hidden"; 
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      // Body scroll kilidini aç
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Eğer modal kapalıysa veya component henüz mount olmadıysa hiçbir şey gösterme
  if (!isOpen || !mounted) return null;

  // createPortal ile modalı doğrudan document.body'ye ışınlıyoruz!
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-0">
      
      {/* BACKDROP (Arka Plan) */}
      {/* Sidebar ve Header dahil her şeyin üzerine çıkacak */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        aria-hidden="true"
      />

      {/* MODAL CONTENT */}
      <div 
        ref={modalRef}
        className={cn(
            "relative w-full max-w-lg transform rounded-2xl p-6 text-left shadow-2xl transition-all animate-in zoom-in-95 duration-200",
            "bg-background/95 border border-border/50",
            "dark:bg-zinc-900/95 dark:border-white/10"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="rounded-full p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div>
            {children}
        </div>
      </div>
    </div>,
    document.body // Işınlanacağı yer: <body> etiketi
  );
};