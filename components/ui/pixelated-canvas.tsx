"use client";

/**
 * PixelatedCanvas — componente de Aceternity UI (ui.aceternity.com/components/pixelated-canvas).
 * Dibuja una imagen como una malla de puntos y la distorsiona alrededor del puntero.
 *
 * Adaptado del original: se quitaron los `any` (la limpieza del listener vivía colgada
 * del objeto Image) para que pase el `strict` del proyecto.
 */

import React from "react";

type PixelatedCanvasProps = {
  src: string;
  width?: number;
  height?: number;
  /** Tamaño de cada celda (en píxeles CSS) usada para muestrear y espaciar. */
  cellSize?: number;
  /** Tamaño del punto como fracción de la celda (0..1). */
  dotScale?: number;
  /** Forma del punto dibujado por muestra. */
  shape?: "circle" | "square";
  /** Color de fondo con el que se limpia el canvas antes de dibujar. */
  backgroundColor?: string;
  /** Convertir a escala de grises antes de dibujar. */
  grayscale?: boolean;
  className?: string;
  /** Redibujar al cambiar el tamaño de la ventana. */
  responsive?: boolean;
  /** 0..1. Más alto elimina más puntos en zonas de bajo contraste. */
  dropoutStrength?: number;
  /** Activa la distorsión con el puntero. */
  interactive?: boolean;
  /** Desplazamiento máximo por punto (px) por la distorsión. */
  distortionStrength?: number;
  /** Radio (px) alrededor del puntero que influye en la distorsión. */
  distortionRadius?: number;
  /** Cómo se mueven los puntos cerca del puntero. */
  distortionMode?: "repel" | "attract" | "swirl";
  /** 0..1, suavizado del seguimiento del puntero. */
  followSpeed?: number;
  /** Promediar varias muestras por celda en vez de una sola al centro. */
  sampleAverage?: boolean;
  /** Tinte de color (ej. "#0ea5e9" o "rgb(14,165,233)"). */
  tintColor?: string;
  /** 0..1, mezcla del tinte con los colores originales. */
  tintStrength?: number;
  /** Tope de cuadros por segundo. */
  maxFps?: number;
  /** Ajuste de la imagen dentro del canvas. */
  objectFit?: "cover" | "contain" | "fill" | "none";
  /** Amplitud del temblor de los puntos cerca del puntero. */
  jitterStrength?: number;
  /** Velocidad de ese temblor. */
  jitterSpeed?: number;
  /** Desvanecer la distorsión cuando el puntero sale. */
  fadeOnLeave?: boolean;
  /** 0..1, suavizado del desvanecido. Más alto = más rápido. */
  fadeSpeed?: number;
};

type Sample = {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  a: number;
  drop: boolean;
  seed: number;
};

type Dims = { width: number; height: number; dot: number };

