"use client";

import { RefreshCw } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

type AvatarFlipProps = {
  src: string;
  alt: string;
  flipLabel: string;
  className?: string;
};

/** Distancia (px) desde la cara dentro de la cual los ojos siguen al puntero. */
const TRACK_RANGE = 700;

/**
 * Foto que se da vuelta como una moneda al pasar el mouse (o con un toque en
 * pantallas táctiles) y muestra una silueta vectorial cuyos ojos siguen al puntero.
 *
 * La silueta está hecha por capas: cada una se desplaza distinto según --lx/--ly
 * (-1…1), así la cabeza parece girar en 3D y las pupilas se mueven más que el resto.
 */
export function AvatarFlip({ src, alt, flipLabel, className }: AvatarFlipProps) {
  const [flipped, setFlipped] = useState(false);
  const faceRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const face = faceRef.current;
    if (!face) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const paint = () => {
      face.style.setProperty("--lx", current.x.toFixed(3));
      face.style.setProperty("--ly", current.y.toFixed(3));
    };

    // Suavizado: la mirada llega al puntero en unos pocos cuadros y se detiene sola.
    const tick = () => {
      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;
      paint();
      const settled =
        Math.abs(target.x - current.x) < 0.002 && Math.abs(target.y - current.y) < 0.002;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const aim = (next: { x: number; y: number }) => {
      target = next;
      if (reduceMotion) {
        current.x = next.x;
        current.y = next.y;
        paint();
        return;
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = face.getBoundingClientRect();
      if (rect.width === 0) return;
      // Centro aproximado de los ojos dentro del dibujo.
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height * 0.45);
      if (Math.hypot(dx, dy) > TRACK_RANGE) {
        aim({ x: 0, y: 0 });
        return;
      }
      const reach = rect.width * 0.55;
      let x = dx / reach;
      let y = dy / reach;
      const length = Math.hypot(x, y);
      if (length > 1) {
        x /= length;
        y /= length;
      }
      aim({ x, y });
    };

    const recenter = () => aim({ x: 0, y: 0 });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", recenter);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", recenter);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={flipLabel}
      aria-pressed={flipped}
      onClick={(event) => {
        // Con mouse basta el hover; el clic solo voltea en táctil o con teclado.
        const keyboard = event.detail === 0;
        if (keyboard || !window.matchMedia("(hover: hover)").matches) {
          setFlipped((value) => !value);
        }
      }}
      className={cn("group relative block perspective-[1400px]", className)}
    >
      <span
        className={cn(
          "absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] transform-3d group-hover:rotate-y-180",
          flipped && "rotate-y-180",
        )}
      >
        {/* Anverso: la foto */}
        <span className="absolute inset-0 overflow-hidden rounded-2xl bg-tile backface-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 420px"
            className="object-cover"
          />
          <span
            aria-hidden
            className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-card/85 text-accent shadow-card backdrop-blur transition-transform duration-500 group-hover:rotate-180"
          >
            <RefreshCw size={16} />
          </span>
        </span>

        {/* Reverso: la silueta */}
        <span
          aria-hidden
          className="bg-hero absolute inset-0 overflow-hidden rounded-2xl rotate-y-180 backface-hidden"
        >
          <span className="bg-dots absolute inset-0" />
          <span className="absolute -top-16 -left-10 size-56 rounded-full bg-hero-glow blur-2xl" />
          <span className="absolute -right-12 -bottom-10 size-48 rounded-full bg-hero-glow-2 blur-2xl" />
          <SilhouetteFace ref={faceRef} />
        </span>
      </span>
    </button>
  );
}

/** Desplazamiento de una capa: `x`/`y` son los píxeles (del viewBox) a --lx/--ly = ±1. */
const shift = (x: number, y: number): CSSProperties => ({
  transform: `translate(calc(var(--lx) * ${x}px), calc(var(--ly) * ${y}px))`,
});

const SKIN: CSSProperties = { fill: "color-mix(in oklab, currentColor 12%, transparent)" };
const DARK: CSSProperties = { fill: "rgb(0 0 0 / 0.42)" };

