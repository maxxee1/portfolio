"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

import { LanguageProvider } from "@/components/providers/language-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  // reducedMotion="user" respeta la preferencia del sistema en las animaciones JS,
  // igual que la media query hace con las de CSS. LazyMotion con domAnimation
  // carga solo las funciones que se usan (los componentes van con `m.`).
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <LanguageProvider>{children}</LanguageProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
