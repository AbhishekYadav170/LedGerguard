
type LoadingProps = {
  text?: string;
};

function Loading({ text = "Loading..." }: LoadingProps) {
  return (
    <div className="flex min-h-[120px] items-center justify-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

      <p className="text-sm font-medium text-slate-600">
        {text}
      </p>
    </div>
  );
}

export default Loading;
