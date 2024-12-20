import { cn } from "@/lib/utils";

export const BrowserComponent: React.FC<{
  children?: React.ReactNode;
  className?: string;
  shareUrl?: string; // Recebe a URL pública como prop
}> = ({ className, children, shareUrl }) => (
  <div
    className={cn(
      "relative w-full rounded-xl border bg-white text-sm text-neutral-950 shadow-2xl shadow-gray-300 dots-gray-300 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 dark:shadow-lg dark:dots-neutral-800",
      className
    )}
    style={{
      minHeight: "500px", // Altura mínima
    }}
  >
    <div
      className={
        "flex w-full items-center justify-between gap-3 rounded-t-lg border-b border-inherit bg-inherit px-6 py-3"
      }
    >
      <div className={"flex gap-3"}>
        <div className={"h-4 w-4 rounded-full bg-red-500 dark:bg-red-500"} />
        <div
          className={"h-4 w-4 rounded-full bg-neutral-500 dark:bg-neutral-800"}
        />
        <div
          className={"h-4 w-4 rounded-full bg-green-500 dark:bg-neutral-800"}
        />
      </div>
      <div
        className={
          "min-w-1/3 flex w-fit gap-3 overflow-hidden rounded-md border border-inherit px-2 py-1.5 font-sans"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          className={"w-5 max-w-6 stroke-neutral-300 dark:stroke-neutral-700"}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        {/* Exibição da URL dinâmica */}
        <span className={"flex items-center justify-center truncate text-sm"}>
          {shareUrl || "https://example.com/project"}
        </span>
      </div>
      <div />
    </div>
    <div className={"absolute left-0 top-0 w-full px-4 pt-16"}>
      <div className="flex min-h-[600px] flex-col justify-start">
        {children}
      </div>
    </div>
  </div>
);
