
type AlertProps = {
  type?: "success" | "error" | "warning" | "info";
  message: string;
};

function Alert({
  type = "info",
  message,
}: AlertProps) {
  const styles = {
    success: "bg-green-50 border-green-200 text-green-700",
    error: "bg-red-50 border-red-200 text-red-700",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
    info: "bg-blue-50 border-blue-200 text-blue-700",
  };

  return (
    <div
      role="alert"
      className={`rounded-lg border p-4 text-sm font-medium ${styles[type]}`}
    >
      {message}
    </div>
  );
}

export default Alert;
