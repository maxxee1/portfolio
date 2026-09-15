"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";

import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { cn } from "@/lib/utils";

type PixelPhotoProps = {
  src: string;
  alt: string;
  className?: string;
};

/** Lo que dura la vuelta a HD; después se desmonta el canvas para no animar de más. */
const LEAVE_MS = 700;

/**
 * Foto normal que, con el mouse encima, se deshace en píxeles que siguen al puntero
 * (PixelatedCanvas de Aceternity). Al salir, el canvas se desenfoca —los puntos se
 * funden entre sí— mientras la foto vuelve a enfocarse: los píxeles "se juntan" en HD.
 */
export function PixelPhoto({ src, alt, className }: PixelPhotoProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const wantsPixels = useRef(false);
  const unmountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [canvasMounted, setCanvasMounted] = useState(false);
  const [pixelated, setPixelated] = useState(false);
  const [tint, setTint] = useState("#ffffff");

  // PixelatedCanvas necesita medidas en píxeles: se miden acá y se le pasan.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new ResizeObserver(([entry]) => {
      // Redondeado para no recalcular la malla por diferencias de medio píxel.
      setSize({
        width: Math.round(entry.contentRect.width),
        height: Math.round(entry.contentRect.height),
      });
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (unmountTimer.current) clearTimeout(unmountTimer.current);
    },
    [],
  );

  const onEnter = (event: PointerEvent<HTMLDivElement>) => {
    // En táctil no hay "pasar por encima"; con movimiento reducido se queda la foto.
    if (event.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    wantsPixels.current = true;
    if (unmountTimer.current) clearTimeout(unmountTimer.current);

    // Medida al momento: no depende de que el ResizeObserver ya haya avisado.
    const rect = event.currentTarget.getBoundingClientRect();
    setSize({ width: Math.round(rect.width), height: Math.round(rect.height) });

    // Los puntos toman un leve tinte del color de acento del tema activo.
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    if (accent.startsWith("#")) setTint(accent);

    setCanvasMounted(true);
    // Dos cuadros después, para que el canvas ya montado entre con transición.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setPixelated(wantsPixels.current)),
    );
  };

  const onLeave = () => {
    if (!wantsPixels.current) return;
    wantsPixels.current = false;
    setPixelated(false);
    unmountTimer.current = setTimeout(() => setCanvasMounted(false), LEAVE_MS);
  };

  return (
    <div
      ref={frameRef}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={cn("relative overflow-hidden rounded-2xl bg-tile", className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        loading="eager"
        fetchPriority="high"
        sizes="(max-width: 1024px) 100vw, 420px"
        className={cn(
          "object-cover transition-[opacity,filter,scale] ease-out",
          pixelated
            ? "scale-[1.03] opacity-0 blur-sm duration-500"
            : "scale-100 opacity-100 blur-none duration-700",
        )}
      />

      {canvasMounted && size.width > 0 && (
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 transition-[opacity,filter] ease-out",
            pixelated ? "opacity-100 blur-none duration-500" : "opacity-0 blur-[6px] duration-700",
          )}
        >
          <PixelatedCanvas
            src={src}
            width={size.width}
            height={size.height}
            cellSize={4}
            dotScale={0.88}
            shape="square"
            backgroundColor=""
            dropoutStrength={0.3}
            interactive
            distortionMode="swirl"
            distortionStrength={5}
            distortionRadius={110}
            followSpeed={0.2}
            jitterStrength={4}
            jitterSpeed={4}
            sampleAverage
            tintColor={tint}
            tintStrength={0.15}
            objectFit="cover"
            maxFps={60}
            className="size-full"
          />
        </div>
      )}
    </div>
  );
}