export const PixelatedCanvas: React.FC<PixelatedCanvasProps> = ({
  src,
  width = 400,
  height = 500,
  cellSize = 3,
  dotScale = 0.9,
  shape = "square",
  backgroundColor = "#000000",
  grayscale = false,
  className,
  responsive = false,
  dropoutStrength = 0.4,
  interactive = true,
  distortionStrength = 3,
  distortionRadius = 80,
  distortionMode = "swirl",
  followSpeed = 0.2,
  sampleAverage = true,
  tintColor = "#FFFFFF",
  tintStrength = 0.2,
  maxFps = 60,
  objectFit = "cover",
  jitterStrength = 4,
  jitterSpeed = 4,
  fadeOnLeave = true,
  fadeSpeed = 0.1,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const samplesRef = React.useRef<Sample[]>([]);
  const dimsRef = React.useRef<Dims | null>(null);
  const targetMouseRef = React.useRef({ x: -9999, y: -9999 });
  const animMouseRef = React.useRef({ x: -9999, y: -9999 });
  const rafRef = React.useRef<number | null>(null);
  const lastFrameRef = React.useRef(0);
  const pointerInsideRef = React.useRef(false);
  const activityRef = React.useRef(0);
  const activityTargetRef = React.useRef(0);

  React.useEffect(() => {
    let isCancelled = false;
    let detachPointer: (() => void) | null = null;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    const compute = () => {
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

      const displayWidth = width ?? img.naturalWidth;
      const displayHeight = height ?? img.naturalHeight;

      canvas.width = Math.max(1, Math.floor(displayWidth * dpr));
      canvas.height = Math.max(1, Math.floor(displayHeight * dpr));
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, displayWidth, displayHeight);
      } else {
        ctx.clearRect(0, 0, displayWidth, displayHeight);
      }

      const offscreen = document.createElement("canvas");
      offscreen.width = Math.max(1, Math.floor(displayWidth));
      offscreen.height = Math.max(1, Math.floor(displayHeight));
      const off = offscreen.getContext("2d");
      if (!off) return;

      const iw = img.naturalWidth || displayWidth;
      const ih = img.naturalHeight || displayHeight;
      let dw = displayWidth;
      let dh = displayHeight;
      let dx = 0;
      let dy = 0;
      if (objectFit === "cover" || objectFit === "contain") {
        const fit = objectFit === "cover" ? Math.max : Math.min;
        const scale = fit(displayWidth / iw, displayHeight / ih);
        dw = Math.ceil(iw * scale);
        dh = Math.ceil(ih * scale);
        dx = Math.floor((displayWidth - dw) / 2);
        dy = Math.floor((displayHeight - dh) / 2);
      } else if (objectFit === "fill") {
        dw = displayWidth;
        dh = displayHeight;
      } else {
        dw = iw;
        dh = ih;
        dx = Math.floor((displayWidth - dw) / 2);
        dy = Math.floor((displayHeight - dh) / 2);
      }
      off.drawImage(img, dx, dy, dw, dh);

      let imageData: ImageData;
      try {
        imageData = off.getImageData(0, 0, offscreen.width, offscreen.height);
      } catch {
        // Imagen de otro origen sin CORS: se dibuja tal cual, sin pixelar.
        ctx.drawImage(img, 0, 0, displayWidth, displayHeight);
        return;
      }

      const data = imageData.data;
      const stride = offscreen.width * 4;
      const effectiveDotSize = Math.max(1, Math.floor(cellSize * dotScale));
      dimsRef.current = { width: displayWidth, height: displayHeight, dot: effectiveDotSize };

      const luminanceAt = (px: number, py: number) => {
        const ix = Math.max(0, Math.min(offscreen.width - 1, px));
        const iy = Math.max(0, Math.min(offscreen.height - 1, py));
        const i = iy * stride + ix * 4;
        return 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      };

      const hash2D = (ix: number, iy: number) => {
        const s = Math.sin(ix * 12.9898 + iy * 78.233) * 43758.5453123;
        return s - Math.floor(s);
      };

      const parseColor = (c: string): [number, number, number] | null => {
        if (c.startsWith("#")) {
          const hex = c.slice(1);
          if (hex.length === 3) {
            return [
              parseInt(hex[0] + hex[0], 16),
              parseInt(hex[1] + hex[1], 16),
              parseInt(hex[2] + hex[2], 16),
            ];
          }
          return [
            parseInt(hex.slice(0, 2), 16),
            parseInt(hex.slice(2, 4), 16),
            parseInt(hex.slice(4, 6), 16),
          ];
        }
        const m = c.match(/rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)/i);
        return m ? [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)] : null;
      };

      const tintRGB =
        tintColor && tintStrength > 0 ? parseColor(tintColor) : null;

      const samples: Sample[] = [];

      for (let y = 0; y < offscreen.height; y += cellSize) {
        const cy = Math.min(offscreen.height - 1, y + Math.floor(cellSize / 2));
        for (let x = 0; x < offscreen.width; x += cellSize) {
          const cx = Math.min(offscreen.width - 1, x + Math.floor(cellSize / 2));
          let r = 0;
          let g = 0;
          let b = 0;
          let a = 0;

          if (!sampleAverage) {
            const idx = cy * stride + cx * 4;
            r = data[idx];
            g = data[idx + 1];
            b = data[idx + 2];
            a = data[idx + 3] / 255;
          } else {
            let count = 0;
            for (let oy = -1; oy <= 1; oy++) {
              for (let ox = -1; ox <= 1; ox++) {
                const sx = Math.max(0, Math.min(offscreen.width - 1, cx + ox));
                const sy = Math.max(0, Math.min(offscreen.height - 1, cy + oy));
                const sIdx = sy * stride + sx * 4;
                r += data[sIdx];
                g += data[sIdx + 1];
                b += data[sIdx + 2];
                a += data[sIdx + 3] / 255;
                count++;
              }
            }
            r = Math.round(r / count);
            g = Math.round(g / count);
            b = Math.round(b / count);
            a = a / count;
          }

          if (grayscale) {
            const luma = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
            r = luma;
            g = luma;
            b = luma;
          } else if (tintRGB) {
            const k = Math.max(0, Math.min(1, tintStrength));
            r = Math.round(r * (1 - k) + tintRGB[0] * k);
            g = Math.round(g * (1 - k) + tintRGB[1] * k);
            b = Math.round(b * (1 - k) + tintRGB[2] * k);
          }

          // Zonas planas (poco gradiente) pierden puntos: así se marca el contorno.
          const lc = luminanceAt(cx, cy);
          const lx1 = luminanceAt(cx - 1, cy);
          const lx2 = luminanceAt(cx + 1, cy);
          const ly1 = luminanceAt(cx, cy - 1);
          const ly2 = luminanceAt(cx, cy + 1);
          const grad =
            Math.abs(lx2 - lx1) +
            Math.abs(ly2 - ly1) +
            Math.abs(lc - (lx1 + lx2 + ly1 + ly2) / 4);
          const gradientNorm = Math.max(0, Math.min(1, grad / 255));
          const dropoutProb = Math.max(0, Math.min(1, (1 - gradientNorm) * dropoutStrength));
          const seed = hash2D(cx, cy);

          samples.push({ x, y, r, g, b, a, drop: seed < dropoutProb, seed });
        }
      }

      samplesRef.current = samples;
    };

    const paintStatic = () => {
      const ctx = canvas.getContext("2d");
      const dims = dimsRef.current;
      if (!ctx || !dims) return;

      if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, dims.width, dims.height);
      } else {
        ctx.clearRect(0, 0, dims.width, dims.height);
      }

      for (const s of samplesRef.current) {
        if (s.drop || s.a <= 0) continue;
        ctx.globalAlpha = s.a;
        ctx.fillStyle = `rgb(${s.r}, ${s.g}, ${s.b})`;
        const cx = s.x + cellSize / 2;
        const cy = s.y + cellSize / 2;
        if (shape === "circle") {
          ctx.beginPath();
          ctx.arc(cx, cy, dims.dot / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(cx - dims.dot / 2, cy - dims.dot / 2, dims.dot, dims.dot);
        }
      }
      ctx.globalAlpha = 1;
    };

    img.onload = () => {
      if (isCancelled) return;
      compute();

      if (!interactive) {
        paintStatic();
        return;
      }

      const onPointerMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        targetMouseRef.current.x = e.clientX - rect.left;
        targetMouseRef.current.y = e.clientY - rect.top;
        pointerInsideRef.current = true;
        activityTargetRef.current = 1;
      };
      const onPointerEnter = () => {
        pointerInsideRef.current = true;
        activityTargetRef.current = 1;
      };
      const onPointerLeave = () => {
        pointerInsideRef.current = false;
        if (fadeOnLeave) {
          activityTargetRef.current = 0;
        } else {
          targetMouseRef.current.x = -9999;
          targetMouseRef.current.y = -9999;
        }
      };

      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerenter", onPointerEnter);
      canvas.addEventListener("pointerleave", onPointerLeave);

      const animate = () => {
        const now = performance.now();
        const minDelta = 1000 / Math.max(1, maxFps);
        if (now - lastFrameRef.current < minDelta) {
          rafRef.current = requestAnimationFrame(animate);
          return;
        }
        lastFrameRef.current = now;

        const ctx = canvas.getContext("2d");
        const dims = dimsRef.current;
        if (!ctx || !dims) {
          rafRef.current = requestAnimationFrame(animate);
          return;
        }

        animMouseRef.current.x +=
          (targetMouseRef.current.x - animMouseRef.current.x) * followSpeed;
        animMouseRef.current.y +=
          (targetMouseRef.current.y - animMouseRef.current.y) * followSpeed;

        if (fadeOnLeave) {
          activityRef.current +=
            (activityTargetRef.current - activityRef.current) * fadeSpeed;
        } else {
          activityRef.current = pointerInsideRef.current ? 1 : 0;
        }

        if (backgroundColor) {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, dims.width, dims.height);
        } else {
          ctx.clearRect(0, 0, dims.width, dims.height);
        }

        const mx = animMouseRef.current.x;
        const my = animMouseRef.current.y;
        const sigma = Math.max(1, distortionRadius * 0.5);
        const t = now * 0.001 * jitterSpeed;
        const activity = Math.max(0, Math.min(1, activityRef.current));

        for (const s of samplesRef.current) {
          if (s.drop || s.a <= 0) continue;
          let drawX = s.x + cellSize / 2;
          let drawY = s.y + cellSize / 2;
          const dx = drawX - mx;
          const dy = drawY - my;
          const dist2 = dx * dx + dy * dy;
          const influence = Math.exp(-dist2 / (2 * sigma * sigma)) * activity;

          if (influence > 0.0005) {
            if (distortionMode === "repel" || distortionMode === "attract") {
              const dist = Math.sqrt(dist2) + 0.0001;
              const sign = distortionMode === "repel" ? 1 : -1;
              drawX += sign * (dx / dist) * distortionStrength * influence;
              drawY += sign * (dy / dist) * distortionStrength * influence;
            } else {
              const angle = distortionStrength * 0.05 * influence;
              const cosA = Math.cos(angle);
              const sinA = Math.sin(angle);
              drawX = mx + (cosA * dx - sinA * dy);
              drawY = my + (sinA * dx + cosA * dy);
            }

            if (jitterStrength > 0) {
              const k = s.seed * 43758.5453;
              drawX += Math.sin(t + k) * jitterStrength * influence;
              drawY += Math.cos(t + k * 1.13) * jitterStrength * influence;
            }
          }

          ctx.globalAlpha = s.a;
          ctx.fillStyle = `rgb(${s.r}, ${s.g}, ${s.b})`;
          if (shape === "circle") {
            ctx.beginPath();
            ctx.arc(drawX, drawY, dims.dot / 2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(drawX - dims.dot / 2, drawY - dims.dot / 2, dims.dot, dims.dot);
          }
        }
        ctx.globalAlpha = 1;

        rafRef.current = requestAnimationFrame(animate);
      };

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);

      detachPointer = () => {
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerenter", onPointerEnter);
        canvas.removeEventListener("pointerleave", onPointerLeave);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    };

    img.onerror = () => {
      console.error("No se pudo cargar la imagen de PixelatedCanvas:", src);
    };

    const onResize = () => {
      if (img.complete && img.naturalWidth) compute();
    };
    if (responsive) window.addEventListener("resize", onResize);

    return () => {
      isCancelled = true;
      if (responsive) window.removeEventListener("resize", onResize);
      detachPointer?.();
    };
  }, [
    src,
    width,
    height,
    cellSize,
    dotScale,
    shape,
    backgroundColor,
    grayscale,
    responsive,
    dropoutStrength,
    interactive,
    distortionStrength,
    distortionRadius,
    distortionMode,
    followSpeed,
    sampleAverage,
    tintColor,
    tintStrength,
    maxFps,
    objectFit,
    jitterStrength,
    jitterSpeed,
    fadeOnLeave,
    fadeSpeed,
  ]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};
