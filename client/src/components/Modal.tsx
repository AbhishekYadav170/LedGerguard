
import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-slate-500 hover:text-red-600"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
