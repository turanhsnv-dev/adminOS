import { AlertTriangle } from "lucide-react";
import { Modal } from "../modal/modal";
import { Button } from "../button/button";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

export const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Silmək istədiyinizə əminsiniz?",
  description = "Bu əməliyyat geri qaytarıla bilməz.",
  isLoading = false,
}: DeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center text-center space-y-4 pt-2">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center mb-2 animate-pulse">
          <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-foreground">Diqqət!</h4>
          <p className="text-sm text-muted-foreground mt-1 max-w-[280px] mx-auto">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-3 w-full pt-4">
          <Button variant="outline" className="w-full" onClick={onClose} disabled={isLoading}>
            Ləğv et
          </Button>
          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700 shadow-lg shadow-red-500/20"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            Bəli, Sil
          </Button>
        </div>
      </div>
    </Modal>
  );
};