function SilhouetteFace({ ref }: { ref: React.Ref<SVGSVGElement> }) {
  const clipId = useId();
  const leftEye = "M148 192 C158 179 178 179 188 192 C178 201 158 201 148 192 Z";
  const rightEye = "M212 192 C222 179 242 179 252 192 C242 201 222 201 212 192 Z";

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMax meet"
      className="absolute inset-0 size-full text-hero-text"
      style={{ "--lx": 0, "--ly": 0 } as CSSProperties}
      fill="none"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <clipPath id={`${clipId}-l`}>
          <path d={leftEye} />
        </clipPath>
        <clipPath id={`${clipId}-r`}>
          <path d={rightEye} />
        </clipPath>
      </defs>

      {/* Hombros: chaqueta con cierre y polera debajo */}
      <g style={shift(4, 2)}>
        <path d="M24 404 C34 334 96 302 160 294 L240 294 C304 302 366 334 376 404 Z" style={DARK} />
        <path d="M164 294 L200 346 L236 294 Z" style={SKIN} />
        <path d="M148 298 C162 322 180 338 200 348 C220 338 238 322 252 298" />
        <path d="M200 350 L200 404" className="text-hero-str" stroke="currentColor" strokeDasharray="2 9" />
        <path d="M96 340 C104 360 108 380 108 404 M304 340 C296 360 292 380 292 404" strokeWidth={3} opacity={0.5} />
      </g>

      {/* Cuello */}
      <g style={shift(6, 3)}>
        <path d="M174 246 L174 300 C186 314 214 314 226 300 L226 246" style={SKIN} />
      </g>

      {/* Cabeza: orejas, cara y pelo a los costados */}
      <g style={shift(10, 6)}>
        <ellipse cx="116" cy="190" rx="12" ry="21" style={SKIN} />
        <ellipse cx="284" cy="190" rx="12" ry="21" style={SKIN} />
        <path
          d="M122 152 C120 96 280 96 278 152 C280 216 262 266 200 274 C138 266 120 216 122 152 Z"
          style={SKIN}
        />
        <path d="M123 150 C120 128 128 112 142 106 L142 164 C133 161 126 157 123 150 Z" style={DARK} />
        <path d="M277 150 C280 128 272 112 258 106 L258 164 C267 161 274 157 277 150 Z" style={DARK} />
      </g>

      {/* Rasgos: cejas, nariz y boca giran un poco más que la cabeza */}
      <g style={shift(15, 9)}>
        <path d="M146 170 C158 159 176 159 188 166" strokeWidth={8} />
        <path d="M212 166 C224 159 242 159 254 170" strokeWidth={8} />
        <path d="M201 198 C197 216 190 228 192 235 C198 242 207 242 213 235" />
        <path d="M178 252 C190 259 210 259 222 252" />
        <path d="M189 263 C196 267 205 267 212 263" opacity={0.6} />
      </g>

      {/* Ojos: el blanco va con los rasgos; las pupilas además miran al puntero */}
      <g style={shift(15, 9)}>
        <g className="avatar-blink">
          <path d={leftEye} className="fill-hero-text" stroke="none" />
          <path d={rightEye} className="fill-hero-text" stroke="none" />
          <g clipPath={`url(#${clipId}-l)`}>
            <g style={shift(9, 4)}>
              <circle cx="168" cy="191" r="8" className="fill-hero-str" stroke="none" />
              <circle cx="168" cy="191" r="3.6" fill="#050505" stroke="none" />
            </g>
          </g>
          <g clipPath={`url(#${clipId}-r)`}>
            <g style={shift(9, 4)}>
              <circle cx="232" cy="191" r="8" className="fill-hero-str" stroke="none" />
              <circle cx="232" cy="191" r="3.6" fill="#050505" stroke="none" />
            </g>
          </g>
          {/* Párpados medio caídos, como en la foto */}
          <path d="M146 190 C157 175 179 175 190 190" />
          <path d="M210 190 C221 175 243 175 254 190" />
        </g>
      </g>

      {/* Jockey hacia atrás: copa, ajustador sobre la frente y visera saliendo por el lado */}
      <g style={shift(11, 5)}>
        <path d="M110 140 C104 58 296 58 290 140 C252 126 148 126 110 140 Z" style={DARK} />
        <path d="M176 128 C184 106 216 106 224 128" style={SKIN} />
        <path d="M130 131 C170 120 230 120 270 131 L268 146 C230 136 170 136 132 146 Z" style={DARK} />
        <circle cx="200" cy="82" r="4" className="fill-hero-text" stroke="none" />
      </g>
      <g style={shift(14, 5)}>
        <path d="M272 112 C304 104 340 118 352 142 C324 142 298 136 278 131 Z" style={DARK} />
      </g>
    </svg>
  );
}
