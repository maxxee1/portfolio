import { cn } from "@/lib/utils";

type ProgressProps = {
  /** 0 a 100. */
  value: number;
  className?: string;
};

/** Barra de progreso de Horizon UI: pista suave y relleno con el degradado del tema. */
export function Progress({ value, className }: ProgressProps) {
  const width = Math.max(0, Math.min(100, value));

  return (
    <div aria-hidden className={cn("h-2 w-full overflow-hidden rounded-full bg-tile", className)}>
      <div className="h-full rounded-full bg-bar" style={{ width: `${width}%` }} />
    </div>
  );
}
