"use client";

import { useEffect, useRef, useState } from "react";

import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";

type ProfileCanvasProps = {
  src: string;
  alt: string;
};

/**
 * Encaja el canvas de puntos en un cuadrado que sigue el ancho del contenedor.
 * PixelatedCanvas necesita medidas en píxeles, así que se miden acá y se le pasan.
 */
export function ProfileCanvas({ src, alt }: ProfileCanvasProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new ResizeObserver(([entry]) => {
      // Redondeado para no recalcular la malla por diferencias de medio píxel.
      setSize(Math.round(entry.contentRect.width));
    });

    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className="relative aspect-square w-full overflow-hidden rounded-[1.5rem]">
      {size > 0 && (
        <PixelatedCanvas
          src={src}
          width={size}
          height={size}
          cellSize={4}
          dotScale={0.86}
          shape="square"
          backgroundColor="#08080b"
          dropoutStrength={0.22}
          distortionMode="swirl"
          distortionStrength={4}
          distortionRadius={95}
          followSpeed={0.18}
          jitterStrength={3}
          jitterSpeed={3}
          tintColor="#a855f7"
          tintStrength={0.12}
          objectFit="cover"
          maxFps={60}
          className="size-full"
        />
      )}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={880} height={880} className="size-full object-cover" />
      </noscript>
    </div>
  );
}
