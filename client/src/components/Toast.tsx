
type ToastProps = {
  type?: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
};

function Toast({
  type = "success",
  message,
  onClose,
}: ToastProps) {
  const styles = {
    success: "bg-green-50 border-green-200 text-green-700",
    error: "bg-red-50 border-red-200 text-red-700",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
    info: "bg-blue-50 border-blue-200 text-blue-700",
  };

  return (
    <div
      role="alert"
      className={`fixed right-5 top-5 z-50 flex items-center justify-between gap-4 rounded-xl border p-4 shadow-lg ${styles[type]}`}
    >
      <span className="text-sm font-medium">
        {message}
      </span>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="font-bold hover:opacity-60"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default Toast;
